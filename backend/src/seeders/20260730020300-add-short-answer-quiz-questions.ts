import crypto from "crypto";
import { QueryInterface } from "sequelize";

interface ShortAnswerSeed {
  slug: string;
  questionText: string;
  explanation: string;
}

const CONTENT: ShortAnswerSeed[] = [
  {
    slug: "cyber-security-fundamentals",
    questionText:
      "In one or two sentences, explain why reusing the same password across multiple accounts increases security risk.",
    explanation:
      "Reusing a password means a single breach (credential stuffing) exposes every account that shares it; unique passwords per account contain the blast radius of any one leak.",
  },
  {
    slug: "social-media-management-content",
    questionText: "In one or two sentences, explain what a content calendar is used for.",
    explanation:
      "A content calendar plans what gets posted, where, and when, so publishing stays consistent and aligned with campaigns instead of ad hoc.",
  },
  {
    slug: "gis-and-drone-mapping",
    questionText:
      "In one or two sentences, explain the key difference between the vector and raster GIS data models.",
    explanation:
      "Vector data represents discrete features as points, lines, and polygons with precise coordinates; raster data represents continuous phenomena as a grid of cells.",
  },
  {
    slug: "renewable-energy-digital-systems",
    questionText: "In one or two sentences, explain why solar power is particularly well suited to the State.",
    explanation:
      "the State receives strong, consistent year-round sunlight and lacks the geothermal or tidal resources that make other renewable sources practical there.",
  },
  {
    slug: "digital-marketing",
    questionText: "In one or two sentences, explain the difference between organic and paid marketing channels.",
    explanation:
      "Organic channels reach an audience without paying for placement (SEO, unpaid social posts); paid channels buy visibility directly (ads, sponsored placements).",
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();
    const slugs = CONTENT.map((c) => c.slug);

    const [quizzes] = await queryInterface.sequelize.query(
      `SELECT q.id AS quiz_id, c.slug AS slug
       FROM quizzes q
       JOIN modules m ON m.id = q.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug IN (${slugs.map(() => "?").join(",")}) AND q.title = 'Week 1 Quiz'`,
      { replacements: slugs },
    );
    const quizIdBySlug = new Map(
      (quizzes as { quiz_id: string; slug: string }[]).map((q) => [q.slug, q.quiz_id]),
    );

    const questionRows = CONTENT.filter((c) => quizIdBySlug.has(c.slug)).map((c) => ({
      id: crypto.randomUUID(),
      quiz_id: quizIdBySlug.get(c.slug),
      question_text: c.questionText,
      question_type: "short_answer",
      points: 1,
      order: 4,
      explanation: c.explanation,
      created_at: now,
    }));
    if (questionRows.length === 0) return;

    await queryInterface.bulkInsert("quiz_questions", questionRows);

    const quizIds = questionRows.map((r) => r.quiz_id);
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET question_count = 4 WHERE id IN (${quizIds.map(() => "?").join(",")})`,
      { replacements: quizIds },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    const slugs = CONTENT.map((c) => c.slug);

    const [quizzes] = await queryInterface.sequelize.query(
      `SELECT q.id AS quiz_id, c.slug AS slug
       FROM quizzes q
       JOIN modules m ON m.id = q.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug IN (${slugs.map(() => "?").join(",")}) AND q.title = 'Week 1 Quiz'`,
      { replacements: slugs },
    );
    const quizIds = (quizzes as { quiz_id: string }[]).map((q) => q.quiz_id);
    if (quizIds.length === 0) return;

    const questionTexts = CONTENT.map((c) => c.questionText);
    await queryInterface.bulkDelete("quiz_questions", {
      quiz_id: quizIds,
      question_type: "short_answer",
      question_text: questionTexts,
    });

    await queryInterface.sequelize.query(
      `UPDATE quizzes SET question_count = 3 WHERE id IN (${quizIds.map(() => "?").join(",")})`,
      { replacements: quizIds },
    );
  },
};
