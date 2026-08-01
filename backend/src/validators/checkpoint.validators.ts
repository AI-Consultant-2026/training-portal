import { z } from "zod";

export const checkCheckpointAnswerSchema = z.object({
  body: z.object({
    answerId: z.string().uuid(),
  }),
});
