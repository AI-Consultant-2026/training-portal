import type { ReturnStatus } from "../services/corporateOrder.service";
import { escapeHtml } from "./countryHome";

// /corporate-checkout/complete (2026-11-12): where Flutterwave sends a company after the
// corporate seat checkout. The order has already been checked with Flutterwave by the
// time this renders; the staff link itself is only ever sent by email.

const COPY: Record<ReturnStatus, { title: string; body: (email: string, org: string) => string }> = {
  paid: {
    title: "Payment received. Thank you.",
    body: (email, org) =>
      `<p>${org ? `Staff training for <strong>${org}</strong> is ready.` : "Your staff training is ready."} We have emailed the staff sign-up link${email ? ` to <strong>${email}</strong>` : ""}.</p>
      <p><strong>Next:</strong> create your own login with that link first, using the same email address. That makes you your organisation&rsquo;s training manager. Then share the link with your staff.</p>
      <p>No email within 10 minutes? Check your spam folder, or write to <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a>.</p>`,
  },
  processing: {
    title: "We are confirming your payment",
    body: (email) =>
      `<p>Flutterwave is still confirming the payment. This usually takes a minute or two. As soon as it is confirmed we email the staff sign-up link${email ? ` to <strong>${email}</strong>` : ""}.</p>
      <p>Paid by bank transfer? It is confirmed when the transfer arrives. Questions: <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a>.</p>`,
  },
  cancelled: {
    title: "Payment cancelled",
    body: () =>
      `<p>You have not been charged. You can go back and try again, or ask for an invoice instead.</p>`,
  },
  failed: {
    title: "The payment didn't go through",
    body: () =>
      `<p>You have not been charged. Please try again with another card or payment method, or ask for an invoice instead.</p>`,
  },
  unknown: {
    title: "We couldn't find this order",
    body: () =>
      `<p>If you have paid, email <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a> with your organisation&rsquo;s name and we will sort it out straight away.</p>`,
  },
};

export function renderCorporateCheckoutComplete(result: { status: ReturnStatus; email?: string; organisation?: string }): string {
  const copy = COPY[result.status];
  const back = result.status === "cancelled" || result.status === "failed";
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(copy.title)} | Paleon Training</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/country-home.css">
<link rel="stylesheet" href="/corporate-ai.css">
</head>
<body>
<main id="main" class="section section-paper ca-section">
  <div class="wrap ca-narrow cp-return">
    <p><a href="/"><strong>Paleon Training</strong></a></p>
    <h1 class="section-title">${escapeHtml(copy.title)}</h1>
    ${copy.body(escapeHtml(result.email ?? ""), escapeHtml(result.organisation ?? ""))}
    <p><a class="btn btn-signal btn-lg" href="${back ? "/#pricing" : "/"}">${back ? "Back to prices" : "Back to Paleon Training"}</a></p>
  </div>
</main>
</body>
</html>
`;
}
