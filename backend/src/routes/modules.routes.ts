import { Router } from "express";
import * as assignmentsController from "../controllers/assignments.controller";
import * as lessonsController from "../controllers/lessons.controller";
import * as quizzesController from "../controllers/quizzes.controller";
import { authenticate } from "../middleware/authenticate";

export const modulesRouter = Router();

modulesRouter.get("/:id/lessons", authenticate, lessonsController.listLessonsForModule);
modulesRouter.get("/:id/assignments", authenticate, assignmentsController.listByModule);
modulesRouter.get("/:id/quizzes", authenticate, quizzesController.listByModule);
