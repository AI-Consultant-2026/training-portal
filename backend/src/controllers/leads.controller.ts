import { Request, Response } from "express";
import * as leadService from "../services/lead.service";
import { asyncHandler } from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body);
  res.status(201).json({ id: lead.id });
});
