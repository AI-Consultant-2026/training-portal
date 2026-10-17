import { Request, Response } from "express";
import * as salesRepService from "../services/salesRep.service";
import { asyncHandler } from "../utils/asyncHandler";

export const list = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ reps: await salesRepService.listReps() });
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  res.json({ rep: await salesRepService.getRep(req.params.id) });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ rep: await salesRepService.createRep(req.body) });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  res.json({ rep: await salesRepService.updateRep(req.params.id, req.body) });
});

export const recordPayment = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ rep: await salesRepService.recordPayment(req.params.id, req.body) });
});

export const deletePayment = asyncHandler(async (req: Request, res: Response) => {
  res.json({ rep: await salesRepService.deletePayment(req.params.id, req.params.paymentId) });
});
