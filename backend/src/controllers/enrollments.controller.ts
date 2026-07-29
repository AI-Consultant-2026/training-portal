import { Request, Response } from "express";
import * as courseService from "../services/course.service";
import * as enrollmentService from "../services/enrollment.service";
import { asyncHandler } from "../utils/asyncHandler";

export const enrollInCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
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
