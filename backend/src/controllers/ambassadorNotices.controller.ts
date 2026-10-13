import { Request, Response } from "express";
import * as noticeService from "../services/ambassadorNotice.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const listActive = asyncHandler(async (_req: Request, res: Response) => {
  const notices = await noticeService.listActiveNotices();
  res.json({ notices });
});

export const listAll = asyncHandler(async (_req: Request, res: Response) => {
  const notices = await noticeService.listAllNotices();
  res.json({ notices });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const notice = await noticeService.createNotice(req.body);
  res.status(201).json({ notice });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const notice = await noticeService.updateNotice(req.params.id, req.body);
  if (!notice) throw ApiError.notFound("Notice not found");
  res.json({ notice });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  if (!(await noticeService.deleteNotice(req.params.id))) {
    throw ApiError.notFound("Notice not found");
  }
  res.status(204).end();
});
