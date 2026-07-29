import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const passwordResetRequestSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const passwordResetConfirmSchema = z.object({
  body: z.object({
    token: z.string().min(1),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});
