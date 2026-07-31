import * as emails from "../emails";
import {
  Course,
  CourseModule,
  Enrollment,
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  QuizResponse,
  User,
  sequelize,
} from "../models";
import { ApiError } from "../utils/ApiError";
import { shuffle } from "../utils/shuffle";

interface SubmitResponseInput {
  questionId: string;
  studentAnswer: string;
}

async function getQuizWithCourse(quizId: string) {
  const quiz = await Quiz.findByPk(quizId);
  if (!quiz) {
    throw ApiError.notFound("Quiz not found");
  }
  const courseModule = await CourseModule.findByPk(quiz.moduleId);
  if (!courseModule) {
    throw ApiError.notFound("Module not found");
  }
  const course = await Course.findByPk(courseModule.courseId);
  if (!course) {
    throw ApiError.notFound("Course not found");
  }
  return { quiz, courseModule, course };
}

async function assertEnrolled(courseId: string, studentId: string) {
  const enrollment = await Enrollment.findOne({ where: { courseId, studentId, status: "active" } });
  if (!enrollment) {
    throw ApiError.forbidden("You must be enrolled in this course to access this quiz");
  }
}

async function assertCanViewCourse(course: Course, user: { id: string; role: string }) {
  if (user.role === "admin") return;
  if (user.role === "instructor" && course.instructorId === user.id) return;
  if (user.role === "student") return;
  throw ApiError.forbidden("You do not have permission to access this quiz");
}

function serializeQuiz(quiz: Quiz) {
  return {
    id: quiz.id,
    moduleId: quiz.moduleId,
    title: quiz.title,
    description: quiz.description,
    dueDate: quiz.dueDate,
    timeLimitMinutes: quiz.timeLimitMinutes,
    passingScore: quiz.passingScore,
    questionCount: quiz.questionCount,
    shuffleQuestions: quiz.shuffleQuestions,
  };
}

// Student-facing DTO: never includes which answer is correct.
function serializeQuestionForAttempt(question: QuizQuestion, answers: QuizAnswer[]) {
  return {
    id: question.id,
    questionText: question.questionText,
    questionType: question.questionType,
    points: question.points,
    order: question.order,
    answers: answers.map((a) => ({ id: a.id, answerText: a.answerText, order: a.order })),
  };
}

// Only used once an attempt is fully graded, safe to reveal correctness/explanation.
function serializeGradedResponse(
  response: QuizResponse,
  question: QuizQuestion | undefined,
  answers: QuizAnswer[],
) {
  return {
    id: response.id,
    questionId: response.questionId,
    questionText: question?.questionText ?? null,
    studentAnswer: response.studentAnswer,
    isCorrect: response.isCorrect,
    pointsEarned: response.pointsEarned,
    points: question?.points ?? null,
    explanation: question?.explanation ?? null,
    answers: answers.map((a) => ({ id: a.id, answerText: a.answerText, isCorrect: a.isCorrect })),
  };
}

function assertInstructorOwnsCourse(course: Course, user: { id: string; role: string }) {
  if (user.role === "admin") return;
  if (user.role === "instructor" && course.instructorId === user.id) return;
  throw ApiError.forbidden("You do not have permission to access this quiz");
}

export async function listByModule(moduleId: string): Promise<ReturnType<typeof serializeQuiz>[]> {
  const quizzes = await Quiz.findAll({ where: { moduleId }, order: [["createdAt", "ASC"]] });
  return quizzes.map(serializeQuiz);
}

export async function getById(quizId: string) {
  const { quiz } = await getQuizWithCourse(quizId);
  return serializeQuiz(quiz);
}

export async function start(quizId: string, studentId: string) {
  const { quiz, course } = await getQuizWithCourse(quizId);
  await assertEnrolled(course.id, studentId);

  const existing = await QuizAttempt.findOne({
    where: { quizId, studentId, status: "in_progress" },
  });

  let attempt = existing;
  if (!attempt) {
    const maxAttemptNumber = await QuizAttempt.max("attemptNumber", { where: { quizId, studentId } });
    try {
      attempt = await QuizAttempt.create({
        quizId,
        studentId,
        attemptNumber: (typeof maxAttemptNumber === "number" ? maxAttemptNumber : 0) + 1,
      });
    } catch (err) {
      // A concurrent start() call (double-click, retry, StrictMode's dev double-invoke)
      // may have won the race and already inserted the in-progress attempt; the partial
      // unique index on (quiz_id, student_id) WHERE status='in_progress' rejects ours.
      // Re-fetch and use whichever attempt actually landed, instead of erroring.
      if (err && typeof err === "object" && "name" in err && (err as { name: string }).name === "SequelizeUniqueConstraintError") {
        attempt = await QuizAttempt.findOne({ where: { quizId, studentId, status: "in_progress" } });
        if (!attempt) throw err;
      } else {
        throw err;
      }
    }
  }

  // Question selection isn't persisted per-attempt (no extra table); with question_count
  // equal to the full bank in seed data this is stable across refreshes, but if a quiz's
  // question_count is ever smaller than its total bank, a refresh could re-draw a different
  // random subset. Acceptable known limitation per the approved plan.
  const questions = await QuizQuestion.findAll({
    where: { quizId },
    order: quiz.shuffleQuestions ? sequelize.random() : [["order", "ASC"]],
    limit: quiz.questionCount,
  });

  const questionDtos = await Promise.all(
    questions.map(async (q) => {
      let answers = await QuizAnswer.findAll({ where: { questionId: q.id }, order: [["order", "ASC"]] });
      if (quiz.shuffleQuestions) {
        answers = shuffle(answers);
      }
      return serializeQuestionForAttempt(q, answers);
    }),
  );

  return {
    attempt: {
      id: attempt.id,
      quizId: attempt.quizId,
      startTime: attempt.startTime,
      attemptNumber: attempt.attemptNumber,
      status: attempt.status,
    },
    quiz: serializeQuiz(quiz),
    questions: questionDtos,
  };
}

export async function submit(attemptId: string, studentId: string, responses: SubmitResponseInput[]) {
  const attempt = await QuizAttempt.findByPk(attemptId);
  if (!attempt) {
    throw ApiError.notFound("Attempt not found");
  }
  if (attempt.studentId !== studentId) {
    throw ApiError.forbidden("This is not your attempt");
  }
  if (attempt.status !== "in_progress") {
    throw ApiError.conflict("This attempt has already been submitted");
  }

  const quiz = await Quiz.findByPk(attempt.quizId);
  if (!quiz) {
    throw ApiError.notFound("Quiz not found");
  }

  const questions = await QuizQuestion.findAll({ where: { quizId: attempt.quizId } });
  const questionsById = new Map(questions.map((q) => [q.id, q]));

  const responseRows: {
    attemptId: string;
    questionId: string;
    studentAnswer: string;
    isCorrect: boolean | null;
    pointsEarned: number | null;
  }[] = [];

  for (const r of responses) {
    const question = questionsById.get(r.questionId);
    if (!question) continue;

    if (question.questionType === "short_answer") {
      responseRows.push({
        attemptId,
        questionId: r.questionId,
        studentAnswer: r.studentAnswer,
        isCorrect: null,
        pointsEarned: null,
      });
      continue;
    }

    const answers = await QuizAnswer.findAll({ where: { questionId: question.id } });
    const matched = answers.find((a) => a.id === r.studentAnswer);
    const isCorrect = Boolean(matched?.isCorrect);
    responseRows.push({
      attemptId,
      questionId: r.questionId,
      studentAnswer: r.studentAnswer,
      isCorrect,
      pointsEarned: isCorrect ? question.points : 0,
    });
  }

  await QuizResponse.bulkCreate(responseRows);

  const hasPendingManualReview = responseRows.some((r) => r.isCorrect === null);
  const timedOut = Boolean(
    quiz.timeLimitMinutes &&
      Date.now() > attempt.startTime.getTime() + quiz.timeLimitMinutes * 60_000,
  );

  attempt.endTime = new Date();
  if (hasPendingManualReview) {
    attempt.status = "submitted";
    attempt.score = null;
  } else {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = responseRows.reduce((sum, r) => sum + (r.pointsEarned ?? 0), 0);
    attempt.score = totalPoints > 0 ? Math.round((100 * earnedPoints) / totalPoints) : 0;
    attempt.status = "graded";
  }
  await attempt.save();

  const savedResponses = await QuizResponse.findAll({ where: { attemptId } });
  const gradedResponses = await Promise.all(
    savedResponses.map(async (r) => {
      const question = questionsById.get(r.questionId);
      const answers = question ? await QuizAnswer.findAll({ where: { questionId: question.id } }) : [];
      return serializeGradedResponse(r, question, answers);
    }),
  );

  return {
    attempt: {
      id: attempt.id,
      quizId: attempt.quizId,
      status: attempt.status,
      score: attempt.score,
      startTime: attempt.startTime,
      endTime: attempt.endTime,
      attemptNumber: attempt.attemptNumber,
    },
    responses: attempt.status === "graded" ? gradedResponses : [],
    timedOut,
    passed: attempt.status === "graded" ? (attempt.score ?? 0) >= quiz.passingScore : null,
  };
}

export async function getAttempt(quizId: string, attemptId: string, user: { id: string; role: string }) {
  const { course } = await getQuizWithCourse(quizId);
  const attempt = await QuizAttempt.findByPk(attemptId);
  if (!attempt || attempt.quizId !== quizId) {
    throw ApiError.notFound("Attempt not found");
  }

  if (user.role === "student") {
    if (attempt.studentId !== user.id) {
      throw ApiError.forbidden("You do not have permission to view this attempt");
    }
  } else {
    await assertCanViewCourse(course, user);
    if (user.role === "instructor" && course.instructorId !== user.id) {
      throw ApiError.forbidden("You do not have permission to view this attempt");
    }
  }

  const canSeeResponses =
    attempt.status === "graded" || (attempt.status === "submitted" && user.role !== "student");
  const responses = canSeeResponses ? await QuizResponse.findAll({ where: { attemptId } }) : [];
  const questions = await QuizQuestion.findAll({ where: { quizId } });
  const questionsById = new Map(questions.map((q) => [q.id, q]));

  const gradedResponses = await Promise.all(
    responses.map(async (r) => {
      const question = questionsById.get(r.questionId);
      const answers = question ? await QuizAnswer.findAll({ where: { questionId: question.id } }) : [];
      return serializeGradedResponse(r, question, answers);
    }),
  );

  return {
    id: attempt.id,
    quizId: attempt.quizId,
    studentId: attempt.studentId,
    status: attempt.status,
    score: attempt.score,
    startTime: attempt.startTime,
    endTime: attempt.endTime,
    attemptNumber: attempt.attemptNumber,
    responses: gradedResponses,
  };
}

export async function listMyAttempts(quizId: string, studentId: string) {
  await getQuizWithCourse(quizId);
  const attempts = await QuizAttempt.findAll({
    where: { quizId, studentId },
    order: [["attemptNumber", "ASC"]],
  });

  const bestScore = attempts.reduce<number | null>((best, a) => {
    if (a.status !== "graded" || a.score === null) return best;
    return best === null ? a.score : Math.max(best, a.score);
  }, null);

  return {
    attempts: attempts.map((a) => ({
      id: a.id,
      status: a.status,
      score: a.score,
      startTime: a.startTime,
      endTime: a.endTime,
      attemptNumber: a.attemptNumber,
    })),
    bestScore,
  };
}

export async function listPendingReviewsForInstructor(user: { id: string; role: string }) {
  const courseWhere = user.role === "admin" ? {} : { instructorId: user.id };
  const courses = await Course.findAll({ where: courseWhere });
  const courseIds = courses.map((c) => c.id);
  if (courseIds.length === 0) return [];

  const modules = await CourseModule.findAll({ where: { courseId: courseIds } });
  const moduleIds = modules.map((m) => m.id);
  if (moduleIds.length === 0) return [];

  const quizzes = await Quiz.findAll({ where: { moduleId: moduleIds } });
  const quizIds = quizzes.map((q) => q.id);
  if (quizIds.length === 0) return [];

  const attempts = await QuizAttempt.findAll({
    where: { quizId: quizIds, status: "submitted" },
    order: [["endTime", "ASC"]],
  });

  const quizById = new Map(quizzes.map((q) => [q.id, q]));
  return attempts.map((a) => ({
    id: a.id,
    quizId: a.quizId,
    quizTitle: quizById.get(a.quizId)?.title ?? null,
    studentId: a.studentId,
    endTime: a.endTime,
    attemptNumber: a.attemptNumber,
  }));
}

interface GradeResponseInput {
  responseId: string;
  pointsEarned: number;
}

export async function gradeAttempt(
  attemptId: string,
  user: { id: string; role: string },
  grades: GradeResponseInput[],
) {
  const attempt = await QuizAttempt.findByPk(attemptId);
  if (!attempt) {
    throw ApiError.notFound("Attempt not found");
  }
  const { quiz, course } = await getQuizWithCourse(attempt.quizId);
  assertInstructorOwnsCourse(course, user);

  await sequelize.transaction(async (transaction) => {
    const lockedAttempt = await QuizAttempt.findByPk(attemptId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!lockedAttempt) {
      throw ApiError.notFound("Attempt not found");
    }
    if (lockedAttempt.status !== "submitted") {
      throw ApiError.conflict(
        lockedAttempt.status === "in_progress"
          ? "This attempt has not been submitted yet"
          : "This attempt has already been graded",
      );
    }

    const questions = await QuizQuestion.findAll({ where: { quizId: lockedAttempt.quizId }, transaction });
    const questionsById = new Map(questions.map((q) => [q.id, q]));

    const responses = await QuizResponse.findAll({ where: { attemptId }, transaction });
    const responsesById = new Map(responses.map((r) => [r.id, r]));
    const pendingIds = new Set(responses.filter((r) => r.isCorrect === null).map((r) => r.id));

    const submittedIds = new Set(grades.map((g) => g.responseId));
    const missing = [...pendingIds].filter((id) => !submittedIds.has(id));
    const unexpected = grades
      .map((g) => g.responseId)
      .filter((id) => !pendingIds.has(id));
    if (missing.length > 0 || unexpected.length > 0) {
      throw ApiError.badRequest("Grades must cover exactly the pending responses for this attempt", {
        missing,
        unexpected,
      });
    }

    for (const grade of grades) {
      const response = responsesById.get(grade.responseId)!;
      const question = questionsById.get(response.questionId);
      if (!question) {
        throw ApiError.badRequest(`Unknown question for response ${grade.responseId}`);
      }
      if (grade.pointsEarned < 0 || grade.pointsEarned > question.points) {
        throw ApiError.badRequest(`pointsEarned for response ${grade.responseId} must be between 0 and ${question.points}`);
      }
      response.pointsEarned = grade.pointsEarned;
      response.isCorrect = grade.pointsEarned >= question.points;
      response.markedAt = new Date();
      await response.save({ transaction });
    }

    const allResponses = await QuizResponse.findAll({ where: { attemptId }, transaction });
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = allResponses.reduce((sum, r) => sum + (r.pointsEarned ?? 0), 0);
    lockedAttempt.score = totalPoints > 0 ? Math.round((100 * earnedPoints) / totalPoints) : 0;
    lockedAttempt.status = "graded";
    await lockedAttempt.save({ transaction });
  });

  const result = await getAttempt(attempt.quizId, attemptId, user);

  const student = await User.findByPk(attempt.studentId);
  if (student) {
    await emails.sendQuizGradedEmail(student, quiz, course, result.score);
  }

  return result;
}
