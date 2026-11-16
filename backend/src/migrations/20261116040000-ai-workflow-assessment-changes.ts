import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { AI_WORKFLOW } from "../seeders/data/curriculumCorporateAiWorkflow";
import { CORPORATE_LESSON_IMAGES } from "../seeders/data/curriculumCorporateImages";

// AI Workflow Productivity & Process Transformation, owner's changes of 2026-11-16:
// - the nine module quizzes are removed (the unscored introductory assessment stays);
// - the final assessment becomes 30 questions (24 multiple choice, 3 true or false, 3 scenarios)
//   across eight topics, pass 80% (its 3-attempt limit and 24-hour gap stay);
// - the project becomes a fictional business scenario (Crestview Property Services) with seven
//   tasks, marked out of 100 (five criteria of 20), pass 70; the project record is updated in
//   place, so any submissions already made stay attached to it;
// - every knowledge check becomes three questions (multiple choice, true or false, scenario),
//   three learner reflections are added, and the final lessons describe the new final, project
//   and course feedback questionnaire. Lesson content and module descriptions are re-written from
//   the data file (matched by module number and lesson order), and the module 10 diagrams refreshed.
// Removing the module quizzes also removes any attempts on them.
// Idempotent; a database without the course is skipped.
const SLUG = AI_WORKFLOW.slug;
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

      const questions = AI_WORKFLOW.finalAssessment;
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
              description: `${questions.length} questions covering the whole course: 24 multiple-choice, 3 true-or-false and 3 workplace scenarios. Pass mark: ${pass} out of ${questions.length} (${PASS_MARK}%).`,
            },
            transaction,
          },
        );
      }

      if (AI_WORKFLOW.capstone) {
        await q.query(
          `UPDATE capstones SET title = :title, description = :description, points_total = 100, updated_at = NOW()
           WHERE course_id = :course`,
          { replacements: { ...AI_WORKFLOW.capstone, course: course.id }, transaction },
        );
      }

      for (const mod of AI_WORKFLOW.modules) {
        await q.query(`UPDATE modules SET description = :description WHERE course_id = :course AND week_number = :week`, {
          replacements: { description: mod.description, course: course.id, week: mod.moduleNumber },
          transaction,
        });
        for (const lesson of mod.lessons) {
          await q.query(
            `UPDATE lessons SET content = :content
             WHERE "order" = :order
               AND module_id = (SELECT id FROM modules WHERE course_id = :course AND week_number = :week)`,
            { replacements: { content: lesson.content, order: lesson.order, course: course.id, week: mod.moduleNumber }, transaction },
          );
        }
      }

      const diagrams = CORPORATE_LESSON_IMAGES.filter(
        (e) => e.courseSlug === SLUG && e.moduleNumber === 10 && e.lessonTitle !== "Course review",
      );
      for (const diagram of diagrams) {
        const url = `data:image/svg+xml;base64,${Buffer.from(diagram.svg, "utf8").toString("base64")}`;
        await q.query(
          `UPDATE lessons SET images = CAST(:images AS jsonb)
           WHERE title = :title
             AND module_id = (SELECT id FROM modules WHERE course_id = :course AND week_number = 10)`,
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

  // The removed quizzes and questions can't be rebuilt here; restore from a backup.
  down: async () => {},
};
