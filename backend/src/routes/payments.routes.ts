import { Router } from "express";
import * as paymentsController from "../controllers/payments.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { cardPaymentStartSchema, getQuoteSchema } from "../validators/payments.validators";

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
