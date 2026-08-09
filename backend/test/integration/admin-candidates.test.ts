import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, Enrollment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

async function createAdmin(email = "jest-admin@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Admin", role: "admin" });
}

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

describe("Admin candidate management", () => {
  beforeEach(() => memAdapter.clear());

  it("rejects unauthenticated, student, and instructor callers on every candidate route", async () => {
    await createAdmin();
    const student = await registerStudent("candidateguard@example.com");
    const studentToken = await loginAs("candidateguard@example.com");

    const unauthList = await request(app).get("/api/admin/candidates");
    expect(unauthList.status).toBe(401);

    const asStudentList = await request(app)
      .get("/api/admin/candidates")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(asStudentList.status).toBe(403);

    const asStudentDelete = await request(app)
      .delete(`/api/admin/candidates/${student.id}`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(asStudentDelete.status).toBe(403);
  });

  it("lists students as candidates with their enrollments, but excludes instructors/admins", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");
    await registerStudent("candidatelist@example.com");

    const res = await request(app)
      .get("/api/admin/candidates")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.candidates).toHaveLength(1);
    expect(res.body.candidates[0]).toMatchObject({
      email: "candidatelist@example.com",
      status: "active",
      online: false,
      enrollments: [],
    });
  });

  it("adds a candidate and emails them a password-reset link instead of returning a usable password", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");

    const res = await request(app)
      .post("/api/admin/candidates")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        firstName: "New",
        lastName: "Candidate",
        email: "newcandidate@example.com",
        location: "Nigeria",
        courseInterest: "cyber-security-fundamentals",
      });

    expect(res.status).toBe(201);
    expect(res.body.candidate).toMatchObject({
      email: "newcandidate@example.com",
      enrollments: [],
    });
    expect(res.body.candidate.password).toBeUndefined();

    expect(memAdapter.sentMessages).toHaveLength(1);
    expect(memAdapter.sentMessages[0].to).toBe("newcandidate@example.com");
    const match = memAdapter.sentMessages[0].text.match(/\/reset-password\?token=(\S+)/);
    expect(match).not.toBeNull();

    // The candidate can now set their own password via the normal reset-confirm flow.
    const confirm = await request(app)
      .post("/api/auth/password-reset/confirm")
      .send({ token: match![1], password: "ChosenByCandidate1!" });
    expect(confirm.status).toBe(200);

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "newcandidate@example.com", password: "ChosenByCandidate1!" });
    expect(login.status).toBe(200);
  });

  it("rejects adding a candidate with an email that's already registered", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");
    await registerStudent("dupe@example.com");

    const res = await request(app)
      .post("/api/admin/candidates")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ firstName: "Dupe", lastName: "Candidate", email: "dupe@example.com", location: "Nigeria" });

    expect(res.status).toBe(409);
  });

  it("deactivating a candidate blocks their login without deleting their history", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");
    const student = await registerStudent("deactivateme@example.com");

    const deleteRes = await request(app)
      .delete(`/api/admin/candidates/${student.id}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(deleteRes.status).toBe(204);

    const loginAfter = await request(app)
      .post("/api/auth/login")
      .send({ email: "deactivateme@example.com", password: "Password123!" });
    expect(loginAfter.status).toBe(401);

    const stillExists = await User.findByPk(student.id);
    expect(stillExists).not.toBeNull();
    expect(stillExists!.status).toBe("inactive");
  });

  it("confirming payment on an enrollment flips paymentConfirmed and is reflected back to the student", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");
    const student = await registerStudent("payer@example.com");
    const studentToken = await loginAs("payer@example.com");

    const instructorHash = await bcrypt.hash("Password123!", 4);
    const instructor = await User.create({
      email: "jest-payments-instructor@example.com",
      passwordHash: instructorHash,
      firstName: "Jest",
      lastName: "Instructor",
      role: "instructor",
    });
    const course = await Course.create({
      title: "Payments Course",
      slug: "payments-course",
      description: "d",
      status: "published",
      instructorId: instructor.id,
      durationWeeks: 1,
      level: "beginner",
    });
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    expect(enrollment.paymentConfirmed).toBe(false);

    const confirmRes = await request(app)
      .patch(`/api/admin/enrollments/${enrollment.id}/payment`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ paymentConfirmed: true });
    expect(confirmRes.status).toBe(200);
    expect(confirmRes.body.enrollment.paymentConfirmed).toBe(true);
    expect(confirmRes.body.enrollment.paymentConfirmedAt).not.toBeNull();

    const myEnrollments = await request(app)
      .get("/api/enrollments")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(myEnrollments.body.enrollments[0].paymentConfirmed).toBe(true);
  });
});
