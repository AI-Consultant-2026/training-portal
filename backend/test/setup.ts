import { sequelize } from "../src/models";

afterEach(async () => {
  const tables = [
    "refresh_tokens",
    "progress_tracking",
    "quiz_responses",
    "quiz_attempts",
    "quiz_answers",
    "quiz_questions",
    "quizzes",
    "assignment_submissions",
    "assignments",
    "enrollments",
    "lessons",
    "modules",
    "courses",
    "users",
  ];
  await sequelize.query(`TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY CASCADE`);
});

afterAll(async () => {
  await sequelize.close();
});
