// Share cards on /refer/me: PNG images an ambassador posts on WhatsApp (chat or Status),
// Instagram or Facebook. Drawn on a <canvas> in the browser, so nothing is stored or
// generated server-side. The look follows the printed flyers (referralPrint.service.ts):
// ink background, signal-orange accents, Source Serif headlines, Source Sans body.
//
// The lead card ("friend") puts the friend's welcome reward first rather than the
// ambassador's earnings. The reward is airtime paid AFTER the friend's first confirmed
// course payment -- never "off" a price -- so every card states that condition.

import sansBoldUrl from "../../assets/fonts/SourceSans3-Bold.ttf?url";
import sansRegularUrl from "../../assets/fonts/SourceSans3-Regular.ttf?url";
import serifBoldUrl from "../../assets/fonts/SourceSerif4-Bold.ttf?url";

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

export interface ShareCardInput {
  design: ShareCardDesign;
  format: ShareCardFormat;
  firstName: string | null;
  code: string;
  welcomeBonus: string; // formatted, e.g. "₦3,000"
}

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
// day/lesson counts, so a curriculum change can't make a saved card wrong.
const COURSES: Record<Exclude<ShareCardDesign, "friend">, CourseCopy> = {
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

let fontsReady: Promise<void> | null = null;

// Loaded on first use only, so /refer/me doesn't pay for ~650KB of fonts unless the
// ambassador opens the card maker. The bundled web fonts lack the naira sign; these don't.
export function loadShareCardFonts(): Promise<void> {
  if (!fontsReady) {
    const faces = [
      new FontFace(SERIF, `url(${serifBoldUrl})`, { weight: "700" }),
      new FontFace(SANS, `url(${sansRegularUrl})`, { weight: "400" }),
      new FontFace(SANS, `url(${sansBoldUrl})`, { weight: "700" }),
    ];
    fontsReady = Promise.all(faces.map((face) => face.load())).then((loaded) => {
      loaded.forEach((face) => document.fonts.add(face));
    });
    fontsReady.catch(() => {
      fontsReady = null;
    });
  }
  return fontsReady;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
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
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  font: string,
  size: number,
  color: string,
  lineHeight = 1.25,
): number {
  ctx.font = `${font}`.replace("{size}", `${size}px`);
  ctx.fillStyle = color;
  ctx.textBaseline = "top";
  const lines = wrap(ctx, text, maxWidth);
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * size * lineHeight));
  return y + lines.length * size * lineHeight;
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function spaced(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number): void {
  // Canvas letterSpacing isn't in every browser yet (Safari < 17), so space by hand.
  let cursor = x;
  for (const ch of text) {
    ctx.fillText(ch, cursor, y);
    cursor += ctx.measureText(ch).width + spacing;
  }
}

function spacedWidth(ctx: CanvasRenderingContext2D, text: string, spacing: number): number {
  let width = 0;
  for (const ch of text) width += ctx.measureText(ch).width + spacing;
  return width - spacing;
}

export function drawShareCard(canvas: HTMLCanvasElement, input: ShareCardInput): void {
  const { width: W, height: H } = SHARE_CARD_SIZE[input.format];
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const tall = input.format === "status";
  const M = 84;
  const inner = W - M * 2;
  const serif = `700 {size} ${SERIF}, Georgia, serif`;
  const sansBold = `700 {size} ${SANS}, Arial, sans-serif`;
  const sans = `400 {size} ${SANS}, Arial, sans-serif`;

  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  // A soft orange glow top-right, the only decoration.
  const glow = ctx.createRadialGradient(W, 0, 0, W, 0, W * 0.9);
  glow.addColorStop(0, "rgba(224,123,46,0.30)");
  glow.addColorStop(1, "rgba(224,123,46,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // --- Wordmark -------------------------------------------------------------------------
  const markTop = tall ? 120 : 60;
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(M, markTop + 8, 30, 30);
  ctx.font = serif.replace("{size}", "44px");
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("Paleon Training", M + 46, markTop);

  // --- Bottom block (anchored): code panel, free-lesson strip, small print ----------------
  const smallPrint = "Airtime is sent after your first course payment is confirmed. We teach skills; we don't promise jobs.";
  const smallSize = tall ? 24 : 21;
  ctx.font = sans.replace("{size}", `${smallSize}px`);
  const smallLines = wrap(ctx, smallPrint, inner);
  const smallTop = H - (tall ? 110 : 44) - smallLines.length * smallSize * 1.25;
  const stripH = tall ? 84 : 66;
  const stripTop = smallTop - (tall ? 28 : 18) - stripH;
  const panelH = tall ? 220 : 164;
  const panelTop = stripTop - (tall ? 24 : 16) - panelH;

  roundedRect(ctx, M, panelTop, inner, panelH, 24);
  ctx.fillStyle = PAPER;
  ctx.fill();
  ctx.fillStyle = SIGNAL_DEEP;
  ctx.font = sansBold.replace("{size}", `${tall ? 28 : 24}px`);
  spaced(ctx, "USE MY CODE WHEN YOU SIGN UP", M + 44, panelTop + (tall ? 38 : 28), 3);
  ctx.fillStyle = INK;
  let codeSize = tall ? 112 : 84;
  ctx.font = sansBold.replace("{size}", `${codeSize}px`);
  while (spacedWidth(ctx, input.code, 10) > inner - 88 && codeSize > 60) {
    codeSize -= 4;
    ctx.font = sansBold.replace("{size}", `${codeSize}px`);
  }
  spaced(ctx, input.code, M + 44, panelTop + (tall ? 84 : 64), 10);

  roundedRect(ctx, M, stripTop, inner, stripH, 18);
  ctx.fillStyle = SIGNAL_DEEP;
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = sansBold.replace("{size}", `${tall ? 34 : 30}px`);
  ctx.textBaseline = "middle";
  const stripText = "First lesson free · paleontraining.com";
  ctx.fillText(stripText, M + (inner - ctx.measureText(stripText).width) / 2, stripTop + stripH / 2 + 2);
  ctx.textBaseline = "top";

  ctx.fillStyle = ON_INK_MUTED;
  ctx.font = sans.replace("{size}", `${smallSize}px`);
  smallLines.forEach((line, i) => ctx.fillText(line, M, smallTop + i * smallSize * 1.25));

  // --- Main content, top-down below the wordmark -----------------------------------------
  let y = markTop + (tall ? 170 : 96);
  const contentBottom = panelTop - (tall ? 60 : 32);

  if (input.design === "friend") {
    const from = input.firstName ? `A GIFT FROM ${input.firstName.toUpperCase()}` : "A GIFT FOR YOU";
    ctx.fillStyle = SIGNAL;
    ctx.font = sansBold.replace("{size}", "32px");
    spaced(ctx, from, M, y, 4);
    y += tall ? 70 : 54;

    y = paragraph(ctx, `${input.welcomeBonus} airtime for you`, M, y, inner, serif, tall ? 124 : 112, "#FFFFFF", 1.08);
    y += tall ? 40 : 22;
    const who = input.firstName ? `${input.firstName}, a Paleon Student Ambassador,` : "A Paleon Student Ambassador";
    y = paragraph(
      ctx,
      `${who} invited you to learn job-ready digital skills online. Join with the code below and get ${input.welcomeBonus} airtime once your first course payment is confirmed.`,
      M,
      y,
      inner,
      sans,
      tall ? 42 : 34,
      ON_INK_SOFT,
      1.35,
    );

    if (tall) {
      y += 60;
      ctx.fillStyle = ON_INK_MUTED;
      ctx.font = sansBold.replace("{size}", "28px");
      spaced(ctx, "CHOOSE YOUR COURSE", M, y, 3);
      y += 56;
      for (const course of FRIEND_COURSES) {
        if (y + 56 > contentBottom) break;
        ctx.fillStyle = SIGNAL;
        ctx.fillRect(M, y + 16, 16, 16);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = sansBold.replace("{size}", "44px");
        ctx.fillText(course, M + 40, y);
        y += 70;
      }
    }
    return;
  }

  const copy = COURSES[input.design];
  ctx.fillStyle = SIGNAL;
  ctx.font = sansBold.replace("{size}", "30px");
  spaced(ctx, "ONLINE COURSE · FIRST LESSON FREE", M, y, 3);
  y += tall ? 70 : 54;
  y = paragraph(ctx, copy.headline, M, y, inner, serif, tall ? 116 : 88, "#FFFFFF", 1.08);
  y += tall ? 36 : 20;
  if (tall) {
    y = paragraph(ctx, copy.sub, M, y, inner, sans, 42, ON_INK_SOFT, 1.35);
    y += 60;
  }
  const bulletSize = tall ? 44 : 36;
  const bulletStep = tall ? 80 : 54;
  const bullets = tall ? copy.bullets : copy.bullets.slice(0, 3);
  for (const bullet of bullets) {
    if (y + bulletSize > contentBottom) break;
    ctx.fillStyle = SIGNAL;
    ctx.fillRect(M, y + bulletSize * 0.36, 16, 16);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = sansBold.replace("{size}", `${bulletSize}px`);
    ctx.fillText(bullet, M + 40, y);
    y += bulletStep;
  }
  const giftLine = input.firstName
    ? `From ${input.firstName}: join with my code and get ${input.welcomeBonus} airtime once your first course payment is confirmed.`
    : `Join with my code and get ${input.welcomeBonus} airtime once your first course payment is confirmed.`;
  ctx.font = sansBold.replace("{size}", `${tall ? 38 : 30}px`);
  const giftLines = wrap(ctx, giftLine, inner);
  const giftH = giftLines.length * (tall ? 38 : 30) * 1.3;
  const giftTop = Math.max(y + (tall ? 30 : 12), contentBottom - giftH);
  if (giftTop + giftH <= panelTop - 12) {
    paragraph(ctx, giftLine, M, giftTop, inner, sansBold, tall ? 38 : 30, SIGNAL, 1.3);
  }
}

export function shareCardFilename(input: ShareCardInput): string {
  return `paleon-${input.design}-${input.format}-${input.code}.png`;
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))), "image/png");
  });
}
