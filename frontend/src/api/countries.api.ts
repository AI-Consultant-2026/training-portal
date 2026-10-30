import { axiosClient } from "./axiosClient";

// Mirrors backend/src/constants/countries.ts's CountryInfo, which is the one real copy.
export interface CountryInfo {
  code: string;
  name: string;
  regionLabel: string;
  regions: string[];
  phonePlaceholder: string;
  currencyName: string;
}

export interface CountriesResponse {
  /** The visitor's country from their IP, when it's one Paleon sells to. */
  detected: string | null;
  countries: CountryInfo[];
}

export async function fetchCountries(): Promise<CountriesResponse> {
  const { data } = await axiosClient.get<CountriesResponse>("/countries");
  return data;
}

// Short names for admin tables, where fetching the full list just to label a column
// would be overkill. Unknown codes are shown as-is.
const COUNTRY_NAMES: Record<string, string> = { NG: "Nigeria", GH: "Ghana", KE: "Kenya", ZA: "South Africa" };

export function countryName(code: string | null | undefined): string {
  if (!code) return "Nigeria";
  return COUNTRY_NAMES[code] ?? code;
}

// Nigerian numbers are usually written in local form (0801...); WhatsApp's click-to-chat
// links need the full international digits with no leading 0. Falls back to stripping
// symbols only for anything that doesn't look like that shape, rather than guessing.
// A number written locally (leading 0) gets the lead's own country's dialling code.
const DIAL_CODES: Record<string, string> = { NG: "234", GH: "233", KE: "254", ZA: "27" };

export function toWhatsAppLink(phone: string, country: string): string {
  const digits = phone.replace(/\D/g, "");
  const withCountryCode = digits.startsWith("0") ? `${DIAL_CODES[country] ?? "234"}${digits.slice(1)}` : digits;
  return `https://wa.me/${withCountryCode}`;
}
