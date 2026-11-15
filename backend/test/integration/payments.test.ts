import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { PAYSTACK_PAYMENT_LINKS } from "../../src/constants/paystackPaymentLinks";
import { Course, Enrollment, Payment, User } from "../../src/models";

const app = createApp();

async function registerStudent(email: string, { verified = false } = {}) {
  await request(app).post("/api/auth/register").send({
    email,
    password: "Password123!",
    firstName: "Jest",
    lastName: "Student",
  });
  const user = (await User.findOne({ where: { email } })) as User;
  if (verified) await user.update({ emailVerifiedAt: new Date() });
  return user;
}

async function loginAs(email: string, password = "Password123!") {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

async function createInstructor(email = "jest-instructor@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Instructor", role: "instructor" });
}

// Slug must be one of the fixed entries in COURSE_PRICES_NGN for a quote/payment to work.
async function createPricedCourse(instructorId: string) {
  return Course.create({
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    durationWeeks: 12,
    status: "published",
    instructorId,
  });
}

const FLW_LINK = "https://checkout.flutterwave.com/v3/hosted/pay/jest-ng";

function json(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

// Nigeria pays through Flutterwave since 2026-11-15 (it was Paystack): opening a checkout
// returns its link, and records what the server sent.
function mockFlutterwave() {
  const opened: Record<string, unknown>[] = [];
  jest.spyOn(global, "fetch").mockImplementation(async (input, init) => {
    const url = String(input);
    if (url.endsWith("/v3/payments")) {
      opened.push(JSON.parse(String((init as RequestInit).body)));
      return json({ status: "success", data: { link: FLW_LINK } });
    }
    throw new Error(`unexpected fetch ${url}`);
  });
  return opened;
}

describe("Payments", () => {
  const original = { ...config.flutterwave };
  let opened: Record<string, unknown>[] = [];
  beforeEach(() => {
    config.flutterwave.secretKey = "FLWSECK_TEST-jest";
    config.flutterwave.secretHash = "jest-flw-hash";
    opened = mockFlutterwave();
  });
  afterEach(() => jest.restoreAllMocks());
  afterAll(() => {
    config.flutterwave.secretKey = original.secretKey;
    config.flutterwave.secretHash = original.secretHash;
  });

  // The Paystack Payment Pages stay in place (nothing else changed), though checkout no
  // longer uses them.
  it("still has a Paystack link for every live course", () => {
    for (const slug of ["cyber-security-fundamentals", "digital-marketing", "gis-and-drone-mapping", "hse-fundamentals"]) {
      expect(PAYSTACK_PAYMENT_LINKS[slug]).toMatch(/^https:\/\/paystack\.com\//);
    }
  });

  it("rejects unauthenticated and non-student callers", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    const instructorToken = await loginAs(instructor.email);

    expect((await request(app).get(`/api/payments/quote/${course.id}`)).status).toBe(401);
    const instructorQuote = await request(app)
      .get(`/api/payments/quote/${course.id}`)
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(instructorQuote.status).toBe(403);
    expect((await request(app).post("/api/payments/card").send({ courseId: course.id })).status).toBe(401);
  });

  it("quotes the course price in Naira, paid through Flutterwave", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    await registerStudent("quote-student@example.com");
    const token = await loginAs("quote-student@example.com");

    const res = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.quote).toEqual({
      checkout: {
        country: "NG",
        gateway: "flutterwave",
        currency: { code: "NGN", symbol: "\u20A6", spaced: false },
        currencyName: "Naira",
        whatsappLink: "https://wa.me/447508823495",
      },
      baseAmountNgn: 200_000,
      card: { currency: "NGN", amount: 200_000, enabled: true },
      instalment: { depositNgn: 20_000, balanceNgn: 180_000, unlockedDays: 2, enabled: true },
    });
  });

  it("opens a Flutterwave checkout for the full price in Naira and records a pending payment", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    const student = await registerStudent("card-payer@example.com");
    const token = await loginAs("card-payer@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });

    const res = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id });

    expect(res.status).toBe(201);
    expect(res.body.paymentLink).toBe(FLW_LINK);
    expect(opened[0]).toMatchObject({
      amount: 200_000,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: { email: "card-payer@example.com" },
    });
    expect(res.body.payment).toMatchObject({ method: "card", status: "pending", currency: "NGN" });
    expect(Number(res.body.payment.amount)).toBe(200_000);
    expect(Number(res.body.payment.baseAmountNgn)).toBe(200_000);
    expect(res.body.enrollment.paymentConfirmed).toBe(false);
  });

  it("enrols a verified student who hasn't enrolled yet, and refuses an unverified one", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    const verified = await registerStudent("card-new@example.com", { verified: true });
    const verifiedToken = await loginAs("card-new@example.com");

    const res = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${verifiedToken}`)
      .send({ courseId: course.id });
    expect(res.status).toBe(201);
    expect(await Enrollment.count({ where: { courseId: course.id, studentId: verified.id } })).toBe(1);

    const unverified = await registerStudent("card-unverified@example.com");
    const unverifiedToken = await loginAs("card-unverified@example.com");
    const refused = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${unverifiedToken}`)
      .send({ courseId: course.id });
    expect(refused.status).toBe(403);
    expect(await Enrollment.count({ where: { studentId: unverified.id } })).toBe(0);
    expect(await Payment.count({ where: { studentId: unverified.id } })).toBe(0);
  });

  it("rejects a card payment once payment has already been confirmed", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    const student = await registerStudent("double-payer@example.com");
    const token = await loginAs("double-payer@example.com");
    await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: true,
      paymentConfirmedAt: new Date(),
    });

    const res = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id });

    expect(res.status).toBe(409);
  });

  it("no longer has a bank transfer endpoint", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    await registerStudent("no-bank@example.com", { verified: true });
    const token = await loginAs("no-bank@example.com");

    const res = await request(app)
      .post("/api/payments/bank-transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, transferReference: "REF-1" });

    expect(res.status).toBe(404);
  });

  describe("when Flutterwave isn't configured", () => {
    beforeEach(() => {
      config.flutterwave.secretKey = "";
    });

    it("rejects a card payment with a 503, records nothing, and leaves the course locked", async () => {
      const instructor = await createInstructor("card-off-inst@example.com");
      const course = await createPricedCourse(instructor.id);
      const student = await registerStudent("card-off1@example.com");
      const token = await loginAs("card-off1@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });

      const res = await request(app)
        .post("/api/payments/card")
        .set("Authorization", `Bearer ${token}`)
        .send({ courseId: course.id });

      expect(res.status).toBe(503);
      expect(res.body.error.details.code).toBe("CARD_PAYMENTS_UNAVAILABLE");
      expect(await Payment.count({ where: { studentId: student.id } })).toBe(0);
    });

    it("flags payment as unavailable in the quote", async () => {
      const instructor = await createInstructor("card-off-inst2@example.com");
      const course = await createPricedCourse(instructor.id);
      await registerStudent("card-off2@example.com");
      const token = await loginAs("card-off2@example.com");

      const none = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
      expect(none.body.quote.card.enabled).toBe(false);
      expect(none.body.quote.instalment.enabled).toBe(false);
    });
  });
});
