import { z } from "zod";

const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), schema.nullable().optional());

const codeBody = z.object({
  code: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]{3,40}$/, "Use 3-40 letters, numbers, dashes or underscores"),
  percentOff: z.coerce.number().int().min(1).max(90),
  description: optional(z.string().trim().max(200)),
  active: z.boolean().optional(),
  expiresAt: optional(z.string().refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date")),
});

export const createDiscountCodeSchema = z.object({ body: codeBody });

export const updateDiscountCodeSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: codeBody,
});

export const discountCodeIdSchema = z.object({ params: z.object({ id: z.string().uuid() }) });
