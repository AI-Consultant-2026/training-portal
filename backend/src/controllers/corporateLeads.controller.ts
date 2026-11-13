import { Request, Response } from "express";
import { createCorporateLead } from "../services/corporateLead.service";
import { createPreviewSignup } from "../services/corporatePreview.service";
import { asyncHandler } from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const lead = await createCorporateLead(req.body);
  res.status(201).json({ id: lead.id });
});

// Free leadership preview sign-up (2026-11-13): returns the sample's address to open at once.
export const preview = asyncHandler(async (req: Request, res: Response) => {
  const { url } = await createPreviewSignup(req.body);
  res.status(201).json({ url });
});
