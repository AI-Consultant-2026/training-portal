import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Capstone, CapstoneSubmission, Course, CourseModule, Enrollment, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

async function createInstructor(email = "jest-instructor@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({
    email,
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

async function loginAs(email: string, password = "Password123!") {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

async function createCourseWithCapstone(instructorId: string, fileRequired = false) {
  const course = await Course.create({
    title: "Capstone Course",
    slug: `capstone-course-${Date.now()}-${Math.random()}`,
    durationWeeks: 4,
    status: "published",
    instructorId,
  });
  const capstone = await Capstone.create({
    courseId: course.id,
    title: "Final Capstone Project",
    fileRequired,
    pointsTotal: 100,
  });
  return { course, capstone };
}

describe("Capstones", () => {
  it("allows an enrolled student to view and submit a capstone (text only)", async () => {
    const instructor = await createInstructor();
    const { course, capstone } = await createCourseWithCapstone(instructor.id);
    const student = await registerStudent("cstudent1@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("cstudent1@example.com");

    const getRes = await request(app)
      .get(`/api/capstones/${capstone.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getRes.status).toBe(200);

    const submitRes = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "My capstone content");

    expect(submitRes.status).toBe(201);
    expect(submitRes.body.submission.submissionText).toBe("My capstone content");
    expect(submitRes.body.submission.status).toBe("submitted");
  });

  it("rejects submission without a file when fileRequired is true", async () => {
    const instructor = await createInstructor();
    const { course, capstone } = await createCourseWithCapstone(instructor.id, true);
    const student = await registerStudent("cstudent2@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("cstudent2@example.com");

    const res = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "no file attached");

    expect(res.status).toBe(400);
  });

  it("accepts a submission with an attached file and stores it", async () => {
    const instructor = await createInstructor();
    const { course, capstone } = await createCourseWithCapstone(instructor.id, true);
    const student = await registerStudent("cstudent3@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("cstudent3@example.com");

    const res = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "see attached")
      .attach("file", Buffer.from("hello world"), { filename: "report.txt", contentType: "text/plain" });

    expect(res.status).toBe(201);
    expect(res.body.submission.filePath).toBeTruthy();
  });

  it("rejects submission from a non-enrolled student", async () => {
    const instructor = await createInstructor();
    const { capstone } = await createCourseWithCapstone(instructor.id);
    await registerStudent("cstudent4@example.com");
    const token = await loginAs("cstudent4@example.com");

    const res = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "text");

    expect(res.status).toBe(403);
  });

  it("overwrites a submission on resubmission before grading, and blocks it after grading", async () => {
    const instructor = await createInstructor();
    const { course, capstone } = await createCourseWithCapstone(instructor.id);
    const student = await registerStudent("cstudent5@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const studentToken = await loginAs("cstudent5@example.com");

    await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "first draft");

    const secondSubmit = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "second draft");
    expect(secondSubmit.status).toBe(201);
    expect(secondSubmit.body.submission.submissionText).toBe("second draft");

    const count = await CapstoneSubmission.count({
      where: { capstoneId: capstone.id, studentId: student.id },
    });
    expect(count).toBe(1);

    const instructorToken = await loginAs(instructor.email);
    const submissionId = secondSubmit.body.submission.id;
    const gradeRes = await request(app)
      .patch(`/api/capstone-submissions/${submissionId}/grade`)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({ score: 90, feedback: "Great work" });
    expect(gradeRes.status).toBe(200);
    expect(gradeRes.body.submission.status).toBe("graded");

    const thirdSubmit = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "third draft after grading");
    expect(thirdSubmit.status).toBe(409);
  });

  it("allows the owning instructor to list and grade submissions, and forbids a non-owning instructor", async () => {
    const instructor = await createInstructor("c-owner-instructor@example.com");
    const otherInstructor = await createInstructor("c-other-instructor@example.com");
    const { course, capstone } = await createCourseWithCapstone(instructor.id);
    const student = await registerStudent("cstudent6@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const studentToken = await loginAs("cstudent6@example.com");

    await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "content");

    const ownerToken = await loginAs(instructor.email);
    const listRes = await request(app)
      .get(`/api/capstones/${capstone.id}/submissions`)
      .set("Authorization", `Bearer ${ownerToken}`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.submissions).toHaveLength(1);

    const otherToken = await loginAs(otherInstructor.email);
    const forbiddenList = await request(app)
      .get(`/api/capstones/${capstone.id}/submissions`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(forbiddenList.status).toBe(403);

    const submissionId = listRes.body.submissions[0].id;
    const forbiddenGrade = await request(app)
      .patch(`/api/capstone-submissions/${submissionId}/grade`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ score: 50 });
    expect(forbiddenGrade.status).toBe(403);
  });

  it("forbids students from listing or grading submissions", async () => {
    const instructor = await createInstructor();
    const { course, capstone } = await createCourseWithCapstone(instructor.id);
    const student = await registerStudent("cstudent7@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("cstudent7@example.com");

    const res = await request(app)
      .get(`/api/capstones/${capstone.id}/submissions`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it("prevents one student from viewing another student's submission", async () => {
    const instructor = await createInstructor();
    const { course, capstone } = await createCourseWithCapstone(instructor.id);
    const studentA = await registerStudent("cstudentA@example.com");
    const studentB = await registerStudent("cstudentB@example.com");
    await Enrollment.create({ courseId: course.id, studentId: studentA.id });
    await Enrollment.create({ courseId: course.id, studentId: studentB.id });
    const tokenA = await loginAs("cstudentA@example.com");
    const tokenB = await loginAs("cstudentB@example.com");

    const submitRes = await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${tokenA}`)
      .field("submissionText", "A's private submission");

    const submissionId = submitRes.body.submission.id;
    const res = await request(app)
      .get(`/api/capstones/${capstone.id}/submissions/${submissionId}`)
      .set("Authorization", `Bearer ${tokenB}`);
    expect(res.status).toBe(403);
  });

  it("returns null from my-submission before submitting, then the real submission after", async () => {
    const instructor = await createInstructor();
    const { course, capstone } = await createCourseWithCapstone(instructor.id);
    const student = await registerStudent("cstudent8@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("cstudent8@example.com");

    const before = await request(app)
      .get(`/api/capstones/${capstone.id}/my-submission`)
      .set("Authorization", `Bearer ${token}`);
    expect(before.status).toBe(200);
    expect(before.body.submission).toBeNull();

    await request(app)
      .post(`/api/capstones/${capstone.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "my answer");

    const after = await request(app)
      .get(`/api/capstones/${capstone.id}/my-submission`)
      .set("Authorization", `Bearer ${token}`);
    expect(after.status).toBe(200);
    expect(after.body.submission.submissionText).toBe("my answer");
  });

  it("forbids an instructor from reading my-submission (student-only endpoint)", async () => {
    const instructor = await createInstructor();
    const { capstone } = await createCourseWithCapstone(instructor.id);
    const token = await loginAs(instructor.email);

    const res = await request(app)
      .get(`/api/capstones/${capstone.id}/my-submission`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  describe("file download", () => {
    it("allows the submitting student to download their own file", async () => {
      const instructor = await createInstructor();
      const { course, capstone } = await createCourseWithCapstone(instructor.id, true);
      const student = await registerStudent("cfilestudent1@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });
      const token = await loginAs("cfilestudent1@example.com");

      const submitRes = await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${token}`)
        .attach("file", Buffer.from("file contents"), { filename: "report.txt", contentType: "text/plain" });

      const res = await request(app)
        .get(`/api/capstone-submissions/${submitRes.body.submission.id}/file`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.text).toBe("file contents");
    });

    it("forbids a different student from downloading someone else's file", async () => {
      const instructor = await createInstructor();
      const { course, capstone } = await createCourseWithCapstone(instructor.id, true);
      const studentA = await registerStudent("cfilestudentA@example.com");
      const studentB = await registerStudent("cfilestudentB@example.com");
      await Enrollment.create({ courseId: course.id, studentId: studentA.id });
      await Enrollment.create({ courseId: course.id, studentId: studentB.id });
      const tokenA = await loginAs("cfilestudentA@example.com");
      const tokenB = await loginAs("cfilestudentB@example.com");

      const submitRes = await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${tokenA}`)
        .attach("file", Buffer.from("A's file"), { filename: "a.txt", contentType: "text/plain" });

      const res = await request(app)
        .get(`/api/capstone-submissions/${submitRes.body.submission.id}/file`)
        .set("Authorization", `Bearer ${tokenB}`);
      expect(res.status).toBe(403);
    });

    it("allows the owning instructor to download a student's file, forbids a non-owning instructor", async () => {
      const instructor = await createInstructor("cfile-owner-instructor@example.com");
      const otherInstructor = await createInstructor("cfile-other-instructor@example.com");
      const { course, capstone } = await createCourseWithCapstone(instructor.id, true);
      const student = await registerStudent("cfilestudent2@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });
      const studentToken = await loginAs("cfilestudent2@example.com");

      const submitRes = await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${studentToken}`)
        .attach("file", Buffer.from("submission file"), { filename: "b.txt", contentType: "text/plain" });

      const ownerToken = await loginAs(instructor.email);
      const ownerRes = await request(app)
        .get(`/api/capstone-submissions/${submitRes.body.submission.id}/file`)
        .set("Authorization", `Bearer ${ownerToken}`);
      expect(ownerRes.status).toBe(200);

      const otherToken = await loginAs(otherInstructor.email);
      const otherRes = await request(app)
        .get(`/api/capstone-submissions/${submitRes.body.submission.id}/file`)
        .set("Authorization", `Bearer ${otherToken}`);
      expect(otherRes.status).toBe(403);
    });

    it("returns 404 when the submission has no attached file", async () => {
      const instructor = await createInstructor();
      const { course, capstone } = await createCourseWithCapstone(instructor.id);
      const student = await registerStudent("cfilestudent3@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });
      const token = await loginAs("cfilestudent3@example.com");

      const submitRes = await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${token}`)
        .field("submissionText", "no file here");

      const res = await request(app)
        .get(`/api/capstone-submissions/${submitRes.body.submission.id}/file`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(404);
    });
  });

  describe("capstone-specific behavior", () => {
    it("sets enrollment.grade to the score when a submission is graded", async () => {
      const instructor = await createInstructor();
      const { course, capstone } = await createCourseWithCapstone(instructor.id);
      const student = await registerStudent("cgradestudent1@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });
      const studentToken = await loginAs("cgradestudent1@example.com");

      const submitRes = await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${studentToken}`)
        .field("submissionText", "content");

      const instructorToken = await loginAs(instructor.email);
      const gradeRes = await request(app)
        .patch(`/api/capstone-submissions/${submitRes.body.submission.id}/grade`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ score: 88 });
      expect(gradeRes.status).toBe(200);
      // The mirrored write is a side effect, not part of the grade response contract.
      expect(gradeRes.body.submission.score).toBe(88);

      const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
      expect(enrollment!.grade).toBe("88");

      const gradedEmail = memAdapter.sentMessages.find(
        (m) => m.to === student.email && m.subject.includes("graded"),
      );
      expect(gradedEmail).toBeDefined();
      expect(gradedEmail!.text).toContain("88");
    });

    it("still grades successfully when no enrollment row exists", async () => {
      const instructor = await createInstructor();
      const { course, capstone } = await createCourseWithCapstone(instructor.id);
      const student = await registerStudent("cgradestudent2@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });
      const studentToken = await loginAs("cgradestudent2@example.com");

      const submitRes = await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${studentToken}`)
        .field("submissionText", "content");

      // Simulate the (currently unreachable via any other feature) missing-enrollment edge case.
      await Enrollment.destroy({ where: { courseId: course.id, studentId: student.id } });

      const instructorToken = await loginAs(instructor.email);
      const gradeRes = await request(app)
        .patch(`/api/capstone-submissions/${submitRes.body.submission.id}/grade`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ score: 75 });
      expect(gradeRes.status).toBe(200);
      expect(gradeRes.body.submission.status).toBe("graded");
    });

    it("updates the mirrored enrollment grade on re-grade", async () => {
      const instructor = await createInstructor();
      const { course, capstone } = await createCourseWithCapstone(instructor.id);
      const student = await registerStudent("cgradestudent3@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });
      const studentToken = await loginAs("cgradestudent3@example.com");

      const submitRes = await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${studentToken}`)
        .field("submissionText", "content");

      const instructorToken = await loginAs(instructor.email);
      await request(app)
        .patch(`/api/capstone-submissions/${submitRes.body.submission.id}/grade`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ score: 60 });

      const regrade = await request(app)
        .patch(`/api/capstone-submissions/${submitRes.body.submission.id}/grade`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ score: 95 });
      expect(regrade.status).toBe(200);

      const enrollment = await Enrollment.findOne({ where: { courseId: course.id, studentId: student.id } });
      expect(enrollment!.grade).toBe("95");
    });

    it("enforces at most one capstone per course at the database level", async () => {
      const instructor = await createInstructor();
      const { course } = await createCourseWithCapstone(instructor.id);

      await expect(
        Capstone.create({ courseId: course.id, title: "Duplicate capstone" }),
      ).rejects.toThrow();
    });

    it("returns capstone: null (200) for a course with no capstone", async () => {
      const instructor = await createInstructor();
      const course = await Course.create({
        title: "No Capstone Course",
        slug: `no-capstone-course-${Date.now()}-${Math.random()}`,
        durationWeeks: 4,
        status: "published",
        instructorId: instructor.id,
      });
      const token = await loginAs(instructor.email);

      const res = await request(app)
        .get(`/api/courses/${course.id}/capstone`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.capstone).toBeNull();
    });

    it("scopes the ungraded-capstone-submissions queue by course ownership with zero modules involved", async () => {
      const owner = await createInstructor("cqueue-owner@example.com");
      const other = await createInstructor("cqueue-other@example.com");
      const { course, capstone } = await createCourseWithCapstone(owner.id);
      // Confirms the module-hop removal is real: this course has no CourseModule rows at all.
      const moduleCount = await CourseModule.count({ where: { courseId: course.id } });
      expect(moduleCount).toBe(0);

      const student = await registerStudent("cqueuestudent@example.com");
      await Enrollment.create({ courseId: course.id, studentId: student.id });
      const studentToken = await loginAs("cqueuestudent@example.com");
      await request(app)
        .post(`/api/capstones/${capstone.id}/submit`)
        .set("Authorization", `Bearer ${studentToken}`)
        .field("submissionText", "content");

      const ownerToken = await loginAs("cqueue-owner@example.com");
      const ownerRes = await request(app)
        .get("/api/instructor/ungraded-capstone-submissions")
        .set("Authorization", `Bearer ${ownerToken}`);
      expect(ownerRes.status).toBe(200);
      expect(ownerRes.body.submissions).toHaveLength(1);
      expect(ownerRes.body.submissions[0].courseTitle).toBe(course.title);

      const otherToken = await loginAs("cqueue-other@example.com");
      const otherRes = await request(app)
        .get("/api/instructor/ungraded-capstone-submissions")
        .set("Authorization", `Bearer ${otherToken}`);
      expect(otherRes.status).toBe(200);
      expect(otherRes.body.submissions).toHaveLength(0);
    });
  });
});
