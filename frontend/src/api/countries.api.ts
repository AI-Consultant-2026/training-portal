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
