import { z } from "zod";
import { COUNTRY_CODES } from "../constants/countries";

// The enquiry form on the AI Workflow Productivity corporate pages (2026-11-02):
// /ng, /za, /gh and /ke/corporate-training/ai-workflow-productivity.
// The option lists here and in views/corporateAiWorkflow.ts must match.

export const CORPORATE_EMPLOYEE_BANDS = ["1–49", "50–249", "250–999", "1,000+"] as const;

export const CORPORATE_DEPARTMENTS = [
  "Whole organisation",
  "Leadership / Executive",
  "HR / Learning & Development",
  "Finance",
  "Operations",
  "Sales",
  "Marketing",
  "Customer Service",
  "Administration",
  "Procurement",
  "Project Management",
  "IT / Digital",
  "Other",
] as const;

export const CORPORATE_REQUIREMENTS = [
  "Executive AI workshop",
  "Department training",
  "Whole-workforce training",
  "AI Workflow Transformation Programme",
  "AI governance / policy workshop",
  "Review of current AI use",
  "Not sure yet",
] as const;

// The CyberSecure Workforce pages' options (2026-11-02):
// /ng, /za, /gh and /ke/corporate-training/cybersecure-workforce.
export const CYBERSECURE_REQUIREMENTS = [
  "Executive awareness workshop",
  "Department training",
  "Organisation-wide awareness programme",
  "Not sure yet",
] as const;

// Either programme's options are accepted.
const ALL_REQUIREMENTS = Array.from(new Set<string>([...CORPORATE_REQUIREMENTS, ...CYBERSECURE_REQUIREMENTS])) as [string, ...string[]];

// Which corporate programme the enquiry came from; older AI pages send none.
export const CORPORATE_PROGRAMMES = ["ai-workflow", "cybersecure-workforce"] as const;
export type CorporateProgramme = (typeof CORPORATE_PROGRAMMES)[number];

// Nigeria offers all three; Ghana, Kenya and South Africa are online only, so their
// forms don't ask.
export const CORPORATE_DELIVERY = ["Online", "In-house", "Hybrid", "Not sure"] as const;

export const CORPORATE_INTENTS = ["consultation", "proposal"] as const;

// The words the visitor agreed to, saved with the lead.
export const CORPORATE_CONSENT_TEXT =
  "I agree that Paleon Training may use these details to respond to my enquiry, as described in the Privacy Policy.";

const PHONE_REGEX = /^[0-9+()\s-]{7,20}$/;
const short = (max = 150) => z.string().trim().min(1).max(max);
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const corporateLeadSchema = z.object({
  body: z.object({
    name: short(),
    jobTitle: short(),
    organisation: short(200),
    country: z.enum(COUNTRY_CODES),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().regex(PHONE_REGEX),
    employees: z.enum(CORPORATE_EMPLOYEE_BANDS),
    department: z.enum(CORPORATE_DEPARTMENTS).optional(),
    requirement: z.enum(ALL_REQUIREMENTS).optional(),
    delivery: z.enum(CORPORATE_DELIVERY).optional(),
    message: optionalText(3000),
    intent: z.enum(CORPORATE_INTENTS).default("consultation"),
    programme: z.enum(CORPORATE_PROGRAMMES).default("ai-workflow"),
    // Required: they must agree before we can reply.
    consent: z.literal(true, { errorMap: () => ({ message: "Please tick the box so we can reply to your enquiry" }) }),
    // Optional: occasional marketing updates.
    updates: z.boolean().optional(),
    // The page the form was sent from.
    page: optionalText(300),
    // Honeypot: hidden from people, so anything here is a bot.
    website: z.string().max(0).optional(),
  }),
});

export type CorporateLeadInput = z.infer<typeof corporateLeadSchema>["body"];
