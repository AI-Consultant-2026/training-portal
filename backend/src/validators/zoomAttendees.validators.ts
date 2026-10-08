import { z } from "zod";

// Optional "which best describes you" choice on /Zooom-Attendees. Keep in sync with the
// radio buttons in marketing/zoom-attendees.html.
export const ZOOM_ATTENDEE_STATUSES = ["Graduate", "Non-graduate", "Final year student", "NYSC member"] as const;

const PHONE_REGEX = /^[0-9+()\s-]{7,20}$/;

// Empty strings from the form's optional fields are treated as "not given".
const optionalText = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), schema.optional());

export const createZoomAttendeeSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    dateAttended: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date"),
    status: optionalText(z.enum(ZOOM_ATTENDEE_STATUSES)),
    phone: optionalText(z.string().trim().regex(PHONE_REGEX)),
    wantsUpdates: z.boolean().optional(),
    // Honeypot: a hidden field real visitors never fill in.
    website: z.string().max(0).optional(),
  }),
});
