import { QueryInterface } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";

// Replaces the one-sentence assignment and capstone descriptions of the four live courses
// (Cyber Security Fundamentals, Digital Marketing, GIS and Drone Mapping, HSE Fundamentals)
// with full briefs: overview, instructions, deliverables, assessment criteria, a worked
// example and common mistakes. Only `description` and `grading_rubric` change -- see
// applyBriefs for the details. (Edited briefs are re-applied by later migrations, because a
// migration that has already run in production is never run again.)
module.exports = {
  up: async (queryInterface: QueryInterface) => applyBriefs(queryInterface),

  // The previous one-sentence descriptions are not restored: they remain in the original
  // curriculum seeders, and the detailed briefs are a strict improvement, not something
  // to be rolled back per-row.
  down: async () => undefined,
};
