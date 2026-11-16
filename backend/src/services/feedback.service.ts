import { Course, CourseFeedback, Enrollment, User } from "../models";
import { ApiError } from "../utils/ApiError";
import { FeedbackQuestionnaire, questionnaireFor } from "../constants/feedbackQuestionnaires";

export interface FeedbackInput {
  rating: number;
  comment: string;
  consentQuote: boolean;
  consentCapstone: boolean;
  answers?: Record<string, string>;
}

// A questionnaire's multiple-choice questions must all be answered with one of their options.
function checkAnswers(questionnaire: FeedbackQuestionnaire, answers: Record<string, string> | undefined) {
  const out: Record<string, string> = {};
  for (const question of questionnaire.choiceQuestions) {
    const answer = answers?.[question.id];
    if (!answer || !question.options.includes(answer)) {
      throw ApiError.badRequest(`Please answer: ${question.text}`);
    }
    out[question.id] = answer;
  }
  return out;
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
  const course = await Course.findByPk(enrollment.courseId, { attributes: ["slug"] });
  const questionnaire = questionnaireFor(course?.slug);
  const existing = await CourseFeedback.findOne({ where: { enrollmentId } });
  const values = {
    rating: input.rating,
    comment: input.comment.trim(),
    consentQuote: input.consentQuote,
    consentCapstone: questionnaire && !questionnaire.asksCapstoneConsent ? false : input.consentCapstone,
    answers: questionnaire ? checkAnswers(questionnaire, input.answers) : null,
    approved: false,
  };
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
  const course = await Course.findByPk(enrollment.courseId, { attributes: ["slug"] });
  const feedback = await CourseFeedback.findOne({ where: { enrollmentId } });
  return { feedback, questionnaire: questionnaireFor(course?.slug) };
}

// Questionnaire answers as question/answer pairs, in the questionnaire's order.
function questionnaireAnswers(courseSlug: string, answers: Record<string, string> | null) {
  const questionnaire = questionnaireFor(courseSlug);
  if (!questionnaire || !answers) return [];
  return questionnaire.choiceQuestions
    .filter((q) => answers[q.id])
    .map((q) => ({ question: q.text, answer: answers[q.id] }));
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
      answers: questionnaireAnswers(course.slug, f.answers),
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
