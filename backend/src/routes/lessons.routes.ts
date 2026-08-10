import { Router } from "express";
import * as lessonsController from "../controllers/lessons.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { checkCheckpointAnswerSchema } from "../validators/checkpoint.validators";

export const lessonsRouter = Router();

lessonsRouter.get("/:id", authenticate, lessonsController.getLesson);
lessonsRouter.get("/:id/navigation", authenticate, lessonsController.getLessonNavigation);
lessonsRouter.get(
  "/:id/my-completion",
  authenticate,
  authorize("student"),
  lessonsController.getMyLessonCompletion,
);
lessonsRouter.post(
  "/:id/mark-complete",
  authenticate,
  authorize("student"),
  lessonsController.markLessonComplete,
);
lessonsRouter.get("/:id/checkpoints", authenticate, lessonsController.getLessonCheckpoints);
lessonsRouter.post(
  "/:id/checkpoints/:checkpointId/check",
  authenticate,
  validate(checkCheckpointAnswerSchema),
  lessonsController.checkCheckpointAnswer,
);
