import { z } from "zod";

export const LOCATIONS = [
  "Nigeria",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "China",
  "India",
  "France",
  "Japan",
  "Brazil",
  "Russia",
  "Other Country",
] as const;

// Values are course slugs (not display titles) so a stored value can be used directly
// to redirect to the real course page after registration, e.g. /courses/${courseInterest}.
export const COURSE_INTERESTS = [
  "cyber-security-fundamentals",
  "social-media-management-content",
  "digital-marketing",
  "gis-and-drone-mapping",
  "renewable-energy-digital-systems",
] as const;

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    // Optional at the API level (existing/other callers shouldn't break over a new
    // marketing-context field) -- the register form itself enforces a real choice via
    // required <select> elements, so every genuine signup still provides both.
    location: z.enum(LOCATIONS).default("Nigeria"),
    courseInterest: z.enum(COURSE_INTERESTS).optional(),
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
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(1),
  }),
});
