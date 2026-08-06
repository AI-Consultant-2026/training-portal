import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 6;
const LESSON_TITLE = "Performance Metrics and Fault Diagnosis";

const PLACEHOLDER_CONTENT =
  "Using performance ratio, capacity factor, and availability to measure system health, and applying structured troubleshooting to diagnose common solar system faults.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 5. Last week we covered how to monitor a solar installation in real time. This week, we cover what to actually do with that monitoring data when it reveals a genuine problem: how to diagnose issues methodically, and how to build maintenance practices that prevent many problems from occurring at all.\n\n## System Performance Metrics and KPIs\n\nBuilding directly on last week\'s monitoring lecture, effective diagnostics require clearly defined performance metrics to measure against. **Performance ratio** compares actual measured energy output against theoretical maximum output under the current, actual conditions, providing a genuinely reliable, single overall health indicator for the system. **Capacity factor** measures actual energy production against the theoretical maximum if the system operated at full rated capacity continuously, useful specifically for longer-term trend analysis across weeks and months. **Availability** measures what percentage of time a system was genuinely operational and available to produce power, directly highlighting any downtime.\n\nThese metrics give you concrete, objective numbers to properly evaluate against, rather than relying purely on a vague, subjective sense that "something feels a bit off" with a given system.\n\n## Fault Detection and Diagnosis\n\n**Fault detection** identifies when a system is genuinely operating outside expected, normal parameters — exactly what the real-time monitoring we discussed last week is specifically designed to catch as it happens. **Diagnosis** then determines the actual specific, underlying cause.\n\nCommon solar system faults include: significantly reduced output, which could stem from panel shading or accumulated dirt, a failing inverter, or genuine wiring problems; complete system shutdown, potentially caused by a tripped safety breaker or a serious inverter fault; and battery-related problems, like premature capacity loss or failure to properly hold a charge over time.\n\nEffective diagnosis works systematically, generally moving from the most common and easiest-to-check causes toward increasingly less common and more complex ones. If output has genuinely dropped, first check the simplest possible explanations — visible shading, or accumulated dirt and dust on panels — before assuming a more complex, harder-to-diagnose internal component failure is actually responsible.\n\n## Troubleshooting Methodology\n\nA structured troubleshooting methodology genuinely prevents wasted time and unnecessary component replacement. A solid, reliable approach includes: clearly, precisely defining the specific problem, ideally using real monitoring data rather than a vague, general description; forming a specific, testable hypothesis about the most likely underlying cause; systematically testing that specific hypothesis, ideally changing only one variable at a time so you know with genuine confidence exactly what actually fixed the problem; and properly, thoroughly documenting both the problem and its confirmed resolution for meaningful future reference.\n\nThis last step, documentation, connects directly to something we\'ll return to next lesson, and it genuinely mirrors the incident documentation principles covered in other technical fields — a clear, honest record of what happened and what specifically fixed it is consistently valuable well beyond the scope of any single individual incident.\n\n## Bringing It Together\n\nThis lesson covered the concrete metrics that let you measure system health objectively, and the systematic process of detecting a fault, diagnosing its actual cause, and confirming a fix through structured troubleshooting rather than guesswork.\n\nNext lesson turns to preventing many of these problems before they ever happen: preventive and predictive maintenance, the security considerations these digital systems introduce, and clear customer communication.';

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
