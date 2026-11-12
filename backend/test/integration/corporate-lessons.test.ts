import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, CourseModule, Enrollment, Lesson, Quiz, QuizAttempt, User } from "../../src/models";
import { CYBERSECURE_WORKFORCE } from "../../src/seeders/data/curriculumCorporateCyberSecure";
import { AI_WORKFLOW } from "../../src/seeders/data/curriculumCorporateAiWorkflow";
import { AI_CYBER_ACCELERATOR } from "../../src/seeders/data/curriculumCorporateAccelerator";

// Corporate courses (2026-11-12): modules, not days. No day gate between lessons, the
// unscored introductory assessment is open from the start, and a module assessment
// unlocks once every lesson in its module is complete.
const app = createApp();

async function setUp(email: string) {
  const course = await Course.create({
    title: "Corporate Course",
    slug: `corporate-${Date.now()}-${Math.random()}`,
    durationWeeks: 1,
    status: "published",
    metadata: { corporate: true },
  });
  const mod = await CourseModule.create({ courseId: course.id, title: "Module 1", weekNumber: 1 });
  const lessons = await Promise.all(
    [1, 2, 3].map((order) => Lesson.create({ moduleId: mod.id, title: `Lesson ${order}`, order })),
  );
  const intro = await Quiz.create({
    moduleId: mod.id,
    title: "Introductory Assessment (not scored)",
    passingScore: 0,
    questionCount: 1,
    shuffleQuestions: false,
  });
  const assessment = await Quiz.create({
    moduleId: mod.id,
    title: "Module 1 Assessment",
    passingScore: 80,
    questionCount: 1,
    shuffleQuestions: false,
  });
  const student = await User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: "Ada",
    lastName: "Obi",
    role: "student",
    emailVerifiedAt: new Date(),
  });
  await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
  const login = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return { lessons, intro, assessment, token: login.body.accessToken as string };
}

describe("Corporate course lesson and assessment rules", () => {
  it("opens every lesson in a module without a day gate", async () => {
    const { lessons, token } = await setUp("corp-lessons-open@example.com");
    for (const lesson of lessons) {
      const res = await request(app).get(`/api/lessons/${lesson.id}`).set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    }
  });

  it("opens the introductory assessment straight away", async () => {
    const { intro, token } = await setUp("corp-intro-open@example.com");
    const res = await request(app).post(`/api/quizzes/${intro.id}/start`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBeLessThan(300);
  });

  it("locks the module assessment until all the module's lessons are complete", async () => {
    const { lessons, assessment, token } = await setUp("corp-assessment-lock@example.com");
    const auth = { Authorization: `Bearer ${token}` };
    const early = await request(app).post(`/api/quizzes/${assessment.id}/start`).set(auth);
    expect(early.status).toBe(403);
    expect(early.body.error.message).toMatch(/module's lessons/);

    await request(app).post(`/api/lessons/${lessons[0].id}/mark-complete`).set(auth).expect(200);
    await request(app).post(`/api/lessons/${lessons[1].id}/mark-complete`).set(auth).expect(200);
    const partway = await request(app).post(`/api/quizzes/${assessment.id}/start`).set(auth);
    expect(partway.status).toBe(403);

    await request(app).post(`/api/lessons/${lessons[2].id}/mark-complete`).set(auth).expect(200);
    const ready = await request(app).post(`/api/quizzes/${assessment.id}/start`).set(auth);
    expect(ready.status).toBeLessThan(300);
  });
});

describe("Quiz attempt limit", () => {
  it("refuses a new attempt once max_attempts are used, but allows them until then", async () => {
    const { intro, token } = await setUp("corp-attempt-limit@example.com");
    await intro.update({ maxAttempts: 3 });
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "corp-attempt-limit@example.com", password: "Password123!" });
    const studentId = login.body.user.id as string;
    for (const attemptNumber of [1, 2]) {
      await QuizAttempt.create({ quizId: intro.id, studentId, attemptNumber, status: "graded", score: 40 });
    }
    const third = await request(app).post(`/api/quizzes/${intro.id}/start`).set("Authorization", `Bearer ${token}`);
    expect(third.status).toBeLessThan(300);
    expect(third.body.quiz.maxAttempts).toBe(3);
    await QuizAttempt.update({ status: "graded", score: 50 }, { where: { id: third.body.attempt.id } });

    const fourth = await request(app).post(`/api/quizzes/${intro.id}/start`).set("Authorization", `Bearer ${token}`);
    expect(fourth.status).toBe(403);
    expect(fourth.body.error.message).toMatch(/all 3 attempts/);
  });
});

describe("Corporate course content", () => {
  it.each([
    [CYBERSECURE_WORKFORCE, 13, 39],
    [AI_WORKFLOW, 10, 30],
    [AI_CYBER_ACCELERATOR, 12, 36],
  ])("course %# has its modules, lessons and assessments", (course, modules, lessons) => {
    expect(course.modules).toHaveLength(modules);
    expect(course.modules.reduce((n, m) => n + m.lessons.length, 0)).toBe(lessons);
    expect(course.introAssessment).toHaveLength(10);
    expect(course.finalAssessment).toHaveLength(25);
    course.modules.slice(0, -1).forEach((m) => expect(m.assessment).toHaveLength(10));
    const all = [
      ...course.introAssessment,
      ...course.finalAssessment,
      ...course.modules.flatMap((m) => m.assessment),
    ];
    all.forEach((q) => expect(q.answers.filter((a) => a.isCorrect)).toHaveLength(1));
    const text = JSON.stringify(course);
    expect(text).not.toMatch(/Video placeholder|\*Answer:|Lagos|Nairobi|Johannesburg|Nigeria|Kenya|Ghana/);
  });
});
