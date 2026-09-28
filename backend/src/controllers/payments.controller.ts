import { Request, Response } from "express";
import * as paymentService from "../services/payment.service";
import * as paystackWebhookService from "../services/paystackWebhook.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getQuote = asyncHandler(async (req: Request, res: Response) => {
  const quote = await paymentService.getQuote(req.params.courseId);
  res.json({ quote });
});

export const startCardPayment = asyncHandler(async (req: Request, res: Response) => {
  const result = await paymentService.startCardPayment({ courseId: req.body.courseId, studentId: req.user!.id });
  res.status(201).json(result);
});

// POST /api/payments/paystack/webhook -- mounted in app.ts ahead of express.json(), because
// the signature is computed over the exact raw bytes Paystack sent.
export const paystackWebhook = asyncHandler(async (req: Request, res: Response) => {
  if (!paystackWebhookService.isPaystackConfigured()) {
    res.status(503).json({ error: "Paystack webhook is not configured" });
    return;
  }
  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
  if (!paystackWebhookService.isValidSignature(rawBody, req.header("x-paystack-signature"))) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }
  let event: Parameters<typeof paystackWebhookService.handlePaystackEvent>[0];
  try {
    event = JSON.parse(rawBody.toString("utf8"));
  } catch {
    res.status(400).json({ error: "Invalid JSON" });
    return;
  }
  // Any 200 tells Paystack to stop retrying, so it's only sent once the event is handled;
  // a thrown error (e.g. the database is down) becomes a 500 and Paystack tries again.
  const outcome = await paystackWebhookService.handlePaystackEvent(event);
  res.json({ received: true, outcome });
});
