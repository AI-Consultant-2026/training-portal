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
  "hse-fundamentals",
] as const;

// Nigeria's federal universities (per Wikipedia's "List of universities in Nigeria" as
// of 2026-08-24). State and private universities were deliberately left out -- only
// federal was asked for -- so if broader coverage is wanted later, add those as
// additional options here rather than a separate field.
export const UNIVERSITIES = [
  "African Aviation and Aerospace University",
  "Abubakar Tafawa Balewa University",
  "Adeyemi Federal University of Education",
  "Admiralty University Ibusa",
  "Ahmadu Bello University",
  "Air Force Institute of Technology",
  "Alex Ekwueme Federal University Ndufu Alike Ikwo",
  "Alvan Ikoku Federal University of Education",
  "Bayero University",
  "Federal University Birnin Kebbi",
  "Federal University Dutse",
  "Federal University Dutsin-Ma",
  "Federal University Gashua",
  "Federal University Gusau",
  "Federal University Kashere",
  "Federal University Lokoja",
  "Federal University Lafia",
  "Federal University of Agriculture Abeokuta",
  "Federal University of Agriculture Mubi",
  "Federal University of Agriculture Zuru",
  "Federal University of Applied Sciences Kachia",
  "Federal University of Education Pankshi",
  "Federal University of Education Zaria",
  "Federal University of Health Sciences Azare",
  "Federal University of Petroleum Resources Effurun",
  "Federal University of Technology Akure",
  "Federal University of Technology Ikot Abasi",
  "Federal University of Technology Minna",
  "Federal University of Technology Owerri",
  "Federal University of Transportation Daura",
  "Federal University Otuoke",
  "Federal University Oye-Ekiti",
  "Federal University Wukari",
  "Joseph Sarwuan Tarka University",
  "Michael Okpara University of Agriculture Umudike",
  "Modibbo Adama University Yola",
  "National Open University of Nigeria",
  "Nigeria Police Academy Wudil",
  "Nigerian Army University Biu",
  "Nigerian Defence Academy",
  "Nigerian Maritime University",
  "Nnamdi Azikiwe University",
  "Obafemi Awolowo University",
  "Tai Solarin Federal University of Education",
  "University of Abuja",
  "University of Benin",
  "University of Calabar",
  "University of Ibadan",
  "University of Ilorin",
  "University of Jos",
  "University of Lagos",
  "University of Maiduguri",
  "University of Nigeria Nsukka",
  "University of Port Harcourt",
  "University of Uyo",
  "Usmanu Danfodiyo University",
  "Yusuf Maitama Sule Federal University of Education Kano",
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
    university: z.enum(UNIVERSITIES).optional(),
    // Optional ambassador code from a ?ref= link or word of mouth. Lenient on purpose:
    // an unknown/blank code is silently ignored by referral.service, never a signup error.
    referralCode: z.string().trim().max(40).optional(),
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
