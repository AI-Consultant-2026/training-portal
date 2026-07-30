import { Router } from "express";
import * as quizzesController from "../controllers/quizzes.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { gradeQuizAttemptSchema } from "../validators/quiz.validators";

export const quizAttemptsRouter = Router();

quizAttemptsRouter.patch(
  "/:id/grade",
  authenticate,
  authorize("instructor", "admin"),
  validate(gradeQuizAttemptSchema),
  quizzesController.gradeAttempt,
);
