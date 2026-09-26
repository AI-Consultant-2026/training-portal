import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as emailPreferencesController from "../controllers/emailPreferences.controller";
import { config } from "../config";

export const emailPreferencesRouter = Router();

// Public unsubscribe links from /admin/email-client campaigns.
const unsubscribeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});
emailPreferencesRouter.get("/unsubscribe", unsubscribeRateLimiter, emailPreferencesController.unsubscribe);
emailPreferencesRouter.post("/unsubscribe", unsubscribeRateLimiter, emailPreferencesController.unsubscribe);
