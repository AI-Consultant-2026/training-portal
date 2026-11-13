import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";
import { corporateJoinUrl } from "./corporate";

// Corporate online orders (2026-11-12): the buyer's receipt with their staff join link,
// the buyer's acknowledgement of an invoice request, and the notice to corporate@ for both.

export interface OrderSummary {
  txRef: string;
  organisation: string;
  contactName: string;
  contactEmail: string;
  phone: string | null;
  buyerCountry: string | null;
  programmeName: string;
  courseTitles: string[];
  seats: number;
  unitPrice: string;
  total: string;
  discountPercent: number;
}

function orderLines(o: OrderSummary): string[] {
  return [
    `Programme: ${o.programmeName}`,
    `Learners: ${o.seats} at ${o.unitPrice} each${o.discountPercent ? ` (${o.discountPercent}% off)` : ""}`,
    `Total: ${o.total} (order ${o.txRef})`,
  ];
}

export function buildCorporateOrderPaidEmail(o: OrderSummary & { joinCode: string; signUpsCloseOn: string }): EmailMessage {
  const firstName = o.contactName.split(/\s+/)[0] || "there";
  const url = corporateJoinUrl(o.joinCode);
  const lines = [
    `Hi ${firstName},`,
    `Thank you. Your payment for ${o.organisation} has been received and your staff training is ready.`,
    ...orderLines(o),
    "Step 1. Create your own login first with this link, using this email address (" +
      o.contactEmail +
      "). That makes you your organisation's training manager:",
    url,
    "Step 2. Send the same link to your staff. They create a login with it and start straight away. As manager you can also invite staff by email, see who has started and track progress at " +
      `${config.corsOrigin}/company.`,
    `Each learner has 12 months' access. Staff can sign up until ${o.signUpsCloseOn}. Each learner who signs up uses one of your ${o.seats} places.`,
    "Keep the link within your organisation: anyone with it can take one of your places. Need a VAT invoice, more places or help? Reply to this email or write to corporate@paleontraining.com.",
  ];
  return {
    to: o.contactEmail,
    subject: `${o.organisation}: your Paleon Training staff link`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}

export function buildCorporateInvoiceRequestEmail(o: OrderSummary): EmailMessage {
  const firstName = o.contactName.split(/\s+/)[0] || "there";
  const lines = [
    `Hi ${firstName},`,
    `Thank you for your order for ${o.organisation}. We have your request for an invoice:`,
    ...orderLines(o),
    "Our corporate team will send the invoice, with bank transfer details, within one working day. As soon as it is paid we set up your staff training and send you the link your staff use to sign up.",
    "Questions? Reply to this email or write to corporate@paleontraining.com.",
  ];
  return {
    to: o.contactEmail,
    subject: `${o.organisation}: your Paleon Training invoice request`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}

export function buildCorporateOrderAdminEmail(
  o: OrderSummary & { kind: "paid" | "invoice"; joinCode?: string; reason?: string },
): EmailMessage {
  const lines = [
    o.kind === "paid"
      ? `PAID: ${o.organisation} bought ${o.seats} learner places. The company, its seats and its join link were set up automatically.`
      : `INVOICE REQUEST: ${o.organisation} wants an invoice for ${o.seats} learner places${o.reason ? ` (${o.reason})` : ""}. Send the invoice within one working day; once paid, create the company in /admin (Corporate clients).`,
    ...orderLines(o),
    `Courses: ${o.courseTitles.join("; ")}`,
    `Contact: ${o.contactName}, ${o.contactEmail}${o.phone ? `, ${o.phone}` : ""}`,
    ...(o.buyerCountry ? [`Based in: ${o.buyerCountry}`] : []),
    ...(o.joinCode ? [`Staff join link: ${corporateJoinUrl(o.joinCode)}`] : []),
  ];
  return {
    to: config.corporateEnquiriesEmail,
    subject: `${o.kind === "paid" ? "Corporate order PAID" : "Corporate invoice request"}: ${o.organisation} (${o.seats} learners, ${o.total})`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}

// Free leadership preview (2026-11-13): the links to the sample modules, so the leadership
// team can come back to them and share them internally.
const PREVIEW_NAMES: Record<string, string> = {
  cybersecure: "CyberSecure Workforce",
  "ai-workflow": "AI Workflow Productivity & Process Transformation",
  accelerator: "AI + Cybersecurity Professional Accelerator",
};

export function buildCorporatePreviewEmail(o: {
  to: string;
  name: string;
  organisation: string;
  links: { programme: string; url: string }[];
}): EmailMessage {
  const firstName = o.name.split(/\s+/)[0] || "there";
  const lines = [
    `Hi ${firstName},`,
    `Here is your free leadership preview for ${o.organisation}: module 1 of each programme, self-paced online. Share these links with your leadership team.`,
    ...o.links.map((l) => `${PREVIEW_NAMES[l.programme] ?? l.programme}: ${l.url}`),
    "When you have looked through it, reply and tell us what your team thought, or what you would want covered for your staff. We will reply within one working day.",
    "Ken Uwotu, Managing Director, Paleon Training. corporate@paleontraining.com",
  ];
  return {
    to: o.to,
    replyTo: config.corporateEnquiriesEmail,
    subject: `${o.organisation}: your free leadership preview`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
