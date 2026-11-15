import { z } from "zod";
import { COUNTRY_CODES, HOMEPAGE_COURSES } from "../constants/countries";
import { MAX_DISCOUNT_PERCENT, MAX_UNIVERSITY_SEATS } from "../services/universityPricing.service";

// University places (2026-11-15).
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), schema.nullable().optional());

const items = z
  .array(
    z.object({
      courseSlug: z.enum(HOMEPAGE_COURSES),
      seats: z.coerce.number().int().min(0).max(MAX_UNIVERSITY_SEATS),
    }),
  )
  .min(1)
  .max(HOMEPAGE_COURSES.length)
  .refine((list) => list.some((i) => i.seats > 0), "Enter the number of places on at least one course");

// "Buy places for your students" on /<country>/universities (public).
export const universityOrderSchema = z.object({
  body: z.object({
    organisation: z.string().trim().min(2).max(200),
    contactName: z.string().trim().min(2).max(150),
    contactEmail: z.string().trim().email().max(200),
    phone: optional(z.string().trim().max(30)),
    country: z.enum(COUNTRY_CODES),
    items,
    payByInvoice: z.boolean().optional(),
    consent: z.literal(true, { errorMap: () => ({ message: "Please agree to the terms to continue" }) }),
    // Honeypot: real people never fill this hidden field.
    website: z.string().max(0).optional(),
  }),
});

// "Buy more places" on /university (logged-in representative).
export const universityTopUpSchema = z.object({
  body: z.object({
    items,
    phone: optional(z.string().trim().max(30)),
    payByInvoice: z.boolean().optional(),
  }),
});

// /admin/university-discounts.
export const discountTiersSchema = z.object({
  body: z.object({
    tiers: z
      .array(
        z.object({
          minLearners: z.coerce.number().int().min(2).max(MAX_UNIVERSITY_SEATS),
          percent: z.coerce.number().int().min(0).max(MAX_DISCOUNT_PERCENT),
        }),
      )
      .max(10),
  }),
});
