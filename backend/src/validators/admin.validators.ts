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

export const addEnrollmentSchema = z.object({
  body: z.object({
    courseId: z.string().uuid(),
    paymentConfirmed: z.boolean().optional(),
  }),
});

export const listCoursePaymentsSchema = z.object({
  params: z.object({
    courseId: z.string().uuid(),
  }),
  query: z.object({
    status: z.enum(["confirmed", "pending"]),
  }),
});

export const setQuizEnabledSchema = z.object({
  body: z.object({
    isEnabled: z.boolean(),
  }),
});

export const setCapstoneEnabledSchema = z.object({
  body: z.object({
    isEnabled: z.boolean(),
  }),
});
