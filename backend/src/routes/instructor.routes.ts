import { Router } from "express";
import * as assignmentsController from "../controllers/assignments.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

export const instructorRouter = Router();

instructorRouter.get(
  "/ungraded-submissions",
  authenticate,
  authorize("instructor", "admin"),
  assignmentsController.listUngradedForInstructor,
);
