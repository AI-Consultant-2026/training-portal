import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Quiz answer feedback (2026-10-16): optional comment from the marker on a short-answer
    // response, shown to the student on the result page and in the "graded" email.
    await queryInterface.addColumn("quiz_responses", "feedback", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("quiz_responses", "feedback");
  },
};
