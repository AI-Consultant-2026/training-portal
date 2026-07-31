import { Router } from "express";
import * as capstonesController from "../controllers/capstones.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { upload } from "../middleware/upload";
import { validate } from "../middleware/validate";
import { submitCapstoneSchema } from "../validators/capstone.validators";

export const capstonesRouter = Router();

capstonesRouter.get("/:id", authenticate, capstonesController.getById);
capstonesRouter.post(
  "/:id/submit",
  authenticate,
  authorize("student"),
  upload.single("file"),
  validate(submitCapstoneSchema),
  capstonesController.submit,
);
capstonesRouter.get(
  "/:id/my-submission",
  authenticate,
  authorize("student"),
  capstonesController.getMySubmission,
);
capstonesRouter.get(
  "/:id/submissions/:submissionId",
  authenticate,
  capstonesController.getSubmission,
);
capstonesRouter.get(
  "/:id/submissions",
  authenticate,
  authorize("instructor", "admin"),
  capstonesController.listSubmissions,
);
