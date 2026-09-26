import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
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

const PAYSTACK_LINK = "https://paystack.com/pay/jest-cyber-security";

describe("Payments", () => {
  // Pin the priced course's link so these tests don't depend on the real one; the "no
  // Paystack link" block covers a course without one.
  const originalLink = PAYSTACK_PAYMENT_LINKS["cyber-security-fundamentals"];
  beforeAll(() => {
    PAYSTACK_PAYMENT_LINKS["cyber-security-fundamentals"] = PAYSTACK_LINK;
  });
  afterAll(() => {
    PAYSTACK_PAYMENT_LINKS["cyber-security-fundamentals"] = originalLink;
  });

  it("has a real Paystack link for every live course", () => {
    for (const slug of ["cyber-security-fundamentals", "digital-marketing", "gis-and-drone-mapping", "hse-fundamentals"]) {
      const link = slug === "cyber-security-fundamentals" ? originalLink : PAYSTACK_PAYMENT_LINKS[slug];
      expect(link).toMatch(/^https:\/\/paystack\.com\//);
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

  it("quotes the course price in NGN with card payment available", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    await registerStudent("quote-student@example.com");
    const token = await loginAs("quote-student@example.com");

    const res = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.quote).toEqual({
      baseAmountNgn: 200_000,
      card: { currency: "NGN", amount: 200_000, enabled: true },
    });
  });

  it("returns the Paystack link and records one pending NGN card payment without confirming it", async () => {
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
    expect(res.body.paymentLink).toBe(PAYSTACK_LINK);
    expect(res.body.payment).toMatchObject({ method: "card", status: "pending", currency: "NGN" });
    expect(Number(res.body.payment.amount)).toBe(200_000);
    expect(res.body.enrollment.paymentConfirmed).toBe(false);

    // Clicking Pay again reuses the pending payment instead of piling up duplicates.
    const again = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id });
    expect(again.status).toBe(201);
    expect(again.body.payment.id).toBe(res.body.payment.id);
    expect(await Payment.count({ where: { studentId: student.id } })).toBe(1);
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

  describe("for a course with no Paystack link", () => {
    beforeEach(() => {
      PAYSTACK_PAYMENT_LINKS["cyber-security-fundamentals"] = "";
    });
    afterEach(() => {
      PAYSTACK_PAYMENT_LINKS["cyber-security-fundamentals"] = PAYSTACK_LINK;
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

    it("flags payment as unavailable in the quote, and treats a non-Paystack URL as no link", async () => {
      const instructor = await createInstructor("card-off-inst2@example.com");
      const course = await createPricedCourse(instructor.id);
      await registerStudent("card-off2@example.com");
      const token = await loginAs("card-off2@example.com");

      const none = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
      expect(none.body.quote.card.enabled).toBe(false);

      PAYSTACK_PAYMENT_LINKS["cyber-security-fundamentals"] = "https://example.com/pay/cyber";
      const foreign = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
      expect(foreign.body.quote.card.enabled).toBe(false);
    });
  });
});
