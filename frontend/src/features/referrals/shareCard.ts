// Share cards and share links on /refer/me.
//
// Since 2026-10-06 the cards are drawn by the server (backend/src/services/shareLink.service.ts),
// not on a canvas here, so the preview, the download and the picture platforms show under a
// shared link are the same image. Each card and promo video has a public share link,
// /s/<code>/<design> or /s/<code>/v/<video>, whose preview image is the card: sharing that
// link puts the picture in the WhatsApp, Facebook, LinkedIn or X post without attaching
// anything, which websites can't do.

import { SITE_ORIGIN } from "./ambassadorVideos";

export type ShareCardDesign =
  | "friend"
  | "cyber-security-fundamentals"
  | "gis-and-drone-mapping"
  | "digital-marketing"
  | "hse-fundamentals";

export type ShareCardFormat = "square" | "status";

export const SHARE_CARD_SIZE: Record<ShareCardFormat, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  status: { width: 1080, height: 1920 },
};

// Must match SHARE_CARD_VERSION in shareLink.service.ts, so a changed card isn't served
// from a stale cache.
const SHARE_CARD_VERSION = 1;

// The address friends will open. In production the API is same-origin (SITE_ORIGIN is
// empty), so it's this page's origin; in local dev it's the backend on :4000.
function publicOrigin(): string {
  return SITE_ORIGIN || window.location.origin;
}

function nameQuery(showName: boolean): string {
  return showName ? "?n=1" : "";
}

export function shareCardImageUrl(code: string, design: ShareCardDesign, format: ShareCardFormat, showName: boolean): string {
  const query = new URLSearchParams({ v: String(SHARE_CARD_VERSION) });
  if (showName) query.set("n", "1");
  return `${SITE_ORIGIN}/s/${encodeURIComponent(code)}/${design}/${format}.png?${query}`;
}

export function cardShareLink(code: string, design: ShareCardDesign, showName: boolean): string {
  return `${publicOrigin()}/s/${encodeURIComponent(code)}/${design}${nameQuery(showName)}`;
}

export function videoShareLink(code: string, videoFile: string, showName: boolean): string {
  return `${publicOrigin()}/s/${encodeURIComponent(code)}/v/${videoFile}${nameQuery(showName)}`;
}

export function shareCardFilename(code: string, design: ShareCardDesign, format: ShareCardFormat): string {
  return `paleon-${design}-${format}-${code}.png`;
}
