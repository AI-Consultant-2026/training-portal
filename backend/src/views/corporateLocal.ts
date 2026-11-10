import { COUNTRIES, CountryCode } from "../constants/countries";

// Local SEO for the corporate country pages (2026-11-08): the cities each page names, the
// delivery wording, and a ContactPoint shared by the AI Workflow and CyberSecure pages.

export const CITIES: Record<CountryCode, string[]> = {
  NG: ["Lagos", "Abuja", "Port Harcourt", "Warri", "Ibadan", "Kano"],
  ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Gqeberha", "Bloemfontein"],
  KE: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  GH: ["Accra", "Kumasi", "Tema", "Takoradi", "Tamale", "Cape Coast"],
};

export function cityList(code: CountryCode): string {
  const list = CITIES[code];
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
}

export function deliveryPhrase(code: CountryCode): string {
  return code === "NG" ? "in-house, live online or hybrid" : "live online with a facilitator";
}

export function areaServed(code: CountryCode): object[] {
  return [{ "@type": "Country", name: COUNTRIES[code].name }, ...CITIES[code].map((name) => ({ "@type": "City", name }))];
}

export const SALES_CONTACT = {
  "@type": "ContactPoint",
  contactType: "sales",
  email: "corporate@paleontraining.com",
  telephone: "+234-707-714-9215",
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
    "Paleon Training Limited runs corporate AI and cybersecurity training for employees of companies in Nigeria, South Africa, Kenya and Ghana: in-house in Nigeria and live online across Africa.",
  email: "corporate@paleontraining.com",
  telephone: "+234-707-714-9215",
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
