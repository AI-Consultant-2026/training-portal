import { COUNTRIES, CountryCode, HOMEPAGE_COURSES, HomepageCourse, formatMoney } from "../constants/countries";
import { AppSetting } from "../models";
import { PUBLIC_COURSES } from "../constants/publicCourses";
import { ApiError } from "../utils/ApiError";

// University group places (2026-11-15). A university buys places on the graduate courses
// (the five on /ng, /za, /ke and /gh) for its students, at the course fee in the
// university's country, less a group discount worked out on each course separately.
//
// Paleon sets the group discount in /admin (University discounts): a list of tiers, stored
// in app_settings under GROUP_DISCOUNT_KEY. Paleon can also agree a percentage with one
// university (corporate_clients.discount_percent); that university then gets whichever is
// bigger, its agreed percentage or the tier for the number of places.

export const GROUP_DISCOUNT_KEY = "university_group_discounts";

export interface DiscountTier {
  /** Fewest learners on one course for this discount. */
  minLearners: number;
  /** Percent off the course fee. */
  percent: number;
}

/** The owner's tiers (2026-11-15): 10% for 10-49 learners, 20% for 50-199, 30% for 200+. */
export const DEFAULT_TIERS: DiscountTier[] = [
  { minLearners: 10, percent: 10 },
  { minLearners: 50, percent: 20 },
  { minLearners: 200, percent: 30 },
];

export const MAX_DISCOUNT_PERCENT = 90;
export const MAX_UNIVERSITY_SEATS = 20000;
export const UNIVERSITY_COURSES: readonly HomepageCourse[] = HOMEPAGE_COURSES;

export function courseTitle(slug: HomepageCourse): string {
  return PUBLIC_COURSES.find((c) => c.slug === slug)?.title ?? slug;
}

export function isUniversityCourse(slug: unknown): slug is HomepageCourse {
  return typeof slug === "string" && (UNIVERSITY_COURSES as readonly string[]).includes(slug);
}

/** Checks and sorts a tier list; throws a 400 explaining what is wrong. */
export function normaliseTiers(input: unknown): DiscountTier[] {
  if (!Array.isArray(input) || input.length > 10) {
    throw ApiError.badRequest("Give between 0 and 10 discount tiers");
  }
  const tiers = input.map((t) => {
    const minLearners = Number((t as DiscountTier)?.minLearners);
    const percent = Number((t as DiscountTier)?.percent);
    if (!Number.isInteger(minLearners) || minLearners < 2 || minLearners > MAX_UNIVERSITY_SEATS) {
      throw ApiError.badRequest(`Each tier needs a whole number of learners from 2 to ${MAX_UNIVERSITY_SEATS}`);
    }
    if (!Number.isInteger(percent) || percent < 0 || percent > MAX_DISCOUNT_PERCENT) {
      throw ApiError.badRequest(`Each discount must be a whole percentage from 0 to ${MAX_DISCOUNT_PERCENT}`);
    }
    return { minLearners, percent };
  });
  tiers.sort((a, b) => a.minLearners - b.minLearners);
  for (let i = 1; i < tiers.length; i++) {
    if (tiers[i].minLearners === tiers[i - 1].minLearners) {
      throw ApiError.badRequest(`Two tiers start at ${tiers[i].minLearners} learners`);
    }
    if (tiers[i].percent < tiers[i - 1].percent) {
      throw ApiError.badRequest("A bigger group can't get a smaller discount: check the percentages go up");
    }
  }
  return tiers;
}

export async function getGroupDiscountTiers(): Promise<DiscountTier[]> {
  const row = await AppSetting.findByPk(GROUP_DISCOUNT_KEY);
  if (!row) return DEFAULT_TIERS;
  try {
    return normaliseTiers(row.value);
  } catch {
    return DEFAULT_TIERS;
  }
}

export async function setGroupDiscountTiers(input: unknown): Promise<DiscountTier[]> {
  const tiers = normaliseTiers(input);
  await AppSetting.upsert({ key: GROUP_DISCOUNT_KEY, value: tiers });
  return tiers;
}

/** The tier percentage for this many learners on one course. */
export function tierPercent(seats: number, tiers: DiscountTier[]): number {
  let percent = 0;
  for (const t of tiers) if (seats >= t.minLearners) percent = t.percent;
  return percent;
}

/** "10–49 learners", "200+ learners". */
export function tierLabel(tiers: DiscountTier[], index: number): string {
  const t = tiers[index];
  const next = tiers[index + 1];
  return next ? `${t.minLearners}–${next.minLearners - 1} learners` : `${t.minLearners}+ learners`;
}

export function listPrice(country: CountryCode, slug: HomepageCourse): number {
  const price = COUNTRIES[country].site.coursePrices?.[slug];
  if (!price) throw ApiError.badRequest(`There is no course fee for ${courseTitle(slug)} in ${COUNTRIES[country].name} yet`);
  return price;
}

export interface UniversityQuoteLine {
  courseSlug: HomepageCourse;
  courseTitle: string;
  seats: number;
  listUnitPrice: number;
  unitPrice: number;
  discountPercent: number;
  total: number;
}

export interface UniversityQuote {
  country: CountryCode;
  currency: string;
  lines: UniversityQuoteLine[];
  seats: number;
  listTotal: number;
  total: number;
  /** Overall saving, for the order row and emails. */
  discountPercent: number;
}

/**
 * Prices a university order. Each course is discounted on its own number of places;
 * `agreedPercent` is a discount Paleon agreed with this university (null = tiers only).
 */
export function quoteUniversityOrder(
  country: CountryCode,
  lines: { courseSlug: string; seats: number }[],
  tiers: DiscountTier[],
  agreedPercent: number | null = null,
): UniversityQuote {
  const merged = new Map<HomepageCourse, number>();
  for (const line of lines) {
    if (!isUniversityCourse(line.courseSlug)) throw ApiError.badRequest("Choose one of the graduate courses");
    if (!Number.isInteger(line.seats) || line.seats < 0) throw ApiError.badRequest("Enter a whole number of places");
    merged.set(line.courseSlug, (merged.get(line.courseSlug) ?? 0) + line.seats);
  }
  const quoted = [...merged.entries()]
    .filter(([, seats]) => seats > 0)
    .map(([courseSlug, seats]) => {
      const listUnitPrice = listPrice(country, courseSlug);
      const discountPercent = Math.max(tierPercent(seats, tiers), agreedPercent ?? 0);
      const unitPrice = Math.round(listUnitPrice * (1 - discountPercent / 100));
      return {
        courseSlug,
        courseTitle: courseTitle(courseSlug),
        seats,
        listUnitPrice,
        unitPrice,
        discountPercent,
        total: unitPrice * seats,
      };
    });
  if (quoted.length === 0) throw ApiError.badRequest("Enter the number of places on at least one course");
  const seats = quoted.reduce((s, l) => s + l.seats, 0);
  if (seats > MAX_UNIVERSITY_SEATS) throw ApiError.badRequest(`For more than ${MAX_UNIVERSITY_SEATS} places, email corporate@paleontraining.com`);
  const listTotal = quoted.reduce((s, l) => s + l.listUnitPrice * l.seats, 0);
  const total = quoted.reduce((s, l) => s + l.total, 0);
  return {
    country,
    currency: COUNTRIES[country].site.currency.code,
    lines: quoted,
    seats,
    listTotal,
    total,
    discountPercent: listTotal ? Math.round((1 - total / listTotal) * 100) : 0,
  };
}

export function money(country: CountryCode, amount: number): string {
  return formatMoney(country, amount);
}
