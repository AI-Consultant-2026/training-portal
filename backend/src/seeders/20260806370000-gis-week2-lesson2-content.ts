import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 2;
const LESSON_TITLE = "Map Elements and GIS Software Landscape";

const PLACEHOLDER_CONTENT =
  "Scale, legend, and orientation as core map-reading fundamentals, plus a practical comparison of QGIS and ArcGIS.";

// Same pattern as the other GIS content seeders in this series -- this lesson was
// already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered how coordinate systems and map projections translate a curved earth onto a flat plane. This lesson turns to the essential elements every professional map needs to actually communicate clearly, and a practical comparison of the two major GIS software platforms.\n\n## Map Fundamentals: Scale, Legend, and Orientation\n\nBeyond the underlying coordinate mathematics, every genuinely professional map needs a few essential communication elements.\n\n**Scale** indicates the precise relationship between distance on the map and actual real-world distance — for example, a scale of 1 to 50,000 means one unit measured on the map represents 50,000 of those same units in true physical reality. Scale directly determines how much genuine detail a map can meaningfully show — a map covering the entire country necessarily shows far less local detail than a map covering just a single village.\n\nThe **legend** explains precisely what every symbol, color, and line style used on the map actually represents. A genuinely well-designed map is completely unambiguous to any reader precisely because the legend clearly explains every single visual element used.\n\n**Orientation** simply indicates which direction is north, typically shown through a small compass rose or arrow symbol. While north is conventionally placed at the top of most maps, this is a longstanding convention, not a strict, mandatory rule, and you should always verify orientation explicitly on any unfamiliar map rather than simply assuming it.\n\nTogether, scale, legend, and orientation are what make a map genuinely readable and trustworthy to someone other than the specific person who originally created it — which becomes essential the moment you\'re producing maps for actual stakeholders and clients later in this course.\n\n## GIS Software Overview\n\nLet\'s briefly compare the two major software options you\'re likely to encounter professionally.\n\n**QGIS**, which you\'re already using, is free, open-source, and genuinely powerful — actively developed by a large, global community of contributors, with an enormous ecosystem of available plugins that extend its core functionality significantly. For most of this course, and for a great many real-world professional projects, QGIS is entirely sufficient.\n\n**ArcGIS**, produced commercially by a company called Esri, is the dominant proprietary alternative, widely used particularly within larger organizations and government agencies. It offers some genuinely advanced, specialized analytical tools and typically more polished, integrated technical support, but it requires a paid license, which can be a significant, real barrier, especially for individuals and smaller organizations just starting out.\n\nMy honest, practical recommendation: build your genuine skills in QGIS throughout this course. The fundamental underlying GIS concepts — coordinate systems, spatial analysis, data models — transfer directly between both platforms. If a future employer specifically requires ArcGIS, the interface itself is learnable quickly once you already have genuinely solid underlying GIS fundamentals in place.\n\n## Bringing It Together\n\nToday we covered the essential communication elements every professional map needs, and how the two major GIS software platforms compare. Combined with last lesson\'s coordinate systems and projections, you now have the core conceptual toolkit needed to start doing real, hands-on analytical work.\n\nFor your assignment, complete the QGIS tutorial on basic mapping, paying close attention to how coordinate systems are handled within the actual software interface. For your practical exercise, perform spatial queries and analysis on sample data, applying everything we\'ve covered across these first two weeks.\n\nNext week, we move into Module 2: Data Collection and Processing — where good GIS data actually comes from, and how it gets properly prepared for genuine, reliable analysis.';

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
