import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as sponsorController from "../controllers/sponsor.controller";
import { config } from "../config";
import { validate } from "../middleware/validate";
import { sponsorPaySchema, sponsorTokenSchema, sponsorVerifySchema } from "../validators/payments.validators";

// Public "pay for a student" page (see sponsor.service.ts): no login, so rate-limited.
export const sponsorRouter = Router();

const sponsorRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});

sponsorRouter.get("/:token", sponsorRateLimiter, validate(sponsorTokenSchema), sponsorController.getSponsorPage);
sponsorRouter.post("/:token/pay", sponsorRateLimiter, validate(sponsorPaySchema), sponsorController.startSponsorPayment);
sponsorRouter.post(
  "/:token/verify",
  sponsorRateLimiter,
  validate(sponsorVerifySchema),
  sponsorController.verifySponsorPayment,
);
