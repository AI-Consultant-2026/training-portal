import { Request, Response } from "express";
import * as lessonService from "../services/lesson.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listLessonsForModule = asyncHandler(async (req: Request, res: Response) => {
  const lessons = await lessonService.listLessonsForModule(req.params.id);
  res.json({ lessons });
});

export const getLesson = asyncHandler(async (req: Request, res: Response) => {
  const lesson = await lessonService.getLessonById(req.params.id);
  res.json({ lesson });
});

export const markLessonComplete = asyncHandler(async (req: Request, res: Response) => {
  const result = await lessonService.markLessonComplete(req.params.id, req.user!.id);
  res.json(result);
});

export const getMyLessonCompletion = asyncHandler(async (req: Request, res: Response) => {
  const completed = await lessonService.isLessonCompletedByStudent(req.params.id, req.user!.id);
  res.json({ completed });
});
