import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Nullable, same reasoning as course_interest (see
    // 20260809020000-add-location-and-course-interest-to-users.ts): existing rows have
    // no value, and it's only enforced as a real choice by the register form itself.
    await queryInterface.addColumn("users", "university", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("users", "university");
  },
};
