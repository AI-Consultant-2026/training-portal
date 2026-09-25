import { z } from "zod";

const PHONE_REGEX = /^[0-9+()\s-]{7,20}$/;

// Multipart form fields arrive as strings; empty optional fields are dropped rather
// than rejected, since the browser sends "" for an untouched input.
const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) => (v && v.trim() ? v.trim() : undefined));

export const problemReportSchema = z.object({
  body: z.object({
    message: z.string().trim().min(10, "Please describe the problem in a sentence or two.").max(3000),
    phone: z
      .string()
      .optional()
      .transform((v) => (v && v.trim() ? v.trim() : undefined))
      .refine((v) => v === undefined || PHONE_REGEX.test(v), "Please check your phone number."),
    pageUrl: optionalText(500),
    viewport: optionalText(40),
  }),
});
