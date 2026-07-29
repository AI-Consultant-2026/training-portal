import { NextFunction, Request, Response } from "express";
import { ValidationError as SequelizeValidationError } from "sequelize";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: { message: err.message, details: err.details } });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: { message: "Validation failed", details: err.flatten() },
    });
  }

  if (err instanceof SequelizeValidationError) {
    return res.status(400).json({
      error: {
        message: "Validation failed",
        details: err.errors.map((e) => ({ field: e.path, message: e.message })),
      },
    });
  }

  if (err && typeof err === "object" && "name" in err) {
    const name = (err as { name: string }).name;
    if (name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: { message: "Resource already exists" } });
    }
    if (name === "JsonWebTokenError" || name === "TokenExpiredError") {
      return res.status(401).json({ error: { message: "Invalid or expired token" } });
    }
  }

  logger.error(err);
  return res.status(500).json({ error: { message: "Internal server error" } });
}
