import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { WEEKS as CYBER_SECURITY } from "./data/curriculumCyberSecurity";
import { WEEKS as DIGITAL_MARKETING } from "./data/curriculumDigitalMarketing";
import { WEEKS as GIS } from "./data/curriculumGis";
import { WEEKS as RENEWABLE_ENERGY } from "./data/curriculumRenewableEnergy";
import { WEEKS as SOCIAL_MEDIA } from "./data/curriculumSocialMedia";
import { WeekSeed } from "./data/curriculumTypes";

const COURSES: { slug: string; weeks: WeekSeed[] }[] = [
  { slug: "cyber-security-fundamentals", weeks: CYBER_SECURITY },
  { slug: "digital-marketing", weeks: DIGITAL_MARKETING },
  { slug: "gis-and-drone-mapping", weeks: GIS },
  { slug: "renewable-energy-digital-systems", weeks: RENEWABLE_ENERGY },
  { slug: "social-media-management-content", weeks: SOCIAL_MEDIA },
];

const BANK_SIZE = 20;
const QUESTIONS_PER_ATTEMPT = 10;
const TIME_LIMIT_MINUTES = 20;
const PASSING_SCORE = 70;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const moduleIdByCourseAndWeek = new Map<string, string>();
    for (const course of COURSES) {
      const weekNumbers = course.weeks.map((w) => w.weekNumber);
      const [modules] = await queryInterface.sequelize.query(
        `SELECT m.id AS module_id, m.week_number AS week_number
         FROM modules m
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number IN (${weekNumbers.map(() => "?").join(",")})`,
        { replacements: [course.slug, ...weekNumbers] },
      );
      (modules as { module_id: string; week_number: number }[]).forEach((m) => {
        moduleIdByCourseAndWeek.set(`${course.slug}:${m.week_number}`, m.module_id);
      });
    }

    const assignmentRows: Record<string, unknown>[] = [];
    const quizRows: Record<string, unknown>[] = [];
    const quizIdByCourseAndWeek = new Map<string, string>();

    COURSES.forEach((course) => {
      course.weeks.forEach((week) => {
        const moduleId = moduleIdByCourseAndWeek.get(`${course.slug}:${week.weekNumber}`);
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
        quizIdByCourseAndWeek.set(`${course.slug}:${week.weekNumber}`, quizId);
        quizRows.push({
          id: quizId,
          module_id: moduleId,
          title: `Week ${week.weekNumber} Quiz`,
          description: "A quiz covering this week's topics, drawn from a larger question bank.",
          due_date: dueDate,
          time_limit_minutes: TIME_LIMIT_MINUTES,
          passing_score: PASSING_SCORE,
          question_count: QUESTIONS_PER_ATTEMPT,
          shuffle_questions: true,
          created_at: now,
          updated_at: now,
        });
      });
    });

    await queryInterface.bulkInsert("assignments", assignmentRows);
    await queryInterface.bulkInsert("quizzes", quizRows);

    const questionRows: Record<string, unknown>[] = [];
    const answerRows: Record<string, unknown>[] = [];

    COURSES.forEach((course) => {
      course.weeks.forEach((week) => {
        const quizId = quizIdByCourseAndWeek.get(`${course.slug}:${week.weekNumber}`);
        if (week.quizQuestions.length !== BANK_SIZE) {
          throw new Error(
            `Expected ${BANK_SIZE} questions for ${course.slug} week ${week.weekNumber}, got ${week.quizQuestions.length}`,
          );
        }
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
    });

    await queryInterface.bulkInsert("quiz_questions", questionRows);
    await queryInterface.bulkInsert("quiz_answers", answerRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const moduleIds: string[] = [];
    for (const course of COURSES) {
      const weekNumbers = course.weeks.map((w) => w.weekNumber);
      const [modules] = await queryInterface.sequelize.query(
        `SELECT m.id AS module_id
         FROM modules m
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number IN (${weekNumbers.map(() => "?").join(",")})`,
        { replacements: [course.slug, ...weekNumbers] },
      );
      moduleIds.push(...(modules as { module_id: string }[]).map((m) => m.module_id));
    }
    if (moduleIds.length === 0) return;

    const [quizzes] = await queryInterface.sequelize.query(
      `SELECT id FROM quizzes WHERE module_id IN (${moduleIds.map(() => "?").join(",")})`,
      { replacements: moduleIds },
    );
    const quizIds = (quizzes as { id: string }[]).map((q) => q.id);

    if (quizIds.length > 0) {
      const [questions] = await queryInterface.sequelize.query(
        `SELECT id FROM quiz_questions WHERE quiz_id IN (${quizIds.map(() => "?").join(",")})`,
        { replacements: quizIds },
      );
      const questionIds = (questions as { id: string }[]).map((q) => q.id);
      if (questionIds.length > 0) {
        await queryInterface.bulkDelete("quiz_answers", { question_id: questionIds });
        await queryInterface.bulkDelete("quiz_questions", { id: questionIds });
      }
      await queryInterface.bulkDelete("quizzes", { id: quizIds });
    }

    await queryInterface.bulkDelete("assignments", { module_id: moduleIds });
  },
};
