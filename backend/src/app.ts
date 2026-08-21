import * as Sentry from "@sentry/node";
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
  // Duplicated at frontend/public/favicon.svg for the SPA build (Vite copies that dir
  // verbatim into dist, which becomes ./public below in production). Routed explicitly
  // here too so the marketing pages get a favicon in local dev as well, where ./public
  // doesn't exist yet -- same reasoning as welcome.js et al. below.
  app.get("/favicon.svg", (req, res) => {
    res.type("image/svg+xml").sendFile(path.join(__dirname, "marketing", "favicon.svg"));
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
  // Founding-team responsibility breakdown (Ken/Edmond/Chuks, by function and
  // sector) -- same "public but unlisted" pattern as /financing above: contains
  // real names, robots noindex, no nav link, not in sitemap.xml.
  app.get("/management-roles", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "management-roles.html"));
  });
  // Internal outreach playbook (directory blurbs, social posts, press release, pitch
  // email templates) for promoting the SEO guide pages below -- same "public but
  // unlisted" pattern as /financing above: robots noindex, no nav link, not in
  // sitemap.xml, reachable only by anyone who has the direct URL.
  app.get("/marketingPlaybook.html", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "marketingPlaybook.html"));
  });
  // SEO content page targeting long-tail "how do I get an oil & gas job in Nigeria"
  // searches -- reuses trainingportalprocess.html's design system (same <style> block,
  // same class names) rather than a new one, so it reads as the same publication.
  // Linked from welcome.html's footer, listed in sitemap.xml, allowed in robots.txt.
  app.get("/oil-and-gas-careers-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-and-gas-careers-nigeria.html"));
  });
  // SEO content page targeting B2B "corporate training providers in Nigeria" searches --
  // same reused design system as oil-and-gas-careers-nigeria.html above, same pattern.
  app.get("/corporate-training-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "corporate-training-nigeria.html"));
  });
  // Sector-specific spoke off corporate-training-nigeria.html above (the hub) -- targets
  // "cybersecurity training for banks in Nigeria" / "telecom staff technical training
  // Nigeria" style searches specifically, cross-linking back to the hub for the full
  // catalog/pricing rather than duplicating it.
  app.get("/banking-telecom-training-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "banking-telecom-training-nigeria.html"));
  });
  // General job-seeker hub, same design system as the pages above -- targets broad
  // "digital skills needed to get a job in Nigeria" / "how to become employable after
  // NYSC" searches, and cross-links into oil-and-gas-careers-nigeria.html as the one
  // sector-specific job-seeker spoke that exists so far.
  app.get("/digital-skills-jobs-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-skills-jobs-nigeria.html"));
  });
  // Dual-audience spoke (job-seeker "HSE officer" + employer "HSE training") off both
  // oil-and-gas-careers-nigeria.html and corporate-training-nigeria.html -- same design
  // system, targets "HSE training providers oil and gas companies Nigeria" and
  // "how to become an HSE officer in Nigeria" searches specifically.
  app.get("/hse-training-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "hse-training-nigeria.html"));
  });
  // Legal pages -- static, no companion .js file, linked from the welcome page footer.
  app.get("/terms", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "terms.html"));
  });
  app.get("/privacy", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "privacy.html"));
  });
  // Sector-specific corporate/government sales briefs -- public but unlisted (no nav
  // link, robots noindex, not in sitemap.xml), same pattern as /financing above; each
  // is a standalone one-off pitch document, not part of the SEO hub/spoke set. Each
  // page's SVG-chart-building script is a separate .js file (not inline) because
  // helmet's CSP here is script-src 'self' with no unsafe-inline -- an inline <script>
  // gets silently blocked, same issue as bridge36.js previously.
  app.get("/oil-sector", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-sector.html"));
  });
  app.get("/oil-sector.js", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-sector.js"));
  });
  app.get("/banking-sector", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "banking-sector.html"));
  });
  app.get("/banking-sector.js", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "banking-sector.js"));
  });
  app.get("/telecom-sector", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "telecom-sector.html"));
  });
  app.get("/telecom-sector.js", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "telecom-sector.js"));
  });
  app.get("/delta-state-government", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "delta-state-government.html"));
  });
  app.get("/delta-state-government.js", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "delta-state-government.js"));
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
  // Reports 5xx errors to Sentry (a no-op when SENTRY_DSN isn't set, see
  // instrument.ts) before errorHandler below turns them into a JSON response --
  // must come after notFound/routes and before errorHandler, not instead of it.
  Sentry.setupExpressErrorHandler(app);
  app.use(errorHandler);

  return app;
}
