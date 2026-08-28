import { Router } from "express";
import * as enrollmentsController from "../controllers/enrollments.controller";
import { authenticate } from "../middleware/authenticate";

export const enrollmentsRouter = Router();

enrollmentsRouter.use(authenticate);
enrollmentsRouter.get("/", enrollmentsController.listMyEnrollments);
enrollmentsRouter.get("/:id", enrollmentsController.getEnrollment);
enrollmentsRouter.get("/:id/certificate", enrollmentsController.downloadCertificate);
enrollmentsRouter.get("/:id/attendance-record", enrollmentsController.downloadAttendanceRecord);
