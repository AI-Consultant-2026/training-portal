import PDFDocument from "pdfkit";
import { Course, Enrollment, User } from "../models";
import { ApiError } from "../utils/ApiError";

export interface CertificateData {
  enrollmentId: string;
  studentName: string;
  courseTitle: string;
  completionDate: Date;
}

// Same ownership rule as getEnrollmentById (own enrollment or admin), plus a completion
// requirement a plain "enrolled" state doesn't satisfy -- there's nothing to certify
// until every lesson is done and enrollment.service.ts's recalculateProgress() has
// already flipped status to "completed".
export async function getCertificateData(
  enrollmentId: string,
  requester: { id: string; role: string },
): Promise<CertificateData> {
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
    throw ApiError.forbidden("You do not have permission to view this certificate");
  }
  if (enrollment.status !== "completed") {
    throw ApiError.forbidden("This certificate is available once the course is completed");
  }

  const course = (enrollment as unknown as { course?: Course }).course;
  const student = (enrollment as unknown as { student?: User }).student;
  if (!course || !student) {
    throw ApiError.notFound("Enrollment is missing course or student data");
  }

  return {
    enrollmentId: enrollment.id,
    studentName: `${student.firstName} ${student.lastName}`,
    courseTitle: course.title,
    completionDate: enrollment.completionDate ?? new Date(),
  };
}

// Brand palette lifted from the marketing site (welcome.html) rather than the app's
// in-UI blue -- a certificate is collateral the student keeps/shares, so it should
// carry Paleon's actual brand identity, not the dashboard's chrome color.
const INK = "#10151F";
const SIGNAL_DEEP = "#C96A26";
const CHARCOAL_SOFT = "#6B6252";
const PAPER = "#F7F4EC";

// Generates straight into the given writable stream (the Express response) -- nothing
// is persisted server-side, so re-downloading always reflects the current student/course
// name rather than a stale snapshot from whenever it was first generated.
export function streamCertificatePdf(data: CertificateData, destination: NodeJS.WritableStream): void {
  const doc = new PDFDocument({ layout: "landscape", size: "A4", margin: 0 });
  doc.pipe(destination);

  const { width, height } = doc.page;
  const margin = 36;

  doc.rect(0, 0, width, height).fill(PAPER);
  doc.lineWidth(2).strokeColor(SIGNAL_DEEP).rect(margin, margin, width - margin * 2, height - margin * 2).stroke();
  doc
    .lineWidth(0.75)
    .strokeColor(INK)
    .rect(margin + 10, margin + 10, width - (margin + 10) * 2, height - (margin + 10) * 2)
    .stroke();

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(11)
    .text("PALEON TRAINING", 0, margin + 50, { align: "center", characterSpacing: 3 });

  doc.fillColor(INK).font("Times-Bold").fontSize(34).text("Certificate of Completion", 0, margin + 78, {
    align: "center",
  });

  // Small diamond ornament under the title -- otherwise the gap between the title block
  // and the signature block at the bottom reads as an unintentional blank page, not a
  // deliberately spacious layout.
  doc
    .save()
    .translate(width / 2, margin + 132)
    .rotate(45)
    .rect(-5, -5, 10, 10)
    .fill(SIGNAL_DEEP)
    .restore();

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(13)
    .text("This certifies that", 0, margin + 156, { align: "center" });

  doc
    .fillColor(SIGNAL_DEEP)
    .font("Times-BoldItalic")
    .fontSize(30)
    .text(data.studentName, 0, margin + 183, { align: "center" });

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(13)
    .text("has successfully completed the course", 0, margin + 236, { align: "center" });

  doc
    .fillColor(INK)
    .font("Times-Bold")
    .fontSize(22)
    .text(data.courseTitle, margin + 60, margin + 263, {
      align: "center",
      width: width - (margin + 60) * 2,
    });

  // Two-column signature block near the bottom: issuing organization on the left,
  // completion date on the right, each with a ruled line above its caption -- the
  // standard "signature / date" layout real certificates use, which fills the lower
  // third of the page purposefully instead of leaving it empty.
  const formattedDate = data.completionDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const signatureY = height - margin - 92;
  const colWidth = 200;
  const leftColX = width / 2 - colWidth - 30;
  const rightColX = width / 2 + 30;

  doc.fillColor(INK).font("Times-BoldItalic").fontSize(20).text("Paleon Training", leftColX, signatureY - 22, {
    width: colWidth,
    align: "center",
  });
  doc.lineWidth(1).strokeColor(CHARCOAL_SOFT).moveTo(leftColX, signatureY).lineTo(leftColX + colWidth, signatureY).stroke();
  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(10)
    .text("Issuing organization", leftColX, signatureY + 8, { width: colWidth, align: "center" });

  doc.fillColor(INK).font("Times-Bold").fontSize(16).text(formattedDate, rightColX, signatureY - 18, {
    width: colWidth,
    align: "center",
  });
  doc
    .lineWidth(1)
    .strokeColor(CHARCOAL_SOFT)
    .moveTo(rightColX, signatureY)
    .lineTo(rightColX + colWidth, signatureY)
    .stroke();
  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(10)
    .text("Date of completion", rightColX, signatureY + 8, { width: colWidth, align: "center" });

  doc
    .fillColor(CHARCOAL_SOFT)
    .font("Helvetica")
    .fontSize(9)
    .text(`Certificate reference: ${data.enrollmentId}`, 0, height - margin - 26, { align: "center" });

  doc.end();
}
