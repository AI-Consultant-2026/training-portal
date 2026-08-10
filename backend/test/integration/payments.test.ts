import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, Enrollment, Payment, User } from "../../src/models";

const app = createApp();

async function registerStudent(email: string) {
  await request(app).post("/api/auth/register").send({
    email,
    password: "Password123!",
    firstName: "Jest",
    lastName: "Student",
  });
  return User.findOne({ where: { email } }) as Promise<User>;
}

async function loginAs(email: string, password = "Password123!") {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

async function createInstructor(email = "jest-instructor@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Instructor", role: "instructor" });
}

// Slug must be one of the fixed entries in COURSE_PRICES_NGN for a quote/charge to work.
async function createPricedCourse(instructorId: string) {
  return Course.create({
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    durationWeeks: 12,
    status: "published",
    instructorId,
  });
}

const validCard = {
  cardholderName: "Jest Student",
  cardNumber: "4242 4242 4242 4242",
  expMonth: 12,
  expYear: new Date().getFullYear() + 2,
  cvv: "123",
  billingCountry: "United Kingdom",
  billingAddressLine1: "1 Test Street",
  billingCity: "London",
  billingPostalCode: "SW1A 1AA",
};

describe("Payments", () => {
  it("rejects unauthenticated and non-student callers on every payment route", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    const instructorToken = await loginAs(instructor.email);

    const unauthQuote = await request(app).get(`/api/payments/quote/${course.id}`);
    expect(unauthQuote.status).toBe(401);

    const instructorQuote = await request(app)
      .get(`/api/payments/quote/${course.id}`)
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(instructorQuote.status).toBe(403);

    const unauthCard = await request(app).post("/api/payments/card").send({ courseId: course.id, ...validCard });
    expect(unauthCard.status).toBe(401);

    const unauthBankTransfer = await request(app)
      .post("/api/payments/bank-transfer")
      .send({ courseId: course.id, transferReference: "REF123" });
    expect(unauthBankTransfer.status).toBe(401);
  });

  it("quotes the course price in NGN, GBP for card, and includes bank transfer details", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    await registerStudent("quote-student@example.com");
    const token = await loginAs("quote-student@example.com");

    const res = await request(app)
      .get(`/api/payments/quote/${course.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.quote.baseAmountNgn).toBe(200_000);
    expect(res.body.quote.card.currency).toBe("GBP");
    expect(res.body.quote.card.amount).toBeGreaterThan(0);
    expect(res.body.quote.bankTransfer.currency).toBe("NGN");
    expect(res.body.quote.bankTransfer.amount).toBe(200_000);
    expect(res.body.quote.bankTransfer.bankDetails.accountName).toBe("Paleon Training UK Limited");
  });

  it("rejects a card payment for a student who hasn't enrolled in the course", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    await registerStudent("unenrolled-card@example.com");
    const token = await loginAs("unenrolled-card@example.com");

    const res = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, ...validCard });

    expect(res.status).toBe(400);
  });

  it("charges the placeholder card gateway, confirms payment, and never stores the full card number", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    const student = await registerStudent("card-payer@example.com");
    const token = await loginAs("card-payer@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });

    const res = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, ...validCard });

    expect(res.status).toBe(201);
    expect(res.body.payment.status).toBe("succeeded");
    expect(res.body.payment.currency).toBe("GBP");
    expect(res.body.payment.cardLast4).toBe("4242");
    expect(res.body.payment.cardBrand).toBe("visa");
    expect(res.body.enrollment.paymentConfirmed).toBe(true);

    const stored = await Payment.findByPk(res.body.payment.id);
    const rawColumns = JSON.stringify(stored?.toJSON());
    expect(rawColumns).not.toContain("4242424242424242");
    expect(rawColumns).not.toContain(validCard.cvv);

    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment?.paymentConfirmed).toBe(true);
  });

  it("rejects a second card payment once payment has already been confirmed", async () => {
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
      .send({ courseId: course.id, ...validCard });

    expect(res.status).toBe(409);
  });

  it("records a bank transfer as pending without confirming payment", async () => {
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);
    const student = await registerStudent("bank-payer@example.com");
    const token = await loginAs("bank-payer@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });

    const res = await request(app)
      .post("/api/payments/bank-transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course.id, transferReference: "GTB-REF-12345" });

    expect(res.status).toBe(201);
    expect(res.body.payment.status).toBe("pending");
    expect(res.body.payment.currency).toBe("NGN");
    expect(res.body.enrollment.paymentConfirmed).toBe(false);

    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment?.paymentConfirmed).toBe(false);
  });
});
