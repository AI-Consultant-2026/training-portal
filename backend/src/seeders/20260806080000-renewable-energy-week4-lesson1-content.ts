import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 4;
const LESSON_TITLE = "Battery Chemistry and Sizing";

const PLACEHOLDER_CONTENT =
  "Comparing lead-acid, lithium-ion, and flow battery technologies, and how depth of discharge and days of autonomy determine required battery capacity.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 3. We\'ve now covered how to properly size and design a complete solar generation system. This week, we focus specifically on storage — the batteries that make solar power genuinely reliable around the clock, not merely functional during daylight hours alone.\n\n## Battery Chemistry\n\nThree main battery chemistries genuinely dominate solar energy storage today, each with real, distinct tradeoffs.\n\n**Lead-acid batteries** are the most established, mature, and generally least expensive upfront option. They\'re genuinely reliable and well understood, but they offer a comparatively shorter usable lifespan, generally require more regular ongoing maintenance, and should not be discharged below roughly 50 percent of their total capacity without meaningfully shortening their overall lifespan.\n\n**Lithium-ion batteries** have become increasingly dominant in newer solar installations. They offer meaningfully longer lifespan, considerably higher efficiency, and can typically be safely discharged much more deeply, often to 80 or even 90 percent of total capacity, without significant damage. Their genuine downside is meaningfully higher upfront cost, though that cost gap has been steadily narrowing over recent years as broader adoption and manufacturing scale have both increased substantially.\n\n**Flow batteries** represent a newer, less common technology that stores energy in external liquid electrolyte tanks rather than in solid cells. They offer genuinely excellent long cycle life and can be scaled up simply by using larger tanks, but they remain considerably more expensive and less broadly commercially available than either lead-acid or lithium-ion options, generally making them more relevant for larger, utility-scale installations than for typical residential or small commercial projects.\n\nFor most of the practical residential and small commercial projects you\'ll encounter, the genuinely real, practical choice will come down to lead-acid versus lithium-ion, weighing upfront cost directly against long-term performance and total lifetime value — exactly the kind of comparison this week\'s assignment specifically asks you to make.\n\n## Battery Sizing\n\nProperly sizing a battery bank requires understanding a few genuinely key concepts. **Depth of discharge, DoD**, indicates what percentage of total battery capacity is safely usable, directly connecting to the chemistry differences we just discussed. **Days of autonomy** indicates how many consecutive days a battery system needs to reliably supply power without any solar charging at all, an especially important consideration during extended periods of cloudy weather.\n\nThe core practical sizing calculation combines daily energy consumption, from the load calculation we covered back in week three, with the desired days of autonomy and the specific battery chemistry\'s safe depth of discharge, to determine total required battery capacity. For off-grid systems, this calculation carries genuinely serious weight, since insufficient capacity directly means real power outages. For grid-support systems, requirements are generally somewhat more flexible, since the centralized grid remains available as a reliable backup during any actual shortfall.\n\n## Bringing It Together\n\nThis lesson covered the three dominant battery chemistries and their genuine tradeoffs, and the sizing methodology that turns daily energy consumption, days of autonomy, and depth of discharge into a concrete battery bank capacity. Getting chemistry and sizing right together is what actually makes a storage system both affordable and reliable.\n\nNext lesson turns to how that battery bank gets protected and put to work: battery management systems, smart energy management, and microgrid design.';

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
