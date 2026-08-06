import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 7;
const LESSON_TITLE = "E-commerce Marketing & Cart Abandonment";

const PLACEHOLDER_CONTENT =
  "Optimizing product listings, understanding why shoppers abandon carts, and using upselling and cross-selling to increase order value.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 6. We\'ve now covered every major channel individually — SEO, content, email, paid advertising, and analytics. This week, we look at two things that apply directly across all of them: the specific dynamics of e-commerce, and the automation systems that let a small team run genuinely sophisticated marketing without manually managing every single interaction by hand.\n\n## E-commerce Marketing Fundamentals\n\nSelling directly online introduces some genuinely specific marketing dynamics worth understanding clearly.\n\n**Product listings** function much like the on-page SEO we covered back in week three, applied specifically to individual products — clear, honest, benefit-focused descriptions, genuinely good quality images, and relevant keywords that match how real customers actually search for that particular product.\n\n**Cart abandonment** is a genuinely major, well-documented challenge in e-commerce: a large proportion of shoppers add items to a cart and then leave without ever actually completing the purchase. Understanding why — unexpected additional costs at checkout, a required account creation step, general hesitation or distraction — helps identify concrete, specific fixes, and it directly sets up this week\'s assignment, since an automated abandoned cart email sequence is one of the single highest-return tactics available in all of e-commerce marketing.\n\n**Upselling and cross-selling** — recommending a genuinely relevant, related, or higher-value product at the right specific moment — can meaningfully increase average order value without requiring any additional, separate marketing spend at all, since the customer is already actively engaged in the purchase process at that exact moment.\n\n## Bringing It Together\n\nThis lesson covered the specific dynamics of e-commerce marketing: optimizing product listings, understanding and addressing cart abandonment, and using upselling and cross-selling to increase order value without additional spend.\n\nNext lesson turns to the automation systems that let these tactics run continuously and consistently at scale — marketing automation platforms, CRM basics, and customer journey mapping.';

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
