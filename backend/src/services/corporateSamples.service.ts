import { streamAttendancePdf, WeekEngagement } from "./attendance.service";
import { streamCertificatePdf } from "./certificate.service";

// Example documents for corporate buyers (2026-11-13 review: "HR buyers want to see what
// they will hold at audit time"). Real generators, made-up learner, "SAMPLE" across each page.
export { SAMPLE_ATTENDANCE_PATH, SAMPLE_CERTIFICATE_PATH } from "../views/corporateOffers";

const COURSE = "CyberSecure Workforce";
const DESCRIPTION =
  "Practical cybersecurity awareness for every employee: spotting phishing and social engineering, passwords and multi-factor authentication, safe devices and remote working, handling data, reporting incidents, and the Stop, Check, Report habit.";
const MODULES = 13;
const ENROLLED = new Date("2026-09-07T09:00:00Z");

export function streamSampleCertificate(out: NodeJS.WritableStream): void {
  streamCertificatePdf(
    {
      enrollmentId: "SAMPLE-0000-0000",
      studentName: "Sample Learner",
      courseTitle: COURSE,
      courseDescription: DESCRIPTION,
      durationWeeks: MODULES,
      completionDate: new Date("2026-10-30T09:00:00Z"),
      unit: "module",
    },
    out,
    { sample: true },
  );
}

export function streamSampleAttendance(out: NodeJS.WritableStream): void {
  const day = (n: number) => new Date(ENROLLED.getTime() + n * 86400000);
  // Mid-course: modules 1–9 done, 10 partly done, 11–13 still to come.
  const weeks: WeekEngagement[] = Array.from({ length: MODULES }, (_, i) => {
    const n = i + 1;
    if (n <= 9)
      return { weekNumber: n, lessonsCompleted: 3, lessonsTotal: 3, quizState: "done", quizDate: day(n * 3), assignmentState: "not_applicable", assignmentDate: null, status: "attended" };
    if (n === 10)
      return { weekNumber: n, lessonsCompleted: 2, lessonsTotal: 3, quizState: "pending", quizDate: null, assignmentState: "not_applicable", assignmentDate: null, status: "partial" };
    return { weekNumber: n, lessonsCompleted: 0, lessonsTotal: 3, quizState: "pending", quizDate: null, assignmentState: "not_applicable", assignmentDate: null, status: "pending" };
  });
  streamAttendancePdf(
    {
      enrollmentId: "SAMPLE-0000-0000",
      studentName: "Sample Learner",
      courseTitle: COURSE,
      durationWeeks: MODULES,
      enrolledDate: ENROLLED,
      unit: "module",
      status: "enrolled",
      generatedAt: new Date("2026-10-08T09:00:00Z"),
      weeks,
      weeksAttended: 9,
      totalLessons: MODULES * 3,
      completedLessons: 29,
      totalQuizzes: MODULES,
      submittedQuizzes: 9,
      totalAssignments: 0,
      submittedAssignments: 0,
    },
    out,
    { sample: true },
  );
}
