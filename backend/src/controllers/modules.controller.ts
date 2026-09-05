import { Request, Response } from "express";
import * as courseService from "../services/course.service";
import * as moduleService from "../services/module.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listModulesForCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  courseService.assertCourseAccessible(course, req.user);
  const modules = await moduleService.listPublishedModulesForCourse(course.id);
  res.json({ modules });
});
