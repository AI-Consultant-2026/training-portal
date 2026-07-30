import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { config } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { apiRouter } from "./routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  if (config.nodeEnv !== "test") {
    app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));
  }

  app.use("/api", apiRouter);

  // Only present in the production Docker image (the frontend build gets copied to
  // backend/public there); local dev serves the frontend separately via Vite, so this
  // directory never exists outside that image and these routes are simply skipped.
  const publicDir = path.join(__dirname, "..", "public");
  const indexHtmlPath = path.join(publicDir, "index.html");
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get("*", (req, res, next) => {
      if (req.method === "GET" && !req.path.startsWith("/api") && fs.existsSync(indexHtmlPath)) {
        return res.sendFile(indexHtmlPath);
      }
      next();
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
