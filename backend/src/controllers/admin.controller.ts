import { Request, Response } from "express";
import * as adminService from "../services/admin.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await adminService.getDashboardStats();
  res.json({ stats });
});

export const listCandidates = asyncHandler(async (_req: Request, res: Response) => {
  const candidates = await adminService.listCandidates();
  res.json({ candidates });
});

export const createCandidate = asyncHandler(async (req: Request, res: Response) => {
  const candidate = await adminService.createCandidate(req.body);
  res.status(201).json({ candidate });
});

export const addEnrollment = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("Candidate id is required");
  }
  const candidate = await adminService.addEnrollmentToCandidate(
    req.params.id,
    req.body.courseId,
    req.body.paymentConfirmed,
  );
  res.status(201).json({ candidate });
});

export const deactivateCandidate = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("Candidate id is required");
  }
  await adminService.deactivateCandidate(req.params.id);
  res.status(204).end();
});

export const deleteInactiveCandidates = asyncHandler(async (_req: Request, res: Response) => {
  const result = await adminService.deleteInactiveCandidates();
  res.json(result);
});

export const setPaymentConfirmed = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("Enrollment id is required");
  }
  const enrollment = await adminService.setPaymentConfirmed(
    req.params.id,
    req.body.paymentConfirmed,
  );
  res.json({ enrollment });
});

export const listLeads = asyncHandler(async (_req: Request, res: Response) => {
  const leads = await adminService.listLeads();
  res.json({ leads });
});
