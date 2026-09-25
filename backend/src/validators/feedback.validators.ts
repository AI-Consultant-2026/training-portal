import { z } from "zod";

export const feedbackSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().min(10, "Please write a sentence or two.").max(1000),
    consentQuote: z.boolean(),
    consentCapstone: z.boolean(),
  }),
});

export const approveFeedbackSchema = z.object({
  body: z.object({ approved: z.boolean() }),
});
