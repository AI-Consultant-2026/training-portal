import { Router } from "express";
import rateLimit from "express-rate-limit";
import { config } from "../config";
import * as referralsController from "../controllers/referrals.controller";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { setRewardPreferenceSchema, validateCodeSchema } from "../validators/referrals.validators";

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
