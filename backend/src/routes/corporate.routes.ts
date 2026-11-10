import { Router } from "express";
import rateLimit from "express-rate-limit";
import { config } from "../config";
import * as corporateController from "../controllers/corporate.controller";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import {
  joinCodeSchema,
  joinExistingSchema,
  joinNewSchema,
  managerInviteSchema,
  managerRemoveSchema,
} from "../validators/corporate.validators";

// Corporate staff portal: the public staff sign-up link and the /company page.
// Admin management lives under /api/admin/corporate-clients (admin.routes.ts).
export const corporateRouter = Router();

// The join link is public, so guessing codes and mass sign-ups are rate-limited.
const joinRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});

corporateRouter.get("/join/:code", joinRateLimiter, validate(joinCodeSchema), corporateController.getJoinInfo);
corporateRouter.post("/join/:code", joinRateLimiter, validate(joinNewSchema), corporateController.joinNew);
corporateRouter.post(
  "/join/:code/existing",
  joinRateLimiter,
  authenticate,
  validate(joinExistingSchema),
  corporateController.joinExisting,
);

corporateRouter.get("/me", authenticate, corporateController.getMyCompany);
corporateRouter.post("/me/invites", authenticate, validate(managerInviteSchema), corporateController.managerInvite);
corporateRouter.delete(
  "/me/members/:userId",
  authenticate,
  validate(managerRemoveSchema),
  corporateController.managerRemove,
);
