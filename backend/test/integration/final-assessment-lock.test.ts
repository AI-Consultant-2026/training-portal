import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, CourseModule, Enrollment, Lesson, ProgressTracking, Quiz, User } from "../../src/models";

// Owner, 2026-11-17: on every course, the Final Assessment stays disabled until the
// course's last lesson is completed. Admins are exempt.
const app = createApp();

async function makeUser(email: string, role: "student" | "instructor" | "admin") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: "Jest",
    lastName: role,
    role,
    emailVerifiedAt: new Date(),
  });
}

async function login(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setUp(email: string, corporate: boolean) {
  const instructor = await makeUser(`final-lock-instructor-${Date.now()}-${Math.random()}@example.com`, "instructor");
  const course = await Course.create({
    title: "Final Lock Course",
    slug: `final-lock-${Date.now()}-${Math.random()}`,
    durationWeeks: 2,
    status: "published",
    instructorId: instructor.id,
    ...(corporate ? { metadata: { corporate: true } } : {}),
  });
  const day1 = await CourseModule.create({ courseId: course.id, title: "Day 1", weekNumber: 1 });
  const day2 = await CourseModule.create({ courseId: course.id, title: "Day 2", weekNumber: 2 });
  const first = await Lesson.create({ moduleId: day1.id, title: "First lesson", order: 1 });
  const middle = await Lesson.create({ moduleId: day2.id, title: "Second to last", order: 1 });
  const last = await Lesson.create({ moduleId: day2.id, title: "Last lesson", order: 2 });
  const final = await Quiz.create({
    moduleId: day2.id,
    title: "Final Assessment",
    passingScore: 70,
    questionCount: 1,
    shuffleQuestions: false,
  });
  const student = await makeUser(email, "student");
  await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
  return { first, middle, last, final, student, token: await login(email) };
}

describe.each([
  ["graduate", false],
  ["corporate", true],
])("Final Assessment lock (%s course)", (kind, corporate) => {
  it("refuses to start until the last lesson is complete, then opens", async () => {
    const { first, middle, last, final, student, token } = await setUp(`final-lock-${kind}@example.com`, corporate);
    // Every lesson but the last one done.
    for (const lesson of [first, middle]) {
      await ProgressTracking.create({ studentId: student.id, lessonId: lesson.id, completedAt: new Date() });
    }

    const locked = await request(app).post(`/api/quizzes/${final.id}/start`).set("Authorization", `Bearer ${token}`);
    expect(locked.status).toBe(403);
    expect(locked.body.error.details.code).toBe("FINAL_ASSESSMENT_LOCKED");
    expect(locked.body.error.message).toContain('"Last lesson"');

    await ProgressTracking.create({ studentId: student.id, lessonId: last.id, completedAt: new Date() });
    const open = await request(app).post(`/api/quizzes/${final.id}/start`).set("Authorization", `Bearer ${token}`);
    expect(open.status).toBeLessThan(300);
  });
});

it("lets an admin start the Final Assessment without completing any lesson", async () => {
  const { final } = await setUp("final-lock-admin-student@example.com", false);
  await makeUser("final-lock-admin@example.com", "admin");
  const res = await request(app)
    .post(`/api/quizzes/${final.id}/start`)
    .set("Authorization", `Bearer ${await login("final-lock-admin@example.com")}`);
  expect(res.status).toBeLessThan(300);
});
