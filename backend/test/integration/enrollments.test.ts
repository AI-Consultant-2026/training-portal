import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, CourseModule, Enrollment, Lesson, ProgressTracking, User } from "../../src/models";

const app = createApp();

async function createInstructor(email = "jest-enroll-instructor@example.com") {
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

async function createCourseWithModules(instructorId: string, lessonsPerModule: number[]) {
  const course = await Course.create({
    title: "Next Lesson Course",
    slug: `next-lesson-course-${Date.now()}-${Math.random()}`,
    durationWeeks: lessonsPerModule.length,
    status: "published",
    instructorId,
  });
  const lessonsByModule: Lesson[][] = [];
  for (let week = 0; week < lessonsPerModule.length; week++) {
    const courseModule = await CourseModule.create({
      courseId: course.id,
      title: `Module ${week + 1}`,
      weekNumber: week + 1,
    });
    const lessons: Lesson[] = [];
    for (let i = 1; i <= lessonsPerModule[week]; i++) {
      lessons.push(
        await Lesson.create({ moduleId: courseModule.id, title: `Week ${week + 1} Lesson ${i}`, order: i }),
      );
    }
    lessonsByModule.push(lessons);
  }
  return { course, lessonsByModule };
}

describe("Enrollments: nextLessonId", () => {
  it("rejects an anonymous request", async () => {
    const res = await request(app).get("/api/enrollments");
    expect(res.status).toBe(401);
  });

  it("is null when the enrollment isn't payment-confirmed yet, even with lessons available", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [2]);
    const student = await registerStudent("nextlesson-unpaid@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: false });
    const token = await loginAs("nextlesson-unpaid@example.com");

    const res = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.enrollments).toHaveLength(1);
    expect(res.body.enrollments[0].nextLessonId).toBeNull();
  });

  it("points at the first lesson when nothing has been completed yet", async () => {
    const instructor = await createInstructor();
    const { course, lessonsByModule } = await createCourseWithModules(instructor.id, [2]);
    const student = await registerStudent("nextlesson-fresh@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
    const token = await loginAs("nextlesson-fresh@example.com");

    const res = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${token}`);
    expect(res.body.enrollments[0].nextLessonId).toBe(lessonsByModule[0][0].id);
  });

  it("points at the first incomplete lesson after completing the one before it", async () => {
    const instructor = await createInstructor();
    const { course, lessonsByModule } = await createCourseWithModules(instructor.id, [2]);
    const student = await registerStudent("nextlesson-partial@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
    await ProgressTracking.create({ studentId: student.id, lessonId: lessonsByModule[0][0].id });
    const token = await loginAs("nextlesson-partial@example.com");

    const res = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${token}`);
    expect(res.body.enrollments[0].nextLessonId).toBe(lessonsByModule[0][1].id);
  });

  it("crosses into the next module's first lesson once the current module is finished", async () => {
    const instructor = await createInstructor();
    const { course, lessonsByModule } = await createCourseWithModules(instructor.id, [1, 2]);
    const student = await registerStudent("nextlesson-crossmodule@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
    await ProgressTracking.create({ studentId: student.id, lessonId: lessonsByModule[0][0].id });
    const token = await loginAs("nextlesson-crossmodule@example.com");

    const res = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${token}`);
    expect(res.body.enrollments[0].nextLessonId).toBe(lessonsByModule[1][0].id);
  });

  it("is null once every lesson in the course is completed", async () => {
    const instructor = await createInstructor();
    const { course, lessonsByModule } = await createCourseWithModules(instructor.id, [1, 1]);
    const student = await registerStudent("nextlesson-done@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
    await ProgressTracking.create({ studentId: student.id, lessonId: lessonsByModule[0][0].id });
    await ProgressTracking.create({ studentId: student.id, lessonId: lessonsByModule[1][0].id });
    const token = await loginAs("nextlesson-done@example.com");

    const res = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${token}`);
    expect(res.body.enrollments[0].nextLessonId).toBeNull();
  });

  it("is null for a payment-confirmed enrollment in a course with no lessons yet", async () => {
    const instructor = await createInstructor();
    const course = await Course.create({
      title: "Empty Course",
      slug: `empty-course-${Date.now()}-${Math.random()}`,
      durationWeeks: 1,
      status: "published",
      instructorId: instructor.id,
    });
    const student = await registerStudent("nextlesson-empty@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true });
    const token = await loginAs("nextlesson-empty@example.com");

    const res = await request(app).get("/api/enrollments").set("Authorization", `Bearer ${token}`);
    expect(res.body.enrollments[0].nextLessonId).toBeNull();
  });

  it("returns nextLessonId: null on the enroll response, since a fresh enrollment is never payment-confirmed", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [1]);
    await registerStudent("nextlesson-enrollresponse@example.com");
    await User.update(
      { emailVerifiedAt: new Date() },
      { where: { email: "nextlesson-enrollresponse@example.com" } },
    );
    const token = await loginAs("nextlesson-enrollresponse@example.com");

    const res = await request(app)
      .post(`/api/courses/${course.id}/enroll`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body.enrollment.nextLessonId).toBeNull();
  });
});

async function createAdmin(email = "jest-enroll-admin@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Admin", role: "admin" });
}

describe("Enrollments: certificate download", () => {
  it("rejects an anonymous request", async () => {
    const res = await request(app).get("/api/enrollments/00000000-0000-0000-0000-000000000000/certificate");
    expect(res.status).toBe(401);
  });

  it("404s for an unknown enrollment", async () => {
    const student = await registerStudent("certificate-unknown@example.com");
    void student;
    const token = await loginAs("certificate-unknown@example.com");

    const res = await request(app)
      .get("/api/enrollments/00000000-0000-0000-0000-000000000000/certificate")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it("forbids a student downloading another student's certificate", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [1]);
    const owner = await registerStudent("certificate-owner@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: owner.id,
      status: "completed",
      progressPercent: 100,
      completionDate: new Date(),
    });

    await registerStudent("certificate-intruder@example.com");
    const intruderToken = await loginAs("certificate-intruder@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/certificate`)
      .set("Authorization", `Bearer ${intruderToken}`);
    expect(res.status).toBe(403);
  });

  it("forbids downloading a certificate for a course that isn't completed yet", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [1]);
    const student = await registerStudent("certificate-notdone@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      status: "active",
      progressPercent: 50,
    });
    const token = await loginAs("certificate-notdone@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/certificate`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it("streams a real PDF for the owning student's completed enrollment", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [1]);
    const student = await registerStudent("certificate-owner2@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      status: "completed",
      progressPercent: 100,
      completionDate: new Date("2026-06-15"),
    });
    const token = await loginAs("certificate-owner2@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/certificate`)
      .set("Authorization", `Bearer ${token}`)
      .buffer(true)
      .parse((r, cb) => {
        const chunks: Buffer[] = [];
        r.on("data", (chunk) => chunks.push(chunk));
        r.on("end", () => cb(null, Buffer.concat(chunks)));
      });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("application/pdf");
    expect(res.headers["content-disposition"]).toContain("attachment");
    expect(res.headers["content-disposition"]).toContain(".pdf");
    const body = res.body as Buffer;
    expect(body.subarray(0, 5).toString("latin1")).toBe("%PDF-");
  });

  it("allows an admin to download any student's certificate", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [1]);
    const student = await registerStudent("certificate-adminview@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      status: "completed",
      progressPercent: 100,
      completionDate: new Date(),
    });

    await createAdmin();
    const adminToken = await loginAs("jest-enroll-admin@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/certificate`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
});

describe("Enrollments: attendance record download", () => {
  it("rejects an anonymous request", async () => {
    const res = await request(app).get("/api/enrollments/00000000-0000-0000-0000-000000000000/attendance-record");
    expect(res.status).toBe(401);
  });

  it("404s for an unknown enrollment", async () => {
    await registerStudent("attendance-unknown@example.com");
    const token = await loginAs("attendance-unknown@example.com");

    const res = await request(app)
      .get("/api/enrollments/00000000-0000-0000-0000-000000000000/attendance-record")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it("forbids a student downloading another student's attendance record", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [2]);
    const owner = await registerStudent("attendance-owner@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: owner.id,
      paymentConfirmed: true,
    });

    await registerStudent("attendance-intruder@example.com");
    const intruderToken = await loginAs("attendance-intruder@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/attendance-record`)
      .set("Authorization", `Bearer ${intruderToken}`);
    expect(res.status).toBe(403);
  });

  it("forbids downloading an attendance record before payment is confirmed", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [2]);
    const student = await registerStudent("attendance-unpaid@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: false,
    });
    const token = await loginAs("attendance-unpaid@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/attendance-record`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it("streams a real PDF listing every session with its completion state, mid-course", async () => {
    const instructor = await createInstructor();
    const { course, lessonsByModule } = await createCourseWithModules(instructor.id, [2, 2]);
    const student = await registerStudent("attendance-owner2@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: true,
    });
    // Only the first week's two lessons are done -- the record should still list all
    // four sessions, with the second week's marked pending rather than omitted.
    await ProgressTracking.create({ studentId: student.id, lessonId: lessonsByModule[0][0].id });
    await ProgressTracking.create({ studentId: student.id, lessonId: lessonsByModule[0][1].id });
    const token = await loginAs("attendance-owner2@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/attendance-record`)
      .set("Authorization", `Bearer ${token}`)
      .buffer(true)
      .parse((r, cb) => {
        const chunks: Buffer[] = [];
        r.on("data", (chunk) => chunks.push(chunk));
        r.on("end", () => cb(null, Buffer.concat(chunks)));
      });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("application/pdf");
    expect(res.headers["content-disposition"]).toContain("attachment");
    expect(res.headers["content-disposition"]).toContain("attendance-record.pdf");
    const body = res.body as Buffer;
    expect(body.subarray(0, 5).toString("latin1")).toBe("%PDF-");
  });

  it("allows an admin to download any student's attendance record", async () => {
    const instructor = await createInstructor();
    const { course } = await createCourseWithModules(instructor.id, [1]);
    const student = await registerStudent("attendance-adminview@example.com");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: true,
    });

    await createAdmin();
    const adminToken = await loginAs("jest-enroll-admin@example.com");

    const res = await request(app)
      .get(`/api/enrollments/${enrollment.id}/attendance-record`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
});
