function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const BARE_URL_REGEX = /^https?:\/\/\S+$/;

// Verification/reset links are one long unbroken JWT-bearing string (100+ chars) --
// without an explicit break rule, several email clients (notably ones that don't
// auto-wrap long tokens) let it overflow the fixed-width container instead of wrapping,
// pushing it off the visible page. word-break/overflow-wrap together cover the client
// quirks either property alone tends to miss.
const LONG_URL_STYLE = "word-break: break-all; overflow-wrap: break-word;";

function renderLine(line: string): string {
  if (BARE_URL_REGEX.test(line)) {
    const escaped = escapeHtml(line);
    return `<p style="margin: 0 0 16px; ${LONG_URL_STYLE}"><a href="${escaped}" style="color: #2563eb; ${LONG_URL_STYLE}">${escaped}</a></p>`;
  }
  return `<p style="margin: 0 0 16px;">${escapeHtml(line)}</p>`;
}

export function wrapHtml(bodyLines: string[]): string {
  const paragraphs = bodyLines.map(renderLine).join("\n");

  return `<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; background: #f9fafb; padding: 24px;">
  <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
    <p style="margin: 0 0 16px; font-weight: 600; color: #111827;">Training Portal</p>
    ${paragraphs}
  </div>
</div>`;
}
