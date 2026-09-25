import { Request, Response } from "express";
import * as supportService from "../services/support.service";
import { asyncHandler } from "../utils/asyncHandler";

export const reportProblem = asyncHandler(async (req: Request, res: Response) => {
  await supportService.sendProblemReport(req.user!.id, {
    message: req.body.message,
    phone: req.body.phone,
    pageUrl: req.body.pageUrl,
    viewport: req.body.viewport,
    userAgent: req.get("user-agent") ?? "",
    screenshot: req.file
      ? { originalname: req.file.originalname, buffer: req.file.buffer, mimetype: req.file.mimetype }
      : undefined,
  });
  res.status(201).json({ ok: true });
});
