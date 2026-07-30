import { Router } from "express";
import { sequelize } from "../models";
import { asyncHandler } from "../utils/asyncHandler";

export const healthRouter = Router();

healthRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    try {
      await sequelize.authenticate();
      res.json({ status: "ok" });
    } catch {
      res.status(503).json({ status: "error", message: "Database unavailable" });
    }
  }),
);
