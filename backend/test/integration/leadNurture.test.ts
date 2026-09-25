import bcrypt from "bcryptjs";
import { Course, Enrollment, Lead, sequelize, User } from "../../src/models";
import { sendPendingFollowUpEmails, sendPendingWelcomeEmails } from "../../src/services/leadNurture.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";
import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

const memAdapter = emailAdapter as MemoryEmailAdapter;

async function createLead(
  overrides: Partial<{ name: string; email: string; course: string; sector: string | null }> = {},
) {
  return Lead.create({
    name: "Amara Chukwu",
    email: "amara.chukwu@example.com",
    course: "GIS and Drone Mapping",
    ...overrides,
  });
}

// createdAt is managed by Sequelize, so backdate it with SQL to simulate an older lead.
async function ageLead(lead: Lead, days: number, welcomed = true) {
  await sequelize.query(
    `UPDATE leads SET created_at = NOW() - (:days || ' days')::interval,
       welcome_email_sent_at = CASE WHEN :welcomed THEN NOW() - (:days || ' days')::interval ELSE NULL END
     WHERE id = :id`,
    { replacements: { days: String(days), welcomed, id: lead.id } },
  );
  return (await Lead.findByPk(lead.id)) as Lead;
}

describe("Lead nurture", () => {
  describe("welcome email", () => {
    it("sends a Career Match lead their matched course, with the free lesson, course page and enrol links", async () => {
      const lead = await createLead({ sector: "Oil & Gas" });

      const result = await sendPendingWelcomeEmails();

      expect(result.sent).toBe(1);
      const msg = memAdapter.sentMessages[0];
      expect(msg.to).toBe(lead.email);
      expect(msg.subject).toBe("Your Career Match: GIS and Drone Mapping");
      expect(msg.text).toContain("Hi Amara,");
      expect(msg.text).toContain("/preview/gis-and-drone-mapping");
      expect(msg.text).toContain("/gis-and-drone-mapping-course");
      expect(msg.text).toContain("/register?course=gis-and-drone-mapping");
      expect(msg.text).toContain("₦200,000");
      expect(msg.text).toContain("self-paced, with lifetime access");
      expect(msg.text).not.toMatch(/deadline|closes|intake|spaces are limited/i);
      expect((await Lead.findByPk(lead.id))?.welcomeEmailSentAt).toBeInstanceOf(Date);
    });

    it("words the welcome as plain interest for leads that didn't come through the Career Match", async () => {
      await createLead({ course: "HSE Fundamentals" });
      await sendPendingWelcomeEmails();
      expect(memAdapter.sentMessages[0].subject).toBe("Welcome to Paleon Training — HSE Fundamentals");
      expect(memAdapter.sentMessages[0].text).toContain("/preview/hse-fundamentals");
    });

    it("points leads without a known course at the Career Match", async () => {
      await createLead({ course: "Not sure yet" });
      await sendPendingWelcomeEmails();
      expect(memAdapter.sentMessages[0].text).toContain("/welcome#career-match");
    });

    it("does not resend a welcome email once it's already been sent", async () => {
      await createLead();
      await sendPendingWelcomeEmails();
      memAdapter.clear();

      const result = await sendPendingWelcomeEmails();

      expect(result.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });
  });

  describe("follow-up emails", () => {
    it("sends nothing before day 2", async () => {
      await ageLead(await createLead(), 1);
      expect((await sendPendingFollowUpEmails()).sent).toBe(0);
    });

    it("sends the day-2 free-lesson follow-up once, with the course highlights", async () => {
      const lead = await ageLead(await createLead(), 2);

      expect((await sendPendingFollowUpEmails()).sent).toBe(1);
      const msg = memAdapter.sentMessages[0];
      expect(msg.subject).toBe("Have you tried the free GIS and Drone Mapping lesson?");
      expect(msg.text).toContain("/preview/gis-and-drone-mapping");
      expect(msg.text).toContain("photogrammetry");

      memAdapter.clear();
      expect((await sendPendingFollowUpEmails()).sent).toBe(0);
      expect((await Lead.findByPk(lead.id))?.followUp1SentAt).toBeInstanceOf(Date);
    });

    it("sends the day-5 'how it works' and day-10 last emails as separate touches", async () => {
      const lead = await ageLead(await createLead({ course: "Cyber Security Fundamentals" }), 5);
      await sendPendingFollowUpEmails();
      expect(memAdapter.sentMessages).toHaveLength(1);
      expect(memAdapter.sentMessages[0].subject).toBe("How Cyber Security Fundamentals works");
      expect(memAdapter.sentMessages[0].text).toContain("keep access for life");

      memAdapter.clear();
      await ageLead(lead, 10);
      await sendPendingFollowUpEmails();
      expect(memAdapter.sentMessages).toHaveLength(1);
      expect(memAdapter.sentMessages[0].subject).toBe("Still thinking about Cyber Security Fundamentals?");
    });

    it("never sends a follow-up late: old leads are skipped and stamped", async () => {
      const lead = await ageLead(await createLead(), 40);

      expect((await sendPendingFollowUpEmails()).sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.followUp1SentAt).toBeInstanceOf(Date);
      expect(reloaded?.followUp3SentAt).toBeInstanceOf(Date);
    });

    it("sends only the latest due step when an earlier one was missed", async () => {
      const lead = await ageLead(await createLead(), 6);
      await sendPendingFollowUpEmails();
      expect(memAdapter.sentMessages.map((m) => m.subject)).toEqual(["How GIS and Drone Mapping works"]);
      expect((await Lead.findByPk(lead.id))?.followUp1SentAt).toBeInstanceOf(Date);
    });

    it("waits until the welcome email has gone out", async () => {
      await ageLead(await createLead(), 2, false);
      expect((await sendPendingFollowUpEmails()).sent).toBe(0);
    });

    it("sends no follow-ups to leads without a known course", async () => {
      await ageLead(await createLead({ course: "Not sure yet" }), 2);
      expect((await sendPendingFollowUpEmails()).sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("skips a lead whose email belongs to a user with a confirmed payment", async () => {
      const instructor = await User.create({
        email: "jest-instructor@example.com",
        passwordHash: await bcrypt.hash("Password123!", 4),
        firstName: "Jest",
        lastName: "Instructor",
        role: "instructor",
      });
      const course = await Course.create({
        title: "GIS and Drone Mapping",
        slug: "gis-and-drone-mapping",
        durationWeeks: 9,
        status: "published",
        instructorId: instructor.id,
      });
      const student = await User.create({
        email: "amara.chukwu@example.com",
        passwordHash: await bcrypt.hash("Password123!", 4),
        firstName: "Amara",
        lastName: "Chukwu",
        role: "student",
      });
      await Enrollment.create({
        courseId: course.id,
        studentId: student.id,
        paymentConfirmed: true,
        paymentConfirmedAt: new Date(),
      });
      await ageLead(await createLead(), 2);

      expect((await sendPendingFollowUpEmails()).sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });
  });

  describe("unsubscribe", () => {
    function unsubscribeLink(text: string): string {
      const m = text.match(/https?:\/\/\S+\/api\/leads\/unsubscribe\?id=[^&\s]+&t=[A-Za-z0-9_-]+/);
      if (!m) throw new Error("no unsubscribe link in email");
      return m[0];
    }

    it("puts a signed unsubscribe link (no email address in it) and List-Unsubscribe headers on every lead email", async () => {
      const lead = await createLead({ sector: "Banking", course: "Cyber Security Fundamentals" });
      await sendPendingWelcomeEmails();
      const msg = memAdapter.sentMessages[0];
      const link = unsubscribeLink(msg.text);
      expect(link).toContain(`id=${lead.id}`);
      expect(link).not.toContain("amara");
      expect(msg.headers?.["List-Unsubscribe"]).toBe(`<${link}>`);
      expect(msg.headers?.["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");

      memAdapter.clear();
      await ageLead(lead, 2);
      await sendPendingFollowUpEmails();
      expect(unsubscribeLink(memAdapter.sentMessages[0].text)).toBe(link);
    });

    it("unsubscribes every record for that address via the link, and stops all further emails", async () => {
      const first = await createLead();
      const second = await createLead({ email: "AMARA.CHUKWU@example.com", course: "HSE Fundamentals" });
      await sendPendingWelcomeEmails();
      const link = unsubscribeLink(memAdapter.sentMessages[0].text);
      memAdapter.clear();

      const res = await request(app).get(new URL(link).pathname + new URL(link).search);
      expect(res.status).toBe(200);
      expect(res.text).toContain("You're unsubscribed");
      expect((await Lead.findByPk(first.id))?.unsubscribedAt).toBeInstanceOf(Date);
      expect((await Lead.findByPk(second.id))?.unsubscribedAt).toBeInstanceOf(Date);

      await ageLead(first, 2);
      await ageLead(second, 2);
      expect((await sendPendingFollowUpEmails()).sent).toBe(0);

      // A later form submission from the same address gets no emails either.
      await createLead({ course: "Digital Marketing" });
      expect((await sendPendingWelcomeEmails()).sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("supports mail apps' one-click POST, and rejects a tampered link", async () => {
      const lead = await createLead();
      await sendPendingWelcomeEmails();
      const url = new URL(unsubscribeLink(memAdapter.sentMessages[0].text));

      const bad = await request(app).get(`/api/leads/unsubscribe?id=${lead.id}&t=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`);
      expect(bad.status).toBe(400);
      expect((await Lead.findByPk(lead.id))?.unsubscribedAt).toBeNull();

      const oneClick = await request(app).post(url.pathname + url.search).send("List-Unsubscribe=One-Click");
      expect(oneClick.status).toBe(200);
      expect((await Lead.findByPk(lead.id))?.unsubscribedAt).toBeInstanceOf(Date);
    });
  });
});
