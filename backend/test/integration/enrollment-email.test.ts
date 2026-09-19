import request from "supertest";
import { createApp } from "../../src/app";
import { Course, Enrollment } from "../../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

const COURSE_TITLES = [
  "HSE Fundamentals",
  "Cyber Security Fundamentals",
  "GIS and Drone Mapping",
  "Social Media Management & Content",
  // Not a real course: proves a future title with HTML-significant characters is escaped.
  "Brand New <Future> Course",
];

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

describe("Enrollment confirmation email (verify email -> enrol)", () => {
  it.each(COURSE_TITLES.map((title, i) => [title, i]))(
    "sends the new welcome message, exactly once, for %s",
    async (title, i) => {
      const course = await Course.create({
        title,
        slug: `enrollemail-course-${i}-${Date.now()}`,
        durationWeeks: 4,
        status: "published",
      });
      const email = `jest-enrollemail-${i}@example.com`;

      // 1. Register -> exactly one verification email.
      memAdapter.clear();
      await request(app)
        .post("/api/auth/register")
        .send({ email, password: "Password123!", firstName: "Ada", lastName: "Student" });
      const verifyMessages = memAdapter.sentMessages.filter(
        (m) => m.to === email && m.subject.includes("Verify"),
      );
      expect(verifyMessages).toHaveLength(1);
      const token = verifyMessages[0].text.match(/\/verify-email\?token=(\S+)/)![1];

      // 2. Enrolment is refused until the email is verified, and sends nothing.
      const loginRes = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
      const accessToken = loginRes.body.accessToken as string;
      const refused = await request(app)
        .post(`/api/courses/${course.id}/enroll`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(refused.status).toBe(403);
      expect(memAdapter.sentMessages.filter((m) => m.subject.includes("enrolled"))).toHaveLength(0);

      // 3. Verify, then enrol.
      const verified = await request(app).post("/api/auth/verify-email").send({ token });
      expect(verified.status).toBe(200);

      memAdapter.clear();
      const enrolled = await request(app)
        .post(`/api/courses/${course.id}/enroll`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(enrolled.status).toBe(201);

      // 4. Exactly one email, with the new copy and this course's name.
      await new Promise((r) => setTimeout(r, 100)); // send is fire-and-forget
      const sent = memAdapter.sentMessages.filter((m) => m.to === email);
      expect(sent).toHaveLength(1);
      const msg = sent[0];

      expect(msg.subject).toBe(`You're enrolled in ${title}`);
      expect(msg.text).toContain(`You are now officially enrolled in ${title} 🎓`);
      expect(msg.html).toContain(`<strong>${escapeHtml(title)}</strong> 🎓`);
      expect(msg.html).not.toContain("<Future>");
      for (const body of [msg.text, msg.html!]) {
        expect(body).toContain(
          "You can begin working through the course modules immediately, subject to payment for the course.",
        );
        expect(body).toContain("Keep learning. Keep building. Keep moving forward.");
        expect(body).toContain("We’re delighted to have you with us at");
        expect(body).toContain("Paleon Training");
        expect(body).not.toContain("You're now enrolled in");
        expect(body).not.toContain("right away");
      }
      expect(msg.html).toContain("<strong>Your learning journey starts now.");
      expect((msg.html!.match(/<p /g) ?? []).length).toBe(6); // brand + greeting + 4 paragraphs

      // 5. Payment is untouched: enrolment is still unpaid.
      const enrollment = await Enrollment.findOne({ where: { courseId: course.id } });
      expect(enrollment!.paymentConfirmed).toBe(false);
    },
  );
});
