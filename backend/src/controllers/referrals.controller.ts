import { Request, Response } from "express";
import { config } from "../config";
import * as referralService from "../services/referral.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMySummary = asyncHandler(async (req: Request, res: Response) => {
  const summary = await referralService.getMyReferralSummary(req.user!.id, config.corsOrigin);
  res.json({ referral: summary });
});

export const setRewardPreference = asyncHandler(async (req: Request, res: Response) => {
  const rewardType = await referralService.setRewardPreference(req.user!.id, req.body.rewardType);
  res.json({ rewardType });
});

export const getLeaderboard = asyncHandler(async (_req: Request, res: Response) => {
  const leaderboard = await referralService.getLeaderboard();
  res.json({ leaderboard });
});

export const validateCode = asyncHandler(async (req: Request, res: Response) => {
  const result = await referralService.validateCode(req.body.code);
  res.json(result);
});

/* ---------------------------------- admin ---------------------------------- */

export const listReferrals = asyncHandler(async (req: Request, res: Response) => {
  const referrals = await referralService.listReferralsForAdmin({
    status: req.query.status as "pending" | "qualified" | "void" | undefined,
    rewardStatus: req.query.rewardStatus as "pending" | "issued" | undefined,
  });
  const overview = await referralService.getReferralOverview();
  res.json({ referrals, overview });
});

export const issueReward = asyncHandler(async (req: Request, res: Response) => {
  const referral = await referralService.markRewardIssued(req.params.id as string, req.body.party);
  res.json({ referral });
});

export const voidReferral = asyncHandler(async (req: Request, res: Response) => {
  const referral = await referralService.voidReferral(req.params.id as string, req.body.reason);
  res.json({ referral });
});
