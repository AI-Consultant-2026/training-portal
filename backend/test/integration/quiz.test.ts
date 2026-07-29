import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Course,
  CourseModule,
  Enrollment,
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  User,
} from "../../src/models";

const app = createApp();

async function createInstructor(email = "jest-instructor@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Instructor", role: "instructor" });
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
