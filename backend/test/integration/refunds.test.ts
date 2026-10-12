import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  Assignment,
  AssignmentSubmission,
  Course,
  CourseModule,
  Enrollment,
  Lesson,
  ProgressTracking,
  Referral,
  User,
} from "../../src/models";

// Cooling-off refunds (2026-10-12): full refund within 7 days of payment if Day 2 isn't
// started and the person has never had a refund; recording one locks the course.

const app = createApp();
const DAY = 24 * 60 * 60 * 1000;

async function makeUser(email: string, role: "student" | "instructor" | "admin", firstName = "Ada", lastName = "Obi") {
  return User.create({
    email,
    passwordHash: await bcrypt.hash("Password123!", 4),
    firstName,
    lastName,
    role,
    emailVerifiedAt: new Date(),
  });
}

async function loginAs(email: string) {
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

async function setup() {
  const instructor = await makeUser("rf-instructor@example.com", "instructor");
  const course = await Course.create({
    title: "HSE Fundamentals",
    slug: "hse-fundamentals",
    durationWeeks: 8,
    status: "published",
    instructorId: instructor.id,
  });
  const days = [];
  for (let n = 1; n <= 3; n++) {
    const day = await CourseModule.create({ courseId: course.id, title: `Day ${n}`, weekNumber: n });
    const lesson = await Lesson.create({ moduleId: day.id, title: `Day ${n} Lesson 1`, order: 1 });
    const assignment = await Assignment.create({ moduleId: day.id, title: `Day ${n} task`, pointsTotal: 10 });
    days.push({ day, lesson, assignment });
  }
  const student = await makeUser("rf-student@example.com", "student");
  await makeUser("rf-admin@example.com", "admin");
  const adminToken = await loginAs("rf-admin@example.com");
  return { course, days, student, adminToken };
}

async function refundStatusFor(adminToken: string, enrollmentId: string) {
  const res = await request(app).get("/api/admin/candidates").set("Authorization", `Bearer ${adminToken}`);
  for (const c of res.body.candidates ?? res.body) {
    const e = c.enrollments.find((x: { id: string }) => x.id === enrollmentId);
    if (e) return e.refund;
  }
  throw new Error("enrollment not in candidate list");
}

function refund(adminToken: string, enrollmentId: string, body: Record<string, unknown> = {}) {
  return request(app)
    .post(`/api/admin/enrollments/${enrollmentId}/refund`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send(body);
}

describe("Cooling-off refunds", () => {
  it("shows an unpaid enrolment as unpaid and won't refund it", async () => {
    const { course, student, adminToken } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id });
    expect((await refundStatusFor(adminToken, enrollment.id)).state).toBe("unpaid");
    expect((await refund(adminToken, enrollment.id)).status).toBe(400);
  });

  it("a fresh deposit is eligible for 7 days; refunding locks the course and records it", async () => {
    const { course, days, student, adminToken } = await setup();
    const paidAt = new Date(Date.now() - DAY);
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id, depositPaidAt: paidAt });
    // Day 1 work doesn't affect eligibility.
    await ProgressTracking.create({ studentId: student.id, lessonId: days[0].lesson.id });
    await AssignmentSubmission.create({ studentId: student.id, assignmentId: days[0].assignment.id });

    const status = await refundStatusFor(adminToken, enrollment.id);
    expect(status.state).toBe("eligible");
    expect(new Date(status.eligibleUntil).getTime()).toBe(paidAt.getTime() + 7 * DAY);

    const res = await refund(adminToken, enrollment.id, { note: "Paystack refund 12 Oct" });
    expect(res.status).toBe(200);
    expect(res.body.refund.state).toBe("refunded");
    await enrollment.reload();
    expect(enrollment.depositPaidAt).toBeNull();
    expect(enrollment.paymentConfirmed).toBe(false);
    expect(enrollment.refundedAt).not.toBeNull();
    expect(enrollment.refundNote).toBe("Paystack refund 12 Oct");

    const token = await loginAs(student.email);
    const lesson2 = await request(app).get(`/api/lessons/${days[1].lesson.id}`).set("Authorization", `Bearer ${token}`);
    expect(lesson2.status).toBe(403);
  });

  it("is not eligible once Day 2 is started (a Day 2 lesson completed or task submitted)", async () => {
    const { course, days, student, adminToken } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id, depositPaidAt: new Date() });
    await AssignmentSubmission.create({ studentId: student.id, assignmentId: days[1].assignment.id });
    const status = await refundStatusFor(adminToken, enrollment.id);
    expect(status).toMatchObject({ state: "not_eligible", reason: "Started Day 2" });

    const res = await refund(adminToken, enrollment.id);
    expect(res.status).toBe(409);
    expect(res.body.error.details.code).toBe("REFUND_NOT_ELIGIBLE");
    // An admin can still refund at their discretion.
    expect((await refund(adminToken, enrollment.id, { override: true })).status).toBe(200);
  });

  it("is not eligible after 7 days", async () => {
    const { course, student, adminToken } = await setup();
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: true,
      paymentConfirmedAt: new Date(Date.now() - 8 * DAY),
    });
    const status = await refundStatusFor(adminToken, enrollment.id);
    expect(status.state).toBe("not_eligible");
    expect(status.reason).toMatch(/^7-day window ended/);
  });

  it("handles an older paid enrolment with no confirmation date (falls back to the enrolment date)", async () => {
    const { course, student, adminToken } = await setup();
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: true,
      enrolledDate: new Date(Date.now() - 30 * DAY),
    });
    const status = await refundStatusFor(adminToken, enrollment.id);
    expect(status.state).toBe("not_eligible");
    expect(status.reason).toMatch(/^7-day window ended/);
  });

  it("allows only one refund per person, and flags a same-name account that had one", async () => {
    const { course, student, adminToken } = await setup();
    const first = await Enrollment.create({ courseId: course.id, studentId: student.id, depositPaidAt: new Date() });
    expect((await refund(adminToken, first.id)).status).toBe(200);

    // Paying again on the same account isn't refundable.
    await first.update({ depositPaidAt: new Date() });
    expect(await refundStatusFor(adminToken, first.id)).toMatchObject({
      state: "not_eligible",
      reason: "Already had a refund",
    });

    // A new account with the same name is flagged for the admin.
    const twin = await makeUser("rf-twin@example.com", "student", " ada", "OBI ");
    const twinEnrollment = await Enrollment.create({ courseId: course.id, studentId: twin.id, depositPaidAt: new Date() });
    const status = await refundStatusFor(adminToken, twinEnrollment.id);
    expect(status.state).toBe("eligible");
    expect(status.possiblePriorRefund).toBe("rf-student@example.com");
  });

  it("voids an unpaid referral reward for the refunded course", async () => {
    const { course, student, adminToken } = await setup();
    const referrer = await makeUser("rf-referrer@example.com", "student", "Ben", "Eze");
    const enrollment = await Enrollment.create({
      courseId: course.id,
      studentId: student.id,
      paymentConfirmed: true,
      paymentConfirmedAt: new Date(),
    });
    const referral = await Referral.create({
      referrerId: referrer.id,
      refereeId: student.id,
      code: "PLNTEST1",
      status: "qualified",
      qualifiedAt: new Date(),
      qualifyingEnrollmentId: enrollment.id,
    });
    const res = await refund(adminToken, enrollment.id);
    expect(res.body.referralVoided).toBe(true);
    await referral.reload();
    expect(referral.status).toBe("void");
  });

  it("is admin-only", async () => {
    const { course, student } = await setup();
    const enrollment = await Enrollment.create({ courseId: course.id, studentId: student.id, depositPaidAt: new Date() });
    const token = await loginAs(student.email);
    const res = await request(app)
      .post(`/api/admin/enrollments/${enrollment.id}/refund`)
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(403);
  });
});
