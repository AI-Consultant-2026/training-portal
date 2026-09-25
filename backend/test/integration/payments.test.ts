import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { Course, Enrollment, Payment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

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
  // Bank transfers are on by default but can be switched off (BANK_TRANSFER_ENABLED); the
  // existing tests below exercise the enabled flow, and the "paused" block covers the rest.
  // Card payments are OFF by default (CARD_PAYMENTS_ENABLED, since the gateway is a mock);
  // the existing card tests switch them on to exercise the flow a real gateway will use,
  // and the "card payments off" block covers the default.
  const originalBankTransferEnabled = config.bankTransfer.enabled;
  const originalCardEnabled = config.card.enabled;
  beforeAll(() => {
    config.bankTransfer.enabled = true;
    config.card.enabled = true;
  });
  afterAll(() => {
    config.bankTransfer.enabled = originalBankTransferEnabled;
    config.card.enabled = originalCardEnabled;
  });

  it("defaults card payments to off when CARD_PAYMENTS_ENABLED isn't set", () => {
    expect(process.env.CARD_PAYMENTS_ENABLED).toBeUndefined();
    expect(originalCardEnabled).toBe(false);
  });

  describe("while card payments are off (the default)", () => {
    beforeEach(() => {
      config.card.enabled = false;
    });
    afterEach(() => {
      config.card.enabled = true;
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
        .send({ courseId: course.id, ...validCard });

      expect(res.status).toBe(503);
      expect(res.body.error.message).toMatch(/temporarily unavailable/i);
      expect(res.body.error.details.code).toBe("CARD_PAYMENTS_DISABLED");
      expect(await Payment.count({ where: { studentId: student.id } })).toBe(0);
      const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
      expect(enrollment?.paymentConfirmed).toBe(false);
    });

    it("flags card payments as disabled in the quote", async () => {
      const instructor = await createInstructor("card-off-inst2@example.com");
      const course = await createPricedCourse(instructor.id);
      await registerStudent("card-off2@example.com");
      const token = await loginAs("card-off2@example.com");

      const res = await request(app)
        .get(`/api/payments/quote/${course.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.quote.card.enabled).toBe(false);
      expect(res.body.quote.bankTransfer.enabled).toBe(true);
    });
  });

  describe("interim bank account notice (BANK_TRANSFER_TEMPORARY_NOTICE)", () => {
    const originalNotice = config.bankTransfer.temporaryNotice;
    afterEach(() => {
      config.bankTransfer.temporaryNotice = originalNotice;
    });

    it("is on by default and can be switched off by config alone", async () => {
      expect(process.env.BANK_TRANSFER_TEMPORARY_NOTICE).toBeUndefined();
      expect(originalNotice).toBe(true);

      const instructor = await createInstructor("notice-inst@example.com");
      const course = await createPricedCourse(instructor.id);
      await registerStudent("notice1@example.com");
      const token = await loginAs("notice1@example.com");

      const on = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
      expect(on.body.quote.bankTransfer.temporaryNotice).toBe(true);

      config.bankTransfer.temporaryNotice = false;
      const off = await request(app).get(`/api/payments/quote/${course.id}`).set("Authorization", `Bearer ${token}`);
      expect(off.body.quote.bankTransfer.temporaryNotice).toBe(false);
      expect(off.body.quote.bankTransfer.enabled).toBe(true);
    });
  });

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
    expect(res.body.quote.bankTransfer.bankDetails.accountName).toBe("Paleon Training Limited");
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
  describe("bank transfer for a student who hasn't enrolled yet (Enroll just opens the page)", () => {
    it("creates the enrolment on submit, unpaid, with a pending payment and exactly one enrolment email", async () => {
      const instructor = await createInstructor();
      const course = await createPricedCourse(instructor.id);
      const student = await registerStudent("bank-new@example.com");
      await User.update({ emailVerifiedAt: new Date() }, { where: { id: student.id } });
      const token = await loginAs("bank-new@example.com");

      memAdapter.clear();
      const res = await request(app)
        .post("/api/payments/bank-transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({ courseId: course.id, transferReference: "GTB-NEW-1" });

      expect(res.status).toBe(201);
      expect(res.body.payment.status).toBe("pending");
      expect(res.body.enrollment.paymentConfirmed).toBe(false);
      expect(await Enrollment.count({ where: { courseId: course.id, studentId: student.id } })).toBe(1);
      await new Promise((r) => setTimeout(r, 100)); // enrolment email is fire-and-forget
      // One combined email: enrolled + payment details received (no separate enrolment email).
      const first = memAdapter.sentMessages.filter((m) => m.to === "bank-new@example.com");
      expect(first).toHaveLength(1);
      expect(first[0].subject).toBe("You're enrolled in Cyber Security Fundamentals \u2014 payment details received");

      // A second submission reuses the enrolment rather than duplicating it; the student gets
      // an acknowledgement of the new reference, not another enrolment email.
      memAdapter.clear();
      const again = await request(app)
        .post("/api/payments/bank-transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({ courseId: course.id, transferReference: "GTB-NEW-2" });
      expect(again.status).toBe(201);
      expect(await Enrollment.count({ where: { courseId: course.id, studentId: student.id } })).toBe(1);
      await new Promise((r) => setTimeout(r, 100));
      const second = memAdapter.sentMessages.filter((m) => m.to === "bank-new@example.com");
      expect(second.map((m) => m.subject)).toEqual(["We've received your payment details \u2014 Cyber Security Fundamentals"]);
    });

    it("refuses an unverified student and creates no enrolment or payment", async () => {
      const instructor = await createInstructor();
      const course = await createPricedCourse(instructor.id);
      const student = await registerStudent("bank-unverified@example.com");
      const token = await loginAs("bank-unverified@example.com");

      const res = await request(app)
        .post("/api/payments/bank-transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({ courseId: course.id, transferReference: "GTB-UNV-1" });

      expect(res.status).toBe(403);
      expect(await Enrollment.count({ where: { studentId: student.id } })).toBe(0);
      expect(await Payment.count({ where: { studentId: student.id } })).toBe(0);
    });
  });

  describe("while bank transfers are paused (BANK_TRANSFER_ENABLED off)", () => {
    beforeEach(() => {
      config.bankTransfer.enabled = false;
    });
    afterEach(() => {
      config.bankTransfer.enabled = true;
    });

    it("rejects a bank transfer submission with a 503 and records nothing", async () => {
      const instructor = await createInstructor();
      const course = await createPricedCourse(instructor.id);
      const student = await registerStudent("paused1@example.com");
      const token = await loginAs("paused1@example.com");

      const res = await request(app)
        .post("/api/payments/bank-transfer")
        .set("Authorization", `Bearer ${token}`)
        .send({ courseId: course.id, transferReference: "REF-PAUSED-1" });

      expect(res.status).toBe(503);
      expect(res.body.error.message).toMatch(/temporarily unavailable/i);
      expect(res.body.error.details.code).toBe("BANK_TRANSFER_DISABLED");
      expect(await Payment.count({ where: { studentId: student.id } })).toBe(0);
      expect(await Enrollment.count({ where: { studentId: student.id } })).toBe(0);
    });

    it("still returns a quote, but flags the flow as disabled and withholds the account details", async () => {
      const instructor = await createInstructor("paused-inst@example.com");
      const course = await createPricedCourse(instructor.id);
      await registerStudent("paused2@example.com");
      const token = await loginAs("paused2@example.com");

      const res = await request(app)
        .get(`/api/payments/quote/${course.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.quote.bankTransfer.enabled).toBe(false);
      expect(res.body.quote.bankTransfer.bankDetails).toEqual({
        bankName: "",
        accountName: "",
        accountNumber: "",
        sortCodeOrIban: "",
      });
      // The card quote is unaffected.
      expect(res.body.quote.card.currency).toBe("GBP");
    });

    it("leaves card payments working", async () => {
      const instructor = await createInstructor("paused-inst2@example.com");
      const course = await createPricedCourse(instructor.id);
      await registerStudent("paused3@example.com");
      const token = await loginAs("paused3@example.com");

      const res = await request(app)
        .post("/api/payments/card")
        .set("Authorization", `Bearer ${token}`)
        .send({ courseId: course.id, ...validCard });

      expect(res.status).not.toBe(503);
    });
  });
});
