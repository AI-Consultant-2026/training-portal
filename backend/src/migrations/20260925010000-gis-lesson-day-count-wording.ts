import { QueryInterface } from "sequelize";

// GIS and Drone Mapping became a 9-day course when Day 9 (industry applications) was
// added on 2026-09-22, but two lessons still described the old 8-day shape:
//   - Day 1, Lesson 1 (now the public free-preview lesson): "Over the next eight days"
//   - Day 8, Lesson 1: "Welcome to our final day" (Day 9 follows it)
// Exact-phrase replacements scoped to this course's lessons, so the migration is a no-op
// on a database without the course and safe to re-run. "the State" wording is deliberate
// (see d52cb73) and left alone.
const COURSE_SLUG = "gis-and-drone-mapping";
const REPLACEMENTS: [string, string][] = [
  ["Welcome to GIS and Drone Mapping. Over the next eight days", "Welcome to GIS and Drone Mapping. Over the next nine days"],
  ["Welcome to our final day of GIS and Drone Mapping.", "Welcome to Day 8 of GIS and Drone Mapping."],
];

async function apply(queryInterface: QueryInterface, pairs: [string, string][]) {
  for (const [from, to] of pairs) {
    await queryInterface.sequelize.query(
      `UPDATE lessons SET content = REPLACE(content, :from, :to)
       WHERE position(:from in content) > 0
         AND module_id IN (
           SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id WHERE c.slug = :slug
         )`,
      { replacements: { from, to, slug: COURSE_SLUG } },
    );
  }
}

module.exports = {
  up: async (queryInterface: QueryInterface) => apply(queryInterface, REPLACEMENTS),
  down: async (queryInterface: QueryInterface) =>
    apply(
      queryInterface,
      REPLACEMENTS.map(([from, to]) => [to, from]),
    ),
};
