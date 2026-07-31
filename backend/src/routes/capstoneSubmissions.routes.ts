import { Router } from "express";
import * as capstonesController from "../controllers/capstones.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { gradeCapstoneSchema } from "../validators/capstone.validators";

export const capstoneSubmissionsRouter = Router();

capstoneSubmissionsRouter.get("/:id/file", authenticate, capstonesController.downloadFile);
capstoneSubmissionsRouter.patch(
  "/:id/grade",
  authenticate,
  authorize("instructor", "admin"),
  validate(gradeCapstoneSchema),
  capstonesController.grade,
);
