import { sequelize } from "../src/models";
import { emailAdapter, MemoryEmailAdapter } from "../src/utils/email";

afterEach(async () => {
  (emailAdapter as MemoryEmailAdapter).clear();

  const tables = [
    "leads",
    "partners",
    "refresh_tokens",
    "progress_tracking",
    "video_checkpoint_answers",
    "video_checkpoints",
    "capstone_submissions",
    "capstones",
    "quiz_responses",
    "quiz_attempts",
    "quiz_answers",
    "quiz_questions",
    "quizzes",
    "assignment_submissions",
    "assignments",
    "payments",
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
