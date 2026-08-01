import { z } from "zod";

export const submitQuizSchema = z.object({
  body: z.object({
    attemptId: z.string().uuid(),
    // No .min(1) here deliberately: an attempt can legitimately auto-submit with zero
    // responses when the time limit expires before the student answers anything, and
    // that submission must still be accepted so the attempt finalizes (as a 0% score)
    // instead of erroring out and leaving the attempt stuck "in_progress" forever.
    responses: z.array(
      z.object({
        questionId: z.string().uuid(),
        studentAnswer: z.string().min(1).max(5000),
      }),
    ),
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
