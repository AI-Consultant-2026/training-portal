import { Op, Transaction } from "sequelize";
import {
  CourseModule,
  Enrollment,
  Lesson,
  ProgressTracking,
  VideoCheckpoint,
  VideoCheckpointAnswer,
  sequelize,
} from "../models";
import { ApiError } from "../utils/ApiError";
import { getEnrollmentForCourseAndStudent, recalculateProgress } from "./enrollment.service";

export async function listLessonsForModule(moduleId: string): Promise<Lesson[]> {
  return Lesson.findAll({ where: { moduleId }, order: [["order", "ASC"]] });
}

export async function getLessonById(id: string): Promise<Lesson> {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) {
    throw ApiError.notFound("Lesson not found");
  }
  return lesson;
}

async function getLessonIdsForCourse(courseId: string): Promise<string[]> {
  const lessons = await Lesson.findAll({
    include: [
      {
        model: CourseModule,
        as: "module",
        where: { courseId },
        attributes: [],
      },
    ],
    attributes: ["id"],
  });
  return lessons.map((l) => l.id);
}

async function countCompletedLessons(
  studentId: string,
  lessonIds: string[],
  transaction?: Transaction,
): Promise<number> {
  if (lessonIds.length === 0) return 0;
  return ProgressTracking.count({
    where: { studentId, lessonId: { [Op.in]: lessonIds } },
    transaction,
  });
}

// Gates quiz access: a quiz stays locked until every lesson in its own module is
// completed. A module with zero lessons is never locked -- there's nothing to gate on.
export async function areAllModuleLessonsCompleted(
  moduleId: string,
  studentId: string,
): Promise<boolean> {
  const lessons = await listLessonsForModule(moduleId);
  if (lessons.length === 0) return true;
  const completedCount = await countCompletedLessons(
    studentId,
    lessons.map((l) => l.id),
  );
  return completedCount >= lessons.length;
}

// Distinct from enrollment.service.ts's getEnrollmentForCourseAndStudent (which allows
// any status): completing a lesson requires an *active* enrollment, so a dropped or
// suspended student can't rack up further progress. Local to this file (rather than a
// change to the shared helper) mirrors how quiz.service.ts's assertEnrolled() is its own
// local, active-only check rather than a shared one.
async function getActiveEnrollmentOrThrow(courseId: string, studentId: string): Promise<Enrollment> {
  const enrollment = await Enrollment.findOne({ where: { courseId, studentId, status: "active" } });
  if (!enrollment) {
    throw ApiError.forbidden("You must be enrolled in this course to complete lessons");
  }
  return enrollment;
}

export interface MarkLessonCompleteResult {
  completed: true;
  alreadyCompleted: boolean;
  courseProgress: { totalLessons: number; completedLessons: number; progressPercent: number };
}

export async function markLessonComplete(
  lessonId: string,
  studentId: string,
): Promise<MarkLessonCompleteResult> {
  const lesson = await getLessonById(lessonId);
  const courseModule = await CourseModule.findByPk(lesson.moduleId);
  if (!courseModule) {
    throw ApiError.notFound("Module not found");
  }

  const enrollment = await getActiveEnrollmentOrThrow(courseModule.courseId, studentId);

  return sequelize.transaction(async (transaction) => {
    // Locking the enrollment row first serializes concurrent mark-complete calls for
    // this student+course: without this, two calls completing two *different* lessons
    // around the same time could each read a stale completed-count before the other
    // commits, and the second save would silently clobber the first's progressPercent
    // (the same race class quiz.service.ts's gradeAttempt() guards against with an
    // identical lock-then-recompute pattern).
    const lockedEnrollment = await Enrollment.findByPk(enrollment.id, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!lockedEnrollment) {
      throw ApiError.notFound("Enrollment not found");
    }

    let alreadyCompleted: boolean;
    try {
      const [, created] = await ProgressTracking.findOrCreate({
        where: { studentId, lessonId },
        defaults: { studentId, lessonId, completedAt: new Date() },
        transaction,
      });
      alreadyCompleted = !created;
    } catch (err) {
      // With the row lock above, a concurrent duplicate insert for the same lesson
      // shouldn't reach here in practice, but the unique index on (student_id,
      // lesson_id) is the real idempotency guard, so treat a race on it as a no-op
      // rather than an error (mirrors quiz.service.ts's start() race handling).
      if (err && typeof err === "object" && "name" in err && (err as { name: string }).name === "SequelizeUniqueConstraintError") {
        alreadyCompleted = true;
      } else {
        throw err;
      }
    }

    const lessonIds = await getLessonIdsForCourse(courseModule.courseId);
    const totalLessons = lessonIds.length;
    const completedLessons = await countCompletedLessons(studentId, lessonIds, transaction);

    await recalculateProgress(lockedEnrollment, completedLessons, totalLessons, transaction);

    return {
      completed: true as const,
      alreadyCompleted,
      courseProgress: {
        totalLessons,
        completedLessons,
        progressPercent: lockedEnrollment.progressPercent,
      },
    };
  });
}

export async function isLessonCompletedByStudent(lessonId: string, studentId: string): Promise<boolean> {
  const record = await ProgressTracking.findOne({ where: { studentId, lessonId } });
  return record !== null;
}

export interface CourseProgress {
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  completedLessonIds: string[];
}

export async function getCourseProgressForStudent(
  courseId: string,
  studentId: string,
): Promise<CourseProgress> {
  // Any enrollment status is fine here (unlike the active-only check for marking
  // lessons complete): a student who has completed or been dropped from a course
  // should still be able to see what they'd already finished.
  const enrollment = await getEnrollmentForCourseAndStudent(courseId, studentId);
  if (!enrollment) {
    throw ApiError.forbidden("You must be enrolled in this course to view its progress");
  }

  const lessonIds = await getLessonIdsForCourse(courseId);
  const completedRecords =
    lessonIds.length === 0
      ? []
      : await ProgressTracking.findAll({ where: { studentId, lessonId: { [Op.in]: lessonIds } } });

  return {
    totalLessons: lessonIds.length,
    completedLessons: completedRecords.length,
    progressPercent: enrollment.progressPercent,
    completedLessonIds: completedRecords.map((r) => r.lessonId),
  };
}

export interface CheckpointAnswerView {
  id: string;
  answerText: string;
  order: number;
}

export interface CheckpointView {
  id: string;
  timestampSeconds: number;
  questionText: string;
  questionType: "multiple_choice" | "true_false";
  order: number;
  explanation: string | null;
  answers: CheckpointAnswerView[];
}

// Answers are deliberately returned without isCorrect, mirroring quiz.service.ts's
// handling of in-progress quiz questions -- a formative checkpoint would be pointless
// if the correct answer were visible in the initial payload.
export async function getCheckpointsForLesson(lessonId: string): Promise<CheckpointView[]> {
  const checkpoints = await VideoCheckpoint.findAll({
    where: { lessonId },
    order: [["order", "ASC"]],
  });
  if (checkpoints.length === 0) return [];

  const answers = await VideoCheckpointAnswer.findAll({
    where: { checkpointId: { [Op.in]: checkpoints.map((c) => c.id) } },
    order: [["order", "ASC"]],
  });
  const answersByCheckpoint = new Map<string, CheckpointAnswerView[]>();
  answers.forEach((a) => {
    const list = answersByCheckpoint.get(a.checkpointId) ?? [];
    list.push({ id: a.id, answerText: a.answerText, order: a.order });
    answersByCheckpoint.set(a.checkpointId, list);
  });

  return checkpoints.map((c) => ({
    id: c.id,
    timestampSeconds: c.timestampSeconds,
    questionText: c.questionText,
    questionType: c.questionType,
    order: c.order,
    explanation: c.explanation,
    answers: answersByCheckpoint.get(c.id) ?? [],
  }));
}

export interface CheckCheckpointAnswerResult {
  correct: boolean;
  correctAnswerId: string;
  explanation: string | null;
}

// No attempt/response persistence -- checkpoints are purely formative (confirmed
// decision), so this is a stateless lookup-and-compare, not a graded submission.
export async function checkCheckpointAnswer(
  checkpointId: string,
  answerId: string,
): Promise<CheckCheckpointAnswerResult> {
  const checkpoint = await VideoCheckpoint.findByPk(checkpointId);
  if (!checkpoint) {
    throw ApiError.notFound("Checkpoint not found");
  }

  const submittedAnswer = await VideoCheckpointAnswer.findOne({ where: { id: answerId, checkpointId } });
  if (!submittedAnswer) {
    throw ApiError.notFound("Answer not found");
  }

  const correctAnswer = await VideoCheckpointAnswer.findOne({ where: { checkpointId, isCorrect: true } });
  if (!correctAnswer) {
    throw ApiError.badRequest("This checkpoint has no correct answer configured");
  }

  return {
    correct: submittedAnswer.isCorrect,
    correctAnswerId: correctAnswer.id,
    explanation: checkpoint.explanation,
  };
}
