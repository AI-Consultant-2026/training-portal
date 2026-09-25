import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, CourseFeedback, Enrollment, User } from "../../src/models";

const app = createApp();

async function makeUser(email: string, role: "student" | "admin" | "instructor", first = "Chidi", last = "Okafor") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName: first,
    lastName: last,
    role,
    emailVerifiedAt: new Date(),
  });
}

async function tokenFor(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setup(status: "active" | "completed" = "completed") {
  const instructor = await makeUser("fb-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "GIS and Drone Mapping",
    slug: "gis-and-drone-mapping",
    durationWeeks: 9,
    status: "published",
    instructorId: instructor.id,
  });
  const student = await makeUser("fb-student@example.com", "student");
  await makeUser("fb-admin@example.com", "admin", "Jest", "Admin");
  const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id, paymentConfirmed: true, status });
  return {
    course,
    enrollment,
    studentToken: await tokenFor("fb-student@example.com"),
    adminToken: await tokenFor("fb-admin@example.com"),
  };
}

const good = {
  rating: 5,
  comment: "The drone mapping days were brilliant and my capstone is now in my portfolio.",
  consentQuote: true,
  consentCapstone: true,
};

describe("Course feedback and learner testimonials", () => {
  it("only accepts feedback once the course is completed", async () => {
    const { enrollment, studentToken } = await setup("active");
    const res = await request(app)
      .put(`/api/enrollments/${enrollment.id}/feedback`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send(good);
    expect(res.status).toBe(403);
  });

  it("publishes nothing until an admin approves, then shows first name + last initial only", async () => {
    const { enrollment, studentToken, adminToken } = await setup();
    const saved = await request(app)
      .put(`/api/enrollments/${enrollment.id}/feedback`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send(good);
    expect(saved.status).toBe(201);
    expect((await request(app).get("/api/testimonials")).body.testimonials).toEqual([]);

    const list = await request(app).get("/api/admin/feedback").set("Authorization", `Bearer ${adminToken}`);
    expect(list.body.feedback[0]).toMatchObject({ studentName: "Chidi Okafor", rating: 5, approved: false });
    const studentBlocked = await request(app).get("/api/admin/feedback").set("Authorization", `Bearer ${studentToken}`);
    expect(studentBlocked.status).toBe(403);

    await request(app)
      .patch(`/api/admin/feedback/${list.body.feedback[0].id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ approved: true });
    const pub = await request(app).get("/api/testimonials?course=gis-and-drone-mapping");
    expect(pub.body.testimonials).toEqual([
      { name: "Chidi O.", courseTitle: "GIS and Drone Mapping", courseSlug: "gis-and-drone-mapping", rating: 5, comment: good.comment },
    ]);
    expect(JSON.stringify(pub.body)).not.toContain("fb-student@example.com");
    expect((await request(app).get("/api/testimonials?course=hse-fundamentals")).body.testimonials).toEqual([]);

    // Editing puts it back into review.
    await request(app)
      .put(`/api/enrollments/${enrollment.id}/feedback`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ ...good, comment: "Updated: still brilliant, and I use QGIS every week now." });
    expect((await request(app).get("/api/testimonials")).body.testimonials).toEqual([]);
  });

  it("refuses to publish feedback from a student who didn't agree to be quoted", async () => {
    const { enrollment, studentToken, adminToken } = await setup();
    await request(app)
      .put(`/api/enrollments/${enrollment.id}/feedback`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ ...good, consentQuote: false });
    const fb = (await CourseFeedback.findOne({ where: { enrollmentId: enrollment.id } }))!;
    const res = await request(app)
      .patch(`/api/admin/feedback/${fb.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ approved: true });
    expect(res.status).toBe(400);
  });

  it("the course pages and homepage load the widget, with the section hidden by default", async () => {
    for (const page of ["/welcome", "/gis-and-drone-mapping-course"]) {
      const res = await request(app).get(page);
      expect(res.text).toMatch(/data-learner-voices[^>]* hidden/);
      expect(res.text).toContain('<script src="/learner-voices.js" defer></script>');
    }
    const js = await request(app).get("/learner-voices.js");
    expect(js.status).toBe(200);
    expect(js.text).toContain("textContent");
  });
});
