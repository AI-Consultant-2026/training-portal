import crypto from "crypto";
import { QueryInterface } from "sequelize";

interface AnswerSeed {
  text: string;
  isCorrect: boolean;
}

interface QuestionSeed {
  text: string;
  type: "multiple_choice" | "true_false";
  answers: AnswerSeed[];
}

interface CourseContentSeed {
  slug: string;
  assignmentTitle: string;
  assignmentDescription: string;
  fileRequired: boolean;
  questions: QuestionSeed[];
}

const CONTENT: CourseContentSeed[] = [
  {
    slug: "cyber-security-fundamentals",
    assignmentTitle: "Breach Case Study Analysis",
    assignmentDescription:
      "Research and document 3 real-world data breaches; analyze the specific attack vectors used in each.",
    fileRequired: false,
    questions: [
      {
        text: "Which of the following best describes the CIA Triad?",
        type: "multiple_choice",
        answers: [
          { text: "Confidentiality, Integrity, Availability", isCorrect: true },
          { text: "Control, Isolation, Authentication", isCorrect: false },
          { text: "Cryptography, Identity, Access", isCorrect: false },
        ],
      },
      {
        text: "Which attack type relies primarily on manipulating human psychology rather than a technical flaw?",
        type: "multiple_choice",
        answers: [
          { text: "Social engineering", isCorrect: true },
          { text: "Buffer overflow", isCorrect: false },
          { text: "SQL injection", isCorrect: false },
        ],
      },
      {
        text: "Ransomware encrypts a victim's files and demands payment for the decryption key.",
        type: "true_false",
        answers: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "social-media-management-content",
    assignmentTitle: "Brand Strategy Analysis",
    assignmentDescription: "Analyze 3 brands on social media and document your observations about their strategy.",
    fileRequired: false,
    questions: [
      {
        text: "Which platform is built entirely around short-form video and a powerful discovery algorithm?",
        type: "multiple_choice",
        answers: [
          { text: "TikTok", isCorrect: true },
          { text: "LinkedIn", isCorrect: false },
          { text: "Twitter/X", isCorrect: false },
        ],
      },
      {
        text: "What is the primary purpose of a buyer or audience persona?",
        type: "multiple_choice",
        answers: [
          { text: "A detailed, research-based representation of the ideal customer", isCorrect: true },
          { text: "A list of every follower an account has", isCorrect: false },
          { text: "A schedule of when to post content", isCorrect: false },
        ],
      },
      {
        text: "A large follower count always indicates a socially successful, high-value account.",
        type: "true_false",
        answers: [
          { text: "True", isCorrect: false },
          { text: "False", isCorrect: true },
        ],
      },
    ],
  },
  {
    slug: "gis-and-drone-mapping",
    assignmentTitle: "GIS Applications Research",
    assignmentDescription: "Research GIS applications already in use, or clearly needed, in the State, and document your findings.",
    fileRequired: true,
    questions: [
      {
        text: "Which data model represents features as points, lines, and polygons with precise coordinates?",
        type: "multiple_choice",
        answers: [
          { text: "Vector", isCorrect: true },
          { text: "Raster", isCorrect: false },
          { text: "Tabular", isCorrect: false },
        ],
      },
      {
        text: "Which data model represents continuous phenomena as a grid of cells?",
        type: "multiple_choice",
        answers: [
          { text: "Raster", isCorrect: true },
          { text: "Vector", isCorrect: false },
          { text: "Relational", isCorrect: false },
        ],
      },
      {
        text: "Raster data is ideal for representing discrete features with sharp, well-defined boundaries.",
        type: "true_false",
        answers: [
          { text: "True", isCorrect: false },
          { text: "False", isCorrect: true },
        ],
      },
    ],
  },
  {
    slug: "renewable-energy-digital-systems",
    assignmentTitle: "Renewable Energy Policy Research",
    assignmentDescription: "Research renewable energy policies and incentives currently in place in Nigeria.",
    fileRequired: false,
    questions: [
      {
        text: "Which formula correctly relates power, voltage, and current?",
        type: "multiple_choice",
        answers: [
          { text: "Power = Voltage x Current", isCorrect: true },
          { text: "Power = Voltage / Current", isCorrect: false },
          { text: "Power = Current squared only", isCorrect: false },
        ],
      },
      {
        text: "Which renewable source is generally the most practical and accessible option for the State?",
        type: "multiple_choice",
        answers: [
          { text: "Solar", isCorrect: true },
          { text: "Geothermal", isCorrect: false },
          { text: "Tidal", isCorrect: false },
        ],
      },
      {
        text: "Solar PV panels typically become more efficient as they get hotter.",
        type: "true_false",
        answers: [
          { text: "True", isCorrect: false },
          { text: "False", isCorrect: true },
        ],
      },
    ],
  },
  {
    slug: "digital-marketing",
    assignmentTitle: "Marketing Funnel Analysis",
    assignmentDescription:
      "Analyze the digital marketing funnel for a real business; identify which channels are used at each funnel stage.",
    fileRequired: false,
    questions: [
      {
        text: "Which funnel stage describes someone who has never heard of the business before?",
        type: "multiple_choice",
        answers: [
          { text: "Awareness", isCorrect: true },
          { text: "Conversion", isCorrect: false },
          { text: "Loyalty", isCorrect: false },
        ],
      },
      {
        text: "Which of the following is an example of a SMART marketing goal?",
        type: "multiple_choice",
        answers: [
          { text: "Generate 50 qualified leads through the website within 3 months", isCorrect: true },
          { text: "Get more customers", isCorrect: false },
          { text: "Improve our brand", isCorrect: false },
        ],
      },
      {
        text: "It's generally better to execute two or three channels well than to spread thin effort across every channel.",
        type: "true_false",
        answers: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      },
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();
    const dueDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const slugs = CONTENT.map((c) => c.slug);
    const [modules] = await queryInterface.sequelize.query(
      `SELECT m.id AS module_id, c.slug AS slug
       FROM modules m
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const moduleIdBySlug = new Map(
      (modules as { module_id: string; slug: string }[]).map((m) => [m.slug, m.module_id]),
    );

    const assignmentRows = CONTENT.map((c) => ({
      id: crypto.randomUUID(),
      module_id: moduleIdBySlug.get(c.slug),
      title: c.assignmentTitle,
      description: c.assignmentDescription,
      due_date: dueDate,
      file_required: c.fileRequired,
      grading_rubric: null,
      points_total: 100,
      created_at: now,
      updated_at: now,
    }));
    await queryInterface.bulkInsert("assignments", assignmentRows);

    const quizRows = CONTENT.map((c) => ({
      id: crypto.randomUUID(),
      module_id: moduleIdBySlug.get(c.slug),
      title: "Week 1 Quiz",
      description: "A short auto-graded quiz covering this week's topics.",
      due_date: dueDate,
      time_limit_minutes: 15,
      passing_score: 70,
      question_count: 3,
      shuffle_questions: true,
      created_at: now,
      updated_at: now,
    }));
    await queryInterface.bulkInsert("quizzes", quizRows);

    const questionRows: Record<string, unknown>[] = [];
    const questionIdsByQuizIndex: string[][] = [];

    CONTENT.forEach((c, courseIndex) => {
      const quizId = quizRows[courseIndex].id;
      const ids: string[] = [];
      c.questions.forEach((q, qIndex) => {
        const questionId = crypto.randomUUID();
        ids.push(questionId);
        questionRows.push({
          id: questionId,
          quiz_id: quizId,
          question_text: q.text,
          question_type: q.type,
          points: 1,
          order: qIndex + 1,
          explanation: null,
          created_at: now,
        });
      });
      questionIdsByQuizIndex.push(ids);
    });
    await queryInterface.bulkInsert("quiz_questions", questionRows);

    const answerRows: Record<string, unknown>[] = [];
    CONTENT.forEach((c, courseIndex) => {
      c.questions.forEach((q, qIndex) => {
        const questionId = questionIdsByQuizIndex[courseIndex][qIndex];
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
    await queryInterface.bulkInsert("quiz_answers", answerRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const slugs = CONTENT.map((c) => c.slug);
    const [modules] = await queryInterface.sequelize.query(
      `SELECT m.id AS module_id
       FROM modules m
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const moduleIds = (modules as { module_id: string }[]).map((m) => m.module_id);
    if (moduleIds.length === 0) return;

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
  },
};
