import { QueryInterface, QueryTypes } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";
import { nigeriaToCountry } from "../utils/nigeriaToCountry";

// Course content no longer names the country: "Nigeria's" -> "the country's", "Nigeria" ->
// "the country", and the word is dropped where it is part of a body's official name or an
// address (see nigeriaToCountry). "Nigeria (NCAA)"-style mentions -- the word followed by a
// bracketed aside -- are kept as written. Applies to the stored course text only -- lessons, module
// and course descriptions, assignment/capstone briefs and quiz / video-checkpoint questions
// and answers. Marketing pages, legal pages, the company address and payment logic are not
// touched. Briefs are re-applied from the updated brief data (the earlier briefs migrations
// have already run in production, so they can't deliver this edit themselves).
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
    for (const { table, columns } of TEXT_COLUMNS) {
      const where = columns.map((c) => `${c} ~ 'Nigeria'`).join(" OR ");
      const rows = await sequelize.query<Record<string, string | null>>(
        `SELECT id, ${columns.join(", ")} FROM ${table} WHERE ${where}`,
        { type: QueryTypes.SELECT },
      );
      for (const row of rows) {
        const changes: Record<string, string> = {};
        for (const c of columns) {
          const before = row[c];
          if (typeof before !== "string") continue;
          const after = nigeriaToCountry(before);
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

  // The original wording isn't restored: "the country" is the intended state.
  down: async () => undefined,
};
