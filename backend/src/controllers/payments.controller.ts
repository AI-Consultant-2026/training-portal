import { Request, Response } from "express";
import * as paymentService from "../services/payment.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getQuote = asyncHandler(async (req: Request, res: Response) => {
  const billingCountry =
    typeof req.query.billingCountry === "string" ? req.query.billingCountry : undefined;
  const quote = await paymentService.getQuote(req.params.courseId, billingCountry);
  res.json({ quote });
});

export const payWithCard = asyncHandler(async (req: Request, res: Response) => {
  const result = await paymentService.chargeCourseCard({ ...req.body, studentId: req.user!.id });
  res.status(201).json(result);
});

export const submitBankTransfer = asyncHandler(async (req: Request, res: Response) => {
  const result = await paymentService.submitBankTransfer({ ...req.body, studentId: req.user!.id });
  res.status(201).json(result);
});
