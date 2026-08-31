import { z } from "zod";
import { REFERRAL_REWARD_TYPES } from "../constants/referral";

export const setRewardPreferenceSchema = z.object({
  body: z.object({
    rewardType: z.enum(REFERRAL_REWARD_TYPES),
  }),
});

export const validateCodeSchema = z.object({
  body: z.object({
    code: z.string().min(1).max(40),
  }),
});

export const listReferralsSchema = z.object({
  query: z.object({
    status: z.enum(["pending", "qualified", "void"]).optional(),
    rewardStatus: z.enum(["pending", "issued"]).optional(),
  }),
});

export const issueRewardSchema = z.object({
  body: z.object({
    party: z.enum(["referrer", "referee"]),
  }),
});

export const voidReferralSchema = z.object({
  body: z.object({
    reason: z.string().max(500).optional(),
  }),
});
