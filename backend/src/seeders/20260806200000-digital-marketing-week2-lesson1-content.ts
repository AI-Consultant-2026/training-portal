import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 2;
const LESSON_TITLE = "Buyer Personas and Competitive Analysis";

const PLACEHOLDER_CONTENT =
  "Buyer persona components — demographics, needs, information sources, and objections — plus how to research competitors and the broader market.";

// Same pattern as the week 1 digital-marketing content seeders -- this lesson was
// already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last week we built the funnel and channel map for this entire course. This week, we fill in the most important input to that map: a genuinely clear understanding of who you\'re actually marketing to, and how that shapes the specific channels you deliberately choose to invest in.\n\n## Buyer Personas\n\nA **buyer persona** is a detailed, research-based representation of a business\'s ideal customer. This concept may be familiar if you\'ve studied audience personas in a social media context, and the underlying idea is genuinely the same — but a full marketing persona goes further, capturing not just platform behavior, but the entire buying journey.\n\nA solid buyer persona includes demographic details — age, location, income level, occupation; the specific problem or need that drives them to seek a solution in the first place; where they genuinely look for information when solving that problem — a search engine, a friend\'s recommendation, a social platform; and the objections or hesitations that typically prevent them from actually converting.\n\nThat last point deserves real emphasis, because it\'s often skipped. Understanding why a genuinely interested prospect doesn\'t convert — price concerns, trust concerns, simply not knowing the business exists — directly tells you what your marketing content and channel choices need to actively address. This is exactly the kind of detail this week\'s assignment asks you to develop for a fictional State business.\n\n## Competitive Analysis and Market Research\n\nYou never build a marketing strategy in isolation from what else exists in the market. **Competitive analysis** means systematically studying what other businesses serving a genuinely similar customer are already doing.\n\nA useful competitive review looks at which channels competitors are actively investing in — are they clearly running paid search ads, are they publishing regular content, do they have a strong email presence; what messaging and positioning they use to differentiate themselves; and where there\'s a clear, real gap — a customer need or a channel that\'s currently underserved, representing a genuine opportunity.\n\n**Market research** broadens this further, looking at overall market size, genuine growth trends, and typical customer behavior patterns within a specific industry, not just what individual named competitors happen to be doing. Together, these two activities ensure a marketing strategy is grounded in real, external reality, rather than built purely on internal assumptions about the business\'s own customers.\n\n## Bringing It Together\n\nThis lesson covered how to build genuinely detailed buyer personas, and how competitive analysis and market research ground a marketing strategy in real, external reality rather than internal assumptions. Both inputs are what make the channel decision in the next lesson a deliberate one, not a guess.\n\nNext lesson turns to bringing personas and competitive research together into an actual, deliberate channel strategy — which specific channels genuinely deserve real investment for a given business.';

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
