import bcrypt from "bcryptjs";
import { config } from "../../src/config";
import { Course, Enrollment, Lead, User } from "../../src/models";
import {
  sendPendingRecycleEmails,
  sendPendingReminderEmails,
  sendPendingWelcomeEmails,
} from "../../src/services/leadNurture.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const memAdapter = emailAdapter as MemoryEmailAdapter;

function daysFromNow(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

async function createLead(overrides: Partial<{ name: string; email: string; course: string }> = {}) {
  return Lead.create({
    name: "Amara Chukwu",
    email: "amara.chukwu@example.com",
    course: "GIS and Drone Mapping",
    ...overrides,
  });
}

describe("Lead nurture", () => {
  const originalDeadline = config.enrolment.nextDeadline;
  const originalFollowingDeadline = config.enrolment.followingDeadline;

  afterEach(() => {
    config.enrolment.nextDeadline = originalDeadline;
    config.enrolment.followingDeadline = originalFollowingDeadline;
  });

  describe("sendPendingWelcomeEmails", () => {
    it("sends a welcome email to a new lead and stamps it as sent", async () => {
      const lead = await createLead();

      const result = await sendPendingWelcomeEmails();

      expect(result.sent).toBe(1);
      expect(memAdapter.sentMessages).toHaveLength(1);
      expect(memAdapter.sentMessages[0]).toMatchObject({
        to: lead.email,
        subject: expect.stringContaining(lead.course),
      });

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.welcomeEmailSentAt).toBeInstanceOf(Date);
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

  describe("sendPendingReminderEmails", () => {
    it("does not send a reminder before the 21-day threshold is reached", async () => {
      await createLead();
      config.enrolment.nextDeadline = daysFromNow(25);

      const result = await sendPendingReminderEmails();

      expect(result.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("sends the 21-day reminder once within 21 days of the deadline, and doesn't resend it same-day", async () => {
      const lead = await createLead();
      config.enrolment.nextDeadline = daysFromNow(20);

      const result = await sendPendingReminderEmails();

      expect(result.sent).toBe(1);
      expect(memAdapter.sentMessages[0]).toMatchObject({
        to: lead.email,
        subject: "3 weeks left to register",
      });

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.reminder21dSentAt).toBeInstanceOf(Date);

      memAdapter.clear();
      const second = await sendPendingReminderEmails();
      expect(second.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("sends the 14-day value-add reminder once within 14 days but before the 7-day mark", async () => {
      const lead = await createLead();
      config.enrolment.nextDeadline = daysFromNow(20);
      await sendPendingReminderEmails(); // sends the 21d stage first
      memAdapter.clear();

      config.enrolment.nextDeadline = daysFromNow(12);
      const result = await sendPendingReminderEmails();

      expect(result.sent).toBe(1);
      expect(memAdapter.sentMessages[0].subject).toContain(lead.course);

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.reminder14dSentAt).toBeInstanceOf(Date);
    });

    it("sends only the most urgent stage when multiple thresholds are crossed at once, and backfills the others", async () => {
      const lead = await createLead();
      config.enrolment.nextDeadline = daysFromNow(0);

      const result = await sendPendingReminderEmails();

      expect(result.sent).toBe(1);
      expect(memAdapter.sentMessages).toHaveLength(1);
      expect(memAdapter.sentMessages[0].subject).toBe("Today's the last day to register");

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.reminder21dSentAt).toBeInstanceOf(Date);
      expect(reloaded?.reminder14dSentAt).toBeInstanceOf(Date);
      expect(reloaded?.reminder7dSentAt).toBeInstanceOf(Date);
      expect(reloaded?.reminder1dSentAt).toBeInstanceOf(Date);
      expect(reloaded?.reminder0dSentAt).toBeInstanceOf(Date);
    });

    it("sends the day-before and day-of reminders as two distinct touches when reached on separate days", async () => {
      const lead = await createLead();
      config.enrolment.nextDeadline = daysFromNow(1);

      const first = await sendPendingReminderEmails();
      expect(first.sent).toBe(1);
      expect(memAdapter.sentMessages[0].subject).toBe("Last call — registration closes tomorrow");
      memAdapter.clear();

      config.enrolment.nextDeadline = daysFromNow(0);
      const second = await sendPendingReminderEmails();
      expect(second.sent).toBe(1);
      expect(memAdapter.sentMessages[0].subject).toBe("Today's the last day to register");

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.reminder1dSentAt).toBeInstanceOf(Date);
      expect(reloaded?.reminder0dSentAt).toBeInstanceOf(Date);
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
        title: "Cyber Security Fundamentals",
        slug: "cyber-security-fundamentals",
        durationWeeks: 12,
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
      const lead = await createLead({ email: "amara.chukwu@example.com" });
      config.enrolment.nextDeadline = daysFromNow(20);

      const result = await sendPendingReminderEmails();

      expect(result.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.reminder21dSentAt).toBeNull();
    });

    it("does not send reminders once the deadline has passed", async () => {
      await createLead();
      config.enrolment.nextDeadline = daysFromNow(-1);

      const result = await sendPendingReminderEmails();

      expect(result.sent).toBe(0);
    });
  });

  describe("sendPendingRecycleEmails", () => {
    it("does nothing while the current deadline hasn't passed yet, even with a following deadline set", async () => {
      await createLead();
      config.enrolment.nextDeadline = daysFromNow(5);
      config.enrolment.followingDeadline = daysFromNow(90);

      const result = await sendPendingRecycleEmails();

      expect(result.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("does nothing once the deadline has passed if no following deadline is configured", async () => {
      await createLead();
      config.enrolment.nextDeadline = daysFromNow(-2);
      config.enrolment.followingDeadline = "";

      const result = await sendPendingRecycleEmails();

      expect(result.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("invites a non-converted lead to the next cohort once the deadline has passed, and doesn't resend it", async () => {
      const lead = await createLead();
      config.enrolment.nextDeadline = daysFromNow(-2);
      config.enrolment.followingDeadline = daysFromNow(90);

      const result = await sendPendingRecycleEmails();

      expect(result.sent).toBe(1);
      expect(memAdapter.sentMessages[0]).toMatchObject({
        to: lead.email,
        subject: expect.stringContaining("next Paleon Training intake"),
      });

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.recycleEmailSentAt).toBeInstanceOf(Date);

      memAdapter.clear();
      const second = await sendPendingRecycleEmails();
      expect(second.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);
    });

    it("does not recycle a lead who converted before the deadline passed", async () => {
      const instructor = await User.create({
        email: "jest-instructor2@example.com",
        passwordHash: await bcrypt.hash("Password123!", 4),
        firstName: "Jest",
        lastName: "Instructor",
        role: "instructor",
      });
      const course = await Course.create({
        title: "Digital Marketing",
        slug: "digital-marketing",
        durationWeeks: 8,
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
      const lead = await createLead({ email: "amara.chukwu@example.com" });
      config.enrolment.nextDeadline = daysFromNow(-2);
      config.enrolment.followingDeadline = daysFromNow(90);

      const result = await sendPendingRecycleEmails();

      expect(result.sent).toBe(0);
      expect(memAdapter.sentMessages).toHaveLength(0);

      const reloaded = await Lead.findByPk(lead.id);
      expect(reloaded?.recycleEmailSentAt).toBeInstanceOf(Date);
    });
  });
});
