import fs from "fs";
import path from "path";
import { CountryCode, COUNTRIES, HOMEPAGE_COURSES, formatMoney, isLive } from "../constants/countries";
import { ambassadorsPath } from "./countryHome";
import { flagSvg } from "./flags";

// /gh/ambassadors, /ke/ambassadors, /za/ambassadors (2026-10-30): the full Student
// Ambassador Programme page for each country, built from the Nigerian page
// (marketing/ambassadors.html) so all four keep the same structure. Every Nigerian detail
// (Naira amounts, NYSC, the WhatsApp line, industries, the guide video) is swapped for the
// country's own; each swap must match exactly as many times as expected, so a later edit
// to the Nigerian page that breaks one fails loudly (test/integration/country-homepages)
// instead of leaving Nigerian wording on another country's page.

type Local = {
  /** "coursemates, friends and ..." */
  peers: string;
  /** "your ... set" stand-in: who your friends are in a group. */
  set: string;
  /** "Final-year students and recent graduates at any ..." */
  institutions: string;
  /** Replaces the Nigerian NYSC corps members line in "Who can join". */
  serviceLine: string;
  /** "Class, department and ... groups" */
  groups: string;
  /** "unsure what to do after school ..." */
  afterSchool: string;
  /** "your university or ..." (welcome call and WhatsApp step). */
  whereFrom: string;
  /** The country's guide video: /videos/home/<file>.mp4 with a .jpg poster. */
  video: { file: string; seconds: number };
};

const LOCAL: Record<Exclude<CountryCode, "NG">, Local> = {
  GH: {
    peers: "National Service personnel",
    set: "National Service group",
    institutions: "university, technical university or college in Ghana",
    serviceLine:
      "<strong>National Service personnel</strong>, especially people active in their region&rsquo;s service-personnel groups.",
    groups: "Class, department and National Service groups",
    afterSchool: "after school or National Service",
    whereFrom: "region",
    video: { file: "paleon-ambassador-guide-gh", seconds: 89 },
  },
  KE: {
    peers: "classmates on attachment",
    set: "class group",
    institutions: "university or TVET college in Kenya",
    serviceLine:
      "<strong>Students on industrial attachment and interns</strong>, especially people active in their county&rsquo;s graduate and job-seeker groups.",
    groups: "Class, department and alumni groups",
    afterSchool: "after school",
    whereFrom: "county",
    video: { file: "paleon-ambassador-guide-ke", seconds: 93 },
  },
  ZA: {
    peers: "TVET college students",
    set: "class group",
    institutions: "university or TVET college in South Africa",
    serviceLine:
      "<strong>TVET college students and graduates</strong>, especially people active in their province&rsquo;s graduate and job-seeker groups.",
    groups: "Class, department and alumni groups",
    afterSchool: "after school",
    whereFrom: "province",
    video: { file: "paleon-ambassador-guide-za", seconds: 86 },
  },
};

const NG_INDUSTRIES = "Oil &amp; Gas, Banking or Telecoms";
const NG_WHATSAPP = "https://wa.me/2347077149989";
const NG_PHONES = "+234 707 714 9215 / +234 707 714 9989 (WhatsApp/Call)";

function amp(s: string): string {
  return s.replace(/&(?![a-z#0-9]+;)/gi, "&amp;");
}

function clock(seconds: number): string {
  return `${Math.floor(seconds / 60)} min ${seconds % 60} s`;
}

/** "about 90 seconds" / "4-minute" style length for the page copy. */
function videoLength(seconds: number): { label: string; adjective: string } {
  if (seconds < 120) {
    const s = Math.round(seconds / 10) * 10;
    return { label: `${s} seconds`, adjective: `${s}-second` };
  }
  const m = Math.round(seconds / 60);
  return { label: `${m} minutes`, adjective: `${m}-minute` };
}

let template: string | null = null;

export function renderCountryAmbassadors(country: Exclude<CountryCode, "NG">): string {
  template ??= fs.readFileSync(path.join(__dirname, "..", "marketing", "ambassadors.html"), "utf8");
  const c = COUNTRIES[country];
  const local = LOCAL[country];
  const rewards = c.site.ambassadorRewards;
  if (!rewards) throw new Error(`No ambassadorRewards for ${country}`);
  const money = (n: number) => formatMoney(country, n);
  const home = c.site.path;
  const page = ambassadorsPath(country);
  const industries = amp(c.site.headlineIndustries.replace(/ and /, " or "));
  const wa = c.site.whatsapp;
  const len = videoLength(local.video.seconds);
  const pathway = (slug: (typeof HOMEPAGE_COURSES)[number]) => amp(c.site.pathways[slug].replace(/ · /g, ", "));
  const live = isLive(country);

  let html = template;
  const swap = (from: string | RegExp, to: string, times = 1) => {
    const found = typeof from === "string" ? html.split(from).length - 1 : (html.match(from) ?? []).length;
    if (found !== times) {
      throw new Error(`ambassadors.html: expected ${times}x ${String(from).slice(0, 80)} for ${country}, found ${found}`);
    }
    html = typeof from === "string" ? html.split(from).join(to) : html.replace(from, to);
  };

  // <head>
  swap("<title>Student Ambassador Programme | Paleon Training</title>", `<title>Student Ambassador Programme in ${c.name} | Paleon Training</title>`);
  swap("with coursemates and corps members, and earn", `with coursemates and ${local.peers}, and earn`);
  swap(`<link rel="canonical" href="https://paleontraining.com/ng/ambassadors">`, `<link rel="canonical" href="https://paleontraining.com${page}">`);
  swap(`: "https://paleontraining.com/ng/ambassadors"`, `: "https://paleontraining.com${page}"`, 2); // JSON-LD url + breadcrumb
  swap(`<meta property="og:url" content="https://paleontraining.com/ng/ambassadors">`, `<meta property="og:url" content="https://paleontraining.com${page}">`);
  swap("with your coursemates and NYSC set.", `with your coursemates and ${local.set}.`, 2);
  swap("https://paleontraining.com/images/articles/refer.jpg", `https://paleontraining.com${c.site.ogImage}`, 3);
  swap(`"dateModified": "2026-09-26"`, `"dateModified": "2026-10-30"`);

  // The Nigeria-time Zoom countdown (already past and hidden) isn't carried over.
  swap(/\n {2}<!-- =+ AMBASSADOR HOUR COUNTDOWN[\s\S]*?<\/section>\n/, "\n");
  swap(`<script src="/zoom-countdown.js" defer></script>\n`, "");

  // Links to the country's own homepage, sign-up and WhatsApp line.
  swap(`href="/"`, `href="${home}"`, 3);
  swap(`href="/#career-match"`, `href="${home}#career-match"`);
  swap(`href="/register"`, `href="/register?country=${country}"`, 4);
  swap(NG_WHATSAPP, wa.link, 4);
  // (The footer keeps the Nigerian company address and its numbers, as on the country homepages.)
  swap(`rel="noopener">${NG_PHONES}</a>`, `rel="noopener">${wa.display} (WhatsApp)</a>`, 2);
  // The walkthrough's screenshots show Nigerian amounts and networks.
  swap(`\n      <a class="btn btn-outline" href="/ambassador-walkthrough">Step-by-step walkthrough</a>`, "");
  swap(` <a href="/ambassador-walkthrough">See every screen in the walkthrough</a>.`, "");

  // Masthead
  swap(`<p class="eyebrow">Student Ambassador Programme</p>`, `<p class="eyebrow">Student Ambassador Programme &middot; ${c.name}</p>`);
  swap("Help coursemates, friends and corps members find", `Help coursemates, friends and ${local.peers} find`);
  swap(`<div class="stat-value">&#8358;0</div>`, `<div class="stat-value">${money(0)}</div>`);
  swap("Last reviewed: 26 September 2026", "Last reviewed: 30 October 2026");
  if (!live) {
    swap(
      `<p class="reviewed-line">`,
      `<p class="reviewed-line"><strong>Course payments in ${c.name} open soon.</strong> Register now to get your code ready; rewards start once friends in ${c.name} can pay. `,
    );
  }

  // Guide video: the country's own version, with its local amounts.
  const v = local.video.file;
  swap("Watch the 6-minute guide", `Watch the ${len.adjective} guide`);
  swap("Watch &middot; 6 minutes", `Watch &middot; ${len.label}`);
  swap("/videos/home/paleon-ambassador-guide-earn-and-rewards.jpg", `/videos/home/${v}.jpg`, 2);
  swap("/videos/home/paleon-ambassador-guide-earn-and-rewards.mp4", `/videos/home/${v}.mp4`, 2);
  swap("(5 minutes 53 seconds)", `(${len.label})`);
  swap("5 min 53 s &middot;", `${clock(local.video.seconds)} &middot;`);
  swap(/\n {8}<nav class="guide-chapters"[\s\S]*?<\/nav>/, ""); // chapter times belong to the Nigerian cut
  swap("This 6-minute guide shows", `This ${len.adjective} guide shows`);
  swap("They can start for just &#8358;20,000.", `They can start for just ${c.site.deposit === null ? "a deposit" : money(c.site.deposit)}.`);
  swap("earn N5,000 in airtime", `earn ${money(rewards.referrer)} in airtime`);
  swap(`"duration": "PT5M53S"`, `"duration": "PT${Math.floor(local.video.seconds / 60)}M${local.video.seconds % 60}S"`);
  swap(`"uploadDate": "2026-10-17T12:00:00+01:00"`, `"uploadDate": "2026-10-30T12:00:00+00:00"`);

  // Who, where and what
  swap("Send it to friends, coursemates or your NYSC set,", `Send it to friends, coursemates or your ${local.set},`);
  swap("on campus, in your NYSC set or in your group chats", `on campus, in your ${local.set} or in your group chats`);
  swap(NG_INDUSTRIES, industries, 3);
  swap("at any university or polytechnic in Nigeria.", `at any ${local.institutions}.`);
  swap(
    "<strong>NYSC corps members</strong>, especially CDS group leads and people active in their state's corps member groups.",
    local.serviceLine,
  );
  swap(
    "<td>Banking, Telecoms, Oil &amp; Gas (it has pathways for all three)</td>",
    `<td>${pathway("cyber-security-fundamentals")} (it has pathways for all three)</td>`,
  );
  swap("<td>Oil &amp; Gas, infrastructure, surveying, environment</td>", `<td>${pathway("gis-and-drone-mapping")}</td>`);
  swap("<td>Banking, Telecoms, any business with customers</td>", `<td>${pathway("digital-marketing")}</td>`);
  swap("<td>Oil &amp; Gas sites, construction, manufacturing</td>", `<td>${pathway("hse-fundamentals")}</td>`);
  swap("Class, department and NYSC groups", local.groups);
  swap("unsure what to do after school or NYSC.", `unsure what to do ${local.afterSchool}.`);
  swap("After a lecture, at CDS, at a career event.", "After a lecture, in a study group, at a career event.");
  swap("Share once in a class, department or NYSC group that allows it.", "Share once in a class, department or alumni group that allows it.");
  swap("name and university (or NYSC state)", `name and university (or ${local.whereFrom})`);
  swap("your university or NYSC state, and the groups", `your university or ${local.whereFrom}, and the groups`);

  // Footer
  swap(
    "opportunities in Oil &amp; Gas, Banking, Telecommunications and Nigeria’s fastest-growing industries.<br>\n        Led from London, delivered in Nigeria.",
    `opportunities in ${amp(c.site.headlineIndustries)} and ${c.name}’s fastest-growing industries.<br>\n        Led from London, delivered in ${c.name}.`,
  );
  swap(
    /\n {8}<li><a href="\/digital-skills-training-nigeria">[\s\S]*?Banking &amp; Telecom Training<\/a><\/li>/,
    "",
  );
  swap(`<li><a href="/#why">Why Paleon</a></li>`, `<li><a href="${home}#why">Why Paleon</a></li>`);
  swap(`<li><a href="/#register">Register interest</a></li>`, `<li><a href="${home}#career-match">Free Career Match</a></li>`);

  // Amounts last, so nothing above can reintroduce a placeholder.
  html = html
    .replace(/\{\{REFERRER_REWARD_X5\}\}/g, money(rewards.referrer * 5))
    .replace(/\{\{REFERRER_REWARD_X10\}\}/g, money(rewards.referrer * 10))
    .replace(/\{\{REFERRER_REWARD\}\}/g, money(rewards.referrer))
    .replace(/\{\{REFEREE_REWARD\}\}/g, money(rewards.referee))
    .replace("{{TITLE_FLAG}}", flagSvg(country, "title-flag"));
  // The country's WhatsApp line for the floating button (whatsapp-float.js).
  swap("<body>", `<body data-country="${country}" data-whatsapp="${wa.link}">`);
  return html.replace(`<html lang="en">`, `<html lang="${c.site.locale}">`);
}
