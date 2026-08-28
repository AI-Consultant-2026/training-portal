import { Op } from "sequelize";
import PDFDocument from "pdfkit";
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
  User,
} from "../models";
import { ApiError } from "../utils/ApiError";

export type WeekItemState = "done" | "pending" | "not_applicable";
export type WeekStatus = "attended" | "partial" | "pending";

export interface WeekEngagement {
  weekNumber: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  quizState: WeekItemState;
  quizDate: Date | null;
  assignmentState: WeekItemState;
  assignmentDate: Date | null;
  status: WeekStatus;
}

export interface AttendanceData {
  enrollmentId: string;
  studentName: string;
  courseTitle: string;
  durationWeeks: number;
  enrolledDate: Date;
  status: string;
  generatedAt: Date;
  weeks: WeekEngagement[];
  weeksAttended: number;
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  submittedQuizzes: number;
  totalAssignments: number;
  submittedAssignments: number;
}

// Same ownership rule as certificate.service.ts's getCertificateData (own enrollment or
// admin), but deliberately no completion requirement -- unlike a certificate, an
// attendance record is meant to be pulled mid-course too (an employer sponsoring a
// still-in-progress cohort has a real reason to check attendance-to-date). It does still
// require payment confirmation: before that, no lesson was ever unlocked, so there is
// nothing to attend and nothing worth putting a record's name to.
export async function getAttendanceData(
  enrollmentId: string,
  requester: { id: string; role: string },
): Promise<AttendanceData> {
  const enrollment = await Enrollment.findByPk(enrollmentId, {
    include: [
      { model: Course, as: "course" },
      { model: User, as: "student" },
    ],
  });
  if (!enrollment) {
    throw ApiError.notFound("Enrollment not found");
  }
  if (requester.role !== "admin" && enrollment.studentId !== requester.id) {
    throw ApiError.forbidden("You do not have permission to view this attendance record");
  }
  if (!enrollment.paymentConfirmed) {
    throw ApiError.forbidden("This attendance record is available once payment has been confirmed");
  }

  const course = (enrollment as unknown as { course?: Course }).course;
  const student = (enrollment as unknown as { student?: User }).student;
  if (!course || !student) {
    throw ApiError.notFound("Enrollment is missing course or student data");
  }
  const studentId = enrollment.studentId;

  const modules = await CourseModule.findAll({
    where: { courseId: course.id },
    order: [["weekNumber", "ASC"], ["order", "ASC"]],
  });
  const moduleIds = modules.map((m) => m.id);

  const [lessons, quizzes, assignments] =
    moduleIds.length === 0
      ? [[], [], []]
      : await Promise.all([
          Lesson.findAll({ where: { moduleId: moduleIds } }),
          Quiz.findAll({ where: { moduleId: moduleIds, isEnabled: true } }),
          Assignment.findAll({ where: { moduleId: moduleIds } }),
        ]);

  const lessonIds = lessons.map((l) => l.id);
  const quizIds = quizzes.map((q) => q.id);
  const assignmentIds = assignments.map((a) => a.id);

  const [progressRecords, quizAttempts, submissions] = await Promise.all([
    lessonIds.length === 0
      ? Promise.resolve([])
      : ProgressTracking.findAll({ where: { studentId, lessonId: lessonIds } }),
    quizIds.length === 0
      ? Promise.resolve([])
      : QuizAttempt.findAll({
          where: { studentId, quizId: quizIds, status: { [Op.in]: ["submitted", "graded"] } },
          order: [["endTime", "ASC"]],
        }),
    assignmentIds.length === 0
      ? Promise.resolve([])
      : AssignmentSubmission.findAll({ where: { studentId, assignmentId: assignmentIds } }),
  ]);

  const completedAtByLessonId = new Map(progressRecords.map((r) => [r.lessonId, r.completedAt]));

  // First (earliest) submitted/graded attempt per quiz -- a retake doesn't move the
  // evidence date forward, since what's being evidenced is when the candidate first
  // engaged with that week's material, not their final score.
  const firstSubmissionByQuizId = new Map<string, Date>();
  for (const attempt of quizAttempts) {
    if (!firstSubmissionByQuizId.has(attempt.quizId) && attempt.endTime) {
      firstSubmissionByQuizId.set(attempt.quizId, attempt.endTime);
    }
  }
  const submissionDateByAssignmentId = new Map(submissions.map((s) => [s.assignmentId, s.submissionDate]));

  const lessonsByModuleId = groupBy(lessons, (l) => l.moduleId);
  const quizzesByModuleId = groupBy(quizzes, (q) => q.moduleId);
  const assignmentsByModuleId = groupBy(assignments, (a) => a.moduleId);

  const weeks: WeekEngagement[] = modules.map((courseModule) => {
    const moduleLessons = lessonsByModuleId.get(courseModule.id) ?? [];
    const moduleQuizzes = quizzesByModuleId.get(courseModule.id) ?? [];
    const moduleAssignments = assignmentsByModuleId.get(courseModule.id) ?? [];

    const lessonsCompleted = moduleLessons.filter((l) => completedAtByLessonId.has(l.id)).length;
    const lessonsTotal = moduleLessons.length;
    const lessonsDone = lessonsTotal > 0 && lessonsCompleted === lessonsTotal;

    // A module can (in principle) have zero, one, or several quizzes/assignments --
    // treated as "not applicable" when there are none (an admin-disabled quiz is
    // already filtered out above, so it never counts against the candidate), and as one
    // combined requirement that's only "done" once every one of them is.
    const quizState: WeekItemState =
      moduleQuizzes.length === 0
        ? "not_applicable"
        : moduleQuizzes.every((q) => firstSubmissionByQuizId.has(q.id))
          ? "done"
          : "pending";
    const quizDate =
      quizState === "done"
        ? moduleQuizzes.reduce<Date | null>((latest, q) => {
            const d = firstSubmissionByQuizId.get(q.id) ?? null;
            return d && (!latest || d > latest) ? d : latest;
          }, null)
        : null;

    const assignmentState: WeekItemState =
      moduleAssignments.length === 0
        ? "not_applicable"
        : moduleAssignments.every((a) => submissionDateByAssignmentId.has(a.id))
          ? "done"
          : "pending";
    const assignmentDate =
      assignmentState === "done"
        ? moduleAssignments.reduce<Date | null>((latest, a) => {
            const d = submissionDateByAssignmentId.get(a.id) ?? null;
            return d && (!latest || d > latest) ? d : latest;
          }, null)
        : null;

    const requirements = [
      lessonsTotal > 0,
      quizState !== "not_applicable",
      assignmentState !== "not_applicable",
    ].filter(Boolean).length;
    const met = [
      lessonsTotal > 0 && lessonsDone,
      quizState === "done",
      assignmentState === "done",
    ].filter(Boolean).length;
    // A week with some but not all lessons done (e.g. 1/2) has real, visible progress in
    // the Lessons column -- "met" alone would read that as 0 and mislabel the week
    // "Pending" right next to a "1/2" that says otherwise, so partial lesson progress
    // counts toward "any progress happened" even though it doesn't complete the
    // lessons requirement.
    const anyProgress = lessonsCompleted > 0 || quizState === "done" || assignmentState === "done";

    const status: WeekStatus =
      requirements > 0 && met === requirements ? "attended" : anyProgress ? "partial" : "pending";

    return {
      weekNumber: courseModule.weekNumber,
      lessonsCompleted,
      lessonsTotal,
      quizState,
      quizDate,
      assignmentState,
      assignmentDate,
      status,
    };
  });

  return {
    enrollmentId: enrollment.id,
    studentName: `${student.firstName} ${student.lastName}`,
    courseTitle: course.title,
    durationWeeks: course.durationWeeks,
    enrolledDate: enrollment.enrolledDate,
    status: enrollment.status,
    generatedAt: new Date(),
    weeks,
    weeksAttended: weeks.filter((w) => w.status === "attended").length,
    totalLessons: lessons.length,
    completedLessons: completedAtByLessonId.size,
    totalQuizzes: quizzes.length,
    submittedQuizzes: firstSubmissionByQuizId.size,
    totalAssignments: assignments.length,
    submittedAssignments: submissionDateByAssignmentId.size,
  };
}

function groupBy<T, K>(items: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const bucket = map.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  return map;
}

// Same brand palette as certificate.service.ts (lifted from the marketing site) -- this
// is the other printable document a student takes outside the app, so it should carry
// the same identity rather than the dashboard's in-UI blue.
const INK = "#10151F";
const SIGNAL_DEEP = "#C96A26";
const CHARCOAL_SOFT = "#6B6252";
const RULE = "#D8D2C4";
const DONE_GREEN = "#2F6B3A";
const PARTIAL_AMBER = "#B6822C";

const STATUS_LABELS: Record<string, string> = {
  active: "In progress",
  completed: "Completed",
  dropped: "Dropped",
  suspended: "Suspended",
};

const WEEK_STATUS_LABELS: Record<WeekStatus, string> = {
  attended: "Attended",
  partial: "Partial",
  pending: "Pending",
};

const WEEK_STATUS_COLORS: Record<WeekStatus, string> = {
  attended: DONE_GREEN,
  partial: PARTIAL_AMBER,
  pending: CHARCOAL_SOFT,
};

function fmtDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function fmtDateShort(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// Generates straight into the given writable stream, same as streamCertificatePdf --
// nothing is persisted server-side, so re-downloading always reflects whatever lessons,
// quizzes, and assignments are complete at request time rather than a stale snapshot.
export function streamAttendancePdf(data: AttendanceData, destination: NodeJS.WritableStream): void {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(destination);

  const { width, height } = doc.page;
  const margin = 50;
  const contentWidth = width - margin * 2;
  const bottomLimit = height - margin;

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(10)
    .text("PALEON TRAINING", margin, margin, { characterSpacing: 2.5 });
  doc.fillColor(INK).font("Times-Bold").fontSize(24).text("Attendance Record", margin, margin + 18);

  doc
    .lineWidth(1)
    .strokeColor(SIGNAL_DEEP)
    .moveTo(margin, margin + 54)
    .lineTo(width - margin, margin + 54)
    .stroke();

  // Two-column info grid: who/what on the left, when on the right -- everything a
  // reviewer (e.g. an ITF officer checking a reimbursement claim) needs to identify the
  // record before reading the weekly engagement table below it.
  const infoTop = margin + 70;
  const infoColWidth = contentWidth / 2 - 10;
  const leftX = margin;
  const rightX = margin + contentWidth / 2 + 10;

  function infoLine(x: number, y: number, label: string, value: string) {
    doc.fillColor(CHARCOAL_SOFT).font("Helvetica").fontSize(9).text(label.toUpperCase(), x, y, { characterSpacing: 0.5 });
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(12).text(value, x, y + 13, { width: infoColWidth });
  }

  infoLine(leftX, infoTop, "Candidate", data.studentName);
  infoLine(leftX, infoTop + 40, "Course", data.courseTitle);
  infoLine(rightX, infoTop, "Programme length", `${data.durationWeeks} weeks`);
  infoLine(rightX, infoTop + 40, "Enrolled", fmtDate(data.enrolledDate));
  infoLine(leftX, infoTop + 80, "Status", STATUS_LABELS[data.status] ?? data.status);
  infoLine(rightX, infoTop + 80, "Record generated", fmtDate(data.generatedAt));

  // Column layout for the weekly engagement table -- widths sum to contentWidth. Each
  // week is one row evidencing all three forms of engagement (lessons, quiz,
  // assignment), not just lesson completion, so "Attended" on this table means the
  // candidate did all of that week's required work, not merely opened a lesson.
  const colWeek = 45;
  const colLessons = 65;
  const colStatus = 80;
  const colQuiz = (contentWidth - colWeek - colLessons - colStatus) / 2;
  const colAssignment = colQuiz;
  const colX = {
    week: margin,
    lessons: margin + colWeek,
    quiz: margin + colWeek + colLessons,
    assignment: margin + colWeek + colLessons + colQuiz,
    status: margin + colWeek + colLessons + colQuiz + colAssignment,
  };
  const rowHeight = 34;
  const headerHeight = 22;

  let y = infoTop + 118;

  function drawTableHeader() {
    doc.rect(margin, y, contentWidth, headerHeight).fill("#F2EEE3");
    doc.fillColor(CHARCOAL_SOFT).font("Helvetica-Bold").fontSize(8.5);
    doc.text("WEEK", colX.week + 8, y + 7);
    doc.text("LESSONS", colX.lessons + 8, y + 7);
    doc.text("QUIZ", colX.quiz + 8, y + 7);
    doc.text("ASSIGNMENT", colX.assignment + 8, y + 7);
    doc.text("STATUS", colX.status + 8, y + 7);
    y += headerHeight;
  }

  // A week's worth of rows (max 12 for the longest course) at this height never comes
  // close to needing a second page, but addPage() below is kept as a safety net for any
  // future course longer than that rather than assumed away.
  const footerReserve = 130;
  drawTableHeader();

  function itemCell(x: number, colWidth: number, yTop: number, state: WeekItemState, date: Date | null, doneLabel: string, pendingLabel: string) {
    if (state === "not_applicable") {
      doc.fillColor(CHARCOAL_SOFT).font("Helvetica").fontSize(9).text("—", x + 8, yTop);
      return;
    }
    const done = state === "done";
    doc
      .fillColor(done ? DONE_GREEN : CHARCOAL_SOFT)
      .font(done ? "Helvetica-Bold" : "Helvetica")
      .fontSize(9)
      .text(done ? doneLabel : pendingLabel, x + 8, yTop, { width: colWidth - 16 });
    if (done && date) {
      doc.fillColor(CHARCOAL_SOFT).font("Helvetica").fontSize(8).text(fmtDateShort(date), x + 8, yTop + 12);
    }
  }

  data.weeks.forEach((week, i) => {
    if (y + rowHeight > bottomLimit - footerReserve) {
      doc.addPage();
      y = margin;
      drawTableHeader();
    }

    if (i % 2 === 1) {
      doc.rect(margin, y, contentWidth, rowHeight).fill("#FAF8F2");
    }

    const textY = y + 11;
    doc.fillColor(INK).font("Helvetica").fontSize(9.5).text(String(week.weekNumber), colX.week + 8, textY);

    const lessonsDone = week.lessonsTotal > 0 && week.lessonsCompleted === week.lessonsTotal;
    doc
      .fillColor(lessonsDone ? DONE_GREEN : CHARCOAL_SOFT)
      .font(lessonsDone ? "Helvetica-Bold" : "Helvetica")
      .fontSize(9.5)
      .text(`${week.lessonsCompleted}/${week.lessonsTotal}`, colX.lessons + 8, textY);

    itemCell(colX.quiz, colQuiz, y + 7, week.quizState, week.quizDate, "Submitted", "Not attempted");
    itemCell(colX.assignment, colAssignment, y + 7, week.assignmentState, week.assignmentDate, "Submitted", "Not submitted");

    doc
      .fillColor(WEEK_STATUS_COLORS[week.status])
      .font("Helvetica-Bold")
      .fontSize(9.5)
      .text(WEEK_STATUS_LABELS[week.status], colX.status + 8, textY);

    y += rowHeight;
  });

  doc.lineWidth(0.5).strokeColor(RULE).moveTo(margin, y).lineTo(width - margin, y).stroke();
  y += 12;

  doc
    .fillColor(INK)
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .text(`${data.weeksAttended} of ${data.weeks.length} weeks fully attended`, margin, y);
  y += 15;

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(8.5)
    .text(
      `Lessons ${data.completedLessons}/${data.totalLessons} · Quizzes ${data.submittedQuizzes}/${data.totalQuizzes} submitted · Assignments ${data.submittedAssignments}/${data.totalAssignments} submitted`,
      margin,
      y,
    );
  y += 18;

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica-Oblique")
    .fontSize(8.5)
    .text(
      "A week counts as attended only once its lessons, quiz, and assignment are all complete, as tracked by the Paleon Training platform -- not lesson viewing alone.",
      margin,
      y,
      { width: contentWidth, lineGap: 2 },
    );
  y += 30;

  // Signature block -- same two-column "issuing organization / date" pattern as
  // certificate.service.ts, so this reads as an equally formal document when printed.
  const colWidth = 200;
  const sigLeftX = margin;
  const sigRightX = width - margin - colWidth;

  doc.fillColor(INK).font("Times-BoldItalic").fontSize(14).text("Paleon Training", sigLeftX, y, { width: colWidth });
  doc.lineWidth(1).strokeColor(CHARCOAL_SOFT).moveTo(sigLeftX, y + 26).lineTo(sigLeftX + colWidth, y + 26).stroke();
  doc.fillColor(CHARCOAL_SOFT).font("Helvetica").fontSize(9).text("Issuing organization", sigLeftX, y + 32);

  doc.fillColor(INK).font("Helvetica-Bold").fontSize(11).text(fmtDate(data.generatedAt), sigRightX, y + 3, { width: colWidth });
  doc.lineWidth(1).strokeColor(CHARCOAL_SOFT).moveTo(sigRightX, y + 26).lineTo(sigRightX + colWidth, y + 26).stroke();
  doc.fillColor(CHARCOAL_SOFT).font("Helvetica").fontSize(9).text("Date generated", sigRightX, y + 32);

  // Pinned to the physical bottom margin for a short table (the common case), but never
  // *above* that -- for a long table that pushed the signature captions further down the
  // page, this flows below them instead of colliding with "Issuing organization" /
  // "Date generated".
  const referenceY = Math.max(y + 32 + 14, height - margin - 16);
  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(8)
    .text(`Record reference: ${data.enrollmentId}  |  hello@paleontraining.com`, margin, referenceY, {
      width: contentWidth,
      align: "center",
    });

  doc.end();
}
