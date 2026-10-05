import { z } from "zod";
import { PRINT_DESIGNS, PRINT_KINDS, REFERRAL_REWARD_TYPES } from "../constants/referral";
import { VTPASS_NETWORKS } from "../constants/vtpass";

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

// Printable flyer/card PDFs on /refer/me. showName defaults to on: a named recommendation
// ("Recommended by Ada") is the point of a personal flyer, but ambassadors posting on a
// public noticeboard can switch it off.
export const printKitSchema = z.object({
  params: z.object({
    kind: z.enum(PRINT_KINDS),
  }),
  query: z.object({
    design: z.enum(PRINT_DESIGNS).default("general"),
    showName: z.enum(["true", "false"]).default("true"),
  }),
});

// Personalised video on /refer/me: the stock video with the ambassador's name and code on
// its end card. The slug is checked against the video manifest in the service.
export const personalisedVideoSchema = z.object({
  params: z.object({
    file: z.string().regex(/^[0-9]{2}-[a-z0-9-]+$/),
  }),
  query: z.object({
    showName: z.enum(["true", "false"]).default("true"),
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

export const payoutPreviewSchema = z.object({
  query: z.object({
    party: z.enum(["referrer", "referee"]),
  }),
});

export const dataPlansSchema = z.object({
  query: z.object({
    network: z.enum(VTPASS_NETWORKS),
    maxNgn: z.coerce.number().positive(),
  }),
});

export const sendRewardSchema = z.object({
  body: z.object({
    party: z.enum(["referrer", "referee"]),
    network: z.enum(VTPASS_NETWORKS),
    variationCode: z.string().min(1).max(100).optional(),
  }),
});
