import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 1;
const LESSON_TITLE = "Raster vs. Vector Data";

const PLACEHOLDER_CONTENT = "Understanding the two core spatial data models used in GIS.";

// The demo seeder (20260729020100) already inserted this lesson with placeholder
// content before the full lesson was written -- this seeder swaps it for the real
// content, mirroring the renewable-energy-digital-systems and digital-marketing
// content seeders from earlier in this series.
const FULL_CONTENT =
  'Welcome to GIS and Drone Mapping. Over the next eight weeks, this course teaches you how to work with geographic information systems and drone technology to solve genuinely real problems — agriculture planning, water resource management, infrastructure development, right here in the State and beyond.\n\nI want to start by addressing something honestly: this course involves genuinely technical software and some math-adjacent concepts, like coordinate systems, which we\'ll get to next week. If you\'ve never done anything like this before, that\'s completely fine. Everyone in this field started as a beginner. What matters is that you take the fundamentals seriously in these first two weeks, because everything else in this course builds directly on top of them.\n\n## What Is GIS?\n\nA Geographic Information System, or GIS, is a system designed to capture, store, analyze, and display data that has a location component — anything you can point to on a map. That might sound abstract, so let\'s make it concrete: a GIS can show you exactly which farms in a region flood most frequently, which neighborhoods have the least access to clean water, or the fastest emergency vehicle route between a hospital and any given address.\n\nThe power of GIS comes from combining location with additional information, called **attribute data**. A simple map showing farm boundaries is useful. A GIS showing those same farm boundaries, combined with soil quality, water access, and crop yield history, becomes a genuinely powerful decision-making tool.\n\nA GIS is generally made up of several core components: the actual **spatial data** itself, representing real-world locations and features; **software**, like QGIS, which we\'ll start using hands-on later this week; **hardware**, including the computers running the software and, later in this course, the GPS devices and drones used to collect new data; and, just as important as any of the technical pieces, the **people** — skilled analysts who know how to ask the right questions and correctly interpret what the data actually shows.\n\n## Raster vs. Vector Data Models\n\nEvery single piece of spatial data in a GIS is represented using one of two fundamental data models, and understanding the difference between them is absolutely essential — genuinely one of the most important concepts in this entire course.\n\n**Vector data** represents features using precise points, lines, and polygons, defined by exact geographic coordinates. A specific well location is a point. A road is a line. A farm boundary or a local government area is a polygon. Vector data is ideal for representing discrete, well-defined features with clear, precise boundaries, and it stays crisp and precise no matter how far you zoom in.\n\n**Raster data**, by contrast, represents information as a grid of cells, or pixels, each holding a specific value — similar in structure to a digital photograph. Satellite imagery, elevation data, and rainfall measurements are all typically represented as raster data. Raster is ideal for representing continuous phenomena that don\'t have neat, sharp boundaries — temperature, elevation, or vegetation health all gradually change across a landscape rather than switching abruptly from one exact value to another at a hard boundary line.\n\nA practical, memorable way to think about the difference: if you can clearly answer "where exactly does this specific feature start and end," it should almost certainly be vector data. If the answer is genuinely "it varies gradually and continuously across the entire area," it should almost certainly be raster data. You\'ll be working directly with both formats throughout this course.\n\n## Bringing It Together\n\nThis lesson covered what GIS fundamentally is, and the crucial distinction between raster and vector data models — a distinction that underlies essentially every dataset you\'ll work with for the rest of this course.\n\nNext lesson turns to real-world GIS applications right here in the State, and gives you your first hands-on experience with QGIS.';

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
