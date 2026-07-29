import { Router } from "express";
import * as assignmentsController from "../controllers/assignments.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { upload } from "../middleware/upload";
import { validate } from "../middleware/validate";
import { submitAssignmentSchema } from "../validators/assignment.validators";

export const assignmentsRouter = Router();

assignmentsRouter.get("/:id", authenticate, assignmentsController.getById);
assignmentsRouter.post(
  "/:id/submit",
  authenticate,
  authorize("student"),
  upload.single("file"),
  validate(submitAssignmentSchema),
  assignmentsController.submit,
);
assignmentsRouter.get(
  "/:id/submissions/:submissionId",
  authenticate,
  assignmentsController.getSubmission,
);
assignmentsRouter.get(
  "/:id/submissions",
  authenticate,
  authorize("instructor", "admin"),
  assignmentsController.listSubmissions,
);
