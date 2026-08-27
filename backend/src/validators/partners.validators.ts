import { z } from "zod";

export const PARTNER_CATEGORIES = [
  "Job Board",
  "NYSC / SAED",
  "University Career Centre",
  "Community Channel",
] as const;

export const PARTNER_STATUSES = [
  "not-started",
  "drafted",
  "sent",
  "in-conversation",
  "partnered",
  "declined",
] as const;

// Permissive on purpose -- this is a free-text field that may hold an email, a phone
// number, a contact person's name, or a mix, not just an email address on its own.
const optionalText = z.string().max(2000).optional().nullable();

export const createPartnerSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    category: z.enum(PARTNER_CATEGORIES),
    sector: optionalText,
    url: optionalText,
    contact: optionalText,
    contactName: optionalText,
    cost: optionalText,
    status: z.enum(PARTNER_STATUSES).default("not-started"),
    lastContacted: z.string().date().optional().nullable(),
    renewalDate: z.string().date().optional().nullable(),
    notes: optionalText,
  }),
});

export const updatePartnerSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    category: z.enum(PARTNER_CATEGORIES).optional(),
    sector: optionalText,
    url: optionalText,
    contact: optionalText,
    contactName: optionalText,
    cost: optionalText,
    status: z.enum(PARTNER_STATUSES).optional(),
    lastContacted: z.string().date().optional().nullable(),
    renewalDate: z.string().date().optional().nullable(),
    notes: optionalText,
  }),
});
