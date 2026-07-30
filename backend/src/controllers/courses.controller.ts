import { Request, Response } from "express";
import * as courseService from "../services/course.service";
import * as lessonService from "../services/lesson.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listCourses = asyncHandler(async (req: Request, res: Response) => {
  const courses =
    req.user && (req.user.role === "admin" || req.user.role === "instructor")
      ? await courseService.listAllCourses()
      : await courseService.listPublishedCourses();

  res.json({ courses });
});

export const getCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  res.json({ course });
});

export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.createCourse(req.body, req.user!.id);
  res.status(201).json({ course });
});

export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.updateCourse(req.params.id, req.body, req.user!);
  res.json({ course });
});

export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  await courseService.deleteCourse(req.params.id);
  res.status(204).send();
});

export const getCourseProgress = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  const progress = await lessonService.getCourseProgressForStudent(course.id, req.user!.id);
  res.json(progress);
});
