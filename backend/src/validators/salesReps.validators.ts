import { z } from "zod";
import { SALES_REP_PAYMENT_KINDS } from "../models/salesRep.model";

// Empty strings from the admin form's optional fields are treated as "not given".
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), schema.nullable().optional());

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a YYYY-MM-DD date");

const repBody = z
  .object({
    name: z.string().trim().min(2).max(200),
    email: z.string().trim().email().max(200),
    phone: optional(z.string().trim().max(40)),
    startedAt: isoDate,
    endedAt: optional(isoDate),
    notes: optional(z.string().trim().max(5000)),
  })
  .refine((v) => !v.endedAt || v.endedAt >= v.startedAt, { message: "End date is before the start date", path: ["endedAt"] });

const repId = z.object({ id: z.string().uuid() });

export const createSalesRepSchema = z.object({ body: repBody });
export const updateSalesRepSchema = z.object({ params: repId, body: repBody });
export const salesRepIdSchema = z.object({ params: repId });

export const recordSalesRepPaymentSchema = z.object({
  params: repId,
  body: z.object({
    kind: z.enum(SALES_REP_PAYMENT_KINDS),
    amountNgn: z.number().positive().max(100_000_000),
    paidOn: isoDate,
    note: optional(z.string().trim().max(1000)),
  }),
});

export const deleteSalesRepPaymentSchema = z.object({
  params: z.object({ id: z.string().uuid(), paymentId: z.string().uuid() }),
});
