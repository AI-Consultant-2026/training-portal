import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 2;
const LESSON_TITLE = "System Architectures and Solar Resource Assessment";

const PLACEHOLDER_CONTENT =
  "Comparing grid-tied, off-grid, and hybrid system types, and using peak sun hour data to estimate a location's daily solar energy potential.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered the practical factors — temperature, shading, dust, panel angle — that separate a panel\'s rated specification from its real-world output. This lesson turns to two more foundational design questions: which system architecture actually fits a given customer, and how much usable sunlight a specific location genuinely receives.\n\n## System Types: Grid-Tied, Off-Grid, and Hybrid\n\nBefore designing any specific system, you need to determine which of three fundamental architectures actually fits a particular customer\'s real, specific situation.\n\nA **grid-tied system** connects directly to the existing centralized electrical grid, feeding excess generated solar power back into that grid when production exceeds current demand, and drawing supplemental power from the grid when solar production alone is genuinely insufficient. This is generally the least expensive system type, since it doesn\'t require battery storage at all, but it offers no backup power whatsoever during a grid outage — an important, genuinely serious limitation in regions with unreliable centralized grid access.\n\nAn **off-grid system** operates entirely independently, with absolutely no connection to the centralized grid at all, relying entirely on solar generation combined with battery storage to reliably meet all of a location\'s energy needs continuously. This requires meaningfully larger, more carefully sized battery capacity and generally costs considerably more upfront, but it provides genuine energy independence — an especially valuable, practical characteristic in areas without reliable centralized grid access at all.\n\nA **hybrid system** combines both approaches: connected to the centralized grid, but also including battery storage specifically for backup power during outages, or to intelligently reduce peak-time reliance on grid electricity. This offers a genuinely practical, well-balanced middle ground, and for many Nigerian customers dealing with a partially reliable, sometimes inconsistent grid, hybrid systems often represent the most genuinely sensible, practical choice available.\n\nChoosing correctly between these three architectures depends on customer priorities around cost, the reliability of local grid access, and how much genuine energy independence a customer specifically values — precisely the kind of assessment you\'ll need to make thoughtfully for this week\'s practical exercise.\n\n## Solar Resource Assessment and Irradiance Data\n\nBefore sizing any actual system, you need reliable data on precisely how much solar energy a specific location genuinely receives. This is measured through **solar irradiance** — the power of solar radiation received per unit of surface area, typically expressed in watts per square meter.\n\nFor practical system design purposes, we more commonly use **peak sun hours** — a genuinely useful simplification representing the equivalent number of hours per day at a standardized, ideal irradiance level that would deliver the exact same total daily energy as the real, actual variable irradiance pattern throughout that day. A location with an average of five peak sun hours per day receives the equivalent of five hours at that ideal standard intensity, even though real, actual sunlight naturally varies continuously throughout the day, from a low sunrise angle, through peak midday intensity, back down through sunset.\n\nFor the State, average peak sun hours generally fall somewhere in a range that supports genuinely viable solar system design, though real, meaningful seasonal variation exists between wetter and drier periods, and this seasonal variation is precisely why real, genuine historical climate data matters so much for accurate system design, rather than relying on any single average annual figure alone.\n\nReliable sources for this specific data include NASA\'s POWER database, which provides freely available solar irradiance data for locations essentially anywhere in the world, and various tools provided directly by system design software, including PVsyst and HOMER, which we\'ll cover next week.\n\nThe practical calculation you\'ll be doing for both this week\'s assignment and practical exercise follows a straightforward core formula: estimated daily energy output equals total panel capacity, in kilowatts, multiplied by peak sun hours for that specific location, multiplied by an overall system efficiency factor that reasonably accounts for real-world losses like the ones we discussed last lesson — temperature effects, dust accumulation, and general wiring and equipment losses throughout the system.\n\n## Bringing It Together\n\nToday we covered the three fundamental system architectures and when each one genuinely makes sense, and how to properly assess a location\'s actual solar resource using peak sun hour data. Combined with last lesson\'s real-world efficiency factors, this is the essential foundation for actually sizing a complete, working system, which we\'ll cover directly next week.\n\nFor your assignment, calculate genuine solar potential for three different locations across the State, using real climate data. For your practical exercise, assess solar resource availability in real, specific detail for one particular State location.\n\nNext week, we cover component sizing, load calculation, and the professional design software used to bring a complete solar system design together.';

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
