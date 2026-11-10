import { z } from "zod";
import { COUNTRY_CODES } from "../constants/countries";
import { passwordSchema } from "./auth.validators";

// Empty strings from optional form fields are treated as "not given".
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), schema.nullable().optional());

const dateString = z.string().refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date");

const seatSchema = z.object({
  courseId: z.string().uuid(),
  seats: z.coerce.number().int().min(0).max(100000),
  expiresAt: optional(dateString),
});

const clientFields = {
  name: z.string().trim().min(2).max(200),
  country: z.enum(COUNTRY_CODES).optional(),
  contactName: optional(z.string().trim().max(200)),
  contactEmail: optional(z.string().trim().email().max(200)),
  emailDomain: optional(
    z
      .string()
      .trim()
      .toLowerCase()
      .transform((v) => v.replace(/^@/, ""))
      .refine((v) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(v), "Enter a domain like company.com"),
  ),
  status: z.enum(["active", "suspended"]).optional(),
  notes: optional(z.string().trim().max(5000)),
  seats: z.array(seatSchema).max(10).optional(),
};

export const createClientSchema = z.object({ body: z.object(clientFields) });

export const updateClientSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object(clientFields).partial(),
});

export const clientIdSchema = z.object({ params: z.object({ id: z.string().uuid() }) });

export const memberSchema = z.object({
  params: z.object({ id: z.string().uuid(), userId: z.string().uuid() }),
});

export const setManagerSchema = z.object({
  params: z.object({ id: z.string().uuid(), userId: z.string().uuid() }),
  body: z.object({ isManager: z.boolean() }),
});

const emailsField = z.array(z.string().trim().email()).min(1).max(100);

export const adminInviteSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ emails: emailsField }),
});

export const managerInviteSchema = z.object({ body: z.object({ emails: emailsField }) });

export const managerRemoveSchema = z.object({ params: z.object({ userId: z.string().uuid() }) });

const joinCode = z.string().trim().min(6).max(40);

export const joinCodeSchema = z.object({ params: z.object({ code: joinCode }) });

const courseIds = z.array(z.string().uuid()).min(1, "Choose at least one course").max(10);

export const joinNewSchema = z.object({
  params: z.object({ code: joinCode }),
  body: z.object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(200),
    password: passwordSchema,
    jobTitle: optional(z.string().trim().max(120)),
    department: optional(z.string().trim().max(120)),
    courseIds,
  }),
});

export const joinExistingSchema = z.object({
  params: z.object({ code: joinCode }),
  body: z.object({ courseIds }),
});
