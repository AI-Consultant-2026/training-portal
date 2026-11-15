import bcrypt from "bcryptjs";
import crypto from "crypto";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { Course, CourseModule, Enrollment, Lesson, Payment, User } from "../../src/models";
import { sponsorToken } from "../../src/services/sponsor.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// "Ask a sponsor to pay" (2026-10-12): a student shares a public /sponsor/<token> link and
// someone else pays the deposit, the balance or the full price for their course.

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const SECRET = "sk_test_jest_sponsor";

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
  const instructor = await makeUser("sp-instructor@example.com", "instructor");
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
  const student = await makeUser("sp-student@example.com", "student");
  const token = await loginAs(student.email);
  memAdapter.clear();
  return { course, days, student, token };
}

// Nigeria's checkout opens on Flutterwave since 2026-11-15. Charges are still confirmed
// here through Paystack's webhook too (for payments started before the switch).
const FLW_LINK = "https://checkout.flutterwave.com/v3/hosted/pay/sponsor";
function mockFlutterwaveInit() {
  return jest.spyOn(global, "fetch").mockImplementation(
    async () =>
      new Response(JSON.stringify({ status: "success", data: { link: FLW_LINK } }), {
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

function instalmentCharge(enrollmentId: string, kind: "deposit" | "balance" | "full", amountNgn: number, reference: string) {
  return sendWebhook({
    reference,
    amount: amountNgn * 100,
    customer: { email: "sp-student@example.com" },
    metadata: { enrollmentId, instalment: kind, courseSlug: "digital-marketing" },
  });
}

describe("Sponsor payment links", () => {
  const original = config.paystackSecretKey;
  const originalFlw = config.flutterwave.secretKey;
  beforeEach(() => {
    config.paystackSecretKey = SECRET;
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    config.paystackSecretKey = original;
    config.flutterwave.secretKey = originalFlw;
  });

  async function getLink(courseId: string, token: string) {
    const res = await request(app)
      .post("/api/payments/sponsor-link")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId });
    return res;
  }

  it("gives the student a link (enrolling them) and shows only their first name and the course", async () => {
    const { course, student, token } = await setup();
    const res = await getLink(course.id, token);
    expect(res.status).toBe(201);
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(res.body.url).toMatch(new RegExp(`/sponsor/${enrollment!.id}\\.`));

    const page = await request(app).get(`/api/sponsor/${sponsorToken(enrollment!.id)}`);
    expect(page.status).toBe(200);
    expect(page.body.sponsor).toEqual({
      checkout: {
          country: "NG",
          gateway: "flutterwave",
          currency: { code: "NGN", symbol: "\u20A6", spaced: false },
          currencyName: "Naira",
          whatsappLink: "https://wa.me/447508823495",
        },
      studentFirstName: "Ada",
      courseTitle: "Digital Marketing",
      courseSlug: "digital-marketing",
      status: "unpaid",
      priceNgn: 150_000,
      depositNgn: 20_000,
      balanceNgn: 130_000,
      unlockedDays: 2,
      paymentsEnabled: true,
    });
    expect(JSON.stringify(page.body)).not.toContain(student.email);
  });

  it("rejects a tampered token", async () => {
    const { course, student } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    const bad = `${enrollment.id}.AAAAAAAAAAAAAAAAAAAAAAAA`;
    expect((await request(app).get(`/api/sponsor/${bad}`)).status).toBe(404);
    expect((await request(app).post(`/api/sponsor/${bad}/pay`).send({ kind: "full" })).status).toBe(404);
  });

  it("a sponsor's full payment is charged to the student's email and unlocks the whole course", async () => {
    const { course, days, student, token } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    const fetchMock = mockFlutterwaveInit();

    const res = await request(app).post(`/api/sponsor/${sponsorToken(enrollment.id)}/pay`).send({ kind: "full" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ paymentLink: FLW_LINK });
    const sent = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
    expect(sent).toMatchObject({ customer: { email: student.email }, amount: 150_000, currency: "NGN" });
    expect(sent.redirect_url).toContain(`/sponsor/${sponsorToken(enrollment.id)}?paid=full`);
    fetchMock.mockRestore();

    const hook = await instalmentCharge(enrollment.id, "full", 150_000, "FULL1");
    expect(hook.body.outcome).toBe("confirmed");
    await enrollment.reload();
    expect(enrollment.paymentConfirmed).toBe(true);
    const lesson3 = await request(app).get(`/api/lessons/${days[2].lesson.id}`).set("Authorization", `Bearer ${token}`);
    expect(lesson3.status).toBe(200);

    const page = await request(app).get(`/api/sponsor/${sponsorToken(enrollment.id)}`);
    expect(page.body.sponsor.status).toBe("paid");
    expect((await request(app).post(`/api/sponsor/${sponsorToken(enrollment.id)}/pay`).send({ kind: "full" })).status).toBe(409);
  });

  it("a full payment of the wrong amount isn't applied", async () => {
    const { course, student } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    const hook = await instalmentCharge(enrollment.id, "full", 20_000, "FULLBAD");
    expect(hook.body.outcome).toBe("unmatched");
    await enrollment.reload();
    expect(enrollment.paymentConfirmed).toBe(false);
  });

  it("after a deposit, the sponsor can pay the balance but not the full price", async () => {
    const { course, student } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    await instalmentCharge(enrollment.id, "deposit", 20_000, "SPDEP");
    const token = sponsorToken(enrollment.id);
    expect((await request(app).get(`/api/sponsor/${token}`)).body.sponsor.status).toBe("deposit_paid");

    expect((await request(app).post(`/api/sponsor/${token}/pay`).send({ kind: "full" })).status).toBe(409);
    const fetchMock = mockFlutterwaveInit();
    const res = await request(app).post(`/api/sponsor/${token}/pay`).send({ kind: "balance" });
    expect(res.status).toBe(201);
    const sent = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
    expect(sent).toMatchObject({ amount: 130_000, currency: "NGN" });
    const pending = await Payment.findOne({ where: { enrollmentId: enrollment.id, status: "pending" } });
    expect(pending).toMatchObject({ notes: "Instalment balance (Flutterwave)" });
  });

  it("the student's own instalment endpoint still refuses kind=full", async () => {
    const { course, token } = await setup();
    const res = await request(app)
      .post("/api/payments/instalment")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, kind: "full" });
    expect(res.status).toBe(400);
  });
});
