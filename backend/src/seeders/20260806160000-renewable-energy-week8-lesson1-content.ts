import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 8;
const LESSON_TITLE = "Integrated Systems and Renewable Energy Business Models";

const PLACEHOLDER_CONTENT =
  "Combining solar with other generation sources or backup, and comparing direct sales, leasing, PPA, and Energy-as-a-Service business models.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to our final module of Renewable Energy Digital Systems. Over the past seven weeks, we\'ve covered genuinely substantial technical ground: solar system design, battery storage, digital monitoring, diagnostics, and installation. This week, we zoom out to cover integrated systems, the actual business side of this work, and then spend real, dedicated time preparing you for your capstone project.\n\n## Integrated Renewable Energy Systems\n\nWhile we\'ve focused primarily on solar throughout this course, real-world installations sometimes genuinely combine multiple renewable sources, or combine renewables with existing conventional backup, like diesel generators, which remain genuinely common across much of Nigeria.\n\nAn integrated system might combine solar with a small wind installation to provide more consistent generation across genuinely varying weather conditions, or combine solar and battery storage with an existing diesel generator specifically for extended backup during longer outages or unusually poor solar conditions. Designing these integrated systems well requires applying the exact same fundamental principles we\'ve covered throughout this entire course — load calculation, proper component sizing, digital monitoring — while carefully managing the added complexity of intelligently coordinating multiple distinct generation sources together.\n\n## Economic Analysis and Business Models\n\nLet\'s talk honestly about the actual business side of renewable energy, since many of you will likely go on to genuinely offer these services professionally, not merely install systems for personal or academic purposes alone.\n\nSeveral distinct business models exist in this space. **Direct sales** involves a customer purchasing a complete system outright, paying the full cost upfront. **Solar leasing** allows a customer to use a system while a separate company retains ownership, with the customer paying a regular fee, generally lower than the full upfront purchase cost, though the customer never actually builds direct system ownership over time. **Power Purchase Agreements, PPAs**, have a company own and maintain the system while the customer simply pays only for the electricity actually generated and consumed, genuinely similar in spirit to a conventional utility billing arrangement. **Energy-as-a-Service** models bundle system installation together with genuinely ongoing monitoring and maintenance, connecting directly back to everything we covered in Modules 4 and 5, into one single, consolidated recurring subscription fee.\n\nEach specific model suits genuinely different customer situations and available capital. Direct sales work well for customers with sufficient available upfront capital who want full, complete ownership. Leasing and PPA models can genuinely make solar accessible to customers who couldn\'t otherwise afford the considerable upfront cost. Understanding these different options lets you offer genuinely appropriate solutions matched to a specific customer\'s actual real financial situation, rather than presenting only one single, rigid option to every customer regardless of their circumstances.\n\n## Bringing It Together\n\nThis lesson covered how solar integrates with other generation sources and backup, and the range of business models available for actually delivering renewable energy services to real customers. Matching the right architecture and the right business model to a specific customer situation is a genuine professional skill, not just a technical one.\n\nNext lesson turns to the customer-facing and forward-looking side of this work: honest customer education, the operational challenges of scaling a business, emerging technologies, and preparing your capstone project.';

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
