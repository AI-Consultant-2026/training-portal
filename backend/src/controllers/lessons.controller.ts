import { Request, Response } from "express";
import * as lessonService from "../services/lesson.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listLessonsForModule = asyncHandler(async (req: Request, res: Response) => {
  const lessons = await lessonService.listLessonsForModule(req.params.id, req.user);
  res.json({ lessons });
});

export const getLesson = asyncHandler(async (req: Request, res: Response) => {
  const lesson = await lessonService.getLessonForStudent(req.params.id, req.user!);
  res.json({ lesson });
});

export const getLessonNavigation = asyncHandler(async (req: Request, res: Response) => {
  const navigation = await lessonService.getLessonNavigation(req.params.id);
  res.json(navigation);
});

export const markLessonComplete = asyncHandler(async (req: Request, res: Response) => {
  const result = await lessonService.markLessonComplete(req.params.id, req.user!.id);
  res.json(result);
});

export const getMyLessonCompletion = asyncHandler(async (req: Request, res: Response) => {
  const completed = await lessonService.isLessonCompletedByStudent(req.params.id, req.user!.id);
  res.json({ completed });
});

export const getLessonCheckpoints = asyncHandler(async (req: Request, res: Response) => {
  const checkpoints = await lessonService.getCheckpointsForLesson(req.params.id);
  res.json({ checkpoints });
});

export const checkCheckpointAnswer = asyncHandler(async (req: Request, res: Response) => {
  const result = await lessonService.checkCheckpointAnswer(req.params.checkpointId, req.body.answerId);
  res.json(result);
});
