import { Router } from "express";
import * as lessonsController from "../controllers/lessons.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

export const lessonsRouter = Router();

lessonsRouter.get("/:id", lessonsController.getLesson);
lessonsRouter.post(
  "/:id/mark-complete",
  authenticate,
  authorize("student"),
  lessonsController.markLessonComplete,
);
