import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Assignment,
  AssignmentSubmission,
  Course,
  CourseModule,
  Enrollment,
  Lesson,
  ProgressTracking,
  Quiz,
  QuizAttempt,
  User,
} from "../../src/models";

// Day gate: within a day (module), lessons after the first stay locked until that day's
// quiz and assignment have been submitted.
const app = createApp();

async function createInstructor() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({
    email: `gate-instructor-${Date.now()}-${Math.random()}@example.com`,
    passwordHash,
    firstName: "Jest",
    lastName: "Instructor",
    role: "instructor",
  });
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

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setUpDay(email: string, { paid = true } = {}) {
  const instructor = await createInstructor();
  const course = await Course.create({
    title: "Gate Course",
    slug: `gate-course-${Date.now()}-${Math.random()}`,
    durationWeeks: 2,
    status: "published",
    instructorId: instructor.id,
  });
  const day1 = await CourseModule.create({ courseId: course.id, title: "Day 1", weekNumber: 1 });
  const lesson1 = await Lesson.create({ moduleId: day1.id, title: "Lesson 1", order: 1 });
  const lesson2 = await Lesson.create({ moduleId: day1.id, title: "Lesson 2", order: 2 });
  const quiz = await Quiz.create({
    moduleId: day1.id,
    title: "Day 1 Quiz",
    passingScore: 70,
    questionCount: 1,
    shuffleQuestions: false,
  });
  const assignment = await Assignment.create({
    moduleId: day1.id,
    title: "Day 1 Assignment",
    fileRequired: false,
    pointsTotal: 100,
  });
  const student = await registerStudent(email);
  await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: paid });
  const token = await loginAs(email);
  return { course, day1, lesson1, lesson2, quiz, assignment, student, token };
}

function submitQuiz(quizId: string, studentId: string) {
  return QuizAttempt.create({ quizId, studentId, attemptNumber: 1, status: "submitted", score: 40 });
}

function submitAssignment(assignmentId: string, studentId: string) {
  return AssignmentSubmission.create({ assignmentId, studentId, submissionText: "My answer" });
}

describe("Day gate: quiz + assignment before the day's next lesson", () => {
  it("leaves the day's first lesson open", async () => {
    const { lesson1, token } = await setUpDay("gate-first@example.com");
    const res = await request(app).get(`/api/lessons/${lesson1.id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("locks lesson 2 with the outstanding tasks until both quiz and assignment are submitted", async () => {
    const { lesson2, quiz, assignment, student, token } = await setUpDay("gate-locked@example.com");

    const blocked = await request(app).get(`/api/lessons/${lesson2.id}`).set("Authorization", `Bearer ${token}`);
    expect(blocked.status).toBe(403);
    expect(blocked.body.error.message).toMatch(/complete this day's quiz and assignment/i);
    expect(blocked.body.error.details.code).toBe("MODULE_TASKS_INCOMPLETE");
    expect(blocked.body.error.details.quizzes).toEqual([{ id: quiz.id, title: "Day 1 Quiz", completed: false }]);
    expect(blocked.body.error.details.assignments).toEqual([
      { id: assignment.id, title: "Day 1 Assignment", completed: false },
    ]);

    // Quiz alone isn't enough (any score counts as completing it).
    await submitQuiz(quiz.id, student.id);
    const stillBlocked = await request(app)
      .get(`/api/lessons/${lesson2.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(stillBlocked.status).toBe(403);
    expect(stillBlocked.body.error.details.quizzes[0].completed).toBe(true);
    expect(stillBlocked.body.error.details.assignments[0].completed).toBe(false);

    await submitAssignment(assignment.id, student.id);
    const open = await request(app).get(`/api/lessons/${lesson2.id}`).set("Authorization", `Bearer ${token}`);
    expect(open.status).toBe(200);
  });

  it("does not count an in-progress quiz attempt", async () => {
    const { lesson2, quiz, assignment, student, token } = await setUpDay("gate-inprogress@example.com");
    await QuizAttempt.create({ quizId: quiz.id, studentId: student.id, attemptNumber: 1 });
    await submitAssignment(assignment.id, student.id);
    const res = await request(app).get(`/api/lessons/${lesson2.id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it("ignores an admin-disabled quiz", async () => {
    const { lesson2, quiz, assignment, student, token } = await setUpDay("gate-disabled@example.com");
    await quiz.update({ isEnabled: false });
    await submitAssignment(assignment.id, student.id);
    const res = await request(app).get(`/api/lessons/${lesson2.id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("keeps a lesson the student already completed open (no lock-out for people already ahead)", async () => {
    const { lesson2, student, token } = await setUpDay("gate-ahead@example.com");
    await ProgressTracking.create({ studentId: student.id, lessonId: lesson2.id, completedAt: new Date() });
    const res = await request(app).get(`/api/lessons/${lesson2.id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("refuses to mark a gated lesson complete", async () => {
    const { lesson2, token } = await setUpDay("gate-markcomplete@example.com");
    const res = await request(app)
      .post(`/api/lessons/${lesson2.id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
    expect(res.body.error.details.code).toBe("MODULE_TASKS_INCOMPLETE");
  });

  it("reports the gate on lesson 1's navigation, and clears it once both are submitted", async () => {
    const { lesson1, lesson2, quiz, assignment, student, token } = await setUpDay("gate-nav@example.com");

    const before = await request(app)
      .get(`/api/lessons/${lesson1.id}/navigation`)
      .set("Authorization", `Bearer ${token}`);
    expect(before.body.next.id).toBe(lesson2.id);
    expect(before.body.nextTaskGate.complete).toBe(false);

    await submitQuiz(quiz.id, student.id);
    await submitAssignment(assignment.id, student.id);
    const after = await request(app)
      .get(`/api/lessons/${lesson1.id}/navigation`)
      .set("Authorization", `Bearer ${token}`);
    expect(after.body.nextTaskGate).toBeNull();
  });

  it("returns submitted quiz and assignment ids in course progress", async () => {
    const { course, quiz, assignment, student, token } = await setUpDay("gate-progress@example.com");
    await submitQuiz(quiz.id, student.id);
    await submitAssignment(assignment.id, student.id);
    const res = await request(app)
      .get(`/api/courses/${course.id}/progress`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.submittedQuizIds).toEqual([quiz.id]);
    expect(res.body.submittedAssignmentIds).toEqual([assignment.id]);
  });

  it("lets the quiz start once the day's first lesson is complete", async () => {
    const { lesson1, quiz, token } = await setUpDay("gate-quizstart@example.com");
    await request(app).post(`/api/lessons/${lesson1.id}/mark-complete`).set("Authorization", `Bearer ${token}`);
    const res = await request(app).post(`/api/quizzes/${quiz.id}/start`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(201);
  });
});
