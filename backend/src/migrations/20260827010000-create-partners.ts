import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("partners", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      // "Job Board" | "NYSC / SAED" | "University Career Centre" | "Community Channel" --
      // kept as a plain string with app-level (zod) validation rather than a DB enum,
      // same reasoning as leads.university/leads.source: this list is still settling
      // and a string column avoids an ALTER TYPE migration every time it changes.
      category: { type: DataTypes.STRING, allowNull: false },
      sector: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: true },
      contact: { type: DataTypes.STRING, allowNull: true },
      cost: { type: DataTypes.STRING, allowNull: true },
      // "not-started" | "drafted" | "sent" | "in-conversation" | "partnered" | "declined"
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "not-started" },
      last_contacted: { type: DataTypes.DATEONLY, allowNull: true },
      renewal_date: { type: DataTypes.DATEONLY, allowNull: true },
      notes: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("partners");
  },
};
