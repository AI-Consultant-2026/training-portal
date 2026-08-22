import { QueryInterface, DataTypes } from "sequelize";

// Same admin-controlled kill switch as quizzes (see 20260819190000-add-is-enabled-to-quizzes.ts)
// -- lets a capstone be pulled from student access without deleting it. Defaults true so
// every existing/future capstone stays exactly as available as it is today unless
// explicitly turned off.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("capstones", "is_enabled", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("capstones", "is_enabled");
  },
};
