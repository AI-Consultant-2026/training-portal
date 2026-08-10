import { Router } from "express";
import * as paymentsController from "../controllers/payments.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { bankTransferSchema, cardPaymentSchema, getQuoteSchema } from "../validators/payments.validators";

export const paymentsRouter = Router();

paymentsRouter.get(
  "/quote/:courseId",
  authenticate,
  authorize("student"),
  validate(getQuoteSchema),
  paymentsController.getQuote,
);
paymentsRouter.post(
  "/card",
  authenticate,
  authorize("student"),
  validate(cardPaymentSchema),
  paymentsController.payWithCard,
);
paymentsRouter.post(
  "/bank-transfer",
  authenticate,
  authorize("student"),
  validate(bankTransferSchema),
  paymentsController.submitBankTransfer,
);
