import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 8;
const LESSON_TITLE = "Integrated Campaigns & Budget Allocation";

const PLACEHOLDER_CONTENT =
  "Coordinating SEO, content, paid advertising, email, and analytics around a shared goal, and allocating budget based on timeframe, cost, and business goals.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to our final module of Digital Marketing. Over the past seven weeks, we\'ve covered strategy and personas, SEO, content and email, paid advertising, analytics, and e-commerce and automation. This week, we bring all of it together into one genuinely integrated strategy, and spend real, dedicated time preparing you for your capstone project.\n\n## Integrated Multi-Channel Campaign Planning\n\nA genuinely mature digital marketing strategy doesn\'t run each channel in isolation — it coordinates them around a shared goal, with each channel reinforcing the others, all the way back to the funnel framework we introduced in week one.\n\nConsider a coordinated product launch: content marketing, from Module 3, builds early awareness and answers common questions well ahead of launch day. SEO, from Module 2, ensures the business is genuinely found by anyone actively searching for related terms in the meantime. Paid search, from Module 4, drives immediate, deliberate traffic right at launch. Email, also from Module 3, nurtures existing contacts directly toward the specific launch date. And analytics, from Module 5, tracks how each individual channel is genuinely contributing to the shared, overall goal, so budget and effort can be adjusted honestly, based on real evidence, as the campaign actually unfolds.\n\nThis is precisely the kind of integrated thinking your capstone project needs to demonstrate — not eight disconnected weekly exercises, but one genuinely coherent strategy where every channel deliberately supports the others.\n\n## Budget Allocation Across Channels\n\nWith multiple channels genuinely competing for a limited real budget, allocation decisions matter enormously. A sensible, defensible approach considers each channel\'s typical timeframe to results — SEO and content take real, patient time to compound, while paid advertising delivers considerably faster, more immediate results, directly connecting back to what we covered in weeks three and five; each channel\'s realistic cost relative to its likely return, informed honestly by the CAC and LTV concepts from week six; and a business\'s specific stated goals — a genuinely new business with zero existing traffic may reasonably need to lean more heavily on paid channels early on, specifically to generate meaningful traction while slower, longer-term SEO and content investments are still actively building.\n\nThere\'s no single, universally correct allocation formula — the discipline lies in making that allocation decision deliberately and explaining it clearly, rather than splitting budget randomly or purely by simple habit and convenience.\n\n## Measuring Integrated Campaign Performance\n\nBuilding directly on Module 5, measuring an integrated campaign requires looking honestly at both individual channel performance and genuine overall campaign results together. A channel that appears to underperform in isolation might still be making a genuinely meaningful contribution earlier in the customer journey — recall the attribution challenges we discussed back in week six. Effective integrated reporting presents both individual channel-level detail and the honest overall outcome, giving stakeholders a genuinely complete, accurate picture rather than a misleadingly partial one.\n\n## Bringing It Together\n\nThis lesson covered how to coordinate multiple channels around one shared goal, how to allocate a limited budget across them deliberately, and how to measure an integrated campaign\'s honest overall performance. Together, these turn everything covered in this course into a single, coherent strategy rather than eight disconnected pieces.\n\nNext lesson looks briefly at where this field is heading — AI, voice search, and the cookieless future — and spends real, dedicated time preparing you for your capstone project.';

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
