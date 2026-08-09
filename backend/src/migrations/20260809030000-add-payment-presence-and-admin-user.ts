import { randomUUID } from "crypto";
import { DataTypes, QueryInterface } from "sequelize";

// Bcrypt hash of a generated password, created once for this migration.
// Plaintext was shared with the project owner directly and is not stored in the repo.
const ADMIN_PASSWORD_HASH = "$2a$10$KAciJ.zNToyl/9vpaVNwJ.S0twTFFwOBI34omKhG1qZoEN1pxGMN.";
const ADMIN_EMAIL = "admin@trainingportal.local";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("enrollments", "payment_confirmed", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn("enrollments", "payment_confirmed_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "last_active_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });

    // Idempotent: safe to re-run (e.g. across environments) without a duplicate-email error.
    const [existing] = (await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = :email",
      { replacements: { email: ADMIN_EMAIL } },
    )) as [Array<{ id: string }>, unknown];
    if (existing.length === 0) {
      await queryInterface.bulkInsert("users", [
        {
          id: randomUUID(),
          email: ADMIN_EMAIL,
          password_hash: ADMIN_PASSWORD_HASH,
          first_name: "Portal",
          last_name: "Admin",
          role: "admin",
          status: "active",
          profile_data: JSON.stringify({}),
          location: "Nigeria",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", { email: ADMIN_EMAIL });
    await queryInterface.removeColumn("users", "last_active_at");
    await queryInterface.removeColumn("enrollments", "payment_confirmed_at");
    await queryInterface.removeColumn("enrollments", "payment_confirmed");
  },
};
