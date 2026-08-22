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

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("Lead id is required");
  }
  await adminService.deleteLead(req.params.id);
  res.status(204).end();
});

export const listCoursePayments = asyncHandler(async (req: Request, res: Response) => {
  const status = req.query.status as "confirmed" | "pending";
  const payments = await adminService.listCoursePayments(req.params.courseId as string, status);
  res.json({ payments });
});

export const listQuizzes = asyncHandler(async (_req: Request, res: Response) => {
  const quizzes = await adminService.listQuizzes();
  res.json({ quizzes });
});

export const setQuizEnabled = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("Quiz id is required");
  }
  const quiz = await adminService.setQuizEnabled(req.params.id, req.body.isEnabled);
  res.json({ quiz });
});

export const listCapstones = asyncHandler(async (_req: Request, res: Response) => {
  const capstones = await adminService.listCapstones();
  res.json({ capstones });
});

export const setCapstoneEnabled = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("Capstone id is required");
  }
  const capstone = await adminService.setCapstoneEnabled(req.params.id, req.body.isEnabled);
  res.json({ capstone });
});
