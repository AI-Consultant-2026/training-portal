import { z } from "zod";
import { REGISTRATION_STATUSES } from "./auth.validators";
import { COUNTRIES, COUNTRY_CODES } from "../constants/countries";

// Reuses the same allow-list as registration (auth.validators.ts) rather than a third
// copy -- see that file's REGISTRATION_STATUSES for the drift risk this avoids.
export { REGISTRATION_STATUSES };

// Channels used in the lead-gen push -- see the "how I can get 1000 leads" plan this
// was built for. Lets the admin leads table/CSV attribute conversions back to which
// channel (NYSC camp, a specific campus ambassador, etc.) actually produced them.
// The country homepages (2026-10-30) swap "NYSC Camp" for that country's own national
// service or campus option, so every country's option is accepted.
const COMMON_LEAD_SOURCES = [
  "WhatsApp/Telegram Group",
  "Campus Ambassador",
  "Social Media Ads",
  "Search/Website",
  "Referral",
  "Other",
];
export const LEAD_SOURCES = unique([
  "NYSC Camp",
  ...Object.values(COUNTRIES).map((c) => c.site.nationalServiceOption),
  ...COMMON_LEAD_SOURCES,
]);

/** The "How did you hear about us?" options for one country's Career Match. */
export function leadSourcesFor(nationalServiceOption: string): string[] {
  return [nationalServiceOption, ...COMMON_LEAD_SOURCES];
}

function unique(values: string[]): [string, ...string[]] {
  return [...new Set(values)] as [string, ...string[]];
}

// Permissive on purpose -- Nigerian numbers show up in several written forms
// (+234..., 0..., with spaces/dashes) and this is a lead-capture form, not a payment
// flow, so rejecting a real but oddly-formatted number costs more than it protects.
// Free Career Match form (2026-09-25): the industry the visitor is aiming for, and the
// kind of work they're drawn to -- the homepage maps these to a recommended course.
// The options come from each country's industryOptions in constants/countries.ts.
export const LEAD_SECTORS = unique([
  ...Object.values(COUNTRIES).flatMap((c) => c.site.industryOptions.map((o) => o.label)),
  "Not sure yet",
]);
export const LEAD_INTERESTS = [
  "Protecting systems and data",
  "Maps, drones and location data",
  "Marketing, content and online growth",
  "Health, safety and site operations",
  "AI, data and automation",
  "Not sure yet",
] as const;

const PHONE_REGEX = /^[0-9+()\s-]{7,20}$/;

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().regex(PHONE_REGEX).optional(),
    course: z.string().min(1),
    university: z.enum(REGISTRATION_STATUSES).optional(),
    source: z.enum(LEAD_SOURCES).optional(),
    sector: z.enum(LEAD_SECTORS).optional(),
    interest: z.enum(LEAD_INTERESTS).optional(),
    // The country homepages (/ng, /za, /ke, /gh) send their own code; older forms leave it out.
    country: z.enum(COUNTRY_CODES).default("NG"),
    // The "email me" tick-box on the Ghana, Kenya and South Africa forms (2026-10-30).
    // Required there; Nigeria's forms don't have one.
    consent: z.literal(true).optional(),
  }).refine((body) => body.country === "NG" || body.consent === true, {
    message: "Please tick the box to agree to receive emails",
    path: ["consent"],
  }),
});
