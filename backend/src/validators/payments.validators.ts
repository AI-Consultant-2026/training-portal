import { z } from "zod";

export const getQuoteSchema = z.object({
  params: z.object({ courseId: z.string().min(1) }),
});

export const cardPaymentStartSchema = z.object({
  body: z.object({ courseId: z.string().min(1).max(255) }),
});

export const instalmentPaymentStartSchema = z.object({
  body: z.object({ courseId: z.string().min(1).max(255), kind: z.enum(["deposit", "balance"]) }),
});

// Paystack's reference, or Flutterwave's numeric transaction id (2026-10-30).
const verifyBody = z.union([
  z.object({ reference: z.string().min(1).max(100) }),
  z.object({ transactionId: z.string().regex(/^\d{1,20}$/) }),
]);

export const instalmentVerifySchema = z.object({ body: verifyBody });

export const sponsorLinkSchema = z.object({
  body: z.object({ courseId: z.string().min(1).max(255) }),
});

const sponsorTokenParams = z.object({ token: z.string().min(10).max(120) });

export const sponsorTokenSchema = z.object({ params: sponsorTokenParams });

export const sponsorPaySchema = z.object({
  params: sponsorTokenParams,
  body: z.object({ kind: z.enum(["deposit", "balance", "full"]) }),
});

export const sponsorVerifySchema = z.object({ params: sponsorTokenParams, body: verifyBody });
