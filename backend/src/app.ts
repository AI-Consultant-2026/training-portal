import * as Sentry from "@sentry/node";
import compression from "compression";
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
  // gzip/brotli for the text-heavy marketing HTML/CSS/JS below (fonts are already
  // compressed woff2 and get skipped automatically based on content-type).
  app.use(compression());
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
  // Site search widget (shared CSS/JS + generated index, loaded on every public
  // marketing page). The index is built from the same pages listed in sitemap.xml
  // plus /terms and /privacy -- see content-drafts/ for the generation script.
  app.get("/search-widget.css", (req, res) => {
    res.type("text/css").sendFile(path.join(__dirname, "marketing", "search-widget.css"));
  });
  app.get("/search.js", (req, res) => {
    res.type("application/javascript").sendFile(path.join(__dirname, "marketing", "search.js"));
  });
  app.get("/search-index.json", (req, res) => {
    res.type("application/json").sendFile(path.join(__dirname, "marketing", "search-index.json"));
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
  // Shared by every marketing page's inline @font-face rules (same two font files,
  // byte-for-byte) -- extracted out of the HTML so browsers cache them once across
  // pages instead of re-downloading ~80KB of base64 on every single page load.
  app.get("/fonts/:file(source-serif-4-variable.woff2|source-sans-3-variable.woff2)", (req, res) => {
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.type("font/woff2").sendFile(path.join(__dirname, "marketing", "fonts", req.params.file));
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
  // Corporate B2B sales proposal (sector bundles, seat pricing, ITF levy-reimbursement
  // case, wider business-case section) -- same "public but unlisted" pattern as
  // /financing below: robots noindex, no nav link, not in sitemap.xml, reachable only
  // by anyone sent the direct URL. Static, no companion .js file.
  app.get("/paleon-training-proposal", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "paleon-training-proposal.html"));
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
  // Individual sector-partner proposals (Kayode Akiode / Oil & Gas, Chukwuka Ugha /
  // Banking) -- same "public but unlisted" pattern as /financing above: real names,
  // robots noindex, no nav link, not in sitemap.xml, reachable only via direct URL.
  app.get("/KAkiode-proposal", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "KAkiode-proposal.html"));
  });
  app.get("/CUgha-proposal", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "CUgha-proposal.html"));
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
  // University partnerships page -- public, indexed, recruiting the first real
  // university partners; no partner logos are shown yet (none confirmed), the
  // page is honest about that and invites universities to be among the first.
  app.get("/university-partners", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "university-partners.html"));
  });
  // The GEO/AI-search pillar page (2026-09-13): the primary page targeting "digital
  // skills training Nigeria" and its variants, hub-linked from and to every guide page
  // above rather than a standalone spoke -- see the GEO report for why.
  app.get("/digital-skills-training-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-skills-training-nigeria.html"));
  });
  // Employability content cluster (2026-09-15): 5 SEO/GEO articles converted from
  // approved Markdown drafts in content-drafts/employability-content-cluster/, reusing
  // the same shared design system (same <style> block, same component classes) as the
  // guide pages above. Cross-linked with each other and with the existing hub/spoke
  // guides and the pillar page above; linked from welcome.html's footer Guides list.
  app.get("/degree-but-no-job-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "degree-but-no-job-nigeria.html"));
  });
  app.get("/nysc-digital-skills", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "nysc-digital-skills.html"));
  });
  // Career Intelligence Hub Pillar 2 -- Best Courses After NYSC (broader than
  // Pillar 10, which is Paleon-course-specific and timed during service).
  app.get("/best-courses-after-nysc", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "best-courses-after-nysc.html"));
  });
  // Career Intelligence Hub Pillar 10 -- Paleon-course-specific comparison,
  // deliberately narrower than Pillar 2 (best-courses-after-nysc).
  app.get("/courses-for-nysc-corps-members", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "courses-for-nysc-corps-members.html"));
  });
  // Career Intelligence Hub Pillar 11 -- the "Build"/"Prove" stages of
  // Learn -> Build -> Prove -> Get Ready, made concrete for NYSC.
  app.get("/nysc-portfolio-building", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "nysc-portfolio-building.html"));
  });
  // Career Intelligence Hub Pillar 12 -- the last of the 4 Month 2 NYSC-family
  // pillars. HowTo schema for the 8-step roadmap.
  app.get("/nysc-to-employment-roadmap", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "nysc-to-employment-roadmap.html"));
  });
  // Career Intelligence Hub Pillar 4 -- highest-priority remaining pillar,
  // since Pillars 2, 11, and 12 all already link to it.
  app.get("/how-to-build-a-graduate-cv-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-to-build-a-graduate-cv-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 5 -- job-seeker-side companion to the B2B
  // /corporate-training-nigeria and /banking-telecom-training-nigeria pages.
  app.get("/digital-skills-employers-want-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-skills-employers-want-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 6 -- narrower skills taxonomy than the
  // /oil-and-gas-careers-nigeria hub; scope difference stated explicitly.
  app.get("/digital-skills-for-oil-and-gas-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-skills-for-oil-and-gas-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 7 -- security/compliance vs.
  // marketing/content as two genuinely different banking career tracks.
  app.get("/digital-skills-for-banking-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-skills-for-banking-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 8 -- the last /career-guides/ pillar.
  // Honest about thinner search-demand evidence for this exact intersection.
  app.get("/digital-skills-for-telecommunications-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-skills-for-telecommunications-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 13 -- standalone GIS career guide,
  // names QGIS/ArcGIS as real entities per the architecture doc's
  // GIS -> QGIS -> Surveying -> Geospatial data entity chain.
  app.get("/gis-careers-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "gis-careers-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 14 -- names the real NCAA regulator
  // honestly without fabricating licensing specifics it can't verify.
  app.get("/drone-mapping-careers-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "drone-mapping-careers-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 16 -- near-empty-autocomplete topic, written
  // for durable authority rather than a claim of proven high search demand.
  app.get("/cybersecurity-oil-and-gas-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "cybersecurity-oil-and-gas-nigeria.html"));
  });
  // Career Intelligence Hub Pillar 17 -- the last of all 17 pillars. Clarifies
  // honestly that the Renewable Energy Digital Systems course covers the
  // digital/monitoring side, not hands-on electrical installation.
  app.get("/renewable-energy-careers-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "renewable-energy-careers-nigeria.html"));
  });
  // Career Intelligence Hub -- Tier 1 supporting articles (highest priority,
  // from the 94-article content database). Each links up to its pillar.
  app.get("/high-income-skills-without-a-degree-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "high-income-skills-without-a-degree-nigeria.html"));
  });
  app.get("/lucrative-digital-skills-to-learn-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "lucrative-digital-skills-to-learn-in-nigeria.html"));
  });
  app.get("/what-to-do-after-nysc", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "what-to-do-after-nysc.html"));
  });
  app.get("/best-skill-for-corps-members", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "best-skill-for-corps-members.html"));
  });
  app.get("/cv-with-no-work-experience-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "cv-with-no-work-experience-nigeria.html"));
  });
  app.get("/high-demand-tech-skills-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "high-demand-tech-skills-nigeria.html"));
  });
  app.get("/high-paying-skills-to-learn-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "high-paying-skills-to-learn-in-nigeria.html"));
  });
  app.get("/warri-oil-and-gas-jobs", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "warri-oil-and-gas-jobs.html"));
  });
  app.get("/oil-and-gas-entry-level-jobs-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-and-gas-entry-level-jobs-nigeria.html"));
  });
  app.get("/gis-mapping-oil-and-gas-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "gis-mapping-oil-and-gas-nigeria.html"));
  });
  app.get("/oil-and-gas-jobs-in-warri-delta-state", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-and-gas-jobs-in-warri-delta-state.html"));
  });
  app.get("/how-to-get-a-bank-job-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-to-get-a-bank-job-in-nigeria.html"));
  });
  app.get("/fintech-jobs-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "fintech-jobs-nigeria.html"));
  });
  app.get("/side-hustle-during-nysc", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "side-hustle-during-nysc.html"));
  });
  app.get("/return-from-nysc-jobless-what-to-do", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "return-from-nysc-jobless-what-to-do.html"));
  });
  app.get("/what-you-get-from-a-gis-and-drone-mapping-course", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "what-you-get-from-a-gis-and-drone-mapping-course.html"));
  });
  app.get("/hse-jobs-in-nigeria-oil-and-gas-companies", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "hse-jobs-in-nigeria-oil-and-gas-companies.html"));
  });
  // Career Intelligence Hub -- Tier 2/3 supporting articles (74-article batch,
  // 73 new + 1 already-existing page reconciled from the content database).
  app.get("/digital-skills-for-students-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-skills-for-students-nigeria.html"));
  });
  app.get("/free-vs-paid-digital-skills-training-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "free-vs-paid-digital-skills-training-nigeria.html"));
  });
  app.get("/tech-skills-vs-degree-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "tech-skills-vs-degree-nigeria.html"));
  });
  app.get("/digital-literacy-vs-digital-skills-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-literacy-vs-digital-skills-nigeria.html"));
  });
  app.get("/short-courses-in-nigeria-what-to-check", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "short-courses-in-nigeria-what-to-check.html"));
  });
  app.get("/certificate-courses-vs-digital-skills-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "certificate-courses-vs-digital-skills-nigeria.html"));
  });
  app.get("/online-courses-with-certificate-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "online-courses-with-certificate-nigeria.html"));
  });
  app.get("/professional-certification-courses-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "professional-certification-courses-nigeria.html"));
  });
  app.get("/how-to-get-a-remote-job-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-to-get-a-remote-job-in-nigeria.html"));
  });
  app.get("/entry-level-jobs-in-nigeria-no-experience", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "entry-level-jobs-in-nigeria-no-experience.html"));
  });
  app.get("/linkedin-profile-tips-nigerian-graduates", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "linkedin-profile-tips-nigerian-graduates.html"));
  });
  app.get("/interview-prep-for-digital-roles-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "interview-prep-for-digital-roles-nigeria.html"));
  });
  app.get("/how-to-get-a-job-in-nigeria-online", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-to-get-a-job-in-nigeria-online.html"));
  });
  app.get("/unemployment-among-nigerian-graduates-context", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "unemployment-among-nigerian-graduates-context.html"));
  });
  app.get("/cv-mistakes-nigerian-graduates-make", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "cv-mistakes-nigerian-graduates-make.html"));
  });
  app.get("/how-to-list-nysc-on-your-cv", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-to-list-nysc-on-your-cv.html"));
  });
  app.get("/portfolio-vs-cv-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "portfolio-vs-cv-nigeria.html"));
  });
  app.get("/skills-companies-are-looking-for-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "skills-companies-are-looking-for-nigeria.html"));
  });
  app.get("/most-marketable-skills-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "most-marketable-skills-in-nigeria.html"));
  });
  app.get("/employer-demand-digital-marketing-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "employer-demand-digital-marketing-nigeria.html"));
  });
  app.get("/what-employers-like-shell-and-chevron-screen-for", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "what-employers-like-shell-and-chevron-screen-for.html"));
  });
  app.get("/top-skills-employers-want-in-2026", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "top-skills-employers-want-in-2026.html"));
  });
  app.get("/niger-delta-oil-and-gas-companies-jobs", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "niger-delta-oil-and-gas-companies-jobs.html"));
  });
  app.get("/how-to-get-a-job-in-oil-and-gas-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-to-get-a-job-in-oil-and-gas-in-nigeria.html"));
  });
  app.get("/oil-and-gas-training-institute-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-and-gas-training-institute-in-nigeria.html"));
  });
  app.get("/oil-and-gas-companies-in-warri", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-and-gas-companies-in-warri.html"));
  });
  app.get("/cyber-security-course-for-bankers", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "cyber-security-course-for-bankers.html"));
  });
  app.get("/digital-marketing-jobs-in-banks-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-marketing-jobs-in-banks-nigeria.html"));
  });
  app.get("/digital-transformation-in-banking-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-transformation-in-banking-nigeria.html"));
  });
  app.get("/banking-jobs-in-nigeria-2026", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "banking-jobs-in-nigeria-2026.html"));
  });
  app.get("/it-jobs-in-nigerian-banks", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "it-jobs-in-nigerian-banks.html"));
  });
  app.get("/telecom-jobs-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "telecom-jobs-in-nigeria.html"));
  });
  app.get("/network-security-jobs-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "network-security-jobs-in-nigeria.html"));
  });
  app.get("/corporate-communication-jobs-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "corporate-communication-jobs-in-nigeria.html"));
  });
  app.get("/digital-marketing-telecom-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "digital-marketing-telecom-nigeria.html"));
  });
  app.get("/network-engineer-jobs-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "network-engineer-jobs-nigeria.html"));
  });
  app.get("/what-next-after-nysc", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "what-next-after-nysc.html"));
  });
  app.get("/how-to-make-money-during-nysc", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-to-make-money-during-nysc.html"));
  });
  app.get("/saed-vs-independent-digital-skills-training", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "saed-vs-independent-digital-skills-training.html"));
  });
  app.get("/nysc-corpers-jobs-lagos-abuja", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "nysc-corpers-jobs-lagos-abuja.html"));
  });
  app.get("/nysc-cds-skill-acquisition", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "nysc-cds-skill-acquisition.html"));
  });
  app.get("/corper-business-ideas", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "corper-business-ideas.html"));
  });
  app.get("/free-skill-acquisition-for-corpers-comparison", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "free-skill-acquisition-for-corpers-comparison.html"));
  });
  app.get("/documenting-cds-projects-for-your-portfolio", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "documenting-cds-projects-for-your-portfolio.html"));
  });
  app.get("/free-tools-to-host-your-portfolio-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "free-tools-to-host-your-portfolio-nigeria.html"));
  });
  app.get("/life-after-nysc-what-to-expect", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "life-after-nysc-what-to-expect.html"));
  });
  app.get("/nysc-graduate-trainee-jobs-guide", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "nysc-graduate-trainee-jobs-guide.html"));
  });
  app.get("/what-is-gis-course", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "what-is-gis-course.html"));
  });
  app.get("/qgis-vs-arcgis-for-beginners-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "qgis-vs-arcgis-for-beginners-nigeria.html"));
  });
  app.get("/gis-analyst-jobs-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "gis-analyst-jobs-in-nigeria.html"));
  });
  app.get("/is-gis-a-good-career", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "is-gis-a-good-career.html"));
  });
  app.get("/geospatial-data-in-agriculture-and-infrastructure-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "geospatial-data-in-agriculture-and-infrastructure-nigeria.html"));
  });
  app.get("/gis-companies-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "gis-companies-in-nigeria.html"));
  });
  app.get("/drone-survey-cost-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "drone-survey-cost-nigeria.html"));
  });
  app.get("/ncaa-drone-regulations-overview", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "ncaa-drone-regulations-overview.html"));
  });
  app.get("/drone-technology-in-oil-and-gas-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "drone-technology-in-oil-and-gas-nigeria.html"));
  });
  app.get("/hse-officer-salary-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "hse-officer-salary-in-nigeria.html"));
  });
  app.get("/is-nebosh-igc-worth-it", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "is-nebosh-igc-worth-it.html"));
  });
  app.get("/how-much-is-hse-courses-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "how-much-is-hse-courses-in-nigeria.html"));
  });
  app.get("/online-hse-certification-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "online-hse-certification-in-nigeria.html"));
  });
  app.get("/safety-officer-vs-hse-officer-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "safety-officer-vs-hse-officer-nigeria.html"));
  });
  app.get("/nebosh-igc-training-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "nebosh-igc-training-in-nigeria.html"));
  });
  app.get("/cyber-security-courses-in-nigeria-and-fees", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "cyber-security-courses-in-nigeria-and-fees.html"));
  });
  app.get("/where-can-i-study-cyber-security-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "where-can-i-study-cyber-security-in-nigeria.html"));
  });
  app.get("/free-cyber-security-training-in-nigeria-comparison", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "free-cyber-security-training-in-nigeria-comparison.html"));
  });
  app.get("/cyber-security-training-centres-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "cyber-security-training-centres-in-nigeria.html"));
  });
  app.get("/what-is-a-soc-analyst", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "what-is-a-soc-analyst.html"));
  });
  app.get("/network-security-basics-for-beginners-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "network-security-basics-for-beginners-nigeria.html"));
  });
  app.get("/cloud-security-basics-for-beginners-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "cloud-security-basics-for-beginners-nigeria.html"));
  });
  app.get("/solar-energy-training-in-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "solar-energy-training-in-nigeria.html"));
  });
  app.get("/renewable-energy-job-opportunities-guide", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "renewable-energy-job-opportunities-guide.html"));
  });
  app.get("/gis-for-solar-site-assessment-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "gis-for-solar-site-assessment-nigeria.html"));
  });
  app.get("/renewable-energy-vs-oil-and-gas-career-comparison", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "renewable-energy-vs-oil-and-gas-career-comparison.html"));
  });
  app.get("/oil-gas-banking-telecoms-digital-skills", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "oil-gas-banking-telecoms-digital-skills.html"));
  });
  app.get("/six-digital-skills-nigerian-graduates", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "six-digital-skills-nigerian-graduates.html"));
  });
  app.get("/graduate-to-job-ready-nigeria", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "graduate-to-job-ready-nigeria.html"));
  });
  // Press releases (2026-09-15) announcing the six-course curriculum's completion and
  // the employability content hub's publication above -- two individual flat-route
  // pages (not one combined listing), matching this site's one-URL-per-topic convention
  // for every other marketing page; NewsArticle JSON-LD rather than Article, since these
  // are dated announcements rather than evergreen guide content.
  app.get("/paleon-training-six-course-digital-skills-curriculum", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "paleon-training-six-course-digital-skills-curriculum.html"));
  });
  app.get("/paleon-training-employability-content-hub", (req, res) => {
    res.sendFile(path.join(__dirname, "marketing", "paleon-training-employability-content-hub.html"));
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
    // Kept in sync with frontend/src/routes/AppRouter.tsx's top-level route segments.
    // Without this allowlist every unmatched path (a typo, an old bookmark, a bot
    // probing /cgi-bin) got served the SPA shell with an unconditional 200 -- a soft
    // 404 that search engines happily index as a real page under the site's title
    // (confirmed indexed in Google as "Paleon Training" / "Page not found" for
    // /cgi-bin during the 2026-09-13 GEO audit). A path in this list still gets 200 and
    // renders normally client-side, including that route's own not-found/auth states;
    // anything else gets the same SPA shell but a real 404 status, which is what fixes
    // the indexing problem without changing what any real user sees.
    const knownAppRouteSegments = new Set([
      "login",
      "register",
      "forgot-password",
      "reset-password",
      "verify-email",
      "courses",
      "lessons",
      "dashboard",
      "refer",
      "assignments",
      "capstones",
      "quizzes",
      "instructor",
      "admin",
    ]);
    app.get("*", (req, res, next) => {
      if (req.method !== "GET" || req.path.startsWith("/api") || !fs.existsSync(indexHtmlPath)) {
        return next();
      }
      const firstSegment = req.path.split("/")[1] ?? "";
      if (!knownAppRouteSegments.has(firstSegment)) {
        res.status(404);
      }
      return res.sendFile(indexHtmlPath);
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
