import { QueryInterface, DataTypes } from "sequelize";

// Referral rewards in each country's own money (2026-10-30). The *_amount_ngn columns keep
// their names but now hold an amount in these currencies: the referrer's reward in the
// referrer's country's currency, the friend's in the friend's. Existing rows are Naira.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    for (const column of ["referrer_reward_currency", "referee_reward_currency"]) {
      await queryInterface.addColumn("referrals", column, {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "NGN",
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("referrals", "referrer_reward_currency");
    await queryInterface.removeColumn("referrals", "referee_reward_currency");
  },
};
