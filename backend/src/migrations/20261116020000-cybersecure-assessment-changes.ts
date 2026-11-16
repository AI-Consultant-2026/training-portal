import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { CYBERSECURE_WORKFORCE } from "../seeders/data/curriculumCorporateCyberSecure";
import { CORPORATE_LESSON_IMAGES } from "../seeders/data/curriculumCorporateImages";

// CyberSecure Workforce Essentials, owner's changes of 2026-11-16:
// - the twelve module quizzes are removed (the unscored introductory assessment stays);
// - the project (Employee Cybersecurity Action Plan) is removed;
// - the final assessment becomes 30 multiple-choice questions across eight topics, pass 80%
//   (its 3-attempt limit and 24-hour gap stay);
// - every knowledge check becomes three questions (multiple choice, true or false, scenario),
//   three learner reflections are added, and the last lesson describes the new final and the
//   course feedback questionnaire. Lesson content is re-written from the data file (matched by
//   module number and lesson order), and the final lesson's diagram is refreshed.
// Removing quizzes and the project also removes any attempts and submissions on them.
// Idempotent; a database without the course is skipped.
const SLUG = CYBERSECURE_WORKFORCE.slug;
const PASS_MARK = 80;
const FINAL_MINUTES = 45;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    const [courseRows] = await q.query(`SELECT id FROM courses WHERE slug = ?`, { replacements: [SLUG] });
    const course = (courseRows as { id: string }[])[0];
    if (!course) return;

    await q.transaction(async (transaction) => {
      await q.query(
        `DELETE FROM quizzes WHERE title LIKE 'Module % Assessment'
           AND module_id IN (SELECT id FROM modules WHERE course_id = :course)`,
        { replacements: { course: course.id }, transaction },
      );
      await q.query(`DELETE FROM capstones WHERE course_id = :course`, { replacements: { course: course.id }, transaction });

      const questions = CYBERSECURE_WORKFORCE.finalAssessment;
      const [finalRows] = await q.query(
        `SELECT id FROM quizzes WHERE title = 'Final Assessment'
           AND module_id IN (SELECT id FROM modules WHERE course_id = :course)`,
        { replacements: { course: course.id }, transaction },
      );
      const final = (finalRows as { id: string }[])[0];
      if (final) {
        await q.query(`DELETE FROM quiz_questions WHERE quiz_id = :quiz`, { replacements: { quiz: final.id }, transaction });
        const now = new Date();
        const questionRows: Record<string, unknown>[] = [];
        const answerRows: Record<string, unknown>[] = [];
        questions.forEach((question, qIndex) => {
          const questionId = crypto.randomUUID();
          questionRows.push({
            id: questionId,
            quiz_id: final.id,
            question_text: question.text,
            question_type: question.type,
            points: question.points,
            order: qIndex + 1,
            explanation: question.explanation,
            created_at: now,
          });
          question.answers.forEach((answer, aIndex) => {
            answerRows.push({
              id: crypto.randomUUID(),
              question_id: questionId,
              answer_text: answer.text,
              is_correct: answer.isCorrect,
              order: aIndex + 1,
            });
          });
        });
        await queryInterface.bulkInsert("quiz_questions", questionRows, { transaction });
        await queryInterface.bulkInsert("quiz_answers", answerRows, { transaction });
        const pass = Math.ceil((questions.length * PASS_MARK) / 100);
        await q.query(
          `UPDATE quizzes SET question_count = :count, passing_score = :passMark, time_limit_minutes = :minutes,
             description = :description, updated_at = NOW()
           WHERE id = :quiz`,
          {
            replacements: {
              quiz: final.id,
              count: questions.length,
              passMark: PASS_MARK,
              minutes: FINAL_MINUTES,
              description: `${questions.length} multiple-choice questions covering the whole course, most of them workplace scenarios. Pass mark: ${pass} out of ${questions.length} (${PASS_MARK}%).`,
            },
            transaction,
          },
        );
      }

      for (const mod of CYBERSECURE_WORKFORCE.modules) {
        for (const lesson of mod.lessons) {
          await q.query(
            `UPDATE lessons SET content = :content
             WHERE "order" = :order
               AND module_id = (SELECT id FROM modules WHERE course_id = :course AND week_number = :week)`,
            { replacements: { content: lesson.content, order: lesson.order, course: course.id, week: mod.moduleNumber }, transaction },
          );
        }
      }

      const diagram = CORPORATE_LESSON_IMAGES.find(
        (e) => e.courseSlug === SLUG && e.moduleNumber === 13 && e.lessonTitle === "Final assessment",
      );
      if (diagram) {
        const url = `data:image/svg+xml;base64,${Buffer.from(diagram.svg, "utf8").toString("base64")}`;
        await q.query(
          `UPDATE lessons SET images = CAST(:images AS jsonb)
           WHERE title = :title
             AND module_id = (SELECT id FROM modules WHERE course_id = :course AND week_number = 13)`,
          {
            replacements: {
              images: JSON.stringify([{ url, caption: diagram.caption, afterParagraph: diagram.afterParagraph }]),
              title: diagram.lessonTitle,
              course: course.id,
            },
            transaction,
          },
        );
      }
    });
  },

  // The removed quizzes, questions and project can't be rebuilt here; restore from a backup.
  down: async () => {},
};
