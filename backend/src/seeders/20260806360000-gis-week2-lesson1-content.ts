import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 2;
const LESSON_TITLE = "Latitude, Longitude, and Map Projections";

const PLACEHOLDER_CONTENT =
  "How coordinate systems locate points on Earth, and why every flat map projection — including UTM, used across Nigeria — involves some tradeoff in accuracy.";

// Same pattern as the other GIS content seeders in this series -- this lesson was
// already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last week we covered what GIS is and the fundamental distinction between raster and vector data. This week, we tackle a genuinely fascinating problem that every mapmaker has faced for centuries: the earth is round, but every map you\'ve ever looked at is flat. Understanding how we solve that problem is essential before we can do any serious analytical work.\n\n## Coordinate Systems\n\nTo locate anything precisely on earth, we need a coordinate system — a standardized method for assigning a unique location to every single point on the planet\'s surface.\n\nThe most familiar is the **geographic coordinate system**, using latitude and longitude, measured in degrees. Latitude measures position north or south of the equator; longitude measures position east or west of the Prime Meridian, which passes through Greenwich, England. Together, a latitude and longitude pair uniquely identifies any location on earth — for example, Asaba sits at approximately 6.2 degrees north latitude and 6.7 degrees east longitude.\n\nHere\'s the genuinely tricky part: because the earth is a sphere, or more precisely a slightly flattened spheroid, measuring degrees of latitude and longitude doesn\'t correspond to a consistent, uniform physical distance everywhere. A degree of longitude represents a much shorter actual physical distance near the poles than it does at the equator. This creates real, practical problems for accurate distance and area measurement, which brings us directly to projections.\n\n## Map Projections\n\nA **map projection** is a mathematical method for representing the curved surface of the earth on a flat plane — your screen or a printed paper map. Every single projection necessarily introduces some form of distortion, because it is mathematically impossible to flatten a sphere without distorting something in the process — you can preserve accurate area, accurate shape, accurate distance, or accurate direction, but never genuinely all four simultaneously in the same single projection.\n\nDifferent projections make different practical trade-offs. The Mercator projection, which many of you have seen used for world maps, preserves angles and shape well, which is why it was historically valuable for sea navigation, but it dramatically distorts the true relative size of land areas, particularly near the poles — this is exactly why Greenland appears roughly the same size as Africa on a standard Mercator map, when in genuine physical reality Africa is approximately fourteen times larger.\n\nFor working specifically within Nigeria, you\'ll commonly use the **Universal Transverse Mercator, UTM**, system, which divides the entire earth into narrow zones and provides highly accurate distance and area measurements within each specific zone — genuinely important for practical work like calculating field area or precise infrastructure distances.\n\nThe critical practical lesson here: always know which coordinate system and projection your data is actually using, and ensure all layers within a single project are properly aligned to match. Mismatched projections are one of the most common — and most confusing — beginner mistakes in all of GIS work, and they can silently produce visibly wrong results, sometimes without any obvious error message at all.\n\n## Bringing It Together\n\nThis lesson covered how coordinate systems precisely locate anything on earth, and how map projections mathematically translate that curved surface onto a flat plane — always at the cost of some form of distortion. Getting this right, and knowing which system your own data actually uses, is essential before any serious analytical work.\n\nNext lesson turns to the essential communication elements every professional map needs — scale, legend, orientation — and a practical comparison of the two major GIS software platforms.';

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
