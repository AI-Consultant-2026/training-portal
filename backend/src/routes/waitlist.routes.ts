import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { config } from "../config";
import { COUNTRY_CODES, isLive } from "../constants/countries";
import * as emails from "../emails";
import { validate } from "../middleware/validate";
import { WaitlistSignup } from "../models";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";

export const waitlistRouter = Router();

// Public: the "Courses in {country} are launching soon" box on /za, /ke and /gh
// (2026-10-30). Only countries that aren't live yet have a waitlist.
const waitlistSchema = z.object({
  body: z.object({
    country: z.enum(COUNTRY_CODES).refine((code) => !isLive(code), "This country is already live"),
    whatsapp: z
      .string()
      .trim()
      .regex(/^\+?[0-9()\s-]{7,20}$/, "Enter a WhatsApp number, e.g. +254 712 345 678"),
  }),
});

waitlistRouter.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => config.nodeEnv === "test",
  }),
);

waitlistRouter.post(
  "/",
  validate(waitlistSchema),
  asyncHandler(async (req, res) => {
    const { country, whatsapp } = req.body as { country: string; whatsapp: string };
    // Signing up twice is fine: the second time just says yes again.
    const [signup, created] = await WaitlistSignup.findOrCreate({ where: { country, whatsapp } });
    if (created) {
      emails
        .sendWaitlistNotificationEmail(signup)
        .catch((err) => logger.error("Failed to send waitlist notification email", err));
    }
    res.status(201).json({ ok: true });
  }),
);
