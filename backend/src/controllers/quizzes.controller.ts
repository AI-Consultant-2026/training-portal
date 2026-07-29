import { Request, Response } from "express";
import * as quizService from "../services/quiz.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listByModule = asyncHandler(async (req: Request, res: Response) => {
  const quizzes = await quizService.listByModule(req.params.id);
  res.json({ quizzes });
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const quiz = await quizService.getById(req.params.id);
  res.json({ quiz });
});

export const start = asyncHandler(async (req: Request, res: Response) => {
  const result = await quizService.start(req.params.id, req.user!.id);
  res.status(201).json(result);
});

export const submit = asyncHandler(async (req: Request, res: Response) => {
  const result = await quizService.submit(req.body.attemptId, req.user!.id, req.body.responses);
  res.json(result);
});

export const getAttempt = asyncHandler(async (req: Request, res: Response) => {
  const attempt = await quizService.getAttempt(req.params.id, req.params.attemptId, req.user!);
  res.json({ attempt });
});

export const listMyAttempts = asyncHandler(async (req: Request, res: Response) => {
  const result = await quizService.listMyAttempts(req.params.id, req.user!.id);
  res.json(result);
});
