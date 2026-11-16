import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { DATA_ANALYTICS_12_DAY_CHANGES as CHANGES } from "../seeders/data/curriculumDataAnalyticsAssessment";

// Data Analytics & Business Intelligence, owner's changes of 2026-11-16 (everything else stays the
// same): the course goes from 18 days to 12, still two two-part lessons a day.
// - The capstone, all assignments and all Day Quizzes are removed (their submissions and attempts
//   go with them).
// - 24 lessons are kept: each new lesson keeps the row (id, progress, video checkpoints) of the
//   lesson that held its Part 1, and gets its new content, title, videos, time and illustrations
//   from curriculumDataAnalyticsAssessment.ts. Each illustration is copied from the lesson and
//   position it had before, so every part keeps its picture. The other 12 lessons are removed.
// - Old days 2, 4, 6, 13, 16 and 17 are merged into their neighbours and removed; the rest are
//   renumbered 1–12 and days 1–3, 9, 11 and 12 get new titles and descriptions.
// - A 30-question multiple-choice Final Assessment (pass 80%, 45 minutes) is added to Day 12; the
//   day gate leaves it out by its title.
// Runs once: a course without an old Day 18 is already done (or absent) and is skipped.
const SLUG = "data-analytics-business-intelligence";
const FINAL_TITLE = "Final Assessment";
const PASS_MARK = 80;
const FINAL_MINUTES = 45;

interface LessonImage {
  afterParagraph?: number;
  [key: string]: unknown;
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    const [courseRows] = await q.query(`SELECT id FROM courses WHERE slug = ?`, { replacements: [SLUG] });
    const course = (courseRows as { id: string }[])[0];
    if (!course) return;

    await q.transaction(async (transaction) => {
      const replacements = { course: course.id };
      const [moduleRows] = await q.query(`SELECT id, week_number FROM modules WHERE course_id = :course`, {
        replacements,
        transaction,
      });
      const moduleByDay = new Map((moduleRows as { id: string; week_number: number }[]).map((m) => [m.week_number, m.id]));
      if (!moduleByDay.has(18)) return;

      await q.query(`DELETE FROM assignments WHERE module_id IN (SELECT id FROM modules WHERE course_id = :course)`, {
        replacements,
        transaction,
      });
      await q.query(`DELETE FROM capstones WHERE course_id = :course`, { replacements, transaction });
      await q.query(`DELETE FROM quizzes WHERE module_id IN (SELECT id FROM modules WHERE course_id = :course)`, {
        replacements,
        transaction,
      });

      const [lessonRows] = await q.query(
        `SELECT l.id, l.images, l."order", m.week_number
         FROM lessons l JOIN modules m ON m.id = l.module_id
         WHERE m.course_id = :course`,
        { replacements, transaction },
      );
      const lessons = lessonRows as { id: string; images: LessonImage[] | null; order: number; week_number: number }[];
      const byKey = new Map(lessons.map((lesson) => [`${lesson.week_number}.${lesson.order}`, lesson]));
      // Images in their old order (Part 1 first), so "index" picks the part's illustration.
      const imagesOf = (day: number, order: number) =>
        [...(byKey.get(`${day}.${order}`)?.images ?? [])].sort(
          (x, y) => (x.afterParagraph ?? 0) - (y.afterParagraph ?? 0),
        );
      const kept = new Set<string>();
      const moduleForDay = (day: number) => moduleByDay.get(CHANGES.modules.find((m) => m.toDay === day)!.fromDay)!;
      const updates = CHANGES.lessons.map((lesson) => {
        const row = byKey.get(`${lesson.source.day}.${lesson.source.order}`);
        const images = lesson.images
          .map((image) => {
            const found = imagesOf(image.from.day, image.from.order)[image.from.index];
            return found ? { ...found, afterParagraph: image.afterParagraph } : null;
          })
          .filter((image) => image !== null);
        return { lesson, row, images };
      });
      for (const { lesson, row, images } of updates) {
        if (!row) continue;
        kept.add(row.id);
        await q.query(
          `UPDATE lessons SET module_id = :module, "order" = :order, title = :title, content = :content,
             images = CAST(:images AS jsonb), video_url = :video, resources = CAST(:resources AS jsonb),
             duration_minutes = :minutes
           WHERE id = :id`,
          {
            replacements: {
              id: row.id,
              module: moduleForDay(lesson.to.day),
              order: lesson.to.order,
              title: lesson.title,
              content: lesson.content,
              images: JSON.stringify(images),
              video: lesson.videoUrl,
              resources: JSON.stringify(lesson.resources),
              minutes: lesson.durationMinutes,
            },
            transaction,
          },
        );
      }
      for (const lesson of lessons) {
        if (!kept.has(lesson.id)) {
          await q.query(`DELETE FROM lessons WHERE id = :id`, { replacements: { id: lesson.id }, transaction });
        }
      }

      for (const day of CHANGES.removedDays) {
        const id = moduleByDay.get(day);
        if (id) await q.query(`DELETE FROM modules WHERE id = :id`, { replacements: { id }, transaction });
      }
      for (const module of CHANGES.modules) {
        const id = moduleByDay.get(module.fromDay);
        if (!id) continue;
        await q.query(
          `UPDATE modules SET week_number = :day, "order" = :day, title = :title, description = :description WHERE id = :id`,
          { replacements: { id, day: module.toDay, title: module.title, description: module.description }, transaction },
        );
      }

      await q.query(
        `UPDATE courses SET duration_weeks = :days, description = REPLACE(description, :from, :to), updated_at = NOW()
         WHERE id = :course`,
        { replacements: { ...replacements, days: CHANGES.durationDays, ...CHANGES.courseDescription }, transaction },
      );

      const lastDay = moduleForDay(CHANGES.durationDays);
      const questions = CHANGES.finalAssessment;
      const now = new Date();
      const quizId = crypto.randomUUID();
      const pass = Math.ceil((questions.length * PASS_MARK) / 100);
      await queryInterface.bulkInsert(
        "quizzes",
        [
          {
            id: quizId,
            module_id: lastDay,
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
    });
  },

  // The removed lessons, assignments, quizzes, capstone and their submissions can't be rebuilt here;
  // restore from a backup.
  down: async () => {},
};
