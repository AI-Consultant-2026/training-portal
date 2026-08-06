import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 1;
const LESSON_TITLE = "Solar PV Technology Overview";

const PLACEHOLDER_CONTENT = "How solar photovoltaic systems convert sunlight into usable electricity.";

// Same pattern as 20260806020000 for lesson 1 -- the demo seeder (20260729020100)
// already inserted this lesson with placeholder content, so this seeder updates the
// already-seeded row in place rather than re-running the original insert.
const FULL_CONTENT =
  'Last lesson covered the vocabulary — power, voltage, current, efficiency — and surveyed the renewable energy landscape, with solar standing out as the practical choice for this region. This lesson turns to the technology itself: how solar actually converts sunlight into usable electricity, how that electricity gets stored and managed, and why this course\'s title includes the words "digital systems" in the first place.\n\n## Photovoltaic Technology\n\n**Photovoltaic, or PV, technology** directly converts sunlight into electricity using semiconductor materials, most commonly silicon. When sunlight strikes a properly prepared PV cell, it displaces electrons within the material, generating a measurable electric current.\n\nIndividual PV cells are combined into **panels** (also called modules), and multiple panels are combined into a complete **array** to reach whatever total power capacity a specific system genuinely requires. We\'ll cover the detailed process of sizing these systems properly next week, but for now, understand the basic underlying building blocks: cell, panel, array.\n\n## Battery Storage Systems\n\nSolar panels only generate electricity while the sun is actually shining, which creates an obvious practical challenge for nighttime and cloudy-day use. **Battery storage** solves this by storing excess electricity generated during sunny daytime periods for genuine later use whenever it\'s actually needed. We\'ll cover battery technology in real, considerable depth in Module 3, but understand for now that batteries are what genuinely make a solar system reliable around the clock, not merely functional during daylight hours alone.\n\n## Smart Grids and Microgrids\n\nA **smart grid** uses digital technology to monitor and intelligently manage electricity flow in real time, in contrast to a traditional, purely passive electrical grid that simply delivers power without any real-time monitoring or active management. A **microgrid** is a genuinely self-contained, localized energy system, capable of operating independently from a larger centralized grid when necessary — particularly valuable in regions, including many parts of Nigeria, where consistent centralized grid access remains genuinely unreliable.\n\n## Digital Monitoring and Control Systems\n\nThis course\'s title includes "digital systems" specifically because modern renewable energy installations increasingly rely on digital sensors and software to monitor real-time performance, automatically detect emerging problems, and remotely control system behavior. We\'ll dedicate an entire module later in this course, Module 4, specifically to these digital monitoring capabilities, since they genuinely represent a meaningfully growing and increasingly valuable part of this overall field.\n\n## Renewable Energy Potential in Nigeria and the State\n\nNigeria receives genuinely abundant, consistent sunlight throughout most of the year, making solar power a fundamentally strong option almost anywhere in the country. The State specifically, given its location, generally experiences good solar irradiance, though with real, meaningful seasonal variation between the wet and dry seasons that any proper system design must genuinely account for.\n\nBeyond the pure physical resource availability, Nigeria has also implemented various policies and incentives specifically intended to encourage broader renewable energy adoption — precisely what this week\'s assignment asks you to research directly.\n\n## Bringing It Together\n\nTogether, these two lessons built the essential foundation for this entire course: the vocabulary of power, voltage, current, and efficiency; a clear picture of where solar fits among the renewable sources; and now the core technology stack — PV cells and arrays, battery storage, smart grids and microgrids, and the digital monitoring systems that tie it all together.\n\nFor your assignment, research Nigeria\'s current renewable energy policies and incentives. For your practical exercise, calculate genuine energy potential for the State using real, actual climate data, applying the fundamental concepts from these two lessons.\n\nNext week, we begin Module 2: Solar Energy System Design, where we start genuinely, properly sizing real solar systems.';

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
