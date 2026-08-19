import { z } from "zod";

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

export const LOCATIONS = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Nigeria",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
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
    password: passwordSchema,
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
    password: passwordSchema,
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(1),
  }),
});
