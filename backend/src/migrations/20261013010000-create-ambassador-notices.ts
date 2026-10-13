import { QueryInterface, DataTypes } from "sequelize";
import { randomUUID } from "crypto";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Notice board on /refer/me (2026-10-13): messages from the Paleon team to
    // ambassadors, posted from /admin/notices. A notice with expires_at in the past is
    // hidden from ambassadors but kept for admins.
    await queryInterface.createTable("ambassador_notices", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      link_url: { type: DataTypes.STRING, allowNull: true },
      link_label: { type: DataTypes.STRING, allowNull: true },
      expires_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // First notice, so it is live as soon as this deploys (seeders never run in prod).
    // Hidden from 3:30pm Nigeria time (14:30 UTC) on the day, after the session.
    const now = new Date();
    await queryInterface.bulkInsert("ambassador_notices", [
      {
        id: randomUUID(),
        title: "Ambassadors Hour on Zoom: Saturday 17 October, 2pm (Nigeria time)",
        body: [
          "Paleon Training is inviting you to a scheduled Zoom meeting.",
          "",
          "Topic: Ambassadors Hour",
          "Time: Saturday 17 October 2026, 2:00pm (Nigeria time)",
          "Meeting ID: 881 3248 8948",
          "Passcode: 695936",
        ].join("\n"),
        link_url: "https://us06web.zoom.us/j/88132488948?pwd=uo9qevNKjb8Af2T0kc9pOO8sQX04Xz.1",
        link_label: "Join Zoom meeting",
        expires_at: new Date("2026-10-17T14:30:00Z"),
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("ambassador_notices");
  },
};
