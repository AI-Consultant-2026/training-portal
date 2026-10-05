import { Op, Transaction } from "sequelize";
import {
  Assignment,
  AssignmentSubmission,
  Course,
  CourseModule,
  Enrollment,
  Lesson,
  ProgressTracking,
  Quiz,
  QuizAttempt,
  VideoCheckpoint,
  VideoCheckpointAnswer,
  sequelize,
} from "../models";
import { ApiError } from "../utils/ApiError";
import { assertCourseAccessible } from "./course.service";
import { getEnrollmentForCourseAndStudent, recalculateProgress } from "./enrollment.service";

// Free preview (2026-09-25): every course's very first lesson -- the first lesson of the
// module with the lowest weekNumber -- is open to anyone, so prospects can try the real
// thing before paying. Logged-in students reach it through the normal lesson route below
// (no payment needed); logged-out visitors through the public /api/courses/:slug/preview
// endpoint. Everything after it stays gated behind a confirmed payment. (Replaces the old
// demo-account-only preview of a single, since-archived course.)
export async function getFreePreviewLesson(courseId: string): Promise<{ lesson: Lesson; module: CourseModule } | null> {
  const firstModule = await CourseModule.findOne({
    where: { courseId },
    order: [["weekNumber", "ASC"]],
  });
  if (!firstModule) {
    return null;
  }
  const firstLesson = await Lesson.findOne({
    where: { moduleId: firstModule.id },
    order: [["order", "ASC"]],
  });
  return firstLesson ? { lesson: firstLesson, module: firstModule } : null;
}

async function isFreePreviewLesson(lesson: Lesson, courseModule: CourseModule): Promise<boolean> {
  const preview = await getFreePreviewLesson(courseModule.courseId);
  return preview !== null && preview.lesson.id === lesson.id;
}

// requester is only passed (and enforced) from the public listLessonsForModule route --
// the internal callers below (navigation, progress calculation) already reach a module's
// lessons via a path that's gated elsewhere, and have no real "requester" persona of
// their own (e.g. progress recalculation runs off a payment webhook), so they omit it.
export async function listLessonsForModule(
  moduleId: string,
  requester?: { role: string },
): Promise<Lesson[]> {
  if (requester) {
    const courseModule = await CourseModule.findByPk(moduleId);
    if (!courseModule) {
      throw ApiError.notFound("Module not found");
    }
    const course = await Course.findByPk(courseModule.courseId);
    if (course) {
      assertCourseAccessible(course, requester);
    }
  }

  return Lesson.findAll({ where: { moduleId }, order: [["order", "ASC"]] });
}

export async function getLessonById(id: string): Promise<Lesson> {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) {
    throw ApiError.notFound("Lesson not found");
  }
  return lesson;
}

// Lessons are locked until the student's enrollment has payment_confirmed set by an
// admin -- except each course's free preview lesson (see getFreePreviewLesson above).
// Only gates students -- instructors/admins aren't enrollees and should always be able
// to review content (mirrors the frontend's CourseDetailPage lock check).
export async function getLessonForStudent(id: string, requester: { id: string; role: string }): Promise<Lesson> {
  const lesson = await getLessonById(id);

  const courseModule = await CourseModule.findByPk(lesson.moduleId);
  if (!courseModule) {
    throw ApiError.notFound("Module not found");
  }

  const course = await Course.findByPk(courseModule.courseId);
  if (course) {
    // Reuses the same admin-only gate as the course/module/catalog endpoints -- an
    // instructor bypasses the payment check below like any other lesson, but must not
    // bypass this one, so it runs before the role branch rather than after it.
    assertCourseAccessible(course, requester);
  }

  if (requester.role !== "student") {
    return lesson;
  }

  const enrollment = await getEnrollmentForCourseAndStudent(courseModule.courseId, requester.id);
  if (!enrollment || !enrollment.paymentConfirmed) {
    if (await isFreePreviewLesson(lesson, courseModule)) {
      return lesson;
    }
    throw ApiError.forbidden("This lesson unlocks once your payment has been confirmed");
  }

  const taskGate = await getLessonTaskGate(lesson, requester.id);
  if (taskGate) {
    throw new ApiError(403, MODULE_TASKS_INCOMPLETE_MESSAGE, {
      code: MODULE_TASKS_INCOMPLETE_CODE,
      ...taskGate,
    });
  }

  return lesson;
}

// Day gate (2026-10-05): within a day (module), every lesson after the first stays
// locked until the student has submitted that day's quiz and assignment. The quiz and
// assignment unlock as soon as the day's first lesson is complete (see
// isFirstModuleLessonCompleted), so the order a student works through is lesson 1 ->
// quiz + assignment -> lesson 2. Only enabled quizzes count -- an admin-disabled quiz
// can't be taken, so it must not block anyone. A quiz counts once an attempt has been
// submitted (any score); an assignment once anything has been submitted.
export const MODULE_TASKS_INCOMPLETE_CODE = "MODULE_TASKS_INCOMPLETE";
export const MODULE_TASKS_INCOMPLETE_MESSAGE =
  "Complete this day's quiz and assignment to proceed to the next lesson.";

export interface ModuleTaskItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface ModuleTaskStatus {
  moduleId: string;
  quizzes: ModuleTaskItem[];
  assignments: ModuleTaskItem[];
  complete: boolean;
}

export async function getModuleTaskStatus(moduleId: string, studentId: string): Promise<ModuleTaskStatus> {
  const [quizzes, assignments] = await Promise.all([
    Quiz.findAll({ where: { moduleId, isEnabled: true }, order: [["createdAt", "ASC"]] }),
    Assignment.findAll({ where: { moduleId }, order: [["createdAt", "ASC"]] }),
  ]);
  const [attempts, submissions] = await Promise.all([
    quizzes.length === 0
      ? []
      : QuizAttempt.findAll({
          where: {
            studentId,
            quizId: { [Op.in]: quizzes.map((q) => q.id) },
            status: { [Op.in]: ["submitted", "graded"] },
          },
          attributes: ["quizId"],
        }),
    assignments.length === 0
      ? []
      : AssignmentSubmission.findAll({
          where: { studentId, assignmentId: { [Op.in]: assignments.map((a) => a.id) } },
          attributes: ["assignmentId"],
        }),
  ]);
  const doneQuizIds = new Set(attempts.map((a) => a.quizId));
  const doneAssignmentIds = new Set(submissions.map((s) => s.assignmentId));

  const quizItems = quizzes.map((q) => ({ id: q.id, title: q.title, completed: doneQuizIds.has(q.id) }));
  const assignmentItems = assignments.map((a) => ({
    id: a.id,
    title: a.title,
    completed: doneAssignmentIds.has(a.id),
  }));
  return {
    moduleId,
    quizzes: quizItems,
    assignments: assignmentItems,
    complete: [...quizItems, ...assignmentItems].every((item) => item.completed),
  };
}

// Returns the outstanding day tasks when `lesson` is held back by the day gate, or null
// when it's open. The day's first lesson is never gated, and neither is a lesson the
// student already completed (so anyone who got ahead before this rule existed can still
// revisit what they've done).
export async function getLessonTaskGate(lesson: Lesson, studentId: string): Promise<ModuleTaskStatus | null> {
  const siblings = await listLessonsForModule(lesson.moduleId);
  if (siblings.length === 0 || siblings[0].id === lesson.id) return null;
  if (await isLessonCompletedByStudent(lesson.id, studentId)) return null;
  const status = await getModuleTaskStatus(lesson.moduleId, studentId);
  return status.complete ? null : status;
}

export interface LessonNavItem {
  id: string;
  title: string;
  weekNumber: number;
}

export interface LessonNavigation {
  course: { id: string; slug: string; title: string };
  module: { id: string; title: string; weekNumber: number };
  previous: LessonNavItem | null;
  next: LessonNavItem | null;
  // Students only: set when `next` is held back by the day gate (quiz/assignment
  // outstanding), so the lesson page can explain why instead of linking to a 403.
  nextTaskGate?: ModuleTaskStatus | null;
}

// Powers the Previous/Next lesson buttons on the lesson page. Navigation stays within
// the current module (ordered by `order`) until a boundary is hit, at which point it
// crosses into the last lesson of the previous module or the first lesson of the next
// one -- ordered by weekNumber then order, so "next" always means "the next thing a
// student would work through," not just "next within this week."
export async function getLessonNavigation(
  lessonId: string,
  requester?: { id: string; role: string },
): Promise<LessonNavigation> {
  const lesson = await getLessonById(lessonId);
  const courseModule = await CourseModule.findByPk(lesson.moduleId);
  if (!courseModule) {
    throw ApiError.notFound("Module not found");
  }
  const course = await Course.findByPk(courseModule.courseId);
  if (!course) {
    throw ApiError.notFound("Course not found");
  }

  const siblingLessons = await listLessonsForModule(courseModule.id);
  const indexInModule = siblingLessons.findIndex((l) => l.id === lesson.id);

  const allModules = await CourseModule.findAll({
    where: { courseId: courseModule.courseId },
    order: [
      ["weekNumber", "ASC"],
      ["order", "ASC"],
    ],
  });
  const moduleIndex = allModules.findIndex((m) => m.id === courseModule.id);

  let previous: LessonNavItem | null = null;
  if (indexInModule > 0) {
    const prevLesson = siblingLessons[indexInModule - 1];
    previous = { id: prevLesson.id, title: prevLesson.title, weekNumber: courseModule.weekNumber };
  } else if (moduleIndex > 0) {
    for (let i = moduleIndex - 1; i >= 0 && !previous; i--) {
      const prevModuleLessons = await listLessonsForModule(allModules[i].id);
      const lastLesson = prevModuleLessons[prevModuleLessons.length - 1];
      if (lastLesson) {
        previous = { id: lastLesson.id, title: lastLesson.title, weekNumber: allModules[i].weekNumber };
      }
    }
  }

  let next: LessonNavItem | null = null;
  if (indexInModule >= 0 && indexInModule < siblingLessons.length - 1) {
    const nextLesson = siblingLessons[indexInModule + 1];
    next = { id: nextLesson.id, title: nextLesson.title, weekNumber: courseModule.weekNumber };
  } else if (moduleIndex >= 0 && moduleIndex < allModules.length - 1) {
    for (let i = moduleIndex + 1; i < allModules.length && !next; i++) {
      const nextModuleLessons = await listLessonsForModule(allModules[i].id);
      const firstLesson = nextModuleLessons[0];
      if (firstLesson) {
        next = { id: firstLesson.id, title: firstLesson.title, weekNumber: allModules[i].weekNumber };
      }
    }
  }

  let nextTaskGate: ModuleTaskStatus | null = null;
  if (requester?.role === "student" && next) {
    const nextLesson = await getLessonById(next.id);
    nextTaskGate = await getLessonTaskGate(nextLesson, requester.id);
  }

  return {
    course: { id: course.id, slug: course.slug, title: course.title },
    module: { id: courseModule.id, title: courseModule.title, weekNumber: courseModule.weekNumber },
    previous,
    next,
    ...(requester?.role === "student" ? { nextTaskGate } : {}),
  };
}

// Powers the dashboard's "Continue" deep link: the first lesson (in course order --
// week/module, then lesson order) that the student hasn't completed yet, so returning
// students land back where they left off instead of the course landing page. Returns
// null for a course with no lessons yet, or once every lesson is complete.
export async function getNextLessonId(courseId: string, studentId: string): Promise<string | null> {
  const modules = await CourseModule.findAll({
    where: { courseId },
    order: [
      ["weekNumber", "ASC"],
      ["order", "ASC"],
    ],
  });

  const lessonIds = await getLessonIdsForCourse(courseId);
  if (lessonIds.length === 0) return null;

  const completedRecords = await ProgressTracking.findAll({
    where: { studentId, lessonId: { [Op.in]: lessonIds } },
    attributes: ["lessonId"],
  });
  const completedIds = new Set(completedRecords.map((r) => r.lessonId));

  for (const courseModule of modules) {
    const lessons = await listLessonsForModule(courseModule.id);
    const nextLesson = lessons.find((lesson) => !completedIds.has(lesson.id));
    if (nextLesson) return nextLesson.id;
  }

  return null;
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

// Gates quiz access: a quiz unlocks once the first lesson of its own module (day) is
// completed -- the quiz then has to be submitted before the rest of the day's lessons
// open (see getLessonTaskGate). It used to need every lesson in the module, which would
// now deadlock against that gate. A module with zero lessons is never locked.
export async function isFirstModuleLessonCompleted(moduleId: string, studentId: string): Promise<boolean> {
  const lessons = await listLessonsForModule(moduleId);
  if (lessons.length === 0) return true;
  return isLessonCompletedByStudent(lessons[0].id, studentId);
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

  // Same day gate as getLessonForStudent: without this a gated lesson could be marked
  // complete straight through the API, which would then exempt it from the gate.
  const taskGate = await getLessonTaskGate(lesson, studentId);
  if (taskGate) {
    throw new ApiError(403, MODULE_TASKS_INCOMPLETE_MESSAGE, {
      code: MODULE_TASKS_INCOMPLETE_CODE,
      ...taskGate,
    });
  }

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
  // For the course page's day gate (see getLessonTaskGate).
  submittedQuizIds: string[];
  submittedAssignmentIds: string[];
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

  const modules = await CourseModule.findAll({ where: { courseId }, attributes: ["id"] });
  const moduleIds = modules.map((m) => m.id);
  const [quizzes, assignments] =
    moduleIds.length === 0
      ? [[], []]
      : await Promise.all([
          Quiz.findAll({ where: { moduleId: { [Op.in]: moduleIds } }, attributes: ["id"] }),
          Assignment.findAll({ where: { moduleId: { [Op.in]: moduleIds } }, attributes: ["id"] }),
        ]);
  const [attempts, submissions] = await Promise.all([
    quizzes.length === 0
      ? []
      : QuizAttempt.findAll({
          where: {
            studentId,
            quizId: { [Op.in]: quizzes.map((q) => q.id) },
            status: { [Op.in]: ["submitted", "graded"] },
          },
          attributes: ["quizId"],
        }),
    assignments.length === 0
      ? []
      : AssignmentSubmission.findAll({
          where: { studentId, assignmentId: { [Op.in]: assignments.map((a) => a.id) } },
          attributes: ["assignmentId"],
        }),
  ]);

  return {
    totalLessons: lessonIds.length,
    completedLessons: completedRecords.length,
    progressPercent: enrollment.progressPercent,
    completedLessonIds: completedRecords.map((r) => r.lessonId),
    submittedQuizIds: [...new Set(attempts.map((a) => a.quizId))],
    submittedAssignmentIds: [...new Set(submissions.map((s) => s.assignmentId))],
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
