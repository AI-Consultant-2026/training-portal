import { COUNTRIES, CountryCode } from "../constants/countries";

// Local SEO for the corporate country pages (2026-11-08): the cities each page names, the
// delivery wording, and a ContactPoint shared by the AI Workflow and CyberSecure pages.

export const CITIES: Record<CountryCode, string[]> = {
  NG: ["Lagos", "Abuja", "Port Harcourt", "Warri", "Ibadan", "Kano"],
  ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Gqeberha", "Bloemfontein"],
  KE: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  GH: ["Accra", "Kumasi", "Tema", "Takoradi", "Tamale", "Cape Coast"],
};

// "Who we serve" (owner, 2026-11-13): keeps the city names for search without implying
// on-site delivery, e.g. "Serving employers in Lagos, Abuja, Port Harcourt, Warri and nationwide".
export function servingLine(code: CountryCode): string {
  return `Serving employers in ${CITIES[code].slice(0, 4).join(", ")} and nationwide`;
}

export const WHO_WE_SERVE = "Who we serve";
export const WHO_WE_SERVE_INTRO = "Organisations across Nigeria, South Africa, Kenya and Ghana, fully online.";

export function cityList(code: CountryCode): string {
  const list = CITIES[code];
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
}

// Owner, 2026-11-13: corporate training is online only, per learner or in a private company portal (self-paced online,
// private to the client's own staff); never live, facilitator-led or hybrid. `code` is kept
// for callers.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function deliveryPhrase(code: CountryCode): string {
  return "online, per learner or in a private company portal,";
}

export function areaServed(code: CountryCode): object[] {
  return [{ "@type": "Country", name: COUNTRIES[code].name }, ...CITIES[code].map((name) => ({ "@type": "City", name }))];
}

export const SALES_CONTACT = {
  "@type": "ContactPoint",
  contactType: "sales",
  email: "corporate@paleontraining.com",
  telephone: "+44-7508-823495",
  areaServed: ["NG", "ZA", "KE", "GH"],
  availableLanguage: "English",
};

// The corporate training homepage (2026-11-08): the corporate hub moved from
// /corporate-training to "/", and each country has its own corporate training page.
// All four are /<cc>/corporate-training (Nigeria's moved there from the static
// /corporate-training-nigeria on 2026-11-09, which now 301s) (views/countryCorporate.ts).
export const CORPORATE_HOME_PATH = "/";

export function countryCorporatePath(code: CountryCode): string {
  return `${COUNTRIES[code].site.path}/corporate-training`;
}

// The three programme pages per country. Kept here (no view imports) so countryHome.ts
// can link to them from the shared footer without a circular import.
export const PROGRAMME_LINKS: { slug: string; name: string }[] = [
  { slug: "corporate-training/ai-workflow-productivity", name: "AI Workflow Productivity & Process Transformation" },
  { slug: "corporate-training/cybersecure-workforce", name: "CyberSecure Workforce" },
  { slug: "corporate-training/ai-cybersecurity-professional-accelerator", name: "AI + Cybersecurity Professional Accelerator" },
];

// Each country's data protection law (2026-11-08), named beside the cybersecurity programme
// for compliance-minded boards. Same names as the CyberSecure Workforce FAQs. Awareness
// training only: never claim it makes an organisation compliant.
export const DATA_PROTECTION_LAW: Record<CountryCode, string> = {
  NG: "the Nigeria Data Protection Act 2023 (NDPA)",
  ZA: "the Protection of Personal Information Act (POPIA)",
  KE: "Kenya's Data Protection Act, 2019",
  GH: "Ghana's Data Protection Act, 2012 (Act 843)",
};

// One Organization node for every corporate page (2026-11-10), so Google sees the same
// company everywhere: logo, phone, full address and the company's social profiles. Hard-codes
// the origin because countryHome.ts (where ORIGIN lives) imports this file.
const SITE = "https://paleontraining.com";
export const ORGANIZATION_LD = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Paleon Training Limited",
  alternateName: "Paleon Training",
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/images/og/paleon-training-logo.jpg`, width: 512, height: 512 },
  image: `${SITE}/images/og/paleon-training-logo.jpg`,
  description:
    "Paleon Training Limited runs corporate AI and cybersecurity training for employees of companies in Nigeria, South Africa, Kenya and Ghana: online only, per learner or in a private company portal: self-paced online courses private to each organisation's staff.",
  email: "corporate@paleontraining.com",
  telephone: "+44-7508-823495",
  contactPoint: SALES_CONTACT,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.5 Beji Court, Off NNPC Junior Staff Club 10",
    addressLocality: "Warri",
    addressRegion: "Delta State",
    postalCode: "320001",
    addressCountry: "NG",
  },
  areaServed: ["Nigeria", "South Africa", "Kenya", "Ghana"].map((name) => ({ "@type": "Country", name })),
  founder: { "@type": "Person", "@id": `${SITE}/#ken-uwotu`, name: "Ken Uwotu" },
  sameAs: [
    "https://www.linkedin.com/company/146121029/",
    "https://www.facebook.com/profile.php?id=61593708334223",
    "https://www.instagram.com/paleontraining/",
  ],
};

// South Africa's training-funding note (owner, 2026-11-13), in the page body as the Nigeria
// page explains the ITF. Facts as in the corporate guide skills-development-levy-training-south-africa.
export const ZA_FUNDING_GUIDE_PATH = "/corporate-guides/skills-development-levy-training-south-africa";
export const ZA_FUNDING_PARAGRAPHS: string[] = [
  "**Skills Development Levy.** Employers whose annual payroll exceeds R500,000 pay a Skills Development Levy of 1% of payroll through SARS. Most of it goes to the Sector Education and Training Authority (SETA) for your industry.",
  "**SETA grants.** If you submit your Workplace Skills Plan (WSP) and Annual Training Report (ATR) to your SETA on time, usually by 30 April, you can receive a mandatory grant of 20% of the levy you paid. You can include our programmes in both, and every learner's certificate and dated attendance record gives you the evidence. Discretionary grants are separate and follow each SETA's own criteria.",
  "**B-BBEE skills spend.** Skills development spend counts towards the skills development element of your B-BBEE scorecard. How a specific programme is recognised depends on the Codes, so ask your verification agency before you count on the points. Our programmes are practical workplace training with Paleon's own certificate of completion; they are not SETA-accredited qualifications.",
];
