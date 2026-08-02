import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Course,
  CourseModule,
  Enrollment,
  Lesson,
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  QuizResponse,
  User,
} from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

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

async function createCourseWithQuiz(instructorId: string, timeLimitMinutes: number | null = null) {
  const course = await Course.create({
    title: "Quiz Course",
    slug: `quiz-course-${Date.now()}-${Math.random()}`,
    durationWeeks: 4,
    status: "published",
    instructorId,
  });
  const courseModule = await CourseModule.create({ courseId: course.id, title: "Module 1", weekNumber: 1 });
  const quiz = await Quiz.create({
    moduleId: courseModule.id,
    title: "Week 1 Quiz",
    passingScore: 70,
    questionCount: 2,
    shuffleQuestions: false,
    timeLimitMinutes: timeLimitMinutes ?? undefined,
  });

  const q1 = await QuizQuestion.create({
    quizId: quiz.id,
    questionText: "2 + 2 = ?",
    questionType: "multiple_choice",
    points: 1,
    order: 1,
  });
  const q1Correct = await QuizAnswer.create({ questionId: q1.id, answerText: "4", isCorrect: true, order: 1 });
  await QuizAnswer.create({ questionId: q1.id, answerText: "5", isCorrect: false, order: 2 });

  const q2 = await QuizQuestion.create({
    quizId: quiz.id,
    questionText: "The sky is blue.",
    questionType: "true_false",
    points: 1,
    order: 2,
  });
  const q2Correct = await QuizAnswer.create({ questionId: q2.id, answerText: "True", isCorrect: true, order: 1 });
  await QuizAnswer.create({ questionId: q2.id, answerText: "False", isCorrect: false, order: 2 });

  return { course, courseModule, quiz, q1, q1Correct, q2, q2Correct };
}

describe("Quizzes", () => {
  it("starts an attempt for an enrolled student, never exposing which answer is correct", async () => {
    const instructor = await createInstructor();
    const { course, quiz } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizstudent1@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent1@example.com");

    const res = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body.attempt.status).toBe("in_progress");
    expect(res.body.questions).toHaveLength(2);
    for (const q of res.body.questions) {
      for (const a of q.answers) {
        expect(a).not.toHaveProperty("isCorrect");
      }
    }
  });

  it("returns the same in-progress attempt on a second start call (idempotent)", async () => {
    const instructor = await createInstructor();
    const { course, quiz } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizstudent2@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent2@example.com");

    const first = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    const second = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);

    expect(second.body.attempt.id).toBe(first.body.attempt.id);
    const count = await QuizAttempt.count({ where: { quizId: quiz.id, studentId: student.id } });
    expect(count).toBe(1);
  });

  it("only creates one attempt when two start calls race concurrently", async () => {
    const instructor = await createInstructor();
    const { course, quiz } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizraceconditionstudent@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizraceconditionstudent@example.com");

    const [first, second] = await Promise.all([
      request(app).post(`/api/quizzes/${quiz.id}/start`).set("Authorization", `Bearer ${token}`),
      request(app).post(`/api/quizzes/${quiz.id}/start`).set("Authorization", `Bearer ${token}`),
    ]);

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(first.body.attempt.id).toBe(second.body.attempt.id);

    const attempts = await QuizAttempt.findAll({ where: { quizId: quiz.id, studentId: student.id } });
    expect(attempts).toHaveLength(1);
    expect(attempts[0].attemptNumber).toBe(1);
  });

  it("rejects starting a quiz for a non-enrolled student", async () => {
    const instructor = await createInstructor();
    const { quiz } = await createCourseWithQuiz(instructor.id);
    await registerStudent("quizstudent3@example.com");
    const token = await loginAs("quizstudent3@example.com");

    const res = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it("locks the quiz until every lesson in its module is completed", async () => {
    const instructor = await createInstructor();
    const { course, courseModule, quiz } = await createCourseWithQuiz(instructor.id);
    const lesson1 = await Lesson.create({ moduleId: courseModule.id, title: "Lesson 1", order: 1 });
    const lesson2 = await Lesson.create({ moduleId: courseModule.id, title: "Lesson 2", order: 2 });
    const student = await registerStudent("quizstudent-locked@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent-locked@example.com");

    const blocked = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    expect(blocked.status).toBe(403);
    expect(blocked.body.error.message).toMatch(/complete this week's lessons/i);

    // Completing only one of the two lessons must still leave it locked.
    await request(app)
      .post(`/api/lessons/${lesson1.id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);
    const stillBlocked = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    expect(stillBlocked.status).toBe(403);

    // Completing the second lesson unlocks it.
    await request(app)
      .post(`/api/lessons/${lesson2.id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);
    const unlocked = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    expect(unlocked.status).toBe(201);
  });

  it("does not lock a quiz whose module has no lessons at all", async () => {
    const instructor = await createInstructor();
    const { course, quiz } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizstudent-nolessons@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent-nolessons@example.com");

    const res = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(201);
  });

  it("grades an all-correct submission as 100 and graded", async () => {
    const instructor = await createInstructor();
    const { course, quiz, q1, q1Correct, q2, q2Correct } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizstudent4@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent4@example.com");

    const startRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    const attemptId = startRes.body.attempt.id;

    const submitRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        attemptId,
        responses: [
          { questionId: q1.id, studentAnswer: q1Correct.id },
          { questionId: q2.id, studentAnswer: q2Correct.id },
        ],
      });

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.attempt.status).toBe("graded");
    expect(submitRes.body.attempt.score).toBe(100);
    expect(submitRes.body.passed).toBe(true);
  });

  it("accepts a submission with zero responses (the time-limit auto-submit path) and grades it as 0", async () => {
    // Regression test: the frontend auto-submits on timeout even if the student never
    // answered a single question, which previously sent an empty `responses` array and
    // was rejected by a `.min(1)` Zod constraint with a 400 "Validation failed" --
    // leaving the attempt stuck in_progress forever instead of finalizing at 0%.
    const instructor = await createInstructor();
    const { course, quiz } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizstudent-empty@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent-empty@example.com");

    const startRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    const attemptId = startRes.body.attempt.id;

    const submitRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .send({ attemptId, responses: [] });

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.attempt.status).toBe("graded");
    expect(submitRes.body.attempt.score).toBe(0);
    expect(submitRes.body.passed).toBe(false);
  });

  it("rejects submitting the same attempt twice", async () => {
    const instructor = await createInstructor();
    const { course, quiz, q1, q1Correct, q2, q2Correct } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizstudent5@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent5@example.com");

    const startRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    const attemptId = startRes.body.attempt.id;
    const payload = {
      attemptId,
      responses: [
        { questionId: q1.id, studentAnswer: q1Correct.id },
        { questionId: q2.id, studentAnswer: q2Correct.id },
      ],
    };

    const first = await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
    expect(first.status).toBe(200);

    const second = await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
    expect(second.status).toBe(409);
  });

  it("keeps the highest score across retakes, regardless of order", async () => {
    const instructor = await createInstructor();
    const { course, quiz, q1, q1Correct, q2, q2Correct } = await createCourseWithQuiz(instructor.id);
    const student = await registerStudent("quizstudent6@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent6@example.com");

    const start1 = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        attemptId: start1.body.attempt.id,
        responses: [
          { questionId: q1.id, studentAnswer: q1Correct.id },
          { questionId: q2.id, studentAnswer: q2Correct.id },
        ],
      });

    const start2 = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    expect(start2.body.attempt.attemptNumber).toBe(2);
    await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        attemptId: start2.body.attempt.id,
        responses: [
          { questionId: q1.id, studentAnswer: q1Correct.id },
          { questionId: q2.id, studentAnswer: "not-a-real-answer-id" },
        ],
      });

    const attemptsRes = await request(app)
      .get(`/api/quizzes/${quiz.id}/attempts`)
      .set("Authorization", `Bearer ${token}`);

    expect(attemptsRes.body.attempts).toHaveLength(2);
    expect(attemptsRes.body.bestScore).toBe(100);
  });

  it("rejects submitting responses for another student's attempt", async () => {
    const instructor = await createInstructor();
    const { course, quiz, q1, q1Correct } = await createCourseWithQuiz(instructor.id);
    const studentA = await registerStudent("quizstudentA@example.com");
    const studentB = await registerStudent("quizstudentB@example.com");
    await Enrollment.create({ courseId: course.id, studentId: studentA.id });
    await Enrollment.create({ courseId: course.id, studentId: studentB.id });
    const tokenA = await loginAs("quizstudentA@example.com");
    const tokenB = await loginAs("quizstudentB@example.com");

    const startRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${tokenA}`);

    const res = await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${tokenB}`)
      .send({
        attemptId: startRes.body.attempt.id,
        responses: [{ questionId: q1.id, studentAnswer: q1Correct.id }],
      });

    expect(res.status).toBe(403);
  });

  it("flags a submission as timed out when it arrives after the time limit, but still grades it", async () => {
    const instructor = await createInstructor();
    const { course, quiz, q1, q1Correct, q2, q2Correct } = await createCourseWithQuiz(instructor.id, 15);
    const student = await registerStudent("quizstudent7@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("quizstudent7@example.com");

    const startRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/start`)
      .set("Authorization", `Bearer ${token}`);
    const attemptId = startRes.body.attempt.id;

    const attempt = await QuizAttempt.findByPk(attemptId);
    attempt!.startTime = new Date(Date.now() - 20 * 60_000);
    await attempt!.save();

    const submitRes = await request(app)
      .post(`/api/quizzes/${quiz.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        attemptId,
        responses: [
          { questionId: q1.id, studentAnswer: q1Correct.id },
          { questionId: q2.id, studentAnswer: q2Correct.id },
        ],
      });

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.timedOut).toBe(true);
    expect(submitRes.body.attempt.status).toBe("graded");
    expect(submitRes.body.attempt.score).toBe(100);
  });
});

async function createCourseWithGradableQuiz(instructorId: string) {
  const course = await Course.create({
    title: "Quiz Course",
    slug: `quiz-course-${Date.now()}-${Math.random()}`,
    durationWeeks: 4,
    status: "published",
    instructorId,
  });
  const courseModule = await CourseModule.create({ courseId: course.id, title: "Module 1", weekNumber: 1 });
  const quiz = await Quiz.create({
    moduleId: courseModule.id,
    title: "Week 1 Quiz",
    passingScore: 70,
    questionCount: 3,
    shuffleQuestions: false,
  });

  const q1 = await QuizQuestion.create({
    quizId: quiz.id,
    questionText: "2 + 2 = ?",
    questionType: "multiple_choice",
    points: 1,
    order: 1,
  });
  const q1Correct = await QuizAnswer.create({ questionId: q1.id, answerText: "4", isCorrect: true, order: 1 });
  await QuizAnswer.create({ questionId: q1.id, answerText: "5", isCorrect: false, order: 2 });

  const q2 = await QuizQuestion.create({
    quizId: quiz.id,
    questionText: "The sky is blue.",
    questionType: "true_false",
    points: 1,
    order: 2,
  });
  const q2Correct = await QuizAnswer.create({ questionId: q2.id, answerText: "True", isCorrect: true, order: 1 });
  await QuizAnswer.create({ questionId: q2.id, answerText: "False", isCorrect: false, order: 2 });

  // 2 points (not 1, like the others) so grading tests can exercise a genuine partial-credit case.
  const q3 = await QuizQuestion.create({
    quizId: quiz.id,
    questionText: "Explain photosynthesis briefly.",
    questionType: "short_answer",
    points: 2,
    order: 3,
  });

  return { course, courseModule, quiz, q1, q1Correct, q2, q2Correct, q3 };
}

async function startAndSubmitGradable(
  quizId: string,
  token: string,
  setup: Awaited<ReturnType<typeof createCourseWithGradableQuiz>>,
  shortAnswer = "Plants convert sunlight into chemical energy.",
) {
  const startRes = await request(app)
    .post(`/api/quizzes/${quizId}/start`)
    .set("Authorization", `Bearer ${token}`);
  const attemptId = startRes.body.attempt.id;
  const submitRes = await request(app)
    .post(`/api/quizzes/${quizId}/submit`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      attemptId,
      responses: [
        { questionId: setup.q1.id, studentAnswer: setup.q1Correct.id },
        { questionId: setup.q2.id, studentAnswer: setup.q2Correct.id },
        { questionId: setup.q3.id, studentAnswer: shortAnswer },
      ],
    });
  return { attemptId, submitRes };
}

describe("Quiz short-answer manual grading", () => {
  it("leaves the attempt submitted (not graded) with no responses exposed when a short_answer is pending review", async () => {
    const instructor = await createInstructor();
    const setup = await createCourseWithGradableQuiz(instructor.id);
    const student = await registerStudent("gradequizstudent1@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const token = await loginAs("gradequizstudent1@example.com");

    const { submitRes } = await startAndSubmitGradable(setup.quiz.id, token, setup);

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.attempt.status).toBe("submitted");
    expect(submitRes.body.attempt.score).toBeNull();
    expect(submitRes.body.responses).toEqual([]);
  });

  it("rejects grading by an instructor who doesn't own the course", async () => {
    const owner = await createInstructor("jest-instructor-owner@example.com");
    await createInstructor("jest-instructor-other@example.com");
    const setup = await createCourseWithGradableQuiz(owner.id);
    const student = await registerStudent("gradequizstudent2@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const studentToken = await loginAs("gradequizstudent2@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, studentToken, setup);

    const otherToken = await loginAs("jest-instructor-other@example.com");
    const res = await request(app)
      .patch(`/api/quiz-attempts/${attemptId}/grade`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ responses: [{ responseId: "00000000-0000-0000-0000-000000000000", pointsEarned: 2 }] });

    expect(res.status).toBe(403);
  });

  it("rejects grading by a student", async () => {
    const instructor = await createInstructor();
    const setup = await createCourseWithGradableQuiz(instructor.id);
    const student = await registerStudent("gradequizstudent3@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const token = await loginAs("gradequizstudent3@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, token, setup);

    const res = await request(app)
      .patch(`/api/quiz-attempts/${attemptId}/grade`)
      .set("Authorization", `Bearer ${token}`)
      .send({ responses: [{ responseId: "00000000-0000-0000-0000-000000000000", pointsEarned: 2 }] });

    expect(res.status).toBe(403);
  });

  it("allows an admin to grade regardless of course ownership, with full credit", async () => {
    const owner = await createInstructor("jest-instructor-owner2@example.com");
    await createAdmin();
    const setup = await createCourseWithGradableQuiz(owner.id);
    const student = await registerStudent("gradequizstudent4@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const studentToken = await loginAs("gradequizstudent4@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, studentToken, setup);

    const pending = (await QuizResponse.findAll({ where: { attemptId } })).find(
      (r) => r.isCorrect === null,
    )!;
    expect(pending.markedAt).toBeNull();

    const adminToken = await loginAs("jest-admin@example.com");
    const res = await request(app)
      .patch(`/api/quiz-attempts/${attemptId}/grade`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ responses: [{ responseId: pending.id, pointsEarned: 2 }] });

    expect(res.status).toBe(200);
    expect(res.body.attempt.status).toBe("graded");
    expect(res.body.attempt.score).toBe(100);

    const gradedEmail = memAdapter.sentMessages.find(
      (m) => m.to === student.email && m.subject.includes("graded"),
    );
    expect(gradedEmail).toBeDefined();
    expect(gradedEmail!.text).toContain("100");

    const graded = await QuizResponse.findByPk(pending.id);
    expect(graded!.isCorrect).toBe(true);
    expect(graded!.pointsEarned).toBe(2);
    expect(graded!.markedAt).not.toBeNull();
  });

  it("recomputes a partial-credit score correctly and marks the response incorrect when under full points", async () => {
    const instructor = await createInstructor();
    const setup = await createCourseWithGradableQuiz(instructor.id);
    const student = await registerStudent("gradequizstudent5@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const studentToken = await loginAs("gradequizstudent5@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, studentToken, setup);

    const pending = (await QuizResponse.findAll({ where: { attemptId } })).find(
      (r) => r.isCorrect === null,
    )!;

    const instructorToken = await loginAs("jest-instructor@example.com");
    const res = await request(app)
      .patch(`/api/quiz-attempts/${attemptId}/grade`)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({ responses: [{ responseId: pending.id, pointsEarned: 1 }] });

    expect(res.status).toBe(200);
    // total points = 1 (q1) + 1 (q2) + 2 (q3) = 4; earned = 1 + 1 + 1 = 3 -> 75%
    expect(res.body.attempt.score).toBe(75);
    const graded = await QuizResponse.findByPk(pending.id);
    expect(graded!.isCorrect).toBe(false);
    expect(graded!.pointsEarned).toBe(1);
  });

  it("rejects a grade payload that doesn't exactly match the attempt's pending responses", async () => {
    const instructor = await createInstructor();
    const setup = await createCourseWithGradableQuiz(instructor.id);
    const studentA = await registerStudent("gradequizstudent6@example.com");
    const studentB = await registerStudent("gradequizstudent7@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: studentA.id });
    await Enrollment.create({ courseId: setup.course.id, studentId: studentB.id });
    const tokenA = await loginAs("gradequizstudent6@example.com");
    const tokenB = await loginAs("gradequizstudent7@example.com");
    const { attemptId: attemptIdA } = await startAndSubmitGradable(setup.quiz.id, tokenA, setup);
    const { attemptId: attemptIdB } = await startAndSubmitGradable(setup.quiz.id, tokenB, setup);

    const pendingA = (await QuizResponse.findAll({ where: { attemptId: attemptIdA } })).find(
      (r) => r.isCorrect === null,
    )!;
    const pendingB = (await QuizResponse.findAll({ where: { attemptId: attemptIdB } })).find(
      (r) => r.isCorrect === null,
    )!;

    const instructorToken = await loginAs("jest-instructor@example.com");
    // Try to grade attempt A using attempt B's response id: not one of A's pending responses.
    const res = await request(app)
      .patch(`/api/quiz-attempts/${attemptIdA}/grade`)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({ responses: [{ responseId: pendingB.id, pointsEarned: 2 }] });

    expect(res.status).toBe(400);
    expect(res.body.error.details.missing).toContain(pendingA.id);
    expect(res.body.error.details.unexpected).toContain(pendingB.id);
  });

  it("rejects grading an attempt that is still in_progress", async () => {
    const instructor = await createInstructor();
    const setup = await createCourseWithGradableQuiz(instructor.id);
    const student = await registerStudent("gradequizstudent8@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const studentToken = await loginAs("gradequizstudent8@example.com");

    const startRes = await request(app)
      .post(`/api/quizzes/${setup.quiz.id}/start`)
      .set("Authorization", `Bearer ${studentToken}`);

    const instructorToken = await loginAs("jest-instructor@example.com");
    const res = await request(app)
      .patch(`/api/quiz-attempts/${startRes.body.attempt.id}/grade`)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({ responses: [{ responseId: "00000000-0000-0000-0000-000000000000", pointsEarned: 1 }] });

    expect(res.status).toBe(409);
  });

  it("rejects re-grading an attempt that is already graded", async () => {
    const instructor = await createInstructor();
    const setup = await createCourseWithGradableQuiz(instructor.id);
    const student = await registerStudent("gradequizstudent9@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const studentToken = await loginAs("gradequizstudent9@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, studentToken, setup);
    const pending = (await QuizResponse.findAll({ where: { attemptId } })).find(
      (r) => r.isCorrect === null,
    )!;

    const instructorToken = await loginAs("jest-instructor@example.com");
    const first = await request(app)
      .patch(`/api/quiz-attempts/${attemptId}/grade`)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({ responses: [{ responseId: pending.id, pointsEarned: 2 }] });
    expect(first.status).toBe(200);

    const second = await request(app)
      .patch(`/api/quiz-attempts/${attemptId}/grade`)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({ responses: [{ responseId: pending.id, pointsEarned: 2 }] });
    expect(second.status).toBe(409);
  });

  it("only lets one of two concurrent grade requests on the same attempt succeed", async () => {
    const instructor = await createInstructor();
    const setup = await createCourseWithGradableQuiz(instructor.id);
    const student = await registerStudent("gradequizstudent10@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const studentToken = await loginAs("gradequizstudent10@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, studentToken, setup);
    const pending = (await QuizResponse.findAll({ where: { attemptId } })).find(
      (r) => r.isCorrect === null,
    )!;

    const instructorToken = await loginAs("jest-instructor@example.com");
    const payload = { responses: [{ responseId: pending.id, pointsEarned: 2 }] };
    const [first, second] = await Promise.all([
      request(app)
        .patch(`/api/quiz-attempts/${attemptId}/grade`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send(payload),
      request(app)
        .patch(`/api/quiz-attempts/${attemptId}/grade`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send(payload),
    ]);

    const statuses = [first.status, second.status].sort();
    expect(statuses).toEqual([200, 409]);
  });

  it("scopes the pending-review queue to the owning instructor, and excludes graded attempts", async () => {
    const owner = await createInstructor("jest-instructor-owner3@example.com");
    await createInstructor("jest-instructor-other3@example.com");
    await createAdmin();
    const setup = await createCourseWithGradableQuiz(owner.id);
    const student = await registerStudent("gradequizstudent11@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    const studentToken = await loginAs("gradequizstudent11@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, studentToken, setup);

    const ownerToken = await loginAs("jest-instructor-owner3@example.com");
    const otherToken = await loginAs("jest-instructor-other3@example.com");
    const adminToken = await loginAs("jest-admin@example.com");

    const ownerRes = await request(app)
      .get("/api/instructor/ungraded-quiz-attempts")
      .set("Authorization", `Bearer ${ownerToken}`);
    expect(ownerRes.body.attempts.map((a: { id: string }) => a.id)).toContain(attemptId);

    const otherRes = await request(app)
      .get("/api/instructor/ungraded-quiz-attempts")
      .set("Authorization", `Bearer ${otherToken}`);
    expect(otherRes.body.attempts.map((a: { id: string }) => a.id)).not.toContain(attemptId);

    const adminRes = await request(app)
      .get("/api/instructor/ungraded-quiz-attempts")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(adminRes.body.attempts.map((a: { id: string }) => a.id)).toContain(attemptId);

    const pending = (await QuizResponse.findAll({ where: { attemptId } })).find(
      (r) => r.isCorrect === null,
    )!;
    await request(app)
      .patch(`/api/quiz-attempts/${attemptId}/grade`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ responses: [{ responseId: pending.id, pointsEarned: 2 }] });

    const ownerResAfter = await request(app)
      .get("/api/instructor/ungraded-quiz-attempts")
      .set("Authorization", `Bearer ${ownerToken}`);
    expect(ownerResAfter.body.attempts.map((a: { id: string }) => a.id)).not.toContain(attemptId);
  });

  it("lets the owning instructor see pending responses on a submitted attempt, but hides them from everyone else", async () => {
    const owner = await createInstructor("jest-instructor-owner4@example.com");
    await createInstructor("jest-instructor-other4@example.com");
    const setup = await createCourseWithGradableQuiz(owner.id);
    const student = await registerStudent("gradequizstudent12@example.com");
    const otherStudent = await registerStudent("gradequizstudent13@example.com");
    await Enrollment.create({ courseId: setup.course.id, studentId: student.id });
    await Enrollment.create({ courseId: setup.course.id, studentId: otherStudent.id });
    const studentToken = await loginAs("gradequizstudent12@example.com");
    const otherStudentToken = await loginAs("gradequizstudent13@example.com");
    const { attemptId } = await startAndSubmitGradable(setup.quiz.id, studentToken, setup);

    const ownerToken = await loginAs("jest-instructor-owner4@example.com");
    const otherToken = await loginAs("jest-instructor-other4@example.com");

    const ownerRes = await request(app)
      .get(`/api/quizzes/${setup.quiz.id}/attempts/${attemptId}`)
      .set("Authorization", `Bearer ${ownerToken}`);
    expect(ownerRes.status).toBe(200);
    expect(ownerRes.body.attempt.responses).toHaveLength(3);
    expect(ownerRes.body.attempt.responses[0].points).not.toBeNull();

    const otherRes = await request(app)
      .get(`/api/quizzes/${setup.quiz.id}/attempts/${attemptId}`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(otherRes.status).toBe(403);

    const otherStudentRes = await request(app)
      .get(`/api/quizzes/${setup.quiz.id}/attempts/${attemptId}`)
      .set("Authorization", `Bearer ${otherStudentToken}`);
    expect(otherStudentRes.status).toBe(403);

    const ownStudentRes = await request(app)
      .get(`/api/quizzes/${setup.quiz.id}/attempts/${attemptId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(ownStudentRes.status).toBe(200);
    expect(ownStudentRes.body.attempt.responses).toEqual([]);
  });
});
