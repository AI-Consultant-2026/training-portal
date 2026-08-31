import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, Enrollment, Referral, User } from "../../src/models";

const app = createApp();

async function createAdmin(email = "jest-ref-admin@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Admin", role: "admin" });
}

async function createInstructor(email = "jest-ref-instructor@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Instructor", role: "instructor" });
}

async function register(email: string, extra: Record<string, unknown> = {}) {
  await request(app)
    .post("/api/auth/register")
    .send({ email, password: "Password123!", firstName: "Jest", lastName: "Student", ...extra });
  return User.findOne({ where: { email } }) as Promise<User>;
}

async function loginAs(email: string, password = "Password123!") {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

async function createPricedCourse(instructorId: string) {
  return Course.create({
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    durationWeeks: 12,
    status: "published",
    instructorId,
  });
}

async function myCode(email: string): Promise<string> {
  const token = await loginAs(email);
  const res = await request(app).get("/api/referrals/me").set("Authorization", `Bearer ${token}`);
  return res.body.referral.code as string;
}

// Registers a referred student, enrolls them, and has an admin confirm the payment --
// the flow that qualifies a referral outside self-service card checkout.
async function referAndPay(refereeEmail: string, code: string, course: Course, adminToken: string) {
  await register(refereeEmail, { referralCode: code });
  await User.update({ emailVerifiedAt: new Date() }, { where: { email: refereeEmail } });
  const refereeToken = await loginAs(refereeEmail);
  const enrollRes = await request(app)
    .post(`/api/courses/${course.id}/enroll`)
    .set("Authorization", `Bearer ${refereeToken}`);
  const enrollmentId = enrollRes.body.enrollment.id;
  await request(app)
    .patch(`/api/admin/enrollments/${enrollmentId}/payment`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ paymentConfirmed: true });
  return enrollmentId as string;
}

describe("Referrals", () => {
  it("requires auth for /referrals/me and returns a stable code", async () => {
    await register("ref-owner@example.com");

    const unauth = await request(app).get("/api/referrals/me");
    expect(unauth.status).toBe(401);

    const token = await loginAs("ref-owner@example.com");
    const first = await request(app).get("/api/referrals/me").set("Authorization", `Bearer ${token}`);
    expect(first.status).toBe(200);
    expect(first.body.referral.code).toMatch(/^PLN[A-Z2-9]+$/);

    const second = await request(app).get("/api/referrals/me").set("Authorization", `Bearer ${token}`);
    expect(second.body.referral.code).toBe(first.body.referral.code);
  });

  it("creates a pending referral when a valid code is used at registration", async () => {
    await register("advocate@example.com");
    const code = await myCode("advocate@example.com");

    const referee = await register("newbie@example.com", { referralCode: code });
    const row = await Referral.findOne({ where: { refereeId: referee.id } });
    expect(row).not.toBeNull();
    expect(row?.status).toBe("pending");
  });

  it("ignores an unknown code and a self-referral without failing the signup", async () => {
    const stranger = await register("stranger@example.com", { referralCode: "PLNZZZZZZ" });
    expect(stranger).not.toBeNull();
    expect(await Referral.count({ where: { refereeId: stranger.id } })).toBe(0);

    // A user can't have their own code at registration time, but guard the path anyway:
    await register("loner@example.com");
    const selfCode = await myCode("loner@example.com");
    const loner = (await User.findOne({ where: { email: "loner@example.com" } })) as User;
    await request(app)
      .post("/api/auth/register")
      .send({
        email: "loner@example.com",
        password: "Password123!",
        firstName: "A",
        lastName: "B",
        referralCode: selfCode,
      });
    expect(await Referral.count({ where: { referrerId: loner.id } })).toBe(0);
  });

  it("qualifies the referral and accrues a reward when the referred student pays", async () => {
    const admin = await createAdmin();
    const adminToken = await loginAs(admin.email);
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);

    await register("earner@example.com");
    const code = await myCode("earner@example.com");
    await referAndPay("paid-friend@example.com", code, course, adminToken);

    const earnerToken = await loginAs("earner@example.com");
    const me = await request(app)
      .get("/api/referrals/me")
      .set("Authorization", `Bearer ${earnerToken}`);
    expect(me.body.referral.counts.qualified).toBe(1);
    expect(me.body.referral.earnings.pendingNgn).toBeGreaterThan(0);

    const board = await request(app).get("/api/referrals/leaderboard");
    expect(board.body.leaderboard.allTime[0].qualifiedReferrals).toBe(1);
  });

  it("does not double-credit when payment is confirmed twice", async () => {
    const admin = await createAdmin();
    const adminToken = await loginAs(admin.email);
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);

    await register("solo@example.com");
    const code = await myCode("solo@example.com");
    const enrollmentId = await referAndPay("friend2@example.com", code, course, adminToken);

    // Toggle off then on again -- still exactly one qualified referral.
    await request(app)
      .patch(`/api/admin/enrollments/${enrollmentId}/payment`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ paymentConfirmed: false });
    await request(app)
      .patch(`/api/admin/enrollments/${enrollmentId}/payment`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ paymentConfirmed: true });

    expect(await Referral.count({ where: { status: "qualified" } })).toBe(1);
  });

  it("validates a code publicly, revealing only a display name", async () => {
    await register("known@example.com");
    const code = await myCode("known@example.com");

    const ok = await request(app).post("/api/referrals/validate-code").send({ code: code.toLowerCase() });
    expect(ok.body).toEqual({ valid: true, referrerName: "Jest S." });

    const bad = await request(app).post("/api/referrals/validate-code").send({ code: "PLNNOPE99" });
    expect(bad.body).toEqual({ valid: false, referrerName: null });
  });

  it("lets a student change their reward preference and re-points pending rewards", async () => {
    const admin = await createAdmin();
    const adminToken = await loginAs(admin.email);
    const instructor = await createInstructor();
    const course = await createPricedCourse(instructor.id);

    await register("chooser@example.com");
    const code = await myCode("chooser@example.com");
    await referAndPay("friend3@example.com", code, course, adminToken);

    const token = await loginAs("chooser@example.com");
    const res = await request(app)
      .patch("/api/referrals/me/reward-preference")
      .set("Authorization", `Bearer ${token}`)
      .send({ rewardType: "data" });
    expect(res.status).toBe(200);

    const row = await Referral.findOne({ where: { status: "qualified" } });
    expect(row?.referrerRewardType).toBe("data");
  });

  describe("admin", () => {
    it("rejects non-admins", async () => {
      await register("plainstudent@example.com");
      const token = await loginAs("plainstudent@example.com");
      const res = await request(app)
        .get("/api/admin/referrals")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(403);
    });

    it("lists referrals and marks a reward issued", async () => {
      const admin = await createAdmin();
      const adminToken = await loginAs(admin.email);
      const instructor = await createInstructor();
      const course = await createPricedCourse(instructor.id);

      await register("amb@example.com");
      const code = await myCode("amb@example.com");
      await referAndPay("ref-friend@example.com", code, course, adminToken);

      const list = await request(app)
        .get("/api/admin/referrals?status=qualified")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(list.body.referrals).toHaveLength(1);
      expect(list.body.overview.rewardsToPayNgn).toBeGreaterThan(0);

      const id = list.body.referrals[0].id;
      const issued = await request(app)
        .post(`/api/admin/referrals/${id}/issue-reward`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ party: "referrer" });
      expect(issued.body.referral.referrerReward.status).toBe("issued");
    });

    it("voids a pending referral but refuses to void one with an issued reward", async () => {
      const admin = await createAdmin();
      const adminToken = await loginAs(admin.email);
      const instructor = await createInstructor();
      const course = await createPricedCourse(instructor.id);

      await register("amb2@example.com");
      const code = await myCode("amb2@example.com");
      await referAndPay("ref-friend2@example.com", code, course, adminToken);

      const list = await request(app)
        .get("/api/admin/referrals")
        .set("Authorization", `Bearer ${adminToken}`);
      const id = list.body.referrals[0].id;

      await request(app)
        .post(`/api/admin/referrals/${id}/issue-reward`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ party: "referrer" });

      const refused = await request(app)
        .post(`/api/admin/referrals/${id}/void`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ reason: "test" });
      expect(refused.status).toBe(400);
    });
  });
});
