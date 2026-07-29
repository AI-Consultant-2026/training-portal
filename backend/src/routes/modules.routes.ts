import { Router } from "express";
import * as lessonsController from "../controllers/lessons.controller";

export const modulesRouter = Router();

modulesRouter.get("/:id/lessons", lessonsController.listLessonsForModule);
