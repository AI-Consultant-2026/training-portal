import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { WeekSeed } from "./data/curriculumTypes";
import { CORE_WEEK_UPDATES } from "./data/curriculumCyberSecurityCoreRevision";
import { OIL_GAS_WEEKS } from "./data/curriculumCyberSecurityOilGas";
import { BANKING_WEEKS } from "./data/curriculumCyberSecurityBanking";
import { TELECOM_WEEKS } from "./data/curriculumCyberSecurityTelecom";
import { CAPSTONE } from "./data/curriculumCyberSecurityCapstone";
import {
  WEEKS_V1,
  CAPSTONE_V1,
  COURSE_V1,
  VIDEO_URLS_V1,
  CHECKPOINTS_V1,
} from "./data/curriculumCyberSecurityV1";

// This course is LIVE with real enrolled/paying students, some of whom may already have
// taken quizzes. Weeks 1-12 already exist, so -- exactly like the HSE Fundamentals
// revision (20260918100000) -- they are UPDATEd in place by their existing ids, never
// deleted and reinserted, for everything a student could already hold a foreign key
// against: quiz_responses.question_id -> quiz_questions.id ON DELETE CASCADE (verified
// by reading 20260729030600-create-quiz-responses.ts), progress_tracking.lesson_id,
// assignment_submissions.assignment_id. quiz_answers has no incoming FK
// (quiz_responses.student_answer is free text, not a reference to an answer row), so
// quiz_answers can be safely deleted and reinserted per question. Lessons/quiz questions
// are matched by (module_id + order), never by title, since 5 of the 12 week titles
// change here.
//
// Weeks 13-18 don't exist yet, so they're straightforward fresh inserts -- nothing
// references rows that don't exist yet.
//
// 5 of the 12 core weeks (1, 2, 5, 6, 8, 10) are retargeted to an entirely different
// topic. Their pre-existing video_url (attached by 20260807180000, matched by title at
// the time it ran, but keyed by lesson id from then on) is now wrong for the new topic,
// so it's explicitly nulled rather than left pointing at a mismatched video -- a missing
// video is fine, a wrong one is not. Week 1 order 2 additionally has 3 video_checkpoints
// (interactive in-video quiz questions, from 20260801020100) asking CIA-Triad-specific
// questions; since Week 1 order 2 becomes a Vulnerability Management lesson with no CIA
// Triad content, those checkpoints are deleted outright rather than left orphaned. (The
// CIA Triad concept isn't lost from the course -- it's still taught in Week 2 order 1,
// which is unaffected by this revision and keeps its own separate video.)

const COURSE_SLUG = "cyber-security-fundamentals";
const NEW_DESCRIPTION =
  "Core cybersecurity fundamentals -- threats and vulnerabilities, authentication, phishing and social engineering, malware and ransomware, network security, data protection, cloud security, access control, incident response, security awareness, and risk management -- plus substantial, practical applications of those skills across three Nigerian industries: Oil & Gas, Banking & Financial Services, and Telecommunications.";
const NEW_DURATION_WEEKS = 18;
const RETARGETED_WEEKS = [1, 2, 5, 6, 8, 10];
const SECTOR_WEEK_NUMBERS = [13, 14, 15, 16, 17, 18];

async function getCourseId(queryInterface: QueryInterface): Promise<string> {
  const [rows] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
    replacements: [COURSE_SLUG],
  });
  const row = (rows as { id: string }[])[0];
  if (!row) throw new Error(`Could not find course "${COURSE_SLUG}"`);
  return row.id;
}

async function updateExistingWeeks(queryInterface: QueryInterface, weeks: WeekSeed[], courseId: string) {
  const now = new Date();

  for (const week of weeks) {
    const [moduleRows] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE course_id = ? AND week_number = ?`,
      { replacements: [courseId, week.weekNumber] },
    );
    const moduleRow = (moduleRows as { id: string }[])[0];
    if (!moduleRow) throw new Error(`Could not find module for week ${week.weekNumber}`);
    const moduleId = moduleRow.id;

    await queryInterface.sequelize.query(`UPDATE modules SET title = ?, description = ? WHERE id = ?`, {
      replacements: [week.moduleTitle, week.moduleDescription, moduleId],
    });

    for (const lesson of week.lessons) {
      const [lessonRows] = await queryInterface.sequelize.query(
        `SELECT id FROM lessons WHERE module_id = ? AND "order" = ?`,
        { replacements: [moduleId, lesson.order] },
      );
      const lessonRow = (lessonRows as { id: string }[])[0];
      if (!lessonRow) throw new Error(`Could not find lesson order ${lesson.order} for week ${week.weekNumber}`);
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
    if (!assignmentRow) throw new Error(`Could not find assignment for week ${week.weekNumber}`);
    await queryInterface.sequelize.query(
      `UPDATE assignments SET title = ?, description = ?, file_required = ?, updated_at = ? WHERE id = ?`,
      { replacements: [week.assignmentTitle, week.assignmentDescription, week.fileRequired, now, assignmentRow.id] },
    );

    const [quizRows] = await queryInterface.sequelize.query(`SELECT id FROM quizzes WHERE module_id = ?`, {
      replacements: [moduleId],
    });
    const quizRow = (quizRows as { id: string }[])[0];
    if (!quizRow) throw new Error(`Could not find quiz for week ${week.weekNumber}`);

    const [questionRows] = await queryInterface.sequelize.query(
      `SELECT id FROM quiz_questions WHERE quiz_id = ? ORDER BY "order" ASC`,
      { replacements: [quizRow.id] },
    );
    const existingQuestions = questionRows as { id: string }[];
    if (existingQuestions.length !== week.quizQuestions.length) {
      throw new Error(
        `Expected ${week.quizQuestions.length} existing quiz questions for week ${week.weekNumber}, found ${existingQuestions.length}`,
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
}

async function insertNewWeeks(queryInterface: QueryInterface, weeks: WeekSeed[], courseId: string) {
  const now = new Date();

  for (const week of weeks) {
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
        video_url: null,
        resources: JSON.stringify({}),
        images: JSON.stringify(lesson.images ?? []),
        order: lesson.order,
        duration_minutes: lesson.durationMinutes,
        created_at: now,
      })),
    );

    const dueDate = new Date(now.getTime() + (week.weekNumber + 1) * 7 * 24 * 60 * 60 * 1000);

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
        title: `Week ${week.weekNumber} Quiz`,
        description: "A quiz covering this week's topics, drawn from a larger question bank.",
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
  }
}

async function deleteWeeks(queryInterface: QueryInterface, courseId: string, weekNumbers: number[]) {
  const [moduleRows] = await queryInterface.sequelize.query(
    `SELECT id FROM modules WHERE course_id = ? AND week_number IN (?)`,
    { replacements: [courseId, weekNumbers] },
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

async function nullMismatchedVideosAndCheckpoints(queryInterface: QueryInterface, courseId: string) {
  for (const weekNumber of RETARGETED_WEEKS) {
    const [lessonRows] = await queryInterface.sequelize.query(
      `SELECT l.id FROM lessons l JOIN modules m ON m.id = l.module_id
       WHERE m.course_id = ? AND m.week_number = ?`,
      { replacements: [courseId, weekNumber] },
    );
    const lessonIds = (lessonRows as { id: string }[]).map((l) => l.id);
    if (lessonIds.length === 0) continue;

    await queryInterface.sequelize.query(`UPDATE lessons SET video_url = NULL WHERE id IN (?)`, {
      replacements: [lessonIds],
    });

    const [checkpointRows] = await queryInterface.sequelize.query(
      `SELECT id FROM video_checkpoints WHERE lesson_id IN (?)`,
      { replacements: [lessonIds] },
    );
    const checkpointIds = (checkpointRows as { id: string }[]).map((c) => c.id);
    if (checkpointIds.length > 0) {
      await queryInterface.bulkDelete("video_checkpoint_answers", { checkpoint_id: checkpointIds });
      await queryInterface.bulkDelete("video_checkpoints", { id: checkpointIds });
    }
  }
}

async function restoreVideosAndCheckpoints(queryInterface: QueryInterface, courseId: string) {
  for (const v of VIDEO_URLS_V1) {
    const [lessonRows] = await queryInterface.sequelize.query(
      `SELECT l.id FROM lessons l JOIN modules m ON m.id = l.module_id
       WHERE m.course_id = ? AND m.week_number = ? AND l."order" = ?`,
      { replacements: [courseId, v.weekNumber, v.order] },
    );
    const lessonRow = (lessonRows as { id: string }[])[0];
    if (!lessonRow) continue;
    await queryInterface.sequelize.query(`UPDATE lessons SET video_url = ? WHERE id = ?`, {
      replacements: [v.videoUrl, lessonRow.id],
    });
  }

  const now = new Date();
  for (const cp of CHECKPOINTS_V1) {
    const [lessonRows] = await queryInterface.sequelize.query(
      `SELECT l.id FROM lessons l JOIN modules m ON m.id = l.module_id
       WHERE m.course_id = ? AND m.week_number = ? AND l."order" = ?`,
      { replacements: [courseId, cp.weekNumber, cp.order] },
    );
    const lessonRow = (lessonRows as { id: string }[])[0];
    if (!lessonRow) continue;

    const checkpointId = crypto.randomUUID();
    await queryInterface.bulkInsert("video_checkpoints", [
      {
        id: checkpointId,
        lesson_id: lessonRow.id,
        timestamp_seconds: cp.timestampSeconds,
        question_text: cp.questionText,
        question_type: cp.questionType,
        order: cp.checkpointOrder,
        explanation: cp.explanation,
        created_at: now,
      },
    ]);
    await queryInterface.bulkInsert(
      "video_checkpoint_answers",
      cp.answers.map((a, aIndex) => ({
        id: crypto.randomUUID(),
        checkpoint_id: checkpointId,
        answer_text: a.text,
        is_correct: a.isCorrect,
        order: aIndex + 1,
      })),
    );
  }
}

async function updateCapstoneRow(
  queryInterface: QueryInterface,
  courseId: string,
  capstone: { title: string; description: string },
) {
  const [capstoneRows] = await queryInterface.sequelize.query(`SELECT id FROM capstones WHERE course_id = ?`, {
    replacements: [courseId],
  });
  const capstoneRow = (capstoneRows as { id: string }[])[0];
  if (!capstoneRow) throw new Error("Could not find capstone");
  await queryInterface.sequelize.query(`UPDATE capstones SET title = ?, description = ?, updated_at = ? WHERE id = ?`, {
    replacements: [capstone.title, capstone.description, new Date(), capstoneRow.id],
  });
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

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const courseId = await getCourseId(queryInterface);
    await updateExistingWeeks(queryInterface, CORE_WEEK_UPDATES, courseId);
    await nullMismatchedVideosAndCheckpoints(queryInterface, courseId);
    await insertNewWeeks(queryInterface, [...OIL_GAS_WEEKS, ...BANKING_WEEKS, ...TELECOM_WEEKS], courseId);
    await updateCapstoneRow(queryInterface, courseId, CAPSTONE);
    await updateCourseRow(queryInterface, courseId, NEW_DESCRIPTION, NEW_DURATION_WEEKS);
  },

  down: async (queryInterface: QueryInterface) => {
    const courseId = await getCourseId(queryInterface);
    await deleteWeeks(queryInterface, courseId, SECTOR_WEEK_NUMBERS);
    await updateExistingWeeks(queryInterface, WEEKS_V1, courseId);
    await restoreVideosAndCheckpoints(queryInterface, courseId);
    await updateCapstoneRow(queryInterface, courseId, CAPSTONE_V1);
    await updateCourseRow(queryInterface, courseId, COURSE_V1.description, COURSE_V1.durationWeeks);
  },
};
