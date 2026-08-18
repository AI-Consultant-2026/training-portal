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

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  // The rate limiter protects production auth endpoints from brute-forcing;
  // it isn't meant to constrain the integration test suite's own request volume.
  skip: () => config.nodeEnv === "test",
});

authRouter.use(authRateLimiter);

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
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
