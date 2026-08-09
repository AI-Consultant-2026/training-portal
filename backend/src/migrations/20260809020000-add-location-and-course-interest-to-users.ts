import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("users", "location", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Nigeria",
    });
    // Nullable: existing rows have no value, and the field is only enforced as
    // required going forward by the register form/validator, not at the DB level.
    await queryInterface.addColumn("users", "course_interest", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("users", "location");
    await queryInterface.removeColumn("users", "course_interest");
  },
};
