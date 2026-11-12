import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { CorporateCourseSeed } from "../seeders/data/curriculumCorporateTypes";
import { CYBERSECURE_WORKFORCE } from "../seeders/data/curriculumCorporateCyberSecure";
import { AI_WORKFLOW } from "../seeders/data/curriculumCorporateAiWorkflow";
import { AI_CYBER_ACCELERATOR } from "../seeders/data/curriculumCorporateAccelerator";

// Loads the lessons of the three corporate courses created (empty) by
// 20261110010000-create-corporate-clients: modules with three lessons each, a
// 10-question module assessment per module (pass 80%), an unscored introductory
// assessment in Module 1, the 25-question final assessment in the last module (pass 80%)
// and the course project as its capstone. Corporate courses have no daily assignments,
// and the graduate courses' day gate doesn't apply to them (see lesson.service.ts).
//
// A migration because seeders never run in production. A course that is missing, or
// already has modules, is skipped, so re-running is a no-op.
const COURSES: CorporateCourseSeed[] = [CYBERSECURE_WORKFORCE, AI_WORKFLOW, AI_CYBER_ACCELERATOR];

const PASS_MARK = 80;
const MODULE_ASSESSMENT_MINUTES = 20;
const FINAL_ASSESSMENT_MINUTES = 45;
const INTRO_ASSESSMENT_MINUTES = 15;

async function findCourseId(queryInterface: QueryInterface, slug: string): Promise<string | null> {
  const [rows] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
    replacements: [slug],
  });
  const row = (rows as { id: string }[])[0];
  return row ? row.id : null;
}

async function moduleCount(queryInterface: QueryInterface, courseId: string): Promise<number> {
  const [rows] = await queryInterface.sequelize.query(
    `SELECT COUNT(*)::int AS count FROM modules WHERE course_id = ?`,
    { replacements: [courseId] },
  );
  return (rows as { count: number }[])[0].count;
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    for (const course of COURSES) {
      const courseId = await findCourseId(queryInterface, course.slug);
      if (!courseId) continue;
      if ((await moduleCount(queryInterface, courseId)) > 0) continue;

      const base = Date.now();
      // Quizzes are listed by created_at, so stagger it to keep intro -> module -> final.
      let tick = 0;
      const at = () => new Date(base + tick++ * 1000);
      const now = new Date(base);
      const lastModule = course.modules[course.modules.length - 1].moduleNumber;

      const moduleRows: Record<string, unknown>[] = [];
      const lessonRows: Record<string, unknown>[] = [];
      const quizRows: Record<string, unknown>[] = [];
      const questionRows: Record<string, unknown>[] = [];
      const answerRows: Record<string, unknown>[] = [];

      const addQuiz = (
        moduleId: string,
        title: string,
        description: string,
        questions: CorporateCourseSeed["finalAssessment"],
        passingScore: number,
        minutes: number,
      ) => {
        const quizId = crypto.randomUUID();
        const created = at();
        quizRows.push({
          id: quizId,
          module_id: moduleId,
          title,
          description,
          due_date: null,
          time_limit_minutes: minutes,
          passing_score: passingScore,
          question_count: questions.length,
          shuffle_questions: true,
          created_at: created,
          updated_at: created,
        });
        questions.forEach((q, qIndex) => {
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
      };

      for (const mod of course.modules) {
        const moduleId = crypto.randomUUID();
        moduleRows.push({
          id: moduleId,
          course_id: courseId,
          title: mod.title,
          description: mod.description,
          week_number: mod.moduleNumber,
          order: mod.moduleNumber,
          status: "published",
          created_at: now,
        });
        mod.lessons.forEach((lesson) => {
          lessonRows.push({
            id: crypto.randomUUID(),
            module_id: moduleId,
            title: lesson.title,
            content: lesson.content,
            video_url: null,
            resources: JSON.stringify({}),
            images: JSON.stringify([]),
            order: lesson.order,
            duration_minutes: lesson.durationMinutes,
            created_at: now,
          });
        });

        if (mod.moduleNumber === 1) {
          addQuiz(
            moduleId,
            "Introductory Assessment (not scored)",
            "Ten questions to take before you start. It isn't scored: it shows you, and your facilitator, which modules need the most attention. Answer from what you would do today.",
            course.introAssessment,
            0,
            INTRO_ASSESSMENT_MINUTES,
          );
        }
        if (mod.assessment.length > 0) {
          addQuiz(
            moduleId,
            `Module ${mod.moduleNumber} Assessment`,
            `Ten questions on this module. Pass mark: 8 out of 10 (${PASS_MARK}%). Take it after the module's lessons.`,
            mod.assessment,
            PASS_MARK,
            MODULE_ASSESSMENT_MINUTES,
          );
        }
        if (mod.moduleNumber === lastModule) {
          addQuiz(
            moduleId,
            "Final Assessment",
            `Twenty-five questions covering the whole course, most of them workplace scenarios. Pass mark: 20 out of 25 (${PASS_MARK}%).`,
            course.finalAssessment,
            PASS_MARK,
            FINAL_ASSESSMENT_MINUTES,
          );
        }
      }

      await queryInterface.bulkInsert("modules", moduleRows);
      await queryInterface.bulkInsert("lessons", lessonRows);
      await queryInterface.bulkInsert("quizzes", quizRows);
      await queryInterface.bulkInsert("quiz_questions", questionRows);
      await queryInterface.bulkInsert("quiz_answers", answerRows);
      await queryInterface.bulkInsert("capstones", [
        {
          id: crypto.randomUUID(),
          course_id: courseId,
          title: course.capstone.title,
          description: course.capstone.description,
          due_date: null,
          file_required: true,
          grading_rubric: null,
          points_total: 100,
          created_at: now,
          updated_at: now,
        },
      ]);
    }
  },

  // Removes the loaded content (the courses themselves stay, as created by the corporate
  // migration). Refuses once anyone is enrolled, so learners' progress is never deleted.
  down: async (queryInterface: QueryInterface) => {
    for (const course of COURSES) {
      const courseId = await findCourseId(queryInterface, course.slug);
      if (!courseId) continue;
      const [enrollments] = await queryInterface.sequelize.query(
        `SELECT COUNT(*)::int AS count FROM enrollments WHERE course_id = ?`,
        { replacements: [courseId] },
      );
      const enrolled = (enrollments as { count: number }[])[0].count;
      if (enrolled > 0) {
        throw new Error(`Refusing to unload ${course.slug}: ${enrolled} enrollment(s) exist`);
      }
      // Lessons, quizzes, questions and answers cascade from modules.
      await queryInterface.bulkDelete("modules", { course_id: courseId });
      await queryInterface.bulkDelete("capstones", { course_id: courseId });
    }
  },
};
