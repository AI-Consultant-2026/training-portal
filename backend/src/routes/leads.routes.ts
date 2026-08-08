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

leadsRouter.use(leadsRateLimiter);

leadsRouter.post("/", validate(createLeadSchema), leadsController.create);
