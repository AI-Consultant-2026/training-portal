import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Assignment,
  AssignmentSubmission,
  Course,
  CourseModule,
  Enrollment,
  Quiz,
  QuizAttempt,
  User,
} from "../../src/models";

const app = createApp();

async function createInstructor(email = "jest-instructor@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Instructor", role: "instructor" });
}

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

describe("Admin dashboard stats", () => {
  it("rejects unauthenticated, student, and instructor callers", async () => {
    const instructor = await createInstructor();
    const instructorToken = await loginAs("jest-instructor@example.com");
    const student = await registerStudent("adminstatsstudent@example.com");
    const studentToken = await loginAs("adminstatsstudent@example.com");
    void instructor;
    void student;

    const unauth = await request(app).get("/api/admin/stats");
    expect(unauth.status).toBe(401);

    const asStudent = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(asStudent.status).toBe(403);

    // Distinct from every other admin-adjacent route in this app: those all allow
    // instructor too. This one is genuinely admin-exclusive oversight data.
    const asInstructor = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(asInstructor.status).toBe(403);
  });

  it("returns all zeros and null averages against an empty database", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");

    const res = await request(app).get("/api/admin/stats").set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.stats).toEqual({
      users: { total: 1, byRole: { student: 0, instructor: 0, admin: 1 } },
      courses: { total: 0, byStatus: { draft: 0, published: 0, archived: 0 }, list: [] },
      enrollments: {
        total: 0,
        byStatus: { active: 0, completed: 0, dropped: 0, suspended: 0 },
        averageProgressPercent: null,
      },
      assignments: { totalSubmissions: 0, pendingGrading: 0, graded: 0, averageScore: null },
      quizzes: {
        totalAttempts: 0,
        pendingGrading: 0,
        graded: 0,
        averageScore: null,
        passRate: null,
      },
      payments: [],
    });
  });

  it("computes correct counts and averages against a hand-verifiable fixture", async () => {
    await createAdmin();
    const instructor = await createInstructor();
    const adminToken = await loginAs("jest-admin@example.com");

    const students = await Promise.all([
      registerStudent("adminfixture1@example.com"),
      registerStudent("adminfixture2@example.com"),
      registerStudent("adminfixture3@example.com"),
    ]);

    const publishedA = await Course.create({
      title: "Published A",
      slug: `published-a-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    const publishedB = await Course.create({
      title: "Published B",
      slug: `published-b-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    await Course.create({
      title: "Draft C",
      slug: `draft-c-${Date.now()}`,
      durationWeeks: 4,
      status: "draft",
      instructorId: instructor.id,
    });

    await Enrollment.create({
      courseId: publishedA.id,
      studentId: students[0].id,
      status: "active",
      progressPercent: 0,
    });
    await Enrollment.create({
      courseId: publishedA.id,
      studentId: students[1].id,
      status: "active",
      progressPercent: 40,
    });
    await Enrollment.create({
      courseId: publishedB.id,
      studentId: students[2].id,
      status: "completed",
      progressPercent: 100,
    });
    await Enrollment.create({
      courseId: publishedB.id,
      studentId: students[0].id,
      status: "dropped",
      progressPercent: 80,
    });

    const courseModule = await CourseModule.create({
      courseId: publishedA.id,
      title: "Module 1",
      weekNumber: 1,
    });
    const assignment = await Assignment.create({
      moduleId: courseModule.id,
      title: "Assignment 1",
      pointsTotal: 100,
    });
    await AssignmentSubmission.create({
      assignmentId: assignment.id,
      studentId: students[0].id,
      status: "submitted",
    });
    await AssignmentSubmission.create({
      assignmentId: assignment.id,
      studentId: students[1].id,
      status: "graded",
      score: 80,
    });
    await AssignmentSubmission.create({
      assignmentId: assignment.id,
      studentId: students[2].id,
      status: "graded",
      score: 100,
    });

    const quiz = await Quiz.create({
      moduleId: courseModule.id,
      title: "Quiz 1",
      passingScore: 70,
      questionCount: 1,
    });
    for (const score of [50, 70, 90, 100]) {
      await QuizAttempt.create({
        quizId: quiz.id,
        studentId: students[0].id,
        status: "graded",
        score,
      });
    }
    await QuizAttempt.create({ quizId: quiz.id, studentId: students[1].id, status: "submitted" });

    const res = await request(app).get("/api/admin/stats").set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    const stats = res.body.stats;

    expect(stats.users).toEqual({ total: 5, byRole: { student: 3, instructor: 1, admin: 1 } });
    expect(stats.courses.total).toBe(3);
    expect(stats.courses.byStatus).toEqual({ draft: 1, published: 2, archived: 0 });
    expect(stats.courses.list).toHaveLength(3);
    const publishedAEntry = stats.courses.list.find((c: { id: string }) => c.id === publishedA.id);
    expect(publishedAEntry.enrollmentCount).toBe(2);

    expect(stats.enrollments.total).toBe(4);
    expect(stats.enrollments.byStatus).toEqual({
      active: 2,
      completed: 1,
      dropped: 1,
      suspended: 0,
    });
    expect(stats.enrollments.averageProgressPercent).toBe(55);

    expect(stats.assignments).toEqual({
      totalSubmissions: 3,
      pendingGrading: 1,
      graded: 2,
      averageScore: 90,
    });

    expect(stats.quizzes).toEqual({
      totalAttempts: 5,
      pendingGrading: 1,
      graded: 4,
      averageScore: 78,
      passRate: 75,
    });
  });
});
