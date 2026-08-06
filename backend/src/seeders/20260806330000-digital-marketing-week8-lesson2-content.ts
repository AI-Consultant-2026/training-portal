import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 8;
const LESSON_TITLE = "Emerging Trends & Capstone Planning";

const PLACEHOLDER_CONTENT =
  "AI, voice search, and the cookieless future's shift toward first-party data, plus how to scope and structure the capstone project.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert. This completes the
// full 8-week/16-lesson curriculum for this course.
const FULL_CONTENT =
  'Last lesson covered how to coordinate multiple channels around one shared goal, allocate budget deliberately, and measure integrated performance honestly. This final lesson looks briefly at where the field is heading, then spends real, dedicated time preparing you for your capstone project.\n\n## Emerging Trends\n\nLet\'s briefly look forward, since this field continues to evolve quickly, much like the social media landscape we discussed in a related course. **Artificial intelligence** is increasingly used for generating and testing ad copy variations, personalizing content at genuinely large scale, and predicting which specific customers are most likely to convert. **Voice search** is changing SEO strategy, since spoken queries tend to be longer and more genuinely conversational than typed searches, connecting directly back to the long-tail keyword concepts we covered back in week three.\n\nPerhaps most significant: the industry is moving toward a **cookieless future**, as browsers and regulations increasingly restrict the third-party tracking that much of digital advertising has historically relied on. This is meaningfully shifting real emphasis back toward first-party data — the genuine, direct customer relationships built through email and CRM systems, exactly what we covered back in Module 6 — since that data belongs directly to the business itself, rather than depending entirely on third-party tracking that\'s becoming steadily more restricted over time.\n\nI mention these trends not because you need to master them today, but because the fundamental principles from this entire course — understanding your genuine audience, matching channels to funnel stages, and measuring results honestly — remain valuable and relevant regardless of exactly which specific tools and platforms happen to be available at any given moment.\n\n## Preparing Your Capstone Project\n\nYour capstone project asks you to build a complete digital marketing strategy for a business, integrating strategy, SEO, content and email, paid advertising, and analytics into one coherent plan. I want you to treat this as one connected story: your buyer personas and channel strategy from Module 1 should directly justify your specific channel choices; your SEO and content work should build genuine awareness that your email and paid advertising then convert; and your analytics plan should honestly measure whether that entire integrated strategy is actually working.\n\nScope this realistically, based on the actual business you choose. A genuinely focused strategy across three or four well-chosen channels, executed thoroughly, will demonstrate far stronger understanding than a thin, thinly-spread attempt to superficially cover every single channel from this course at once.\n\n## Bringing It Together\n\nWe\'ve now covered the complete arc of this course: strategy and audience understanding, SEO, content and email marketing, paid advertising, analytics and measurement, e-commerce and automation, and finally, genuine integrated strategy. Your capstone project is your opportunity to demonstrate all of this as one coherent, professional body of work.\n\nFor your assignment, finalize your capstone project\'s specific scope and overall approach. For your practical exercise, develop a complete integrated digital marketing campaign plan for a business, applying everything covered across these two lessons.\n\nGood luck with your capstone project, and we\'re looking forward to seeing the strategy you build.';

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
