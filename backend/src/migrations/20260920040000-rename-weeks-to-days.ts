import { QueryInterface, QueryTypes } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";
import { weeksToDays } from "../utils/weeksToDays";

// Course modules are now presented as "Day N" instead of "Week N", and course lengths as
// "N days". The UI labels are code changes; this migration carries the stored text across
// for existing databases:
//   - quiz titles ("Week 3 Quiz" -> "Day 3 Quiz")
//   - module-relative wording in lesson content, module/course/assignment/capstone
//     descriptions, quiz and video-checkpoint questions and answers ("Week 3", "next week", "the past two weeks",
//     "18-week course" -- see weeksToDays for exactly what is and isn't rewritten)
//   - assignment and capstone briefs, re-applied from the updated brief data (the earlier
//     briefs migrations have already run in production, so they can't deliver this edit).
// The numeric courses.duration_weeks column keeps its name and value; only its label changes.
const TEXT_COLUMNS: { table: string; columns: string[] }[] = [
  { table: "courses", columns: ["description"] },
  { table: "modules", columns: ["title", "description"] },
  { table: "lessons", columns: ["title", "content"] },
  { table: "quizzes", columns: ["title", "description"] },
  { table: "assignments", columns: ["title", "description"] },
  { table: "capstones", columns: ["title", "description"] },
  { table: "quiz_questions", columns: ["question_text"] },
  { table: "quiz_answers", columns: ["answer_text"] },
  { table: "video_checkpoints", columns: ["question_text"] },
  { table: "video_checkpoint_answers", columns: ["answer_text"] },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const sequelize = queryInterface.sequelize;

    // Quiz titles are exactly "Week N Quiz"; weeksToDays handles them like any "Week N".
    for (const { table, columns } of TEXT_COLUMNS) {
      const where = columns.map((c) => `${c} ~* 'week'`).join(" OR ");
      const rows = await sequelize.query<Record<string, string | null>>(
        `SELECT id, ${columns.join(", ")} FROM ${table} WHERE ${where}`,
        { type: QueryTypes.SELECT },
      );
      for (const row of rows) {
        const changes: Record<string, string> = {};
        for (const c of columns) {
          const before = row[c];
          if (typeof before !== "string") continue;
          const after = weeksToDays(before);
          if (after !== before) changes[c] = after;
        }
        const cols = Object.keys(changes);
        if (cols.length === 0) continue;
        await sequelize.query(
          `UPDATE ${table} SET ${cols.map((c) => `${c} = :${c}`).join(", ")} WHERE id = :id`,
          { replacements: { ...changes, id: row.id } },
        );
      }
    }

    await applyBriefs(queryInterface);
  },

  // The stored wording isn't restored per-row (the "Day" wording is the intended state);
  // only the quiz titles, which are safe to reverse mechanically, are put back.
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET title = regexp_replace(title, '^Day (\\d+) Quiz$', 'Week \\1 Quiz') WHERE title ~ '^Day \\d+ Quiz$'`,
    );
  },
};
