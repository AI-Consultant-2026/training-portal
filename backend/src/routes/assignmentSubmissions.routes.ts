import { Router } from "express";
import * as assignmentsController from "../controllers/assignments.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { gradeSubmissionSchema } from "../validators/assignment.validators";

export const assignmentSubmissionsRouter = Router();

assignmentSubmissionsRouter.get("/:id/file", authenticate, assignmentsController.downloadFile);
assignmentSubmissionsRouter.patch(
  "/:id/grade",
  authenticate,
  authorize("instructor", "admin"),
  validate(gradeSubmissionSchema),
  assignmentsController.grade,
);
