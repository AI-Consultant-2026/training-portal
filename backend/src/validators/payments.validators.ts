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

export const instalmentVerifySchema = z.object({
  body: z.object({ reference: z.string().min(1).max(100) }),
});
