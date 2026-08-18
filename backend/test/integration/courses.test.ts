import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, User } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

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

async function createAdmin() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({
    email: "jest-admin@example.com",
    passwordHash,
    firstName: "Jest",
    lastName: "Admin",
    role: "admin",
  });
}

async function loginAs(email: string, password: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

describe("Courses", () => {
  it("rejects an anonymous request to list courses", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.status).toBe(401);
  });

  it("lets a student list courses, but only published ones (drafts stay instructor/admin-only)", async () => {
    await request(app).post("/api/auth/register").send({
      email: "jest-student-course-list@example.com",
      password: "Password123!",
      firstName: "Jest",
      lastName: "Student",
    });
    const token = await loginAs("jest-student-course-list@example.com", "Password123!");

    await Course.create({
      title: "Published Course",
      slug: "published-course-for-students",
      durationWeeks: 4,
      status: "published",
    });
    await Course.create({
      title: "Draft Course",
      slug: "draft-course-hidden-from-students",
      durationWeeks: 4,
      status: "draft",
    });

    const res = await request(app).get("/api/courses").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    const slugs = res.body.courses.map((c: { slug: string }) => c.slug);
    expect(slugs).toContain("published-course-for-students");
    expect(slugs).not.toContain("draft-course-hidden-from-students");
  });

  it("lists all courses for an admin", async () => {
    await createAdmin();
    const token = await loginAs("jest-admin@example.com", "Password123!");

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

    const res = await request(app).get("/api/courses").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    const slugs = res.body.courses.map((c: { slug: string }) => c.slug);
    expect(slugs).toContain("published-course");
    expect(slugs).toContain("draft-course");
  });

  it("rejects an anonymous request to get a course by slug", async () => {
    await Course.create({
      title: "Findable Course",
      slug: "findable-course",
      durationWeeks: 4,
      status: "published",
    });

    const res = await request(app).get("/api/courses/findable-course");

    expect(res.status).toBe(401);
  });

  it("gets a course by slug for an authenticated user", async () => {
    await Course.create({
      title: "Findable Course",
      slug: "findable-course",
      durationWeeks: 4,
      status: "published",
    });

    await request(app).post("/api/auth/register").send({
      email: "jest-student1@example.com",
      password: "Password123!",
      firstName: "Jest",
      lastName: "Student1",
    });
    const token = await loginAs("jest-student1@example.com", "Password123!");

    const res = await request(app)
      .get("/api/courses/findable-course")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.course.title).toBe("Findable Course");
  });

  it("returns 404 for an unknown course", async () => {
    await request(app).post("/api/auth/register").send({
      email: "jest-student4@example.com",
      password: "Password123!",
      firstName: "Jest",
      lastName: "Student4",
    });
    const token = await loginAs("jest-student4@example.com", "Password123!");

    const res = await request(app)
      .get("/api/courses/does-not-exist")
      .set("Authorization", `Bearer ${token}`);
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
    await User.update(
      { emailVerifiedAt: new Date() },
      { where: { email: "jest-student3@example.com" } },
    );
    const token = await loginAs("jest-student3@example.com", "Password123!");

    memAdapter.clear();
    const firstEnroll = await request(app)
      .post(`/api/courses/${course.id}/enroll`)
      .set("Authorization", `Bearer ${token}`);
    expect(firstEnroll.status).toBe(201);

    const enrollEmail = memAdapter.sentMessages.find((m) => m.to === "jest-student3@example.com");
    expect(enrollEmail).toBeDefined();
    expect(enrollEmail!.text).toContain(course.title);

    const secondEnroll = await request(app)
      .post(`/api/courses/${course.id}/enroll`)
      .set("Authorization", `Bearer ${token}`);
    expect(secondEnroll.status).toBe(409);
  });

  it("rejects self-service enrollment from a student who hasn't verified their email", async () => {
    const course = await Course.create({
      title: "Unverified Enroll Course",
      slug: "unverified-enroll-course",
      durationWeeks: 4,
      status: "published",
    });

    await request(app).post("/api/auth/register").send({
      email: "jest-student-unverified@example.com",
      password: "Password123!",
      firstName: "Jest",
      lastName: "Unverified",
    });
    const token = await loginAs("jest-student-unverified@example.com", "Password123!");

    const res = await request(app)
      .post(`/api/courses/${course.id}/enroll`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  });
});
