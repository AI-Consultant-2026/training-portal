import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { INSTRUCTOR_ID } from "../utils/seedIds";
import { WEEKS } from "./data/curriculumHse";

const SLUG = "hse-fundamentals";
const BANK_SIZE = 20;
const QUESTIONS_PER_ATTEMPT = 10;
const TIME_LIMIT_MINUTES = 20;
const PASSING_SCORE = 70;

// New course, added in one consolidated seeder rather than split across the historical
// modules-lessons / assignments-quizzes / capstone pattern used for the original 5
// courses -- that split reflected incremental, multi-session work on those courses, not
// a requirement of the schema. HSE Fundamentals is written complete from the start.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    WEEKS.forEach((week) => {
      if (week.quizQuestions.length !== BANK_SIZE) {
        throw new Error(
          `Expected ${BANK_SIZE} quiz questions for HSE Fundamentals week ${week.weekNumber}, got ${week.quizQuestions.length}`,
        );
      }
    });

    const courseId = crypto.randomUUID();
    await queryInterface.bulkInsert("courses", [
      {
        id: courseId,
        title: "HSE Fundamentals",
        slug: SLUG,
        description:
          "A practical introduction to Health, Safety, and Environment (HSE) for Nigeria's oil and gas sector -- hazard identification and risk assessment, PPE and permit-to-work systems, emergency response, incident investigation, environmental management, and the safety culture that ties it all together.",
        instructor_id: INSTRUCTOR_ID,
        duration_weeks: 8,
        level: "beginner",
        status: "published",
        metadata: JSON.stringify({}),
        created_at: now,
        updated_at: now,
      },
    ]);

    const moduleRows: Record<string, unknown>[] = [];
    const moduleIdByWeek = new Map<number, string>();
    WEEKS.forEach((week) => {
      const moduleId = crypto.randomUUID();
      moduleIdByWeek.set(week.weekNumber, moduleId);
      moduleRows.push({
        id: moduleId,
        course_id: courseId,
        title: week.moduleTitle,
        description: week.moduleDescription,
        week_number: week.weekNumber,
        order: week.weekNumber,
        status: "published",
        created_at: now,
      });
    });
    await queryInterface.bulkInsert("modules", moduleRows);

    const lessonRows: Record<string, unknown>[] = [];
    WEEKS.forEach((week) => {
      const moduleId = moduleIdByWeek.get(week.weekNumber);
      week.lessons.forEach((lesson) => {
        lessonRows.push({
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
        });
      });
    });
    await queryInterface.bulkInsert("lessons", lessonRows);

    const assignmentRows: Record<string, unknown>[] = [];
    const quizRows: Record<string, unknown>[] = [];
    const quizIdByWeek = new Map<number, string>();
    WEEKS.forEach((week) => {
      const moduleId = moduleIdByWeek.get(week.weekNumber);
      const dueDate = new Date(now.getTime() + (week.weekNumber + 1) * 7 * 24 * 60 * 60 * 1000);

      assignmentRows.push({
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
      });

      const quizId = crypto.randomUUID();
      quizIdByWeek.set(week.weekNumber, quizId);
      quizRows.push({
        id: quizId,
        module_id: moduleId,
        title: `Week ${week.weekNumber} Quiz`,
        description: "A quiz covering this week's topics, drawn from a larger question bank.",
        due_date: dueDate,
        time_limit_minutes: TIME_LIMIT_MINUTES,
        passing_score: PASSING_SCORE,
        question_count: QUESTIONS_PER_ATTEMPT,
        shuffle_questions: true,
        created_at: now,
        updated_at: now,
      });
    });
    await queryInterface.bulkInsert("assignments", assignmentRows);
    await queryInterface.bulkInsert("quizzes", quizRows);

    const questionRows: Record<string, unknown>[] = [];
    const answerRows: Record<string, unknown>[] = [];
    WEEKS.forEach((week) => {
      const quizId = quizIdByWeek.get(week.weekNumber);
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
    });
    await queryInterface.bulkInsert("quiz_questions", questionRows);
    await queryInterface.bulkInsert("quiz_answers", answerRows);

    await queryInterface.bulkInsert("capstones", [
      {
        id: crypto.randomUUID(),
        course_id: courseId,
        title: "Site HSE Management Plan Capstone",
        description:
          "Act as the HSE lead for a chosen oil and gas facility (a flow station, a drilling rig, or a pipeline right-of-way segment) and produce a complete HSE management plan: a hazard identification and risk assessment covering at least six distinct hazards, a permit-to-work framework for the facility's highest-risk activities, an emergency response plan with at least two credible scenarios, an incident classification and reporting procedure, and an environmental protection and spill response plan appropriate to the facility's location. Treat this as one connected story, not five separate assignments: your risk assessment should directly justify which activities need permits and which emergency scenarios you plan for, and your environmental plan should reflect the specific hazards your own risk assessment identified. Scope realistically -- a focused, genuinely well-reasoned plan for one facility will demonstrate far more than a thin attempt to cover every possible scenario at once.",
        due_date: new Date(now.getTime() + 8 * 7 * 24 * 60 * 60 * 1000),
        file_required: true,
        grading_rubric: null,
        points_total: 100,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    const [courses] = await queryInterface.sequelize.query(
      `SELECT id FROM courses WHERE slug = ?`,
      { replacements: [SLUG] },
    );
    const courseIds = (courses as { id: string }[]).map((c) => c.id);
    if (courseIds.length === 0) return;

    await queryInterface.bulkDelete("capstones", { course_id: courseIds });

    const [modules] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE course_id IN (${courseIds.map(() => "?").join(",")})`,
      { replacements: courseIds },
    );
    const moduleIds = (modules as { id: string }[]).map((m) => m.id);

    if (moduleIds.length > 0) {
      const [quizzes] = await queryInterface.sequelize.query(
        `SELECT id FROM quizzes WHERE module_id IN (${moduleIds.map(() => "?").join(",")})`,
        { replacements: moduleIds },
      );
      const quizIds = (quizzes as { id: string }[]).map((q) => q.id);

      if (quizIds.length > 0) {
        const [questions] = await queryInterface.sequelize.query(
          `SELECT id FROM quiz_questions WHERE quiz_id IN (${quizIds.map(() => "?").join(",")})`,
          { replacements: quizIds },
        );
        const questionIds = (questions as { id: string }[]).map((q) => q.id);
        if (questionIds.length > 0) {
          await queryInterface.bulkDelete("quiz_answers", { question_id: questionIds });
          await queryInterface.bulkDelete("quiz_questions", { id: questionIds });
        }
        await queryInterface.bulkDelete("quizzes", { id: quizIds });
      }

      await queryInterface.bulkDelete("assignments", { module_id: moduleIds });
      await queryInterface.bulkDelete("lessons", { module_id: moduleIds });
    }

    await queryInterface.bulkDelete("modules", { course_id: courseIds });
    await queryInterface.bulkDelete("courses", { id: courseIds });
  },
};
