import { z } from "zod";
import { COURSE_INTERESTS, LOCATIONS } from "./auth.validators";

export const createCandidateSchema = z.object({
  body: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    location: z.enum(LOCATIONS).default("Nigeria"),
    courseInterest: z.enum(COURSE_INTERESTS).optional(),
  }),
});

export const setPaymentConfirmedSchema = z.object({
  body: z.object({
    paymentConfirmed: z.boolean(),
  }),
});
