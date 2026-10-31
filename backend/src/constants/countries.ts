import { config } from "../config";
import { COURSE_PRICES_NGN, INSTALMENT_DEPOSIT_NGN } from "./coursePricing";

// Countries Paleon sells into (2026-10-29: Ghana, Kenya and South Africa added beside
// Nigeria). Stored on users and leads as the ISO code. The register page gets this list
// from GET /api/countries, so there is no second copy in the frontend to keep in sync.
//
// Each country's entry also carries `site`: everything the country homepages (/ng, /za,
// /ke, /gh and the hub at /) and Paystack checkout need to know about that market
// (2026-10-30). Adding a country later is one entry here plus its code in COUNTRY_CODES.
// Anything not yet confirmed is a tbc("...") marker: the pages show it as a visible
// highlighted placeholder, and listTbcValues() lists them all.
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

// The order the site lists countries in (header menu, hero cards, footer).
export const MARKET_ORDER: readonly CountryCode[] = ["NG", "ZA", "KE", "GH"];

// A value nobody has confirmed yet. Rendered as a highlighted "[TBC: ...]" on the pages.
export const TBC_PREFIX = "[TBC: ";
export function tbc(what: string): string {
  return `${TBC_PREFIX}${what}]`;
}
export function isTbc(value: string | null | undefined): boolean {
  return typeof value === "string" && value.includes(TBC_PREFIX);
}

// The courses on the homepage, by slug (see coursePricing.ts and the courses table).
export const HOMEPAGE_COURSES = [
  "cyber-security-fundamentals",
  "gis-and-drone-mapping",
  "digital-marketing",
  "hse-fundamentals",
  "ai-machine-learning-fundamentals",
] as const;
export type HomepageCourse = (typeof HOMEPAGE_COURSES)[number];

export interface CountrySite {
  /** URL folder for this country's pages, e.g. "/ng". */
  path: string;
  /** hreflang / html lang value. */
  locale: string;
  /** "coming_soon" = waitlist only: no checkout buttons on the country pages. */
  status: "live" | "coming_soon";
  currency: { code: string; symbol: string; /** "KSh 1,000" rather than "KSh1,000". */ spaced: boolean };
  /** Hero: "Digital skills built for careers in {headlineIndustries}". */
  headlineIndustries: string;
  /** Full course fee per course, in the local currency; null = not set yet. */
  coursePrices: Record<HomepageCourse, number> | null;
  /** The "start any course for ..." deposit; null = not set yet. */
  deposit: number | null;
  paymentMethods: string;
  /** Local laws each course covers; null = the course card shows no law line. */
  laws: { cyber: string; hse: string };
  /** Industry pathways shown on each course card. */
  pathways: Record<HomepageCourse, string>;
  /** Career Match "industry" options, each with the course it points to when the visitor isn't sure about the work. */
  industryOptions: readonly { label: string; course: HomepageCourse }[];
  /** First option in the Career Match "How did you hear about us?" list. */
  nationalServiceOption: string;
  referralReward: string;
  /** Ambassador page amounts outside Nigeria (Nigeria's are in constants/referral.ts): what
   * the ambassador earns per paid referral and the friend's airtime welcome reward. The
   * friend's reward is 3/5 of the ambassador's, as in Nigeria (\u20A63,000 to \u20A65,000). */
  ambassadorRewards?: { referrer: number; referee: number };
  graduateStat: { figure: string; text: string; source: string };
  whatsapp: { display: string; link: string };
  whatsappPlaceholder: string;
  corporateTraining: { label: string; href: string };
  /** Share image (1200x630) under /images/og/. */
  ogImage: string;
  /** Env var holding this country's Paystack secret key (each country is its own Paystack account). */
  paystackSecretKeyEnv: string;
  /** Who takes the payment once the country is live (2026-10-30). */
  gateway: "paystack" | "flutterwave";
  /** Flutterwave's payment_options for this country's checkout (only when gateway is flutterwave). */
  flutterwavePaymentOptions?: string;
}

export interface CountryInfo {
  code: CountryCode;
  name: string;
  /** Label for the location <select> on the register page. */
  regionLabel: string;
  regions: readonly string[];
  phonePlaceholder: string;
  /** Local currency, shown on the payment page as a reminder that the bank converts. */
  currencyName: string;
  site: CountrySite;
}

export const COUNTRIES: Record<CountryCode, CountryInfo> = {
  NG: {
    code: "NG",
    name: "Nigeria",
    regionLabel: "State",
    regions: NIGERIA_STATES,
    phonePlaceholder: "e.g. 0803 123 4567",
    currencyName: "Naira",
    site: {
      path: "/ng",
      locale: "en-NG",
      status: "live",
      currency: { code: "NGN", symbol: "\u20A6", spaced: false },
      headlineIndustries: "Oil & Gas, Banking and Telecoms",
      // Nigeria's fees and deposit live in coursePricing.ts (the checkout reads them there),
      // so the two can never drift.
      coursePrices: {
        "cyber-security-fundamentals": COURSE_PRICES_NGN["cyber-security-fundamentals"],
        "gis-and-drone-mapping": COURSE_PRICES_NGN["gis-and-drone-mapping"],
        "digital-marketing": COURSE_PRICES_NGN["digital-marketing"],
        "hse-fundamentals": COURSE_PRICES_NGN["hse-fundamentals"],
        "ai-machine-learning-fundamentals": COURSE_PRICES_NGN["ai-machine-learning-fundamentals"],
      },
      deposit: INSTALMENT_DEPOSIT_NGN,
      paymentMethods: "Card \u00b7 Bank transfer \u00b7 USSD",
      laws: { cyber: "Nigeria Data Protection Act 2023", hse: "Factories Act 2004 \u00b7 Employee\u2019s Compensation Act 2010" },
      pathways: {
        "cyber-security-fundamentals": "Oil & Gas \u00b7 Banking \u00b7 Telecoms",
        "gis-and-drone-mapping": "Oil & Gas \u00b7 Telecoms \u00b7 Construction",
        "digital-marketing": "Banking \u00b7 Telecoms \u00b7 SMEs",
        "hse-fundamentals": "Oil & Gas \u00b7 Construction",
        "ai-machine-learning-fundamentals": "Banking \u00b7 Telecoms \u00b7 Oil & Gas",
      },
      // Same three values (and course mapping) the Nigerian Career Match has always used.
      industryOptions: [
        { label: "Oil & Gas", course: "hse-fundamentals" },
        { label: "Banking", course: "cyber-security-fundamentals" },
        { label: "Telecoms", course: "cyber-security-fundamentals" },
      ],
      nationalServiceOption: "NYSC Camp",
      referralReward: "\u20A65,000 in airtime, data or course credit",
      graduateStat: {
        figure: "500,000",
        text: "Nigeria produces approximately 500,000 university graduates every year. Practical skills and a real project you can show an employer help you stand out.",
        source: "Source: Nigerian University System, National Universities Commission (NUC)",
      },
      whatsapp: { display: "+44 7508 823495", link: "https://wa.me/447508823495" },
      whatsappPlaceholder: "e.g. 0803 123 4567",
      corporateTraining: { label: "Corporate training for Nigerian employers", href: "/executive-training" },
      ogImage: "/images/og/welcome.jpg",
      paystackSecretKeyEnv: "PAYSTACK_SECRET_KEY_NG",
      gateway: "paystack",
    },
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
    site: {
      path: "/gh",
      locale: "en-GH",
      status: "coming_soon",
      currency: { code: "GHS", symbol: "GH\u20B5", spaced: false },
      headlineIndustries: "Oil & Gas, Mining and Banking",
      coursePrices: {
        "cyber-security-fundamentals": 1750,
        "gis-and-drone-mapping": 1750,
        "digital-marketing": 1300,
        "hse-fundamentals": 865,
        // 2026-10-31: 300,000 NGN at the same rate as the other fees here; owner to confirm.
        "ai-machine-learning-fundamentals": 2625,
      },
      deposit: 175,
      paymentMethods: "MTN MoMo \u00b7 Telecel Cash \u00b7 Card",
      laws: { cyber: "Data Protection Act 2012 (Act 843)", hse: "Factories, Offices and Shops Act 1970 (Act 328) \u00b7 Labour Act 2003 (Act 651)" },
      pathways: {
        "cyber-security-fundamentals": "Banking \u00b7 Telecoms \u00b7 Oil & Gas",
        "gis-and-drone-mapping": "Mining \u00b7 Oil & Gas \u00b7 Cocoa & agriculture",
        "digital-marketing": "Banking \u00b7 Telecoms \u00b7 SMEs",
        "hse-fundamentals": "Mining \u00b7 Oil & Gas",
        "ai-machine-learning-fundamentals": "Banking \u00b7 Mining \u00b7 Agriculture",
      },
      industryOptions: [
        { label: "Oil & Gas", course: "hse-fundamentals" },
        { label: "Mining", course: "hse-fundamentals" },
        { label: "Banking", course: "cyber-security-fundamentals" },
        { label: "Cocoa & Agriculture", course: "gis-and-drone-mapping" },
      ],
      nationalServiceOption: "National Service (NSS)",
      referralReward: "GH\u20B545 in airtime, data or course credit",
      ambassadorRewards: { referrer: 45, referee: 27 },
      graduateStat: {
        figure: "109,874",
        text: "Ghana produces 109,874 university graduates a year. Practical skills and a real project you can show an employer help you stand out.",
        source: "Source: Ghana\u2019s Education Sector Report (2025)",
      },
      whatsapp: { display: "+44 7508 823495", link: "https://wa.me/447508823495" },
      whatsappPlaceholder: "e.g. +233 24 123 4567",
      corporateTraining: { label: "Corporate training for Ghanaian employers", href: "mailto:corporate@paleontraining.com" },
      ogImage: "/images/og/ghana.jpg",
      paystackSecretKeyEnv: "PAYSTACK_SECRET_KEY_GH",
      gateway: "flutterwave",
      flutterwavePaymentOptions: "card,mobilemoneyghana",
    },
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
    site: {
      path: "/ke",
      locale: "en-KE",
      status: "coming_soon",
      currency: { code: "KES", symbol: "KSh", spaced: true },
      headlineIndustries: "Telecoms, Fintech and Energy",
      coursePrices: {
        "cyber-security-fundamentals": 19300,
        "gis-and-drone-mapping": 19300,
        "digital-marketing": 14475,
        "hse-fundamentals": 9650,
        // 2026-10-31: 300,000 NGN at the same rate as the other fees here; owner to confirm.
        "ai-machine-learning-fundamentals": 28950,
      },
      deposit: 1930,
      paymentMethods: "M-Pesa \u00b7 Card",
      laws: { cyber: "Data Protection Act 2019", hse: "Occupational Safety and Health Act 2007" },
      pathways: {
        "cyber-security-fundamentals": "Fintech & mobile money \u00b7 Telecoms \u00b7 Banking",
        "gis-and-drone-mapping": "Agriculture \u00b7 Energy \u00b7 Infrastructure",
        "digital-marketing": "Fintech \u00b7 Retail \u00b7 SMEs",
        "hse-fundamentals": "Energy \u00b7 Construction",
        "ai-machine-learning-fundamentals": "Fintech \u00b7 Agriculture \u00b7 Energy",
      },
      industryOptions: [
        { label: "Telecoms", course: "cyber-security-fundamentals" },
        { label: "Fintech & mobile money", course: "cyber-security-fundamentals" },
        { label: "Energy", course: "hse-fundamentals" },
        { label: "Agriculture", course: "gis-and-drone-mapping" },
      ],
      nationalServiceOption: "National Youth Service (NYS)",
      referralReward: "KSh 480 in airtime, data or course credit",
      ambassadorRewards: { referrer: 480, referee: 288 },
      graduateStat: {
        figure: "124,912",
        text: "Kenya produces 124,912 university graduates a year. Practical skills and a real project you can show an employer help you stand out.",
        source: "Source: Commission for University Education",
      },
      whatsapp: { display: "+44 7508 823495", link: "https://wa.me/447508823495" },
      whatsappPlaceholder: "e.g. +254 712 345 678",
      corporateTraining: { label: "Corporate training for Kenyan employers", href: "mailto:corporate@paleontraining.com" },
      ogImage: "/images/og/kenya.jpg",
      paystackSecretKeyEnv: "PAYSTACK_SECRET_KEY_KE",
      gateway: "flutterwave",
      flutterwavePaymentOptions: "card,mpesa",
    },
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
    site: {
      path: "/za",
      locale: "en-ZA",
      status: "coming_soon",
      currency: { code: "ZAR", symbol: "R", spaced: false },
      headlineIndustries: "Mining, Banking and Telecoms",
      coursePrices: {
        "cyber-security-fundamentals": 2470,
        "gis-and-drone-mapping": 2470,
        "digital-marketing": 1850,
        "hse-fundamentals": 1235,
        // 2026-10-31: 300,000 NGN at the same rate as the other fees here; owner to confirm.
        "ai-machine-learning-fundamentals": 3705,
      },
      deposit: 247,
      paymentMethods: "Card \u00b7 EFT",
      laws: { cyber: "POPIA", hse: "OHS Act \u00b7 Mine Health and Safety Act" },
      pathways: {
        "cyber-security-fundamentals": "Banking \u00b7 Telecoms \u00b7 Mining",
        "gis-and-drone-mapping": "Mining \u00b7 Infrastructure \u00b7 Environment",
        "digital-marketing": "Retail \u00b7 Fintech \u00b7 SMEs",
        "hse-fundamentals": "Mining \u00b7 Construction",
        "ai-machine-learning-fundamentals": "Banking \u00b7 Mining \u00b7 Retail",
      },
      industryOptions: [
        { label: "Mining", course: "hse-fundamentals" },
        { label: "Banking & Insurance", course: "cyber-security-fundamentals" },
        { label: "Telecoms", course: "cyber-security-fundamentals" },
      ],
      nationalServiceOption: "University / TVET college",
      referralReward: "R60 in airtime, data or course credit",
      ambassadorRewards: { referrer: 60, referee: 36 },
      graduateStat: {
        figure: "220,758",
        text: "South Africa produces 220,758 university graduates a year. Practical skills and a real project you can show an employer help you stand out.",
        source: "Source: Department of Higher Education and Training (DHET)",
      },
      whatsapp: { display: "+44 7508 823495", link: "https://wa.me/447508823495" },
      whatsappPlaceholder: "e.g. +27 82 123 4567",
      corporateTraining: { label: "Corporate training for South African employers", href: "mailto:corporate@paleontraining.com" },
      ogImage: "/images/og/south-africa.jpg",
      paystackSecretKeyEnv: "PAYSTACK_SECRET_KEY_ZA",
      gateway: "flutterwave",
      flutterwavePaymentOptions: "card",
    },
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

export function isLive(country: CountryCode): boolean {
  return COUNTRIES[country].site.status === "live" || config.liveCountries.includes(country);
}

/** The country whose folder is `path` ("/ke" -> "KE"), or null. */
export function countryForPath(path: string): CountryCode | null {
  return MARKET_ORDER.find((code) => COUNTRIES[code].site.path === path) ?? null;
}

/** "\u20A6200,000", "KSh 1,500"; a TBC marker when the amount isn't set. */
export function formatMoney(country: CountryCode, amount: number | null | undefined, what = "amount"): string {
  const { currency } = COUNTRIES[country].site;
  if (amount === null || amount === undefined) return tbc(`${currency.code} ${what}`);
  return `${currency.symbol}${currency.spaced ? " " : ""}${amount.toLocaleString("en-GB")}`;
}

export function coursePriceLabel(country: CountryCode, course: HomepageCourse): string {
  return formatMoney(country, COUNTRIES[country].site.coursePrices?.[course], "course fee");
}

export function depositLabel(country: CountryCode): string {
  return formatMoney(country, COUNTRIES[country].site.deposit, "deposit");
}

/** Every unconfirmed value in the config, as "Kenya: referralReward = [TBC: ...]". */
export function listTbcValues(): string[] {
  const out: string[] = [];
  const walk = (country: string, key: string, value: unknown) => {
    if (typeof value === "string") {
      if (isTbc(value)) out.push(`${country}: ${key} = ${value}`);
    } else if (value === null) {
      out.push(`${country}: ${key} = not set`);
    } else if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) walk(country, key ? `${key}.${k}` : k, v);
    }
  };
  for (const code of MARKET_ORDER) walk(COUNTRIES[code].name, "", COUNTRIES[code].site);
  return out;
}
