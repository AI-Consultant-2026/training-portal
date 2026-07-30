import { col, fn, Op } from "sequelize";
import {
  AssignmentSubmission,
  Course,
  Enrollment,
  Quiz,
  QuizAttempt,
  User,
} from "../models";

// Sequelize's typed findAll() return type doesn't vary with the runtime `raw: true`
// option, so aggregate/grouped queries (which return plain rows, not model instances)
// need this narrower, honest signature rather than fighting the models' real typings.
interface FindAllRaw {
  findAll(opts: object): Promise<Record<string, unknown>[]>;
}

async function countGroupedBy<K extends string>(
  model: unknown,
  column: string,
  keys: readonly K[],
): Promise<Record<K, number>> {
  const rows = await (model as FindAllRaw).findAll({
    attributes: [column, [fn("COUNT", col("id")), "count"]],
    group: [column],
    raw: true,
  });

  const result = Object.fromEntries(keys.map((k) => [k, 0])) as Record<K, number>;
  for (const row of rows) {
    const key = row[column] as K;
    result[key] = Number(row.count);
  }
  return result;
}

async function average(model: unknown, column: string, where?: object): Promise<number | null> {
  const [row] = await (model as FindAllRaw).findAll({
    where,
    attributes: [[fn("AVG", col(column)), "avg"]],
    raw: true,
  });
  const avg = row?.avg as string | null | undefined;
  return avg === null || avg === undefined ? null : Math.round(Number(avg));
}

export async function getDashboardStats() {
  const [usersTotal, usersByRole] = await Promise.all([
    User.count(),
    countGroupedBy(User, "role", ["student", "instructor", "admin"] as const),
  ]);

  const [coursesTotal, coursesByStatus, courses, enrollmentCountsByCourse] = await Promise.all([
    Course.count(),
    countGroupedBy(Course, "status", ["draft", "published", "archived"] as const),
    Course.findAll({ attributes: ["id", "title", "status"] }),
    // One grouped query instead of counting per course, to avoid N+1 lookups.
    (Enrollment as unknown as FindAllRaw).findAll({
      attributes: ["courseId", [fn("COUNT", col("id")), "count"]],
      group: ["courseId"],
      raw: true,
    }) as Promise<{ courseId: string; count: string }[]>,
  ]);
  const enrollmentCountByCourseId = new Map(
    enrollmentCountsByCourse.map((row) => [row.courseId, Number(row.count)]),
  );
  const courseList = courses.map((c) => ({
    id: c.id,
    title: c.title,
    status: c.status,
    enrollmentCount: enrollmentCountByCourseId.get(c.id) ?? 0,
  }));

  const [enrollmentsTotal, enrollmentsByStatus, averageProgressPercent] = await Promise.all([
    Enrollment.count(),
    countGroupedBy(Enrollment, "status", ["active", "completed", "dropped", "suspended"] as const),
    average(Enrollment, "progress_percent"),
  ]);

  const [assignmentsTotal, assignmentsPending, assignmentsGraded, assignmentsAverageScore] =
    await Promise.all([
      AssignmentSubmission.count(),
      AssignmentSubmission.count({ where: { status: "submitted" } }),
      AssignmentSubmission.count({ where: { status: ["graded", "returned"] } }),
      average(AssignmentSubmission, "score", { score: { [Op.ne]: null } }),
    ]);

  const [quizzesTotal, quizzesPending, quizzesGraded, quizzesAverageScore, gradedAttempts] =
    await Promise.all([
      QuizAttempt.count(),
      QuizAttempt.count({ where: { status: "submitted" } }),
      QuizAttempt.count({ where: { status: "graded" } }),
      average(QuizAttempt, "score", { status: "graded" }),
      // Computed in JS rather than a cross-table SQL comparison (score >= quiz.passing_score):
      // not designed for huge attempt volumes, but simpler and safer than col()-based joins,
      // which this codebase has no precedent for and are easy to get subtly wrong.
      QuizAttempt.findAll({
        where: { status: "graded" },
        include: [{ model: Quiz, as: "quiz", attributes: ["passingScore"] }],
      }),
    ]);
  const passed = gradedAttempts.filter(
    (a) => (a.score ?? 0) >= (a as unknown as { quiz: Quiz }).quiz.passingScore,
  ).length;
  const passRate = gradedAttempts.length > 0 ? Math.round((100 * passed) / gradedAttempts.length) : null;

  return {
    users: { total: usersTotal, byRole: usersByRole },
    courses: { total: coursesTotal, byStatus: coursesByStatus, list: courseList },
    enrollments: {
      total: enrollmentsTotal,
      byStatus: enrollmentsByStatus,
      averageProgressPercent,
    },
    assignments: {
      totalSubmissions: assignmentsTotal,
      pendingGrading: assignmentsPending,
      graded: assignmentsGraded,
      averageScore: assignmentsAverageScore,
    },
    quizzes: {
      totalAttempts: quizzesTotal,
      pendingGrading: quizzesPending,
      graded: quizzesGraded,
      averageScore: quizzesAverageScore,
      passRate,
    },
  };
}
