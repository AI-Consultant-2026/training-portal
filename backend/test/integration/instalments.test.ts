import bcrypt from "bcryptjs";
import crypto from "crypto";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { Course, CourseModule, Enrollment, Lesson, Payment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// Instalments (2026-10-11): a ₦20,000 deposit unlocks Days 1-2; the balance unlocks the rest.

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const SECRET = "sk_test_jest_instalments";

async function makeUser(email: string, role: "student" | "instructor" | "admin") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: "Ada",
    lastName: "Obi",
    role,
    emailVerifiedAt: new Date(),
  });
}

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setup() {
  const instructor = await makeUser("inst-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "Digital Marketing",
    slug: "digital-marketing", // ₦150,000 -> ₦20,000 deposit + ₦130,000 balance
    durationWeeks: 8,
    status: "published",
    instructorId: instructor.id,
  });
  const days = [];
  for (let n = 1; n <= 3; n++) {
    const day = await CourseModule.create({ courseId: course.id, title: `Day ${n}`, weekNumber: n });
    const lesson = await Lesson.create({ moduleId: day.id, title: `Day ${n} Lesson 1`, order: 1 });
    days.push({ day, lesson });
  }
  const student = await makeUser("inst-student@example.com", "student");
  const token = await loginAs(student.email);
  memAdapter.clear();
  return { course, days, student, token };
}

function mockPaystackInit() {
  return jest.spyOn(global, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ status: true, data: { authorization_url: "https://checkout.paystack.com/abc123" } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

function sendWebhook(data: Record<string, unknown>) {
  const body = JSON.stringify({ event: "charge.success", data: { status: "success", currency: "NGN", ...data } });
  const sig = crypto.createHmac("sha512", SECRET).update(body).digest("hex");
  return request(app)
    .post("/api/payments/paystack/webhook")
    .set("Content-Type", "application/json")
    .set("x-paystack-signature", sig)
    .send(body);
}

function instalmentCharge(enrollmentId: string, kind: "deposit" | "balance", amountNgn: number, reference: string) {
  return sendWebhook({
    reference,
    amount: amountNgn * 100,
    customer: { email: "inst-student@example.com" },
    metadata: { enrollmentId, instalment: kind, courseSlug: "digital-marketing" },
  });
}

describe("Instalment payments", () => {
  const original = config.paystackSecretKey;
  beforeEach(() => {
    config.paystackSecretKey = SECRET;
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    config.paystackSecretKey = original;
  });

  it("quotes the deposit and balance", async () => {
    const { course, token } = await setup();
    const res = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quote.instalment).toEqual({ depositNgn: 20_000, balanceNgn: 130_000, unlockedDays: 2, enabled: true });
  });

  it("opens Paystack checkout for the deposit, enrolling the student and recording a pending payment", async () => {
    const { course, student, token } = await setup();
    const fetchMock = mockPaystackInit();

    const res = await request(app)
      .post("/api/payments/instalment")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, kind: "deposit" });

    expect(res.status).toBe(201);
    expect(res.body.paymentLink).toBe("https://checkout.paystack.com/abc123");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.paystack.co/transaction/initialize");
    const sent = JSON.parse(String((init as RequestInit).body));
    expect(sent.amount).toBe(2_000_000);
    expect(sent.email).toBe(student.email);
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(sent.metadata).toMatchObject({ enrollmentId: enrollment!.id, instalment: "deposit" });
    const payment = await Payment.findOne({ where: { enrollmentId: enrollment!.id } });
    expect(payment).toMatchObject({ status: "pending", notes: "Instalment deposit" });
    expect(Number(payment!.amount)).toBe(20_000);
  });

  it("won't take the balance before the deposit", async () => {
    const { course, student, token } = await setup();
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const res = await request(app)
      .post("/api/payments/instalment")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, kind: "balance" });
    expect(res.status).toBe(400);
  });

  it("a confirmed deposit unlocks Days 1-2 only; the balance unlocks the rest", async () => {
    const { course, days, student, token } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    const lesson = (n: number) =>
      request(app).get(`/api/lessons/${days[n - 1].lesson.id}`).set("Authorization", `Bearer ${token}`);

    expect((await lesson(2)).status).toBe(403);

    const dep = await instalmentCharge(enrollment.id, "deposit", 20_000, "DEP1");
    expect(dep.body.outcome).toBe("confirmed");
    await enrollment.reload();
    expect(enrollment.depositPaidAt).not.toBeNull();
    expect(enrollment.paymentConfirmed).toBe(false);
    expect(memAdapter.sentMessages.some((m) => m.subject.startsWith("Deposit received"))).toBe(true);

    expect((await lesson(2)).status).toBe(200);
    const day3 = await lesson(3);
    expect(day3.status).toBe(403);
    expect(day3.body.error.details.code).toBe("BALANCE_REQUIRED");

    const bal = await instalmentCharge(enrollment.id, "balance", 130_000, "BAL1");
    expect(bal.body.outcome).toBe("confirmed");
    await enrollment.reload();
    expect(enrollment.paymentConfirmed).toBe(true);
    expect((await lesson(3)).status).toBe(200);
  });

  it("treats a repeated webhook as a duplicate", async () => {
    const { course, student } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    await instalmentCharge(enrollment.id, "deposit", 20_000, "DEP2");
    const again = await instalmentCharge(enrollment.id, "deposit", 20_000, "DEP2");
    expect(again.body.outcome).toBe("duplicate");
  });

  it("leaves a wrong amount for manual confirmation", async () => {
    const { course, student } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    const res = await instalmentCharge(enrollment.id, "deposit", 15_000, "DEP3");
    expect(res.body.outcome).toBe("unmatched");
    await enrollment.reload();
    expect(enrollment.depositPaidAt).toBeNull();
  });

  it("lets an admin tick the deposit by hand", async () => {
    const { course, student } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    await makeUser("inst-admin@example.com", "admin");
    const adminToken = await loginAs("inst-admin@example.com");
    const res = await request(app)
      .patch(`/api/admin/enrollments/${enrollment.id}/deposit`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ depositPaid: true });
    expect(res.status).toBe(200);
    await enrollment.reload();
    expect(enrollment.depositPaidAt).not.toBeNull();
  });

  it("unlocks the deposit when the returning student's charge is verified with Paystack (webhook backup)", async () => {
    const { course, student, token } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    jest.spyOn(global, "fetch").mockImplementation(async () =>
      new Response(
        JSON.stringify({
          status: true,
          data: {
            reference: "VER1",
            status: "success",
            currency: "NGN",
            amount: 2_000_000,
            customer: { email: student.email },
            metadata: { enrollmentId: enrollment.id, instalment: "deposit" },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    const res = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${token}`)
      .send({ reference: "VER1" });
    expect(res.status).toBe(200);
    expect(res.body.outcome).toBe("confirmed");
    // What the page reports to analytics as a Purchase.
    expect(res.body.purchase).toEqual({ valueNgn: 20_000, currency: "NGN", plan: "deposit", courseSlug: course.slug });
    await enrollment.reload();
    expect(enrollment.depositPaidAt).not.toBeNull();

    // A later webhook for the same charge is a no-op.
    const hook = await instalmentCharge(enrollment.id, "deposit", 20_000, "VER1");
    expect(hook.body.outcome).toBe("duplicate");

    // Verifying again (e.g. a refresh of the return page) still reports the purchase; the
    // page itself only sends it once per reference.
    const again = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${token}`)
      .send({ reference: "VER1" });
    expect(again.body.purchase?.valueNgn).toBe(20_000);
  });

  it("won't verify someone else's charge", async () => {
    const { course } = await setup();
    const other = await makeUser("inst-other@example.com", "student");
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: other.id });
    const intruder = await makeUser("inst-intruder@example.com", "student");
    const token = await loginAs(intruder.email);
    jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          status: true,
          data: { reference: "VER2", status: "success", currency: "NGN", amount: 2_000_000, customer: { email: other.email }, metadata: { enrollmentId: enrollment.id, instalment: "deposit" } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    const res = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${token}`)
      .send({ reference: "VER2" });
    expect(res.status).toBe(403);
  });
});
