import { Router } from "express";
import * as quizzesController from "../controllers/quizzes.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { submitQuizSchema } from "../validators/quiz.validators";

export const quizzesRouter = Router();

quizzesRouter.get("/:id", authenticate, quizzesController.getById);
quizzesRouter.post("/:id/start", authenticate, authorize("student", "admin"), quizzesController.start);
quizzesRouter.post(
  "/:id/submit",
  authenticate,
  authorize("student", "admin"),
  validate(submitQuizSchema),
  quizzesController.submit,
);
quizzesRouter.get("/:id/attempts/:attemptId", authenticate, quizzesController.getAttempt);
quizzesRouter.get(
  "/:id/attempts",
  authenticate,
  authorize("student", "admin"),
  quizzesController.listMyAttempts,
);
