import { Op } from "sequelize";
import {
  Assignment,
  AssignmentSubmission,
  Capstone,
  CapstoneSubmission,
  Course,
  CourseModule,
  Enrollment,
  Lesson,
  ProgressTracking,
  Quiz,
  QuizAttempt,
  User,
} from "../models";

// Admin "Course progress" view: for every course, each enrolled candidate's progress
// through it. Lesson counting matches lesson.service.ts (every lesson in every module of
// the course, ordered by week, module order, lesson order), so "lessons done" here agrees
// with the progress bar the student sees. Everything is fetched in a handful of bulk
// queries and grouped in memory -- the candidate count is small enough that this beats a
// per-enrollment query fan-out by a wide margin.

// A paid candidate who hasn't completed a lesson, quiz or submission for this long is
// flagged as stalled, so the admin knows whom to nudge.
export const STALLED_AFTER_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

export type ProgressState = "awaiting_payment" | "not_started" | "in_progress" | "stalled" | "completed";

export interface CandidateCourseProgress {
  enrollmentId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentConfirmed: boolean;
  enrolledAt: Date;
  completedAt: Date | null;
  lessonsCompleted: number;
  lessonsTotal: number;
  progressPercent: number;
  quizzesSubmitted: number;
  quizzesTotal: number;
  assignmentsSubmitted: number;
  assignmentsTotal: number;
  capstoneSubmitted: boolean | null;
  currentWeek: number | null;
  nextLessonTitle: string | null;
  lastProgressAt: Date | null;
  lastActiveAt: Date | null;
  state: ProgressState;
}

export interface CourseProgressSummary {
  courseId: string;
  title: string;
  slug: string;
  status: string;
  totals: {
    enrolled: number;
    paid: number;
    notStarted: number;
    inProgress: number;
    stalled: number;
    completed: number;
    averageProgressPercent: number | null;
  };
  candidates: CandidateCourseProgress[];
}

function maxDate(dates: (Date | null | undefined)[]): Date | null {
  let latest: Date | null = null;
  for (const d of dates) {
    if (d && (!latest || d > latest)) latest = d;
  }
  return latest;
}

function groupBy<T, K>(items: T[], key: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const k = key(item);
    const list = map.get(k);
    if (list) list.push(item);
    else map.set(k, [item]);
  }
  return map;
}

export async function getCourseProgressOverview(now = new Date()): Promise<CourseProgressSummary[]> {
  const enrollments = await Enrollment.findAll({
    where: { status: { [Op.notIn]: ["dropped"] } },
    include: [
      {
        model: User,
        as: "student",
        attributes: ["id", "firstName", "lastName", "email", "lastActiveAt", "role", "status"],
      },
    ],
    order: [["enrolledDate", "DESC"]],
  });
  // Only real candidates: admins/instructors enrolled for testing, and deactivated
  // accounts, would otherwise skew every course's averages.
  const candidateEnrollments = enrollments.filter((e) => {
    const student = (e as unknown as { student?: User }).student;
    return student && student.role === "student" && student.status === "active";
  });

  const courseIds = [...new Set(candidateEnrollments.map((e) => e.courseId))];
  const courses = await Course.findAll({
    where: { [Op.or]: [{ id: courseIds }, { status: "published" }] },
    order: [["title", "ASC"]],
  });
  const allCourseIds = courses.map((c) => c.id);
  if (allCourseIds.length === 0) return [];

  const modules = await CourseModule.findAll({
    where: { courseId: allCourseIds },
    order: [["weekNumber", "ASC"], ["order", "ASC"]],
  });
  const moduleIds = modules.map((m) => m.id);
  const moduleById = new Map(modules.map((m) => [m.id, m]));

  const [lessons, quizzes, assignments, capstones] = await Promise.all([
    moduleIds.length ? Lesson.findAll({ where: { moduleId: moduleIds }, attributes: ["id", "moduleId", "title", "order"] }) : [],
    moduleIds.length ? Quiz.findAll({ where: { moduleId: moduleIds, isEnabled: true }, attributes: ["id", "moduleId"] }) : [],
    moduleIds.length ? Assignment.findAll({ where: { moduleId: moduleIds }, attributes: ["id", "moduleId"] }) : [],
    Capstone.findAll({ where: { courseId: allCourseIds, isEnabled: true }, attributes: ["id", "courseId"] }),
  ]);

  const studentIds = [...new Set(candidateEnrollments.map((e) => e.studentId))];
  const [progressRows, quizAttempts, submissions, capstoneSubmissions] =
    studentIds.length === 0
      ? [[], [], [], []]
      : await Promise.all([
          lessons.length
            ? ProgressTracking.findAll({
                where: { studentId: studentIds, lessonId: lessons.map((l) => l.id) },
                attributes: ["studentId", "lessonId", "completedAt"],
              })
            : [],
          quizzes.length
            ? QuizAttempt.findAll({
                where: {
                  studentId: studentIds,
                  quizId: quizzes.map((q) => q.id),
                  status: { [Op.in]: ["submitted", "graded"] },
                },
                attributes: ["studentId", "quizId", "endTime"],
              })
            : [],
          assignments.length
            ? AssignmentSubmission.findAll({
                where: { studentId: studentIds, assignmentId: assignments.map((a) => a.id) },
                attributes: ["studentId", "assignmentId", "submissionDate"],
              })
            : [],
          capstones.length
            ? CapstoneSubmission.findAll({
                where: { studentId: studentIds, capstoneId: capstones.map((c) => c.id) },
                attributes: ["studentId", "capstoneId", "submissionDate"],
              })
            : [],
        ]);

  const courseIdOfModule = (moduleId: string) => moduleById.get(moduleId)?.courseId;

  // Lessons per course in the order a student meets them -- the first one not yet done is
  // "next", and its module's week is the candidate's current week.
  const moduleRank = new Map(modules.map((m, i) => [m.id, i]));
  const lessonsByCourse = groupBy(
    [...lessons].sort(
      (a, b) => (moduleRank.get(a.moduleId) ?? 0) - (moduleRank.get(b.moduleId) ?? 0) || a.order - b.order,
    ),
    (l) => courseIdOfModule(l.moduleId),
  );
  const quizzesByCourse = groupBy(quizzes, (q) => courseIdOfModule(q.moduleId));
  const assignmentsByCourse = groupBy(assignments, (a) => courseIdOfModule(a.moduleId));
  const capstonesByCourse = groupBy(capstones, (c) => c.courseId);

  const progressByStudent = groupBy(progressRows, (r) => r.studentId);
  const quizAttemptsByStudent = groupBy(quizAttempts, (a) => a.studentId);
  const submissionsByStudent = groupBy(submissions, (s) => s.studentId);
  const capstoneSubsByStudent = groupBy(capstoneSubmissions, (s) => s.studentId);

  const enrollmentsByCourse = groupBy(candidateEnrollments, (e) => e.courseId);

  return courses.map((course) => {
    const courseLessons = lessonsByCourse.get(course.id) ?? [];
    const courseQuizIds = new Set((quizzesByCourse.get(course.id) ?? []).map((q) => q.id));
    const courseAssignmentIds = new Set((assignmentsByCourse.get(course.id) ?? []).map((a) => a.id));
    const courseCapstoneIds = new Set((capstonesByCourse.get(course.id) ?? []).map((c) => c.id));

    const candidates = (enrollmentsByCourse.get(course.id) ?? []).map((enrollment): CandidateCourseProgress => {
      const student = (enrollment as unknown as { student: User }).student;

      const completedAtByLesson = new Map(
        (progressByStudent.get(student.id) ?? []).map((r) => [r.lessonId, r.completedAt]),
      );
      const doneLessons = courseLessons.filter((l) => completedAtByLesson.has(l.id));
      const nextLesson = courseLessons.find((l) => !completedAtByLesson.has(l.id)) ?? null;

      const attempts = (quizAttemptsByStudent.get(student.id) ?? []).filter((a) => courseQuizIds.has(a.quizId));
      const quizzesSubmitted = new Set(attempts.map((a) => a.quizId)).size;
      const subs = (submissionsByStudent.get(student.id) ?? []).filter((s) => courseAssignmentIds.has(s.assignmentId));
      const assignmentsSubmitted = new Set(subs.map((s) => s.assignmentId)).size;
      const capSubs = (capstoneSubsByStudent.get(student.id) ?? []).filter((s) => courseCapstoneIds.has(s.capstoneId));

      const lastProgressAt = maxDate([
        ...doneLessons.map((l) => completedAtByLesson.get(l.id)),
        ...attempts.map((a) => a.endTime),
        ...subs.map((s) => s.submissionDate),
        ...capSubs.map((s) => s.submissionDate),
      ]);

      const lessonsTotal = courseLessons.length;
      const progressPercent = lessonsTotal > 0 ? Math.round((100 * doneLessons.length) / lessonsTotal) : 0;
      const anyProgress = doneLessons.length > 0 || attempts.length > 0 || subs.length > 0 || capSubs.length > 0;

      let state: ProgressState;
      if (enrollment.status === "completed" || (lessonsTotal > 0 && doneLessons.length === lessonsTotal)) {
        state = "completed";
      } else if (!enrollment.paymentConfirmed) {
        state = "awaiting_payment";
      } else if (!anyProgress) {
        state = "not_started";
      } else {
        const since = lastProgressAt ?? enrollment.paymentConfirmedAt ?? enrollment.enrolledDate;
        state = now.getTime() - since.getTime() > STALLED_AFTER_DAYS * DAY_MS ? "stalled" : "in_progress";
      }

      return {
        enrollmentId: enrollment.id,
        studentId: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        paymentConfirmed: enrollment.paymentConfirmed,
        enrolledAt: enrollment.enrolledDate,
        completedAt: enrollment.completionDate,
        lessonsCompleted: doneLessons.length,
        lessonsTotal,
        progressPercent,
        quizzesSubmitted,
        quizzesTotal: courseQuizIds.size,
        assignmentsSubmitted,
        assignmentsTotal: courseAssignmentIds.size,
        capstoneSubmitted: courseCapstoneIds.size > 0 ? capSubs.length > 0 : null,
        currentWeek: nextLesson ? (moduleById.get(nextLesson.moduleId)?.weekNumber ?? null) : null,
        nextLessonTitle: nextLesson?.title ?? null,
        lastProgressAt,
        lastActiveAt: student.lastActiveAt,
        state,
      };
    });

    const paid = candidates.filter((c) => c.paymentConfirmed);
    return {
      courseId: course.id,
      title: course.title,
      slug: course.slug,
      status: course.status,
      totals: {
        enrolled: candidates.length,
        paid: paid.length,
        notStarted: candidates.filter((c) => c.state === "not_started").length,
        inProgress: candidates.filter((c) => c.state === "in_progress").length,
        stalled: candidates.filter((c) => c.state === "stalled").length,
        completed: candidates.filter((c) => c.state === "completed").length,
        // Averaged over paid candidates only: unpaid ones can't open lessons yet, so
        // including them would drag every course toward 0% for a billing reason.
        averageProgressPercent:
          paid.length > 0 ? Math.round(paid.reduce((sum, c) => sum + c.progressPercent, 0) / paid.length) : null,
      },
      candidates,
    };
  });
}
