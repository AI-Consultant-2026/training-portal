import { z } from "zod";

export const updateMeSchema = z.object({
  body: z
    .object({
      firstName: z.string().min(1).optional(),
      lastName: z.string().min(1).optional(),
      profileData: z.record(z.unknown()).optional(),
    })
    .strict(),
});
