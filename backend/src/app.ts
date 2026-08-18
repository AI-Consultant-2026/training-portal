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

  // SEO crawl directives + sitemap for the public marketing pages below. Static files
  // (not routes under /api) so search engines can fetch them without auth.
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").sendFile(path.join(__dirname, "marketing", "robots.txt"));
  });
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml").sendFile(path.join(__dirname, "marketing", "sitemap.xml"));
  });

  // Standalone marketing page, served same-origin so its registration form can post to
  // /api/leads directly. Lives under src/ (not public/) so it's present in both dev
  // (ts-node runs straight from src/) and prod (the whole backend build output is
  // copied into the image, see root Dockerfile) without depending on the frontend build.
  // Also served at "/" so the bare domain lands here instead of falling through to the
  // SPA catch-all below, whose "/" route redirects into the app (and on to /login for
  // anyone signed out).
  app.get(["/", "/welcome"], (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "welcome.html"));
  });
  app.get("/welcome.js", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "welcome.js"));
  });
  app.get("/executive-training", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "executive-training.html"));
  });
  app.get("/executive-training.js", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "executive-training.js"));
  });
  // Partner-facing explainer of the enrolment/payment/access pipeline -- static, no
  // form, so unlike the pages above it needs no companion .js file.
  app.get("/trainingportalprocess", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "trainingportalprocess.html"));
  });
  // Investment case for the founding partners' funding round -- public but unlisted
  // (no nav link, robots noindex) and not linked from any other page; static, no
  // companion .js file, same as trainingportalprocess above.
  app.get("/financing", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "financing.html"));
  });
  // Legal pages -- static, no companion .js file, linked from the welcome page footer.
  app.get("/terms", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "terms.html"));
  });
  app.get("/privacy", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "privacy.html"));
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
