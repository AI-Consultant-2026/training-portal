// Countries Paleon sells into (2026-10-29: Ghana, Kenya and South Africa added beside
// Nigeria). Stored on users and leads as the ISO code. The register page gets this list
// from GET /api/countries, so there is no second copy in the frontend to keep in sync.
//
// Courses are still paid for in Naira on Paystack for every country. A local price or
// local payment link (cedi, shilling, rand, mobile money) needs a Paystack/Flutterwave
// account that can take that currency -- add it here once one exists.
export const NIGERIA_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Nigeria",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
] as const;

export const COUNTRY_CODES = ["NG", "GH", "KE", "ZA"] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];

export interface CountryInfo {
  code: CountryCode;
  name: string;
  /** Label for the location <select> on the register page. */
  regionLabel: string;
  regions: readonly string[];
  phonePlaceholder: string;
  /** Local currency, shown on the payment page as a reminder that the bank converts. */
  currencyName: string;
}

export const COUNTRIES: Record<CountryCode, CountryInfo> = {
  NG: {
    code: "NG",
    name: "Nigeria",
    regionLabel: "State",
    regions: NIGERIA_STATES,
    phonePlaceholder: "e.g. 0803 123 4567",
    currencyName: "Naira",
  },
  GH: {
    code: "GH",
    name: "Ghana",
    regionLabel: "Region",
    regions: [
      "Ahafo",
      "Ashanti",
      "Bono",
      "Bono East",
      "Central",
      "Eastern",
      "Greater Accra",
      "North East",
      "Northern",
      "Oti",
      "Savannah",
      "Upper East",
      "Upper West",
      "Volta",
      "Western",
      "Western North",
    ],
    phonePlaceholder: "e.g. +233 24 123 4567",
    currencyName: "cedis",
  },
  KE: {
    code: "KE",
    name: "Kenya",
    regionLabel: "County",
    regions: [
      "Baringo",
      "Bomet",
      "Bungoma",
      "Busia",
      "Elgeyo-Marakwet",
      "Embu",
      "Garissa",
      "Homa Bay",
      "Isiolo",
      "Kajiado",
      "Kakamega",
      "Kericho",
      "Kiambu",
      "Kilifi",
      "Kirinyaga",
      "Kisii",
      "Kisumu",
      "Kitui",
      "Kwale",
      "Laikipia",
      "Lamu",
      "Machakos",
      "Makueni",
      "Mandera",
      "Marsabit",
      "Meru",
      "Migori",
      "Mombasa",
      "Murang'a",
      "Nairobi",
      "Nakuru",
      "Nandi",
      "Narok",
      "Nyamira",
      "Nyandarua",
      "Nyeri",
      "Samburu",
      "Siaya",
      "Taita-Taveta",
      "Tana River",
      "Tharaka-Nithi",
      "Trans Nzoia",
      "Turkana",
      "Uasin Gishu",
      "Vihiga",
      "Wajir",
      "West Pokot",
    ],
    phonePlaceholder: "e.g. +254 712 345 678",
    currencyName: "shillings",
  },
  ZA: {
    code: "ZA",
    name: "South Africa",
    regionLabel: "Province",
    regions: [
      "Eastern Cape",
      "Free State",
      "Gauteng",
      "KwaZulu-Natal",
      "Limpopo",
      "Mpumalanga",
      "North West",
      "Northern Cape",
      "Western Cape",
    ],
    phonePlaceholder: "e.g. +27 82 123 4567",
    currencyName: "rand",
  },
};

// Every location the register form can send, across all countries -- the z.enum for
// location, with isRegionOf then checking it belongs to the chosen country.
export const ALL_LOCATIONS = Object.values(COUNTRIES).flatMap((c) => c.regions) as [string, ...string[]];

export function isCountryCode(value: unknown): value is CountryCode {
  return typeof value === "string" && (COUNTRY_CODES as readonly string[]).includes(value);
}

export function isRegionOf(country: CountryCode, location: string): boolean {
  return COUNTRIES[country].regions.includes(location);
}
