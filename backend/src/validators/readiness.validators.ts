import { z } from "zod";
import { COUNTRY_CODES } from "../constants/countries";
import { READINESS_QUESTIONS } from "../constants/readinessCheck";
import { CORPORATE_EMPLOYEE_BANDS } from "./corporateLeads.validators";

// "Email me my scorecard" on the AI & Cyber Readiness Check (2026-11-08). The answers are
// re-scored on the server; the browser's score is never trusted.
export const READINESS_CONSENT_TEXT =
  "I agree that Paleon Training may email me my scorecard and contact me about it, as described in the Privacy Policy.";

const short = (max = 150) => z.string().trim().min(1).max(max);

export const readinessLeadSchema = z.object({
  body: z.object({
    name: short(),
    jobTitle: short(),
    organisation: short(200),
    country: z.enum(COUNTRY_CODES),
    email: z.string().trim().email().max(200),
    employees: z.enum(CORPORATE_EMPLOYEE_BANDS),
    answers: z.array(z.number().int().min(0).max(2)).length(READINESS_QUESTIONS.length),
    consent: z.literal(true, { errorMap: () => ({ message: "Please tick the box so we can email your scorecard" }) }),
    updates: z.boolean().optional(),
    // "Also send me a tailored training proposal" (2026-11-13).
    proposal: z.boolean().optional(),
    page: z.string().trim().max(300).optional(),
    // Honeypot.
    website: z.string().max(0).optional(),
  }),
});

export type ReadinessLeadInput = z.infer<typeof readinessLeadSchema>["body"];
