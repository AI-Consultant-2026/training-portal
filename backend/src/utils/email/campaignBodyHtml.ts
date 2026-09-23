import { escapeHtml } from "../../emails/htmlWrapper";

// Admin Email Client bodies are either formatted HTML from the Compose step's rich-text
// editor, or plain text (every campaign saved before the editor existed). These helpers
// turn either into the HTML + plain-text parts that are actually sent.

// True when the template contains real markup rather than plain text with line breaks.
export function looksLikeHtml(value: string): boolean {
  return /<\/?(p|div|br|ul|ol|li|h[1-6]|strong|em|b|i|u|a|blockquote)\b/i.test(value);
}

const ALLOWED_TAGS = new Set(["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "a", "h2", "h3", "blockquote"]);
const DROP_WITH_CONTENT = /<(script|style|head|title|iframe|object|svg|xml)\b[\s\S]*?<\/\1\s*>/gi;
const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)\b([^>]*)>/g;

function safeHref(attrs: string): string | null {
  const m = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
  const raw = (m?.[2] ?? m?.[3] ?? m?.[4] ?? "").trim();
  // Undo the few entities a browser writes into an href before checking the scheme.
  const href = raw.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return /^(https?:|mailto:|tel:)/i.test(href) ? href : null;
}

// Server-side allowlist, independent of what the browser sent: every tag is either
// rebuilt from the allowlist with no attributes (bar a checked link href) or dropped,
// comments and script/style blocks are removed, and any "<" left over in text is escaped.
// Nothing an admin (or a tampered request) submits can reach recipients as live markup
// beyond basic formatting.
export function sanitizeCampaignHtml(html: string): string {
  const withoutBlocks = html.replace(/<!--[\s\S]*?-->/g, "").replace(DROP_WITH_CONTENT, "");
  let out = "";
  let last = 0;
  for (const m of withoutBlocks.matchAll(TAG_RE)) {
    out += withoutBlocks.slice(last, m.index).replace(/</g, "&lt;");
    last = (m.index ?? 0) + m[0].length;
    const closing = m[1] === "/";
    let tag = m[2].toLowerCase();
    if (tag === "div") tag = "p";
    if (tag === "h1") tag = "h2";
    if (tag === "h4" || tag === "h5" || tag === "h6") tag = "h3";
    if (!ALLOWED_TAGS.has(tag)) continue;
    if (tag === "br") {
      if (!closing) out += "<br>";
      continue;
    }
    if (closing) {
      out += `</${tag}>`;
    } else if (tag === "a") {
      const href = safeHref(m[3]);
      out += href ? `<a href="${escapeHtml(href).replace(/"/g, "&quot;")}">` : "<a>";
    } else {
      out += `<${tag}>`;
    }
  }
  out += withoutBlocks.slice(last).replace(/</g, "&lt;");
  return out;
}

const INLINE_STYLES: Record<string, string> = {
  p: "margin: 0 0 16px;",
  ul: "margin: 0 0 16px; padding-left: 24px;",
  ol: "margin: 0 0 16px; padding-left: 24px;",
  h2: "margin: 0 0 12px; font-size: 20px; font-weight: 600;",
  h3: "margin: 0 0 12px; font-size: 17px; font-weight: 600;",
  blockquote: "margin: 0 0 16px; padding-left: 12px; border-left: 3px solid #d1d5db;",
  a: "color: #1d4ed8;",
};

// Most email clients ignore <style> blocks, so spacing goes inline on each element.
export function inlineEmailStyles(html: string): string {
  return html.replace(/<(p|ul|ol|h2|h3|blockquote|a)(\s[^>]*)?>/g, (_m, tag: string, attrs = "") =>
    `<${tag}${attrs} style="${INLINE_STYLES[tag]}">`,
  );
}

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

// Plain-text part for clients that don't show HTML (and for the in-app preview's text).
export function htmlToPlainText(html: string): string {
  let listIndex: number[] = [];
  const text = html
    .replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href: string, label: string) => {
      const plainLabel = label.replace(/<[^>]+>/g, "").trim();
      const url = decodeEntities(href);
      return url && url !== decodeEntities(plainLabel) && !url.startsWith("mailto:") ? `${plainLabel} (${url})` : plainLabel;
    })
    // One pass over list tags, in document order, so each <li> knows whether it sits
    // in a bulleted or numbered list (0 = bullets, n = next number).
    .replace(/<(\/?)(ul|ol|li)\b[^>]*>/gi, (_m, closing: string, tag: string) => {
      const t = tag.toLowerCase();
      if (t === "li") {
        if (closing) return "";
        const depth = listIndex.length - 1;
        const n = listIndex[depth];
        if (n) {
          listIndex[depth] = n + 1;
          return `\n${n}. `;
        }
        return "\n- ";
      }
      if (closing) listIndex = listIndex.slice(0, -1);
      else listIndex.push(t === "ol" ? 1 : 0);
      return "\n\n";
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h2|h3|blockquote|div)>/gi, "\n\n")
    .replace(/<[^>]+>/g, "");
  return decodeEntities(text)
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
