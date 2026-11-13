import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import { PROGRAMME_NAMES, PricedProgramme } from "../constants/corporatePricing";
import { PREVIEW_PROGRAMMES, previewUrl, sampleModule } from "../services/corporatePreview.service";
import { renderMarkdownBlock } from "../services/previewPage.service";
import { ORIGIN, PageContext, escapeHtml } from "./countryHome";
import { PREVIEW_PATH, programmePagePath } from "./corporateOffers";
import { shell } from "./directorResources";

// Free leadership preview (owner, 2026-11-13), replacing "Request a free preview" on the
// general enquiry form:
//   /corporate-training/free-preview              one-step sign-up (name, work email,
//                                                 organisation, country, programme)
//   /corporate-training/free-preview/<programme>  module 1 of that programme; needs the signed
//                                                 ?t= link the sign-up returns and emails.

function ctxFor(country: CountryCode | null, chosen: CountryCode | null): PageContext {
  return country
    ? { country, hub: false, detected: null, chosen: country }
    : { country: chosen ?? "NG", hub: true, detected: null, chosen };
}

function ld(path: string, name: string, description: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${ORIGIN}${path}`,
    name,
    description,
    inLanguage: "en",
  };
}

export function renderPreviewSignup(country: CountryCode | null, programme: PricedProgramme | null, chosen: CountryCode | null): string {
  const ctx = ctxFor(country, chosen);
  const code = country ?? chosen;
  const title = "Free Leadership Preview: Sample Modules | Paleon Training";
  const description =
    "Free, self-paced sample modules of CyberSecure Workforce, AI Workflow Productivity and the AI + Cybersecurity Professional Accelerator. One short form and they open straight away.";
  const countryOptions =
    (code ? "" : '<option value="">Choose your country</option>') +
    MARKET_ORDER.map((k) => `<option value="${k}"${k === code ? " selected" : ""}>${escapeHtml(COUNTRIES[k].name)}</option>`).join("") +
    '<option value="XX">Other country</option>';
  const programmeOptions = PREVIEW_PROGRAMMES.map(
    (p) => `<option value="${p}"${p === (programme ?? "cybersecure") ? " selected" : ""}>${escapeHtml(PROGRAMME_NAMES[p])}</option>`,
  ).join("");
  const samples = PREVIEW_PROGRAMMES.map((p) => {
    const m = sampleModule(p);
    return `<li><strong>${escapeHtml(PROGRAMME_NAMES[p])}</strong>: Module 1, ${escapeHtml(m.title)} (${m.lessons.length} lessons, about ${m.lessons.reduce((t, l) => t + l.durationMinutes, 0)} minutes)</li>`;
  }).join("");
  const body = `<section class="section section-paper ca-section" aria-labelledby="pv-title">
    <div class="wrap ca-enquiry">
      <div class="ca-enquiry-copy">
        <span class="section-eyebrow">Free leadership preview</span>
        <h1 class="section-title" id="pv-title">See the training before you buy</h1>
        <p class="ca-p">Fill in one short form and the sample modules open straight away. We also email you the links, so your leadership team can look through them in their own time.</p>
        <ul class="ca-list">${samples}</ul>
        <p class="ca-p">Self-paced, online, no obligation. No card and no call needed.</p>
      </div>
      <form class="ca-form" id="pvForm" novalidate>
        <div class="ca-grid">
          <div class="form-row"><label class="form-label" for="pv-name">Name</label><input class="form-input" id="pv-name" name="name" autocomplete="name" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="pv-email">Work email</label><input class="form-input" id="pv-email" name="email" type="email" autocomplete="email" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="pv-org">Organisation</label><input class="form-input" id="pv-org" name="organisation" autocomplete="organization" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="pv-country">Country</label><select class="form-select" id="pv-country" name="country" required>${countryOptions}</select></div>
          <div class="form-row"><label class="form-label" for="pv-programme">Start with</label><select class="form-select" id="pv-programme" name="programme">${programmeOptions}</select></div>
        </div>
        <div class="ca-hp" aria-hidden="true"><label for="pv-website">Website</label><input id="pv-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="consent-check"><input type="checkbox" name="consent" required> <span>I agree that Paleon Training may use these details to send my preview and follow up about it, as described in the <a href="/privacy">Privacy Policy</a>.</span></label>
        <label class="consent-check"><input type="checkbox" name="updates"> <span>Send me occasional updates about training for organisations <span class="optional">(optional)</span></span></label>
        <p class="form-error" id="pvError" role="alert" hidden></p>
        <button type="submit" class="btn btn-signal btn-lg btn-block" id="pvSubmit">Open the free preview</button>
      </form>
    </div>
  </section>`;
  return shell(ctx, {
    title,
    description,
    path: PREVIEW_PATH,
    jsonLd: ld(PREVIEW_PATH, "Free leadership preview", description),
    body,
    extraScript: '<script src="/corporate-preview.js" defer></script>',
  });
}

// Lesson text: the shared preview renderer plus what corporate lessons also use: tables,
// rules, "Show answer" details, and the "Video coming soon" notes (dropped here).
function renderLesson(content: string): string {
  return content
    .split(/\n\s*\n/)
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (t === "---") return "<hr>";
      if (t === "<details><summary>Show answer</summary>") return "<details><summary>Show answer</summary>";
      if (t === "</details>") return "</details>";
      if (t.startsWith(">")) {
        if (/Video coming soon/i.test(t)) return "";
        return `<blockquote>${renderMarkdownBlock(t.replace(/^>\s?/gm, ""))}</blockquote>`;
      }
      const lines = t.split("\n");
      if (lines.every((l) => l.trim().startsWith("|"))) {
        const cells = (l: string) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        const rows = lines.filter((l) => !/^\|\s*-{3}/.test(l.trim()));
        const [head, ...rest] = rows;
        const cell = (c: string, tag: string) => `<${tag}>${renderMarkdownBlock(c).replace(/^<p>|<\/p>$/g, "")}</${tag}>`;
        return `<div class="cp-table-wrap"><table class="cp-table"><thead><tr>${cells(head).map((c) => cell(c, "th")).join("")}</tr></thead><tbody>${rest
          .map((r) => `<tr>${cells(r).map((c) => cell(c, "td")).join("")}</tr>`)
          .join("")}</tbody></table></div>`;
      }
      return renderMarkdownBlock(t);
    })
    .join("\n");
}

export function renderPreviewModule(
  programme: PricedProgramme,
  token: string | null,
  chosen: CountryCode | null,
): string {
  const ctx = ctxFor(null, chosen);
  const code = chosen ?? "NG";
  const name = PROGRAMME_NAMES[programme];
  const path = `${PREVIEW_PATH}/${programme}`;
  const title = `Free Preview: ${name} | Paleon Training`;
  const description = `Module 1 of ${name}, free for leadership teams.`;
  if (!token) {
    return shell(ctx, {
      title,
      description,
      path,
      jsonLd: ld(path, title, description),
      body: `<section class="section section-paper ca-section"><div class="wrap ca-narrow">
      <h1 class="section-title">This preview link is not valid</h1>
      <p class="ca-p">Preview links come from the free preview sign-up. It takes under a minute, and the sample modules open straight away.</p>
      <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="${PREVIEW_PATH}?programme=${programme}">Get the free preview</a></div>
    </div></section>`,
    });
  }
  const m = sampleModule(programme);
  const tabs = PREVIEW_PROGRAMMES.map((p) =>
    p === programme
      ? `<span class="btn btn-signal" aria-current="page">${escapeHtml(PROGRAMME_NAMES[p])}</span>`
      : `<a class="btn btn-outline-ink" href="${previewUrl(p, token)}">${escapeHtml(PROGRAMME_NAMES[p])}</a>`,
  ).join(" ");
  const toc = m.lessons.map((l, i) => `<li><a href="#lesson-${i + 1}">${escapeHtml(l.title)}</a> <span class="optional">(${l.durationMinutes} min)</span></li>`).join("");
  const lessons = m.lessons
    .map(
      (l, i) => `<article class="pv-lesson" id="lesson-${i + 1}">
        <h2 class="section-title">Lesson ${i + 1}: ${escapeHtml(l.title)}</h2>
        ${renderLesson(l.content)}
      </article>`,
    )
    .join("\n");
  const body = `<section class="section section-paper ca-section" aria-labelledby="pv-title">
    <div class="wrap ca-narrow pv-module">
      <span class="section-eyebrow">Free leadership preview</span>
      <h1 class="section-title" id="pv-title">${escapeHtml(name)}: Module 1, ${escapeHtml(m.title)}</h1>
      <p class="ca-p">${escapeHtml(m.description)}</p>
      <div class="ca-ctas pv-tabs">${tabs}</div>
      <ol class="ca-list">${toc}</ol>
      ${lessons}
      <div class="pv-next">
        <h2 class="section-title">What did your team think?</h2>
        <p class="ca-p">Reply to the preview email with your team's views, or what you would want covered for your staff. When you are ready, buy places for ${escapeHtml(COUNTRIES[code].name)} or start with a 10-learner pilot.</p>
        <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="${programmePagePath(programme, code)}#buy">Buy learner places</a> <a class="btn btn-outline-ink btn-lg" href="${programmePagePath(programme, code)}#pilot">See the pilot</a></div>
      </div>
    </div>
  </section>`;
  const html = shell(ctx, { title, description, path, jsonLd: ld(path, title, description), body });
  // A signed, personal link: keep it out of search results.
  return html.replace("</head>", '<meta name="robots" content="noindex">\n</head>');
}
