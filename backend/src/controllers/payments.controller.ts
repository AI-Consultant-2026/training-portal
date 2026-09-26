import { Request, Response } from "express";
import * as paymentService from "../services/payment.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getQuote = asyncHandler(async (req: Request, res: Response) => {
  const quote = await paymentService.getQuote(req.params.courseId);
  res.json({ quote });
});

export const startCardPayment = asyncHandler(async (req: Request, res: Response) => {
  const result = await paymentService.startCardPayment({ courseId: req.body.courseId, studentId: req.user!.id });
  res.status(201).json(result);
});
