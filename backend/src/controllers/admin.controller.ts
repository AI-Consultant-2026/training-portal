import { Request, Response } from "express";
import * as adminService from "../services/admin.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await adminService.getDashboardStats();
  res.json({ stats });
});
