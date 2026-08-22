import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import {
  addEnrollmentSchema,
  createCandidateSchema,
  listCoursePaymentsSchema,
  setCapstoneEnabledSchema,
  setPaymentConfirmedSchema,
  setQuizEnabledSchema,
} from "../validators/admin.validators";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize("admin"));

adminRouter.get("/stats", adminController.getDashboardStats);
adminRouter.get("/leads", adminController.listLeads);
adminRouter.get(
  "/courses/:courseId/payments",
  validate(listCoursePaymentsSchema),
  adminController.listCoursePayments,
);
adminRouter.get("/candidates", adminController.listCandidates);
adminRouter.post("/candidates", validate(createCandidateSchema), adminController.createCandidate);
// Must come before "/candidates/:id" -- otherwise Express would match "inactive" as
// the :id param and route this to deactivateCandidate instead.
adminRouter.delete("/candidates/inactive", adminController.deleteInactiveCandidates);
adminRouter.delete("/candidates/:id", adminController.deactivateCandidate);
adminRouter.post(
  "/candidates/:id/enrollments",
  validate(addEnrollmentSchema),
  adminController.addEnrollment,
);
adminRouter.patch(
  "/enrollments/:id/payment",
  validate(setPaymentConfirmedSchema),
  adminController.setPaymentConfirmed,
);
adminRouter.get("/quizzes", adminController.listQuizzes);
adminRouter.patch(
  "/quizzes/:id",
  validate(setQuizEnabledSchema),
  adminController.setQuizEnabled,
);
adminRouter.get("/capstones", adminController.listCapstones);
adminRouter.patch(
  "/capstones/:id",
  validate(setCapstoneEnabledSchema),
  adminController.setCapstoneEnabled,
);
