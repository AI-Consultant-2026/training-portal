import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 1;
const OLD_LESSON_TITLE = "Coordinate Systems and Projections";
const NEW_LESSON_TITLE = "Real-World GIS Use Cases & Getting Started with QGIS";

const PLACEHOLDER_CONTENT = "How GIS software represents locations on a curved earth in 2D maps.";

// This lesson's original DB title, "Coordinate Systems and Projections," turned out to
// duplicate Week 2 Lesson 1 ("Latitude, Longitude, and Map Projections" in
// curriculumGis.ts, which already has a full quiz bank on that exact topic) -- the
// Week 1 lecture script itself explicitly defers coordinate systems to "next week."
// User chose to rename this lesson (rather than write duplicate content or leave the
// title inaccurate) to reflect what the Week 1 script actually left unused: real-world
// GIS use cases and the first hands-on QGIS exercise. This seeder renames the title AND
// swaps in the real content for the already-seeded row.
const FULL_CONTENT =
  'Last lesson covered what GIS fundamentally is, and the crucial distinction between raster and vector data models. This lesson grounds that in genuinely local, practical context, and gives you your first hands-on experience with the software you\'ll use throughout this course.\n\n## Real-World GIS Use Cases in the State\n\nLet\'s ground all of this in genuinely local, practical context, because that\'s exactly where this course\'s real value lies.\n\nIn **agriculture**, GIS can combine soil quality data, historical rainfall patterns, and existing crop yield records to identify which specific areas are best suited for particular crops, or where irrigation infrastructure investment would deliver the greatest genuine benefit.\n\nIn **water resources**, GIS can map existing water access points, identify underserved communities most in need of new infrastructure, and model exactly how flooding is likely to spread during heavy rainy seasons — directly informing where flood defenses would be most urgently and effectively needed.\n\nIn **urban planning**, GIS supports decisions about road network design, zoning, and where new schools or clinics would most effectively serve the greatest number of underserved residents, based on real, current population distribution rather than outdated assumptions.\n\nI want you to notice something important about every one of these examples: none of them are purely academic. They\'re the exact kind of real, practical work that supports genuinely better decision-making by governments, NGOs, and businesses operating right here in this region. This is precisely why this course exists.\n\n## Getting Started with QGIS\n\nThis lesson\'s practical exercise introduces you to **QGIS**, a completely free and genuinely powerful, professional-grade GIS software package — an enormous advantage for you, since you can build real, valuable skills without needing any expensive commercial licensing. You\'ll be creating your very first basic map using provided datasets, getting comfortable with the core interface: loading layers, adjusting how they\'re symbolized and displayed, and basic navigation around the map canvas.\n\nDon\'t worry at all about making it look polished or professional today. The goal for this very first exercise is simply comfort and familiarity with the interface itself — everything else builds naturally from there.\n\n## Bringing It Together\n\nToday we covered genuinely real, local applications that show exactly why this field matters, and got your first hands-on comfort with QGIS. Combined with last lesson\'s raster and vector fundamentals, this foundation is what makes every single topic in the weeks ahead — coordinate systems, remote sensing, drone mapping, spatial analysis — actually make sense once we get there.\n\nFor your assignment, research specific GIS applications already in use, or clearly needed, in the State, and document your findings. For your practical exercise, get comfortable creating a basic map in QGIS using the provided datasets.\n\nNext week, we cover coordinate systems and projections — how a genuinely round earth gets accurately represented on a flat map — along with map fundamentals and a proper overview of professional GIS software.';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const [rows] = await queryInterface.sequelize.query(
      `SELECT l.id AS lesson_id
       FROM lessons l
       JOIN modules m ON m.id = l.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [COURSE_SLUG, WEEK_NUMBER, OLD_LESSON_TITLE] },
    );
    const row = (rows as { lesson_id: string }[])[0];
    if (!row) {
      throw new Error(`Could not find lesson "${OLD_LESSON_TITLE}" (week ${WEEK_NUMBER}) for ${COURSE_SLUG}`);
    }

    await queryInterface.sequelize.query(`UPDATE lessons SET title = ?, content = ? WHERE id = ?`, {
      replacements: [NEW_LESSON_TITLE, FULL_CONTENT, row.lesson_id],
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET title = ?, content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [OLD_LESSON_TITLE, PLACEHOLDER_CONTENT, COURSE_SLUG, WEEK_NUMBER, NEW_LESSON_TITLE] },
    );
  },
};
