import { z } from "zod";

export const submitCapstoneSchema = z.object({
  body: z.object({
    // Higher than the assignment equivalent (20000): one text field stands in for what
    // course content describes as multiple combined documents (e.g. an audit report +
    // remediation roadmap + incident response plan), so it needs more room.
    submissionText: z.string().max(50000).optional(),
  }),
});

export const gradeCapstoneSchema = z.object({
  body: z.object({
    score: z.number().int().min(0),
    feedback: z.string().max(5000).optional(),
  }),
});
