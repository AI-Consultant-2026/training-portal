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

describe("Gap between quiz attempts", () => {
  it("refuses a new attempt within min_hours_between_attempts of the last one finishing", async () => {
    const { intro, token } = await setUp("corp-attempt-gap@example.com");
    await intro.update({ minHoursBetweenAttempts: 24 });
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "corp-attempt-gap@example.com", password: "Password123!" });
    const studentId = login.body.user.id as string;
    const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000);
    const first = await QuizAttempt.create({
      quizId: intro.id,
      studentId,
      attemptNumber: 1,
      status: "graded",
      score: 40,
      startTime: hoursAgo(2),
      endTime: hoursAgo(1),
    });
    const auth = { Authorization: `Bearer ${token}` };

    const tooSoon = await request(app).post(`/api/quizzes/${intro.id}/start`).set(auth);
    expect(tooSoon.status).toBe(403);
    expect(tooSoon.body.error.message).toMatch(/at least 24 hours apart/);

    await first.update({ startTime: hoursAgo(26), endTime: hoursAgo(25) });
    const later = await request(app).post(`/api/quizzes/${intro.id}/start`).set(auth);
    expect(later.status).toBeLessThan(300);
    expect(later.body.quiz.minHoursBetweenAttempts).toBe(24);
  });
});

describe("Corporate course content", () => {
  it.each([
    [CYBERSECURE_WORKFORCE, 13, 39, 30, 0],
    [AI_WORKFLOW, 10, 30, 25, 10],
    [AI_CYBER_ACCELERATOR, 12, 36, 25, 10],
  ])("course %# has its modules, lessons and assessments", (course, modules, lessons, finalCount, moduleCount) => {
    expect(course.modules).toHaveLength(modules);
    expect(course.modules.reduce((n, m) => n + m.lessons.length, 0)).toBe(lessons);
    expect(course.introAssessment).toHaveLength(10);
    expect(course.finalAssessment).toHaveLength(finalCount);
    course.modules.slice(0, -1).forEach((m) => expect(m.assessment).toHaveLength(moduleCount));
    const all = [
      ...course.introAssessment,
      ...course.finalAssessment,
      ...course.modules.flatMap((m) => m.assessment),
    ];
    all.forEach((q) => expect(q.answers.filter((a) => a.isCorrect)).toHaveLength(1));
    const text = JSON.stringify(course);
    expect(text.split("Video coming soon:").length - 1).toBe(lessons);
    expect(text).not.toMatch(/Video placeholder|\*Answer:|Lagos|Nairobi|Johannesburg|Nigeria|Kenya|Ghana/);
  });

  // Owner's changes of 2026-11-16 (migration 20261116020000).
  describe("CyberSecure Workforce", () => {
    const lessons = CYBERSECURE_WORKFORCE.modules.flatMap((m) => m.lessons);
    const text = JSON.stringify(CYBERSECURE_WORKFORCE);

    it("has no module quizzes or project, and a 30-question multiple-choice final across eight topics", () => {
      expect(CYBERSECURE_WORKFORCE.capstone).toBeUndefined();
      expect(CYBERSECURE_WORKFORCE.modules.every((m) => m.assessment.length === 0)).toBe(true);
      expect(CYBERSECURE_WORKFORCE.finalAssessment.every((q) => q.type === "multiple_choice")).toBe(true);
      expect(new Set(CYBERSECURE_WORKFORCE.finalAssessment.map((q) => q.text)).size).toBe(30);
      const final = lessons[lessons.length - 1].content;
      const counts = [...final.matchAll(/^\| ([A-Z][^|]+) \| (\d+) \|$/gm)].map((m) => [m[1], Number(m[2])]);
      expect(counts).toEqual([
        ["Cybersecurity fundamentals", 3],
        ["Phishing and social engineering", 5],
        ["Passwords and authentication", 3],
        ["Data protection and confidentiality", 4],
        ["Device, network and remote working security", 4],
        ["Malware and ransomware", 4],
        ["AI security and responsible use", 3],
        ["Incident identification and reporting", 4],
      ]);
      expect(final).toContain("Pass mark: 24 out of 30 (80%).");
      expect(text).not.toMatch(/Module \d+ Assessment|Action Plan|action plan|25 questions/);
    });

    it("gives every knowledge check one multiple-choice, one true-or-false and one scenario question", () => {
      const checks = lessons.filter((l) => l.content.includes("**Knowledge check"));
      expect(checks).toHaveLength(37);
      for (const l of checks) {
        const block = l.content.split(/\*\*Knowledge check [\d.]+\*\*/)[1].split("\n---\n")[0].split("\n## ")[0];
        const questions = block.split(/\n\n(?=\*\*\d\.\*\* )/).filter((q) => /^\*\*\d\.\*\* /.test(q.trim()));
        expect(questions).toHaveLength(3);
        expect(questions[0]).toMatch(/\n- A\. /);
        expect(questions[1]).toMatch(/True or false:/);
        expect(questions[1]).not.toMatch(/\n- A\. /);
        expect(questions[2]).toMatch(/\n- A\. /);
      }
    });

    it("has three learner reflections and the five-question feedback questionnaire at the end", () => {
      expect(text.match(/\*\*Reflection \d of 3\.\*\*/g)).toHaveLength(3);
      const final = lessons[lessons.length - 1].content;
      expect(final).toContain("## Course feedback questionnaire");
      expect(final.match(/^\d\. /gm)?.length).toBeGreaterThanOrEqual(5);
    });
  });
});
