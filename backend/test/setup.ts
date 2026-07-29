import { sequelize } from "../src/models";

afterEach(async () => {
  const tables = ["refresh_tokens", "enrollments", "lessons", "modules", "courses", "users"];
  await sequelize.query(`TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY CASCADE`);
});

afterAll(async () => {
  await sequelize.close();
});
