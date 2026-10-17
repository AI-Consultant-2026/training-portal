import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, Enrollment, Referral, SalesRepStudent, User } from "../../src/models";

const app = createApp();
const DAY = 24 * 60 * 60 * 1000;

async function adminAuth() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  await User.create({ email: "rep-admin@example.com", passwordHash, firstName: "Rep", lastName: "Admin", role: "admin" });
  const res = await request(app).post("/api/auth/login").send({ email: "rep-admin@example.com", password: "Password123!" });
  return { Authorization: `Bearer ${res.body.accessToken as string}` };
}

const repInput = { name: "Tolu Ade", email: "tolu.rep@example.com", phone: "0803 000 0000", startedAt: "2026-10-01" };

describe("Sales reps", () => {
  it("is admin only", async () => {
    expect((await request(app).get("/api/admin/sales-reps")).status).toBe(401);
  });

  it("ties students who register with a REP code to the rep and works out commission", async () => {
    const auth = await adminAuth();
    const created = await request(app).post("/api/admin/sales-reps").set(auth).send(repInput);
    expect(created.status).toBe(201);
    const { id, code } = created.body.rep;
    expect(code).toMatch(/^REP[A-Z0-9]{5}$/);

    const check = await request(app).post("/api/referrals/validate-code").send({ code: code.toLowerCase() });
    expect(check.body).toMatchObject({ valid: true, referrerName: "Tolu Ade", kind: "rep" });

    await request(app)
      .post("/api/auth/register")
      .send({ email: "buyer@example.com", password: "Password123!", firstName: "Bola", lastName: "Buyer", referralCode: code });
    const student = (await User.findOne({ where: { email: "buyer@example.com" } }))!;
    expect(await SalesRepStudent.count({ where: { salesRepId: id, studentId: student.id } })).toBe(1);
    expect(await Referral.count()).toBe(0);

    const course = await Course.create({
      title: "Cyber Security Fundamentals",
      slug: "cyber-security-fundamentals",
      durationWeeks: 12,
      status: "published",
    });
    await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: true,
      paymentConfirmedAt: new Date(Date.now() - 8 * DAY),
    });

    const detail = await request(app).get(`/api/admin/sales-reps/${id}`).set(auth);
    expect(detail.status).toBe(200);
    expect(detail.body.rep).toMatchObject({ earnedNgn: 20_000, paidNgn: 0, balanceNgn: 20_000 });
    expect(detail.body.rep.sales[0]).toMatchObject({ studentName: "Bola Buyer", state: "qualified", commissionNgn: 20_000 });

    const paid = await request(app)
      .post(`/api/admin/sales-reps/${id}/payments`)
      .set(auth)
      .send({ kind: "commission", amountNgn: 20_000, paidOn: "2026-10-17", note: "Week 1" });
    expect(paid.status).toBe(201);
    expect(paid.body.rep).toMatchObject({ paidNgn: 20_000, balanceNgn: 0 });

    const list = await request(app).get("/api/admin/sales-reps").set(auth);
    expect(list.body.reps).toHaveLength(1);
    expect(list.body.reps[0]).toMatchObject({ code, counts: { students: 1, qualified: 1 } });
  });

  it("stops accepting a rep's code once the agreement has ended", async () => {
    const auth = await adminAuth();
    const created = await request(app).post("/api/admin/sales-reps").set(auth).send(repInput);
    const { id, code } = created.body.rep;
    await request(app).patch(`/api/admin/sales-reps/${id}`).set(auth).send({ ...repInput, endedAt: "2026-10-02" });

    const check = await request(app).post("/api/referrals/validate-code").send({ code });
    expect(check.body.valid).toBe(false);
    await request(app)
      .post("/api/auth/register")
      .send({ email: "late@example.com", password: "Password123!", firstName: "Late", lastName: "Comer", referralCode: code });
    expect(await SalesRepStudent.count()).toBe(0);
  });
});
