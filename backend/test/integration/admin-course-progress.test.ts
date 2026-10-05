import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, CourseModule, Enrollment, Lesson, ProgressTracking, User } from "../../src/models";

const app = createApp();
const DAY_MS = 24 * 60 * 60 * 1000;

async function createUser(email: string, role: "admin" | "instructor" | "student", firstName = "Jest") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName, lastName: "User", role });
}

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

// Two weeks, two lessons each -- four lessons in student order W1L1, W1L2, W2L1, W2L2.
async function createCourse(instructorId: string) {
  const course = await Course.create({
    title: "Progress Course",
    slug: `progress-course-${Date.now()}-${Math.random()}`,
    durationWeeks: 2,
    status: "published",
    instructorId,
  });
  const lessons: Lesson[] = [];
  for (let week = 1; week <= 2; week++) {
    const courseModule = await CourseModule.create({ courseId: course.id, title: `Week ${week}`, weekNumber: week });
    for (let i = 1; i <= 2; i++) {
      lessons.push(await Lesson.create({ moduleId: courseModule.id, title: `W${week}L${i}`, order: i }));
    }
  }
  return { course, lessons };
}

async function enroll(courseId: string, studentId: string, paymentConfirmed: boolean) {
  return Enrollment.create({
    courseId,
    studentId,
    enrolledDate: new Date(Date.now() - 30 * DAY_MS),
    status: "active",
    progressPercent: 0,
    paymentConfirmed,
    paymentConfirmedAt: paymentConfirmed ? new Date(Date.now() - 30 * DAY_MS) : null,
  });
}

describe("GET /api/admin/course-progress", () => {
  it("is admin-only", async () => {
    await createUser("progress-student@example.com", "student");
    const anon = await request(app).get("/api/admin/course-progress");
    expect(anon.status).toBe(401);
    const token = await loginAs("progress-student@example.com");
    const student = await request(app).get("/api/admin/course-progress").set("Authorization", `Bearer ${token}`);
    expect(student.status).toBe(403);
  });

  it("reports each candidate's lessons, current week, next lesson and state per course", async () => {
    await createUser("progress-admin@example.com", "admin");
    const instructor = await createUser("progress-instructor@example.com", "instructor");
    const { course, lessons } = await createCourse(instructor.id);

    const active = await createUser("active@example.com", "student", "Active");
    const stalled = await createUser("stalled@example.com", "student", "Stalled");
    const fresh = await createUser("fresh@example.com", "student", "Fresh");
    const unpaid = await createUser("unpaid@example.com", "student", "Unpaid");
    const done = await createUser("done@example.com", "student", "Done");

    await enroll(course.id, active.id, true);
    await enroll(course.id, stalled.id, true);
    await enroll(course.id, fresh.id, true);
    await enroll(course.id, unpaid.id, false);
    await enroll(course.id, done.id, true);

    // Active: 3 of 4 lessons, last one yesterday -> week 2, next "W2L2", in progress.
    for (const lesson of lessons.slice(0, 3)) {
      await ProgressTracking.create({ studentId: active.id, lessonId: lesson.id, completedAt: new Date(Date.now() - DAY_MS) });
    }
    // Stalled: 1 lesson, 10 days ago.
    await ProgressTracking.create({
      studentId: stalled.id,
      lessonId: lessons[0].id,
      completedAt: new Date(Date.now() - 10 * DAY_MS),
    });
    // Done: every lesson.
    for (const lesson of lessons) {
      await ProgressTracking.create({ studentId: done.id, lessonId: lesson.id, completedAt: new Date(Date.now() - 2 * DAY_MS) });
    }

    const token = await loginAs("progress-admin@example.com");
    const res = await request(app).get("/api/admin/course-progress").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.stalledAfterDays).toBe(7);

    const summary = res.body.courses.find((c: { courseId: string }) => c.courseId === course.id);
    expect(summary.totals).toEqual({
      enrolled: 5,
      paid: 4,
      notStarted: 1,
      inProgress: 1,
      stalled: 1,
      completed: 1,
      averageProgressPercent: Math.round((75 + 25 + 0 + 100) / 4),
    });

    const byName = Object.fromEntries(
      summary.candidates.map((c: { firstName: string }) => [c.firstName, c]),
    ) as Record<string, Record<string, unknown>>;

    expect(byName.Active).toMatchObject({
      lessonsCompleted: 3,
      lessonsTotal: 4,
      progressPercent: 75,
      currentWeek: 2,
      nextLessonTitle: "W2L2",
      state: "in_progress",
    });
    expect(byName.Stalled).toMatchObject({ lessonsCompleted: 1, currentWeek: 1, nextLessonTitle: "W1L2", state: "stalled" });
    expect(byName.Fresh).toMatchObject({ lessonsCompleted: 0, nextLessonTitle: "W1L1", state: "not_started", lastProgressAt: null });
    expect(byName.Unpaid).toMatchObject({ paymentConfirmed: false, state: "awaiting_payment" });
    expect(byName.Done).toMatchObject({ progressPercent: 100, currentWeek: null, nextLessonTitle: null, state: "completed" });
  });

  it("leaves out staff accounts enrolled for testing", async () => {
    await createUser("progress-admin2@example.com", "admin");
    const instructor = await createUser("progress-instructor2@example.com", "instructor");
    const { course } = await createCourse(instructor.id);
    await enroll(course.id, instructor.id, true);

    const token = await loginAs("progress-admin2@example.com");
    const res = await request(app).get("/api/admin/course-progress").set("Authorization", `Bearer ${token}`);
    const summary = res.body.courses.find((c: { courseId: string }) => c.courseId === course.id);
    expect(summary.totals.enrolled).toBe(0);
    expect(summary.candidates).toEqual([]);
  });
});
