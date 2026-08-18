import * as emails from "../emails";
import { Assignment, AssignmentSubmission, Course, CourseModule, Enrollment, User } from "../models";
import { getEnrollmentForCourseAndStudent } from "./enrollment.service";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { storageAdapter } from "../utils/storage";

interface SubmitInput {
  submissionText?: string;
  file?: { buffer: Buffer; originalname: string; mimetype: string };
}

interface GradeInput {
  score: number;
  feedback?: string;
}

async function getAssignmentWithCourse(assignmentId: string) {
  const assignment = await Assignment.findByPk(assignmentId);
  if (!assignment) {
    throw ApiError.notFound("Assignment not found");
  }
  const courseModule = await CourseModule.findByPk(assignment.moduleId);
  if (!courseModule) {
    throw ApiError.notFound("Module not found");
  }
  const course = await Course.findByPk(courseModule.courseId);
  if (!course) {
    throw ApiError.notFound("Course not found");
  }
  return { assignment, courseModule, course };
}

export async function listByModule(moduleId: string): Promise<Assignment[]> {
  return Assignment.findAll({ where: { moduleId }, order: [["createdAt", "ASC"]] });
}

// Mirrors lesson.service.ts's getLessonForStudent(): assignment content stays locked
// for a student until their enrollment's payment is confirmed -- being merely
// "enrolled" (free) was previously enough to read and submit an assignment, the one
// piece of course content that had no payment gate at all. Only gates students --
// instructors/admins aren't enrollees and should always be able to review content.
export async function getById(
  assignmentId: string,
  requester: { id: string; role: string },
): Promise<Assignment> {
  const { assignment, course } = await getAssignmentWithCourse(assignmentId);
  if (requester.role !== "student") {
    return assignment;
  }

  const enrollment = await getEnrollmentForCourseAndStudent(course.id, requester.id);
  if (!enrollment || !enrollment.paymentConfirmed) {
    throw ApiError.forbidden("This assignment unlocks once your payment has been confirmed");
  }
  return assignment;
}

function serializeSubmission(submission: AssignmentSubmission, dueDate: Date | null) {
  return {
    id: submission.id,
    assignmentId: submission.assignmentId,
    studentId: submission.studentId,
    submissionDate: submission.submissionDate,
    filePath: submission.filePath,
    submissionText: submission.submissionText,
    status: submission.status,
    score: submission.score,
    feedback: submission.feedback,
    gradedDate: submission.gradedDate,
    isLate: Boolean(dueDate && submission.submissionDate > dueDate),
  };
}

export async function getMySubmission(assignmentId: string, studentId: string) {
  const { assignment } = await getAssignmentWithCourse(assignmentId);
  const submission = await AssignmentSubmission.findOne({ where: { assignmentId, studentId } });
  return submission ? serializeSubmission(submission, assignment.dueDate) : null;
}

export async function submit(assignmentId: string, studentId: string, input: SubmitInput) {
  const { assignment, course } = await getAssignmentWithCourse(assignmentId);

  const enrollment = await Enrollment.findOne({
    where: { courseId: course.id, studentId, status: "active" },
  });
  if (!enrollment) {
    throw ApiError.forbidden("You must be enrolled in this course to submit this assignment");
  }
  if (!enrollment.paymentConfirmed) {
    throw ApiError.forbidden("This assignment unlocks once your payment has been confirmed");
  }

  if (assignment.fileRequired && !input.file) {
    throw ApiError.badRequest("A file is required for this assignment");
  }

  let filePath: string | undefined;
  if (input.file) {
    const saved = await storageAdapter.save({
      buffer: input.file.buffer,
      originalName: input.file.originalname,
      mimeType: input.file.mimetype,
      keyPrefix: `assignment-submissions/${assignmentId}/${studentId}/`,
    });
    filePath = saved.storagePath;
  }

  const existing = await AssignmentSubmission.findOne({ where: { assignmentId, studentId } });

  if (existing) {
    if (existing.status === "graded" || existing.status === "returned") {
      throw ApiError.conflict("Assignment already graded; contact your instructor for a resubmission");
    }
    existing.submissionDate = new Date();
    if (filePath) existing.filePath = filePath;
    if (input.submissionText !== undefined) existing.submissionText = input.submissionText;
    await existing.save();
    return serializeSubmission(existing, assignment.dueDate);
  }

  const created = await AssignmentSubmission.create({
    assignmentId,
    studentId,
    filePath,
    submissionText: input.submissionText,
  });
  return serializeSubmission(created, assignment.dueDate);
}

async function assertInstructorOwnsCourse(course: Course, user: { id: string; role: string }) {
  if (user.role === "admin") return;
  if (user.role === "instructor" && course.instructorId === user.id) return;
  throw ApiError.forbidden("You do not have permission to access this assignment's submissions");
}

export async function getSubmission(
  assignmentId: string,
  submissionId: string,
  user: { id: string; role: string },
) {
  const { assignment, course } = await getAssignmentWithCourse(assignmentId);
  const submission = await AssignmentSubmission.findByPk(submissionId);
  if (!submission || submission.assignmentId !== assignmentId) {
    throw ApiError.notFound("Submission not found");
  }

  if (user.role === "student") {
    if (submission.studentId !== user.id) {
      throw ApiError.forbidden("You do not have permission to view this submission");
    }
  } else {
    await assertInstructorOwnsCourse(course, user);
  }

  return serializeSubmission(submission, assignment.dueDate);
}

export async function listSubmissions(assignmentId: string, user: { id: string; role: string }) {
  const { assignment, course } = await getAssignmentWithCourse(assignmentId);
  await assertInstructorOwnsCourse(course, user);

  const submissions = await AssignmentSubmission.findAll({
    where: { assignmentId },
    order: [["submissionDate", "DESC"]],
  });
  return submissions.map((s) => serializeSubmission(s, assignment.dueDate));
}

export async function listUngradedForInstructor(user: { id: string; role: string }) {
  const courseWhere = user.role === "admin" ? {} : { instructorId: user.id };
  const courses = await Course.findAll({ where: courseWhere });
  const courseIds = courses.map((c) => c.id);
  if (courseIds.length === 0) return [];

  const modules = await CourseModule.findAll({ where: { courseId: courseIds } });
  const moduleIds = modules.map((m) => m.id);
  if (moduleIds.length === 0) return [];

  const assignments = await Assignment.findAll({ where: { moduleId: moduleIds } });
  const assignmentIds = assignments.map((a) => a.id);
  if (assignmentIds.length === 0) return [];

  const submissions = await AssignmentSubmission.findAll({
    where: { assignmentId: assignmentIds, status: "submitted" },
    order: [["submissionDate", "ASC"]],
  });

  const assignmentById = new Map(assignments.map((a) => [a.id, a]));
  return submissions.map((s) => ({
    ...serializeSubmission(s, assignmentById.get(s.assignmentId)?.dueDate ?? null),
    assignmentTitle: assignmentById.get(s.assignmentId)?.title ?? null,
  }));
}

export async function getSubmissionFileForDownload(
  submissionId: string,
  user: { id: string; role: string },
) {
  const submission = await AssignmentSubmission.findByPk(submissionId);
  if (!submission) {
    throw ApiError.notFound("Submission not found");
  }
  if (!submission.filePath) {
    throw ApiError.notFound("This submission has no attached file");
  }

  const { course } = await getAssignmentWithCourse(submission.assignmentId);
  if (user.role === "student") {
    if (submission.studentId !== user.id) {
      throw ApiError.forbidden("You do not have permission to view this submission");
    }
  } else {
    await assertInstructorOwnsCourse(course, user);
  }

  return submission;
}

export async function grade(submissionId: string, user: { id: string; role: string }, input: GradeInput) {
  const submission = await AssignmentSubmission.findByPk(submissionId);
  if (!submission) {
    throw ApiError.notFound("Submission not found");
  }

  const { assignment, course } = await getAssignmentWithCourse(submission.assignmentId);
  await assertInstructorOwnsCourse(course, user);

  if (input.score < 0 || input.score > assignment.pointsTotal) {
    throw ApiError.badRequest(`Score must be between 0 and ${assignment.pointsTotal}`);
  }

  submission.status = "graded";
  submission.score = input.score;
  submission.feedback = input.feedback ?? null;
  submission.gradedDate = new Date();
  await submission.save();

  const student = await User.findByPk(submission.studentId);
  if (student) {
    // Best-effort, not awaited -- an unreachable/slow SMTP provider must never hang
    // grading; the grade itself is already saved at this point.
    emails
      .sendAssignmentGradedEmail(student, assignment, course, submission)
      .catch((err) => logger.error("Failed to send assignment graded email", err));
  }

  return serializeSubmission(submission, assignment.dueDate);
}
