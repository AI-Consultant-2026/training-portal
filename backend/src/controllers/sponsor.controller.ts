import { Request, Response } from "express";
import * as sponsorService from "../services/sponsor.service";
import { asyncHandler } from "../utils/asyncHandler";

export const createSponsorLink = asyncHandler(async (req: Request, res: Response) => {
  const result = await sponsorService.createSponsorLink(req.body.courseId, req.user!.id);
  res.status(201).json(result);
});

export const getSponsorPage = asyncHandler(async (req: Request, res: Response) => {
  const sponsor = await sponsorService.getSponsorPage(req.params.token);
  res.json({ sponsor });
});

export const startSponsorPayment = asyncHandler(async (req: Request, res: Response) => {
  const { paymentLink } = await sponsorService.startSponsorPayment(req.params.token, req.body.kind);
  res.status(201).json({ paymentLink });
});

export const verifySponsorPayment = asyncHandler(async (req: Request, res: Response) => {
  const result = await sponsorService.verifySponsorPayment(req.params.token, req.body.reference);
  res.json(result);
});
