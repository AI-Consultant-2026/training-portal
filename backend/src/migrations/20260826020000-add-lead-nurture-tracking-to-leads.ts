import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Tracks whether each stage of the lead-nurture sequence has fired for a given lead,
    // so the watcher/countdown jobs (backend/src/jobs/leadNurture.job.ts) never send the
    // same email twice, even across restarts or a missed run.
    await queryInterface.addColumn("leads", "welcome_email_sent_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("leads", "reminder_21d_sent_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("leads", "reminder_7d_sent_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("leads", "reminder_1d_sent_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "welcome_email_sent_at");
    await queryInterface.removeColumn("leads", "reminder_21d_sent_at");
    await queryInterface.removeColumn("leads", "reminder_7d_sent_at");
    await queryInterface.removeColumn("leads", "reminder_1d_sent_at");
  },
};
