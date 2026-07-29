import { Router } from "express";
import * as assignmentsController from "../controllers/assignments.controller";
import * as lessonsController from "../controllers/lessons.controller";
import { authenticate } from "../middleware/authenticate";

export const modulesRouter = Router();

modulesRouter.get("/:id/lessons", lessonsController.listLessonsForModule);
modulesRouter.get("/:id/assignments", authenticate, assignmentsController.listByModule);
