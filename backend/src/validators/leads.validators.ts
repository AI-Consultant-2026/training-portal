import { z } from "zod";

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    course: z.string().min(1),
  }),
});
