import bcrypt from "bcryptjs";
import { QueryInterface } from "sequelize";
import { ADMIN_ID, INSTRUCTOR_ID } from "../utils/seedIds";

const DEMO_PASSWORD = "ChangeMe123!";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
    const now = new Date();

    await queryInterface.bulkInsert("users", [
      {
        id: ADMIN_ID,
        email: "admin@trainingportal.local",
        password_hash: passwordHash,
        first_name: "Portal",
        last_name: "Admin",
        role: "admin",
        status: "active",
        profile_data: JSON.stringify({}),
        created_at: now,
        updated_at: now,
      },
      {
        id: INSTRUCTOR_ID,
        email: "instructor@trainingportal.local",
        password_hash: passwordHash,
        first_name: "Demo",
        last_name: "Instructor",
        role: "instructor",
        status: "active",
        profile_data: JSON.stringify({}),
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", { id: [ADMIN_ID, INSTRUCTOR_ID] });
  },
};
