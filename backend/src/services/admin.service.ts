import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { col, fn, Op } from "sequelize";
import { config } from "../config";
import {
  AssignmentSubmission,
  Capstone,
  CapstoneSubmission,
  Course,
  CourseModule,
  Enrollment,
  Lead,
  Payment,
  Quiz,
  QuizAttempt,
  User,
} from "../models";
import * as authService from "./auth.service";
import * as enrollmentService from "./enrollment.service";
import { ApiError } from "../utils/ApiError";

// A candidate counts as "online" if their last heartbeat was within this window. The
// frontend pings every ~60s while a session is active, so a few missed beats still read
// as online before falling back to "last seen X ago".
const ONLINE_THRESHOLD_MS = 5 * 60 * 1000;

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

  const [capstonesTotal, capstonesPending, capstonesGraded, capstonesAverageScore] = await Promise.all([
    CapstoneSubmission.count(),
    CapstoneSubmission.count({ where: { status: "submitted" } }),
    CapstoneSubmission.count({ where: { status: ["graded", "returned"] } }),
    average(CapstoneSubmission, "score", { score: { [Op.ne]: null } }),
  ]);

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
    capstones: {
      totalSubmissions: capstonesTotal,
      pendingGrading: capstonesPending,
      graded: capstonesGraded,
      averageScore: capstonesAverageScore,
    },
    payments: await getPaymentsOverview(),
  };
}

async function getPaymentsOverview() {
  const courses = await Course.findAll({ attributes: ["id", "title"] });
  const rows = (await (Enrollment as unknown as FindAllRaw).findAll({
    attributes: ["courseId", "paymentConfirmed", [fn("COUNT", col("id")), "count"]],
    group: ["courseId", "paymentConfirmed"],
    raw: true,
  })) as unknown as { courseId: string; paymentConfirmed: boolean; count: string }[];

  return courses.map((course) => {
    const courseRows = rows.filter((r) => r.courseId === course.id);
    const confirmed = courseRows.find((r) => r.paymentConfirmed)?.count ?? "0";
    const pending = courseRows.find((r) => !r.paymentConfirmed)?.count ?? "0";
    return {
      courseId: course.id,
      courseTitle: course.title,
      paymentConfirmed: Number(confirmed),
      paymentPending: Number(pending),
    };
  });
}

// Drill-down behind the paid/pending counts in getPaymentsOverview -- who, specifically,
// is in that count for a given course.
export async function listCoursePayments(courseId: string, status: "confirmed" | "pending") {
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw ApiError.notFound("Course not found");
  }

  const enrollments = await Enrollment.findAll({
    where: { courseId, paymentConfirmed: status === "confirmed" },
    include: [
      { model: User, as: "student", attributes: ["id", "firstName", "lastName", "email"] },
      { model: Payment, as: "payments" },
    ],
    order: [["enrolledDate", "DESC"]],
  });

  return enrollments.map((e) => {
    const student = (e as unknown as { student: User }).student;
    return {
      enrollmentId: e.id,
      studentId: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      paymentConfirmed: e.paymentConfirmed,
      paymentConfirmedAt: e.paymentConfirmedAt,
      enrolledAt: e.enrolledDate,
      latestPayment: serializeLatestPayment(
        (e as unknown as { payments?: Payment[] }).payments ?? [],
      ),
    };
  });
}

function isOnline(lastActiveAt: Date | null): boolean {
  return lastActiveAt !== null && Date.now() - lastActiveAt.getTime() < ONLINE_THRESHOLD_MS;
}

// Most recent payment attempt among the given ones, if any -- surfaced mainly for
// pending bank transfers, so the admin has the reference to look up when reconciling
// their bank account before ticking "payment confirmed".
function serializeLatestPayment(payments: Payment[]) {
  const latestPayment = [...payments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];
  return latestPayment
    ? {
        method: latestPayment.method,
        status: latestPayment.status,
        currency: latestPayment.currency,
        amount: latestPayment.amount,
        gatewayReference: latestPayment.gatewayReference,
        notes: latestPayment.notes,
        createdAt: latestPayment.createdAt,
      }
    : null;
}

function serializeCandidate(user: User) {
  const enrollments = ((user as unknown as { enrollments?: Enrollment[] }).enrollments ?? []).map(
    (e) => ({
      id: e.id,
      courseId: e.courseId,
      courseTitle: (e as unknown as { course?: Course }).course?.title ?? null,
      status: e.status,
      progressPercent: e.progressPercent,
      paymentConfirmed: e.paymentConfirmed,
      paymentConfirmedAt: e.paymentConfirmedAt,
      latestPayment: serializeLatestPayment(
        (e as unknown as { payments?: Payment[] }).payments ?? [],
      ),
    }),
  );

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status,
    location: user.location,
    courseInterest: user.courseInterest,
    createdAt: user.createdAt,
    online: isOnline(user.lastActiveAt),
    lastActiveAt: user.lastActiveAt,
    enrollments,
  };
}

const CANDIDATE_ENROLLMENTS_INCLUDE = [
  {
    model: Enrollment,
    as: "enrollments",
    include: [
      { model: Course, as: "course" },
      { model: Payment, as: "payments" },
    ],
  },
];

export async function listCandidates() {
  const candidates = await User.findAll({
    where: { role: "student" },
    include: CANDIDATE_ENROLLMENTS_INCLUDE,
    order: [["createdAt", "DESC"]],
  });
  return candidates.map(serializeCandidate);
}

async function getCandidateById(id: string) {
  const candidate = await User.findOne({
    where: { id, role: "student" },
    include: CANDIDATE_ENROLLMENTS_INCLUDE,
  });
  if (!candidate) {
    throw ApiError.notFound("Candidate not found");
  }
  return serializeCandidate(candidate);
}

export interface CreateCandidateInput {
  firstName: string;
  lastName: string;
  email: string;
  location?: string;
  courseInterest?: string;
}

export async function createCandidate(input: CreateCandidateInput) {
  const existing = await User.findOne({ where: { email: input.email } });
  if (existing) {
    throw ApiError.conflict("An account with this email already exists");
  }

  // The candidate never uses this password directly -- they set their own via the
  // password-reset email sent right below, reusing the existing forgot-password flow
  // instead of building a separate invite/set-password mechanism.
  const unusablePassword = randomBytes(32).toString("hex");
  const passwordHash = await bcrypt.hash(unusablePassword, config.bcryptSaltRounds);

  const user = await User.create({
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
    role: "student",
    location: input.location ?? "Nigeria",
    courseInterest: input.courseInterest ?? null,
  });

  await authService.requestPasswordReset(input.email);

  return serializeCandidate(user);
}

export async function deactivateCandidate(id: string): Promise<void> {
  const user = await User.findOne({ where: { id, role: "student" } });
  if (!user) {
    throw ApiError.notFound("Candidate not found");
  }
  user.status = "inactive";
  await user.save();
}

export interface DeleteInactiveCandidatesResult {
  deletedCount: number;
  skippedCount: number;
}

// Permanently removes deactivated candidates. Enrollments, progress, quiz attempts,
// assignment/capstone submissions, and refresh tokens all cascade-delete with the user
// (see their migrations' onDelete: "CASCADE" on student_id/user_id) -- but payments
// deliberately don't cascade, since those are financial records worth keeping even
// after the account is gone. A candidate with any payment history is skipped rather
// than deleted, so this can't silently erase an audit trail.
export async function deleteInactiveCandidates(): Promise<DeleteInactiveCandidatesResult> {
  const inactiveCandidates = await User.findAll({ where: { role: "student", status: "inactive" } });

  let deletedCount = 0;
  let skippedCount = 0;
  for (const candidate of inactiveCandidates) {
    const paymentCount = await Payment.count({ where: { studentId: candidate.id } });
    if (paymentCount > 0) {
      skippedCount += 1;
      continue;
    }
    await candidate.destroy();
    deletedCount += 1;
  }

  return { deletedCount, skippedCount };
}

// Lets an admin grant a candidate access to a course directly (e.g. payment reconciled
// outside the portal, a scholarship, or a manual override) without them going through
// self-service checkout. Reuses the same enrollStudent path students hit on checkout, so
// the confirmation email and "already enrolled" guard stay in one place.
export async function addEnrollmentToCandidate(
  candidateId: string,
  courseId: string,
  paymentConfirmed = false,
) {
  const candidate = await User.findOne({ where: { id: candidateId, role: "student" } });
  if (!candidate) {
    throw ApiError.notFound("Candidate not found");
  }

  const enrollment = await enrollmentService.enrollStudent(courseId, candidateId);
  if (paymentConfirmed) {
    enrollment.paymentConfirmed = true;
    enrollment.paymentConfirmedAt = new Date();
    await enrollment.save();
  }

  return getCandidateById(candidateId);
}

export async function setPaymentConfirmed(enrollmentId: string, paymentConfirmed: boolean) {
  const enrollment = await Enrollment.findByPk(enrollmentId);
  if (!enrollment) {
    throw ApiError.notFound("Enrollment not found");
  }
  enrollment.paymentConfirmed = paymentConfirmed;
  enrollment.paymentConfirmedAt = paymentConfirmed ? new Date() : null;
  await enrollment.save();
  return enrollment;
}

export async function listLeads() {
  return Lead.findAll({ order: [["createdAt", "DESC"]] });
}

export async function deleteLead(id: string): Promise<void> {
  const lead = await Lead.findByPk(id);
  if (!lead) {
    throw ApiError.notFound("Lead not found");
  }
  await lead.destroy();
}

// Every quiz across every course, with enough course/week context to manage them from a
// single flat list rather than drilling into each course individually.
export async function listQuizzes() {
  const quizzes = await Quiz.findAll({
    include: [
      {
        model: CourseModule,
        as: "module",
        attributes: ["id", "weekNumber"],
        include: [{ model: Course, as: "course", attributes: ["id", "title"] }],
      },
    ],
    order: [
      [{ model: CourseModule, as: "module" }, { model: Course, as: "course" }, "title", "ASC"],
      [{ model: CourseModule, as: "module" }, "weekNumber", "ASC"],
    ],
  });

  return quizzes.map((quiz) => {
    const courseModule = (quiz as unknown as { module: CourseModule & { course: Course } }).module;
    return {
      id: quiz.id,
      title: quiz.title,
      isEnabled: quiz.isEnabled,
      moduleId: courseModule.id,
      weekNumber: courseModule.weekNumber,
      courseId: courseModule.course.id,
      courseTitle: courseModule.course.title,
    };
  });
}

export async function setQuizEnabled(quizId: string, isEnabled: boolean) {
  const quiz = await Quiz.findByPk(quizId);
  if (!quiz) {
    throw ApiError.notFound("Quiz not found");
  }
  quiz.isEnabled = isEnabled;
  await quiz.save();
  return quiz;
}

// Every course's capstone project, one row per course (unlike quizzes, there's exactly
// one capstone per course, not one per week).
export async function listCapstones() {
  const capstones = await Capstone.findAll({
    include: [{ model: Course, as: "course", attributes: ["id", "title"] }],
    order: [[{ model: Course, as: "course" }, "title", "ASC"]],
  });

  return capstones.map((capstone) => {
    const course = (capstone as unknown as { course: Course }).course;
    return {
      id: capstone.id,
      title: capstone.title,
      isEnabled: capstone.isEnabled,
      courseId: course.id,
      courseTitle: course.title,
    };
  });
}

export async function setCapstoneEnabled(capstoneId: string, isEnabled: boolean) {
  const capstone = await Capstone.findByPk(capstoneId);
  if (!capstone) {
    throw ApiError.notFound("Capstone not found");
  }
  capstone.isEnabled = isEnabled;
  await capstone.save();
  return capstone;
}
