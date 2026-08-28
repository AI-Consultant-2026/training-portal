import { Request, Response } from "express";
import * as attendanceService from "../services/attendance.service";
import * as certificateService from "../services/certificate.service";
import * as courseService from "../services/course.service";
import * as enrollmentService from "../services/enrollment.service";
import * as lessonService from "../services/lesson.service";
import * as userService from "../services/user.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const enrollInCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  // Only gates this self-service path -- admin's addEnrollmentToCandidate calls
  // enrollmentService.enrollStudent() directly and deliberately skips this, since an
  // admin manually adding a course is itself the vouching step.
  const student = await userService.getUserById(req.user!.id);
  if (!student.emailVerifiedAt) {
    throw ApiError.forbidden("Please verify your email before enrolling in a course");
  }
  const enrollment = await enrollmentService.enrollStudent(course.id, req.user!.id);
  // A brand-new enrollment is never payment-confirmed yet, so there's no unlocked
  // lesson to point at -- null here without a lookup, same rule listMyEnrollments applies.
  res.status(201).json({ enrollment: { ...enrollment.toJSON(), nextLessonId: null } });
});

export const listMyEnrollments = asyncHandler(async (req: Request, res: Response) => {
  const enrollments = await enrollmentService.listMyEnrollments(req.user!.id);
  // A not-yet-paid enrollment's lessons are all locked anyway, so the frontend falls
  // back to the course landing page for those rather than deep-linking into a lesson
  // it can't view -- no need to compute a next lesson for that case.
  const enriched = await Promise.all(
    enrollments.map(async (enrollment) => ({
      ...enrollment.toJSON(),
      nextLessonId: enrollment.paymentConfirmed
        ? await lessonService.getNextLessonId(enrollment.courseId, req.user!.id)
        : null,
    })),
  );
  res.json({ enrollments: enriched });
});

export const getEnrollment = asyncHandler(async (req: Request, res: Response) => {
  const enrollment = await enrollmentService.getEnrollmentById(req.params.id, req.user!);
  res.json({ enrollment });
});

export const downloadCertificate = asyncHandler(async (req: Request, res: Response) => {
  const data = await certificateService.getCertificateData(req.params.id, req.user!);
  const safeTitle = data.courseTitle.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}-certificate.pdf"`);
  certificateService.streamCertificatePdf(data, res);
});

export const downloadAttendanceRecord = asyncHandler(async (req: Request, res: Response) => {
  const data = await attendanceService.getAttendanceData(req.params.id, req.user!);
  const safeTitle = data.courseTitle.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}-attendance-record.pdf"`);
  attendanceService.streamAttendancePdf(data, res);
});
