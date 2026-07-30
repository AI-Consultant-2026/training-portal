import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

export const adminRouter = Router();

adminRouter.get("/stats", authenticate, authorize("admin"), adminController.getDashboardStats);
