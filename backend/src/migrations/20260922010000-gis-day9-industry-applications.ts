import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";
import { WEEKS as GIS_WEEKS_SEED } from "../seeders/data/curriculumGis";

// Adds a new Day 9 ("Industry Applications Across Sectors") to the live GIS and Drone
// Mapping course, and revises the course's single capstone to offer 7 sector tracks
// (oil & gas, banking, telecom, mining, environmental management, construction,
// infrastructure) instead of one fixed agriculture scenario.
//
// This course is LIVE with real enrolled/paying students. Day 9 does not exist yet, so
// inserting it is a straightforward fresh insert -- nothing references rows that don't
// exist yet (mirrors 20260918120000-cyber-security-fundamentals-sector-pathways-revision,
// insertNewWeeks). Days 1-8 are left structurally untouched (no lesson/module/quiz rows
// are deleted or reordered) so existing video_url and video_checkpoints on those lessons
// stay valid; only two small in-place text edits ship separately in curriculumGis.ts's
// Day 8 content and one Day 8 quiz question, re-applied here would be redundant since
// Day 8 rows already carry that text from earlier seeders -- this migration does NOT
// touch Day 8 rows directly; a database that already ran the original Day 8 seeders
// keeps its original Day 8 wording until a future content-sync migration updates it.
//
// The assignment brief (gisWeeks.ts week 9) and the revised capstone brief (capstones.ts)
// are applied the standard way, via applyBriefs, which matches by course slug + module
// week_number and is idempotent.
//
// Each new lesson's video was found via web search and confirmed real + embeddable via
// the YouTube oEmbed endpoint before being included here, mirroring the existing
// 20260807160000-gis-lesson-videos.ts convention.
const COURSE_SLUG = "gis-and-drone-mapping";
const OLD_DESCRIPTION =
  "Learn geographic information systems, remote sensing, and drone survey mapping with real State use cases.";
const NEW_DESCRIPTION =
  "Learn geographic information systems, remote sensing, and drone survey mapping with real State use cases, and how to apply that same toolkit across oil and gas, banking, telecommunications, mining, environmental management, construction and infrastructure.";
const OLD_DURATION_WEEKS = 8;
const NEW_DURATION_WEEKS = 9;

const LESSON_VIDEOS: Record<number, string> = {
  1: "https://www.youtube.com/watch?v=tr6Fwtq1Blo", // "How Financial Institutions are Embracing GIS" (Esri Industries)
  2: "https://www.youtube.com/watch?v=vuh9OX2E6ek", // "5 Key Benefits of Drones in Surveying and Mapping" (Geospatial World)
};

// Returns null when the course doesn't exist (a fresh or test database, where seeders
// haven't run): the migration then does nothing, matching applyBriefs' convention that
// courses missing from the database are simply skipped.
async function getCourseId(queryInterface: QueryInterface): Promise<string | null> {
  const [rows] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
    replacements: [COURSE_SLUG],
  });
  const row = (rows as { id: string }[])[0];
  return row ? row.id : null;
}

const OLD_CAPSTONE_TITLE = "Sustainable Agriculture GIS Capstone";
const NEW_CAPSTONE_TITLE = "GIS and Drone Mapping Sector Capstone";

async function updateCapstoneTitle(queryInterface: QueryInterface, courseId: string, title: string) {
  await queryInterface.sequelize.query(
    `UPDATE capstones SET title = ?, updated_at = ? WHERE course_id = ?`,
    { replacements: [title, new Date(), courseId] },
  );
}

async function updateCourseRow(
  queryInterface: QueryInterface,
  courseId: string,
  description: string,
  durationWeeks: number,
) {
  await queryInterface.sequelize.query(
    `UPDATE courses SET description = ?, duration_weeks = ?, updated_at = ? WHERE id = ?`,
    { replacements: [description, durationWeeks, new Date(), courseId] },
  );
}

async function deleteDay9(queryInterface: QueryInterface, courseId: string) {
  const [moduleRows] = await queryInterface.sequelize.query(
    `SELECT id FROM modules WHERE course_id = ? AND week_number = 9`,
    { replacements: [courseId] },
  );
  const moduleIds = (moduleRows as { id: string }[]).map((m) => m.id);
  if (moduleIds.length === 0) return;

  const [quizRows] = await queryInterface.sequelize.query(`SELECT id FROM quizzes WHERE module_id IN (?)`, {
    replacements: [moduleIds],
  });
  const quizIds = (quizRows as { id: string }[]).map((q) => q.id);
  if (quizIds.length > 0) {
    const [questionRows] = await queryInterface.sequelize.query(
      `SELECT id FROM quiz_questions WHERE quiz_id IN (?)`,
      { replacements: [quizIds] },
    );
    const questionIds = (questionRows as { id: string }[]).map((q) => q.id);
    if (questionIds.length > 0) {
      await queryInterface.bulkDelete("quiz_answers", { question_id: questionIds });
      await queryInterface.bulkDelete("quiz_questions", { id: questionIds });
    }
    await queryInterface.bulkDelete("quizzes", { id: quizIds });
  }
  await queryInterface.bulkDelete("assignments", { module_id: moduleIds });
  await queryInterface.bulkDelete("lessons", { module_id: moduleIds });
  await queryInterface.bulkDelete("modules", { id: moduleIds });
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const week = GIS_WEEKS_SEED.find((w) => w.weekNumber === 9);
    if (!week) throw new Error("Day 9 not found in curriculumGis WEEKS");

    const courseId = await getCourseId(queryInterface);
    if (!courseId) return;
    const now = new Date();

    const moduleId = crypto.randomUUID();
    await queryInterface.bulkInsert("modules", [
      {
        id: moduleId,
        course_id: courseId,
        title: week.moduleTitle,
        description: week.moduleDescription,
        week_number: week.weekNumber,
        order: week.weekNumber,
        status: "published",
        created_at: now,
      },
    ]);

    await queryInterface.bulkInsert(
      "lessons",
      week.lessons.map((lesson) => ({
        id: crypto.randomUUID(),
        module_id: moduleId,
        title: lesson.title,
        content: lesson.content,
        video_url: LESSON_VIDEOS[lesson.order] ?? null,
        resources: JSON.stringify({}),
        images: JSON.stringify(lesson.images ?? []),
        order: lesson.order,
        duration_minutes: lesson.durationMinutes,
        created_at: now,
      })),
    );

    const dueDate = new Date(now.getTime() + 10 * 7 * 24 * 60 * 60 * 1000);

    await queryInterface.bulkInsert("assignments", [
      {
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
      },
    ]);

    const quizId = crypto.randomUUID();
    await queryInterface.bulkInsert("quizzes", [
      {
        id: quizId,
        module_id: moduleId,
        title: `Day ${week.weekNumber} Quiz`,
        description: "A quiz covering this day's topics, drawn from a larger question bank.",
        due_date: dueDate,
        time_limit_minutes: 20,
        passing_score: 70,
        question_count: 10,
        shuffle_questions: true,
        created_at: now,
        updated_at: now,
      },
    ]);

    const questionRows: Record<string, unknown>[] = [];
    const answerRows: Record<string, unknown>[] = [];
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
    await queryInterface.bulkInsert("quiz_questions", questionRows);
    await queryInterface.bulkInsert("quiz_answers", answerRows);

    // Pushes the new Day 9 assignment brief (gisWeeks.ts week 9) and the revised
    // 7-sector-track capstone brief (capstones.ts) into their description/grading_rubric
    // columns. Re-applies all four live courses' current briefs; idempotent.
    await applyBriefs(queryInterface);

    await updateCapstoneTitle(queryInterface, courseId, NEW_CAPSTONE_TITLE);
    await updateCourseRow(queryInterface, courseId, NEW_DESCRIPTION, NEW_DURATION_WEEKS);
  },

  down: async (queryInterface: QueryInterface) => {
    const courseId = await getCourseId(queryInterface);
    if (!courseId) return;
    await deleteDay9(queryInterface, courseId);
    await updateCapstoneTitle(queryInterface, courseId, OLD_CAPSTONE_TITLE);
    await updateCourseRow(queryInterface, courseId, OLD_DESCRIPTION, OLD_DURATION_WEEKS);
    // The assignment/capstone brief text is not reverted, matching the convention in
    // 20260920020000-detailed-assignment-and-capstone-briefs.ts: a brief update is a
    // strict content improvement, not something to roll back per-row.
  },
};
