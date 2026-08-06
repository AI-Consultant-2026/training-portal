import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 2;
const LESSON_TITLE = "Real-World Solar Efficiency Factors";

const PLACEHOLDER_CONTENT =
  "Temperature, shading, dust accumulation, and panel angle all affect how much power a solar array actually produces compared to its rated specifications.";

// Same pattern as 20260806020000/20260806030000 for week 1 -- this lesson was already
// inserted (with placeholder content) by 20260731010000-full-curriculum-modules-lessons.ts,
// so this seeder updates the already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last week built the foundational vocabulary of energy and surveyed the renewable landscape, with solar as the practical choice for this region. This week begins Module 2 and the real, practical work of solar system design, starting with a genuinely essential question: how much of a panel\'s rated performance actually shows up in real-world conditions?\n\n## Why Rated Specifications Aren\'t the Whole Story\n\nRecall from last week that PV cells convert sunlight into electricity, with efficiency indicating what percentage of that available solar energy actually becomes genuinely usable electrical power. A panel\'s rated efficiency is measured under standardized, controlled laboratory conditions — but real installations sit on real roofs, in real weather, and several everyday factors meaningfully affect how much of that rated performance actually shows up in practice.\n\n## Temperature\n\n**Temperature** genuinely matters more than most beginners expect: PV panels actually lose some efficiency as they get hotter. That means a panel\'s rated performance, typically measured under cooler laboratory conditions, may differ meaningfully from its actual real-world output on a genuinely hot afternoon here in the State. This is a real, physical property of the semiconductor material itself, not a manufacturing defect — every panel design has to account for it.\n\n## Shading\n\n**Shading** significantly affects performance, since even a comparatively small amount of shade falling across just part of a panel can disproportionately reduce that panel\'s total output, sometimes far more than the shaded area\'s simple physical proportion would suggest. A single tree branch or nearby structure casting a small shadow across one corner of a panel can meaningfully cut its output, which is exactly why site assessment for shading — not just at midday, but across the full course of the day — matters so much before any installation begins.\n\n## Dust and Dirt Accumulation\n\n**Dust and dirt accumulation** gradually reduces performance over time, which is exactly why regular, routine panel cleaning is a genuinely real, ongoing maintenance consideration in dusty environments, not merely a cosmetic concern. Left unaddressed, this kind of gradual buildup can meaningfully erode a system\'s actual output over months, well before any component actually fails.\n\n## Panel Angle and Orientation\n\n**Panel angle and orientation** also matter considerably: panels perform best when positioned to directly face the sun as closely as possible throughout the day, which is why proper installation angle, ideally matched reasonably closely to a location\'s specific latitude, genuinely affects total overall system output. A poorly angled installation can underperform a well-angled one using the exact same panels and equipment.\n\n## Bringing It Together\n\nThis lesson covered four practical factors — temperature, shading, dust accumulation, and panel angle — that separate a panel\'s rated specification from its genuine real-world output. Understanding these isn\'t just theoretical: they directly shape site assessment, installation decisions, and the realistic output estimates you\'ll need for accurate system design.\n\nNext lesson turns to the three fundamental system architectures — grid-tied, off-grid, and hybrid — and how to assess a location\'s actual solar resource using peak sun hour data.';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const [rows] = await queryInterface.sequelize.query(
      `SELECT l.id AS lesson_id
       FROM lessons l
       JOIN modules m ON m.id = l.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
    const row = (rows as { lesson_id: string }[])[0];
    if (!row) {
      throw new Error(`Could not find lesson "${LESSON_TITLE}" (week ${WEEK_NUMBER}) for ${COURSE_SLUG}`);
    }

    await queryInterface.sequelize.query(`UPDATE lessons SET content = ? WHERE id = ?`, {
      replacements: [FULL_CONTENT, row.lesson_id],
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [PLACEHOLDER_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },
};
