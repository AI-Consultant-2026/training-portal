import { Request, Response } from "express";
import * as courseService from "../services/course.service";
import * as moduleService from "../services/module.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listModulesForCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  const modules = await moduleService.listPublishedModulesForCourse(course.id);
  res.json({ modules });
});
