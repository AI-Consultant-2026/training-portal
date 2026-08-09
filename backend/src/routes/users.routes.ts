import { Router } from "express";
import * as usersController from "../controllers/users.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { updateMeSchema } from "../validators/users.validators";

export const usersRouter = Router();

usersRouter.get("/me", authenticate, usersController.getMe);
usersRouter.patch("/me", authenticate, validate(updateMeSchema), usersController.updateMe);
usersRouter.patch("/me/heartbeat", authenticate, usersController.heartbeat);
usersRouter.get("/:id", authenticate, authorize("admin"), usersController.getUserById);
