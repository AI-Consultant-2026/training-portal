import { Request, Response } from "express";
import * as courseService from "../services/course.service";
import * as enrollmentService from "../services/enrollment.service";
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
  res.status(201).json({ enrollment });
});

export const listMyEnrollments = asyncHandler(async (req: Request, res: Response) => {
  const enrollments = await enrollmentService.listMyEnrollments(req.user!.id);
  res.json({ enrollments });
});

export const getEnrollment = asyncHandler(async (req: Request, res: Response) => {
  const enrollment = await enrollmentService.getEnrollmentById(req.params.id, req.user!);
  res.json({ enrollment });
});
