import { z } from "zod";

export const submitQuizSchema = z.object({
  body: z.object({
    attemptId: z.string().uuid(),
    responses: z
      .array(
        z.object({
          questionId: z.string().uuid(),
          studentAnswer: z.string().min(1).max(5000),
        }),
      )
      .min(1),
  }),
});

export const gradeQuizAttemptSchema = z.object({
  body: z.object({
    responses: z
      .array(
        z.object({
          responseId: z.string().uuid(),
          pointsEarned: z.number().int().min(0),
        }),
      )
      .min(1),
  }),
});
