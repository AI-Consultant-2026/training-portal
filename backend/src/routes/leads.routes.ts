import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as corporateLeadsController from "../controllers/corporateLeads.controller";
import * as leadsController from "../controllers/leads.controller";
import * as readinessLeadsController from "../controllers/readinessLeads.controller";
import { config } from "../config";
import { validate } from "../middleware/validate";
import { corporateLeadSchema, corporatePreviewSchema } from "../validators/corporateLeads.validators";
import { createLeadSchema } from "../validators/leads.validators";
import { readinessLeadSchema } from "../validators/readiness.validators";

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
// Enquiries from the AI Workflow Productivity corporate pages (2026-11-02).
leadsRouter.post("/corporate", validate(corporateLeadSchema), corporateLeadsController.create);
// The free leadership preview's one-step sign-up (2026-11-13).
leadsRouter.post("/corporate-preview", validate(corporatePreviewSchema), corporateLeadsController.preview);
// "Email me my scorecard" on the AI & Cyber Readiness Check (2026-11-08).
leadsRouter.post("/readiness", validate(readinessLeadSchema), readinessLeadsController.create);
