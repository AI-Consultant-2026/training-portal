import { Capstone, CapstoneSubmission, Course, Enrollment, sequelize } from "../models";
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

async function getCapstoneWithCourse(capstoneId: string) {
  const capstone = await Capstone.findByPk(capstoneId);
  if (!capstone) {
    throw ApiError.notFound("Capstone not found");
  }
  const course = await Course.findByPk(capstone.courseId);
  if (!course) {
    throw ApiError.notFound("Course not found");
  }
  return { capstone, course };
}

export async function getByCourse(courseId: string): Promise<Capstone | null> {
  return Capstone.findOne({ where: { courseId } });
}

export async function getById(capstoneId: string): Promise<Capstone> {
  const capstone = await Capstone.findByPk(capstoneId);
  if (!capstone) {
    throw ApiError.notFound("Capstone not found");
  }
  return capstone;
}

function serializeSubmission(submission: CapstoneSubmission, dueDate: Date | null) {
  return {
    id: submission.id,
    capstoneId: submission.capstoneId,
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

export async function getMySubmission(capstoneId: string, studentId: string) {
  const { capstone } = await getCapstoneWithCourse(capstoneId);
  const submission = await CapstoneSubmission.findOne({ where: { capstoneId, studentId } });
  return submission ? serializeSubmission(submission, capstone.dueDate) : null;
}

export async function submit(capstoneId: string, studentId: string, input: SubmitInput) {
  const { capstone, course } = await getCapstoneWithCourse(capstoneId);

  const enrollment = await Enrollment.findOne({
    where: { courseId: course.id, studentId, status: "active" },
  });
  if (!enrollment) {
    throw ApiError.forbidden("You must be enrolled in this course to submit this capstone");
  }

  if (capstone.fileRequired && !input.file) {
    throw ApiError.badRequest("A file is required for this capstone");
  }

  let filePath: string | undefined;
  if (input.file) {
    const saved = await storageAdapter.save({
      buffer: input.file.buffer,
      originalName: input.file.originalname,
      mimeType: input.file.mimetype,
      keyPrefix: `capstone-submissions/${capstoneId}/${studentId}/`,
    });
    filePath = saved.storagePath;
  }

  const existing = await CapstoneSubmission.findOne({ where: { capstoneId, studentId } });

  if (existing) {
    if (existing.status === "graded" || existing.status === "returned") {
      throw ApiError.conflict("Capstone already graded; contact your instructor for a resubmission");
    }
    existing.submissionDate = new Date();
    if (filePath) existing.filePath = filePath;
    if (input.submissionText !== undefined) existing.submissionText = input.submissionText;
    await existing.save();
    return serializeSubmission(existing, capstone.dueDate);
  }

  const created = await CapstoneSubmission.create({
    capstoneId,
    studentId,
    filePath,
    submissionText: input.submissionText,
  });
  return serializeSubmission(created, capstone.dueDate);
}

function assertInstructorOwnsCourse(course: Course, user: { id: string; role: string }) {
  if (user.role === "admin") return;
  if (user.role === "instructor" && course.instructorId === user.id) return;
  throw ApiError.forbidden("You do not have permission to access this capstone's submissions");
}

export async function getSubmission(
  capstoneId: string,
  submissionId: string,
  user: { id: string; role: string },
) {
  const { capstone, course } = await getCapstoneWithCourse(capstoneId);
  const submission = await CapstoneSubmission.findByPk(submissionId);
  if (!submission || submission.capstoneId !== capstoneId) {
    throw ApiError.notFound("Submission not found");
  }

  if (user.role === "student") {
    if (submission.studentId !== user.id) {
      throw ApiError.forbidden("You do not have permission to view this submission");
    }
  } else {
    assertInstructorOwnsCourse(course, user);
  }

  return serializeSubmission(submission, capstone.dueDate);
}

export async function listSubmissions(capstoneId: string, user: { id: string; role: string }) {
  const { capstone, course } = await getCapstoneWithCourse(capstoneId);
  assertInstructorOwnsCourse(course, user);

  const submissions = await CapstoneSubmission.findAll({
    where: { capstoneId },
    order: [["submissionDate", "DESC"]],
  });
  return submissions.map((s) => serializeSubmission(s, capstone.dueDate));
}

export async function listUngradedForInstructor(user: { id: string; role: string }) {
  const courseWhere = user.role === "admin" ? {} : { instructorId: user.id };
  const courses = await Course.findAll({ where: courseWhere });
  const courseIds = courses.map((c) => c.id);
  if (courseIds.length === 0) return [];

  const capstones = await Capstone.findAll({ where: { courseId: courseIds } });
  const capstoneIds = capstones.map((c) => c.id);
  if (capstoneIds.length === 0) return [];

  const submissions = await CapstoneSubmission.findAll({
    where: { capstoneId: capstoneIds, status: "submitted" },
    order: [["submissionDate", "ASC"]],
  });

  const capstoneById = new Map(capstones.map((c) => [c.id, c]));
  const courseById = new Map(courses.map((c) => [c.id, c]));
  return submissions.map((s) => {
    const capstone = capstoneById.get(s.capstoneId);
    return {
      ...serializeSubmission(s, capstone?.dueDate ?? null),
      courseTitle: courseById.get(capstone?.courseId ?? "")?.title ?? null,
    };
  });
}

export async function getSubmissionFileForDownload(
  submissionId: string,
  user: { id: string; role: string },
) {
  const submission = await CapstoneSubmission.findByPk(submissionId);
  if (!submission) {
    throw ApiError.notFound("Submission not found");
  }
  if (!submission.filePath) {
    throw ApiError.notFound("This submission has no attached file");
  }

  const { course } = await getCapstoneWithCourse(submission.capstoneId);
  if (user.role === "student") {
    if (submission.studentId !== user.id) {
      throw ApiError.forbidden("You do not have permission to view this submission");
    }
  } else {
    assertInstructorOwnsCourse(course, user);
  }

  return submission;
}

export async function grade(submissionId: string, user: { id: string; role: string }, input: GradeInput) {
  const submission = await CapstoneSubmission.findByPk(submissionId);
  if (!submission) {
    throw ApiError.notFound("Submission not found");
  }

  const { capstone, course } = await getCapstoneWithCourse(submission.capstoneId);
  assertInstructorOwnsCourse(course, user);

  if (input.score < 0 || input.score > capstone.pointsTotal) {
    throw ApiError.badRequest(`Score must be between 0 and ${capstone.pointsTotal}`);
  }

  // Transaction + row lock (mirrors quiz.service.ts's gradeAttempt()) rather than
  // assignment.service.ts's ungated grade(): this write also touches the student's
  // enrollment row, so both updates need to commit together or not at all.
  await sequelize.transaction(async (transaction) => {
    const lockedSubmission = await CapstoneSubmission.findByPk(submissionId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!lockedSubmission) {
      throw ApiError.notFound("Submission not found");
    }

    lockedSubmission.status = "graded";
    lockedSubmission.score = input.score;
    lockedSubmission.feedback = input.feedback ?? null;
    lockedSubmission.gradedDate = new Date();
    await lockedSubmission.save({ transaction });

    // First-ever write to this column (confirmed unused anywhere else in the app).
    // No status filter: write the grade regardless of the enrollment's current status.
    const enrollment = await Enrollment.findOne({
      where: { courseId: course.id, studentId: lockedSubmission.studentId },
      transaction,
    });
    if (enrollment) {
      enrollment.grade = String(input.score);
      await enrollment.save({ transaction });
    } else {
      // Unreachable today (nothing in this app deletes an Enrollment row), but grading
      // a submission must never fail because of an unrelated enrollment-data gap.
      logger.warn(
        `No enrollment found for student ${lockedSubmission.studentId} in course ${course.id} while grading capstone submission ${submissionId}`,
      );
    }
  });

  const updated = await CapstoneSubmission.findByPk(submissionId);
  return serializeSubmission(updated!, capstone.dueDate);
}
