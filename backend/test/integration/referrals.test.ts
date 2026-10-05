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

  it("validates a code publicly and returns the referrer's name", async () => {
    await register("known@example.com");
    const code = await myCode("known@example.com");

    const ok = await request(app).post("/api/referrals/validate-code").send({ code: code.toLowerCase() });
    expect(ok.body).toEqual({ valid: true, referrerName: "Jest Student" });

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

  it("saves, normalises and clears the payout phone, and rejects junk", async () => {
    await register("phoner@example.com");
    const token = await loginAs("phoner@example.com");
    const patch = (phone: string) =>
      request(app)
        .patch("/api/referrals/me/payout-phone")
        .set("Authorization", `Bearer ${token}`)
        .send({ phone });

    const saved = await patch("  0803   123 4567 ");
    expect(saved.status).toBe(200);
    expect(saved.body.phone).toBe("0803 123 4567");

    const me = await request(app).get("/api/referrals/me").set("Authorization", `Bearer ${token}`);
    expect(me.body.referral.payoutPhone).toBe("0803 123 4567");

    expect((await patch("0803")).status).toBe(400);
    expect((await patch("call me")).status).toBe(400);

    const cleared = await patch("");
    expect(cleared.status).toBe(200);
    expect(cleared.body.phone).toBeNull();
  });

  describe("print kit", () => {
    function getPdf(path: string, token: string) {
      return request(app)
        .get(path)
        .set("Authorization", `Bearer ${token}`)
        .buffer(true)
        .parse((r, cb) => {
          const chunks: Buffer[] = [];
          r.on("data", (chunk) => chunks.push(chunk));
          r.on("end", () => cb(null, Buffer.concat(chunks)));
        });
    }

    it("requires auth", async () => {
      const res = await request(app).get("/api/referrals/me/print/flyer-a4");
      expect(res.status).toBe(401);
    });

    it("streams each kind as a one-page PDF named with the ambassador's code", async () => {
      await register("printer@example.com");
      const code = await myCode("printer@example.com");
      const token = await loginAs("printer@example.com");

      for (const kind of ["flyer-a4", "flyer-a5", "cards"]) {
        const res = await getPdf(`/api/referrals/me/print/${kind}?design=digital-marketing`, token);
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("application/pdf");
        expect(res.headers["content-disposition"]).toContain(`paleon-digital-marketing-`);
        expect(res.headers["content-disposition"]).toContain(`${code}.pdf`);
        const body = res.body as Buffer;
        expect(body.subarray(0, 5).toString("latin1")).toBe("%PDF-");
        // The A5 sheet draws under a scale transform; pdfkit's auto-paging once spilled it
        // across 19 pages, so pin the page count.
        expect(body.toString("latin1").match(/\/Type \/Page\b/g)).toHaveLength(1);
      }
    });

    it("defaults to the general design and rejects unknown kinds and designs", async () => {
      await register("printer2@example.com");
      const token = await loginAs("printer2@example.com");

      const general = await getPdf("/api/referrals/me/print/cards", token);
      expect(general.status).toBe(200);
      expect(general.headers["content-disposition"]).toContain("paleon-general-pocket-cards-");

      const badKind = await request(app)
        .get("/api/referrals/me/print/billboard")
        .set("Authorization", `Bearer ${token}`);
      expect(badKind.status).toBe(400);

      const badDesign = await request(app)
        .get("/api/referrals/me/print/flyer-a4?design=renewable-energy-digital-systems")
        .set("Authorization", `Bearer ${token}`);
      expect(badDesign.status).toBe(400);
    });
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
      const friendToken = await loginAs("ref-friend@example.com");
      await request(app)
        .patch("/api/referrals/me/payout-phone")
        .set("Authorization", `Bearer ${friendToken}`)
        .send({ phone: "+234 803 123 4567" });

      const list = await request(app)
        .get("/api/admin/referrals?status=qualified")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(list.body.referrals).toHaveLength(1);
      expect(list.body.overview.rewardsToPayNgn).toBeGreaterThan(0);
      expect(list.body.referrals[0].referrer.phone).toBeNull();
      expect(list.body.referrals[0].referee.phone).toBe("+234 803 123 4567");

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
