import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { DM_ASSESSMENT_CHANGES as CHANGES } from "../seeders/data/curriculumDigitalMarketingAssessment";

// Digital Marketing, owner's changes of 2026-11-16 (everything else stays the same). Same pattern
// as 20261116090000 (GIS and Drone Mapping):
// - the capstone and all 8 day assignments are removed (their submissions go with them);
// - a 30-question multiple-choice Final Assessment (pass 80%, 45 minutes) is added to Day 8,
//   left out of the day gate by its title. The 8 Day Quizzes stay, but four Day 2/Day 8 Quiz
//   question stems that asked about the assignment or capstone are re-worded;
// - every lesson gets a three-question knowledge check (multiple choice, true or false,
//   scenario) before its closing section, lessons 2.2, 6.2 and 8.2 get a learner reflection,
//   and lesson 8.2 ends with the final assessment and course feedback questionnaire;
// - lesson sentences pointing to the removed assignments or capstone are re-worded in place
//   (practical exercises stay), as are the Day 8 module title/description and lesson 8.2's title.
// Image positions move down by the paragraphs inserted above them. Idempotent; a database
// without the course is skipped.
const SLUG = "digital-marketing";
const LAST_DAY = 8;
const LAST_LESSON = "8.2";
const FINAL_TITLE = "Final Assessment";
const PASS_MARK = 80;
const FINAL_MINUTES = 45;

interface LessonImage {
  afterParagraph?: number;
  [key: string]: unknown;
}

function applyLessonChanges(
  key: string,
  content: string,
  images: LessonImage[] | null,
): { content: string; images: LessonImage[] | null } | null {
  const entries = CHANGES.knowledgeChecks[key];
  if (!entries || content.includes("**Knowledge check ")) return null;
  // Entries can hold blank lines themselves (the "Show answer" blocks), so count paragraphs
  // the way the lesson page does: blank-line-separated blocks.
  const block = entries.join("\n\n").split("\n\n");
  let text = content;
  for (const edit of CHANGES.textEdits[key] ?? []) text = text.replace(edit.from, edit.to);
  const paragraphs = text.split("\n\n");
  let at = paragraphs.length;
  for (let i = paragraphs.length - 1; i >= 0; i -= 1) {
    if (paragraphs[i].startsWith("## ")) {
      at = i;
      break;
    }
  }
  paragraphs.splice(at, 0, ...block);
  if (key === LAST_LESSON) paragraphs.push(...CHANGES.closing);
  const shifted = images
    ? images.map((image) =>
        typeof image.afterParagraph === "number" && image.afterParagraph >= at
          ? { ...image, afterParagraph: image.afterParagraph + block.length }
          : image,
      )
    : images;
  return { content: paragraphs.join("\n\n"), images: shifted };
}

module.exports = {
  applyLessonChanges,
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    const [courseRows] = await q.query(`SELECT id FROM courses WHERE slug = ?`, { replacements: [SLUG] });
    const course = (courseRows as { id: string }[])[0];
    if (!course) return;

    await q.transaction(async (transaction) => {
      const replacements = { course: course.id };
      await q.query(`DELETE FROM assignments WHERE module_id IN (SELECT id FROM modules WHERE course_id = :course)`, {
        replacements,
        transaction,
      });
      await q.query(`DELETE FROM capstones WHERE course_id = :course`, { replacements, transaction });

      for (const edit of CHANGES.quizQuestionEdits) {
        await q.query(
          `UPDATE quiz_questions SET question_text = :to
           WHERE question_text = :from
             AND quiz_id IN (SELECT q.id FROM quizzes q JOIN modules m ON m.id = q.module_id WHERE m.course_id = :course)`,
          { replacements: { ...replacements, ...edit }, transaction },
        );
      }

      const { title, description } = CHANGES.module8;
      for (const [column, edit] of [["title", title], ["description", description]] as const) {
        await q.query(`UPDATE modules SET ${column} = :to WHERE course_id = :course AND week_number = :day AND ${column} = :from`, {
          replacements: { ...replacements, ...edit, day: LAST_DAY },
          transaction,
        });
      }
      for (const [key, edit] of Object.entries(CHANGES.lessonTitleEdits)) {
        const [day, order] = key.split(".").map(Number);
        await q.query(
          `UPDATE lessons SET title = :to
           WHERE title = :from AND "order" = :order
             AND module_id IN (SELECT id FROM modules WHERE course_id = :course AND week_number = :day)`,
          { replacements: { ...replacements, ...edit, day, order }, transaction },
        );
      }

      const [finalRows] = await q.query(
        `SELECT id FROM quizzes WHERE title = :title AND module_id IN (SELECT id FROM modules WHERE course_id = :course)`,
        { replacements: { ...replacements, title: FINAL_TITLE }, transaction },
      );
      const [dayRows] = await q.query(`SELECT id FROM modules WHERE course_id = :course AND week_number = :day`, {
        replacements: { ...replacements, day: LAST_DAY },
        transaction,
      });
      const lastDay = (dayRows as { id: string }[])[0];
      if ((finalRows as unknown[]).length === 0 && lastDay) {
        const questions = CHANGES.finalAssessment;
        const now = new Date();
        const quizId = crypto.randomUUID();
        const pass = Math.ceil((questions.length * PASS_MARK) / 100);
        await queryInterface.bulkInsert(
          "quizzes",
          [
            {
              id: quizId,
              module_id: lastDay.id,
              title: FINAL_TITLE,
              description: `${questions.length} multiple-choice questions covering the whole course. Pass mark: ${pass} out of ${questions.length} (${PASS_MARK}%).`,
              time_limit_minutes: FINAL_MINUTES,
              passing_score: PASS_MARK,
              question_count: questions.length,
              shuffle_questions: true,
              is_enabled: true,
              created_at: now,
              updated_at: now,
            },
          ],
          { transaction },
        );
        const questionRows: Record<string, unknown>[] = [];
        const answerRows: Record<string, unknown>[] = [];
        questions.forEach((question, qIndex) => {
          const questionId = crypto.randomUUID();
          questionRows.push({
            id: questionId,
            quiz_id: quizId,
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
      }

      const [lessonRows] = await q.query(
        `SELECT l.id, l.content, l.images, l."order", m.week_number
         FROM lessons l JOIN modules m ON m.id = l.module_id
         WHERE m.course_id = :course`,
        { replacements, transaction },
      );
      for (const lesson of lessonRows as {
        id: string;
        content: string;
        images: LessonImage[] | null;
        order: number;
        week_number: number;
      }[]) {
        const changed = applyLessonChanges(`${lesson.week_number}.${lesson.order}`, lesson.content, lesson.images);
        if (!changed) continue;
        await q.query(`UPDATE lessons SET content = :content, images = CAST(:images AS jsonb) WHERE id = :id`, {
          replacements: { id: lesson.id, content: changed.content, images: JSON.stringify(changed.images) },
          transaction,
        });
      }
    });
  },

  // The removed assignments, capstone and their submissions can't be rebuilt here; restore from a backup.
  down: async () => {},
};
