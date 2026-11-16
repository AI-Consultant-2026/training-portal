import { AI_ML_ASSESSMENT_CHANGES as CHANGES } from "../../src/seeders/data/curriculumAiMlAssessment";
import { FEEDBACK_QUESTIONNAIRES } from "../../src/constants/feedbackQuestionnaires";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const migration = require("../../src/migrations/20261116110000-ai-ml-assessment-changes");

const applyLessonChanges = migration.applyLessonChanges as (
  key: string,
  content: string,
  images: { afterParagraph?: number; url?: string }[] | null,
) => { content: string; images: { afterParagraph?: number; url?: string }[] | null } | null;

describe("AI & Machine Learning Fundamentals assessment changes (2026-11-16)", () => {
  it("has a practical exercise and an eight-question knowledge check in all 36 lessons", () => {
    const keys = Object.keys(CHANGES.knowledgeChecks);
    expect(keys).toHaveLength(36);
    for (const key of keys) {
      const block = CHANGES.knowledgeChecks[key];
      expect(block[0]).toBe("**Practical exercise**");
      const text = block.join("\n\n");
      expect(text).toContain(`**Knowledge check ${key}**`);
      expect(text.match(/<details><summary>Show answer<\/summary>/g)).toHaveLength(8);
      expect(text.match(/\*\*\d\.\*\* True or false: /g)).toHaveLength(1);
      expect(text.match(/\*\*\d\.\*\*[^\n]+\n\n- A\. /g)).toHaveLength(7);
    }
  });

  it("adds exactly three learner reflections", () => {
    const all = Object.values(CHANGES.knowledgeChecks).flat().join("\n");
    expect(all.match(/\*\*Learner reflection \d of 3\*\*/g)).toHaveLength(3);
  });

  it("has a 30-question multiple-choice final across the 18 days, none repeated in the checks", () => {
    expect(CHANGES.finalAssessment).toHaveLength(30);
    const checks = Object.values(CHANGES.knowledgeChecks).flat().join("\n");
    for (const q of CHANGES.finalAssessment) {
      expect(q.type).toBe("multiple_choice");
      expect(q.answers.filter((a) => a.isCorrect)).toHaveLength(1);
      expect(checks).not.toContain(`** ${q.text}\n`);
    }
    const table = CHANGES.closing.join("\n\n");
    const counts = [...table.matchAll(/^\| [^|*]+ \| (\d+) \|$/gm)].map((m) => Number(m[1]));
    expect(counts).toHaveLength(18);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(30);
    expect(table).toContain("24 out of 30 (80%)");
  });

  it("inserts the block before the closing section and moves later images down", () => {
    const content = ["Intro", "## Middle", "Body", "## Bringing It Together", "Summary"].join("\n\n");
    const images = [{ afterParagraph: 1, url: "a" }, { afterParagraph: 3, url: "b" }];
    const result = applyLessonChanges("1.1", content, images)!;
    const paragraphs = result.content.split("\n\n");
    expect(paragraphs.indexOf("**Practical exercise**")).toBe(3);
    expect(paragraphs[result.images![0].afterParagraph!]).toBe("## Middle");
    expect(paragraphs[result.images![1].afterParagraph!]).toBe("## Bringing It Together");
    expect(applyLessonChanges("1.1", result.content, result.images)).toBeNull();
  });

  it("re-words the capstone sentences and appends the final and feedback sections to 18.2", () => {
    const old = CHANGES.textEdits["18.2"].map((e) => e.from).join("\n\n");
    const result = applyLessonChanges("18.2", `Intro\n\n${old}\n\n## Bringing It Together\n\nEnd`, [])!;
    expect(result.content).not.toMatch(/capstone/i);
    expect(result.content).toContain("## Final assessment");
    expect(result.content.trim().endsWith("Your answers help us improve the course.")).toBe(true);
  });

  it("has a five-question feedback questionnaire without the project question", () => {
    const q = FEEDBACK_QUESTIONNAIRES["ai-machine-learning-fundamentals"];
    expect(q.choiceQuestions).toHaveLength(3);
    expect(q.asksCapstoneConsent).toBe(false);
  });

  it("leaves no assignment or capstone wording in the edits, titles or final", () => {
    for (const edits of Object.values(CHANGES.textEdits)) {
      for (const edit of edits) expect(edit.to).not.toMatch(/assignment|capstone/i);
    }
    expect(CHANGES.module18.title.to).not.toMatch(/capstone/i);
    expect(CHANGES.lessonTitleEdits["18.1"].to).not.toMatch(/capstone/i);
    expect(CHANGES.courseDescription.to).not.toMatch(/capstone/i);
    expect(JSON.stringify(CHANGES.finalAssessment)).not.toMatch(/capstone/i);
  });
});
