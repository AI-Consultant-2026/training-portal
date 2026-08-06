import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 4;
const LESSON_TITLE = "Content Marketing & Lead Magnets";

const PLACEHOLDER_CONTENT =
  "Creating genuinely useful content that builds trust before a sale, and using lead magnets to convert visitors into contacts.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 3. Last week\'s SEO work helps people find a business. This week, we cover what happens next: content that earns real trust once they arrive, and email marketing, which turns that initial interest into an ongoing, direct relationship.\n\n## Content Marketing Strategy\n\n**Content marketing** means creating genuinely useful material — blog posts, videos, guides — that provides real value to a potential customer before ever directly asking for a sale. This connects directly back to the awareness and consideration stages of the funnel we built in week one: good content answers the exact questions a prospect is already asking themselves during those stages.\n\nA **lead magnet** is a specific piece of content — a downloadable guide, a checklist, a short email course — offered in exchange for a visitor\'s contact information. This is genuinely one of the most effective tools for converting an anonymous website visitor into a named contact you can continue actually marketing to, which brings us directly into email.\n\nEffective content strategy starts from the keyword research we covered last week — genuinely address the real questions your target persona is actively searching for — and stays consistent over time, since content marketing, much like the SEO it supports, compounds gradually and reliably over months rather than delivering an instant result.\n\n## Bringing It Together\n\nThis lesson covered how content marketing earns real trust before a sale is ever requested, and how a well-designed lead magnet converts that trust into an actual, ongoing contact you can market to directly.\n\nNext lesson turns to what happens once you have that contact: building an email list the right way, segmenting it meaningfully, and the campaign design and deliverability practices that make sure your emails actually get read.';

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
