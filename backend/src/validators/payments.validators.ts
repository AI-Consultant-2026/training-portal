import { z } from "zod";

export const getQuoteSchema = z.object({
  params: z.object({ courseId: z.string().min(1) }),
});

export const cardPaymentStartSchema = z.object({
  body: z.object({ courseId: z.string().min(1).max(255) }),
});

export const bankTransferSchema = z.object({
  body: z.object({
    courseId: z.string().min(1).max(255),
    transferReference: z.string().min(1).max(255),
    // Multipart forms send "" for an untouched field -- treat that as "no note".
    notes: z
      .string()
      .max(1000)
      .optional()
      .transform((v) => (v && v.trim() ? v : undefined)),
  }),
});
