import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { PRINT_DESIGNS, PrintDesign, PrintKind, REFEREE_REWARD_NGN } from "../constants/referral";
import { User } from "../models";
import { ApiError } from "../utils/ApiError";
import { ensureReferralCode } from "./referral.service";

export { PRINT_DESIGNS, PRINT_KINDS } from "../constants/referral";
export type { PrintDesign, PrintKind } from "../constants/referral";

// Printable ambassador collateral: an A4 poster, A5 handbills (two per A4 sheet) and
// pocket cards (ten 85x55mm cards per A4 sheet), each carrying the ambassador's own code
// and a QR code to their /register?ref= link. Like the certificate, everything is drawn
// on the fly and nothing is stored, so the PDF always carries the current code.
//
// Deliberately no course prices: those live in coursePricing.ts and change, and a flyer
// that has already been printed can't be updated. The hook is the free first lesson plus
// the friend's welcome reward, which is read from the referral constants.

interface DesignCopy {
  eyebrow: string;
  headline: string;
  cardHeadline: string;
  sub: string;
  bullets: string[];
  previewPath: string;
}

// Day/lesson counts match the public course pages (backend/src/marketing/*-course.html).
// A curriculum change has to update those pages anyway -- update this table with them.
const DESIGNS: Record<PrintDesign, DesignCopy> = {
  general: {
    eyebrow: "JOB-READY DIGITAL SKILLS",
    headline: "Build the skills Nigerian employers are hiring for",
    cardHeadline: "Job-ready digital skills, online",
    sub: "Beginner-friendly online courses focused on careers in Oil & Gas, Banking and Telecoms. Learn on your phone, at your own pace.",
    bullets: [
      "Cyber Security Fundamentals",
      "GIS and Drone Mapping",
      "Digital Marketing",
      "HSE Fundamentals",
    ],
    previewPath: "/welcome#courses",
  },
  "cyber-security-fundamentals": {
    eyebrow: "BEGINNER COURSE",
    headline: "Cyber Security Fundamentals",
    cardHeadline: "Cyber Security Fundamentals",
    sub: "Start a career in cyber security, with pathways for Oil & Gas, Banking and Telecoms.",
    bullets: [
      "18 days, 36 illustrated video lessons",
      "Assignments, quizzes and a sector capstone",
      "Self-paced: learn on your phone",
      "Certificate of completion",
    ],
    previewPath: "/preview/cyber-security-fundamentals",
  },
  "gis-and-drone-mapping": {
    eyebrow: "BEGINNER COURSE",
    headline: "GIS and Drone Mapping",
    cardHeadline: "GIS and Drone Mapping",
    sub: "Learn the mapping and drone skills used in oil & gas, construction, agriculture and more.",
    bullets: [
      "9 days, 18 lessons",
      "QGIS, coordinate systems and remote sensing",
      "Drone flight planning and photogrammetry",
      "Sector capstone and certificate",
    ],
    previewPath: "/preview/gis-and-drone-mapping",
  },
  "digital-marketing": {
    eyebrow: "BEGINNER COURSE",
    headline: "Digital Marketing",
    cardHeadline: "Digital Marketing",
    sub: "Learn to grow a brand online: the skills banks, telecoms and businesses are hiring for.",
    bullets: [
      "8 days, 16 illustrated video lessons",
      "SEO, Google Ads, content and email",
      "Analytics and automation",
      "Capstone project and certificate",
    ],
    previewPath: "/preview/digital-marketing",
  },
  "hse-fundamentals": {
    eyebrow: "BEGINNER COURSE",
    headline: "HSE Fundamentals",
    cardHeadline: "HSE Fundamentals",
    sub: "Health, Safety and Environment training for careers in oil & gas and industry.",
    bullets: [
      "Hazards and risk assessment",
      "Nigerian regulations and permit to work",
      "Emergencies and incident investigation",
      "Certificate of completion",
    ],
    previewPath: "/preview/hse-fundamentals",
  },
};

export interface PrintData {
  code: string;
  shareUrl: string;
  host: string;
  firstName: string | null;
  welcomeBonusNgn: number;
  design: PrintDesign;
}

export async function getPrintData(
  userId: string,
  appOrigin: string,
  design: PrintDesign,
  showName: boolean,
): Promise<PrintData> {
  const user = await User.findByPk(userId);
  if (!user) throw ApiError.notFound("User not found");
  const code = await ensureReferralCode(user);
  const shareUrl = `${appOrigin}/register?ref=${code}`;
  return {
    code,
    shareUrl,
    host: new URL(appOrigin).host.replace(/^www\./, ""),
    firstName: showName ? user.firstName.trim() || null : null,
    welcomeBonusNgn: REFEREE_REWARD_NGN,
    design,
  };
}

// Same brand palette as the certificate (the marketing site's, not the app's blue).
const INK = "#10151F";
const SIGNAL = "#E07B2E";
const SIGNAL_DEEP = "#C96A26";
const CHARCOAL_SOFT = "#6B6252";
const PAPER = "#F7F4EC";
const RULE = "#D9D2C2";
const ON_INK_SOFT = "#C9C3B6";

// pdfkit's built-in Helvetica/Times have no ₦ glyph, so these static Source Sans 3 /
// Source Serif 4 files (the marketing site's typefaces, SIL OFL) are embedded instead.
// They sit under src/marketing so the build's existing copy step ships them to dist.
const FONT_DIR = path.join(__dirname, "..", "marketing", "fonts", "pdf");
const SANS = "PaleonSans";
const SANS_BOLD = "PaleonSansBold";
const SERIF_BOLD = "PaleonSerifBold";

const WHATSAPP = "+234 707 714 9989";

function newDoc(options: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument {
  const doc = new PDFDocument({ margin: 0, ...options, info: { Title: "Paleon Training referral", Author: "Paleon Training" } });
  doc.registerFont(SANS, path.join(FONT_DIR, "SourceSans3-Regular.ttf"));
  doc.registerFont(SANS_BOLD, path.join(FONT_DIR, "SourceSans3-Bold.ttf"));
  doc.registerFont(SERIF_BOLD, path.join(FONT_DIR, "SourceSerif4-Bold.ttf"));
  return doc;
}

function naira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

// Drawn as vector squares rather than an embedded PNG so it stays sharp at any print size.
// Includes the standard 4-module quiet zone on a white tile, which scanners need even when
// the flyer is printed on a coloured background.
function drawQr(doc: PDFKit.PDFDocument, text: string, x: number, y: number, size: number): void {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const count = qr.modules.size;
  const quiet = 4;
  const cell = size / (count + quiet * 2);
  doc.rect(x, y, size, size).fill("#FFFFFF");
  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (qr.modules.get(row, col)) {
        // A hair of overlap stops viewers rendering faint seams between adjacent modules.
        doc.rect(x + (col + quiet) * cell, y + (row + quiet) * cell, cell + 0.15, cell + 0.15);
      }
    }
  }
  doc.fill(INK);
}

// The largest font size (down to `min`) at which the code fits in `width`, so a long code
// shrinks instead of running into the QR code beside it.
function fitCodeSize(
  doc: PDFKit.PDFDocument,
  code: string,
  width: number,
  max: number,
  min: number,
  characterSpacing: number,
): number {
  doc.font(SERIF_BOLD);
  let size = max;
  while (size > min && doc.fontSize(size).widthOfString(code, { characterSpacing }) > width) size -= 0.5;
  return size;
}

function wordmark(doc: PDFKit.PDFDocument, x: number, y: number, size: number, color: string): void {
  doc.rect(x, y + size * 0.18, size * 0.62, size * 0.62).fill(SIGNAL);
  doc
    .fillColor(color)
    .font(SERIF_BOLD)
    .fontSize(size)
    .text("Paleon Training", x + size * 0.95, y, { lineBreak: false });
}

// Draws one A4-portrait flyer (595 x 842pt) at the current origin. The A5 handbill
// reuses it under a scale transform, so all coordinates here are in A4 units.
function drawFlyer(doc: PDFKit.PDFDocument, data: PrintData): void {
  const W = 595.28;
  const H = 841.89;
  const M = 44;
  const inner = W - M * 2;
  const copy = DESIGNS[data.design];

  doc.rect(0, 0, W, H).fill(PAPER);

  // --- Header band -------------------------------------------------------------------
  doc.font(SERIF_BOLD).fontSize(copy.headline.length > 30 ? 34 : 40);
  const headlineHeight = doc.heightOfString(copy.headline, { width: inner, lineGap: 2 });
  doc.font(SANS).fontSize(14);
  const subHeight = doc.heightOfString(copy.sub, { width: inner - 40, lineGap: 3 });
  const bandHeight = 130 + headlineHeight + 14 + subHeight + 40;

  doc.rect(0, 0, W, bandHeight).fill(INK);
  doc.rect(0, bandHeight, W, 6).fill(SIGNAL);
  wordmark(doc, M, 40, 20, "#FFFFFF");

  doc
    .fillColor(SIGNAL)
    .font(SANS_BOLD)
    .fontSize(11.5)
    .text(copy.eyebrow, M, 100, { characterSpacing: 2.2, lineBreak: false });
  doc
    .fillColor("#FFFFFF")
    .font(SERIF_BOLD)
    .fontSize(copy.headline.length > 30 ? 34 : 40)
    .text(copy.headline, M, 122, { width: inner, lineGap: 2 });
  doc
    .fillColor(ON_INK_SOFT)
    .font(SANS)
    .fontSize(14)
    .text(copy.sub, M, 122 + headlineHeight + 14, { width: inner - 40, lineGap: 3 });

  // The code + QR panel and the free-lesson strip are anchored to the bottom so the most
  // important part (the code) always sits in the same place; the bullets fill the space
  // between the header band and the strip.
  const footerTop = H - 64;
  const panelHeight = 196;
  const panelTop = footerTop - 18 - panelHeight;
  const stripHeight = 46;
  const stripTop = panelTop - 16 - stripHeight;

  // --- Bullets -----------------------------------------------------------------------
  let y = bandHeight + 32;
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS_BOLD)
    .fontSize(10.5)
    .text(data.design === "general" ? "CHOOSE YOUR COURSE" : "WHAT YOU GET", M, y, { characterSpacing: 1.8 });
  y += 22;
  const bulletStep = Math.min(26, (stripTop - 12 - y) / copy.bullets.length);
  for (const bullet of copy.bullets) {
    doc.rect(M, y + 6, 7, 7).fill(SIGNAL_DEEP);
    doc.fillColor(INK).font(SANS_BOLD).fontSize(15).text(bullet, M + 20, y, { width: inner - 20, lineBreak: false });
    y += bulletStep;
  }

  // --- Free lesson strip -------------------------------------------------------------
  doc.roundedRect(M, stripTop, inner, stripHeight, 6).fill(SIGNAL_DEEP);
  doc
    .fillColor("#FFFFFF")
    .font(SANS_BOLD)
    .fontSize(15)
    .text("Try the first lesson free, no payment needed", M + 18, stripTop + 7, { width: inner - 36, lineBreak: false });
  doc
    .fillColor("#FFF1E4")
    .font(SANS)
    .fontSize(11)
    .text(`${data.host}${copy.previewPath}`, M + 18, stripTop + 26, { width: inner - 36, lineBreak: false });

  // --- Code + QR panel -----------------------------------------------------------------
  doc.roundedRect(M, panelTop, inner, panelHeight, 8).fill("#FFFFFF");
  doc.lineWidth(1.5).strokeColor(INK).roundedRect(M, panelTop, inner, panelHeight, 8).stroke();

  const qrSize = 152;
  const qrX = M + inner - qrSize - 22;
  const qrY = panelTop + 16;
  drawQr(doc, data.shareUrl, qrX, qrY, qrSize);
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS)
    .fontSize(9.5)
    .text("Scan to sign up. My code is added for you.", qrX - 10, qrY + qrSize + 6, {
      width: qrSize + 20,
      align: "center",
    });

  const textX = M + 24;
  const textW = qrX - textX - 20;
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS_BOLD)
    .fontSize(10.5)
    .text("SIGN UP WITH MY CODE", textX, panelTop + 22, { characterSpacing: 1.8 });
  const codeSize = fitCodeSize(doc, data.code, textW, 40, 24, 2);
  doc
    .fillColor(SIGNAL_DEEP)
    .font(SERIF_BOLD)
    .fontSize(codeSize)
    .text(data.code, textX, panelTop + 38 + (40 - codeSize) * 0.6, { characterSpacing: 2, lineBreak: false });
  doc
    .fillColor(INK)
    .font(SANS_BOLD)
    .fontSize(14)
    .text(`Get ${naira(data.welcomeBonusNgn)} airtime`, textX, panelTop + 98, { width: textW });
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS)
    .fontSize(11)
    .text("after your first course payment is confirmed.", textX, panelTop + 116, { width: textW });
  doc
    .fillColor(INK)
    .font(SANS)
    .fontSize(11)
    .text("No QR scanner? Go to", textX, panelTop + 146, { width: textW });
  doc
    .fillColor(INK)
    .font(SANS_BOLD)
    .fontSize(12.5)
    .text(`${data.host}/register`, textX, panelTop + 161, { width: textW });

  // --- Footer --------------------------------------------------------------------------
  doc.lineWidth(0.75).strokeColor(RULE).moveTo(M, footerTop).lineTo(W - M, footerTop).stroke();
  const recommended = data.firstName
    ? `Recommended by ${data.firstName}, Paleon Student Ambassador`
    : "Shared by a Paleon Student Ambassador";
  doc
    .fillColor(INK)
    .font(SANS_BOLD)
    .fontSize(10.5)
    .text(recommended, M, footerTop + 14, { width: inner * 0.58, lineBreak: false, ellipsis: true });
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS)
    .fontSize(10.5)
    .text(`Questions? WhatsApp ${WHATSAPP}`, M, footerTop + 14, { width: inner, align: "right" });
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS)
    .fontSize(9)
    .text(
      `Paleon Training Limited · ${data.host} · Skills training does not guarantee a job.`,
      M,
      footerTop + 32,
      { width: inner, align: "center" },
    );
}

function streamFlyerA4(data: PrintData, destination: NodeJS.WritableStream): void {
  const doc = newDoc({ size: "A4" });
  doc.pipe(destination);
  drawFlyer(doc, data);
  doc.end();
}

// Two A5 handbills side by side on an A4 landscape sheet: A5 is A4 scaled by 1/sqrt(2),
// so the same layout fits exactly. One cut down the dashed line gives two handbills.
function streamFlyerA5(data: PrintData, destination: NodeJS.WritableStream): void {
  const doc = newDoc({ size: "A4", layout: "landscape" });
  doc.pipe(destination);
  const scale = 1 / Math.SQRT2;
  const halfWidth = doc.page.width / 2;
  // pdfkit decides when text "overflows" onto a new page using the unscaled page height,
  // so under the scale transform anything drawn below y≈595 (in A4 units) would be pushed
  // onto extra pages. Every position here is absolute, so auto-paging is never wanted.
  (doc.page as unknown as { maxY: () => number }).maxY = () => Number.MAX_SAFE_INTEGER;
  for (const x of [0, halfWidth]) {
    doc.save();
    doc.translate(x, 0).scale(scale);
    drawFlyer(doc, data);
    doc.restore();
  }
  doc
    .save()
    .lineWidth(0.6)
    .dash(4, { space: 4 })
    .strokeColor("#9A9384")
    .moveTo(halfWidth, 0)
    .lineTo(halfWidth, doc.page.height)
    .stroke()
    .restore();
  doc.end();
}

const MM = 72 / 25.4;
const CARD_W = 85 * MM;
const CARD_H = 55 * MM;

function drawCard(doc: PDFKit.PDFDocument, data: PrintData, x: number, y: number): void {
  const copy = DESIGNS[data.design];
  const pad = 11;

  doc.rect(x, y, CARD_W, CARD_H).fill("#FFFFFF");
  doc.rect(x, y, 5, CARD_H).fill(SIGNAL);

  const qrSize = 74;
  const qrX = x + CARD_W - qrSize - 8;
  const qrY = y + 22;
  drawQr(doc, data.shareUrl, qrX, qrY, qrSize);
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS)
    .fontSize(6.5)
    .text("Scan to sign up", qrX, qrY + qrSize + 1, { width: qrSize, align: "center" });

  const tx = x + pad + 3;
  const tw = qrX - tx - 6;
  wordmark(doc, tx, y + 9, 9, INK);
  doc
    .fillColor(INK)
    .font(SANS_BOLD)
    .fontSize(11)
    .text(copy.cardHeadline, tx, y + 26, { width: tw, lineGap: 0 });
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS_BOLD)
    .fontSize(6.5)
    .text("SIGN UP WITH MY CODE", tx, y + 66, { characterSpacing: 1 });
  const codeSize = fitCodeSize(doc, data.code, tw - 8, 17, 11, 1);
  doc
    .fillColor(SIGNAL_DEEP)
    .font(SERIF_BOLD)
    .fontSize(codeSize)
    .text(data.code, tx, y + 75 + (17 - codeSize) * 0.6, { characterSpacing: 1, lineBreak: false });
  doc
    .fillColor(INK)
    .font(SANS)
    .fontSize(7)
    .text(`${naira(data.welcomeBonusNgn)} airtime after your first course payment`, tx, y + 100, { width: tw });
  doc
    .fillColor(INK)
    .font(SANS_BOLD)
    .fontSize(7.5)
    .text(`${data.host}/register`, tx, y + CARD_H - 30, { width: tw, lineBreak: false });
  doc
    .fillColor(CHARCOAL_SOFT)
    .font(SANS)
    .fontSize(6.5)
    .text(
      data.firstName ? `From ${data.firstName} · First lesson free` : "First lesson free",
      tx,
      y + CARD_H - 19,
      { width: CARD_W - pad * 2, lineBreak: false, ellipsis: true },
    );
}

// Ten standard 85x55mm business cards (2 x 5) on A4, with a hairline border on each card
// for scissors and crop marks in the margin for a guillotine.
function streamCards(data: PrintData, destination: NodeJS.WritableStream): void {
  const doc = newDoc({ size: "A4" });
  doc.pipe(destination);
  const { width, height } = doc.page;
  const cols = 2;
  const rows = 5;
  const left = (width - cols * CARD_W) / 2;
  const top = (height - rows * CARD_H) / 2;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = left + c * CARD_W;
      const y = top + r * CARD_H;
      drawCard(doc, data, x, y);
      doc.lineWidth(0.4).strokeColor(RULE).rect(x, y, CARD_W, CARD_H).stroke();
    }
  }

  doc.lineWidth(0.5).strokeColor("#000000");
  const mark = 12;
  const gap = 4;
  for (let c = 0; c <= cols; c += 1) {
    const x = left + c * CARD_W;
    doc.moveTo(x, top - gap - mark).lineTo(x, top - gap).stroke();
    doc.moveTo(x, top + rows * CARD_H + gap).lineTo(x, top + rows * CARD_H + gap + mark).stroke();
  }
  for (let r = 0; r <= rows; r += 1) {
    const y = top + r * CARD_H;
    doc.moveTo(left - gap - mark, y).lineTo(left - gap, y).stroke();
    doc.moveTo(left + cols * CARD_W + gap, y).lineTo(left + cols * CARD_W + gap + mark, y).stroke();
  }
  doc.end();
}

export function streamPrintPdf(kind: PrintKind, data: PrintData, destination: NodeJS.WritableStream): void {
  if (kind === "flyer-a4") streamFlyerA4(data, destination);
  else if (kind === "flyer-a5") streamFlyerA5(data, destination);
  else streamCards(data, destination);
}

export function printFilename(kind: PrintKind, data: PrintData): string {
  const label = kind === "cards" ? "pocket-cards" : kind === "flyer-a5" ? "a5-handbills" : "a4-poster";
  return `paleon-${data.design}-${label}-${data.code}.pdf`;
}
