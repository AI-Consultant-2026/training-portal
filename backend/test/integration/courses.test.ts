import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, User } from "../../src/models";

const app = createApp();

async function createInstructor() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({
    email: "jest-instructor@example.com",
    passwordHash,
    firstName: "Jest",
    lastName: "Instructor",
    role: "instructor",
  });
}

async function loginAs(email: string, password: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

describe("Courses", () => {
  it("lists only published courses publicly", async () => {
    await Course.create({
      title: "Published Course",
      slug: "published-course",
      durationWeeks: 4,
      status: "published",
    });
    await Course.create({
      title: "Draft Course",
      slug: "draft-course",
      durationWeeks: 4,
      status: "draft",
    });

    const res = await request(app).get("/api/courses");

    expect(res.status).toBe(200);
    const slugs = res.body.courses.map((c: { slug: string }) => c.slug);
    expect(slugs).toContain("published-course");
    expect(slugs).not.toContain("draft-course");
  });

  it("gets a course by slug", async () => {
    await Course.create({
      title: "Findable Course",
      slug: "findable-course",
      durationWeeks: 4,
      status: "published",
    });

    const res = await request(app).get("/api/courses/findable-course");

    expect(res.status).toBe(200);
    expect(res.body.course.title).toBe("Findable Course");
  });

  it("returns 404 for an unknown course", async () => {
    const res = await request(app).get("/api/courses/does-not-exist");
    expect(res.status).toBe(404);
  });

  it("requires authentication to create a course", async () => {
    const res = await request(app)
      .post("/api/courses")
      .send({ title: "New Course", slug: "new-course", durationWeeks: 4 });

    expect(res.status).toBe(401);
  });

  it("allows an instructor to create a course", async () => {
    await createInstructor();
    const token = await loginAs("jest-instructor@example.com", "Password123!");

    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Instructor Course", slug: "instructor-course", durationWeeks: 6 });

    expect(res.status).toBe(201);
    expect(res.body.course.slug).toBe("instructor-course");
  });

  it("forbids a student from creating a course", async () => {
    await request(app).post("/api/auth/register").send({
      email: "jest-student2@example.com",
      password: "Password123!",
      firstName: "Jest",
      lastName: "Student2",
    });
    const token = await loginAs("jest-student2@example.com", "Password123!");

    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Student Course", slug: "student-course", durationWeeks: 4 });

    expect(res.status).toBe(403);
  });

  it("allows a student to enroll once, and rejects a second enrollment", async () => {
    const course = await Course.create({
      title: "Enroll Course",
      slug: "enroll-course",
      durationWeeks: 4,
      status: "published",
    });

    await request(app).post("/api/auth/register").send({
      email: "jest-student3@example.com",
      password: "Password123!",
      firstName: "Jest",
      lastName: "Student3",
    });
    const token = await loginAs("jest-student3@example.com", "Password123!");

    const firstEnroll = await request(app)
      .post(`/api/courses/${course.id}/enroll`)
      .set("Authorization", `Bearer ${token}`);
    expect(firstEnroll.status).toBe(201);

    const secondEnroll = await request(app)
      .post(`/api/courses/${course.id}/enroll`)
      .set("Authorization", `Bearer ${token}`);
    expect(secondEnroll.status).toBe(409);
  });
});
