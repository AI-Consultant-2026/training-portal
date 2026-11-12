import { z } from "zod";
import { MAX_ORDER_SEATS, ORDER_PROGRAMMES, PRICE_REGIONS } from "../constants/corporatePricing";

// Corporate online orders (2026-11-12): the "Buy learner places" form on the corporate pages.
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), schema.nullable().optional());

export const corporateOrderSchema = z.object({
  body: z
    .object({
      organisation: z.string().trim().min(2).max(200),
      contactName: z.string().trim().min(2).max(150),
      contactEmail: z.string().trim().email().max(200),
      phone: optional(z.string().trim().max(30)),
      region: z.enum(PRICE_REGIONS as [string, ...string[]]),
      buyerCountry: optional(z.string().trim().max(100)),
      programme: z.enum(ORDER_PROGRAMMES as [string, ...string[]]),
      seats: z.coerce.number().int().min(1).max(MAX_ORDER_SEATS),
      payByInvoice: z.boolean().optional(),
      consent: z.literal(true, { errorMap: () => ({ message: "Please agree to the terms to continue" }) }),
      // Honeypot: real people never fill this hidden field.
      website: z.string().max(0).optional(),
    })
    .refine((b) => b.region !== "INTL" || Boolean(b.buyerCountry), {
      message: "Tell us which country your organisation is in",
      path: ["buyerCountry"],
    }),
});
