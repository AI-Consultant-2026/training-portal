import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, Enrollment, Payment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";
import { storageAdapter } from "../../src/utils/storage";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

async function makeUser(email: string, role: "student" | "admin" | "instructor") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: role === "student" ? "Ada" : "Jest",
    lastName: role === "student" ? "Obi" : "Admin",
    role,
    emailVerifiedAt: new Date(),
  });
}

async function tokenFor(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setup() {
  const instructor = await makeUser("pc-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    durationWeeks: 18,
    status: "published",
    instructorId: instructor.id,
  });
  const student = await makeUser("pc-student@example.com", "student");
  await makeUser("pc-admin@example.com", "admin");
  memAdapter.clear();
  return {
    course,
    student,
    studentToken: await tokenFor("pc-student@example.com"),
    adminToken: await tokenFor("pc-admin@example.com"),
  };
}

describe("Payment confirmation flow", () => {
  it("shows a started card payment as pending until an admin confirms, then emails the student", async () => {
    const { course, studentToken, adminToken } = await setup();
    const start = await request(app)
      .post("/api/payments/card")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ courseId: course.id });
    expect(start.status).toBe(201);
    const enrollmentId = start.body.enrollment.id;

    const before = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${studentToken}`);
    expect(before.body.enrollments[0].paymentSubmittedAt).toEqual(expect.any(String));

    const pending = await request(app)
      .get(`/api/admin/courses/${course.id}/payments?status=pending`)
      .set("Authorization", `Bearer ${adminToken}`);
    const latest = pending.body.payments?.[0]?.latestPayment ?? pending.body.enrollments?.[0]?.latestPayment;
    expect(latest).toMatchObject({ method: "card", status: "pending", currency: "NGN" });

    memAdapter.clear();
    await request(app)
      .patch(`/api/admin/enrollments/${enrollmentId}/payment`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ paymentConfirmed: true });
    const unlocked = memAdapter.sentMessages.find((m) => m.to === "pc-student@example.com");
    expect(unlocked?.subject).toBe("You're in — Cyber Security Fundamentals is unlocked");
    expect(unlocked?.text).toContain("/courses/cyber-security-fundamentals");

    const after = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${studentToken}`);
    expect(after.body.enrollments[0].paymentSubmittedAt).toBeNull();
  });

  it("still lets an admin (only) open a receipt on an older payment record", async () => {
    const { course, student, studentToken, adminToken } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    const saved = await storageAdapter.save({
      buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
      originalName: "r.png",
      mimeType: "image/png",
      keyPrefix: "payment-receipts",
    });
    const payment = await Payment.create({
      enrollmentId: enrollment.id,
      studentId: student.id,
      method: "bank_transfer",
      status: "pending",
      currency: "NGN",
      amount: 200_000,
      baseAmountNgn: 200_000,
      billingCountry: "Nigeria",
      gatewayReference: "OLD-REF-1",
      receiptPath: saved.storagePath,
      receiptName: "r.png",
      receiptMimeType: "image/png",
    });

    const file = await request(app)
      .get(`/api/admin/payments/${payment.id}/receipt`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(file.status).toBe(200);
    expect(file.headers["content-type"]).toMatch(/image\/png/);
    const studentCant = await request(app)
      .get(`/api/admin/payments/${payment.id}/receipt`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(studentCant.status).toBe(403);
  });
});
