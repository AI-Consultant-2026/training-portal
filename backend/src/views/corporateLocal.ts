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
