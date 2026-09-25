import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as leadsController from "../controllers/leads.controller";
import { config } from "../config";
import { validate } from "../middleware/validate";
import { createLeadSchema } from "../validators/leads.validators";

export const leadsRouter = Router();

const leadsRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  // Protects this public, unauthenticated endpoint from being spammed; not meant to
  // constrain the integration test suite's own request volume.
  skip: () => config.nodeEnv === "test",
});

// Unsubscribe links from lead emails -- registered before the form's stricter limiter.
const unsubscribeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});
leadsRouter.get("/unsubscribe", unsubscribeRateLimiter, leadsController.unsubscribe);
leadsRouter.post("/unsubscribe", unsubscribeRateLimiter, leadsController.unsubscribe);

leadsRouter.use(leadsRateLimiter);

leadsRouter.post("/", validate(createLeadSchema), leadsController.create);
