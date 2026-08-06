import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 1;
const LESSON_TITLE = "The Digital Marketing Funnel";

const PLACEHOLDER_CONTENT = "Awareness, consideration, conversion, and loyalty stages explained.";

// The demo seeder (20260729020100) already inserted this lesson with placeholder
// content before the full lesson was written -- this seeder swaps it for the real
// content, mirroring the renewable-energy-digital-systems content seeders
// (20260806020000 through 20260806170000) and the earlier social-media-lesson-videos
// seeder pattern of updating already-seeded rows in place.
const FULL_CONTENT =
  'Welcome to Digital Marketing. Over the next eight weeks, this course teaches you how to plan and run genuinely effective digital marketing for a real business — not just posting content, but building a coordinated strategy across search, email, paid advertising, and analytics that actually drives measurable growth.\n\nI want to be upfront about something before we dive in: digital marketing is a genuinely broad field, and it\'s easy to feel scattered without a clear map of how all the pieces fit together. That\'s exactly what this lesson is for — building that map, so every following week has an obvious place to slot into.\n\n## The Digital Marketing Funnel\n\nAlmost every digital marketing activity exists to move a potential customer through a sequence of stages, commonly called the **marketing funnel**.\n\n**Awareness** is the stage where someone first learns a business exists — they\'ve never heard of it before, and the goal here is simply visibility. **Consideration** is the stage where someone knows the business exists and is actively comparing it against alternatives, weighing whether it\'s genuinely the right fit for them. **Conversion** is the stage where someone actually takes the desired action — a purchase, a booking, a sign-up. **Loyalty**, sometimes called retention, is the stage after that first conversion, where the goal shifts to keeping that customer engaged, satisfied, and likely to purchase again, or to refer others.\n\nWhy does this funnel matter so much? Because it\'s the single most useful lens for evaluating any marketing activity. A beautifully written blog post that never gets seen by anyone genuinely fails at the awareness stage, no matter how good the writing is. A stunning ad campaign that drives traffic to a confusing, hard-to-navigate website fails at the conversion stage, no matter how much attention it generated. Every week of this course maps onto one or more stages of this exact funnel, and we\'ll point that connection out explicitly as we go.\n\n## Bringing It Together\n\nThis lesson built the map for the rest of this course: the marketing funnel as the lens for evaluating any activity, and why every channel and tactic we\'ll cover ultimately exists to move someone through one of its stages.\n\nNext lesson surveys the major digital marketing channels themselves, where each one typically sits within this funnel, and the discipline of setting SMART goals with genuinely matching KPIs before any real work begins.';

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
