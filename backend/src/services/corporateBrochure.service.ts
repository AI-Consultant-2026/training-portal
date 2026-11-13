import path from "path";
import PDFDocument from "pdfkit";
import { COUNTRIES, CountryCode, formatMoney } from "../constants/countries";
import { CORPORATE_PRICES, PROGRAMME_NAMES, PricedProgramme, VOLUME_TIERS, seatPrice } from "../constants/corporatePricing";
import { CORPORATE_AI_CONTENT } from "../views/corporateAiWorkflowContent";
import { ACCELERATOR_CONTENT } from "../views/corporateAcceleratorContent";
import { CYBERSECURE_CONTENT } from "../views/corporateCyberSecureContent";
import { DATA_PROTECTION_LAW } from "../views/corporateLocal";
import {
  BUYING_TERMS,
  COHORT_NAME,
  COHORT_PLACES,
  EXAMPLE_STAFF,
  OUTCOME_LEAD,
  PILOT_STAFF,
  exampleTotal,
  outcomes,
  pilotTotal,
  programmePagePath,
} from "../views/corporateOffers";

// The PDFs a corporate buyer can forward for sign-off (2026-11-13, owner's conversion
// review point 6), generated on request from the same price table and copy as the pages,
// so they never go out of date:
//   /corporate-training/brochures/<programme>-<cc>.pdf     two-page programme brochure
//   /corporate-training/business-case/<programme>-<cc>.pdf one-page business case
// No statistics are invented: outcomes are the pages' outcomes, and the law is named, not
// interpreted. Fonts as in referralPrint.service.ts (pdfkit's built-ins have no ₦).

const FONT_DIR = path.join(__dirname, "..", "marketing", "fonts", "pdf");
const SANS = "PaleonSans";
const SANS_BOLD = "PaleonSansBold";
const SERIF_BOLD = "PaleonSerifBold";
const INK = "#10151F";
const MUTED = "#4A5263";
const SIGNAL = "#E8863C";
const PAPER = "#F7F4EC";
const ORIGIN = "https://paleontraining.com";
const CONTACT = "corporate@paleontraining.com  ·  WhatsApp +44 7508 823495  ·  paleontraining.com";

const A4 = { w: 595.28, h: 841.89 };
const M = 48;
const W = A4.w - M * 2;

const AUDIENCE: Record<PricedProgramme, string> = {
  cybersecure: "Every employee, from the front desk to the boardroom. Written for non-technical staff.",
  "ai-workflow": "Every department that writes, analyses or reports: HR, finance, operations, sales, customer service, leadership and more.",
  accelerator: "Selected IT, security, risk, data and digital professionals who will lead secure AI adoption.",
};

const NEED: Record<PricedProgramme, string> = {
  cybersecure:
    "Most attacks on organisations start with a person, not a system: a fake invoice, a message that seems to come from a director, a login page that looks real. Technology alone cannot stop them. Staff who can recognise, stop and report these attempts are the most practical control we can add, and training records are evidence for audits and data-protection obligations.",
  "ai-workflow":
    "Staff are already using AI tools, often without guidance on which tools are approved or what data must stay out of them. Used well, AI cuts the time spent on reports, emails, minutes and summaries; used badly, it leaks confidential data and produces errors. Structured training turns ad-hoc use into safe, measurable productivity.",
  accelerator:
    "As AI use grows, we need people inside the organisation who understand both AI and cyber risk: who can assess AI tools, recognise AI-enabled threats such as deepfake payment requests, and draft the policies and controls the board will ask for. Developing them internally is faster and cheaper than relying only on outside advice.",
};

const MEASURES: Record<PricedProgramme, string[]> = {
  cybersecure: [
    "Completion and assessment scores for every learner",
    "Number of suspicious emails and messages reported by staff",
    "Payment requests verified by call-back before payment",
  ],
  "ai-workflow": [
    "Completion and assessment scores for every learner",
    "Time spent on three named tasks, before and after",
    "AI use policy agreed and acknowledged by staff",
  ],
  accelerator: [
    "Completion and assessment scores for every participant",
    "Capstone deliverable presented to management",
    "AI risk register and policy drafts ready for approval",
  ],
};

function newDoc(title: string): PDFKit.PDFDocument {
  const doc = new PDFDocument({ size: "A4", margin: 0, info: { Title: title, Author: "Paleon Training Limited" } });
  doc.registerFont(SANS, path.join(FONT_DIR, "SourceSans3-Regular.ttf"));
  doc.registerFont(SANS_BOLD, path.join(FONT_DIR, "SourceSans3-Bold.ttf"));
  doc.registerFont(SERIF_BOLD, path.join(FONT_DIR, "SourceSerif4-Bold.ttf"));
  return doc;
}

function moduleTitles(programme: PricedProgramme, code: CountryCode): string[] {
  const content =
    programme === "cybersecure" ? CYBERSECURE_CONTENT[code] : programme === "ai-workflow" ? CORPORATE_AI_CONTENT[code] : ACCELERATOR_CONTENT[code];
  const section = content.sections["Course structure"] ?? content.sections["Programme structure"];
  const out: string[] = [];
  for (const block of section?.blocks ?? []) {
    if (!("ul" in block)) continue;
    for (const item of block.ul) {
      const m = /^\*\*(.+?)\.?\*\*/.exec(item);
      if (m) out.push(m[1].replace(/\.$/, ""));
    }
  }
  return out;
}

function band(doc: PDFKit.PDFDocument, kicker: string): void {
  doc.rect(0, 0, A4.w, 64).fill(INK);
  doc.rect(0, 64, A4.w, 4).fill(SIGNAL);
  doc.fillColor(PAPER).font(SERIF_BOLD).fontSize(17).text("Paleon Training", M, 22, { lineBreak: false });
  doc.font(SANS).fontSize(10).fillColor("#C9CEDA").text(kicker, M, 27, { width: W, align: "right" });
}

function footerLine(doc: PDFKit.PDFDocument, note: string): void {
  doc.moveTo(M, A4.h - 58).lineTo(A4.w - M, A4.h - 58).lineWidth(0.5).strokeColor("#D5D1C6").stroke();
  doc.font(SANS_BOLD).fontSize(9).fillColor(INK).text(CONTACT, M, A4.h - 50, { width: W, lineBreak: false });
  doc.font(SANS).fontSize(7.5).fillColor(MUTED).text(note, M, A4.h - 36, { width: W });
}

function heading(doc: PDFKit.PDFDocument, text: string): void {
  doc.moveDown(0.6);
  doc.font(SANS_BOLD).fontSize(9).fillColor(SIGNAL).text(text.toUpperCase(), M, doc.y, { width: W, characterSpacing: 0.8 });
  doc.moveDown(0.25);
}

function para(doc: PDFKit.PDFDocument, text: string, size = 10.5): void {
  doc.font(SANS).fontSize(size).fillColor(INK).text(text, M, doc.y, { width: W, lineGap: 2 });
}

function bullets(doc: PDFKit.PDFDocument, items: string[], size = 10.5): void {
  for (const item of items) {
    const y = doc.y;
    doc.circle(M + 3, y + size * 0.55, 1.8).fill(SIGNAL);
    doc.font(SANS).fontSize(size).fillColor(INK).text(item, M + 12, y, { width: W - 12, lineGap: 1.5 });
    doc.moveDown(0.15);
  }
}

function labelled(doc: PDFKit.PDFDocument, label: string, text: string, size = 10.5): void {
  doc.font(SANS_BOLD).fontSize(size).fillColor(INK).text(`${label} `, M, doc.y, { width: W, continued: true, lineGap: 2 });
  doc.font(SANS).text(text, { lineGap: 2 });
}

const money = (code: CountryCode, n: number) => formatMoney(code, n);
const today = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
// All three programmes are booked until December 2026 (owner, 2026-11-13).
const hasCohort = (p: PricedProgramme) => COHORT_PLACES[p] > 0;

export function streamBrochurePdf(programme: PricedProgramme, code: CountryCode, out: NodeJS.WritableStream): void {
  const name = PROGRAMME_NAMES[programme];
  const country = COUNTRIES[code].name;
  const doc = newDoc(`${name}: brochure for organisations in ${country}`);
  doc.pipe(out);
  const note = `Prices exclude VAT where applicable and are correct on ${today()}. Awareness training supports your compliance programme; it is not legal advice. Paleon Training Limited, Warri, Nigeria.`;

  // Page 1: outcomes first, then who it is for and the modules.
  band(doc, `Corporate training · ${country}`);
  doc.font(SERIF_BOLD).fontSize(24).fillColor(INK).text(name, M, 92, { width: W });
  doc.font(SANS).fontSize(12).fillColor(MUTED).text(`For organisations in ${country}`, M, doc.y + 2, { width: W });
  doc.moveDown(0.8);
  doc.font(SERIF_BOLD).fontSize(15).fillColor(INK).text(OUTCOME_LEAD[programme], M, doc.y, { width: W });
  doc.moveDown(0.3);
  for (const o of outcomes(programme, code)) {
    doc.font(SANS_BOLD).fontSize(11).fillColor(INK).text(o.h, M, doc.y, { width: W });
    doc.font(SANS).fontSize(10).fillColor(MUTED).text(o.p, M, doc.y, { width: W, lineGap: 1.5 });
    doc.moveDown(0.35);
  }
  heading(doc, "Who it is for");
  para(doc, AUDIENCE[programme]);
  heading(doc, "What participants learn");
  const modules = moduleTitles(programme, code);
  modules.forEach((m, i) => {
    doc.font(SANS_BOLD).fontSize(10).fillColor(SIGNAL).text(`${String(i + 1).padStart(2, "0")}  `, M, doc.y, { continued: true });
    doc.font(SANS).fillColor(INK).text(m, { lineGap: 1.5 });
  });
  footerLine(doc, note);

  // Page 2: two ways to buy, pilot, law, next steps.
  doc.addPage();
  band(doc, `${name} · ${country}`);
  doc.y = 92;
  doc.font(SERIF_BOLD).fontSize(18).fillColor(INK).text("Two ways to buy", M, doc.y, { width: W });
  heading(doc, "Option 1 · Self-paced online, fixed price");
  labelled(doc, `${money(code, CORPORATE_PRICES[programme][code])} per learner.`, "Each learner studies in the Paleon portal with 12 months' access, quizzes, a final assessment and completion records. Buy online and start today.");
  doc.moveDown(0.2);
  bullets(
    doc,
    VOLUME_TIERS.filter((t) => t.discount > 0).map(
      (t) => `${t.min}${t.max ? `–${t.max}` : "+"} learners: ${Math.round(t.discount * 100)}% off, ${money(code, seatPrice(programme, code, t.min))} per learner`,
    ),
    10,
  );
  labelled(
    doc,
    `Worked example, ${EXAMPLE_STAFF} staff:`,
    `${EXAMPLE_STAFF} × ${money(code, seatPrice(programme, code, EXAMPLE_STAFF))} = ${money(code, exampleTotal(programme, code))} (10% volume discount).`,
  );
  heading(doc, "Option 2 · In-house rollout, by proposal");
  para(
    doc,
    `A private online company space in the Paleon portal for your staff only, anywhere in ${country}. Staff join with your company sign-up link, managers see progress, and you receive completion and attendance records for your files. For departments or an organisation-wide rollout; invoiced for 200 learners or more. All training is online and self-paced: there are no live, facilitator-led or hybrid sessions.`,
  );
  if (hasCohort(programme)) {
    doc.moveDown(0.2);
    labelled(doc, `${COHORT_NAME} intake:`, `${COHORT_PLACES[programme]} places left. Reserve by email or WhatsApp. Places bought today start today.`);
  }
  heading(doc, "Start small");
  labelled(doc, `Paid pilot:`, `${PILOT_STAFF} learners self-paced for ${money(code, pilotTotal(programme, code))}. Review the results with us, then decide on a wider rollout.`);
  doc.moveDown(0.15);
  labelled(doc, "Free leadership preview:", "self-paced online access to sample modules for your leadership team, with no obligation.");
  heading(doc, "Refunds, cancellations and unused seats");
  bullets(doc, BUYING_TERMS.map((x) => `${x.h}: ${x.p}`));
  heading(doc, "Data protection");
  para(
    doc,
    `The programme builds awareness of handling personal data responsibly, in line with your obligations under ${DATA_PROTECTION_LAW[code]}.`,
  );
  if (code === "NG") {
    doc.moveDown(0.2);
    para(
      doc,
      "ITF: Nigerian employers that pay the ITF training levy can use our attendance records and programme documentation to support a reimbursement claim; eligibility and the amount are decided by the ITF.",
    );
  }
  heading(doc, "Next steps");
  bullets(doc, [
    `Buy online or read more: ${ORIGIN}${programmePagePath(programme, code)}`,
    "Book a 20-minute call or request a proposal: corporate@paleontraining.com or WhatsApp +44 7508 823495",
    "We reply within one working day.",
  ]);
  footerLine(doc, note);
  doc.end();
}

export function streamBusinessCasePdf(programme: PricedProgramme, code: CountryCode, out: NodeJS.WritableStream): void {
  const name = PROGRAMME_NAMES[programme];
  const country = COUNTRIES[code].name;
  const doc = newDoc(`Business case: ${name} (${country})`);
  doc.pipe(out);
  band(doc, "One-page business case");
  doc.font(SERIF_BOLD).fontSize(19).fillColor(INK).text(`Business case: ${name}`, M, 86, { width: W });
  doc.font(SANS).fontSize(10).fillColor(MUTED).text(`Prepared for: ____________________   Organisation in ${country}   Date: ${today()}`, M, doc.y + 2, { width: W });

  const size = 9.8;
  heading(doc, "1. The need");
  para(doc, NEED[programme], size);
  heading(doc, "2. The proposal and its cost");
  bullets(
    doc,
    [
      `Recommended: ${EXAMPLE_STAFF} staff, self-paced online, ${money(code, exampleTotal(programme, code))} in total (${money(code, seatPrice(programme, code, EXAMPLE_STAFF))} per learner after the 10% volume discount, 12 months' access).`,
      `Lower-risk start: a ${PILOT_STAFF}-learner pilot for ${money(code, pilotTotal(programme, code))}, then a decision on rollout.`,
      `Alternative: an in-house rollout for the whole organisation (a private online space for your staff), priced by proposal after a 20-minute call${hasCohort(programme) ? `; the ${COHORT_NAME} intake has ${COHORT_PLACES[programme]} places left` : ""}.`,
    ],
    size,
  );
  heading(doc, "3. Expected outcomes");
  bullets(doc, outcomes(programme, code).map((o) => `${o.h}: ${o.p}`), size);
  heading(doc, "4. How we will measure it");
  bullets(doc, MEASURES[programme], size);
  heading(doc, "5. Legal and regulatory context");
  para(
    doc,
    `Organisations in ${country} that handle personal data have obligations under ${DATA_PROTECTION_LAW[code]}, including keeping that data secure. Training staff to handle data responsibly is one practical organisational measure towards this, and completion records document it. This is awareness training, not legal advice.${
      code === "NG"
        ? " If we pay the ITF training levy, Paleon's attendance records and programme documentation can support a reimbursement claim; eligibility and the amount are decided by the ITF."
        : ""
    }`,
    size,
  );
  heading(doc, "6. Recommendation");
  para(
    doc,
    `Approve the pilot or the full group as set out in section 2, and nominate a contact to agree learners and measures with Paleon Training. Approved by: ____________________`,
    size,
  );
  footerLine(
    doc,
    `Figures from ${ORIGIN}${programmePagePath(programme, code)} on ${today()}; prices exclude VAT where applicable. Paleon Training Limited, Warri, Nigeria.`,
  );
  doc.end();
}
