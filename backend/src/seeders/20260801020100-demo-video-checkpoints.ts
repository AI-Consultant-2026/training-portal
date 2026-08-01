import crypto from "crypto";
import { QueryInterface } from "sequelize";

interface AnswerSeed {
  text: string;
  isCorrect: boolean;
}

interface CheckpointSeed {
  timestampSeconds: number;
  type: "multiple_choice" | "true_false";
  text: string;
  explanation: string;
  answers: AnswerSeed[];
}

interface LessonVideoSeed {
  slug: string;
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
  checkpoints: CheckpointSeed[];
}

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here. Checkpoint questions deliberately test well-established,
// unambiguous facts about each topic (matching what this app's own course content
// already teaches) rather than any specific claim only made verbatim in that exact
// video, since the video's precise wording can't be transcribed ahead of time.
const CONTENT: LessonVideoSeed[] = [
  {
    slug: "cyber-security-fundamentals",
    weekNumber: 1,
    lessonTitle: "The CIA Triad",
    videoUrl: "https://www.youtube.com/watch?v=mQK9YBPUp08",
    checkpoints: [
      {
        timestampSeconds: 30,
        type: "multiple_choice",
        text: "What does the 'C' in the CIA Triad stand for?",
        explanation: "Confidentiality means making sure information is only accessible to people who are supposed to see it.",
        answers: [
          { text: "Confidentiality", isCorrect: true },
          { text: "Control", isCorrect: false },
          { text: "Cryptography", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 90,
        type: "true_false",
        text: "The CIA Triad's three principles are Confidentiality, Integrity, and Availability.",
        explanation: "These three principles together form the CIA Triad, the foundational model in cybersecurity.",
        answers: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 150,
        type: "multiple_choice",
        text: "Which CIA Triad principle is most directly targeted by a ransomware attack that locks victims out of their own files?",
        explanation: "Ransomware doesn't necessarily steal or alter data, but it makes it unavailable to legitimate users, which is an availability failure.",
        answers: [
          { text: "Availability", isCorrect: true },
          { text: "Confidentiality", isCorrect: false },
          { text: "Integrity", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "digital-marketing",
    weekNumber: 1,
    lessonTitle: "The Digital Marketing Funnel",
    videoUrl: "https://www.youtube.com/watch?v=_3ughEgEtyY",
    checkpoints: [
      {
        timestampSeconds: 30,
        type: "multiple_choice",
        text: "Which funnel stage describes someone who has just learned a business exists?",
        explanation: "Awareness is the very top of the funnel, where visibility, not conversion, is the goal.",
        answers: [
          { text: "Awareness", isCorrect: true },
          { text: "Conversion", isCorrect: false },
          { text: "Loyalty", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 90,
        type: "true_false",
        text: "The awareness stage is typically the top of the marketing funnel.",
        explanation: "Awareness sits at the top of the funnel, before consideration, conversion, and loyalty.",
        answers: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 150,
        type: "multiple_choice",
        text: "Which funnel stage involves a customer actually taking the desired action, like a purchase or sign-up?",
        explanation: "Conversion is the stage where the intended action actually happens, distinct from simply being aware of or considering a business.",
        answers: [
          { text: "Conversion", isCorrect: true },
          { text: "Awareness", isCorrect: false },
          { text: "Consideration", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "gis-and-drone-mapping",
    weekNumber: 1,
    lessonTitle: "Raster vs. Vector Data",
    videoUrl: "https://www.youtube.com/watch?v=N-3zF10LbHg",
    checkpoints: [
      {
        timestampSeconds: 30,
        type: "multiple_choice",
        text: "Which data model represents features as points, lines, and polygons with precise coordinates?",
        explanation: "Vector data is ideal for discrete, well-defined features with clear boundaries, like a well location or a road.",
        answers: [
          { text: "Vector", isCorrect: true },
          { text: "Raster", isCorrect: false },
          { text: "Attribute data", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 90,
        type: "true_false",
        text: "Raster data represents information as a grid of cells, similar in structure to a digital photograph.",
        explanation: "Raster data is a grid of cells (pixels), each holding a value, well suited to continuous phenomena like elevation or temperature.",
        answers: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 150,
        type: "multiple_choice",
        text: "Satellite imagery and elevation data are typically represented using which data model?",
        explanation: "Satellite imagery and elevation are continuous phenomena, which raster data represents well as a grid of cells.",
        answers: [
          { text: "Raster", isCorrect: true },
          { text: "Vector", isCorrect: false },
          { text: "Neither — they use a relational table", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "renewable-energy-digital-systems",
    weekNumber: 1,
    lessonTitle: "Solar PV Technology Overview",
    videoUrl: "https://www.youtube.com/watch?v=RpBSqe1dg1s",
    checkpoints: [
      {
        timestampSeconds: 30,
        type: "multiple_choice",
        text: "What technology do solar panels use to convert sunlight directly into electricity?",
        explanation: "Photovoltaic (PV) technology directly converts sunlight into electricity using semiconductor materials, most commonly silicon.",
        answers: [
          { text: "Photovoltaic (PV) cells", isCorrect: true },
          { text: "Wind turbines", isCorrect: false },
          { text: "Battery storage", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 90,
        type: "true_false",
        text: "Solar panels generate electricity by using semiconductor materials, like silicon, that react to sunlight.",
        explanation: "When sunlight strikes a properly prepared PV cell, it displaces electrons within the semiconductor material, generating current.",
        answers: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 150,
        type: "true_false",
        text: "A solar panel with 20 percent efficiency converts 20 percent of the sunlight energy that hits it into usable electricity.",
        explanation: "Efficiency measures what percentage of input energy is actually converted into useful output, with the rest typically lost as heat.",
        answers: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "social-media-management-content",
    weekNumber: 1,
    lessonTitle: "Platform Comparison",
    videoUrl: "https://www.youtube.com/watch?v=TrBqVGYQSdU",
    checkpoints: [
      {
        timestampSeconds: 30,
        type: "multiple_choice",
        text: "Which platform is built entirely around short-form video and a powerful discovery algorithm?",
        explanation: "TikTok's algorithm can show content to people who've never followed the account before, based purely on how engaging the content is.",
        answers: [
          { text: "TikTok", isCorrect: true },
          { text: "LinkedIn", isCorrect: false },
          { text: "Twitter/X", isCorrect: false },
        ],
      },
      {
        timestampSeconds: 90,
        type: "true_false",
        text: "A large follower count always indicates a socially successful, high-value social media account.",
        explanation: "This is a vanity metric — a page with fewer, highly engaged followers who actually buy can be more valuable than one with many inactive followers.",
        answers: [
          { text: "True", isCorrect: false },
          { text: "False", isCorrect: true },
        ],
      },
      {
        timestampSeconds: 150,
        type: "multiple_choice",
        text: "Which platform is described as the professional network, especially valuable for B2B businesses and recruitment?",
        explanation: "LinkedIn's content style is more informative and industry-focused than the other major platforms.",
        answers: [
          { text: "LinkedIn", isCorrect: true },
          { text: "Instagram", isCorrect: false },
          { text: "TikTok", isCorrect: false },
        ],
      },
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const lessonIdBySlug = new Map<string, string>();
    for (const item of CONTENT) {
      const [rows] = await queryInterface.sequelize.query(
        `SELECT l.id AS lesson_id
         FROM lessons l
         JOIN modules m ON m.id = l.module_id
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
        { replacements: [item.slug, item.weekNumber, item.lessonTitle] },
      );
      const row = (rows as { lesson_id: string }[])[0];
      if (!row) {
        throw new Error(`Could not find lesson "${item.lessonTitle}" (week ${item.weekNumber}) for ${item.slug}`);
      }
      lessonIdBySlug.set(item.slug, row.lesson_id);

      await queryInterface.sequelize.query(`UPDATE lessons SET video_url = ? WHERE id = ?`, {
        replacements: [item.videoUrl, row.lesson_id],
      });
    }

    const checkpointRows: Record<string, unknown>[] = [];
    const answerRows: Record<string, unknown>[] = [];

    CONTENT.forEach((item) => {
      const lessonId = lessonIdBySlug.get(item.slug);
      item.checkpoints.forEach((cp, cpIndex) => {
        const checkpointId = crypto.randomUUID();
        checkpointRows.push({
          id: checkpointId,
          lesson_id: lessonId,
          timestamp_seconds: cp.timestampSeconds,
          question_text: cp.text,
          question_type: cp.type,
          order: cpIndex + 1,
          explanation: cp.explanation,
          created_at: now,
        });
        cp.answers.forEach((a, aIndex) => {
          answerRows.push({
            id: crypto.randomUUID(),
            checkpoint_id: checkpointId,
            answer_text: a.text,
            is_correct: a.isCorrect,
            order: aIndex + 1,
          });
        });
      });
    });

    await queryInterface.bulkInsert("video_checkpoints", checkpointRows);
    await queryInterface.bulkInsert("video_checkpoint_answers", answerRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const lessonIds: string[] = [];
    for (const item of CONTENT) {
      const [rows] = await queryInterface.sequelize.query(
        `SELECT l.id AS lesson_id
         FROM lessons l
         JOIN modules m ON m.id = l.module_id
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
        { replacements: [item.slug, item.weekNumber, item.lessonTitle] },
      );
      const row = (rows as { lesson_id: string }[])[0];
      if (row) lessonIds.push(row.lesson_id);
    }
    if (lessonIds.length === 0) return;

    const [checkpoints] = await queryInterface.sequelize.query(
      `SELECT id FROM video_checkpoints WHERE lesson_id IN (${lessonIds.map(() => "?").join(",")})`,
      { replacements: lessonIds },
    );
    const checkpointIds = (checkpoints as { id: string }[]).map((c) => c.id);
    if (checkpointIds.length > 0) {
      await queryInterface.bulkDelete("video_checkpoint_answers", { checkpoint_id: checkpointIds });
      await queryInterface.bulkDelete("video_checkpoints", { id: checkpointIds });
    }

    await queryInterface.sequelize.query(`UPDATE lessons SET video_url = NULL WHERE id IN (${lessonIds.map(() => "?").join(",")})`, {
      replacements: lessonIds,
    });
  },
};
