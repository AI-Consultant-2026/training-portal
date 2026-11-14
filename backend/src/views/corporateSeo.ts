import { COUNTRIES, CountryCode } from "../constants/countries";
import { CORPORATE_PRICES, PricedProgramme, REGION_CURRENCY, formatRegionMoney } from "../constants/corporatePricing";
import { AI_CYBER_ACCELERATOR } from "../seeders/data/curriculumCorporateAccelerator";
import { AI_WORKFLOW } from "../seeders/data/curriculumCorporateAiWorkflow";
import { CYBERSECURE_WORKFORCE } from "../seeders/data/curriculumCorporateCyberSecure";

// Search titles and descriptions for the corporate pages (owner, 2026-11-14: "key phrases
// company managers and HR use to source courses"). Titles lead with the phrase buyers type
// (corporate training in <country>, cybersecurity / security awareness training for
// employees, AI training for employees, online staff training) and stay within ~60
// characters; descriptions stay within ~155 and carry the per-learner price, which is what
// makes a buyer click. Prices come from the live price table, so they never go stale.

const price = (p: PricedProgramme, code: CountryCode) => formatRegionMoney(code, CORPORATE_PRICES[p][code]);

const CYBER_LAW: Record<CountryCode, string> = { NG: "NDPA", ZA: "POPIA", KE: "the KDPA", GH: "Act 843" };

export interface Seo { title: string; description: string }

export function countryCorporateSeo(code: CountryCode): Seo {
  const country = COUNTRIES[code].name;
  const levy: Record<CountryCode, string> = { NG: " ITF-claimable.", ZA: "", KE: "", GH: "" };
  return {
    title: `Corporate Training in ${country}: Online Staff Training Courses`,
    description: `Online staff training for companies in ${country}: cybersecurity awareness and AI courses for employees, from ${price("cybersecure", code)} per learner.${levy[code]} Buy seats today.`,
  };
}

export function programmeSeo(programme: PricedProgramme, code: CountryCode): Seo {
  const country = COUNTRIES[code].name;
  if (programme === "cybersecure") {
    return {
      title:
        code === "ZA"
          ? "Security Awareness Training for Employees | South Africa"
          : `Cybersecurity Awareness Training for Employees in ${country}`,
      description: `Online ${code === "ZA" ? "security" : "cybersecurity"} awareness training for staff in ${country}: phishing, payment fraud, AI scams and ${CYBER_LAW[code]}. ${price(programme, code)} per learner; start today.`,
    };
  }
  if (programme === "ai-workflow") {
    return {
      title: `AI Training for Employees in ${country} | ChatGPT & Copilot`,
      description: `Practical AI training for employees in ${country}: ChatGPT, Copilot and Gemini on real work, used safely. Online, ${price(programme, code)} per learner, volume discounts.`,
    };
  }
  return {
    title: `AI & Cybersecurity Training for IT Teams in ${country}`,
    description: `AI security training for IT, risk and data professionals in ${country}: secure AI adoption, AI threats and governance. Online, ${price(programme, code)} per learner.`,
  };
}

export const HUB_SEO: Seo = {
  title: "Online Corporate Training for Employees | AI & Cybersecurity",
  description:
    "Online staff training for companies in Nigeria, South Africa, Kenya and Ghana: cybersecurity awareness and AI training for employees. Buy seats, start today.",
};

// ---- Course rich-result fields: the real price per learner and the real study time.
function course(p: PricedProgramme) {
  return p === "cybersecure" ? CYBERSECURE_WORKFORCE : p === "ai-workflow" ? AI_WORKFLOW : AI_CYBER_ACCELERATOR;
}

/** Total lesson time across the programme, as an ISO 8601 duration (e.g. "PT6H"). */
export function courseWorkload(p: PricedProgramme): string {
  const minutes = course(p).modules.reduce((t, m) => t + m.lessons.reduce((s, l) => s + l.durationMinutes, 0), 0);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}`;
}

export function courseOffer(p: PricedProgramme, code: CountryCode, url: string): object {
  return {
    "@type": "Offer",
    category: "Paid",
    price: CORPORATE_PRICES[p][code],
    priceCurrency: REGION_CURRENCY[code],
    url: `${url}#buy`,
    availability: "https://schema.org/InStock",
    eligibleRegion: { "@type": "Country", name: COUNTRIES[code].name },
  };
}

/** The Course "hasCourseInstance" for a self-paced online programme (never onsite). */
export function courseInstance(p: PricedProgramme, code: CountryCode): object {
  return {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: courseWorkload(p),
    location: { "@type": "Country", name: COUNTRIES[code].name },
  };
}
