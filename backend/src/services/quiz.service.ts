import {
  Course,
  CourseModule,
  Enrollment,
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  QuizResponse,
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
    questionId: response.questionId,
    questionText: question?.questionText ?? null,
    studentAnswer: response.studentAnswer,
    isCorrect: response.isCorrect,
    pointsEarned: response.pointsEarned,
    explanation: question?.explanation ?? null,
    answers: answers.map((a) => ({ id: a.id, answerText: a.answerText, isCorrect: a.isCorrect })),
  };
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
    attempt = await QuizAttempt.create({
      quizId,
      studentId,
      attemptNumber: (typeof maxAttemptNumber === "number" ? maxAttemptNumber : 0) + 1,
    });
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

  const responses = attempt.status === "graded" ? await QuizResponse.findAll({ where: { attemptId } }) : [];
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
