// Share links for /refer/me (2026-10-06). Each share card and promo video has a public
// link, /s/<code>/<design> or /s/<code>/v/<video>, whose preview image (og:image) is the
// card itself. So when an ambassador shares the link on WhatsApp, Facebook, LinkedIn or X,
// the platform shows the picture in the post on its own; there's nothing to attach.
// Websites can't attach files to those platforms, which is why the old "save the image,
// then add it yourself" buttons didn't work for people.
//
// The cards are drawn here with @napi-rs/canvas, so the /refer/me preview, the downloads
// and the link previews are one picture from one place. The look follows the printed
// flyers (referralPrint.service.ts): ink background, signal-orange accents, Source Serif
// headlines, Source Sans body. The friend's reward is airtime paid AFTER their first
// confirmed course payment -- never "off" a price -- and every card says so.
//
// The name on a card comes from the user record (and only when the ambassador chose to
// show it), never from the request, so nobody can put their own text on a Paleon card.

import fs from "fs";
import path from "path";
import { createCanvas, GlobalFonts, loadImage, SKRSContext2D } from "@napi-rs/canvas";
import { REFEREE_REWARD_NGN, REFERRAL_CODE_PREFIX } from "../constants/referral";
import { User } from "../models";

const FONT_DIR = path.join(__dirname, "..", "marketing", "fonts", "pdf");
const VIDEO_DIR = path.join(__dirname, "..", "marketing", "videos", "ambassador");

// Bump when a card's layout or wording changes. It's in every image URL, so platforms
// that cache link previews (Facebook, WhatsApp, LinkedIn) fetch the new picture.
export const SHARE_CARD_VERSION = 1;

const COURSE_SLUGS = [
  "cyber-security-fundamentals",
  "gis-and-drone-mapping",
  "digital-marketing",
  "hse-fundamentals",
] as const;
type CourseSlug = (typeof COURSE_SLUGS)[number];

// "lesson-<slug>" cards (2026-10-09, for the free-lesson posts on /refer) lead with the
// course's free first lesson, and their share page opens that lesson with the code attached.
export const SHARE_CARD_DESIGNS = [
  "friend",
  ...COURSE_SLUGS,
  ...COURSE_SLUGS.map((slug) => `lesson-${slug}` as const),
] as const;
export type ShareCardDesign = (typeof SHARE_CARD_DESIGNS)[number];

function courseOf(design: ShareCardDesign): CourseSlug | null {
  if (design === "friend") return null;
  return (design.startsWith("lesson-") ? design.slice("lesson-".length) : design) as CourseSlug;
}

const isLessonDesign = (design: ShareCardDesign) => design.startsWith("lesson-");

// square/status/portrait are the downloads; link is the 1.91:1 preview platforms show for
// a link. portrait (4:5) is the tallest picture an Instagram feed post shows uncropped;
// status (9:16) is for WhatsApp Status, Stories and TikTok.
export const SHARE_CARD_FORMATS = ["square", "status", "link", "portrait"] as const;
export type ShareCardFormat = (typeof SHARE_CARD_FORMATS)[number];

export const SHARE_CARD_SIZE: Record<ShareCardFormat, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  status: { width: 1080, height: 1920 },
  link: { width: 1200, height: 630 },
  portrait: { width: 1080, height: 1350 },
};

const INK = "#10151F";
const SIGNAL = "#E07B2E";
const SIGNAL_DEEP = "#C96A26";
const PAPER = "#F7F4EC";
const ON_INK_SOFT = "#C9C3B6";
const ON_INK_MUTED = "#8E8A80";

const SERIF = "PaleonCardSerif";
const SANS = "PaleonCardSans";

interface CourseCopy {
  headline: string;
  sub: string;
  bullets: string[];
}

// Bullets mirror the printed flyers' DESIGNS table (referralPrint.service.ts) minus the
// day/lesson counts, so a curriculum change can't make a shared card wrong.
const COURSES: Record<CourseSlug, CourseCopy> = {
  "cyber-security-fundamentals": {
    headline: "Cyber Security Fundamentals",
    sub: "Start a career in cyber security, with pathways for Oil & Gas, Banking and Telecoms.",
    bullets: ["Illustrated video lessons", "Assignments and a sector capstone", "Learn on your phone, at your pace", "Certificate of completion"],
  },
  "gis-and-drone-mapping": {
    headline: "GIS and Drone Mapping",
    sub: "The mapping and drone skills used in oil & gas, construction, agriculture and more.",
    bullets: ["QGIS and remote sensing", "Drone flight planning", "Photogrammetry and maps", "Sector capstone and certificate"],
  },
  "digital-marketing": {
    headline: "Digital Marketing",
    sub: "Learn to grow a brand online: the skills banks, telecoms and businesses look for.",
    bullets: ["SEO, Google Ads and content", "Email, analytics and automation", "Learn on your phone, at your pace", "Capstone project and certificate"],
  },
  "hse-fundamentals": {
    headline: "HSE Fundamentals",
    sub: "Health, Safety and Environment training for careers in oil & gas and industry.",
    bullets: ["Hazards and risk assessment", "Permit to work and regulations", "Emergencies and incidents", "Certificate of completion"],
  },
};

const FRIEND_COURSES = ["Cyber Security", "GIS & Drone Mapping", "Digital Marketing", "HSE Fundamentals"];

// Titles for the video pack's share pages; the captions themselves live in the frontend
// (features/referrals/ambassadorVideos.ts). Keep the two lists in step.
export const SHARE_VIDEOS: Record<string, { title: string; course: string }> = {
  "01-gis-good-cgpa": { title: "Good CGPA, but what can you do?", course: "GIS & Drone Mapping" },
  "02-hse-spot-the-hazard": { title: "Spot the hazard first", course: "HSE Fundamentals" },
  "03-cyber-one-click-bank": { title: "One click can cost a bank millions", course: "Cyber Security" },
  "04-cyber-telecoms-mast": { title: "Climb the mast, protect the network", course: "Cyber Security" },
  "05-digital-marketing-nysc": { title: "Learning digital marketing during NYSC", course: "Digital Marketing" },
  "06-self-paced-lagos-traffic": { title: "Lagos traffic? I dey learn", course: "All courses" },
  "07-mummy-certificate": { title: "When Mummy sees your certificate", course: "Certificate" },
  "08-gis-niger-delta-drone": { title: "Who maps the Niger Delta?", course: "GIS & Drone Mapping" },
  "09-career-match-campus": { title: "Which skill would you pick?", course: "Career Match" },
  "10-ambassador-airtime": { title: "Airtime for every friend who joins", course: "Student Ambassador" },
};

export function isShareCardDesign(value: string): value is ShareCardDesign {
  return (SHARE_CARD_DESIGNS as readonly string[]).includes(value);
}

export function isShareCardFormat(value: string): value is ShareCardFormat {
  return (SHARE_CARD_FORMATS as readonly string[]).includes(value);
}

export function isShareVideo(value: string): boolean {
  return Object.prototype.hasOwnProperty.call(SHARE_VIDEOS, value);
}

// Real codes are PLN + 6 characters (constants/referral.ts); anything else is a 404
// without touching the database.
export function normaliseCode(raw: string): string | null {
  const code = raw.trim().toUpperCase();
  return new RegExp(`^${REFERRAL_CODE_PREFIX}[A-Z0-9]{4,12}$`).test(code) ? code : null;
}

export interface Ambassador {
  code: string;
  firstName: string | null;
}

export async function findAmbassador(rawCode: string): Promise<Ambassador | null> {
  const code = normaliseCode(rawCode);
  if (!code) return null;
  const user = await User.findOne({ where: { referralCode: code }, attributes: ["firstName"] });
  if (!user) return null;
  return { code, firstName: cleanName(user.firstName) };
}

// A first name only, trimmed and capped so a long one can't run off the card.
function cleanName(raw: string | null | undefined): string | null {
  const first = (raw ?? "").trim().replace(/\s+/g, " ").split(" ")[0] ?? "";
  if (!first) return null;
  const name = first.charAt(0).toUpperCase() + first.slice(1);
  return name.length > 18 ? `${name.slice(0, 17)}…` : name;
}

function naira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

let fontsRegistered = false;

function registerFonts(): void {
  if (fontsRegistered) return;
  // The bundled web fonts lack the naira sign; these TTFs (also used by the print kit) don't.
  GlobalFonts.registerFromPath(path.join(FONT_DIR, "SourceSerif4-Bold.ttf"), SERIF);
  GlobalFonts.registerFromPath(path.join(FONT_DIR, "SourceSans3-Regular.ttf"), SANS);
  GlobalFonts.registerFromPath(path.join(FONT_DIR, "SourceSans3-Bold.ttf"), SANS);
  fontsRegistered = true;
}

/* ------------------------------------ drawing ------------------------------------ */

type Ctx = SKRSContext2D;

const serif = (size: number) => `700 ${size}px ${SERIF}`;
const sansBold = (size: number) => `700 ${size}px ${SANS}`;
const sans = (size: number) => `400 ${size}px ${SANS}`;

function wrap(ctx: Ctx, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Draws wrapped text with its top at y and returns the y just below the last line.
function paragraph(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  font: string,
  size: number,
  color: string,
  lineHeight = 1.25,
): number {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "top";
  const lines = wrap(ctx, text, maxWidth);
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * size * lineHeight));
  return y + lines.length * size * lineHeight;
}

function roundedRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function spaced(ctx: Ctx, text: string, x: number, y: number, spacing: number): void {
  let cursor = x;
  for (const ch of text) {
    ctx.fillText(ch, cursor, y);
    cursor += ctx.measureText(ch).width + spacing;
  }
}

function spacedWidth(ctx: Ctx, text: string, spacing: number): number {
  let width = 0;
  for (const ch of text) width += ctx.measureText(ch).width + spacing;
  return width - spacing;
}

function background(ctx: Ctx, W: number, H: number): void {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  // A soft orange glow top-right, the only decoration.
  const glow = ctx.createRadialGradient(W, 0, 0, W, 0, Math.max(W, H) * 0.9);
  glow.addColorStop(0, "rgba(224,123,46,0.30)");
  glow.addColorStop(1, "rgba(224,123,46,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
}

function wordmark(ctx: Ctx, x: number, top: number, size: number): void {
  const box = Math.round(size * 0.68);
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(x, top + size * 0.18, box, box);
  ctx.font = serif(size);
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("Paleon Training", x + box + size * 0.36, top);
}

// The paper panel with "USE MY CODE" and the code, then the orange strip below it.
function codePanel(ctx: Ctx, code: string, x: number, top: number, width: number, panelH: number, stripText: string, stripH: number): number {
  const labelText = "USE MY CODE WHEN YOU SIGN UP";
  let label = Math.round(panelH * 0.13);
  roundedRect(ctx, x, top, width, panelH, 20);
  ctx.fillStyle = PAPER;
  ctx.fill();
  ctx.fillStyle = SIGNAL_DEEP;
  ctx.font = sansBold(label);
  while (spacedWidth(ctx, labelText, 2.5) > width - 64 && label > 14) {
    label -= 1;
    ctx.font = sansBold(label);
  }
  ctx.textBaseline = "top";
  spaced(ctx, "USE MY CODE WHEN YOU SIGN UP", x + 32, top + panelH * 0.17, 2.5);
  ctx.fillStyle = INK;
  let codeSize = Math.round(panelH * 0.5);
  ctx.font = sansBold(codeSize);
  while (spacedWidth(ctx, code, codeSize * 0.09) > width - 64 && codeSize > 30) {
    codeSize -= 2;
    ctx.font = sansBold(codeSize);
  }
  spaced(ctx, code, x + 32, top + panelH * 0.4, codeSize * 0.09);

  const stripTop = top + panelH + 14;
  roundedRect(ctx, x, stripTop, width, stripH, 16);
  ctx.fillStyle = SIGNAL_DEEP;
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  let stripSize = Math.round(stripH * 0.4);
  ctx.font = sansBold(stripSize);
  while (ctx.measureText(stripText).width > width - 32 && stripSize > 16) {
    stripSize -= 1;
    ctx.font = sansBold(stripSize);
  }
  ctx.textBaseline = "middle";
  ctx.fillText(stripText, x + (width - ctx.measureText(stripText).width) / 2, stripTop + stripH / 2 + 1);
  ctx.textBaseline = "top";
  return stripTop + stripH;
}

// The orange "FREE LESSON" pill on the lesson-<slug> cards. Returns the y below it.
function freeBadge(ctx: Ctx, x: number, top: number, size: number): number {
  const text = "FREE LESSON";
  ctx.font = sansBold(size);
  const padX = size * 0.7;
  const h = size * 1.9;
  const w = spacedWidth(ctx, text, size * 0.12) + padX * 2;
  roundedRect(ctx, x, top, w, h, h / 2);
  ctx.fillStyle = SIGNAL;
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.textBaseline = "middle";
  spaced(ctx, text, x + padX, top + h / 2 + 1, size * 0.12);
  ctx.textBaseline = "top";
  return top + h;
}

const SMALL_PRINT = "Airtime is sent after your first course payment is confirmed. We teach skills; we don't promise jobs.";

export interface CardInput {
  design: ShareCardDesign;
  format: ShareCardFormat;
  code: string;
  firstName: string | null;
}

// The square, portrait and tall cards. Portrait uses the square card's type sizes with the
// extra height spent on the course summary and bullets, like the tall card.
function drawPostCard(ctx: Ctx, input: CardInput, welcomeBonus: string): void {
  const { width: W, height: H } = SHARE_CARD_SIZE[input.format];
  const tall = input.format === "status";
  const roomy = tall || input.format === "portrait";
  const M = 84;
  const inner = W - M * 2;
  background(ctx, W, H);

  const markTop = tall ? 120 : roomy ? 76 : 60;
  wordmark(ctx, M - 2, markTop, 44);

  // Bottom block (anchored): code panel, free-lesson strip, small print.
  const smallSize = tall ? 24 : 21;
  ctx.font = sans(smallSize);
  const smallLines = wrap(ctx, SMALL_PRINT, inner);
  const smallTop = H - (tall ? 110 : 44) - smallLines.length * smallSize * 1.25;
  const stripH = tall ? 84 : 66;
  const panelH = tall ? 220 : 164;
  const panelTop = smallTop - (tall ? 28 : 18) - stripH - 14 - panelH;
  const lesson = isLessonDesign(input.design);
  codePanel(
    ctx,
    input.code,
    M,
    panelTop,
    inner,
    panelH,
    lesson ? "Start the free lesson · paleontraining.com" : "First lesson free · paleontraining.com",
    stripH,
  );

  ctx.fillStyle = ON_INK_MUTED;
  ctx.font = sans(smallSize);
  smallLines.forEach((line, i) => ctx.fillText(line, M, smallTop + i * smallSize * 1.25));

  let y = markTop + (tall ? 170 : 96);
  const contentBottom = panelTop - (tall ? 60 : 32);

  if (input.design === "friend") {
    const from = input.firstName ? `A GIFT FROM ${input.firstName.toUpperCase()}` : "A GIFT FOR YOU";
    ctx.fillStyle = SIGNAL;
    ctx.font = sansBold(32);
    spaced(ctx, from, M, y, 4);
    y += tall ? 70 : 54;
    const headSize = tall ? 124 : 112;
    y = paragraph(ctx, `${welcomeBonus} airtime for you`, M, y, inner, serif(headSize), headSize, "#FFFFFF", 1.08);
    y += tall ? 40 : 22;
    const who = input.firstName ? `${input.firstName}, a Paleon Student Ambassador,` : "A Paleon Student Ambassador";
    const bodySize = tall ? 42 : 34;
    y = paragraph(
      ctx,
      `${who} invited you to learn job-ready digital skills online. Join with the code below and get ${welcomeBonus} airtime once your first course payment is confirmed.`,
      M,
      y,
      inner,
      sans(bodySize),
      bodySize,
      ON_INK_SOFT,
      1.35,
    );
    if (roomy) {
      y += tall ? 60 : 40;
      ctx.fillStyle = ON_INK_MUTED;
      ctx.font = sansBold(28);
      spaced(ctx, "CHOOSE YOUR COURSE", M, y, 3);
      y += tall ? 56 : 46;
      const courseSize = tall ? 44 : 34;
      for (const course of FRIEND_COURSES) {
        if (y + courseSize > contentBottom) break;
        ctx.fillStyle = SIGNAL;
        ctx.fillRect(M, y + courseSize * 0.36, 16, 16);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = sansBold(courseSize);
        ctx.fillText(course, M + 40, y);
        y += tall ? 70 : 48;
      }
    }
    return;
  }

  const copy = COURSES[courseOf(input.design)!];
  if (lesson) {
    y = freeBadge(ctx, M, y, tall ? 40 : 34);
    y += tall ? 36 : 24;
  } else {
    ctx.fillStyle = SIGNAL;
    ctx.font = sansBold(30);
    spaced(ctx, "ONLINE COURSE · FIRST LESSON FREE", M, y, 3);
    y += tall ? 70 : 54;
  }
  const headSize = tall ? 116 : 88;
  y = paragraph(ctx, copy.headline, M, y, inner, serif(headSize), headSize, "#FFFFFF", 1.08);
  y += tall ? 36 : 20;
  if (lesson) {
    const pitch = "Watch Lesson 1 on your phone today. No payment, no card.";
    y = paragraph(ctx, pitch, M, y, inner, sans(tall ? 42 : 34), tall ? 42 : 34, ON_INK_SOFT, 1.35);
    y += tall ? 60 : 26;
  } else if (roomy) {
    const subSize = tall ? 42 : 34;
    y = paragraph(ctx, copy.sub, M, y, inner, sans(subSize), subSize, ON_INK_SOFT, 1.35);
    y += tall ? 60 : 34;
  }
  const bulletSize = tall ? 44 : roomy ? 38 : 36;
  const bulletStep = tall ? 80 : roomy ? 62 : 54;
  const bullets = roomy ? copy.bullets : copy.bullets.slice(0, lesson ? 2 : 3);
  for (const bullet of bullets) {
    if (y + bulletSize > contentBottom) break;
    ctx.fillStyle = SIGNAL;
    ctx.fillRect(M, y + bulletSize * 0.36, 16, 16);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = sansBold(bulletSize);
    ctx.fillText(bullet, M + 40, y);
    y += bulletStep;
  }
  const giftLine = input.firstName
    ? `From ${input.firstName}: join with my code and get ${welcomeBonus} airtime once your first course payment is confirmed.`
    : `Join with my code and get ${welcomeBonus} airtime once your first course payment is confirmed.`;
  const giftSize = tall ? 38 : 30;
  ctx.font = sansBold(giftSize);
  const giftH = wrap(ctx, giftLine, inner).length * giftSize * 1.3;
  const giftTop = Math.max(y + (tall ? 30 : 12), contentBottom - giftH);
  if (giftTop + giftH <= panelTop - 12) {
    paragraph(ctx, giftLine, M, giftTop, inner, sansBold(giftSize), giftSize, SIGNAL, 1.3);
  }
}

// The 1200x630 picture platforms show under a shared link: the message on the left, the
// code on the right.
function drawLinkCard(ctx: Ctx, input: CardInput, welcomeBonus: string): void {
  const { width: W, height: H } = SHARE_CARD_SIZE.link;
  const M = 60;
  background(ctx, W, H);
  wordmark(ctx, M, 48, 34);

  const panelW = 410;
  const panelX = W - M - panelW;
  const leftW = panelX - M - 48;
  const lesson = isLessonDesign(input.design);
  codePanel(ctx, input.code, panelX, 150, panelW, 170, lesson ? "Start the free lesson" : "First lesson free", 64);
  ctx.fillStyle = ON_INK_SOFT;
  ctx.font = sansBold(24);
  const site = "paleontraining.com";
  ctx.fillText(site, panelX + (panelW - ctx.measureText(site).width) / 2, 420);

  ctx.fillStyle = ON_INK_MUTED;
  ctx.font = sans(19);
  ctx.fillText(SMALL_PRINT, M, H - 52);

  let y = 140;
  if (input.design === "friend") {
    const from = input.firstName ? `A GIFT FROM ${input.firstName.toUpperCase()}` : "A GIFT FOR YOU";
    ctx.fillStyle = SIGNAL;
    ctx.font = sansBold(24);
    spaced(ctx, from, M, y, 3);
    y += 46;
    y = paragraph(ctx, `${welcomeBonus} airtime for you`, M, y, leftW, serif(78), 78, "#FFFFFF", 1.05);
    y += 22;
    paragraph(
      ctx,
      `Learn job-ready digital skills online with Paleon Training. Join with my code and get ${welcomeBonus} airtime once your first course payment is confirmed.`,
      M,
      y,
      leftW,
      sans(27),
      27,
      ON_INK_SOFT,
      1.35,
    );
    return;
  }

  const copy = COURSES[courseOf(input.design)!];
  if (lesson) {
    y = freeBadge(ctx, M, y - 10, 26) + 18;
  } else {
    ctx.fillStyle = SIGNAL;
    ctx.font = sansBold(22);
    spaced(ctx, "ONLINE COURSE · FIRST LESSON FREE", M, y, 2.5);
    y += 44;
  }
  y = paragraph(ctx, copy.headline, M, y, leftW, serif(64), 64, "#FFFFFF", 1.05);
  y += 24;
  if (lesson) {
    y = paragraph(ctx, "Watch Lesson 1 free on your phone. No payment, no card.", M, y, leftW, sans(27), 27, ON_INK_SOFT, 1.3);
    y += 14;
  }
  for (const bullet of copy.bullets.slice(0, lesson ? 2 : 3)) {
    ctx.fillStyle = SIGNAL;
    ctx.fillRect(M, y + 11, 12, 12);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = sansBold(29);
    ctx.fillText(bullet, M + 28, y);
    y += 44;
  }
  if (y + 40 < H - 70) {
    const gift = input.firstName
      ? `From ${input.firstName}: ${welcomeBonus} airtime for you when you join and pay.`
      : `${welcomeBonus} airtime for you when you join and pay.`;
    paragraph(ctx, gift, M, y + 12, leftW, sansBold(24), 24, SIGNAL, 1.3);
  }
}

// A video's link preview: its poster frame with a play button on the left, the title
// and code on the right.
async function drawVideoLinkCard(ctx: Ctx, video: string, code: string, firstName: string | null): Promise<void> {
  const { width: W, height: H } = SHARE_CARD_SIZE.link;
  background(ctx, W, H);
  const meta = SHARE_VIDEOS[video];

  const posterW = Math.round((H * 9) / 16);
  try {
    const poster = await loadImage(fs.readFileSync(path.join(VIDEO_DIR, `${video}.jpg`)));
    ctx.drawImage(poster, 0, 0, posterW, H);
  } catch {
    ctx.fillStyle = "#1C2230";
    ctx.fillRect(0, 0, posterW, H);
  }
  // Play button.
  const cx = posterW / 2;
  const cy = H / 2;
  ctx.fillStyle = "rgba(16,21,31,0.62)";
  ctx.beginPath();
  ctx.arc(cx, cy, 58, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(cx - 18, cy - 30);
  ctx.lineTo(cx - 18, cy + 30);
  ctx.lineTo(cx + 32, cy);
  ctx.closePath();
  ctx.fill();

  const x = posterW + 56;
  const w = W - x - 56;
  wordmark(ctx, x, 46, 32);
  ctx.fillStyle = SIGNAL;
  ctx.font = sansBold(22);
  spaced(ctx, meta.course.toUpperCase(), x, 128, 2.5);
  const y = paragraph(ctx, meta.title, x, 166, w, serif(54), 54, "#FFFFFF", 1.08);
  const gift = firstName
    ? `From ${firstName}: ${naira(REFEREE_REWARD_NGN)} airtime for you when you join with my code and pay.`
    : `${naira(REFEREE_REWARD_NGN)} airtime for you when you join with my code and pay.`;
  const afterGift = paragraph(ctx, gift, x, y + 18, w, sans(26), 26, ON_INK_SOFT, 1.3);
  codePanel(ctx, code, x, Math.max(afterGift + 26, H - 56 - 64 - 14 - 140), w, 140, "Watch free · First lesson free", 56);
}

/* ------------------------------------- output ------------------------------------- */

const CACHE_MAX = 300;
const cache = new Map<string, Buffer>();

function remember(key: string, buffer: Buffer): Buffer {
  if (cache.size >= CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, buffer);
  return buffer;
}

// PNG for the downloads (sharp text for Status and feeds); JPEG for link previews, which
// WhatsApp only shows when the image is small.
export async function renderCard(input: CardInput): Promise<{ buffer: Buffer; contentType: string }> {
  const link = input.format === "link";
  const contentType = link ? "image/jpeg" : "image/png";
  const key = `card|${SHARE_CARD_VERSION}|${input.design}|${input.format}|${input.code}|${input.firstName ?? ""}`;
  const hit = cache.get(key);
  if (hit) return { buffer: hit, contentType };
  registerFonts();
  const { width, height } = SHARE_CARD_SIZE[input.format];
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const welcomeBonus = naira(REFEREE_REWARD_NGN);
  if (link) drawLinkCard(ctx, input, welcomeBonus);
  else drawPostCard(ctx, input, welcomeBonus);
  const buffer = link ? canvas.toBuffer("image/jpeg", 86) : canvas.toBuffer("image/png");
  return { buffer: remember(key, buffer), contentType };
}

export async function renderVideoLinkCard(video: string, code: string, firstName: string | null): Promise<Buffer> {
  const key = `video|${SHARE_CARD_VERSION}|${video}|${code}|${firstName ?? ""}`;
  const hit = cache.get(key);
  if (hit) return hit;
  registerFonts();
  const canvas = createCanvas(SHARE_CARD_SIZE.link.width, SHARE_CARD_SIZE.link.height);
  await drawVideoLinkCard(canvas.getContext("2d"), video, code, firstName);
  return remember(key, canvas.toBuffer("image/jpeg", 86));
}

/* ---------------------------------- share pages ---------------------------------- */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface SharePage {
  origin: string; // public site origin, e.g. https://paleontraining.com
  ambassador: Ambassador;
  showName: boolean;
  design?: ShareCardDesign; // a share card...
  video?: string; // ...or a promo video
}

function courseSlugFor(page: SharePage): string | null {
  return page.design ? courseOf(page.design) : null;
}

// The page a shared link opens. Crawlers read the og: tags (that's what puts the card in
// the post); people see the card or video, the code and a sign-up button carrying the code.
export function renderSharePage(page: SharePage): string {
  const { origin, ambassador } = page;
  const name = page.showName ? ambassador.firstName : null;
  const nameQuery = page.showName ? "?n=1" : "";
  const imageQuery = `${nameQuery ? `${nameQuery}&` : "?"}v=${SHARE_CARD_VERSION}`;
  const reward = naira(REFEREE_REWARD_NGN);
  const registerUrl = `${origin}/register?ref=${encodeURIComponent(ambassador.code)}`;

  let path_: string;
  let imageUrl: string;
  let title: string;
  let description: string;
  let media: string;
  if (page.video) {
    const meta = SHARE_VIDEOS[page.video];
    path_ = `/s/${ambassador.code}/v/${page.video}`;
    imageUrl = `${origin}${path_}/link.jpg${imageQuery}`;
    title = `${meta.title} | Paleon Training`;
    description = `${name ? `${name} invited you to Paleon Training. ` : ""}Watch, then join with code ${ambassador.code} and get ${reward} airtime once your first course payment is confirmed. First lesson free.`;
    media = `<video src="/videos/ambassador/${page.video}.mp4" poster="/videos/ambassador/${page.video}.jpg" controls playsinline preload="metadata"></video>`;
  } else {
    const design = page.design ?? "friend";
    path_ = `/s/${ambassador.code}/${design}`;
    imageUrl = `${origin}${path_}/link.jpg${imageQuery}`;
    const course = courseOf(design);
    if (!course) {
      title = name ? `${name} sent you ${reward} airtime | Paleon Training` : `${reward} airtime for you | Paleon Training`;
    } else if (isLessonDesign(design)) {
      title = `Free lesson: ${COURSES[course].headline} | Paleon Training`;
    } else {
      title = `${COURSES[course].headline}: first lesson free | Paleon Training`;
    }
    description = isLessonDesign(design)
      ? `Watch Lesson 1 of ${COURSES[course!].headline} free on your phone. No payment, no card. Like it? Join with code ${ambassador.code} and get ${reward} airtime once your first course payment is confirmed.`
      : `${name ? `${name} invited you to learn job-ready digital skills online. ` : "Learn job-ready digital skills online. "}Join with code ${ambassador.code} and get ${reward} airtime once your first course payment is confirmed.`;
    media = `<img src="${path_}/square.png${imageQuery}" alt="${escapeHtml(title)}" width="1080" height="1080">`;
  }
  const pageUrl = `${origin}${path_}${nameQuery}`;
  const slug = courseSlugFor(page);
  // The free lesson keeps the code, so "Sign up" there fills it in.
  const lessonUrl = slug ? `/preview/${slug}?ref=${encodeURIComponent(ambassador.code)}` : null;
  const lessonFirst = Boolean(page.design && isLessonDesign(page.design) && lessonUrl);
  const signUpButton = `<a class="${lessonFirst ? "secondary" : "primary"}" href="${escapeHtml(registerUrl)}">Sign up with code ${escapeHtml(ambassador.code)}</a>`;
  const actions = lessonFirst
    ? `<a class="primary" href="${escapeHtml(lessonUrl!)}">Start the free lesson</a>\n  ${signUpButton}`
    : `${signUpButton}\n  ${
        lessonUrl
          ? `<a class="secondary" href="${escapeHtml(lessonUrl)}">Try the first lesson free</a>`
          : `<a class="secondary" href="/welcome#courses">See the four courses</a>`
      }`;
  const heading = lessonFirst
    ? `Try ${COURSES[slug as CourseSlug].headline} free`
    : name
      ? `${name} invited you to Paleon Training`
      : "You're invited to Paleon Training";
  const intro = lessonFirst
    ? `Watch the first lesson free on your phone, no payment and no card. Like it? Sign up with ${name ? `${name}'s` : "this"} code and get ${reward} airtime once your first course payment is confirmed.`
    : `Learn job-ready digital skills online, at your own pace. Sign up with this code and get ${reward} airtime once your first course payment is confirmed.`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${escapeHtml(pageUrl)}">
<meta property="og:type" content="${page.video ? "video.other" : "website"}">
<meta property="og:site_name" content="Paleon Training">
<meta property="og:url" content="${escapeHtml(pageUrl)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${escapeHtml(imageUrl)}">
<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${escapeHtml(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(imageUrl)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#10151F;color:#F7F4EC;font-family:"Source Sans 3",Arial,sans-serif;line-height:1.5}
  main{max-width:520px;margin:0 auto;padding:24px 16px 48px}
  .brand{font-family:"Source Serif 4",Georgia,serif;font-weight:700;font-size:20px;color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:10px}
  .brand span{display:inline-block;width:14px;height:14px;background:#E07B2E}
  img,video{display:block;width:100%;height:auto;border-radius:14px;margin:20px 0;background:#1C2230}
  video{aspect-ratio:9/16;max-height:70vh;object-fit:contain}
  h1{font-family:"Source Serif 4",Georgia,serif;font-size:28px;line-height:1.2;margin:8px 0}
  p{color:#C9C3B6;margin:8px 0 16px}
  .code{display:inline-block;background:#F7F4EC;color:#10151F;font-weight:700;letter-spacing:3px;font-size:24px;padding:8px 16px;border-radius:10px}
  .primary{display:block;text-align:center;background:#C96A26;color:#fff;font-weight:700;font-size:19px;padding:15px;border-radius:12px;text-decoration:none;margin-top:20px}
  .secondary{display:block;text-align:center;color:#F7F4EC;padding:12px;text-decoration:underline}
  small{display:block;color:#8E8A80;margin-top:18px;font-size:13px}
</style>
</head>
<body>
<main>
  <a class="brand" href="/"><span></span>Paleon Training</a>
  ${media}
  <h1>${escapeHtml(heading)}</h1>
  <p>${escapeHtml(intro)}</p>
  <div class="code">${escapeHtml(ambassador.code)}</div>
  ${actions}
  <small>Airtime is sent after your first course payment is confirmed. We teach skills; we don't promise jobs.</small>
</main>
<script src="/analytics.js" defer></script>
</body>
</html>`;
}
