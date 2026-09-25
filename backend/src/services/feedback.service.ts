import { Course, CourseFeedback, Enrollment, User } from "../models";
import { ApiError } from "../utils/ApiError";

export interface FeedbackInput {
  rating: number;
  comment: string;
  consentQuote: boolean;
  consentCapstone: boolean;
}

// A student leaves (or updates) feedback on a course they've completed (2026-09-25).
// Editing resets approval, so an admin always reviews the exact words that get quoted.
export async function saveFeedback(enrollmentId: string, studentId: string, input: FeedbackInput) {
  const enrollment = await Enrollment.findByPk(enrollmentId);
  if (!enrollment || enrollment.studentId !== studentId) {
    throw ApiError.notFound("Enrollment not found");
  }
  if (enrollment.status !== "completed") {
    throw ApiError.forbidden("You can leave feedback once you've completed the course");
  }
  const existing = await CourseFeedback.findOne({ where: { enrollmentId } });
  const values = { ...input, comment: input.comment.trim(), approved: false };
  if (existing) {
    await existing.update(values);
    return existing;
  }
  return CourseFeedback.create({ enrollmentId, studentId, courseId: enrollment.courseId, ...values });
}

export async function getMyFeedback(enrollmentId: string, studentId: string) {
  const enrollment = await Enrollment.findByPk(enrollmentId);
  if (!enrollment || enrollment.studentId !== studentId) {
    throw ApiError.notFound("Enrollment not found");
  }
  return CourseFeedback.findOne({ where: { enrollmentId } });
}

export async function listFeedbackForAdmin() {
  const rows = await CourseFeedback.findAll({
    include: [
      { model: User, as: "student", attributes: ["firstName", "lastName", "email"] },
      { model: Course, as: "course", attributes: ["title", "slug"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  return rows.map((f) => {
    const student = (f as unknown as { student: User }).student;
    const course = (f as unknown as { course: Course }).course;
    return {
      id: f.id,
      studentName: `${student.firstName} ${student.lastName}`,
      studentEmail: student.email,
      courseTitle: course.title,
      rating: f.rating,
      comment: f.comment,
      consentQuote: f.consentQuote,
      consentCapstone: f.consentCapstone,
      approved: f.approved,
      createdAt: f.createdAt,
    };
  });
}

export async function setFeedbackApproved(id: string, approved: boolean) {
  const feedback = await CourseFeedback.findByPk(id);
  if (!feedback) throw ApiError.notFound("Feedback not found");
  if (approved && !feedback.consentQuote) {
    throw ApiError.badRequest("This student didn't agree to be quoted, so their feedback can't be published");
  }
  await feedback.update({ approved });
  return feedback;
}

// Public: approved, quote-consented feedback only -- first name + last initial, never
// the email or full surname.
export async function listPublicTestimonials(courseSlug?: string) {
  const rows = await CourseFeedback.findAll({
    where: { approved: true, consentQuote: true },
    include: [
      { model: User, as: "student", attributes: ["firstName", "lastName"] },
      { model: Course, as: "course", attributes: ["title", "slug"], ...(courseSlug ? { where: { slug: courseSlug } } : {}) },
    ],
    order: [["updatedAt", "DESC"]],
    limit: 12,
  });
  return rows.map((f) => {
    const student = (f as unknown as { student: User }).student;
    const course = (f as unknown as { course: Course }).course;
    return {
      name: `${student.firstName} ${student.lastName.trim().charAt(0).toUpperCase()}.`.trim(),
      courseTitle: course.title,
      courseSlug: course.slug,
      rating: f.rating,
      comment: f.comment,
    };
  });
}
