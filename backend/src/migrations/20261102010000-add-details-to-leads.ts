import { QueryInterface, DataTypes } from "sequelize";

// Corporate enquiries from the AI Workflow Productivity pages (2026-11-02) carry more
// than a course lead: job title, organisation, team size, what they need, their message
// and when they agreed to be contacted. Kept together in one JSON column; course leads
// leave it null.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("leads", "details", { type: DataTypes.JSONB, allowNull: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "details");
  },
};
