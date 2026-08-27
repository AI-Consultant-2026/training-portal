import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Separate from `url` on purpose: `url` is a real, actively-used website link for
    // Job Board partners (jobberman.com etc.) and the table renders it as a clickable
    // link -- storing a person's name there instead would both destroy that data and
    // break the link rendering. This is a clean, dedicated slot for "who to address the
    // outreach email to" (a Career Centre contact person or Vice-Chancellor), used by
    // the draft generator's "Hi [Name]," greeting.
    await queryInterface.addColumn("partners", "contact_name", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("partners", "contact_name");
  },
};
