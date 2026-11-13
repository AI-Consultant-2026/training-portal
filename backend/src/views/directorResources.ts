import { COUNTRIES, CountryCode, MARKET_ORDER, formatMoney } from "../constants/countries";
import { READINESS_BANDS, READINESS_QUESTIONS } from "../constants/readinessCheck";
import { CORPORATE_EMPLOYEE_BANDS } from "../validators/corporateLeads.validators";
import { CORPORATE_HUB_PATH, options } from "./corporateAiWorkflow";
import { CORPORATE_PRICES, PricedProgramme } from "../constants/corporatePricing";
import { CALL_URL, EXAMPLE_STAFF, PILOT_STAFF, brochurePath, callButton, exampleTotal, pilotTotal } from "./corporateOffers";
import { DATA_PROTECTION_LAW, ORGANIZATION_LD, countryCorporatePath } from "./corporateLocal";
import { ORIGIN, PageContext, SEARCH_OVERLAY, escapeHtml, corporateUtilBar, footer, head, header, scripts } from "./countryHome";

// Free resources for business owners, CEOs and managing directors (2026-11-08), linked from
// the homepage's "Resources" section and menu item:
//   /ai-cyber-readiness-check  -- 10-question self-assessment; scored in the browser by
//                                 readiness-check.js, scorecard emailed via /api/leads/readiness
//   /ai-use-policy-template    -- a plain-language AI use policy to adapt
//   /board-cyber-risk-briefing -- cyber risk for boards and directors
// One page each for all four countries (the pages are general); links keep the visitor's
// country when it is known.

export const READINESS_PATH = "/ai-cyber-readiness-check";
export const AI_POLICY_PATH = "/ai-use-policy-template";
export const BOARD_BRIEFING_PATH = "/board-cyber-risk-briefing";

export const PROGRAMMES = {
  "cybersecure-workforce": { name: "CyberSecure Workforce", slug: "corporate-training/cybersecure-workforce" },
  "ai-workflow": { name: "AI Workflow Productivity & Process Transformation", slug: "corporate-training/ai-workflow-productivity" },
  "ai-cyber-accelerator": {
    name: "AI + Cybersecurity Professional Accelerator",
    slug: "corporate-training/ai-cybersecurity-professional-accelerator",
  },
};

const PRICED: Record<keyof typeof PROGRAMMES, PricedProgramme> = {
  "cybersecure-workforce": "cybersecure",
  "ai-workflow": "ai-workflow",
  "ai-cyber-accelerator": "accelerator",
};

export function shell(
  ctx: PageContext,
  opts: { title: string; description: string; path: string; jsonLd: object; body: string; extraScript?: string; ogImage?: string },
): string {
  const home = COUNTRIES[ctx.country].site.path;
  const headHtml = head(ctx, {
    title: opts.title,
    description: opts.description,
    canonicalPath: opts.path,
    // One page for every country: all hreflang versions are this page.
    alternatesFor: () => opts.path,
    xDefault: opts.path,
    jsonLd: opts.jsonLd,
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/${opts.ogImage ?? "corporate-ai-workflow-ng"}.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');
  return `${headHtml}
<body data-country="${ctx.country}"${ctx.hub ? " data-hub" : ""}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(home)}
${header(ctx, home, "/", true)}
<main id="main">
${opts.body}
</main>
${footer(ctx, home, false, "/", true)}
${scripts(ctx)}
${opts.extraScript ?? ""}
</body>
</html>
`;
}

function pageLd(path: string, name: string, description: string, type = "WebPage"): object {
  const url = `${ORIGIN}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_LD,
      {
        "@type": type,
        "@id": `${url}#page`,
        url,
        name,
        headline: name,
        description,
        inLanguage: "en",
        author: { "@id": `${ORIGIN}/#organization` },
        publisher: { "@id": `${ORIGIN}/#organization` },
        datePublished: "2026-11-08",
        dateModified: "2026-11-08",
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Corporate training", item: `${ORIGIN}${CORPORATE_HUB_PATH}` },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    ],
  };
}

function crumb(name: string): string {
  return `<div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${CORPORATE_HUB_PATH}">Corporate training</a> <span aria-hidden="true">/</span> ${escapeHtml(name)}</p></div>`;
}

export function countryLinks(): string {
  return MARKET_ORDER.map((k) => `<a href="${countryCorporatePath(k)}">${escapeHtml(COUNTRIES[k].name)}</a>`).join(" &middot; ");
}

// ---------------------------------------------------------------------------------
// AI & Cyber Readiness Check

export function renderReadinessCheck(country: CountryCode | null, chosen: CountryCode | null): string {
  const ctx: PageContext = country
    ? { country, hub: false, detected: null, chosen: country }
    : { country: chosen ?? "NG", hub: true, detected: null, chosen };
  const title = "Free AI & Cyber Readiness Check for Organisations | Paleon Training";
  const description =
    "Ten quick questions for business owners and directors: how ready is your organisation for cyber threats and safe AI use? Instant score and a free scorecard.";
  const areas: { area: "cyber" | "ai"; h: string }[] = [
    { area: "cyber", h: "Part 1: Cybersecurity" },
    { area: "ai", h: "Part 2: AI use" },
  ];
  let n = 0;
  const questions = areas
    .map(
      (a) => `<h2 class="section-title rc-part">${escapeHtml(a.h)}</h2>
      ${READINESS_QUESTIONS.filter((q) => q.area === a.area)
        .map((q) => {
          n += 1;
          return `<fieldset class="rc-q" data-area="${q.area}">
        <legend><span class="rc-num">${n}.</span> ${escapeHtml(q.q)}</legend>
        ${q.options
          .map(
            (o, i) =>
              `<label class="rc-opt"><input type="radio" name="${q.id}" value="${i}" required> <span>${escapeHtml(o)}</span></label>`,
          )
          .join("\n        ")}
      </fieldset>`;
        })
        .join("\n      ")}`,
    )
    .join("\n      ");
  // Read by readiness-check.js (JSON is not executed, so the CSP allows it).
  const data = {
    questions: READINESS_QUESTIONS.map((q) => ({ id: q.id, area: q.area, q: q.q })),
    bands: READINESS_BANDS,
    exampleStaff: EXAMPLE_STAFF,
    pilotStaff: PILOT_STAFF,
    programmes: Object.fromEntries(
      Object.entries(PROGRAMMES).map(([k, p]) => {
        const priced = PRICED[k as keyof typeof PROGRAMMES];
        return [
          k,
          {
            name: p.name,
            url: `${COUNTRIES[ctx.country].site.path}/${p.slug}`,
            price: `${formatMoney(ctx.country, CORPORATE_PRICES[priced][ctx.country])} per learner self-paced; ${PILOT_STAFF}-learner pilot ${formatMoney(ctx.country, pilotTotal(priced, ctx.country))}`,
            brochure: brochurePath(priced, ctx.country),
            // Rough cost for the result screen (2026-11-13 review).
            example: formatMoney(ctx.country, exampleTotal(priced, ctx.country)),
            pilot: formatMoney(ctx.country, pilotTotal(priced, ctx.country)),
          },
        ];
      }),
    ),
  };
  const countryOptions =
    (ctx.hub ? '<option value="">Choose your country</option>' : "") +
    MARKET_ORDER.map(
      (k) => `<option value="${k}"${!ctx.hub && k === ctx.country ? " selected" : ""}>${escapeHtml(COUNTRIES[k].name)}</option>`,
    ).join("");

  const body = `  <section class="hero ca-hero" id="top">
    ${crumb("AI & Cyber Readiness Check")}
    <div class="wrap">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">Free for employers &middot; Nigeria, South Africa, Kenya and Ghana</span>
        <h1 class="hero-title ca-hero-title">AI &amp; Cyber Readiness Check</h1>
        <p class="ca-headline">How ready is your organisation for today&rsquo;s cyber threats and for safe, productive AI use?</p>
        <p class="hero-sub">Ten quick questions for business owners, CEOs, managing directors and HR leaders. See your score straight away, then get a free scorecard with your priority gaps by email.</p>
        <ul class="ca-trust"><li>10 questions</li><li>About 3 minutes</li><li>Instant score</li></ul>
      </div>
    </div>
  </section>

  <section class="section section-paper ca-section" aria-label="The questions">
    <div class="wrap ca-narrow">
      <form class="rc-form" id="rcQuiz" novalidate>
      ${questions}
        <p class="form-error" id="rcQuizError" role="alert" hidden></p>
        <button type="submit" class="btn btn-signal btn-lg btn-block">See my score</button>
      </form>

      <div class="rc-result" id="rcResult" hidden tabindex="-1" aria-live="polite">
        <span class="section-eyebrow">Your result</span>
        <p class="rc-score"><strong id="rcScore">0%</strong> <span id="rcBand"></span></p>
        <p class="ca-p" id="rcSummary"></p>
        <p class="ca-hint rc-bands"><strong>How to read your score.</strong> 0&ndash;40% is <strong>Early stage</strong>: important basics are missing. 41&ndash;70% is <strong>Developing</strong>: good practice exists but is uneven across teams. 71&ndash;100% is a <strong>Strong foundation</strong>: keep it current and build specialist skills. The two bars show which area pulls your score down.</p>
        <div class="rc-bars">
          <p><span>Cybersecurity</span> <strong id="rcCyber">0%</strong></p>
          <div class="rc-bar"><span id="rcCyberBar"></span></div>
          <p><span>AI use</span> <strong id="rcAi">0%</strong></p>
          <div class="rc-bar"><span id="rcAiBar"></span></div>
        </div>
        <h3>Your priority gaps</h3>
        <ol class="rc-gaps" id="rcGaps"></ol>
        <h3>Our recommendation for your organisation</h3>
        <p class="ca-p" id="rcReason"></p>
        <ul class="rc-suggest" id="rcSuggest"></ul>
        <p class="ca-p rc-cost" id="rcCost"></p>
        <div class="rc-next">
          <p class="ca-p"><strong>Next step: a proposal shaped around this result.</strong> Tick &ldquo;Send me a tailored proposal&rdquo; below and we will reply within one working day, or talk it through first.</p>
          <div class="ca-ctas">${callButton(false)}</div>
          <p class="ca-hint">Not ready for a full rollout? Start with a ${PILOT_STAFF}-learner pilot or a free leadership taster session.</p>
        </div>
        <p class="ca-hint">A quick self-assessment to help you prioritise. It is not an audit, a certification or legal advice.</p>

        <div class="rc-email" id="rcEmailWrap">
          <h2 class="section-title">Email me my scorecard</h2>
          <p class="ca-p">We will send your score, your priority gaps, our recommendation with costs, and a brochure and business case to share with your management team.</p>
          <form class="ca-form" id="rcEmail" novalidate>
            <div class="ca-grid">
              <div class="form-row"><label class="form-label" for="rc-name">Name</label><input class="form-input" id="rc-name" name="name" autocomplete="name" required maxlength="150"></div>
              <div class="form-row"><label class="form-label" for="rc-job">Job title</label><input class="form-input" id="rc-job" name="jobTitle" autocomplete="organization-title" required maxlength="150"></div>
              <div class="form-row"><label class="form-label" for="rc-org">Organisation</label><input class="form-input" id="rc-org" name="organisation" autocomplete="organization" required maxlength="200"></div>
              <div class="form-row"><label class="form-label" for="rc-country">Country</label><select class="form-select" id="rc-country" name="country" required>${countryOptions}</select></div>
              <div class="form-row"><label class="form-label" for="rc-email">Business email</label><input class="form-input" id="rc-email" name="email" type="email" autocomplete="email" required maxlength="200"></div>
              <div class="form-row"><label class="form-label" for="rc-employees">Number of employees</label><select class="form-select" id="rc-employees" name="employees" required>${options(CORPORATE_EMPLOYEE_BANDS, "Choose one")}</select></div>
            </div>
            <div class="ca-hp" aria-hidden="true"><label for="rc-website">Website</label><input id="rc-website" name="website" tabindex="-1" autocomplete="off"></div>
            <label class="consent-check rc-proposal"><input type="checkbox" name="proposal" checked> <span><strong>Send me a tailored training proposal</strong> based on this result (no obligation).</span></label>
            <label class="consent-check"><input type="checkbox" name="consent" required> <span>I agree that Paleon Training may email me my scorecard and contact me about it, as described in the <a href="/privacy">Privacy Policy</a>.</span></label>
            <label class="consent-check"><input type="checkbox" name="updates"> <span>Send me occasional updates about Paleon corporate training. I can unsubscribe at any time. <span class="optional">(optional)</span></span></label>
            <p class="form-error" id="rcError" role="alert" hidden></p>
            <button type="submit" class="btn btn-signal btn-lg btn-block" id="rcSubmit">Email my scorecard and recommendation</button>
          </form>
          <div class="ca-thanks" id="rcThanks" hidden tabindex="-1">
            <h3>Your scorecard is on its way.</h3>
            <p>Check your inbox in the next few minutes. If you asked for a proposal, we will send it within one working day. Want to talk it through sooner? <a href="${CALL_URL}" target="_blank" rel="noopener">Book a 20-minute call</a>.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script type="application/json" id="rcData">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

  return shell(ctx, {
    title,
    description,
    path: READINESS_PATH,
    ogImage: "ai-cyber-readiness-check",
    jsonLd: pageLd(READINESS_PATH, "AI & Cyber Readiness Check", description),
    body,
    extraScript: '<script src="/readiness-check.js" defer></script>',
  });
}

// ---------------------------------------------------------------------------------
// Articles: the AI use policy template and the board cyber-risk briefing.

export interface ArticleSection {
  h: string;
  /** Paragraphs; a string starting "- " lines is a list. */
  body: string[];
}

export function article(sections: ArticleSection[]): string {
  return sections
    .map(
      (s, i) => `<section class="rs-section" id="s${i + 1}" aria-labelledby="s${i + 1}-title">
        <h2 class="section-title" id="s${i + 1}-title">${escapeHtml(s.h)}</h2>
        ${s.body
          .map((p) =>
            p.startsWith("- ")
              ? `<ul class="ca-list">${p
                  .split("\n")
                  .map((li) => `<li>${escapeHtml(li.replace(/^- /, ""))}</li>`)
                  .join("")}</ul>`
              : `<p class="ca-p">${escapeHtml(p)}</p>`,
          )
          .join("\n        ")}
      </section>`,
    )
    .join("\n      ");
}

export function toc(sections: ArticleSection[]): string {
  return `<nav class="rs-toc" aria-label="Contents"><p><strong>Contents</strong></p><ol>${sections
    .map((s, i) => `<li><a href="#s${i + 1}">${escapeHtml(s.h)}</a></li>`)
    .join("")}</ol></nav>`;
}

function articleCta(): string {
  return `<section class="section section-dark ca-section" aria-labelledby="cta-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Next step</span>
      <h2 class="section-title" id="cta-title">Turn the policy into everyday practice</h2>
      <p class="ca-p">A policy only works when people understand it. Paleon Training runs corporate AI and cybersecurity training for organisations in ${countryLinks()}.</p>
      <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="${READINESS_PATH}">Take the free readiness check</a> <a class="btn btn-outline-light btn-lg" href="/#enquiry">Book a consultation</a></div>
    </div>
  </section>`;
}

const POLICY_SECTIONS: ArticleSection[] = [
  {
    h: "Why your organisation needs an AI use policy",
    body: [
      "Your employees are probably already using AI tools such as ChatGPT, Claude, Gemini or Copilot, with or without permission. Without clear rules, confidential information can end up in public tools, AI-written content can go out unchecked, and nobody is sure who is accountable when something goes wrong.",
      "A short, plain-language policy fixes that. It tells staff what they can use AI for, what they must never put into it, and who checks the result. The template below is a starting point: replace the text in [square brackets] and adapt it to your organisation, your sector and your country's law.",
    ],
  },
  {
    h: "1. Purpose and scope",
    body: [
      "This policy sets out how [Organisation name] staff may use artificial intelligence (AI) tools in their work, so that we gain the benefits of AI while protecting our customers, our people and our information.",
      "It applies to all employees, contractors and temporary staff, and to any AI tool used for [Organisation name] work, on company or personal devices: chat assistants, writing and summarising tools, transcription and meeting tools, image tools and AI features built into other software.",
    ],
  },
  {
    h: "2. Approved tools and accounts",
    body: [
      "- Only use the AI tools on the approved list maintained by [IT / the policy owner]: [list approved tools and versions].\n- Use company accounts for work, not personal accounts, wherever a company account is provided.\n- Ask [IT / the policy owner] before using a new AI tool or a new AI feature for work. We will check how it handles our data.",
    ],
  },
  {
    h: "3. Information you must never put into an AI tool",
    body: [
      "Unless a tool is specifically approved for that type of information, never enter:",
      "- Personal data about customers, patients, students or members of the public\n- Staff records, salaries, performance or health information\n- Passwords, access codes, account numbers or security details\n- Confidential financial information, contracts, pricing or plans that are not public\n- Client or partner documents shared with us in confidence\n- Anything you would not be allowed to email outside the organisation",
      "If you are unsure whether information is confidential, treat it as confidential and ask first.",
    ],
  },
  {
    h: "4. What AI may and may not be used for",
    body: [
      "Good uses include drafting and improving emails, reports and presentations; summarising long public or approved documents; brainstorming; checking tone and grammar; and analysing data that has been approved for the tool.",
      "Do not use AI to make final decisions about people (for example hiring, promotion, discipline or credit); to produce legal, medical or financial advice without qualified review; to create content that impersonates real people; or for anything unlawful or against our code of conduct.",
    ],
  },
  {
    h: "5. Human review and accountability",
    body: [
      "AI drafts; people decide. The person who uses an AI tool is responsible for the result, exactly as if they had written it themselves.",
      "- Check facts, figures, names and references: AI can produce answers that sound right but are wrong.\n- Check for bias, tone and anything that could mislead or offend.\n- Get the usual approvals before anything AI-assisted is sent to a customer, published or used in a decision.",
    ],
  },
  {
    h: "6. Transparency, copyright and intellectual property",
    body: [
      "Tell your manager or the recipient when AI has played a significant part in a piece of work where that matters, such as client deliverables or published content. Do not present AI-generated work as independent research.",
      "Do not use AI to copy or closely reproduce other people's copyrighted work. Content created for [Organisation name] with AI belongs to [Organisation name] in the same way as other work you produce.",
    ],
  },
  {
    h: "7. Security and AI-enabled scams",
    body: [
      "Criminals now use AI to write convincing phishing emails, clone voices and fake videos of senior people. Never act on an unexpected request to pay, change bank details or share access because it seems to come from a manager or supplier. Always confirm through a known phone number or in person, and report suspicious messages to [IT / security contact] straight away.",
    ],
  },
  {
    h: "8. Data protection",
    body: [
      `Use of AI must comply with data protection law in every country where we operate, for example ${MARKET_ORDER.map((k) => DATA_PROTECTION_LAW[k]).join(", ")}. If personal data might be processed by an AI tool, speak to [the data protection officer / policy owner] first.`,
    ],
  },
  {
    h: "9. Training, incidents and review",
    body: [
      "- All staff will receive training on using AI safely and productively, and on AI-related cyber risks, before using approved tools for work.\n- Report any mistake, such as confidential information entered into an unapproved tool, to [contact] immediately. Early reporting limits the damage and will be treated supportively.\n- [Policy owner] owns this policy and will review it at least every [12] months, or sooner when tools or the law change.",
      "Approved by [name, role] on [date]. Next review: [date].",
    ],
  },
  {
    h: "Before you adopt it",
    body: [
      "This template is general guidance, not legal advice. Ask your legal or data protection adviser to review your final policy, especially if you work in a regulated sector such as banking, healthcare or telecoms.",
    ],
  },
];

export function renderAiPolicyTemplate(chosen: CountryCode | null): string {
  const ctx: PageContext = { country: chosen ?? "NG", hub: true, detected: null, chosen };
  const name = "AI Use Policy Template for Organisations";
  const description =
    "A free, plain-language AI use policy template for business owners and directors: approved tools, data that must never go into AI, human review, security and training.";
  const body = `  <section class="hero ca-hero" id="top">
    ${crumb("AI use policy template")}
    <div class="wrap"><div class="hero-inner ca-hero-copy">
      <span class="eyebrow">Free resource for directors</span>
      <h1 class="hero-title ca-hero-title">AI use policy template for organisations</h1>
      <p class="hero-sub">A plain-language policy you can adapt: what staff may use AI for, what they must never put into it, and who checks the result. For business owners, CEOs, managing directors and HR leaders in Nigeria, South Africa, Kenya and Ghana.</p>
    </div></div>
  </section>
  <section class="section section-paper ca-section">
    <div class="wrap ca-narrow">
      ${toc(POLICY_SECTIONS)}
      ${article(POLICY_SECTIONS)}
      <p class="ca-p">Related: <a href="${BOARD_BRIEFING_PATH}">board cyber-risk briefing</a> &middot; <a href="${READINESS_PATH}">AI &amp; Cyber Readiness Check</a></p>
    </div>
  </section>
  ${articleCta()}`;
  return shell(ctx, {
    title: "AI Use Policy Template for Organisations (Free) | Paleon Training",
    description,
    path: AI_POLICY_PATH,
    jsonLd: pageLd(AI_POLICY_PATH, name, description, "Article"),
    body,
  });
}

const BOARD_SECTIONS: ArticleSection[] = [
  {
    h: "Why cyber risk belongs on the board agenda",
    body: [
      "Cyber incidents are now business incidents. A single fake invoice, a ransomware attack or a leak of customer data can stop operations, cost money directly, trigger data protection investigations and damage the trust of customers, regulators and investors.",
      "Most attacks on organisations start with a person, not a system: an employee who clicks a convincing link, approves a fraudulent payment or reuses a password. That makes cyber risk a people and leadership issue as much as a technology one, and it is why boards and directors need to understand it.",
    ],
  },
  {
    h: "The risks directors should understand",
    body: [
      "- Phishing and business email compromise: fake emails and messages that steal logins or trick staff into paying criminals.\n- Payment and invoice fraud: requests to change a supplier's bank details or make an urgent transfer, often appearing to come from a senior person.\n- Ransomware: attackers lock systems and data and demand payment.\n- Impersonation and deepfakes: AI-cloned voices and videos of executives used to authorise payments or share information.\n- Data breaches: personal or confidential data exposed, with obligations under data protection law.\n- Supplier and third-party risk: an attack on a supplier or software provider that reaches your organisation.\n- Shadow AI: staff using unapproved AI tools and putting confidential information into them.",
    ],
  },
  {
    h: "Ten questions directors should ask management",
    body: [
      "- Who is accountable for cybersecurity at executive level, and how often do they report to the board?\n- What are our most valuable systems and data, and what would happen if we lost access to them for a week?\n- Have all staff had cybersecurity awareness training in the last 12 months, and how do we know it worked?\n- What is our rule for verifying payment requests and changes to bank details, and is it always followed?\n- Is multi-factor authentication switched on for email and all key systems?\n- How quickly are suspicious emails reported, and how many staff report them?\n- Do we have an incident response plan, and when did we last test it?\n- Which suppliers have access to our systems or data, and how do we check their security?\n- Do we have a written AI use policy, and do staff know which AI tools are approved?\n- Are we meeting our obligations under data protection law in each country where we operate?",
    ],
  },
  {
    h: "Measures that show whether your people are ready",
    body: [
      "Ask for a short, regular report that tracks a few meaningful measures rather than technical detail:",
      "- Share of staff who completed awareness training this year\n- Share of staff who report simulated or real phishing messages\n- Multi-factor authentication coverage for email and key systems\n- Payment requests verified by call-back, and any exceptions\n- Time taken to detect, report and contain incidents\n- Share of staff who have read and accepted the AI use policy",
    ],
  },
  {
    h: "What the board itself should do",
    body: [
      "- Set the organisation's appetite for cyber risk and make sure it is reflected in budgets and priorities.\n- Name a senior owner for cybersecurity and for safe AI use.\n- Make sure every employee, including the leadership team, receives practical awareness training.\n- Approve and test the incident response plan, including how the board will be informed and who speaks for the organisation.\n- Review the measures above at least twice a year.",
    ],
  },
  {
    h: "Data protection obligations",
    body: [
      `Organisations that handle personal data have legal duties to protect it and, in many cases, to report breaches. In our markets these include ${MARKET_ORDER.map((k) => DATA_PROTECTION_LAW[k]).join(", ")}. This briefing is general guidance, not legal advice: take advice on your organisation's specific obligations.`,
    ],
  },
];

export function renderBoardCyberBriefing(chosen: CountryCode | null): string {
  const ctx: PageContext = { country: chosen ?? "NG", hub: true, detected: null, chosen };
  const name = "Board Cyber-Risk Briefing for Directors";
  const description =
    "A plain-language cyber-risk briefing for boards, CEOs and managing directors: the main risks, ten questions to ask management and the measures that show readiness.";
  const body = `  <section class="hero ca-hero" id="top">
    ${crumb("Board cyber-risk briefing")}
    <div class="wrap"><div class="hero-inner ca-hero-copy">
      <span class="eyebrow">Free resource for directors</span>
      <h1 class="hero-title ca-hero-title">Board cyber-risk briefing for directors</h1>
      <p class="hero-sub">The cyber risks boards should understand, the ten questions directors should ask management, and the measures that show whether your people are ready. For organisations in Nigeria, South Africa, Kenya and Ghana.</p>
    </div></div>
  </section>
  <section class="section section-paper ca-section">
    <div class="wrap ca-narrow">
      ${toc(BOARD_SECTIONS)}
      ${article(BOARD_SECTIONS)}
      <p class="ca-p">Related: <a href="${AI_POLICY_PATH}">AI use policy template</a> &middot; <a href="${READINESS_PATH}">AI &amp; Cyber Readiness Check</a></p>
    </div>
  </section>
  ${articleCta().replace("Turn the policy into everyday practice", "Make every employee part of your defence")}`;
  return shell(ctx, {
    title: "Board Cyber-Risk Briefing for Directors | Paleon Training",
    description,
    path: BOARD_BRIEFING_PATH,
    jsonLd: pageLd(BOARD_BRIEFING_PATH, name, description, "Article"),
    body,
  });
}
