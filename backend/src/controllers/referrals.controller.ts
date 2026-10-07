import { Request, Response } from "express";
import { config } from "../config";
import * as ambassadorVideoService from "../services/ambassadorVideo.service";
import * as referralPayoutService from "../services/referralPayout.service";
import * as referralPrintService from "../services/referralPrint.service";
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

export const setPayoutPhone = asyncHandler(async (req: Request, res: Response) => {
  const phone = await referralService.setPayoutPhone(req.user!.id, req.body.phone);
  res.json({ phone });
});

export const downloadPrintKit = asyncHandler(async (req: Request, res: Response) => {
  const kind = req.params.kind as referralPrintService.PrintKind;
  const data = await referralPrintService.getPrintData(
    req.user!.id,
    config.corsOrigin,
    (req.query.design as referralPrintService.PrintDesign | undefined) ?? "general",
    req.query.showName !== "false",
  );
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${referralPrintService.printFilename(kind, data)}"`);
  referralPrintService.streamPrintPdf(kind, data, res);
});

export const downloadPersonalisedVideo = asyncHandler(async (req: Request, res: Response) => {
  const { filePath, filename } = await ambassadorVideoService.getPersonalisedVideoForUser(
    req.user!.id,
    req.params.file as string,
    req.query.showName !== "false",
  );
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Cache-Control", "private, max-age=3600");
  res.attachment(filename);
  res.sendFile(filePath);
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

/* ---------------------- admin: airtime/data reward payouts ------------------- */

export const getPayoutConfig = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await referralPayoutService.getPayoutConfig());
});

export const previewPayout = asyncHandler(async (req: Request, res: Response) => {
  const preview = await referralPayoutService.previewPayout(
    req.params.id as string,
    req.query.party as "referrer" | "referee",
  );
  res.json({ preview });
});

export const listDataPlans = asyncHandler(async (req: Request, res: Response) => {
  const plans = await referralPayoutService.listDataPlansWithin(
    req.query.network as "mtn" | "airtel" | "glo" | "etisalat",
    Number(req.query.maxNgn),
  );
  res.json({ plans });
});

export const sendReward = asyncHandler(async (req: Request, res: Response) => {
  const outcome = await referralPayoutService.sendReward({
    referralId: req.params.id as string,
    party: req.body.party,
    network: req.body.network,
    variationCode: req.body.variationCode,
    adminId: req.user!.id,
  });
  res.json(outcome);
});

export const refreshPayout = asyncHandler(async (req: Request, res: Response) => {
  res.json(await referralPayoutService.refreshPayout(req.params.id as string));
});
