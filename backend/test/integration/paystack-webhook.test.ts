import bcrypt from "bcryptjs";
import crypto from "crypto";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { Course, Enrollment, Payment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const SECRET = "sk_test_jest_webhook_secret";
const WEBHOOK = "/api/payments/paystack/webhook";

async function makeUser(email: string, role: "student" | "instructor") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: role === "student" ? "Ada" : "Jest",
    lastName: "Obi",
    role,
    emailVerifiedAt: new Date(),
  });
}

async function setup() {
  const instructor = await makeUser("pw-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals", // ₦200,000 in COURSE_PRICES_NGN
    durationWeeks: 18,
    status: "published",
    instructorId: instructor.id,
  });
  const student = await makeUser("pw-student@example.com", "student");
  const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
  // What POST /payments/card leaves behind when the student clicks Pay.
  await Payment.create({
    enrollmentId: enrollment.id,
    studentId: student.id,
    method: "card",
    status: "pending",
    currency: "NGN",
    amount: 200_000,
    baseAmountNgn: 200_000,
    billingCountry: "",
    gatewayReference: "Paystack payment page",
  });
  memAdapter.clear();
  return { course, student, enrollment };
}

function chargeSuccess(overrides: { reference?: string; email?: string; amountKobo?: number } = {}) {
  return {
    event: "charge.success",
    data: {
      reference: overrides.reference ?? "T100200300",
      status: "success",
      currency: "NGN",
      amount: overrides.amountKobo ?? 200_000_00,
      customer: { email: overrides.email ?? "PW-Student@example.com" },
    },
  };
}

function send(payload: unknown, { secret = SECRET, signature }: { secret?: string; signature?: string } = {}) {
  const body = JSON.stringify(payload);
  const sig = signature ?? crypto.createHmac("sha512", secret).update(body).digest("hex");
  return request(app)
    .post(WEBHOOK)
    .set("Content-Type", "application/json")
    .set("x-paystack-signature", sig)
    .send(body);
}

describe("Paystack webhook", () => {
  const original = config.paystackSecretKey;
  beforeEach(() => {
    config.paystackSecretKey = SECRET;
  });
  afterAll(() => {
    config.paystackSecretKey = original;
  });

  it("refuses every call while no secret key is configured", async () => {
    config.paystackSecretKey = "";
    const res = await send(chargeSuccess());
    expect(res.status).toBe(503);
  });

  it("rejects a call whose signature doesn't match", async () => {
    const { enrollment } = await setup();
    const res = await send(chargeSuccess(), { secret: "sk_test_someone_else" });
    expect(res.status).toBe(401);
    await enrollment.reload();
    expect(enrollment.paymentConfirmed).toBe(false);
  });

  it("confirms the matching enrolment, marks the payment succeeded and emails the student", async () => {
    const { enrollment } = await setup();
    const res = await send(chargeSuccess());
    expect(res.status).toBe(200);
    expect(res.body.outcome).toBe("confirmed");

    await enrollment.reload();
    expect(enrollment.paymentConfirmed).toBe(true);
    const payments = await Payment.findAll({ where: { enrollmentId: enrollment.id } });
    expect(payments).toHaveLength(1);
    expect(payments[0]).toMatchObject({ status: "succeeded", gatewayReference: "paystack:T100200300" });
    const unlocked = memAdapter.sentMessages.find((m) => m.to === "pw-student@example.com");
    expect(unlocked?.subject).toBe("You're in — Cyber Security Fundamentals is unlocked");
  });

  it("treats a retried delivery of the same charge as a no-op", async () => {
    await setup();
    await send(chargeSuccess());
    memAdapter.clear();
    const again = await send(chargeSuccess());
    expect(again.status).toBe(200);
    expect(again.body.outcome).toBe("duplicate");
    expect(memAdapter.sentMessages).toHaveLength(0);
  });

  it("leaves a payment it can't match for the team and emails them", async () => {
    const { enrollment } = await setup();
    const res = await send(chargeSuccess({ email: "someone-else@example.com" }));
    expect(res.status).toBe(200);
    expect(res.body.outcome).toBe("unmatched");
    await enrollment.reload();
    expect(enrollment.paymentConfirmed).toBe(false);
    const alert = memAdapter.sentMessages.find((m) => m.to === config.leadsNotifyEmail);
    expect(alert?.subject).toContain("needs manual confirmation");
    expect(alert?.text).toContain("T100200300");
  });

  it("doesn't confirm when the amount isn't the course price", async () => {
    const { enrollment } = await setup();
    const res = await send(chargeSuccess({ amountKobo: 150_000_00 }));
    expect(res.body.outcome).toBe("unmatched");
    await enrollment.reload();
    expect(enrollment.paymentConfirmed).toBe(false);
  });

  it("records the charge without re-emailing when an admin already confirmed the course", async () => {
    const { enrollment } = await setup();
    await enrollment.update({ paymentConfirmed: true, paymentConfirmedAt: new Date() });
    const res = await send(chargeSuccess());
    expect(res.body.outcome).toBe("already_paid");
    expect(memAdapter.sentMessages).toHaveLength(0);
    const payment = await Payment.findOne({ where: { enrollmentId: enrollment.id } });
    expect(payment?.status).toBe("succeeded");
  });

  it("ignores events other than a successful charge", async () => {
    await setup();
    const res = await send({ event: "transfer.success", data: { reference: "X" } });
    expect(res.status).toBe(200);
    expect(res.body.outcome).toBe("ignored");
  });
});
