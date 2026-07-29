import { Request, Response } from "express";
import { config } from "../config";
import * as authService from "../services/auth.service";
import { serializeUser } from "../services/user.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const REFRESH_COOKIE_NAME = "rt";

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax" as const,
    maxAge: config.jwt.refreshExpiresInDays * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  };
}

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE_NAME, token, refreshCookieOptions());
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth" });
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  setRefreshCookie(res, result.refreshToken);
  res.status(201).json({ user: serializeUser(result.user), accessToken: result.accessToken });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  setRefreshCookie(res, result.refreshToken);
  res.json({ user: serializeUser(result.user), accessToken: result.accessToken });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const existingToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!existingToken) {
    throw ApiError.unauthorized("Missing refresh token");
  }

  const result = await authService.refresh(existingToken);
  setRefreshCookie(res, result.refreshToken);
  res.json({ user: serializeUser(result.user), accessToken: result.accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const existingToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (existingToken) {
    await authService.logout(existingToken);
  }
  clearRefreshCookie(res);
  res.status(204).send();
});

export const requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
  await authService.requestPasswordReset(req.body.email);
  res.status(202).json({ message: "If that email exists, a reset link has been sent" });
});

export const confirmPasswordReset = asyncHandler(async (req: Request, res: Response) => {
  await authService.confirmPasswordReset(req.body.token, req.body.password);
  res.status(200).json({ message: "Password updated" });
});
