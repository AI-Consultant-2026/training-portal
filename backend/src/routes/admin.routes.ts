import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createCandidateSchema, setPaymentConfirmedSchema } from "../validators/admin.validators";

export const adminRouter = Router();

adminRouter.use(authenticate, authorize("admin"));

adminRouter.get("/stats", adminController.getDashboardStats);
adminRouter.get("/leads", adminController.listLeads);
adminRouter.get("/candidates", adminController.listCandidates);
adminRouter.post("/candidates", validate(createCandidateSchema), adminController.createCandidate);
// Must come before "/candidates/:id" -- otherwise Express would match "inactive" as
// the :id param and route this to deactivateCandidate instead.
adminRouter.delete("/candidates/inactive", adminController.deleteInactiveCandidates);
adminRouter.delete("/candidates/:id", adminController.deactivateCandidate);
adminRouter.patch(
  "/enrollments/:id/payment",
  validate(setPaymentConfirmedSchema),
  adminController.setPaymentConfirmed,
);
