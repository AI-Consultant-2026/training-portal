import { z } from "zod";
import { UNIVERSITIES } from "./auth.validators";

// Reuses the same allow-list as registration (auth.validators.ts) rather than a third
// copy -- see that file's UNIVERSITIES for the drift risk this avoids.
export { UNIVERSITIES };

// Channels used in the lead-gen push -- see the "how I can get 1000 leads" plan this
// was built for. Lets the admin leads table/CSV attribute conversions back to which
// channel (NYSC camp, a specific campus ambassador, etc.) actually produced them.
export const LEAD_SOURCES = [
  "NYSC Camp",
  "WhatsApp/Telegram Group",
  "Campus Ambassador",
  "Social Media Ads",
  "Search/Website",
  "Referral",
  "Other",
] as const;

// Permissive on purpose -- Nigerian numbers show up in several written forms
// (+234..., 0..., with spaces/dashes) and this is a lead-capture form, not a payment
// flow, so rejecting a real but oddly-formatted number costs more than it protects.
const PHONE_REGEX = /^[0-9+()\s-]{7,20}$/;

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().regex(PHONE_REGEX).optional(),
    course: z.string().min(1),
    university: z.enum(UNIVERSITIES).optional(),
    source: z.enum(LEAD_SOURCES).optional(),
  }),
});
