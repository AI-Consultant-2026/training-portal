import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 2;
const LESSON_TITLE = "Building a Channel Strategy";

const PLACEHOLDER_CONTENT =
  "Turning persona and competitive research into a deliberate decision about which channels genuinely deserve real investment.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered how to build genuinely detailed buyer personas, and how competitive analysis and market research ground a strategy in real, external reality. This lesson brings those two inputs together into an actual, deliberate decision.\n\n## Building a Channel Strategy\n\nNow we bring personas and competitive research together into an actual, deliberate decision: which specific channels, from everything we surveyed last week, genuinely deserve real investment for this particular business.\n\nThis decision should be driven by a few consistent questions. Where does the buyer persona actually spend time and attention when solving their specific problem — if they turn first to a search engine, SEO and paid search deserve serious priority; if they rely heavily on word-of-mouth and community trust, content and email nurturing may matter more. What\'s currently underserved by competitors, representing a genuine opportunity rather than a crowded, expensive fight for the exact same limited attention. And realistically, what resources — time, budget, in-house skill — does this specific business actually have available to execute well, since a channel strategy that looks great on paper but can\'t genuinely be executed with real consistency delivers little actual value.\n\nI want to emphasize something that will save you real wasted effort throughout your career: it is far better to execute two or three channels genuinely well than to spread thin, mediocre effort across every channel we\'ll cover in this course simultaneously. A strong channel strategy makes deliberate, honest choices about where not to invest, just as much as where to invest.\n\n## Bringing It Together\n\nToday we moved from the broad funnel and channel map of week one into an actual, specific strategy: understanding precisely who you\'re marketing to through genuinely detailed personas, understanding the competitive landscape you\'re operating within, and making a deliberate, realistic channel strategy decision based on both. This is exactly the strategic foundation every remaining technical channel we cover in this course assumes is already in place.\n\nFor your assignment, develop full buyer personas and a genuine channel strategy for a fictional State business. For your practical exercise, create a complete digital marketing plan outline, pulling together the funnel thinking, channel overview, personas, and channel strategy from these first two weeks into one coherent document.\n\nNext week, we move into Module 2 and get hands-on with our first specific channel: Search Engine Optimization.';

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
