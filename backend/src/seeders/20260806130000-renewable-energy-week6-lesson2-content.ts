import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 6;
const LESSON_TITLE = "Preventive Maintenance, Predictive Analytics, and Security";

const PLACEHOLDER_CONTENT =
  "Building preventive maintenance schedules, using historical data for predictive maintenance, securing digital monitoring systems, and communicating clearly with customers.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered how to measure system performance and methodically diagnose a fault once one occurs. This lesson turns to preventing many of those problems before they ever happen, and closes out Module 5 with the security and communication practices that make all of this work sustainable.\n\n## Preventive Maintenance Scheduling\n\nRather than only ever reacting to problems after they occur, **preventive maintenance** performs regular, scheduled tasks specifically intended to prevent failures from happening in the first place. For solar installations, this typically includes regular panel cleaning, particularly important given the dust accumulation concerns we discussed back in week two, periodic visual inspection of wiring and physical mounting hardware, and regularly checking battery health indicators, especially critical for lead-acid batteries given the maintenance considerations we discussed back in Module 3.\n\nA well-designed maintenance schedule specifies exactly what needs to be checked, how frequently, and by whom — precisely the kind of practical, real deliverable this week\'s assignment asks you to create.\n\n## Predictive Maintenance and Analytics\n\nBuilding directly on the historical data logging capability we introduced last week, **predictive maintenance** uses accumulated performance trends to anticipate likely component failures before they actually occur, rather than waiting to simply react once a component has already fully failed.\n\nFor example, if battery capacity has been steadily, gradually declining over several consecutive months at a genuinely consistent, measurable rate, predictive analytics can reasonably estimate when that battery will likely need replacement, allowing for proactive planning and budgeting well ahead of an actual, unplanned failure. This represents a meaningfully more sophisticated, valuable use of monitoring data than reactive troubleshooting alone, and it\'s an increasingly important, growing part of professional renewable energy system management.\n\n## Software Updates and Cybersecurity\n\nModern digital monitoring and control systems, since they\'re genuinely software-based, require the exact same kind of security discipline covered in the Cyber Security Fundamentals course. This includes regularly and promptly applying security updates to monitoring software and connected devices, using genuinely strong, unique passwords for any remote system access, and being appropriately cautious about which devices and services are granted control access to a system.\n\nI want to be direct about this: a monitoring and control system that isn\'t properly secured isn\'t just a genuine data privacy concern — for systems with real remote control capability, referring back to the SCADA concepts from last week, it represents a genuine potential safety and reliability risk if it were ever compromised by an unauthorized party.\n\n## Customer Support and Issue Documentation\n\nFinally, real-world troubleshooting rarely happens in complete isolation — it typically involves communicating clearly with a customer or system owner. Effective customer support means explaining problems and their resolution in genuinely plain, accessible, non-technical language, setting realistic, honest expectations around repair timelines, and properly documenting every issue for meaningful future reference, exactly mirroring the documentation discipline from last lesson.\n\n## Bringing It Together\n\nToday we covered both preventive and predictive maintenance approaches, the security considerations these digital systems genuinely introduce, and clear customer communication. Together with last lesson\'s performance metrics and troubleshooting methodology, this gives you a complete, working picture of how to keep a solar installation reliably running well over its entire, complete operational lifetime.\n\nFor your assignment, create a complete maintenance manual and troubleshooting guide. For your practical exercise, diagnose real problems within sample system data and develop genuine, specific solutions, applying the structured methodology covered across these two lessons.\n\nNext week, we move into Module 6: Installation Planning and Project Management — bringing everything we\'ve covered together into an actual, real physical installation.';

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
