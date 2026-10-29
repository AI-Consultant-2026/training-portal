import { z } from "zod";
import { VTPASS_NETWORKS, toLocalNigerianMobile } from "../constants/vtpass";
import { ALL_LOCATIONS, COUNTRY_CODES, NIGERIA_STATES, isRegionOf } from "../constants/countries";

// Exact matches only (case-insensitive) -- catches the passwords people actually type
// when a form merely demands "8+ characters", not a general strength estimator. Includes
// this app's own former seed-admin password (see docs/DEPLOYMENT.md) since that value has
// been publicly documented in this repo's history.
const COMMON_WEAK_PASSWORDS = new Set([
  "password",
  "password1",
  "password123",
  "12345678",
  "123456789",
  "1234567890",
  "qwerty123",
  "qwertyuiop",
  "letmein123",
  "iloveyou1",
  "admin1234",
  "welcome123",
  "changeme123",
  "abc123456",
  "football1",
  "monkey123",
]);

const passwordSchema = z
  .string()
  .min(10, "Password must be at least 10 characters")
  .refine((val) => /[a-zA-Z]/.test(val) && /[0-9]/.test(val), {
    message: "Password must include both letters and numbers",
  })
  .refine((val) => !COMMON_WEAK_PASSWORDS.has(val.toLowerCase()), {
    message: "This password is too common, please choose a different one",
  });

// Nigerian states (plus "Nigeria" as a catch-all) -- see constants/countries.ts for the
// other countries' regions.
export const LOCATIONS = NIGERIA_STATES;

// Values are course slugs (not display titles) so a stored value can be used directly
// to redirect to the real course page after registration, e.g. /courses/${courseInterest}.
export const COURSE_INTERESTS = [
  "cyber-security-fundamentals",
  "social-media-management-content",
  "digital-marketing",
  "gis-and-drone-mapping",
  "renewable-energy-digital-systems",
  "hse-fundamentals",
] as const;

// Registration status offered on the register and lead forms. Must match
// frontend/src/features/auth/RegisterPage.tsx's REGISTRATION_STATUSES and
// backend/src/marketing/welcome.html's <select> exactly -- the request is rejected if the
// submitted value isn't in this list. Also reused by leads.validators.ts.
export const REGISTRATION_STATUSES = ["Graduate", "Current Student", "Non-Graduate"] as const;

// Any written phone format (+233..., 0..., spaces/dashes) for countries outside Nigeria.
const INTERNATIONAL_PHONE_REGEX = /^[0-9+()\s-]{7,20}$/;

export const registerSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: passwordSchema,
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      // Defaults to Nigeria so older callers (and the existing Nigeria-only form) keep working.
      country: z.enum(COUNTRY_CODES).default("NG"),
      // Optional at the API level (existing/other callers shouldn't break over a new
      // marketing-context field) -- the register form itself enforces a real choice via
      // required <select> elements, so every genuine signup still provides both.
      location: z.enum(ALL_LOCATIONS).default("Nigeria"),
      courseInterest: z.enum(COURSE_INTERESTS).optional(),
      university: z.enum(REGISTRATION_STATUSES).optional(),
      // Optional ambassador code from a ?ref= link or word of mouth. Lenient on purpose:
      // an unknown/blank code is silently ignored by referral.service, never a signup error.
      referralCode: z.string().trim().max(40).optional(),
      // Where airtime/data referral rewards are sent. Optional at the API level for the same
      // reason as location; the register form requires both. Airtime/data rewards are
      // Nigerian (VTpass), so only Nigerian signups are held to a Nigerian mobile number.
      phone: z.string().trim().max(25).optional(),
      mobileNetwork: z.enum(VTPASS_NETWORKS).optional(),
    })
    .superRefine((body, ctx) => {
      if (!isRegionOf(body.country, body.location)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["location"], message: "Choose a location in your country" });
      }
      if (!body.phone) return;
      const ok =
        body.country === "NG"
          ? toLocalNigerianMobile(body.phone) !== null
          : INTERNATIONAL_PHONE_REGEX.test(body.phone);
      if (!ok) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message:
            body.country === "NG" ? "Enter a Nigerian mobile number, e.g. 08031234567" : "Enter a valid phone number",
        });
      }
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
    password: passwordSchema,
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(1),
  }),
});
