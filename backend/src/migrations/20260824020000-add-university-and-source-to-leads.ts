import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Both nullable: existing leads have no value, and only the /welcome form itself
    // enforces a real choice (same reasoning as users.university/course_interest).
    await queryInterface.addColumn("leads", "university", {
      type: DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("leads", "source", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "university");
    await queryInterface.removeColumn("leads", "source");
  },
};
