import { Transaction } from "sequelize";
import { Course, Enrollment } from "../models";
import { ApiError } from "../utils/ApiError";

export async function enrollStudent(courseId: string, studentId: string): Promise<Enrollment> {
  const course = await Course.findByPk(courseId);
  if (!course || course.status !== "published") {
    throw ApiError.notFound("Course not found");
  }

  const existing = await Enrollment.findOne({ where: { courseId, studentId } });
  if (existing) {
    throw ApiError.conflict("You are already enrolled in this course");
  }

  return Enrollment.create({ courseId, studentId });
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
