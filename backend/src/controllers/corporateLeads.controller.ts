import { Request, Response } from "express";
import { createCorporateLead } from "../services/corporateLead.service";
import { asyncHandler } from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const lead = await createCorporateLead(req.body);
  res.status(201).json({ id: lead.id });
});
