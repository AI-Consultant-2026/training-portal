import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as authController from "../controllers/auth.controller";
import { config } from "../config";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import {
  loginSchema,
  passwordResetConfirmSchema,
  passwordResetRequestSchema,
  registerSchema,
  verifyEmailSchema,
} from "../validators/auth.validators";

export const authRouter = Router();

// Session endpoints: /refresh runs silently on every full page load and whenever an
// access token expires, and it only works with a valid httpOnly refresh-token cookie,
// so there's nothing to brute-force. Sharing the strict limit below logged real students
// out after ~20 page loads in 15 minutes -- far sooner on Nigerian mobile networks, where
// many users share one carrier IP. They get a generous cap that only stops runaway loops.
const SESSION_PATHS = new Set(["/refresh", "/logout"]);

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  // The rate limiter protects production auth endpoints from brute-forcing;
  // it isn't meant to constrain the integration test suite's own request volume.
  skip: (req) => config.nodeEnv === "test" || SESSION_PATHS.has(req.path),
});

const sessionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});

authRouter.use(authRateLimiter);

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/refresh", sessionRateLimiter, authController.refresh);
authRouter.post("/logout", sessionRateLimiter, authController.logout);
authRouter.post(
  "/password-reset",
  validate(passwordResetRequestSchema),
  authController.requestPasswordReset,
);
authRouter.post(
  "/password-reset/confirm",
  validate(passwordResetConfirmSchema),
  authController.confirmPasswordReset,
);
authRouter.post("/verify-email", validate(verifyEmailSchema), authController.verifyEmail);
authRouter.post("/resend-verification", authenticate, authController.resendVerification);
