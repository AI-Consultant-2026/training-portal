import { Router } from "express";
import * as assignmentsController from "../controllers/assignments.controller";
import * as capstonesController from "../controllers/capstones.controller";
import * as quizzesController from "../controllers/quizzes.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

export const instructorRouter = Router();

instructorRouter.get(
  "/ungraded-submissions",
  authenticate,
  authorize("instructor", "admin"),
  assignmentsController.listUngradedForInstructor,
);

instructorRouter.get(
  "/ungraded-quiz-attempts",
  authenticate,
  authorize("instructor", "admin"),
  quizzesController.listPendingReviews,
);

instructorRouter.get(
  "/ungraded-capstone-submissions",
  authenticate,
  authorize("instructor", "admin"),
  capstonesController.listUngradedForInstructor,
);
