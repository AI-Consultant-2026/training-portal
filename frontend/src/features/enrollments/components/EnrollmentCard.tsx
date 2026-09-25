import { useState } from "react";
import { Link } from "react-router-dom";
import { downloadAttendanceRecord, downloadCertificate } from "../../../api/enrollments.api";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import { COURSE_COVER_IMAGES } from "../../courses/courseCoverImages";
import { PAYMENT_CONFIRMATION_PROMISE } from "../../payments/paymentCopy";
import { FeedbackDialog } from "./FeedbackDialog";
import { Enrollment } from "../../../types/api";

interface EnrollmentCardProps {
  enrollment: Enrollment;
}

const STATUS_LABELS: Record<Enrollment["status"], string> = {
  active: "In progress",
  completed: "Completed",
  dropped: "Dropped",
  suspended: "Suspended",
};

// A plain gray pill reads the same as "dropped" or "suspended" -- completing a course
// is worth calling out visually, so it gets its own gold medal badge instead.
function CompletedBadge() {
  return (
    <span className="inline-flex shrink-0 whitespace-nowrap items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-amber-500">
        <path d="M7 11 L4 17 L7 16 L8.5 18.5 L10.8 13" fill="currentColor" opacity="0.5" />
        <path d="M13 11 L16 17 L13 16 L11.5 18.5 L9.2 13" fill="currentColor" opacity="0.5" />
        <circle cx="10" cy="8" r="6" fill="currentColor" />
        <path
          d="M10 5.2 L11 7.3 L13.2 7.6 L11.6 9.2 L12 11.4 L10 10.3 L8 11.4 L8.4 9.2 L6.8 7.6 L9 7.3 Z"
          fill="white"
        />
      </svg>
      Completed
    </span>
  );
}

export function EnrollmentCard({ enrollment }: EnrollmentCardProps) {
  const course = enrollment.course;
  const coverImage = course ? COURSE_COVER_IMAGES[course.slug] : undefined;
  const [downloading, setDownloading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const [downloadingAttendance, setDownloadingAttendance] = useState(false);
  const [attendanceDownloadFailed, setAttendanceDownloadFailed] = useState(false);

  async function handleDownloadCertificate() {
    if (!course) return;
    setDownloadFailed(false);
    setDownloading(true);
    try {
      await downloadCertificate(enrollment.id, course.title);
    } catch {
      setDownloadFailed(true);
    } finally {
      setDownloading(false);
    }
  }

  async function handleDownloadAttendanceRecord() {
    if (!course) return;
    setAttendanceDownloadFailed(false);
    setDownloadingAttendance(true);
    try {
      await downloadAttendanceRecord(enrollment.id, course.title);
    } catch {
      setAttendanceDownloadFailed(true);
    } finally {
      setDownloadingAttendance(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {coverImage && <img src={coverImage} alt="" className="h-32 w-full object-cover" />}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{course?.title ?? "Course"}</h3>
          {enrollment.status === "completed" ? (
            <CompletedBadge />
          ) : (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              {STATUS_LABELS[enrollment.status]}
            </span>
          )}
        </div>
        {!enrollment.paymentConfirmed && (
          <p
            className={`rounded-md px-3 py-2 text-sm ${enrollment.paymentSubmittedAt ? "bg-amber-50 text-amber-800" : "bg-gray-50 text-gray-700"}`}
          >
            {enrollment.paymentSubmittedAt ? (
              <>
                <strong>Payment submitted</strong> on {new Date(enrollment.paymentSubmittedAt).toLocaleDateString("en-GB")}{" "}
                &mdash; we&rsquo;re confirming it. Your lessons unlock {PAYMENT_CONFIRMATION_PROMISE}.
              </>
            ) : (
              <>
                <strong>Awaiting payment.</strong> The first lesson is free &mdash; pay for the course to unlock the rest.{" "}
                {course && (
                  <Link to={`/courses/${course.slug}/pay/bank-transfer`} className="font-medium text-blue-600 hover:underline">
                    Pay now
                  </Link>
                )}
              </>
            )}
          </p>
        )}
        <ProgressBar percent={enrollment.progressPercent} />
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm text-gray-500">
          <span>{enrollment.progressPercent}% complete</span>
          <div className="flex flex-wrap items-center gap-3">
            {enrollment.status === "completed" && course && (
              <button
                type="button"
                onClick={() => setShowFeedback(true)}
                className="font-medium text-blue-600 hover:underline"
              >
                Share feedback
              </button>
            )}
            {enrollment.status === "completed" && course && (
              <button
                type="button"
                onClick={handleDownloadCertificate}
                disabled={downloading}
                className="font-medium text-amber-700 hover:underline disabled:opacity-60"
              >
                {downloading ? "Preparing..." : "Certificate"}
              </button>
            )}
            {enrollment.paymentConfirmed && course && (
              <button
                type="button"
                onClick={handleDownloadAttendanceRecord}
                disabled={downloadingAttendance}
                className="font-medium text-gray-600 hover:underline disabled:opacity-60"
              >
                {downloadingAttendance ? "Preparing..." : "Attendance record"}
              </button>
            )}
            {course && (
              <Link
                to={enrollment.nextLessonId ? `/lessons/${enrollment.nextLessonId}` : `/courses/${course.slug}`}
                className="text-blue-600 hover:underline"
              >
                Continue
              </Link>
            )}
          </div>
        </div>
        {downloadFailed && <p className="text-xs text-red-600">Could not download the certificate.</p>}
        {showFeedback && course && (
          <FeedbackDialog
            enrollmentId={enrollment.id}
            courseTitle={course.title}
            onClose={() => setShowFeedback(false)}
          />
        )}
        {attendanceDownloadFailed && (
          <p className="text-xs text-red-600">Could not download the attendance record.</p>
        )}
      </div>
    </div>
  );
}
