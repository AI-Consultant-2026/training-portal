import { BriefSpec, BuiltBrief, buildBrief, buildCapstoneBrief } from "./briefBuilder";
import { CAPSTONE_SPECS } from "./capstones";
import { CYBER_WEEKS_1_TO_6 } from "./cyberSecurityWeeks01to06";
import { CYBER_WEEKS_7_TO_12 } from "./cyberSecurityWeeks07to12";
import { CYBER_WEEKS_13_TO_18 } from "./cyberSecurityWeeks13to18";
import { DIGITAL_MARKETING_WEEKS } from "./digitalMarketingWeeks";
import { GIS_WEEKS } from "./gisWeeks";
import { HSE_WEEKS } from "./hseWeeks";

// Course slug -> week number -> brief spec, for the four live courses.
const ASSIGNMENT_SPECS: Record<string, Record<number, BriefSpec>> = {
  "cyber-security-fundamentals": {
    ...CYBER_WEEKS_1_TO_6,
    ...CYBER_WEEKS_7_TO_12,
    ...CYBER_WEEKS_13_TO_18,
  },
  "digital-marketing": DIGITAL_MARKETING_WEEKS,
  "gis-and-drone-mapping": GIS_WEEKS,
  "hse-fundamentals": HSE_WEEKS,
};

export const ASSIGNMENT_BRIEFS: Record<string, Record<number, BuiltBrief>> = Object.fromEntries(
  Object.entries(ASSIGNMENT_SPECS).map(([slug, weeks]) => [
    slug,
    Object.fromEntries(Object.entries(weeks).map(([week, spec]) => [Number(week), buildBrief(spec)])),
  ]),
);

export const CAPSTONE_BRIEFS: Record<string, BuiltBrief> = Object.fromEntries(
  Object.entries(CAPSTONE_SPECS).map(([slug, spec]) => [slug, buildCapstoneBrief(spec)]),
);
