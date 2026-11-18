import { Request, Response } from "express";
import * as discountCodeService from "../services/discountCode.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const list = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ codes: await discountCodeService.listCodes() });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ code: await discountCodeService.createCode(req.body) });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const code = await discountCodeService.updateCode(req.params.id, req.body);
  if (!code) throw ApiError.notFound("Discount code not found");
  res.json({ code });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  if (!(await discountCodeService.deleteCode(req.params.id))) throw ApiError.notFound("Discount code not found");
  res.status(204).end();
});
