import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as zoomAttendeesController from "../controllers/zoomAttendees.controller";
import { config } from "../config";
import { validate } from "../middleware/validate";
import { createZoomAttendeeSchema } from "../validators/zoomAttendees.validators";

export const zoomAttendeesRouter = Router();

// Public sign-in form at /Zooom-Attendees. Generous enough for a room of attendees
// sharing one campus Wi-Fi address, tight enough to stop the form being spammed.
const zoomAttendeesRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});

zoomAttendeesRouter.post(
  "/",
  zoomAttendeesRateLimiter,
  validate(createZoomAttendeeSchema),
  zoomAttendeesController.create,
);
