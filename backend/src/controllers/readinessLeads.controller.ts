import { Request, Response } from "express";
import { createReadinessLead } from "../services/readinessLead.service";
import { asyncHandler } from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { lead, result } = await createReadinessLead(req.body);
  res.status(201).json({ id: lead.id, score: result.score, cyber: result.cyber, ai: result.ai, band: result.band });
});
