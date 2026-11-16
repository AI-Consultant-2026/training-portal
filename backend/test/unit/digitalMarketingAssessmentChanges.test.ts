import { DM_ASSESSMENT_CHANGES as CHANGES } from "../../src/seeders/data/curriculumDigitalMarketingAssessment";
import { FEEDBACK_QUESTIONNAIRES } from "../../src/constants/feedbackQuestionnaires";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const migration = require("../../src/migrations/20261116100000-digital-marketing-assessment-changes");

const applyLessonChanges = migration.applyLessonChanges as (
  key: string,
  content: string,
  images: { afterParagraph?: number; url?: string }[] | null,
) => { content: string; images: { afterParagraph?: number; url?: string }[] | null } | null;

describe("Digital Marketing assessment changes (2026-11-16)", () => {
  it("has a three-question knowledge check (MCQ, true or false, scenario) in all 16 lessons", () => {
    const keys = Object.keys(CHANGES.knowledgeChecks);
    expect(keys).toHaveLength(16);
    for (const key of keys) {
      const text = CHANGES.knowledgeChecks[key].join("\n\n");
      expect(text).toContain(`**Knowledge check ${key}**`);
      expect(text.match(/<details><summary>Show answer<\/summary>/g)).toHaveLength(3);
      expect(text).toMatch(/\*\*2\.\*\* True or false: /);
      expect(text).toMatch(/\*\*1\.\*\*[^\n]+\n\n- A\. /);
      expect(text).toMatch(/\*\*3\.\*\*[^\n]+\n\n- A\. /);
    }
  });

  it("adds exactly three learner reflections", () => {
    const all = Object.values(CHANGES.knowledgeChecks).flat().join("\n");
    expect(all.match(/\*\*Learner reflection \d of 3\*\*/g)).toHaveLength(3);
  });

  it("has a 30-question multiple-choice final across the eight topics", () => {
    expect(CHANGES.finalAssessment).toHaveLength(30);
    for (const q of CHANGES.finalAssessment) {
      expect(q.type).toBe("multiple_choice");
      expect(q.answers.filter((a) => a.isCorrect)).toHaveLength(1);
    }
    const table = CHANGES.closing.join("\n\n");
    const counts = [...table.matchAll(/^\| [^|*]+ \| (\d+) \|$/gm)].map((m) => Number(m[1]));
    expect(counts).toEqual([4, 4, 4, 4, 4, 4, 3, 3]);
    expect(table).toContain("24 out of 30 (80%)");
  });

  it("inserts the check before the closing section and moves later images down", () => {
    const content = ["Intro", "## Middle", "Body", "## Bringing It Together", "Summary"].join("\n\n");
    const images = [{ afterParagraph: 1, url: "a" }, { afterParagraph: 3, url: "b" }];
    const result = applyLessonChanges("1.1", content, images)!;
    const paragraphs = result.content.split("\n\n");
    const at = paragraphs.indexOf("**Knowledge check 1.1**");
    expect(at).toBe(3);
    expect(paragraphs[result.images![0].afterParagraph!]).toBe("## Middle");
    expect(paragraphs[result.images![1].afterParagraph!]).toBe("## Bringing It Together");
    expect(applyLessonChanges("1.1", result.content, result.images)).toBeNull();
  });

  it("re-words the capstone sentence and appends the final and feedback sections to 8.2", () => {
    const old = CHANGES.textEdits["8.2"].find((e) => /capstone/i.test(e.from))!.from;
    const result = applyLessonChanges("8.2", `Intro\n\n## Bringing It Together\n\n${old}`, [])!;
    expect(result.content).not.toMatch(/capstone/i);
    expect(result.content).toContain("## Final assessment");
    expect(result.content.trim().endsWith("Your answers help us improve the course.")).toBe(true);
  });

  it("has a five-question feedback questionnaire without the project question", () => {
    const q = FEEDBACK_QUESTIONNAIRES["digital-marketing"];
    expect(q.choiceQuestions).toHaveLength(3);
    expect(q.asksCapstoneConsent).toBe(false);
  });

  it("leaves no assignment or capstone wording in the edited text or quiz stems", () => {
    for (const edits of Object.values(CHANGES.textEdits)) {
      for (const edit of edits) expect(edit.to).not.toMatch(/assignment|capstone/i);
    }
    expect(CHANGES.quizQuestionEdits).toHaveLength(4);
    for (const edit of CHANGES.quizQuestionEdits) expect(edit.to).not.toMatch(/capstone|assignment/i);
    expect(CHANGES.module8.title.to).not.toMatch(/capstone/i);
    expect(CHANGES.lessonTitleEdits["8.2"].to).not.toMatch(/capstone/i);
  });
});
