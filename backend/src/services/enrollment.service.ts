import { Transaction } from "sequelize";
import * as emails from "../emails";
import { DEPOSIT_UNLOCKED_DAYS } from "../constants/coursePricing";
import { Course, CourseModule, Enrollment, Payment, User } from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

export async function enrollStudent(courseId: string, studentId: string): Promise<Enrollment> {
  const course = await Course.findByPk(courseId);
  if (!course || course.status !== "published") {
    throw ApiError.notFound("Course not found");
  }

  const existing = await Enrollment.findOne({ where: { courseId, studentId } });
  if (existing) {
    throw ApiError.conflict("You are already enrolled in this course");
  }

  const enrollment = await Enrollment.create({ courseId, studentId });

  const student = await User.findByPk(studentId);
  if (student) {
    // Best-effort, not awaited -- an unreachable/slow SMTP provider must never hang
    // enrolling in a course; the enrollment itself is already committed at this point.
    emails
      .sendEnrollmentConfirmationEmail(student, course)
      .catch((err) => logger.error("Failed to send enrollment confirmation email", err));
  }

  return enrollment;
}

export async function listMyEnrollments(studentId: string): Promise<Enrollment[]> {
  return Enrollment.findAll({
    where: { studentId },
    include: [{ model: Course, as: "course" }],
    order: [["enrolledDate", "DESC"]],
  });
}

export async function getEnrollmentById(
  id: string,
  requester: { id: string; role: string },
): Promise<Enrollment> {
  const enrollment = await Enrollment.findByPk(id, {
    include: [{ model: Course, as: "course" }],
  });
  if (!enrollment) {
    throw ApiError.notFound("Enrollment not found");
  }
  if (requester.role !== "admin" && enrollment.studentId !== requester.id) {
    throw ApiError.forbidden("You do not have permission to view this enrollment");
  }
  return enrollment;
}

// Instalments (2026-10-11): the days (modules) a deposit unlocks -- the first
// DEPOSIT_UNLOCKED_DAYS in course order (week, then module order, the same order the
// course page and lesson navigation use).
export async function getDepositUnlockedModuleIds(courseId: string): Promise<Set<string>> {
  const modules = await CourseModule.findAll({
    where: { courseId },
    order: [
      ["weekNumber", "ASC"],
      ["order", "ASC"],
    ],
    attributes: ["id"],
  });
  return new Set(modules.slice(0, DEPOSIT_UNLOCKED_DAYS).map((m) => m.id));
}

// Whether a student's payment covers a given day: paid in full covers every day; a deposit
// covers only the first DEPOSIT_UNLOCKED_DAYS.
export async function hasPaidAccessToModule(
  enrollment: Enrollment | null,
  courseId: string,
  moduleId: string,
): Promise<boolean> {
  if (!enrollment) return false;
  if (enrollment.paymentConfirmed) return true;
  if (!enrollment.depositPaidAt) return false;
  return (await getDepositUnlockedModuleIds(courseId)).has(moduleId);
}

export async function getEnrollmentForCourseAndStudent(
  courseId: string,
  studentId: string,
): Promise<Enrollment | null> {
  return Enrollment.findOne({ where: { courseId, studentId } });
}

// Centralizes the completion-transition rule here, in the file that owns the Enrollment
// model, so any future caller recomputing progress (not just lesson.service.ts) applies
// the same rule. Caller is expected to already hold a row lock on `enrollment` when this
// runs inside a transaction, so the read-recompute-write is race-safe.
export async function recalculateProgress(
  enrollment: Enrollment,
  completedLessons: number,
  totalLessons: number,
  transaction?: Transaction,
): Promise<Enrollment> {
  enrollment.progressPercent =
    totalLessons > 0 ? Math.round((100 * completedLessons) / totalLessons) : 0;
  if (enrollment.progressPercent >= 100 && enrollment.status !== "completed") {
    enrollment.status = "completed";
    enrollment.completionDate = new Date();
  }
  await enrollment.save({ transaction });
  return enrollment;
}

// When the student last started a payment that's still awaiting confirmation (a card
// payment sent to Paystack, or an older pending record), or null.
export async function getPendingPaymentSubmittedAt(enrollmentId: string): Promise<Date | null> {
  const payment = await Payment.findOne({
    where: { enrollmentId, status: "pending" },
    order: [["createdAt", "DESC"]],
  });
  return payment ? payment.createdAt : null;
}
