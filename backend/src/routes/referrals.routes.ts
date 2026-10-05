import { Router } from "express";
import rateLimit from "express-rate-limit";
import { config } from "../config";
import * as referralsController from "../controllers/referrals.controller";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import {
  personalisedVideoSchema,
  printKitSchema,
  setPayoutPhoneSchema,
  setRewardPreferenceSchema,
  validateCodeSchema,
} from "../validators/referrals.validators";

export const referralsRouter = Router();

// Public: the register page checks a pasted/linked code before showing "invited by X".
// Rate-limited because it's unauthenticated and technically enumerable -- a valid code
// returns the referrer's name, so no reason to allow bulk probing.
const validateCodeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});

referralsRouter.get("/leaderboard", referralsController.getLeaderboard);
referralsRouter.post(
  "/validate-code",
  validateCodeLimiter,
  validate(validateCodeSchema),
  referralsController.validateCode,
);

referralsRouter.get("/me", authenticate, referralsController.getMySummary);
referralsRouter.patch(
  "/me/reward-preference",
  authenticate,
  validate(setRewardPreferenceSchema),
  referralsController.setRewardPreference,
);
referralsRouter.patch(
  "/me/payout-phone",
  authenticate,
  validate(setPayoutPhoneSchema),
  referralsController.setPayoutPhone,
);
referralsRouter.get("/me/print/:kind", authenticate, validate(printKitSchema), referralsController.downloadPrintKit);

// Each new name/code/video combination costs an ffmpeg run (cached after that), so cap
// how many one account can ask for.
const personalisedVideoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? "anonymous",
  skip: () => config.nodeEnv === "test",
});
referralsRouter.get(
  "/me/videos/:file",
  authenticate,
  personalisedVideoLimiter,
  validate(personalisedVideoSchema),
  referralsController.downloadPersonalisedVideo,
);
