import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Assignment,
  AssignmentSubmission,
  Capstone,
  Course,
  CourseModule,
  Enrollment,
  Payment,
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

describe("Course payments drill-down", () => {
  it("rejects unauthenticated, student, and instructor callers", async () => {
    const instructor = await createInstructor();
    const instructorToken = await loginAs("jest-instructor@example.com");
    await registerStudent("paymentsdrilldownstudent@example.com");
    const studentToken = await loginAs("paymentsdrilldownstudent@example.com");
    const course = await Course.create({
      title: "Drilldown Auth Course",
      slug: `drilldown-auth-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });

    const unauth = await request(app).get(`/api/admin/courses/${course.id}/payments?status=confirmed`);
    expect(unauth.status).toBe(401);

    const asStudent = await request(app)
      .get(`/api/admin/courses/${course.id}/payments?status=confirmed`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(asStudent.status).toBe(403);

    const asInstructor = await request(app)
      .get(`/api/admin/courses/${course.id}/payments?status=confirmed`)
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(asInstructor.status).toBe(403);
  });

  it("404s for an unknown course and 400s for an invalid status", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");

    const unknownCourse = await request(app)
      .get("/api/admin/courses/00000000-0000-0000-0000-000000000000/payments?status=confirmed")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(unknownCourse.status).toBe(404);

    const instructor = await createInstructor();
    const course = await Course.create({
      title: "Drilldown Validation Course",
      slug: `drilldown-validation-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    const badStatus = await request(app)
      .get(`/api/admin/courses/${course.id}/payments?status=paid`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(badStatus.status).toBe(400);
  });

  it("lists the right students for confirmed vs pending, with their latest payment", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");
    const instructor = await createInstructor();
    const course = await Course.create({
      title: "Drilldown Course",
      slug: `drilldown-course-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    const otherCourse = await Course.create({
      title: "Other Course",
      slug: `drilldown-other-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });

    const paidStudent = await registerStudent("drilldownpaid@example.com");
    const pendingStudent = await registerStudent("drilldownpending@example.com");
    const otherCourseStudent = await registerStudent("drilldownothercourse@example.com");

    const paidEnrollment = await Enrollment.create({
      courseId: course.id,
      studentId: paidStudent.id,
      status: "active",
      progressPercent: 0,
      paymentConfirmed: true,
    });
    await Payment.create({
      enrollmentId: paidEnrollment.id,
      studentId: paidStudent.id,
      method: "card",
      status: "succeeded",
      currency: "GBP",
      amount: 199,
      baseAmountNgn: 199 * 1900,
      billingCountry: "United Kingdom",
    });

    const pendingEnrollment = await Enrollment.create({
      courseId: course.id,
      studentId: pendingStudent.id,
      status: "active",
      progressPercent: 0,
      paymentConfirmed: false,
    });
    await Payment.create({
      enrollmentId: pendingEnrollment.id,
      studentId: pendingStudent.id,
      method: "bank_transfer",
      status: "pending",
      currency: "NGN",
      amount: 150000,
      baseAmountNgn: 150000,
      billingCountry: "Nigeria",
      gatewayReference: "REF-123",
    });

    // Confirmed in a different course -- must not leak into this course's drill-down.
    await Enrollment.create({
      courseId: otherCourse.id,
      studentId: otherCourseStudent.id,
      status: "active",
      progressPercent: 0,
      paymentConfirmed: true,
    });

    const confirmedRes = await request(app)
      .get(`/api/admin/courses/${course.id}/payments?status=confirmed`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(confirmedRes.status).toBe(200);
    expect(confirmedRes.body.payments).toHaveLength(1);
    expect(confirmedRes.body.payments[0]).toMatchObject({
      enrollmentId: paidEnrollment.id,
      email: "drilldownpaid@example.com",
      paymentConfirmed: true,
      // DECIMAL columns come back from pg as strings, not numbers -- Sequelize doesn't
      // coerce them (avoids silent float-precision loss on money values).
      latestPayment: { method: "card", status: "succeeded", currency: "GBP", amount: "199.00" },
    });

    const pendingRes = await request(app)
      .get(`/api/admin/courses/${course.id}/payments?status=pending`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(pendingRes.status).toBe(200);
    expect(pendingRes.body.payments).toHaveLength(1);
    expect(pendingRes.body.payments[0]).toMatchObject({
      enrollmentId: pendingEnrollment.id,
      email: "drilldownpending@example.com",
      paymentConfirmed: false,
      latestPayment: { method: "bank_transfer", status: "pending", gatewayReference: "REF-123" },
    });
  });
});

describe("Quiz management", () => {
  it("rejects unauthenticated, student, and instructor callers on both routes", async () => {
    const instructor = await createInstructor();
    const instructorToken = await loginAs("jest-instructor@example.com");
    await registerStudent("quizmanagementstudent@example.com");
    const studentToken = await loginAs("quizmanagementstudent@example.com");
    const course = await Course.create({
      title: "Quiz Mgmt Auth Course",
      slug: `quiz-mgmt-auth-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    const courseModule = await CourseModule.create({ courseId: course.id, title: "Module 1", weekNumber: 1 });
    const quiz = await Quiz.create({
      moduleId: courseModule.id,
      title: "Week 1 Quiz",
      passingScore: 70,
      questionCount: 1,
    });

    const unauthList = await request(app).get("/api/admin/quizzes");
    expect(unauthList.status).toBe(401);
    const studentList = await request(app)
      .get("/api/admin/quizzes")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(studentList.status).toBe(403);
    const instructorList = await request(app)
      .get("/api/admin/quizzes")
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(instructorList.status).toBe(403);

    const studentPatch = await request(app)
      .patch(`/api/admin/quizzes/${quiz.id}`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ isEnabled: false });
    expect(studentPatch.status).toBe(403);
  });

  it("lists quizzes with course/week context and toggles isEnabled", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");
    const instructor = await createInstructor();
    const course = await Course.create({
      title: "Quiz Mgmt Course",
      slug: `quiz-mgmt-course-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    const courseModule = await CourseModule.create({ courseId: course.id, title: "Module 1", weekNumber: 3 });
    const quiz = await Quiz.create({
      moduleId: courseModule.id,
      title: "Week 3 Quiz",
      passingScore: 70,
      questionCount: 1,
    });

    const listRes = await request(app)
      .get("/api/admin/quizzes")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(listRes.status).toBe(200);
    const entry = listRes.body.quizzes.find((q: { id: string }) => q.id === quiz.id);
    expect(entry).toMatchObject({
      title: "Week 3 Quiz",
      isEnabled: true,
      weekNumber: 3,
      courseId: course.id,
      courseTitle: "Quiz Mgmt Course",
    });

    const disableRes = await request(app)
      .patch(`/api/admin/quizzes/${quiz.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ isEnabled: false });
    expect(disableRes.status).toBe(200);
    expect(disableRes.body.quiz.isEnabled).toBe(false);

    const listAfter = await request(app)
      .get("/api/admin/quizzes")
      .set("Authorization", `Bearer ${adminToken}`);
    const entryAfter = listAfter.body.quizzes.find((q: { id: string }) => q.id === quiz.id);
    expect(entryAfter.isEnabled).toBe(false);
  });

  it("404s when toggling an unknown quiz", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");

    const res = await request(app)
      .patch("/api/admin/quizzes/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ isEnabled: false });
    expect(res.status).toBe(404);
  });
});

describe("Capstone management", () => {
  it("rejects unauthenticated, student, and instructor callers on both routes", async () => {
    const instructor = await createInstructor();
    const instructorToken = await loginAs("jest-instructor@example.com");
    await registerStudent("capstonemanagementstudent@example.com");
    const studentToken = await loginAs("capstonemanagementstudent@example.com");
    const course = await Course.create({
      title: "Capstone Mgmt Auth Course",
      slug: `capstone-mgmt-auth-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    const capstone = await Capstone.create({ courseId: course.id, title: "Final Project" });

    const unauthList = await request(app).get("/api/admin/capstones");
    expect(unauthList.status).toBe(401);
    const studentList = await request(app)
      .get("/api/admin/capstones")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(studentList.status).toBe(403);
    const instructorList = await request(app)
      .get("/api/admin/capstones")
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(instructorList.status).toBe(403);

    const studentPatch = await request(app)
      .patch(`/api/admin/capstones/${capstone.id}`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ isEnabled: false });
    expect(studentPatch.status).toBe(403);
  });

  it("lists capstones with course context and toggles isEnabled", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");
    const instructor = await createInstructor();
    const course = await Course.create({
      title: "Capstone Mgmt Course",
      slug: `capstone-mgmt-course-${Date.now()}`,
      durationWeeks: 4,
      status: "published",
      instructorId: instructor.id,
    });
    const capstone = await Capstone.create({ courseId: course.id, title: "Final Project" });

    const listRes = await request(app)
      .get("/api/admin/capstones")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(listRes.status).toBe(200);
    const entry = listRes.body.capstones.find((c: { id: string }) => c.id === capstone.id);
    expect(entry).toMatchObject({
      title: "Final Project",
      isEnabled: true,
      courseId: course.id,
      courseTitle: "Capstone Mgmt Course",
    });

    const disableRes = await request(app)
      .patch(`/api/admin/capstones/${capstone.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ isEnabled: false });
    expect(disableRes.status).toBe(200);
    expect(disableRes.body.capstone.isEnabled).toBe(false);

    const listAfter = await request(app)
      .get("/api/admin/capstones")
      .set("Authorization", `Bearer ${adminToken}`);
    const entryAfter = listAfter.body.capstones.find((c: { id: string }) => c.id === capstone.id);
    expect(entryAfter.isEnabled).toBe(false);
  });

  it("404s when toggling an unknown capstone", async () => {
    await createAdmin();
    const adminToken = await loginAs("jest-admin@example.com");

    const res = await request(app)
      .patch("/api/admin/capstones/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ isEnabled: false });
    expect(res.status).toBe(404);
  });
});
