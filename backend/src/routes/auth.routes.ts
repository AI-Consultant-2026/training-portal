import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import {
  loginSchema,
  passwordResetConfirmSchema,
  passwordResetRequestSchema,
  registerSchema,
} from "../validators/auth.validators";

export const authRouter = Router();

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
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
