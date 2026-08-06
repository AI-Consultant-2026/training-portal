import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 3;
const LESSON_TITLE = "Where Spatial Data Comes From";

const PLACEHOLDER_CONTENT =
  "Government databases, satellite imagery, field surveys, drone data, and crowdsourced sources, and how to choose among them for a given project.";

// Same pattern as the other GIS content seeders in this series -- this lesson was
// already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 2. In our first two weeks, we worked mostly with data that was already provided and prepared for you. This week, we address a genuinely fundamental question: where does spatial data actually come from, and how do you make sure it\'s reliable enough to trust before you build any real analysis on top of it?\n\n## Data Sources\n\nSpatial data comes from a genuinely wide range of sources, each with its own real strengths and limitations.\n\n**Government databases** — national mapping agencies, land registries, census bureaus — often provide authoritative, well-documented data, though it can sometimes be outdated or, especially in some regions, difficult to actually access in a timely way.\n\n**Satellite imagery**, which we\'ll cover in real depth next week, provides consistent, wide-area coverage and enables regular monitoring of environmental change over time.\n\n**Field surveys** involve directly, physically collecting data on location — precisely what you\'ll practice hands-on in this lesson\'s exercise — offering high accuracy for the exact specific area actually surveyed, but requiring genuinely significant time and effort to cover any larger area at scale.\n\n**Drone-collected data**, which we\'ll dive into deeply starting in Module 4, offers a genuinely valuable middle ground: considerably more detailed and higher resolution than satellite imagery, while covering meaningfully more ground area than a purely manual field survey could reasonably achieve.\n\n**Crowdsourced data**, such as OpenStreetMap, relies on distributed, often volunteer, contributors continuously adding and updating map data. This can produce impressively detailed, frequently updated coverage, particularly in populated areas, though data quality and genuine completeness can vary considerably depending on how much active local contributor participation actually exists in any given specific area.\n\nChoosing the right combination of sources for any real project depends heavily on the required accuracy, the necessary timeliness, and the practical budget realistically available — precisely the kind of decision you\'ll need to make and clearly justify in this week\'s assignment.\n\n## Data Collection Methods and Accuracy\n\nWhen you collect data directly yourself, as in this lesson\'s practical exercise, understanding accuracy is essential. **GPS accuracy** varies meaningfully by device and prevailing conditions — a standard consumer smartphone GPS typically achieves accuracy within somewhere around three to five meters under genuinely good conditions, while specialized professional survey-grade GPS equipment can achieve sub-centimeter accuracy, though naturally at very considerably higher cost.\n\nAccuracy can also be meaningfully degraded by dense tree canopy, tall surrounding buildings, or challenging atmospheric conditions — all factors genuinely worth considering carefully when planning any field data collection effort, and something you should note explicitly in your own collection protocol this week.\n\nIt\'s important to distinguish clearly between **accuracy**, how genuinely close a measurement is to the true real-world value, and **precision**, how consistent repeated measurements are with each other. A GPS device can be highly precise, consistently reporting nearly the exact same reading, while still being fundamentally inaccurate if that consistent reading is nonetheless meaningfully off from the actual true location.\n\n## Bringing It Together\n\nThis lesson covered the major sources of spatial data and how to choose among them, and the genuinely important distinction between accuracy and precision when collecting data yourself.\n\nNext lesson turns to what happens after collection: validating that data is genuinely trustworthy, preprocessing and cleaning it, and storing it reliably as a project grows.';

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
