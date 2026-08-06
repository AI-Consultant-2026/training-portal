import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 3;
const LESSON_TITLE = "Load Calculation and Component Sizing";

const PLACEHOLDER_CONTENT =
  "How to calculate a customer's total energy needs and use that figure to properly size panels, inverters, charge controllers, and wiring.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last week covered solar resource assessment and the three fundamental system architectures. This week, we bring everything together into a genuinely complete system design, starting with the step every proper design actually starts from: figuring out exactly how much energy a customer needs, and using that number to size every major component correctly.\n\n## Load Calculation and Consumption Analysis\n\nEvery proper solar system design genuinely starts not with the panels themselves, but with a careful, thorough understanding of exactly how much energy the customer actually needs. This is **load calculation**.\n\nThe process involves listing every single electrical device the system needs to power, along with each device\'s power consumption, in watts, and how many hours per day it\'s typically actually used. Multiplying these together for each device, then summing across every device, gives total daily energy consumption, typically expressed in kilowatt-hours.\n\nI want to emphasize something genuinely important here: accurate load calculation is the single most common point of failure in real, amateur solar system design. Underestimating actual real consumption produces a system that simply cannot reliably meet the customer\'s genuine needs; significantly overestimating it produces an unnecessarily and needlessly expensive system. Take real, genuine time here, and where realistically possible, use actual measured consumption data rather than relying purely on rough estimates or guesswork.\n\n## Component Sizing\n\nWith total load requirements now understood, we can properly size each major system component.\n\n**Panel sizing** determines total required panel capacity, generally calculated by dividing total daily energy need by the peak sun hours we discussed last week, then applying a reasonable safety margin to properly account for real-world losses and unavoidable variation in daily sunlight.\n\n**Inverter sizing**: since panels and batteries produce direct current, or DC, while most household and business appliances require alternating current, or AC, an **inverter** converts between the two. Inverters must be sized to reliably handle the system\'s genuine maximum expected power demand, generally with an appropriate additional safety margin included to handle brief power surges when larger appliances, like a refrigerator compressor or water pump, first switch on.\n\n**Charge controller sizing**: in systems that include battery storage, a **charge controller** regulates the flow of electricity from the panels into the batteries, both protecting the batteries from being damaged through overcharging and optimizing the actual charging process for genuinely better long-term battery life and health. Charge controllers must be properly sized to handle the maximum current the connected panel array can realistically produce.\n\n**Wiring**: appropriate wire sizing, or gauge, must be carefully selected based on the specific current it will carry and the physical distance it needs to span. Undersized wiring creates genuine safety hazards through overheating, and it can also meaningfully reduce overall system efficiency through unnecessary resistive power loss along the way.\n\n## Bringing It Together\n\nThis lesson covered the two steps every real system design has to get right before anything else: an accurate load calculation, and using that number to properly size panels, inverters, charge controllers, and wiring. Get load calculation wrong, and every component sized from it is wrong too.\n\nNext lesson turns to the professional design software that helps verify these calculations, the electrical safety practices that make a design actually installable, and how to estimate cost and calculate return on investment.';

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
