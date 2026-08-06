import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Course,
  CourseModule,
  Enrollment,
  Lesson,
  ProgressTracking,
  User,
  VideoCheckpoint,
  VideoCheckpointAnswer,
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

async function createCourseWithLessons(instructorId: string, lessonCount = 2) {
  const course = await Course.create({
    title: "Progress Course",
    slug: `progress-course-${Date.now()}-${Math.random()}`,
    durationWeeks: 4,
    status: "published",
    instructorId,
  });
  const courseModule = await CourseModule.create({ courseId: course.id, title: "Module 1", weekNumber: 1 });
  const lessons: Lesson[] = [];
  for (let i = 1; i <= lessonCount; i++) {
    lessons.push(await Lesson.create({ moduleId: courseModule.id, title: `Lesson ${i}`, order: i }));
  }
  return { course, courseModule, lessons };
}

describe("Lessons and progress tracking", () => {
  it("keeps the lesson list and lesson detail endpoints public (no auth required)", async () => {
    const instructor = await createInstructor();
    const { courseModule, lessons } = await createCourseWithLessons(instructor.id);

    const listRes = await request(app).get(`/api/modules/${courseModule.id}/lessons`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.lessons).toHaveLength(2);

    const detailRes = await request(app).get(`/api/lessons/${lessons[0].id}`);
    expect(detailRes.status).toBe(200);
    expect(detailRes.body.lesson.id).toBe(lessons[0].id);
  });

  describe("lesson navigation", () => {
    async function createCourseWithModules(instructorId: string, lessonsPerModule: number[]) {
      const course = await Course.create({
        title: "Navigation Course",
        slug: `navigation-course-${Date.now()}-${Math.random()}`,
        durationWeeks: lessonsPerModule.length,
        status: "published",
        instructorId,
      });
      const modules: CourseModule[] = [];
      const lessonsByModule: Lesson[][] = [];
      for (let week = 0; week < lessonsPerModule.length; week++) {
        const courseModule = await CourseModule.create({
          courseId: course.id,
          title: `Module ${week + 1}`,
          weekNumber: week + 1,
        });
        modules.push(courseModule);
        const lessons: Lesson[] = [];
        for (let i = 1; i <= lessonsPerModule[week]; i++) {
          lessons.push(
            await Lesson.create({ moduleId: courseModule.id, title: `Week ${week + 1} Lesson ${i}`, order: i }),
          );
        }
        lessonsByModule.push(lessons);
      }
      return { course, modules, lessonsByModule };
    }

    it("returns previous and next within the same module", async () => {
      const instructor = await createInstructor("jest-nav-instructor-1@example.com");
      const { modules, lessonsByModule } = await createCourseWithModules(instructor.id, [2]);

      const res = await request(app).get(`/api/lessons/${lessonsByModule[0][1].id}/navigation`);
      expect(res.status).toBe(200);
      expect(res.body.module.id).toBe(modules[0].id);
      expect(res.body.previous).toEqual({
        id: lessonsByModule[0][0].id,
        title: "Week 1 Lesson 1",
        weekNumber: 1,
      });
      expect(res.body.next).toBeNull();
    });

    it("crosses into the next module's first lesson at a week boundary", async () => {
      const instructor = await createInstructor("jest-nav-instructor-2@example.com");
      const { lessonsByModule } = await createCourseWithModules(instructor.id, [2, 2]);

      const res = await request(app).get(`/api/lessons/${lessonsByModule[0][1].id}/navigation`);
      expect(res.status).toBe(200);
      expect(res.body.next).toEqual({
        id: lessonsByModule[1][0].id,
        title: "Week 2 Lesson 1",
        weekNumber: 2,
      });
    });

    it("crosses into the previous module's last lesson at a week boundary", async () => {
      const instructor = await createInstructor("jest-nav-instructor-3@example.com");
      const { lessonsByModule } = await createCourseWithModules(instructor.id, [2, 2]);

      const res = await request(app).get(`/api/lessons/${lessonsByModule[1][0].id}/navigation`);
      expect(res.status).toBe(200);
      expect(res.body.previous).toEqual({
        id: lessonsByModule[0][1].id,
        title: "Week 1 Lesson 2",
        weekNumber: 1,
      });
    });

    it("skips over an empty module when crossing a boundary", async () => {
      const instructor = await createInstructor("jest-nav-instructor-4@example.com");
      const { lessonsByModule } = await createCourseWithModules(instructor.id, [1, 0, 1]);

      const res = await request(app).get(`/api/lessons/${lessonsByModule[0][0].id}/navigation`);
      expect(res.status).toBe(200);
      expect(res.body.next).toEqual({
        id: lessonsByModule[2][0].id,
        title: "Week 3 Lesson 1",
        weekNumber: 3,
      });
    });

    it("returns null previous/next at the very first and last lesson of a course", async () => {
      const instructor = await createInstructor("jest-nav-instructor-5@example.com");
      const { course, lessonsByModule } = await createCourseWithModules(instructor.id, [1, 1]);

      const first = await request(app).get(`/api/lessons/${lessonsByModule[0][0].id}/navigation`);
      expect(first.body.previous).toBeNull();
      expect(first.body.course).toEqual({ id: course.id, slug: course.slug, title: course.title });

      const last = await request(app).get(`/api/lessons/${lessonsByModule[1][0].id}/navigation`);
      expect(last.body.next).toBeNull();
    });

    it("requires no authentication, matching the other public lesson endpoints", async () => {
      const instructor = await createInstructor("jest-nav-instructor-6@example.com");
      const { lessonsByModule } = await createCourseWithModules(instructor.id, [1]);

      const res = await request(app).get(`/api/lessons/${lessonsByModule[0][0].id}/navigation`);
      expect(res.status).toBe(200);
    });
  });

  it("rejects mark-complete for unauthenticated, non-student, non-enrolled, and inactive enrollments", async () => {
    const instructor = await createInstructor();
    const { course, lessons } = await createCourseWithLessons(instructor.id);

    const unauth = await request(app).post(`/api/lessons/${lessons[0].id}/mark-complete`);
    expect(unauth.status).toBe(401);

    const instructorToken = await loginAs("jest-instructor@example.com");
    const asInstructor = await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(asInstructor.status).toBe(403);

    const notEnrolled = await registerStudent("lessonstudent-notenrolled@example.com");
    const notEnrolledToken = await loginAs("lessonstudent-notenrolled@example.com");
    const asNotEnrolled = await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${notEnrolledToken}`);
    expect(asNotEnrolled.status).toBe(403);
    void notEnrolled;

    const droppedStudent = await registerStudent("lessonstudent-dropped@example.com");
    await Enrollment.create({ courseId: course.id, studentId: droppedStudent.id, status: "dropped" });
    const droppedToken = await loginAs("lessonstudent-dropped@example.com");
    const asDropped = await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${droppedToken}`);
    expect(asDropped.status).toBe(403);
  });

  it("computes progressPercent from the real lesson count on the happy path", async () => {
    const instructor = await createInstructor();
    const { course, lessons } = await createCourseWithLessons(instructor.id, 4);
    const student = await registerStudent("lessonstudent-happy@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("lessonstudent-happy@example.com");

    const res = await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.alreadyCompleted).toBe(false);
    expect(res.body.courseProgress).toEqual({ totalLessons: 4, completedLessons: 1, progressPercent: 25 });

    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.progressPercent).toBe(25);
    expect(enrollment!.status).toBe("active");
  });

  it("is idempotent: marking the same lesson complete twice doesn't double-count", async () => {
    const instructor = await createInstructor();
    const { course, lessons } = await createCourseWithLessons(instructor.id, 4);
    const student = await registerStudent("lessonstudent-idempotent@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("lessonstudent-idempotent@example.com");

    const first = await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);
    expect(first.body.alreadyCompleted).toBe(false);

    const second = await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);
    expect(second.status).toBe(200);
    expect(second.body.alreadyCompleted).toBe(true);
    expect(second.body.courseProgress.progressPercent).toBe(25);

    const records = await ProgressTracking.findAll({
      where: { studentId: student.id, lessonId: lessons[0].id },
    });
    expect(records).toHaveLength(1);
  });

  it("marks the enrollment completed once every lesson is done", async () => {
    const instructor = await createInstructor();
    const { course, lessons } = await createCourseWithLessons(instructor.id, 2);
    const student = await registerStudent("lessonstudent-complete@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("lessonstudent-complete@example.com");

    for (const lesson of lessons) {
      await request(app)
        .post(`/api/lessons/${lesson.id}/mark-complete`)
        .set("Authorization", `Bearer ${token}`);
    }

    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    expect(enrollment!.progressPercent).toBe(100);
    expect(enrollment!.status).toBe("completed");
    expect(enrollment!.completionDate).not.toBeNull();
  });

  it("computes the correct final percent when two different lessons are completed concurrently", async () => {
    const instructor = await createInstructor();
    const { course, lessons } = await createCourseWithLessons(instructor.id, 3);
    const student = await registerStudent("lessonstudent-race@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("lessonstudent-race@example.com");

    const [first, second] = await Promise.all([
      request(app)
        .post(`/api/lessons/${lessons[0].id}/mark-complete`)
        .set("Authorization", `Bearer ${token}`),
      request(app)
        .post(`/api/lessons/${lessons[1].id}/mark-complete`)
        .set("Authorization", `Bearer ${token}`),
    ]);

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);

    const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
    // round(100 * 2/3) = 67 -- would be a stale 33 without the row lock serializing
    // the two concurrent read-recompute-write cycles on the enrollment.
    expect(enrollment!.progressPercent).toBe(67);
  });

  it("keeps progress isolated per course: completing a lesson in one course doesn't affect another", async () => {
    const instructor = await createInstructor();
    const courseX = await createCourseWithLessons(instructor.id, 2);
    const courseY = await createCourseWithLessons(instructor.id, 2);
    const student = await registerStudent("lessonstudent-isolated@example.com");
    await Enrollment.create({ courseId: courseX.course.id, studentId: student.id });
    const token = await loginAs("lessonstudent-isolated@example.com");

    const res = await request(app)
      .post(`/api/lessons/${courseY.lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);

    const enrollmentX = await Enrollment.findOne({
      where: { courseId: courseX.course.id, studentId: student.id },
    });
    expect(enrollmentX!.progressPercent).toBe(0);
  });

  it("returns course progress with correct scoping and completedLessonIds", async () => {
    const instructor = await createInstructor();
    const { course, lessons } = await createCourseWithLessons(instructor.id, 2);
    const student = await registerStudent("lessonstudent-progress@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("lessonstudent-progress@example.com");

    const unauth = await request(app).get(`/api/courses/${course.id}/progress`);
    expect(unauth.status).toBe(401);

    const instructorToken = await loginAs("jest-instructor@example.com");
    const asInstructor = await request(app)
      .get(`/api/courses/${course.id}/progress`)
      .set("Authorization", `Bearer ${instructorToken}`);
    expect(asInstructor.status).toBe(403);

    const notEnrolled = await registerStudent("lessonstudent-progress-notenrolled@example.com");
    const notEnrolledToken = await loginAs("lessonstudent-progress-notenrolled@example.com");
    const asNotEnrolled = await request(app)
      .get(`/api/courses/${course.id}/progress`)
      .set("Authorization", `Bearer ${notEnrolledToken}`);
    expect(asNotEnrolled.status).toBe(403);
    void notEnrolled;

    await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);

    const res = await request(app)
      .get(`/api/courses/${course.id}/progress`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.totalLessons).toBe(2);
    expect(res.body.completedLessons).toBe(1);
    expect(res.body.progressPercent).toBe(50);
    expect(res.body.completedLessonIds).toEqual([lessons[0].id]);
  });

  it("reports my-completion as false before and true after marking a lesson complete", async () => {
    const instructor = await createInstructor();
    const { course, lessons } = await createCourseWithLessons(instructor.id, 1);
    const student = await registerStudent("lessonstudent-mycompletion@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("lessonstudent-mycompletion@example.com");

    const before = await request(app)
      .get(`/api/lessons/${lessons[0].id}/my-completion`)
      .set("Authorization", `Bearer ${token}`);
    expect(before.body.completed).toBe(false);

    await request(app)
      .post(`/api/lessons/${lessons[0].id}/mark-complete`)
      .set("Authorization", `Bearer ${token}`);

    const after = await request(app)
      .get(`/api/lessons/${lessons[0].id}/my-completion`)
      .set("Authorization", `Bearer ${token}`);
    expect(after.body.completed).toBe(true);
  });

  describe("video checkpoints", () => {
    async function createCheckpointWithAnswers(lessonId: string) {
      const checkpoint = await VideoCheckpoint.create({
        lessonId,
        timestampSeconds: 30,
        questionText: "What does the C in CIA Triad stand for?",
        questionType: "multiple_choice",
        order: 1,
        explanation: "Confidentiality is the first pillar of the CIA Triad.",
      });
      const correct = await VideoCheckpointAnswer.create({
        checkpointId: checkpoint.id,
        answerText: "Confidentiality",
        isCorrect: true,
        order: 1,
      });
      const wrong = await VideoCheckpointAnswer.create({
        checkpointId: checkpoint.id,
        answerText: "Control",
        isCorrect: false,
        order: 2,
      });
      return { checkpoint, correct, wrong };
    }

    it("returns checkpoints for a lesson without ever exposing isCorrect", async () => {
      const instructor = await createInstructor();
      const { lessons } = await createCourseWithLessons(instructor.id, 1);
      await createCheckpointWithAnswers(lessons[0].id);

      const res = await request(app).get(`/api/lessons/${lessons[0].id}/checkpoints`);
      expect(res.status).toBe(200);
      expect(res.body.checkpoints).toHaveLength(1);
      const checkpoint = res.body.checkpoints[0];
      expect(checkpoint.timestampSeconds).toBe(30);
      expect(checkpoint.answers).toHaveLength(2);
      checkpoint.answers.forEach((a: Record<string, unknown>) => {
        expect(a.isCorrect).toBeUndefined();
      });
    });

    it("returns an empty array for a lesson with no checkpoints", async () => {
      const instructor = await createInstructor();
      const { lessons } = await createCourseWithLessons(instructor.id, 1);

      const res = await request(app).get(`/api/lessons/${lessons[0].id}/checkpoints`);
      expect(res.status).toBe(200);
      expect(res.body.checkpoints).toEqual([]);
    });

    it("confirms a correct answer and lets an incorrect answer retry with the right answer revealed", async () => {
      const instructor = await createInstructor();
      const { lessons } = await createCourseWithLessons(instructor.id, 1);
      const { checkpoint, correct, wrong } = await createCheckpointWithAnswers(lessons[0].id);

      const wrongRes = await request(app)
        .post(`/api/lessons/${lessons[0].id}/checkpoints/${checkpoint.id}/check`)
        .send({ answerId: wrong.id });
      expect(wrongRes.status).toBe(200);
      expect(wrongRes.body.correct).toBe(false);
      expect(wrongRes.body.correctAnswerId).toBe(correct.id);
      expect(wrongRes.body.explanation).toBe(checkpoint.explanation);

      const rightRes = await request(app)
        .post(`/api/lessons/${lessons[0].id}/checkpoints/${checkpoint.id}/check`)
        .send({ answerId: correct.id });
      expect(rightRes.status).toBe(200);
      expect(rightRes.body.correct).toBe(true);
      expect(rightRes.body.correctAnswerId).toBe(correct.id);
    });

    it("returns 404 for an unknown checkpoint", async () => {
      const res = await request(app)
        .post(`/api/lessons/00000000-0000-0000-0000-000000000000/checkpoints/00000000-0000-0000-0000-000000000000/check`)
        .send({ answerId: "00000000-0000-0000-0000-000000000000" });
      expect(res.status).toBe(404);
    });

    it("returns 404 when the answer doesn't belong to the given checkpoint", async () => {
      const instructor = await createInstructor();
      const { lessons } = await createCourseWithLessons(instructor.id, 1);
      const { checkpoint: checkpointA } = await createCheckpointWithAnswers(lessons[0].id);
      const { correct: answerFromB } = await createCheckpointWithAnswers(lessons[0].id);

      const res = await request(app)
        .post(`/api/lessons/${lessons[0].id}/checkpoints/${checkpointA.id}/check`)
        .send({ answerId: answerFromB.id });
      expect(res.status).toBe(404);
    });

    it("rejects a check request with a malformed answerId", async () => {
      const instructor = await createInstructor();
      const { lessons } = await createCourseWithLessons(instructor.id, 1);
      const { checkpoint } = await createCheckpointWithAnswers(lessons[0].id);

      const res = await request(app)
        .post(`/api/lessons/${lessons[0].id}/checkpoints/${checkpoint.id}/check`)
        .send({ answerId: "not-a-uuid" });
      expect(res.status).toBe(400);
    });
  });
});
