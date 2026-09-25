import { Router } from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";
import * as supportController from "../controllers/support.controller";
import { config } from "../config";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { problemReportSchema } from "../validators/support.validators";

export const supportRouter = Router();

// Screenshots only (PNG/JPEG/WebP, up to 5 MB) -- tighter than the general upload
// middleware, which also accepts documents for assignment submissions.
const screenshotUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.mimetype)) {
      callback(new Error(`Unsupported file type: ${file.mimetype}. Screenshots must be a PNG, JPG or WebP image.`));
      return;
    }
    callback(null, true);
  },
});

const reportRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});

supportRouter.post(
  "/report",
  authenticate,
  reportRateLimiter,
  screenshotUpload.single("screenshot"),
  validate(problemReportSchema),
  supportController.reportProblem,
);
