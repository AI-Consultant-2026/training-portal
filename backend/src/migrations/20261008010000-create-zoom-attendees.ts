import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Sign-ins from the public /zoom-attendees page (2026-10-08): who attended which
    // Saturday Zoom session. One row per (lowercased email, date attended); a repeat
    // submission for the same session updates the row instead of duplicating it.
    await queryInterface.createTable("zoom_attendees", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      date_attended: { type: DataTypes.DATEONLY, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      wants_updates: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("zoom_attendees", ["email", "date_attended"], {
      unique: true,
      name: "zoom_attendees_email_date_unique",
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("zoom_attendees");
  },
};
