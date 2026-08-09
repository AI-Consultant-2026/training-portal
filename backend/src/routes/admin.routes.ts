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
adminRouter.delete("/candidates/:id", adminController.deactivateCandidate);
adminRouter.patch(
  "/enrollments/:id/payment",
  validate(setPaymentConfirmedSchema),
  adminController.setPaymentConfirmed,
);
