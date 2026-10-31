import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";
import { WEEKS } from "../seeders/data/curriculumAiMl";

// Adds the Artificial Intelligence & Machine Learning Fundamentals course: 18 days of 2
// lessons each (every lesson with an embedded video), a daily 20-question quiz bank with
// 10 drawn per attempt, a daily assignment and one capstone -- the same structure as
// Cyber Security Fundamentals.
//
// Written as a migration rather than a seeder because seeders never run in production.
// The course is inserted only into a database that already holds the real catalogue
// (detected by the Cyber Security Fundamentals course, whose instructor_id it copies);
// fresh and test databases are left alone, matching applyBriefs' convention that courses
// missing from the database are simply skipped. Re-running is a no-op once the course
// exists. Assignment and capstone briefs are applied the standard way, via applyBriefs.
const SLUG = "ai-machine-learning-fundamentals";
const REFERENCE_SLUG = "cyber-security-fundamentals";
const BANK_SIZE = 20;
const QUESTIONS_PER_ATTEMPT = 10;
const TIME_LIMIT_MINUTES = 20;
const PASSING_SCORE = 70;

const TITLE = "Artificial Intelligence & Machine Learning Fundamentals";
const DESCRIPTION =
  "A practical, beginner-friendly introduction to artificial intelligence and machine learning: how AI learns from data, Python and data analysis, supervised and unsupervised learning, model evaluation, generative AI and prompt engineering, AI automation, deep learning, natural language processing and computer vision, AI across industries, responsible AI and AI security, finishing with a capstone project you build and present yourself. No coding or maths background needed.";
const CAPSTONE_TITLE = "AI & Machine Learning Capstone Project";
const CAPSTONE_DESCRIPTION =
  "Choose one of eight project options (AI business assistant, customer-service AI assistant, predictive analytics model, AI automation workflow, or AI for mining, agriculture, energy or education) and plan, build, evaluate, document and present a complete AI project.";

async function findCourseId(queryInterface: QueryInterface, slug: string): Promise<string | null> {
  const [rows] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
    replacements: [slug],
  });
  const row = (rows as { id: string }[])[0];
  return row ? row.id : null;
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    WEEKS.forEach((week) => {
      if (week.quizQuestions.length !== BANK_SIZE) {
        throw new Error(
          `Expected ${BANK_SIZE} quiz questions for AI & ML day ${week.weekNumber}, got ${week.quizQuestions.length}`,
        );
      }
    });

    if (await findCourseId(queryInterface, SLUG)) return;
    const [refRows] = await queryInterface.sequelize.query(
      `SELECT instructor_id FROM courses WHERE slug = ?`,
      { replacements: [REFERENCE_SLUG] },
    );
    const reference = (refRows as { instructor_id: string | null }[])[0];
    if (!reference) return;

    const now = new Date();
    const courseId = crypto.randomUUID();
    await queryInterface.bulkInsert("courses", [
      {
        id: courseId,
        title: TITLE,
        slug: SLUG,
        description: DESCRIPTION,
        instructor_id: reference.instructor_id,
        duration_weeks: WEEKS.length,
        level: "beginner",
        status: "published",
        metadata: JSON.stringify({}),
        created_at: now,
        updated_at: now,
      },
    ]);

    const moduleRows: Record<string, unknown>[] = [];
    const moduleIdByWeek = new Map<number, string>();
    WEEKS.forEach((week) => {
      const moduleId = crypto.randomUUID();
      moduleIdByWeek.set(week.weekNumber, moduleId);
      moduleRows.push({
        id: moduleId,
        course_id: courseId,
        title: week.moduleTitle,
        description: week.moduleDescription,
        week_number: week.weekNumber,
        order: week.weekNumber,
        status: "published",
        created_at: now,
      });
    });
    await queryInterface.bulkInsert("modules", moduleRows);

    const lessonRows: Record<string, unknown>[] = [];
    WEEKS.forEach((week) => {
      const moduleId = moduleIdByWeek.get(week.weekNumber);
      week.lessons.forEach((lesson) => {
        lessonRows.push({
          id: crypto.randomUUID(),
          module_id: moduleId,
          title: lesson.title,
          content: lesson.content,
          video_url: lesson.videoUrl ?? null,
          resources: JSON.stringify({}),
          images: JSON.stringify(lesson.images ?? []),
          order: lesson.order,
          duration_minutes: lesson.durationMinutes,
          created_at: now,
        });
      });
    });
    await queryInterface.bulkInsert("lessons", lessonRows);

    const assignmentRows: Record<string, unknown>[] = [];
    const quizRows: Record<string, unknown>[] = [];
    const quizIdByWeek = new Map<number, string>();
    WEEKS.forEach((week) => {
      const moduleId = moduleIdByWeek.get(week.weekNumber);
      const dueDate = new Date(now.getTime() + (week.weekNumber + 1) * 7 * 24 * 60 * 60 * 1000);

      assignmentRows.push({
        id: crypto.randomUUID(),
        module_id: moduleId,
        title: week.assignmentTitle,
        description: week.assignmentDescription,
        due_date: dueDate,
        file_required: week.fileRequired,
        grading_rubric: null,
        points_total: 100,
        created_at: now,
        updated_at: now,
      });

      const quizId = crypto.randomUUID();
      quizIdByWeek.set(week.weekNumber, quizId);
      quizRows.push({
        id: quizId,
        module_id: moduleId,
        title: `Day ${week.weekNumber} Quiz`,
        description: "A quiz covering this day's topics, drawn from a larger question bank.",
        due_date: dueDate,
        time_limit_minutes: TIME_LIMIT_MINUTES,
        passing_score: PASSING_SCORE,
        question_count: QUESTIONS_PER_ATTEMPT,
        shuffle_questions: true,
        created_at: now,
        updated_at: now,
      });
    });
    await queryInterface.bulkInsert("assignments", assignmentRows);
    await queryInterface.bulkInsert("quizzes", quizRows);

    const questionRows: Record<string, unknown>[] = [];
    const answerRows: Record<string, unknown>[] = [];
    WEEKS.forEach((week) => {
      const quizId = quizIdByWeek.get(week.weekNumber);
      week.quizQuestions.forEach((q, qIndex) => {
        const questionId = crypto.randomUUID();
        questionRows.push({
          id: questionId,
          quiz_id: quizId,
          question_text: q.text,
          question_type: q.type,
          points: q.points,
          order: qIndex + 1,
          explanation: q.explanation,
          created_at: now,
        });
        q.answers.forEach((a, aIndex) => {
          answerRows.push({
            id: crypto.randomUUID(),
            question_id: questionId,
            answer_text: a.text,
            is_correct: a.isCorrect,
            order: aIndex + 1,
          });
        });
      });
    });
    await queryInterface.bulkInsert("quiz_questions", questionRows);
    await queryInterface.bulkInsert("quiz_answers", answerRows);

    await queryInterface.bulkInsert("capstones", [
      {
        id: crypto.randomUUID(),
        course_id: courseId,
        title: CAPSTONE_TITLE,
        description: CAPSTONE_DESCRIPTION,
        due_date: new Date(now.getTime() + (WEEKS.length + 1) * 7 * 24 * 60 * 60 * 1000),
        file_required: true,
        grading_rubric: null,
        points_total: 100,
        created_at: now,
        updated_at: now,
      },
    ]);

    await applyBriefs(queryInterface);
  },

  // Removes the course and everything under it. Refuses once anyone has enrolled, so a
  // rollback can never silently delete students' progress, submissions or payments.
  down: async (queryInterface: QueryInterface) => {
    const courseId = await findCourseId(queryInterface, SLUG);
    if (!courseId) return;

    const [enrollments] = await queryInterface.sequelize.query(
      `SELECT COUNT(*)::int AS count FROM enrollments WHERE course_id = ?`,
      { replacements: [courseId] },
    );
    const enrolled = (enrollments as { count: number }[])[0].count;
    if (enrolled > 0) {
      throw new Error(`Refusing to remove ${SLUG}: ${enrolled} enrollment(s) exist`);
    }

    // modules, lessons, assignments, quizzes, questions, answers and capstones all
    // cascade from the course row.
    await queryInterface.bulkDelete("courses", { id: courseId });
  },
};
