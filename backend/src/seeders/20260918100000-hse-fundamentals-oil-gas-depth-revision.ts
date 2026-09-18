import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { WeekSeed } from "./data/curriculumTypes";
import { WEEKS, CAPSTONE } from "./data/curriculumHse";
import { WEEKS_V1, CAPSTONE_V1 } from "./data/curriculumHseV1";

const COURSE_SLUG = "hse-fundamentals";

// This course is LIVE with real enrolled/paying students, some of whom may already have
// taken quizzes. Unlike the original combined seeder (20260819230000), this UPDATES
// already-seeded rows in place by their existing ids -- never delete+reinsert -- for
// everything a student could already hold a foreign key against:
//   - quiz_responses.question_id -> quiz_questions.id ON DELETE CASCADE, so deleting and
//     reinserting quiz_questions would silently destroy a student's per-question answer
//     history. Existing question rows are updated in place instead.
//   - quiz_answers has no incoming FK (quiz_responses.student_answer is free text, not a
//     reference to a specific answer row), so quiz_answers CAN be safely deleted and
//     reinserted per question.
//   - progress_tracking.lesson_id, assignment_submissions.assignment_id, and
//     capstone_submissions.capstone_id all reference these rows by id, so lessons,
//     assignments, and the capstone are all updated in place, never recreated.
// Lessons are matched by (module_id, order) rather than title, since titles change here.
async function applyRevision(
  queryInterface: QueryInterface,
  weeks: WeekSeed[],
  capstone: { title: string; description: string },
) {
  const now = new Date();

  const [courseRows] = await queryInterface.sequelize.query(
    `SELECT id FROM courses WHERE slug = ?`,
    { replacements: [COURSE_SLUG] },
  );
  const course = (courseRows as { id: string }[])[0];
  if (!course) {
    throw new Error(`Could not find course "${COURSE_SLUG}"`);
  }

  for (const week of weeks) {
    const [moduleRows] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE course_id = ? AND week_number = ?`,
      { replacements: [course.id, week.weekNumber] },
    );
    const moduleRow = (moduleRows as { id: string }[])[0];
    if (!moduleRow) {
      throw new Error(`Could not find module for ${COURSE_SLUG} week ${week.weekNumber}`);
    }
    const moduleId = moduleRow.id;

    await queryInterface.sequelize.query(
      `UPDATE modules SET title = ?, description = ? WHERE id = ?`,
      { replacements: [week.moduleTitle, week.moduleDescription, moduleId] },
    );

    for (const lesson of week.lessons) {
      const [lessonRows] = await queryInterface.sequelize.query(
        `SELECT id FROM lessons WHERE module_id = ? AND "order" = ?`,
        { replacements: [moduleId, lesson.order] },
      );
      const lessonRow = (lessonRows as { id: string }[])[0];
      if (!lessonRow) {
        throw new Error(`Could not find lesson order ${lesson.order} for ${COURSE_SLUG} week ${week.weekNumber}`);
      }
      await queryInterface.sequelize.query(
        `UPDATE lessons SET title = ?, content = ?, duration_minutes = ? WHERE id = ?`,
        { replacements: [lesson.title, lesson.content, lesson.durationMinutes, lessonRow.id] },
      );
    }

    const [assignmentRows] = await queryInterface.sequelize.query(
      `SELECT id FROM assignments WHERE module_id = ?`,
      { replacements: [moduleId] },
    );
    const assignmentRow = (assignmentRows as { id: string }[])[0];
    if (!assignmentRow) {
      throw new Error(`Could not find assignment for ${COURSE_SLUG} week ${week.weekNumber}`);
    }
    await queryInterface.sequelize.query(
      `UPDATE assignments SET title = ?, description = ?, file_required = ?, updated_at = ? WHERE id = ?`,
      { replacements: [week.assignmentTitle, week.assignmentDescription, week.fileRequired, now, assignmentRow.id] },
    );

    const [quizRows] = await queryInterface.sequelize.query(
      `SELECT id FROM quizzes WHERE module_id = ?`,
      { replacements: [moduleId] },
    );
    const quizRow = (quizRows as { id: string }[])[0];
    if (!quizRow) {
      throw new Error(`Could not find quiz for ${COURSE_SLUG} week ${week.weekNumber}`);
    }

    const [questionRows] = await queryInterface.sequelize.query(
      `SELECT id FROM quiz_questions WHERE quiz_id = ? ORDER BY "order" ASC`,
      { replacements: [quizRow.id] },
    );
    const existingQuestions = questionRows as { id: string }[];
    if (existingQuestions.length !== week.quizQuestions.length) {
      throw new Error(
        `Expected ${week.quizQuestions.length} existing quiz questions for ${COURSE_SLUG} week ${week.weekNumber}, found ${existingQuestions.length}`,
      );
    }

    for (let i = 0; i < week.quizQuestions.length; i++) {
      const q = week.quizQuestions[i];
      const questionId = existingQuestions[i].id;

      await queryInterface.sequelize.query(
        `UPDATE quiz_questions SET question_text = ?, question_type = ?, points = ?, explanation = ? WHERE id = ?`,
        { replacements: [q.text, q.type, q.points, q.explanation, questionId] },
      );

      await queryInterface.sequelize.query(`DELETE FROM quiz_answers WHERE question_id = ?`, {
        replacements: [questionId],
      });

      if (q.answers.length > 0) {
        const answerRows = q.answers.map((a, aIndex) => ({
          id: crypto.randomUUID(),
          question_id: questionId,
          answer_text: a.text,
          is_correct: a.isCorrect,
          order: aIndex + 1,
        }));
        await queryInterface.bulkInsert("quiz_answers", answerRows);
      }
    }
  }

  const [capstoneRows] = await queryInterface.sequelize.query(
    `SELECT id FROM capstones WHERE course_id = ?`,
    { replacements: [course.id] },
  );
  const capstoneRow = (capstoneRows as { id: string }[])[0];
  if (!capstoneRow) {
    throw new Error(`Could not find capstone for ${COURSE_SLUG}`);
  }
  await queryInterface.sequelize.query(
    `UPDATE capstones SET title = ?, description = ?, updated_at = ? WHERE id = ?`,
    { replacements: [capstone.title, capstone.description, now, capstoneRow.id] },
  );
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await applyRevision(queryInterface, WEEKS, CAPSTONE);
  },

  down: async (queryInterface: QueryInterface) => {
    await applyRevision(queryInterface, WEEKS_V1, CAPSTONE_V1);
  },
};
