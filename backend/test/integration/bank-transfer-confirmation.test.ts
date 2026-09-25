import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";
import { Course, Payment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

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
  const instructor = await makeUser("bt-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    durationWeeks: 18,
    status: "published",
    instructorId: instructor.id,
  });
  await makeUser("bt-student@example.com", "student");
  await makeUser("bt-admin@example.com", "admin");
  memAdapter.clear();
  return { course, studentToken: await tokenFor("bt-student@example.com"), adminToken: await tokenFor("bt-admin@example.com") };
}

describe("Bank transfer confirmation flow", () => {
  const original = config.bankTransfer.enabled;
  beforeAll(() => {
    config.bankTransfer.enabled = true;
  });
  afterAll(() => {
    config.bankTransfer.enabled = original;
  });

  it("stores an uploaded receipt, alerts the team with it attached, and tells the student the 2-working-day timeline", async () => {
    const { course, studentToken } = await setup();
    const res = await request(app)
      .post("/api/payments/bank-transfer")
      .set("Authorization", `Bearer ${studentToken}`)
      .field("courseId", course.id)
      .field("transferReference", "GTB-123456")
      .field("notes", "")
      .attach("receipt", Buffer.from("%PDF-1.4 receipt"), { filename: "receipt.pdf", contentType: "application/pdf" });
    expect(res.status).toBe(201);

    const payment = await Payment.findByPk(res.body.payment.id);
    expect(payment?.receiptPath).toBeTruthy();
    expect(payment?.receiptName).toBe("receipt.pdf");
    expect(payment?.notes).toBeNull();

    await new Promise((r) => setTimeout(r, 100)); // emails are fire-and-forget
    const alert = memAdapter.sentMessages.find((m) => m.to === config.leadsNotifyEmail);
    expect(alert?.subject).toBe("Bank transfer to confirm: Cyber Security Fundamentals — Ada Obi");
    expect(alert?.text).toContain("Transfer reference: GTB-123456");
    expect(alert?.text).toContain("₦200,000");
    expect(alert?.replyTo).toBe("bt-student@example.com");
    expect(alert?.attachments?.[0]).toMatchObject({ filename: "receipt.pdf", contentType: "application/pdf" });

    const receipt = memAdapter.sentMessages.find((m) => m.to === "bt-student@example.com");
    expect(receipt?.subject).toBe("You're enrolled in Cyber Security Fundamentals \u2014 payment details received");
    expect(memAdapter.sentMessages.filter((m) => m.to === "bt-student@example.com")).toHaveLength(1);
    expect(receipt?.text).toContain("within 2 working days");
  });

  it("still accepts a transfer without a receipt (JSON), and rejects a non-image/PDF receipt", async () => {
    const { course, studentToken } = await setup();
    const ok = await request(app)
      .post("/api/payments/bank-transfer")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ courseId: course.id, transferReference: "REF-1" });
    expect(ok.status).toBe(201);

    const bad = await request(app)
      .post("/api/payments/bank-transfer")
      .set("Authorization", `Bearer ${studentToken}`)
      .field("courseId", course.id)
      .field("transferReference", "REF-2")
      .attach("receipt", Buffer.from("MZ"), { filename: "x.exe", contentType: "application/x-msdownload" });
    expect(bad.status).toBe(400);
  });

  it("shows the student a 'payment submitted' date until an admin confirms, then emails them that lessons are unlocked", async () => {
    const { course, studentToken, adminToken } = await setup();
    const submit = await request(app)
      .post("/api/payments/bank-transfer")
      .set("Authorization", `Bearer ${studentToken}`)
      .field("courseId", course.id)
      .field("transferReference", "REF-3")
      .attach("receipt", Buffer.from([0x89, 0x50, 0x4e, 0x47]), { filename: "r.png", contentType: "image/png" });
    const enrollmentId = submit.body.enrollment.id;

    const before = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${studentToken}`);
    expect(before.body.enrollments[0].paymentSubmittedAt).toEqual(expect.any(String));

    // Admin can see there's a receipt and open it.
    const pending = await request(app)
      .get(`/api/admin/courses/${course.id}/payments?status=pending`)
      .set("Authorization", `Bearer ${adminToken}`);
    const latest = pending.body.payments?.[0]?.latestPayment ?? pending.body.enrollments?.[0]?.latestPayment;
    expect(latest.hasReceipt).toBe(true);
    const file = await request(app)
      .get(`/api/admin/payments/${latest.id}/receipt`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(file.status).toBe(200);
    expect(file.headers["content-type"]).toMatch(/image\/png/);
    const studentCant = await request(app)
      .get(`/api/admin/payments/${latest.id}/receipt`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(studentCant.status).toBe(403);

    memAdapter.clear();
    await request(app)
      .patch(`/api/admin/enrollments/${enrollmentId}/payment`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ paymentConfirmed: true });
    const unlocked = memAdapter.sentMessages.find((m) => m.to === "bt-student@example.com");
    expect(unlocked?.subject).toBe("You're in — Cyber Security Fundamentals is unlocked");
    expect(unlocked?.text).toContain("/courses/cyber-security-fundamentals");

    const after = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${studentToken}`);
    expect(after.body.enrollments[0].paymentSubmittedAt).toBeNull();
  });
});
