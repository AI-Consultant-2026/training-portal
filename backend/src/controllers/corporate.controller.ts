import { Request, Response } from "express";
import { config } from "../config";
import * as corporateService from "../services/corporate.service";
import { serializeUser } from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";

// Same cookie as auth.controller.ts sets on register/login.
function setRefreshCookie(res: Response, token: string) {
  res.cookie("rt", token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax",
    maxAge: config.jwt.refreshExpiresInDays * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  });
}

// --- Admin -------------------------------------------------------------------

export const listClients = asyncHandler(async (_req: Request, res: Response) => {
  const [clients, courses] = await Promise.all([
    corporateService.listClients(),
    corporateService.listCorporateCourses(),
  ]);
  res.json({ clients, courses });
});

export const getClient = asyncHandler(async (req: Request, res: Response) => {
  res.json({ client: await corporateService.getClientDetail(req.params.id) });
});

export const createClient = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ client: await corporateService.createClient(req.body) });
});

export const updateClient = asyncHandler(async (req: Request, res: Response) => {
  res.json({ client: await corporateService.updateClient(req.params.id, req.body) });
});

export const regenerateCode = asyncHandler(async (req: Request, res: Response) => {
  res.json({ client: await corporateService.regenerateJoinCode(req.params.id) });
});

export const deleteClient = asyncHandler(async (req: Request, res: Response) => {
  await corporateService.deleteClient(req.params.id);
  res.status(204).end();
});

export const setManager = asyncHandler(async (req: Request, res: Response) => {
  res.json({ client: await corporateService.setManager(req.params.id, req.params.userId, req.body.isManager) });
});

export const removeMember = asyncHandler(async (req: Request, res: Response) => {
  await corporateService.removeMember(req.params.id, req.params.userId);
  res.json({ client: await corporateService.getClientDetail(req.params.id) });
});

export const adminInvite = asyncHandler(async (req: Request, res: Response) => {
  res.json(await corporateService.inviteStaff(req.params.id, req.body.emails, "Paleon Training"));
});

// --- Staff join link (public) -------------------------------------------------

export const getJoinInfo = asyncHandler(async (req: Request, res: Response) => {
  res.json(await corporateService.getJoinInfo(req.params.code));
});

export const joinNew = asyncHandler(async (req: Request, res: Response) => {
  const result = await corporateService.joinWithNewAccount(req.params.code, req.body);
  setRefreshCookie(res, result.refreshToken);
  res.status(201).json({ user: serializeUser(result.user), accessToken: result.accessToken });
});

export const joinExisting = asyncHandler(async (req: Request, res: Response) => {
  res.json(await corporateService.joinWithExistingAccount(req.params.code, req.user!.id, req.body.courseIds));
});

// --- /company (staff and managers) ---------------------------------------------

export const getMyCompany = asyncHandler(async (req: Request, res: Response) => {
  res.json(await corporateService.getMyCompany(req.user!.id));
});

export const managerInvite = asyncHandler(async (req: Request, res: Response) => {
  res.json(await corporateService.managerInvite(req.user!.id, req.body.emails));
});

export const managerRemove = asyncHandler(async (req: Request, res: Response) => {
  await corporateService.managerRemoveMember(req.user!.id, req.params.userId);
  res.json(await corporateService.getMyCompany(req.user!.id));
});
