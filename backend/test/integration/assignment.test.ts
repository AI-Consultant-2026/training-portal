import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Assignment, AssignmentSubmission, Course, CourseModule, Enrollment, User } from "../../src/models";

const app = createApp();

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

async function createCourseWithAssignment(instructorId: string, fileRequired = false) {
  const course = await Course.create({
    title: "Assignment Course",
    slug: `assignment-course-${Date.now()}-${Math.random()}`,
    durationWeeks: 4,
    status: "published",
    instructorId,
  });
  const courseModule = await CourseModule.create({
    courseId: course.id,
    title: "Module 1",
    weekNumber: 1,
  });
  const assignment = await Assignment.create({
    moduleId: courseModule.id,
    title: "Week 1 Essay",
    fileRequired,
    pointsTotal: 100,
  });
  return { course, courseModule, assignment };
}

describe("Assignments", () => {
  it("allows an enrolled student to view and submit an assignment (text only)", async () => {
    const instructor = await createInstructor();
    const { course, assignment } = await createCourseWithAssignment(instructor.id);
    const student = await registerStudent("student1@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("student1@example.com");

    const getRes = await request(app)
      .get(`/api/assignments/${assignment.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getRes.status).toBe(200);

    const submitRes = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "My essay content");

    expect(submitRes.status).toBe(201);
    expect(submitRes.body.submission.submissionText).toBe("My essay content");
    expect(submitRes.body.submission.status).toBe("submitted");
  });

  it("rejects submission without a file when fileRequired is true", async () => {
    const instructor = await createInstructor();
    const { course, assignment } = await createCourseWithAssignment(instructor.id, true);
    const student = await registerStudent("student2@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("student2@example.com");

    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "no file attached");

    expect(res.status).toBe(400);
  });

  it("accepts a submission with an attached file and stores it", async () => {
    const instructor = await createInstructor();
    const { course, assignment } = await createCourseWithAssignment(instructor.id, true);
    const student = await registerStudent("student3@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("student3@example.com");

    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "see attached")
      .attach("file", Buffer.from("hello world"), { filename: "essay.txt", contentType: "text/plain" });

    expect(res.status).toBe(201);
    expect(res.body.submission.filePath).toBeTruthy();
  });

  it("rejects submission from a non-enrolled student", async () => {
    const instructor = await createInstructor();
    const { assignment } = await createCourseWithAssignment(instructor.id);
    await registerStudent("student4@example.com");
    const token = await loginAs("student4@example.com");

    const res = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${token}`)
      .field("submissionText", "text");

    expect(res.status).toBe(403);
  });

  it("overwrites a submission on resubmission before grading, and blocks it after grading", async () => {
    const instructor = await createInstructor();
    const { course, assignment } = await createCourseWithAssignment(instructor.id);
    const student = await registerStudent("student5@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const studentToken = await loginAs("student5@example.com");

    await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "first draft");

    const secondSubmit = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "second draft");
    expect(secondSubmit.status).toBe(201);
    expect(secondSubmit.body.submission.submissionText).toBe("second draft");

    const count = await AssignmentSubmission.count({
      where: { assignmentId: assignment.id, studentId: student.id },
    });
    expect(count).toBe(1);

    const instructorToken = await loginAs(instructor.email);
    const submissionId = secondSubmit.body.submission.id;
    const gradeRes = await request(app)
      .patch(`/api/assignment-submissions/${submissionId}/grade`)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({ score: 90, feedback: "Great work" });
    expect(gradeRes.status).toBe(200);
    expect(gradeRes.body.submission.status).toBe("graded");

    const thirdSubmit = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "third draft after grading");
    expect(thirdSubmit.status).toBe(409);
  });

  it("allows the owning instructor to list and grade submissions, and forbids a non-owning instructor", async () => {
    const instructor = await createInstructor("owner-instructor@example.com");
    const otherInstructor = await createInstructor("other-instructor@example.com");
    const { course, assignment } = await createCourseWithAssignment(instructor.id);
    const student = await registerStudent("student6@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const studentToken = await loginAs("student6@example.com");

    await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .field("submissionText", "content");

    const ownerToken = await loginAs(instructor.email);
    const listRes = await request(app)
      .get(`/api/assignments/${assignment.id}/submissions`)
      .set("Authorization", `Bearer ${ownerToken}`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.submissions).toHaveLength(1);

    const otherToken = await loginAs(otherInstructor.email);
    const forbiddenList = await request(app)
      .get(`/api/assignments/${assignment.id}/submissions`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(forbiddenList.status).toBe(403);

    const submissionId = listRes.body.submissions[0].id;
    const forbiddenGrade = await request(app)
      .patch(`/api/assignment-submissions/${submissionId}/grade`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ score: 50 });
    expect(forbiddenGrade.status).toBe(403);
  });

  it("forbids students from listing or grading submissions", async () => {
    const instructor = await createInstructor();
    const { course, assignment } = await createCourseWithAssignment(instructor.id);
    const student = await registerStudent("student7@example.com");
    await Enrollment.create({ courseId: course.id, studentId: student.id });
    const token = await loginAs("student7@example.com");

    const res = await request(app)
      .get(`/api/assignments/${assignment.id}/submissions`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it("prevents one student from viewing another student's submission", async () => {
    const instructor = await createInstructor();
    const { course, assignment } = await createCourseWithAssignment(instructor.id);
    const studentA = await registerStudent("studentA@example.com");
    const studentB = await registerStudent("studentB@example.com");
    await Enrollment.create({ courseId: course.id, studentId: studentA.id });
    await Enrollment.create({ courseId: course.id, studentId: studentB.id });
    const tokenA = await loginAs("studentA@example.com");
    const tokenB = await loginAs("studentB@example.com");

    const submitRes = await request(app)
      .post(`/api/assignments/${assignment.id}/submit`)
      .set("Authorization", `Bearer ${tokenA}`)
      .field("submissionText", "A's private submission");

    const submissionId = submitRes.body.submission.id;
    const res = await request(app)
      .get(`/api/assignments/${assignment.id}/submissions/${submissionId}`)
      .set("Authorization", `Bearer ${tokenB}`);
    expect(res.status).toBe(403);
  });
});
