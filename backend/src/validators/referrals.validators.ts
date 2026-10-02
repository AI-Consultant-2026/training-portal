import { z } from "zod";
import { REFERRAL_REWARD_TYPES } from "../constants/referral";

export const setRewardPreferenceSchema = z.object({
  body: z.object({
    rewardType: z.enum(REFERRAL_REWARD_TYPES),
  }),
});

// Empty clears the number. Otherwise allow the usual phone punctuation, but require at
// least 10 digits so a typo like "0803" can't be saved as a payout number.
export const setPayoutPhoneSchema = z.object({
  body: z.object({
    phone: z
      .string()
      .max(25)
      .refine((v) => v.trim() === "" || /^\+?[\d\s()-]+$/.test(v.trim()), "Use digits only (a leading + is fine)")
      .refine((v) => v.trim() === "" || v.replace(/\D/g, "").length >= 10, "That number looks too short"),
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
