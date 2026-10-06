// Public share links for ambassadors (2026-10-06), mounted at /s. See
// services/shareLink.service.ts for why they exist.
//
//   /s/<code>/<design>                    share page for a card (?n=1 shows the first name)
//   /s/<code>/<design>/<square|status|link>.<png|jpg>   the card image
//   /s/<code>/v/<video>                   share page for a promo video
//   /s/<code>/v/<video>/link.jpg          that video's link preview
//
// Link-preview bots (WhatsApp, Facebook, LinkedIn, X) fetch these without logging in, so
// nothing here needs auth. Unknown codes, designs and videos are 404s.

import { NextFunction, Request, Response, Router } from "express";
import rateLimit from "express-rate-limit";
import { config } from "../config";
import {
  findAmbassador,
  isShareCardDesign,
  isShareCardFormat,
  isShareVideo,
  renderCard,
  renderSharePage,
  renderVideoLinkCard,
} from "../services/shareLink.service";

export const shareLinksRouter = Router();

// Images are drawn on demand (then cached), so cap how fast one address can ask. Preview
// bots fetch each link once, so this never gets in their way.
const imageLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.nodeEnv === "test",
});

function notFoundPage(res: Response): void {
  res
    .status(404)
    .type("html")
    .send(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Link not found | Paleon Training</title><p style="font-family:Arial,sans-serif;padding:24px">This share link isn\'t valid. Visit <a href="/">paleontraining.com</a>.</p>',
    );
}

function publicOrigin(): string {
  return config.corsOrigin.replace(/\/$/, "");
}

const showName = (req: Request) => req.query.n === "1";

const asyncRoute =
  (fn: (req: Request, res: Response) => Promise<void>) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

shareLinksRouter.get(
  "/:code/v/:video",
  asyncRoute(async (req, res) => {
    const ambassador = isShareVideo(req.params.video) ? await findAmbassador(req.params.code) : null;
    if (!ambassador) return notFoundPage(res);
    res.set("Cache-Control", "public, max-age=600");
    res.type("html").send(
      renderSharePage({ origin: publicOrigin(), ambassador, showName: showName(req), video: req.params.video }),
    );
  }),
);

shareLinksRouter.get(
  "/:code/v/:video/link.jpg",
  imageLimiter,
  asyncRoute(async (req, res) => {
    const ambassador = isShareVideo(req.params.video) ? await findAmbassador(req.params.code) : null;
    if (!ambassador) return void res.sendStatus(404);
    const buffer = await renderVideoLinkCard(
      req.params.video,
      ambassador.code,
      showName(req) ? ambassador.firstName : null,
    );
    res.set("Cache-Control", "public, max-age=86400");
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    res.type("image/jpeg").send(buffer);
  }),
);

shareLinksRouter.get(
  "/:code/:design",
  asyncRoute(async (req, res) => {
    const design = req.params.design;
    const ambassador = isShareCardDesign(design) ? await findAmbassador(req.params.code) : null;
    if (!ambassador || !isShareCardDesign(design)) return notFoundPage(res);
    res.set("Cache-Control", "public, max-age=600");
    res.type("html").send(renderSharePage({ origin: publicOrigin(), ambassador, showName: showName(req), design }));
  }),
);

shareLinksRouter.get(
  "/:code/:design/:file",
  imageLimiter,
  asyncRoute(async (req, res) => {
    const { design, file } = req.params;
    const match = /^(square|status|link)\.(png|jpg)$/.exec(file);
    const format = match?.[1] ?? "";
    // square/status are PNGs, the link preview a JPEG.
    const extOk = match && (format === "link" ? match[2] === "jpg" : match[2] === "png");
    if (!isShareCardDesign(design) || !isShareCardFormat(format) || !extOk) return void res.sendStatus(404);
    const ambassador = await findAmbassador(req.params.code);
    if (!ambassador) return void res.sendStatus(404);
    const { buffer, contentType } = await renderCard({
      design,
      format,
      code: ambassador.code,
      firstName: showName(req) ? ambassador.firstName : null,
    });
    res.set("Cache-Control", "public, max-age=86400");
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    if (req.query.download === "1") {
      res.attachment(`paleon-${design}-${format}-${ambassador.code}.${match[2]}`);
    }
    res.type(contentType).send(buffer);
  }),
);
