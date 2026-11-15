import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";
import { WEEKS } from "../seeders/data/curriculumDataAnalytics";

// Data Analytics & Business Intelligence goes from 72 lessons (4 a day) to 36 (2 a day),
// on the owner's request (2026-11-15). Nothing is cut: each pair of lessons becomes one
// two-part lesson (curriculumDataAnalytics.ts now holds the merged lessons), so every
// topic, demonstration, exercise and knowledge check is kept.
//
// For each day the 1st and 3rd lessons are kept (same ids, so their progress, video
// checkpoints and links stay valid) and rewritten as the merged lessons 1 and 2; the 2nd
// and 4th are deleted. Before deleting, a student who had completed a deleted lesson is
// marked complete on the lesson it was merged into, so nobody loses progress. The day
// gate works unchanged: lesson 1, then the day's quiz and assignment, then lesson 2.
// Assignment and capstone briefs are re-applied because their lesson references changed.
//
// Idempotent: a day that already has two lessons just gets its content refreshed, which
// is also what happens on a fresh database (the original migration now inserts the
// 36-lesson version). Databases without the course are skipped.
const SLUG = "data-analytics-business-intelligence";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const [courseRows] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
      replacements: [SLUG],
    });
    const course = (courseRows as { id: string }[])[0];
    if (!course) return;

    await queryInterface.sequelize.transaction(async (transaction) => {
      for (const week of WEEKS) {
        if (week.lessons.length !== 2) throw new Error(`Day ${week.weekNumber} should have 2 lessons`);
        const [moduleRows] = await queryInterface.sequelize.query(
          `SELECT id FROM modules WHERE course_id = ? AND week_number = ?`,
          { replacements: [course.id, week.weekNumber], transaction },
        );
        const mod = (moduleRows as { id: string }[])[0];
        if (!mod) throw new Error(`Data Analytics day ${week.weekNumber} is missing`);

        const [lessonRows] = await queryInterface.sequelize.query(
          `SELECT id FROM lessons WHERE module_id = ? ORDER BY "order", created_at, id`,
          { replacements: [mod.id], transaction },
        );
        const ids = (lessonRows as { id: string }[]).map((r) => r.id);
        let keep: string[];
        if (ids.length === 4) {
          keep = [ids[0], ids[2]];
          for (const [from, to] of [
            [ids[1], ids[0]],
            [ids[3], ids[2]],
          ]) {
            const [done] = await queryInterface.sequelize.query(
              `SELECT student_id, completed_at FROM progress_tracking WHERE lesson_id = ?`,
              { replacements: [from], transaction },
            );
            for (const row of done as { student_id: string; completed_at: Date }[]) {
              await queryInterface.sequelize.query(
                `INSERT INTO progress_tracking (id, student_id, lesson_id, completed_at)
                 VALUES (:id, :student, :to, :at)
                 ON CONFLICT (student_id, lesson_id) DO NOTHING`,
                {
                  replacements: { id: crypto.randomUUID(), student: row.student_id, to, at: row.completed_at },
                  transaction,
                },
              );
            }
          }
          await queryInterface.sequelize.query(`DELETE FROM lessons WHERE id IN (:ids)`, {
            replacements: { ids: [ids[1], ids[3]] },
            transaction,
          });
        } else if (ids.length === 2) {
          keep = ids;
        } else {
          throw new Error(`Data Analytics day ${week.weekNumber} has ${ids.length} lessons; expected 4 or 2`);
        }

        for (const [i, lesson] of week.lessons.entries()) {
          await queryInterface.sequelize.query(
            `UPDATE lessons SET title = :title, content = :content, video_url = :videoUrl,
               resources = CAST(:resources AS jsonb), images = CAST(:images AS jsonb),
               "order" = :order, duration_minutes = :duration
             WHERE id = :id`,
            {
              replacements: {
                id: keep[i],
                title: lesson.title,
                content: lesson.content,
                videoUrl: lesson.videoUrl ?? null,
                resources: JSON.stringify(lesson.resources ?? {}),
                images: JSON.stringify(lesson.images ?? []),
                order: lesson.order,
                duration: lesson.durationMinutes,
              },
              transaction,
            },
          );
        }
      }
    });

    await applyBriefs(queryInterface);
  },

  // The four-lesson version can't be rebuilt from the merged lessons; restore it from a
  // database backup if it is ever needed.
  down: async () => {},
};
