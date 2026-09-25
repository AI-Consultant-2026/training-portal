import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Course, CourseModule, Enrollment, Lesson, User } from "../../src/models";
import { describeDevice } from "../../src/services/support.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

async function createInstructor() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({
    email: `preview-instructor-${Date.now()}@example.com`,
    passwordHash,
    firstName: "Jest",
    lastName: "Instructor",
    role: "instructor",
  });
}

async function registerAndLogin(email: string) {
  await request(app).post("/api/auth/register").send({
    email,
    password: "Password123!",
    firstName: "Ada",
    lastName: "Obi",
  });
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  const user = (await User.findOne({ where: { email } })) as User;
  memAdapter.clear(); // drop the welcome/verification emails registration sends
  return { token: res.body.accessToken as string, user };
}

// Two modules, created out of weekNumber order, with lessons created out of `order`
// order -- so "first lesson" must come from the ordering, not insertion order.
async function createCourse(slug: string, status: "draft" | "published" | "archived" = "published", metadata = {}) {
  const instructor = await createInstructor();
  const course = await Course.create({
    title: "Preview Course",
    slug,
    durationWeeks: 2,
    status,
    instructorId: instructor.id,
    metadata,
  });
  const day2 = await CourseModule.create({ courseId: course.id, title: "Day 2 module", weekNumber: 2 });
  const day1 = await CourseModule.create({ courseId: course.id, title: "Day 1 module", weekNumber: 1 });
  const secondLesson = await Lesson.create({ moduleId: day1.id, title: "Second lesson", order: 2, content: "Second" });
  const firstLesson = await Lesson.create({
    moduleId: day1.id,
    title: "First lesson",
    order: 1,
    content: "Hello **world**",
    videoUrl: "https://www.youtube.com/watch?v=abcdefghijk",
  });
  const day2Lesson = await Lesson.create({ moduleId: day2.id, title: "Day 2 lesson", order: 1, content: "Later" });
  return { course, firstLesson, secondLesson, day2Lesson };
}

describe("Free preview lesson", () => {
  it("lets an unpaid student open the course's first lesson, but nothing after it", async () => {
    const { firstLesson, secondLesson, day2Lesson } = await createCourse(`preview-gate-${Date.now()}`);
    const { token } = await registerAndLogin("preview-unpaid@example.com");

    const first = await request(app).get(`/api/lessons/${firstLesson.id}`).set("Authorization", `Bearer ${token}`);
    expect(first.status).toBe(200);
    expect(first.body.lesson.title).toBe("First lesson");

    for (const locked of [secondLesson, day2Lesson]) {
      const res = await request(app).get(`/api/lessons/${locked.id}`).set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(403);
    }
  });

  it("still gates later lessons for an enrolled-but-unpaid student, and opens them once paid", async () => {
    const { course, secondLesson } = await createCourse(`preview-paid-${Date.now()}`);
    const { token, user } = await registerAndLogin("preview-enrolled@example.com");
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: user.id, paymentConfirmed: false });

    const locked = await request(app).get(`/api/lessons/${secondLesson.id}`).set("Authorization", `Bearer ${token}`);
    expect(locked.status).toBe(403);

    await enrollment.update({ paymentConfirmed: true });
    const open = await request(app).get(`/api/lessons/${secondLesson.id}`).set("Authorization", `Bearer ${token}`);
    expect(open.status).toBe(200);
  });

  it("serves the first lesson publicly, with course summary and price, without a login", async () => {
    const { course } = await createCourse("cyber-security-fundamentals");
    const res = await request(app).get(`/api/courses/${course.slug}/preview`);
    expect(res.status).toBe(200);
    expect(res.body.course).toEqual({
      slug: "cyber-security-fundamentals",
      title: "Preview Course",
      dayCount: 2,
      lessonCount: 3,
      priceNgn: 200000,
    });
    expect(res.body.module).toEqual({ title: "Day 1 module", weekNumber: 1 });
    expect(res.body.lesson.title).toBe("First lesson");
    expect(res.body.lesson.content).toBe("Hello **world**");
    expect(res.body.lesson).not.toHaveProperty("id");
  });

  it("404s the public preview for draft, archived, admin-only and unknown courses", async () => {
    const draft = await createCourse(`preview-draft-${Date.now()}`, "draft");
    const archived = await createCourse(`preview-archived-${Date.now()}`, "archived");
    const adminOnly = await createCourse(`preview-admin-${Date.now()}`, "published", { adminOnly: true });
    for (const slug of [draft.course.slug, archived.course.slug, adminOnly.course.slug, "no-such-course"]) {
      const res = await request(app).get(`/api/courses/${slug}/preview`);
      expect(res.status).toBe(404);
    }
  });
});

describe("In-portal problem reports", () => {
  it("requires a login", async () => {
    const res = await request(app).post("/api/support/report").field("message", "The page will not load at all");
    expect(res.status).toBe(401);
  });

  it("emails support with the student's details filled in, reply-to set, and the screenshot attached", async () => {
    const { token } = await registerAndLogin("report-student@example.com");
    const res = await request(app)
      .post("/api/support/report")
      .set("Authorization", `Bearer ${token}`)
      .set(
        "User-Agent",
        "Mozilla/5.0 (Linux; Android 13; SM-A135F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36",
      )
      .field("message", "The Day 2 video shows a black screen.")
      .field("phone", "0802 735 1990")
      .field("pageUrl", "https://paleontraining.com/lessons/abc")
      .field("viewport", "390x844")
      .attach("screenshot", Buffer.from([0x89, 0x50, 0x4e, 0x47]), { filename: "shot.png", contentType: "image/png" });

    expect(res.status).toBe(201);
    expect(memAdapter.sentMessages).toHaveLength(1);
    const msg = memAdapter.sentMessages[0];
    expect(msg.to).toBe("support@paleontraining.com");
    expect(msg.replyTo).toBe("report-student@example.com");
    expect(msg.subject).toBe("Portal problem report: Ada Obi");
    expect(msg.text).toContain("Email: report-student@example.com");
    expect(msg.text).toContain("Phone / WhatsApp: 0802 735 1990");
    expect(msg.text).toContain("Device: Android 13 · Google Chrome");
    expect(msg.text).toContain("Page: https://paleontraining.com/lessons/abc");
    expect(msg.text).toContain("The Day 2 video shows a black screen.");
    expect(msg.attachments).toHaveLength(1);
    expect(msg.attachments![0]).toMatchObject({ filename: "shot.png", contentType: "image/png" });
  });

  it("accepts a report without a screenshot or phone, and rejects a too-short message or a non-image file", async () => {
    const { token } = await registerAndLogin("report-student-2@example.com");
    const ok = await request(app)
      .post("/api/support/report")
      .set("Authorization", `Bearer ${token}`)
      .field("message", "I cannot see my certificate button.");
    expect(ok.status).toBe(201);
    expect(memAdapter.sentMessages[0].attachments).toBeUndefined();
    expect(memAdapter.sentMessages[0].text).toContain("Phone / WhatsApp: (not given)");

    const short = await request(app)
      .post("/api/support/report")
      .set("Authorization", `Bearer ${token}`)
      .field("message", "help");
    expect(short.status).toBe(400);

    const pdf = await request(app)
      .post("/api/support/report")
      .set("Authorization", `Bearer ${token}`)
      .field("message", "Here is a document of the problem.")
      .attach("screenshot", Buffer.from("%PDF-1.4"), { filename: "x.pdf", contentType: "application/pdf" });
    expect(pdf.status).toBe(400);
  });
});

describe("describeDevice", () => {
  it("names common phones and browsers", () => {
    expect(
      describeDevice(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
      ),
    ).toBe("iPhone (iOS 17.5) · Safari");
    expect(
      describeDevice(
        "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 SamsungBrowser/25.0 Chrome/121 Mobile Safari/537.36",
      ),
    ).toBe("Android 12 · Samsung Internet");
    expect(describeDevice("")).toBe("Unknown device · Unknown browser");
  });
});
