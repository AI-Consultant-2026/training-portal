import { Op, fn, col, where as sqlWhere } from "sequelize";
import {
  Assignment,
  AssignmentSubmission,
  CourseModule,
  Enrollment,
  Lesson,
  Payment,
  ProgressTracking,
  Quiz,
  QuizAttempt,
  Referral,
  User,
} from "../models";
import { ApiError } from "../utils/ApiError";

// Cooling-off refunds (2026-10-12), matching terms.html section 5: a full refund (less a
// 5% administrative charge, since 2026-10-30) within REFUND_WINDOW_DAYS of the first payment (the deposit, for instalments), as long as the
// student hasn't started Day 2 -- completed a Day 2 lesson or submitted a Day 2 quiz or
// assignment -- and has never had a refund before. The money itself is refunded in the
// Paystack dashboard; recording it here locks the course and keeps the one-refund rule.

export const REFUND_WINDOW_DAYS = 7;

export type RefundState = "unpaid" | "eligible" | "not_eligible" | "refunded";

export interface RefundStatus {
  state: RefundState;
  /** For "eligible": the last moment a refund can be claimed. */
  eligibleUntil: string | null;
  /** For "not_eligible": why, in words for the admin. */
  reason: string | null;
  refundedAt: string | null;
  refundNote: string | null;
  /** Another account with the same name has had a refund (possible repeat claim). */
  possiblePriorRefund: string | null;
}

// When the 7 days start: the first payment (deposit or full). Older enrolments confirmed
// before paymentConfirmedAt was recorded fall back to their first successful payment,
// then to the enrolment date.
async function paidStart(enrollment: Enrollment): Promise<Date> {
  const dates = [enrollment.depositPaidAt, enrollment.paymentConfirmedAt].filter((d): d is Date => d != null);
  if (dates.length > 0) return new Date(Math.min(...dates.map((d) => new Date(d).getTime())));
  const firstPayment = await Payment.findOne({
    where: { enrollmentId: enrollment.id, status: "succeeded" },
    order: [["updatedAt", "ASC"]],
  });
  return new Date(firstPayment?.updatedAt ?? enrollment.enrolledDate);
}

function isPaid(enrollment: Enrollment): boolean {
  return enrollment.paymentConfirmed || enrollment.depositPaidAt !== null;
}

// Day 2 is the course's second day in the same order the deposit uses (weekNumber, then order).
async function hasStartedDay2(enrollment: Enrollment): Promise<boolean> {
  const modules = await CourseModule.findAll({
    where: { courseId: enrollment.courseId },
    order: [
      ["weekNumber", "ASC"],
      ["order", "ASC"],
    ],
    attributes: ["id"],
  });
  const day2 = modules[1];
  if (!day2) return false;
  const studentId = enrollment.studentId;

  const lessons = await Lesson.findAll({ where: { moduleId: day2.id }, attributes: ["id"] });
  if (lessons.length) {
    const done = await ProgressTracking.count({ where: { studentId, lessonId: lessons.map((l) => l.id) } });
    if (done > 0) return true;
  }
  const assignments = await Assignment.findAll({ where: { moduleId: day2.id }, attributes: ["id"] });
  if (assignments.length) {
    const submitted = await AssignmentSubmission.count({
      where: { studentId, assignmentId: assignments.map((a) => a.id) },
    });
    if (submitted > 0) return true;
  }
  const quizzes = await Quiz.findAll({ where: { moduleId: day2.id }, attributes: ["id"] });
  if (quizzes.length) {
    const attempts = await QuizAttempt.count({
      where: { studentId, quizId: quizzes.map((q) => q.id), status: { [Op.ne]: "in_progress" } },
    });
    if (attempts > 0) return true;
  }
  return false;
}

// Best-effort catch for "one refund per person" across accounts: another student account
// with the same first and last name that has a recorded refund.
async function findSameNameRefund(studentId: string): Promise<string | null> {
  const student = await User.findByPk(studentId);
  if (!student) return null;
  const others = await User.findAll({
    where: {
      id: { [Op.ne]: studentId },
      role: "student",
      [Op.and]: [
        sqlWhere(fn("lower", fn("trim", col("first_name"))), student.firstName.trim().toLowerCase()),
        sqlWhere(fn("lower", fn("trim", col("last_name"))), student.lastName.trim().toLowerCase()),
      ],
    },
    attributes: ["id", "email"],
  });
  for (const other of others) {
    const refunded = await Enrollment.count({ where: { studentId: other.id, refundedAt: { [Op.ne]: null } } });
    if (refunded > 0) return other.email;
  }
  return null;
}

export async function getRefundStatus(enrollment: Enrollment, now = new Date()): Promise<RefundStatus> {
  const base: RefundStatus = {
    state: "unpaid",
    eligibleUntil: null,
    reason: null,
    refundedAt: enrollment.refundedAt ? new Date(enrollment.refundedAt).toISOString() : null,
    refundNote: enrollment.refundNote,
    possiblePriorRefund: null,
  };
  const paid = isPaid(enrollment);
  if (!paid) return enrollment.refundedAt ? { ...base, state: "refunded" } : base;

  const notEligible = (reason: string): RefundStatus => ({ ...base, state: "not_eligible", reason });

  // One refund per person: this account has had one before (on this or another course).
  const priorRefunds = await Enrollment.count({
    where: { studentId: enrollment.studentId, refundedAt: { [Op.ne]: null } },
  });
  if (priorRefunds > 0) return notEligible("Already had a refund");

  const start = await paidStart(enrollment);
  const deadline = new Date(start.getTime() + REFUND_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  if (now > deadline) return notEligible(
      `7-day window ended ${deadline.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
    );
  if (await hasStartedDay2(enrollment)) return notEligible("Started Day 2");

  return {
    ...base,
    state: "eligible",
    eligibleUntil: deadline.toISOString(),
    possiblePriorRefund: await findSameNameRefund(enrollment.studentId),
  };
}

// Records a refund that has been (or is being) paid back in Paystack: locks the course,
// keeps the date for the one-refund rule and voids an unpaid referral reward for this
// course. A student who isn't eligible can still be refunded at the admin's discretion
// (terms: "at our discretion in exceptional circumstances") with override=true.
export async function recordRefund(
  enrollmentId: string,
  input: { note?: string; override?: boolean },
): Promise<{ enrollment: Enrollment; referralVoided: boolean; referralWarning: string | null }> {
  const enrollment = await Enrollment.findByPk(enrollmentId);
  if (!enrollment) throw ApiError.notFound("Enrollment not found");
  if (!isPaid(enrollment)) throw ApiError.badRequest("This course hasn't been paid for, so there's nothing to refund");

  const status = await getRefundStatus(enrollment);
  if (status.state !== "eligible" && !input.override) {
    throw new ApiError(409, `Not eligible for a cooling-off refund: ${status.reason ?? "unknown reason"}`, {
      code: "REFUND_NOT_ELIGIBLE",
    });
  }

  enrollment.refundedAt = new Date();
  enrollment.refundNote = input.note?.trim() || null;
  enrollment.paymentConfirmed = false;
  enrollment.paymentConfirmedAt = null;
  enrollment.depositPaidAt = null;
  await enrollment.save();

  let referralVoided = false;
  let referralWarning: string | null = null;
  const referral = await Referral.findOne({ where: { qualifyingEnrollmentId: enrollment.id } });
  if (referral && referral.status !== "void") {
    if (referral.referrerRewardStatus === "issued" || referral.refereeRewardStatus === "issued") {
      referralWarning = "A referral reward for this course was already paid out; it can't be taken back automatically.";
    } else {
      referral.status = "void";
      referral.notes = `${referral.notes ? `${referral.notes}\n` : ""}Voided: course refunded`;
      await referral.save();
      referralVoided = true;
    }
  }

  return { enrollment, referralVoided, referralWarning };
}
