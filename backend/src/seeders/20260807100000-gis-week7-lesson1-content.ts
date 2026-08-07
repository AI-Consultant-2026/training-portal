import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 7;
const LESSON_TITLE = "Buffering, Overlay, and Surface Analysis";

const NEW_CONTENT =
  "Welcome to Module 5. We now have a genuinely rich data foundation — GIS fundamentals, careful data collection, satellite imagery, and drone-derived mapping products. This week, we finally turn all of that into real analytical answers: the actual spatial analysis techniques that let you genuinely answer meaningful, practical questions rather than just producing visually attractive maps.\n\n## Buffering, Overlay, and Proximity Analysis\n\n**Buffering** creates a defined zone at a specified distance around a chosen feature. If you need to identify every single farm within five kilometers of a proposed new irrigation canal, buffering generates precisely that five-kilometer zone around the canal, which you can then use to directly identify every relevant farm falling genuinely within it.\n\n**Overlay analysis** combines two or more separate data layers to identify genuine relationships between them. A classic, widely used example: combining a soil quality layer with a rainfall layer to identify specific areas that are simultaneously suitable on both criteria at once for a particular crop — precisely this kind of overlay is exactly what supports the agricultural planning use case we first introduced back in week one.\n\n**Proximity analysis** answers questions specifically about nearness and distance — which health facility is genuinely closest to any given community, or which specific areas fall outside a reasonable, acceptable distance from any clean water source at all. This directly supports meaningful equity analysis: identifying underserved areas that a purely visual look at a map might otherwise miss entirely.\n\n## Interpolation and Surface Analysis\n\nOften, you have accurate measurements at only specific, discrete points, but you genuinely need to understand values across an entire continuous area. This is exactly the purpose of **interpolation** — mathematically estimating values at unmeasured locations based on the pattern of nearby known, measured values.\n\nFor example, if you have accurate rainfall measurements from twenty specific weather stations scattered across the State, interpolation can generate a genuinely reasonable, continuous estimate of rainfall across the entire region between those station locations, based on the general, sensible assumption that nearby locations tend to experience genuinely similar conditions.\n\n**Surface analysis** then works directly with this kind of continuous data, commonly represented as raster data, which we first introduced back in week one. Common surface analysis techniques include slope analysis, identifying how steep terrain is at every single point, directly relevant for assessing erosion risk or construction feasibility, and aspect analysis, identifying precisely which direction a slope faces, which meaningfully affects sun exposure and consequently agricultural suitability for many specific crops.\n\n## Bringing It Together\n\nThis lesson covered buffering, overlay, and proximity analysis for relationship- and distance-based questions, and interpolation and surface analysis for working confidently with continuous data like rainfall, slope, and aspect.\n\nNext lesson turns to network analysis for connected systems like roads and pipes, and thematic mapping, the techniques for communicating all of this analysis clearly and effectively to others.";

const OLD_CONTENT =
  "Using buffering, overlay, proximity, and interpolation to answer real spatial questions from collected data.";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [NEW_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [OLD_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },
};
