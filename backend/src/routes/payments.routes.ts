import { Router } from "express";
import * as paymentsController from "../controllers/payments.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { cardPaymentStartSchema, getQuoteSchema, instalmentPaymentStartSchema, instalmentVerifySchema } from "../validators/payments.validators";

export const paymentsRouter = Router();

paymentsRouter.get(
  "/quote/:courseId",
  authenticate,
  authorize("student"),
  validate(getQuoteSchema),
  paymentsController.getQuote,
);
// Enrols the student if needed, records a pending card payment and returns the course's
// Paystack payment link; the card itself is only ever entered on Paystack's page.
paymentsRouter.post(
  "/card",
  authenticate,
  authorize("student"),
  validate(cardPaymentStartSchema),
  paymentsController.startCardPayment,
);
// Instalments: opens Paystack's checkout for the deposit (unlocks the first days) or the
// balance (unlocks the rest). The webhook confirms it.
paymentsRouter.post(
  "/instalment",
  authenticate,
  authorize("student"),
  validate(instalmentPaymentStartSchema),
  paymentsController.startInstalmentPayment,
);
// Backup for the webhook: checks a returning student's charge with Paystack and applies it.
paymentsRouter.post(
  "/instalment/verify",
  authenticate,
  authorize("student"),
  validate(instalmentVerifySchema),
  paymentsController.verifyInstalmentPayment,
);
