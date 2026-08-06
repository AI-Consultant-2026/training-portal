import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 4;
const LESSON_TITLE = "Battery Management, Smart Energy Systems, and Microgrids";

const PLACEHOLDER_CONTENT =
  "How battery management systems protect batteries, how smart energy management optimizes power flow, and how microgrids combine generation, storage, and control at a larger scale.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered battery chemistry and sizing — choosing the right technology and the right capacity for a given installation. This lesson turns to how that battery bank actually gets protected and put to intelligent use, and closes out Module 3 with the genuine economics of storage.\n\n## Battery Management Systems\n\nA **Battery Management System, or BMS**, monitors and actively protects a battery bank, particularly critical for lithium-ion systems specifically. A BMS monitors individual cell voltage and temperature, prevents genuinely damaging overcharging or over-discharging, and balances charge properly across individual cells within a larger battery pack to help ensure even, healthy long-term wear.\n\nA properly functioning BMS is essential, not merely a nice-to-have feature, for both battery longevity and, importantly, for genuine safety, since damaged or improperly managed lithium-ion cells can, in rare cases, pose real fire risk.\n\n## Smart Energy Management Systems\n\nBeyond basic battery protection, **smart energy management systems** actively optimize how energy flows through a complete solar installation. This can include intelligently prioritizing which loads receive power first during periods of genuinely limited available energy, automatically switching between solar, battery, and grid power sources based on real-time conditions, and — where a customer has this available — strategically charging batteries during lower-cost, off-peak electricity periods for later, more optimized use.\n\n## Microgrid Design and Control\n\nRecall the microgrid concept we briefly introduced back in week one. A properly designed microgrid combines solar generation, battery storage, and genuinely intelligent control systems to reliably serve a defined, specific local area, capable of operating either connected to, or fully independent from, the larger centralized grid.\n\nMicrogrid control systems need to properly manage the genuinely complex balance between variable solar generation, battery state of charge, and real-time customer demand, automatically making moment-to-moment decisions about exactly where power should flow at any given time. This represents a genuinely more complex system than a single residential or commercial installation, but it follows the exact same core underlying principles we\'ve covered throughout this entire course, simply applied at meaningfully larger scale.\n\n## Energy Storage Economics\n\nFinally, let\'s address the genuine economic reality of battery storage, since cost remains a real, significant consideration for most customers. Battery costs have declined substantially over the past decade, but batteries still typically represent a significant proportion of a complete system\'s total upfront cost, particularly for lithium-ion installations.\n\nThe economic case for adding battery storage strengthens considerably when grid access is genuinely unreliable, where the value of reliable, continuous backup power is real and immediately tangible, or in installations specifically designed for time-of-use optimization, storing lower-cost energy for later use during more expensive peak periods. Understanding and honestly comparing these specific economic factors is genuinely essential for advising customers accurately and effectively, precisely the analytical work this week\'s assignment asks you to complete.\n\n## Bringing It Together\n\nToday we covered the essential protective role of battery management systems, and how smart energy management and microgrid control extend these concepts to genuinely more sophisticated systems, closing with the real economics that determine whether storage makes sense for a given customer. Combined with last lesson\'s chemistry and sizing, and the generation-side design from Module 2, you now have a complete, working picture of both generating and reliably storing renewable energy.\n\nFor your assignment, analyze battery storage economics and honestly compare the available technology options. For your practical exercise, design a complete battery storage system for a specific solar installation.\n\nNext week, we move into Module 4: Digital Monitoring and Control Systems — the technology that lets you actually see, in real time, exactly how a system is genuinely performing.';

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
