import { COURSE_PRICES_NGN } from "./coursePricing";

// The four live public courses, as the lead-nurture emails describe them (2026-09-25).
// Leads store the course *title* (the homepage Career Match and the older lead form both
// send the title), so emails look a lead's course up here by title. Keep in sync with the
// course pages in marketing/*-course.html and the match rules in marketing/welcome.js.
export interface PublicCourse {
  slug: string;
  title: string;
  days: number;
  lessons: number;
  // Four short curriculum highlights, from the course page's "What you'll learn" table.
  highlights: string[];
}

export const PUBLIC_COURSES: PublicCourse[] = [
  {
    slug: "cyber-security-fundamentals",
    title: "Cyber Security Fundamentals",
    days: 18,
    lessons: 36,
    highlights: [
      "Cyber threats, vulnerabilities and thinking in risk",
      "Network security: firewalls, monitoring and secure access",
      "Phishing, social engineering, malware and ransomware",
      "Incident response, plus dedicated Oil & Gas, Banking and Telecoms pathways",
    ],
  },
  {
    slug: "gis-and-drone-mapping",
    title: "GIS and Drone Mapping",
    days: 9,
    lessons: 18,
    highlights: [
      "GIS fundamentals, coordinate systems and map projections in QGIS",
      "Remote sensing, satellite data and change detection",
      "Drone flight planning, photogrammetry, orthomosaics and 3D mapping",
      "How GIS is applied across oil & gas, banking, telecoms and infrastructure",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    days: 8,
    lessons: 16,
    highlights: [
      "The digital marketing funnel, audience research and channel strategy",
      "On-page, off-page and local SEO",
      "Google Ads, content marketing and email campaigns",
      "Analytics, attribution and measuring marketing ROI",
    ],
  },
  {
    slug: "hse-fundamentals",
    title: "HSE Fundamentals",
    days: 8,
    lessons: 16,
    highlights: [
      "Hazard identification and risk assessment on oil & gas sites",
      "HSE regulations and international standards",
      "PPE, permit to work and emergency response",
      "Incident investigation, environmental management and HSE careers",
    ],
  },
];

export function findPublicCourseByTitle(title: string): PublicCourse | null {
  const wanted = title.trim().toLowerCase();
  return PUBLIC_COURSES.find((c) => c.title.toLowerCase() === wanted) ?? null;
}

export function coursePriceNgn(course: PublicCourse): number | null {
  return COURSE_PRICES_NGN[course.slug] ?? null;
}
