import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { Course, CourseModule, DiscountCode, Enrollment, Lesson, Payment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// Discount codes (2026-11-18): FULLPAY15 takes 15% off the course price when a candidate
// pays in full. It never changes the deposit or the balance.

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const HASH = "jest-flw-hash";

// Kenya, Digital Marketing: KSh 14,475 full price; 15% off = KSh 12,303.75 -> 12,304.
const PRICE = 14_475;
const DISCOUNTED = 12_304;
const DEPOSIT = 1_930;

async function makeUser(email: string, role: "student" | "instructor" | "admin", country = "KE") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: "Wanjiru",
    lastName: "Kamau",
    role,
    country,
    emailVerifiedAt: new Date(),
  });
}

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setup() {
  const instructor = await makeUser("dc-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "Digital Marketing",
    slug: "digital-marketing",
    durationWeeks: 8,
    status: "published",
    instructorId: instructor.id,
  });
  for (let n = 1; n <= 3; n++) {
    const day = await CourseModule.create({ courseId: course.id, title: `Day ${n}`, weekNumber: n });
    await Lesson.create({ moduleId: day.id, title: `Day ${n} Lesson 1`, order: 1 });
  }
  const student = await makeUser("dc-student@example.com", "student");
  const token = await loginAs(student.email);
  await DiscountCode.create({ code: "FULLPAY15", percentOff: 15 });
  memAdapter.clear();
  return { course, student, token };
}

function json(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

function mockFlutterwave(transaction: Record<string, unknown> = {}) {
  let txRef = "";
  const mock = jest.spyOn(global, "fetch").mockImplementation(async (input, init) => {
    const url = String(input);
    if (url.endsWith("/v3/payments")) {
      txRef = JSON.parse(String((init as RequestInit).body)).tx_ref;
      return json({ status: "success", data: { link: "https://checkout.flutterwave.com/v3/hosted/pay/abc" } });
    }
    if (/\/v3\/transactions\/\d+\/verify$/.test(url)) {
      return json({
        status: "success",
        data: { id: 4242, tx_ref: txRef, status: "successful", currency: "KES", amount: DISCOUNTED, ...transaction },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  });
  return { mock };
}

describe("Discount codes", () => {
  const original = { ...config.flutterwave, live: config.liveCountries };
  beforeEach(() => {
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
    config.flutterwave.secretHash = HASH;
    config.liveCountries = ["KE"];
  });
  afterEach(() => jest.restoreAllMocks());
  afterAll(() => {
    config.flutterwave.secretKey = original.secretKey;
    config.flutterwave.secretHash = original.secretHash;
    config.liveCountries = original.live;
  });

  it("quotes 15% off the full price, case-insensitively, leaving the deposit alone", async () => {
    const { course, token } = await setup();
    const res = await request(app)
      .get(`/api/payments/quote/${course.id}?discountCode=fullpay15`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quote.discount).toEqual({ code: "FULLPAY15", percentOff: 15, originalAmount: PRICE, amount: DISCOUNTED });
    expect(res.body.quote.instalment.depositNgn).toBe(DEPOSIT);
  });

  it("rejects an unknown, inactive or expired code", async () => {
    const { course, token } = await setup();
    await DiscountCode.create({ code: "OFF", percentOff: 10, active: false });
    await DiscountCode.create({ code: "OLD", percentOff: 10, expiresAt: new Date(Date.now() - 1000) });
    for (const code of ["NOPE", "OFF", "OLD"]) {
      const res = await request(app)
        .get(`/api/payments/quote/${course.id}?discountCode=${code}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(400);
      expect(res.body.error.message).toMatch(/isn't valid/);
    }
  });

  it("charges the discounted price in full and confirms the course when it's paid", async () => {
    const { course, student, token } = await setup();
    const { mock } = mockFlutterwave();
    const start = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, discountCode: "FULLPAY15" });
    expect(start.status).toBe(201);
    const sent = JSON.parse(String((mock.mock.calls[0][1] as RequestInit).body));
    expect(sent).toMatchObject({ amount: DISCOUNTED, currency: "KES", meta: { instalment: "full" } });
    const pending = await Payment.findOne({ where: { studentId: student.id } });
    expect(pending).toMatchObject({ discountCode: "FULLPAY15", notes: "Full payment (code FULLPAY15) (Flutterwave)" });

    const res = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${token}`)
      .send({ transactionId: "4242" });
    expect(res.status).toBe(200);
    expect(res.body.outcome).toBe("confirmed");
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.paymentConfirmed).toBe(true);
  });

  it("doesn't confirm a discounted checkout paid with the wrong amount", async () => {
    const { course, student, token } = await setup();
    mockFlutterwave({ amount: 100 });
    await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, discountCode: "FULLPAY15" });
    const res = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${token}`)
      .send({ transactionId: "4242" });
    expect(res.body.outcome).toBe("unmatched");
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.paymentConfirmed).toBe(false);
  });

  it("still expects the full price for a checkout opened without a code", async () => {
    const { course, student, token } = await setup();
    mockFlutterwave({ amount: DISCOUNTED });
    await request(app).post("/api/payments/card").set("Authorization", `Bearer ${token}`).send({ courseId: course.id });
    const res = await request(app)
      .post("/api/payments/instalment/verify")
      .set("Authorization", `Bearer ${token}`)
      .send({ transactionId: "4242" });
    expect(res.body.outcome).toBe("unmatched");
    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.paymentConfirmed).toBe(false);
  });

  it("lets admins create, edit and delete codes; students can't", async () => {
    await setup();
    await makeUser("dc-admin@example.com", "admin");
    const admin = await loginAs("dc-admin@example.com");
    const created = await request(app)
      .post("/api/admin/discount-codes")
      .set("Authorization", `Bearer ${admin}`)
      .send({ code: "easter20", percentOff: 20, description: "Easter" });
    expect(created.status).toBe(201);
    expect(created.body.code).toMatchObject({ code: "EASTER20", percentOff: 20, active: true });

    const dup = await request(app)
      .post("/api/admin/discount-codes")
      .set("Authorization", `Bearer ${admin}`)
      .send({ code: "FULLPAY15", percentOff: 15 });
    expect(dup.status).toBe(409);

    const off = await request(app)
      .patch(`/api/admin/discount-codes/${created.body.code.id}`)
      .set("Authorization", `Bearer ${admin}`)
      .send({ code: "EASTER20", percentOff: 20, active: false });
    expect(off.body.code.active).toBe(false);

    const list = await request(app).get("/api/admin/discount-codes").set("Authorization", `Bearer ${admin}`);
    expect(list.body.codes.map((c: { code: string }) => c.code).sort()).toEqual(["EASTER20", "FULLPAY15"]);

    const del = await request(app)
      .delete(`/api/admin/discount-codes/${created.body.code.id}`)
      .set("Authorization", `Bearer ${admin}`);
    expect(del.status).toBe(204);

    const student = await loginAs("dc-student@example.com");
    const denied = await request(app).get("/api/admin/discount-codes").set("Authorization", `Bearer ${student}`);
    expect(denied.status).toBe(403);
  });
});
