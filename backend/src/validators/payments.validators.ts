import { z } from "zod";

export const getQuoteSchema = z.object({
  params: z.object({ courseId: z.string().min(1) }),
  query: z.object({ billingCountry: z.string().optional() }),
});

const currentYear = new Date().getFullYear();

export const cardPaymentSchema = z.object({
  body: z.object({
    courseId: z.string().min(1).max(255),
    cardholderName: z.string().min(1).max(100),
    cardNumber: z
      .string()
      .transform((v) => v.replace(/\s+/g, ""))
      .pipe(z.string().regex(/^\d{13,19}$/, "Enter a valid card number")),
    expMonth: z.number().int().min(1).max(12),
    expYear: z.number().int().min(currentYear).max(currentYear + 20),
    cvv: z.string().regex(/^\d{3,4}$/, "Enter a valid CVV"),
    billingCountry: z.string().min(1).max(100),
    billingAddressLine1: z.string().min(1).max(255),
    billingCity: z.string().min(1).max(100),
    billingPostalCode: z.string().min(1).max(20),
  }),
});

export const bankTransferSchema = z.object({
  body: z.object({
    courseId: z.string().min(1).max(255),
    transferReference: z.string().min(1).max(255),
    notes: z.string().max(1000).optional(),
  }),
});
