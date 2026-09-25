import { Router } from "express";
import * as enrollmentsController from "../controllers/enrollments.controller";
import * as feedbackController from "../controllers/feedback.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { feedbackSchema } from "../validators/feedback.validators";

export const enrollmentsRouter = Router();

enrollmentsRouter.use(authenticate);
enrollmentsRouter.get("/", enrollmentsController.listMyEnrollments);
enrollmentsRouter.get("/:id", enrollmentsController.getEnrollment);
enrollmentsRouter.get("/:id/certificate", enrollmentsController.downloadCertificate);
enrollmentsRouter.get("/:id/attendance-record", enrollmentsController.downloadAttendanceRecord);
// Course feedback, once completed (2026-09-25).
enrollmentsRouter.get("/:id/feedback", authorize("student"), feedbackController.getMyFeedback);
enrollmentsRouter.put("/:id/feedback", authorize("student"), validate(feedbackSchema), feedbackController.saveMyFeedback);
