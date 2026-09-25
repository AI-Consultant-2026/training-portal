import { Request, Response } from "express";
import * as feedbackService from "../services/feedback.service";
import { asyncHandler } from "../utils/asyncHandler";

export const saveMyFeedback = asyncHandler(async (req: Request, res: Response) => {
  const feedback = await feedbackService.saveFeedback(req.params.id, req.user!.id, req.body);
  res.status(201).json({ feedback });
});

export const getMyFeedback = asyncHandler(async (req: Request, res: Response) => {
  const feedback = await feedbackService.getMyFeedback(req.params.id, req.user!.id);
  res.json({ feedback });
});

export const listForAdmin = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ feedback: await feedbackService.listFeedbackForAdmin() });
});

export const setApproved = asyncHandler(async (req: Request, res: Response) => {
  const feedback = await feedbackService.setFeedbackApproved(req.params.id, req.body.approved);
  res.json({ feedback });
});

export const listPublic = asyncHandler(async (req: Request, res: Response) => {
  const course = typeof req.query.course === "string" ? req.query.course : undefined;
  res.set("Cache-Control", "public, max-age=300");
  res.json({ testimonials: await feedbackService.listPublicTestimonials(course) });
});
