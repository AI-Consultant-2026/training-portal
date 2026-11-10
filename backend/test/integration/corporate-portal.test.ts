import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, CorporateMember, Enrollment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

// Corporate staff portal (2026-11-10): Paleon sets up a company with seats per corporate
// course; staff create their own login with the company's join link and get the course
// unlocked; managers see seats and progress at /company.

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const PASSWORD = "Password123!";

async function makeUser(email: string, role: "student" | "admin" = "student") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash(PASSWORD, 4),
    firstName: "Ada",
    lastName: "Obi",
    role,
    emailVerifiedAt: new Date(),
  });
}

async function loginAs(email: string, password = PASSWORD) {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

async function setup() {
  const cyber = await Course.create({
    title: "CyberSecure Workforce Essentials",
    slug: "cybersecure-workforce-essentials",
    durationWeeks: 13,
    status: "published",
    metadata: { corporate: true },
  });
  const ai = await Course.create({
    title: "AI Workflow Productivity & Process Transformation",
    slug: "ai-workflow-productivity",
    durationWeeks: 10,
    status: "published",
    metadata: { corporate: true },
  });
  const publicCourse = await Course.create({
    title: "Digital Marketing",
    slug: "digital-marketing",
    durationWeeks: 8,
    status: "published",
  });
  await makeUser("admin@example.com", "admin");
  const adminToken = await loginAs("admin@example.com");
  const created = await request(app)
    .post("/api/admin/corporate-clients")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Acme Ltd",
      country: "KE",
      emailDomain: "acme.example",
      seats: [{ courseId: cyber.id, seats: 2 }],
    });
  expect(created.status).toBe(201);
  memAdapter.clear();
  return { cyber, ai, publicCourse, adminToken, client: created.body.client };
}

function joinBody(email: string, courseIds: string[]) {
  return { firstName: "Wanjiru", lastName: "Kamau", email, password: "StrongPass2026", courseIds };
}

describe("corporate staff portal", () => {
  it("lets staff create a login with the join link and unlocks the course with a seat", async () => {
    const { cyber, client } = await setup();
    expect(client.joinCode).toMatch(/^[a-z2-9]{10}$/);
    expect(client.seats[0]).toMatchObject({ seats: 2, used: 0, left: 2 });

    const info = await request(app).get(`/api/corporate/join/${client.joinCode}`);
    expect(info.status).toBe(200);
    expect(info.body).toMatchObject({ companyName: "Acme Ltd", emailDomain: "acme.example" });
    expect(info.body.courses).toEqual([expect.objectContaining({ courseId: cyber.id, seatsLeft: 2, open: true })]);

    const res = await request(app)
      .post(`/api/corporate/join/${client.joinCode}`)
      .send(joinBody("wanjiru@acme.example", [cyber.id]));
    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.headers["set-cookie"]?.[0]).toMatch(/^rt=/);

    const user = await User.findOne({ where: { email: "wanjiru@acme.example" } });
    expect(user!.country).toBe("KE");
    const enrollment = await Enrollment.findOne({ where: { studentId: user!.id, courseId: cyber.id } });
    expect(enrollment).toMatchObject({ paymentConfirmed: true, corporateClientId: client.id, status: "active" });
    expect(memAdapter.sentMessages.map((m) => m.subject)).toContain("Welcome to Paleon Training (Acme Ltd)");

    // The corporate course shows in their catalogue; can log in with the password they chose.
    const token = await loginAs("wanjiru@acme.example", "StrongPass2026");
    const courses = await request(app).get("/api/courses").set("Authorization", `Bearer ${token}`);
    expect(courses.body.courses.map((c: { slug: string }) => c.slug)).toContain("cybersecure-workforce-essentials");
    expect(courses.body.courses.map((c: { slug: string }) => c.slug)).not.toContain("ai-workflow-productivity");
  });

  it("rejects a non-work email, unknown codes, and courses without seats", async () => {
    const { cyber, ai, client } = await setup();
    const wrong = await request(app)
      .post(`/api/corporate/join/${client.joinCode}`)
      .send(joinBody("someone@gmail.com", [cyber.id]));
    expect(wrong.status).toBe(400);
    expect(wrong.body.error.message).toMatch(/acme\.example/);

    expect((await request(app).get("/api/corporate/join/notarealcode")).status).toBe(404);

    const noSeats = await request(app)
      .post(`/api/corporate/join/${client.joinCode}`)
      .send(joinBody("a@acme.example", [ai.id]));
    expect(noSeats.status).toBe(400);
    // Nothing half-created when the seat check fails.
    expect(await User.findOne({ where: { email: "a@acme.example" } })).toBeNull();
  });

  it("stops sign-ups once the seats are used, and removing someone frees their seat", async () => {
    const { cyber, client, adminToken } = await setup();
    for (const email of ["one@acme.example", "two@acme.example"]) {
      const r = await request(app).post(`/api/corporate/join/${client.joinCode}`).send(joinBody(email, [cyber.id]));
      expect(r.status).toBe(201);
    }
    const full = await request(app)
      .post(`/api/corporate/join/${client.joinCode}`)
      .send(joinBody("three@acme.example", [cyber.id]));
    expect(full.status).toBe(409);
    expect(full.body.error.message).toMatch(/no seats left/);

    const one = await User.findOne({ where: { email: "one@acme.example" } });
    const removed = await request(app)
      .delete(`/api/admin/corporate-clients/${client.id}/members/${one!.id}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(removed.status).toBe(200);
    expect(removed.body.client.seats[0]).toMatchObject({ used: 1, left: 1 });
    expect(await CorporateMember.findOne({ where: { userId: one!.id } })).toBeNull();
    const suspended = await Enrollment.findOne({ where: { studentId: one!.id } });
    expect(suspended).toMatchObject({ status: "suspended", paymentConfirmed: false });

    // Removed staff no longer see the course.
    const oneToken = await loginAs("one@acme.example", "StrongPass2026");
    const mine = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${oneToken}`);
    expect(mine.status).toBe(200);
    expect(mine.body.enrollments).toHaveLength(0);
    const detail = await request(app)
      .get(`/api/courses/${cyber.slug}`)
      .set("Authorization", `Bearer ${oneToken}`);
    expect(detail.status).toBe(404);

    // Can't cut seats below what is in use.
    const tooFew = await request(app)
      .patch(`/api/admin/corporate-clients/${client.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ seats: [{ courseId: cyber.id, seats: 0 }] });
    expect(tooFew.status).toBe(400);
  });

  it("lets an existing learner join with their own account and closes sign-ups after expiry", async () => {
    const { cyber, ai, client, adminToken } = await setup();
    await makeUser("existing@acme.example");
    const token = await loginAs("existing@acme.example");

    const dup = await request(app)
      .post(`/api/corporate/join/${client.joinCode}`)
      .send(joinBody("existing@acme.example", [cyber.id]));
    expect(dup.status).toBe(409);

    const joined = await request(app)
      .post(`/api/corporate/join/${client.joinCode}/existing`)
      .set("Authorization", `Bearer ${token}`)
      .send({ courseIds: [cyber.id] });
    expect(joined.status).toBe(200);
    expect(joined.body.enrolled).toEqual([cyber.title]);

    // Add a second course later, but its sign-ups have closed.
    await request(app)
      .patch(`/api/admin/corporate-clients/${client.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ seats: [{ courseId: ai.id, seats: 5, expiresAt: "2020-01-01T00:00:00Z" }] });
    const closed = await request(app)
      .post(`/api/corporate/join/${client.joinCode}/existing`)
      .set("Authorization", `Bearer ${token}`)
      .send({ courseIds: [ai.id] });
    expect(closed.status).toBe(409);
    expect(closed.body.error.message).toMatch(/closed/);
  });

  it("blocks self-enrolment and the public preview for corporate courses", async () => {
    const { cyber } = await setup();
    await makeUser("learner@example.com");
    const token = await loginAs("learner@example.com");
    const catalogue = await request(app).get("/api/courses").set("Authorization", `Bearer ${token}`);
    expect(catalogue.body.courses.map((c: { slug: string }) => c.slug)).toEqual(["digital-marketing"]);
    const enrol = await request(app)
      .post(`/api/courses/${cyber.slug}/enroll`)
      .set("Authorization", `Bearer ${token}`);
    expect([403, 404]).toContain(enrol.status);
    expect(await Enrollment.count({ where: { courseId: cyber.id } })).toBe(0);
    expect((await request(app).get(`/api/courses/${cyber.slug}/preview`)).status).toBe(404);
  });

  it("shows managers seats and staff progress, and lets them invite and remove staff", async () => {
    const { cyber, client, adminToken } = await setup();
    await request(app)
      .post(`/api/corporate/join/${client.joinCode}`)
      .send({ ...joinBody("hr@acme.example", [cyber.id]), firstName: "Hana" });
    await request(app).post(`/api/corporate/join/${client.joinCode}`).send(joinBody("staff@acme.example", [cyber.id]));
    const hr = await User.findOne({ where: { email: "hr@acme.example" } });
    const staff = await User.findOne({ where: { email: "staff@acme.example" } });
    const hrToken = await loginAs("hr@acme.example", "StrongPass2026");

    // Not a manager yet: sees only their own company basics.
    const before = await request(app).get("/api/corporate/me").set("Authorization", `Bearer ${hrToken}`);
    expect(before.body.company).toMatchObject({ name: "Acme Ltd", isManager: false });
    expect(before.body.company.members).toBeUndefined();
    expect(
      (await request(app).post("/api/corporate/me/invites").set("Authorization", `Bearer ${hrToken}`).send({
        emails: ["new@acme.example"],
      })).status,
    ).toBe(403);

    await request(app)
      .patch(`/api/admin/corporate-clients/${client.id}/members/${hr!.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ isManager: true });

    const me = await request(app).get("/api/corporate/me").set("Authorization", `Bearer ${hrToken}`);
    expect(me.body.company.isManager).toBe(true);
    expect(me.body.company.seats[0]).toMatchObject({ seats: 2, used: 2, left: 0 });
    expect(me.body.company.members).toHaveLength(2);
    expect(me.body.company.members[1].courses[0]).toMatchObject({ courseTitle: cyber.title, progressPercent: 0 });

    // No seats left, so inviting is refused until Paleon adds more.
    const noSeats = await request(app)
      .post("/api/corporate/me/invites")
      .set("Authorization", `Bearer ${hrToken}`)
      .send({ emails: ["new@acme.example"] });
    expect(noSeats.status).toBe(400);

    const removed = await request(app)
      .delete(`/api/corporate/me/members/${staff!.id}`)
      .set("Authorization", `Bearer ${hrToken}`);
    expect(removed.status).toBe(200);
    expect(removed.body.company.members).toHaveLength(1);

    memAdapter.clear();
    const invite = await request(app)
      .post("/api/corporate/me/invites")
      .set("Authorization", `Bearer ${hrToken}`)
      .send({ emails: ["new@acme.example", "NEW@acme.example"] });
    expect(invite.body).toEqual({ sent: 1 });
    expect(memAdapter.sentMessages[0].text).toContain(`/company/join/${client.joinCode}`);
    expect(memAdapter.sentMessages[0].text).toContain("Hana Kamau at Acme Ltd");

    const wrongDomain = await request(app)
      .post("/api/corporate/me/invites")
      .set("Authorization", `Bearer ${hrToken}`)
      .send({ emails: ["x@gmail.com"] });
    expect(wrongDomain.status).toBe(400);
  });

  it("is admin-only to manage companies, and a suspended company's link stops working", async () => {
    const { client, adminToken } = await setup();
    await makeUser("learner@example.com");
    const token = await loginAs("learner@example.com");
    expect((await request(app).get("/api/admin/corporate-clients").set("Authorization", `Bearer ${token}`)).status).toBe(
      403,
    );
    const list = await request(app).get("/api/admin/corporate-clients").set("Authorization", `Bearer ${adminToken}`);
    expect(list.body.clients).toHaveLength(1);
    expect(list.body.courses.map((c: { slug: string }) => c.slug).sort()).toEqual([
      "ai-workflow-productivity",
      "cybersecure-workforce-essentials",
    ]);

    await request(app)
      .patch(`/api/admin/corporate-clients/${client.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "suspended" });
    expect((await request(app).get(`/api/corporate/join/${client.joinCode}`)).status).toBe(403);

    const regen = await request(app)
      .post(`/api/admin/corporate-clients/${client.id}/join-code`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(regen.body.client.joinCode).not.toBe(client.joinCode);
  });
});
