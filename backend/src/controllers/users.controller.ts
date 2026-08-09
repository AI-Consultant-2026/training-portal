import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user!.id);
  res.json({ user: userService.serializeUser(user) });
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateProfile(req.user!.id, req.body);
  res.json({ user: userService.serializeUser(user) });
});

export const heartbeat = asyncHandler(async (req: Request, res: Response) => {
  await userService.recordHeartbeat(req.user!.id);
  res.status(204).end();
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw ApiError.badRequest("User id is required");
  }
  const user = await userService.getUserById(req.params.id);
  res.json({ user: userService.serializeUser(user) });
});
