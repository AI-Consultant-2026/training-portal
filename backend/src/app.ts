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

  // Render (and most PaaS deploys) sit in front of this app as a single reverse proxy
  // hop. Without this, Express's req.ip resolves to the proxy's own address for every
  // request, which silently turns the per-IP auth rate limiter below into one shared
  // limit across every real user on the site instead of a per-user one.
  app.set("trust proxy", 1);

  // Default CSP blocks framing/scripting anything outside this origin, which silently
  // broke every embedded lesson video: youtube.com/iframe_api (loaded via a <script>
  // tag for CheckpointVideoPlayer) and the youtube.com/embed/... iframe itself (both
  // the checkpoint player and the plain fallback embed) were being blocked by
  // script-src/frame-src 'self' with no console-visible error on our own domain --
  // only reproducible by actually loading a lesson video in a browser against the
  // deployed app, since local dev serves the frontend through Vite instead of this
  // Express app and never applies this CSP at all.
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "frame-src": ["'self'", "https://www.youtube.com"],
          "script-src": ["'self'", "https://www.youtube.com"],
        },
      },
    }),
  );
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  if (config.nodeEnv !== "test") {
    app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));
  }

  app.use("/api", apiRouter);

  // Standalone marketing page, served same-origin so its registration form can post to
  // /api/leads directly. Lives under src/ (not public/) so it's present in both dev
  // (ts-node runs straight from src/) and prod (the whole backend build output is
  // copied into the image, see root Dockerfile) without depending on the frontend build.
  app.get("/welcome", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "welcome.html"));
  });
  app.get("/welcome.js", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "welcome.js"));
  });

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
