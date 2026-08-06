import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 5;
const LESSON_TITLE = "Real-Time Monitoring, Data Logging, and Dashboards";

const PLACEHOLDER_CONTENT =
  "Using real-time and historical performance data to catch problems early, configuring effective alerts, and designing a dashboard that presents key metrics clearly.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered how monitoring systems collect data in the first place — IoT sensors, communication protocols, and SCADA. This lesson turns to what happens with that data once it\'s collected: catching problems early, logging history, alerting the right people, and presenting it all clearly.\n\n## Real-Time Performance Monitoring\n\nReal-time monitoring compares actual current system performance against expected performance, calculated from the specific system design and current, real conditions — for example, comparing actual measured power output against what the system should genuinely be producing given current, real solar irradiance conditions.\n\nA meaningful, significant gap between expected and actual performance is often the very first, earliest sign of a developing problem: dirty panels reducing efficiency, connection issues within the wiring, or a battery that\'s beginning to noticeably degrade. Catching these kinds of issues early through consistent, real-time monitoring, rather than only discovering them once total system failure has already occurred, connects directly and meaningfully to the predictive maintenance concepts we\'ll cover in more depth next week.\n\n## Data Logging and Storage\n\nBeyond simple real-time display, monitoring systems need to properly log historical data over time, enabling meaningful trend analysis: is overall system performance gradually declining over months, indicating slow degradation, or is it staying genuinely consistent. This historical data is also genuinely valuable for accurately validating whether original design assumptions, like the solar resource data we discussed back in week two, actually match real, observed field conditions over time.\n\nData storage decisions involve real tradeoffs between local storage directly on-site, which remains genuinely accessible even during any internet outage, and cloud storage, which conveniently enables remote access and analysis from essentially anywhere, but naturally depends on a reliable internet connection to actually function.\n\n## Alarm and Alert Systems\n\nEffective monitoring systems don\'t require someone to be constantly, actively watching a dashboard at all times. **Alarm and alert systems** automatically notify relevant operators when specific defined conditions occur: a battery reaching critically low charge, a sudden significant drop in generation output, or a specific component reporting an error condition.\n\nWell-designed alerting strikes a careful, deliberate balance genuinely similar to what we discussed back in the cybersecurity course\'s coverage of alert fatigue: too many alerts, including many minor or genuinely inconsequential ones, and operators start ignoring them entirely; too few, and genuinely serious problems go unnoticed for far too long. Thoughtful alert threshold configuration is a real, ongoing part of properly maintaining any monitoring system over its operational lifetime.\n\n## Data Visualization Dashboards\n\nFinally, all of this collected data needs to be presented in a genuinely usable, clear way. A well-designed **dashboard** shows key performance indicators at a glance — current generation, battery status, and total energy produced — using clear, intuitive charts and visual indicators rather than dense, hard-to-interpret raw numbers.\n\nThis is precisely what this week\'s assignment asks you to design: a genuinely complete monitoring dashboard, thinking carefully and specifically about which metrics actually matter most, and how to present them clearly and usefully to the actual people who will use this dashboard regularly, whether that\'s a system owner or a dedicated maintenance technician.\n\n## Bringing It Together\n\nToday we covered real-time performance tracking, historical data logging, smart alerting, and clear visual dashboards. Combined with last lesson\'s sensors, protocols, and SCADA, this digital layer is precisely what transforms a solar installation from a passive, install-and-forget piece of physical equipment into an actively, intelligently managed system.\n\nFor your assignment, design a complete monitoring dashboard for genuine performance tracking. For your practical exercise, set up a monitoring system for a solar installation using simulation software, applying everything covered across these two lessons.\n\nNext week, we move into Module 5: Digital Diagnostics and Troubleshooting — using this monitoring data to actively diagnose and resolve real problems when they inevitably arise.';

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
