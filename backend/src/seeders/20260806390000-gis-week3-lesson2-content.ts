import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 3;
const LESSON_TITLE = "Data Quality, Cleaning, and Storage";

const PLACEHOLDER_CONTENT =
  "Validating collected data, preprocessing and cleaning common errors, and storing growing datasets in geospatial databases like PostGIS.";

// Same pattern as the other GIS content seeders in this series -- this lesson was
// already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered the major sources of spatial data and the distinction between accuracy and precision. This lesson turns to what happens after collection: validating that data is genuinely trustworthy, cleaning it up, and storing it reliably as a project grows.\n\n## Data Quality Assurance and Validation\n\nBefore any collected data gets used in real, serious analysis, it needs proper **quality assurance** — systematically checking that it\'s complete, accurate, and genuinely fit for its intended purpose.\n\nPractical validation techniques include comparing newly collected data against a known, independently verified reference source, checking carefully for logical, internal consistency — for example, confirming that a road segment\'s recorded start and end points actually connect properly to the adjacent, neighboring road segments, and reviewing attribute data for obviously missing or clearly implausible values, such as a recorded rainfall measurement that\'s physically impossible for the actual specific climate and season involved.\n\nThis isn\'t merely a bureaucratic formality. Analysis built directly on top of flawed underlying data will confidently produce flawed, misleading conclusions — and unlike a visibly broken map that\'s obviously wrong, subtly incorrect data often looks completely legitimate and trustworthy on the surface, right up until it drives someone toward a genuinely poor real-world decision.\n\n## Data Preprocessing and Cleaning\n\nRaw collected data is very rarely immediately ready for direct analysis. **Preprocessing** covers the necessary steps taken to properly prepare data: correcting known georeferencing errors, converting between different, mismatched coordinate systems — connecting directly back to what we covered in week two — and standardizing attribute naming and formatting conventions so that similar datasets, potentially collected by different individuals or teams, can actually be properly combined and compared later on.\n\n**Data cleaning** specifically addresses errors and inconsistencies: duplicate records that were accidentally collected more than once, missing values that genuinely need to be either filled in through legitimate means or clearly, honestly flagged, and obvious, clear outliers that likely indicate a collection error rather than a genuine, real anomaly worth investigating further.\n\nI want to be honest with you: this kind of preprocessing and cleaning work isn\'t the most exciting part of GIS, but it\'s often the single most time-consuming part of any genuinely real project, and skipping or rushing it is a common, serious mistake that undermines otherwise genuinely good analytical work later on.\n\n## Geospatial Databases\n\nOnce data is properly collected and cleaned, it needs somewhere reliable to actually live, especially as the volume of data grows across an ongoing project.\n\n**PostGIS** extends PostgreSQL, a widely used, robust open-source database system, adding genuine, native support for spatial data types and spatial queries. This allows genuinely large volumes of spatial data to be stored efficiently and queried with real speed and reliability, well beyond what a simple collection of individual files can practically support at any real scale.\n\n**Geodatabases**, Esri\'s proprietary format used specifically with ArcGIS, serve a broadly similar purpose within that particular commercial software ecosystem.\n\nFor smaller projects, simple file-based formats are often genuinely sufficient. But as a project genuinely grows — more data, more users needing simultaneous access, more frequent updates — a proper geospatial database becomes increasingly essential for reliability and stability.\n\n## Bringing It Together\n\nToday we covered how to properly assess and validate data accuracy, the essential preprocessing work required before real analysis, and how larger datasets get properly, reliably stored. Combined with last lesson\'s data sources and collection methods, good data is genuinely the foundation everything else in this field depends on entirely — no amount of downstream analytical sophistication can meaningfully fix data that was flawed from the very start.\n\nFor your assignment, create a full data collection protocol for a mapping project, addressing source selection, accuracy requirements, and validation steps. For your practical exercise, collect real field data using mobile GPS, then import and properly validate it within QGIS.\n\nNext week, we cover remote sensing and satellite imagery in real depth — a major, genuinely important data source we\'ve only briefly touched on so far.';

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
