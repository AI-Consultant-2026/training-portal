import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 5;
const LESSON_TITLE = "IoT Sensors, Communication Protocols, and SCADA";

const PLACEHOLDER_CONTENT =
  "How IoT sensors collect system data, the tradeoffs between WiFi, cellular, and LoRaWAN connectivity, and how SCADA systems add remote monitoring and control.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 4, and to the part of this course that genuinely justifies the "digital systems" in our title. We\'ve now covered how to design and properly size both the generation and storage sides of a complete solar installation. This week, we cover how modern digital technology lets you see, in real time, exactly how that system is genuinely performing, and lets you catch problems before they ever become serious.\n\n## Monitoring Systems and Data Collection\n\nA solar monitoring system collects real-time data about system performance: how much energy panels are actually generating, current battery state of charge, actual power consumption, and the overall operational health of every major component we covered back in Module 2.\n\nThis data serves several genuinely important purposes: verifying the system is performing at, or reasonably close to, its properly designed capacity; identifying developing problems early, before they escalate into significant, costly failures; and providing genuinely concrete evidence of system value, directly supporting the ROI calculations we discussed back in week three.\n\n## IoT Sensors and Communication Protocols\n\nModern monitoring relies heavily on **Internet of Things, IoT**, sensors — small, genuinely inexpensive devices that measure specific parameters, like voltage, current, or temperature, and transmit that measured data to a central monitoring system for collection and analysis.\n\nThese sensors communicate using various protocols, each suited to genuinely different practical needs. **WiFi** offers high bandwidth but requires reasonably reliable local internet infrastructure to actually function. **Cellular connectivity** works well for genuinely remote installations lacking any local WiFi access, though it does require an ongoing cellular data plan. **LoRaWAN**, a specialized low-power, long-range protocol, is particularly well suited to remote monitoring applications requiring only small amounts of data transmitted relatively infrequently, while offering genuinely excellent battery life for the sensors themselves.\n\nChoosing the right communication protocol depends heavily on a specific installation\'s location and existing available infrastructure — a genuinely important, practical consideration for installations in more rural parts of the State, where reliable internet access itself cannot always be safely assumed or taken for granted.\n\n## SCADA Systems for Energy Management\n\n**Supervisory Control and Data Acquisition, SCADA**, systems represent a more sophisticated, comprehensive form of monitoring and control, historically used extensively in industrial settings and increasingly applied directly to larger renewable energy installations.\n\nA SCADA system doesn\'t just passively collect data — it also enables genuine remote control, allowing operators to actively adjust system settings or respond to changing conditions without needing to be physically present on-site. For larger commercial or microgrid installations, referring back to the microgrid concepts from last week, SCADA-level monitoring and control becomes increasingly valuable and, at real scale, often genuinely necessary.\n\n## Bringing It Together\n\nThis lesson covered how solar monitoring systems collect data in the first place: IoT sensors measuring key parameters, the communication protocols that get that data where it needs to go, and SCADA systems that add genuine remote control on top of passive data collection.\n\nNext lesson turns to what happens with that data once it\'s collected: real-time performance monitoring, historical data logging, smart alerting, and the dashboards that make it all genuinely usable.';

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
