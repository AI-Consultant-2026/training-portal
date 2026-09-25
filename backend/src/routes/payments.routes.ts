import { Router } from "express";
import multer from "multer";
import * as paymentsController from "../controllers/payments.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { bankTransferSchema, cardPaymentSchema, getQuoteSchema } from "../validators/payments.validators";

export const paymentsRouter = Router();

// Optional proof of payment for a bank transfer: an image or PDF, up to 5 MB.
const receiptUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!["image/png", "image/jpeg", "image/webp", "application/pdf"].includes(file.mimetype)) {
      callback(new Error(`Unsupported file type: ${file.mimetype}. Upload a photo, screenshot or PDF of your receipt.`));
      return;
    }
    callback(null, true);
  },
});

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
  receiptUpload.single("receipt"),
  validate(bankTransferSchema),
  paymentsController.submitBankTransfer,
);
