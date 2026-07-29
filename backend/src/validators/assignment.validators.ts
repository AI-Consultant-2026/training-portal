import { z } from "zod";

export const submitAssignmentSchema = z.object({
  body: z.object({
    submissionText: z.string().max(20000).optional(),
  }),
});

export const gradeSubmissionSchema = z.object({
  body: z.object({
    score: z.number().int().min(0),
    feedback: z.string().max(5000).optional(),
  }),
});
