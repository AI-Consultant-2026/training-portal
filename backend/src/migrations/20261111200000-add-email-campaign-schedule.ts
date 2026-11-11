import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Email client, 2026-11-11: a draft campaign can be queued to send at a set time.
    // The scheduler (jobs/emailCampaignSchedule.job.ts) starts due drafts through confirmSend().
    await queryInterface.addColumn("email_campaigns", "scheduled_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("email_campaigns", "scheduled_by", {
      type: DataTypes.UUID,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("email_campaigns", "scheduled_by");
    await queryInterface.removeColumn("email_campaigns", "scheduled_at");
  },
};
