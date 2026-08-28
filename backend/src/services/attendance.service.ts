import PDFDocument from "pdfkit";
import { Course, CourseModule, Enrollment, Lesson, ProgressTracking, User } from "../models";
import { ApiError } from "../utils/ApiError";

export interface AttendanceRow {
  weekNumber: number;
  lessonTitle: string;
  completedAt: Date | null;
}

export interface AttendanceData {
  enrollmentId: string;
  studentName: string;
  courseTitle: string;
  durationWeeks: number;
  enrolledDate: Date;
  status: string;
  generatedAt: Date;
  rows: AttendanceRow[];
  totalLessons: number;
  completedLessons: number;
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

  const modules = await CourseModule.findAll({
    where: { courseId: course.id },
    order: [["weekNumber", "ASC"], ["order", "ASC"]],
  });
  const moduleIds = modules.map((m) => m.id);
  const lessons =
    moduleIds.length === 0
      ? []
      : await Lesson.findAll({
          where: { moduleId: moduleIds },
          order: [["order", "ASC"]],
        });
  const weekByModuleId = new Map(modules.map((m) => [m.id, m.weekNumber]));

  const lessonIds = lessons.map((l) => l.id);
  const completedRecords =
    lessonIds.length === 0
      ? []
      : await ProgressTracking.findAll({ where: { studentId: enrollment.studentId, lessonId: lessonIds } });
  const completedAtByLessonId = new Map(completedRecords.map((r) => [r.lessonId, r.completedAt]));

  // Lessons come back ordered by `order` within each module's id, not by week -- re-sort
  // by (weekNumber, order) so the printed rows always read Week 1 through Week N in order,
  // regardless of what order the modules happened to be created in.
  const rows: AttendanceRow[] = lessons
    .map((lesson) => ({
      weekNumber: weekByModuleId.get(lesson.moduleId) ?? 0,
      order: lesson.order,
      lessonTitle: lesson.title,
      completedAt: completedAtByLessonId.get(lesson.id) ?? null,
    }))
    .sort((a, b) => a.weekNumber - b.weekNumber || a.order - b.order);

  return {
    enrollmentId: enrollment.id,
    studentName: `${student.firstName} ${student.lastName}`,
    courseTitle: course.title,
    durationWeeks: course.durationWeeks,
    enrolledDate: enrollment.enrolledDate,
    status: enrollment.status,
    generatedAt: new Date(),
    rows,
    totalLessons: rows.length,
    completedLessons: rows.filter((r) => r.completedAt !== null).length,
  };
}

// Same brand palette as certificate.service.ts (lifted from the marketing site) -- this
// is the other printable document a student takes outside the app, so it should carry
// the same identity rather than the dashboard's in-UI blue.
const INK = "#10151F";
const SIGNAL_DEEP = "#C96A26";
const CHARCOAL_SOFT = "#6B6252";
const RULE = "#D8D2C4";

const STATUS_LABELS: Record<string, string> = {
  active: "In progress",
  completed: "Completed",
  dropped: "Dropped",
  suspended: "Suspended",
};

function fmtDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

// Generates straight into the given writable stream, same as streamCertificatePdf --
// nothing is persisted server-side, so re-downloading always reflects whatever lessons
// are completed at request time rather than a stale snapshot.
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
  // record before reading the session-by-session table below it.
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

  // Column layout for the session table -- widths sum to contentWidth.
  const colWeek = 55;
  const colStatus = 90;
  const colDate = 115;
  const colSession = contentWidth - colWeek - colStatus - colDate;
  const colX = { week: margin, session: margin + colWeek, date: margin + colWeek + colSession, status: margin + colWeek + colSession + colDate };
  // Sized so a full 12-week/24-session course still fits on one printed page --
  // the largest course today (Cyber Security Fundamentals) has 24 lessons, and this
  // row height is the largest that keeps 24 rows plus the header/footer within one A4
  // page. addPage() below is still a safety net for any course longer than that.
  const rowHeight = 17;
  const headerHeight = 20;

  let y = infoTop + 118;

  function drawTableHeader() {
    doc.rect(margin, y, contentWidth, headerHeight).fill("#F2EEE3");
    doc.fillColor(CHARCOAL_SOFT).font("Helvetica-Bold").fontSize(8.5);
    doc.text("WEEK", colX.week + 8, y + 6);
    doc.text("SESSION", colX.session + 8, y + 6);
    doc.text("COMPLETED ON", colX.date + 8, y + 6);
    doc.text("STATUS", colX.status + 8, y + 6);
    y += headerHeight;
  }

  // Reserve room for the summary line and the signature block below the table so a
  // page break never lands between the last row and that footer -- if a row wouldn't
  // fit above the reserved zone, start a fresh page and repeat the header instead.
  // 120 covers the footer's actual ~112pt with a little slack, measured against the
  // 24-row/12-week case this is tuned for.
  const footerReserve = 120;
  drawTableHeader();

  data.rows.forEach((row, i) => {
    if (y + rowHeight > bottomLimit - footerReserve) {
      doc.addPage();
      y = margin;
      drawTableHeader();
    }

    if (i % 2 === 1) {
      doc.rect(margin, y, contentWidth, rowHeight).fill("#FAF8F2");
    }

    const attended = row.completedAt !== null;
    doc.fillColor(INK).font("Helvetica").fontSize(9.5);
    doc.text(String(row.weekNumber), colX.week + 8, y + 3.8);
    doc.text(row.lessonTitle, colX.session + 8, y + 3.8, { width: colSession - 16 });
    doc.fillColor(attended ? INK : CHARCOAL_SOFT).text(attended ? fmtDate(row.completedAt as Date) : "—", colX.date + 8, y + 3.8);
    doc
      .fillColor(attended ? "#2F6B3A" : CHARCOAL_SOFT)
      .font(attended ? "Helvetica-Bold" : "Helvetica")
      .text(attended ? "Attended" : "Pending", colX.status + 8, y + 3.8);

    y += rowHeight;
  });

  doc.lineWidth(0.5).strokeColor(RULE).moveTo(margin, y).lineTo(width - margin, y).stroke();
  y += 12;

  const percent = data.totalLessons > 0 ? Math.round((100 * data.completedLessons) / data.totalLessons) : 0;
  doc
    .fillColor(INK)
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .text(`${data.completedLessons} of ${data.totalLessons} sessions attended (${percent}%)`, margin, y);
  y += 18;

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica-Oblique")
    .fontSize(8.5)
    .text(
      "This record reflects the candidate's session-by-session participation in the online programme listed above, as tracked by the Paleon Training platform.",
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
  // *above* that -- for a long table (e.g. the 24-row 12-week course) that pushed the
  // signature captions further down the page, this flows below them instead of
  // colliding with "Issuing organization" / "Date generated".
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
