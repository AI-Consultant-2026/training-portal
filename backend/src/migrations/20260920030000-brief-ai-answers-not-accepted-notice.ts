import { QueryInterface } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";

// Re-applies the briefs now that every "What to submit" section ends with the sentence
// "AI generated answers will not be accepted." The earlier briefs migration
// (20260920020000) has already run in production, so it can't deliver this edit itself.
module.exports = {
  up: async (queryInterface: QueryInterface) => applyBriefs(queryInterface),
  down: async () => undefined,
};
