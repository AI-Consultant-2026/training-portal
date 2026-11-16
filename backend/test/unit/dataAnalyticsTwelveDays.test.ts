import { DATA_ANALYTICS_12_DAY_CHANGES as CHANGES } from "../../src/seeders/data/curriculumDataAnalyticsAssessment";
import { FEEDBACK_QUESTIONNAIRES } from "../../src/constants/feedbackQuestionnaires";

const all = CHANGES.lessons.map((l) => l.content).join("\n\n");

describe("Data Analytics & BI, 18 days to 12 (2026-11-16)", () => {
  it("has 24 two-part lessons, two in each of 12 days, each kept from a different old lesson", () => {
    expect(CHANGES.lessons).toHaveLength(24);
    const slots = CHANGES.lessons.map((l) => `${l.to.day}.${l.to.order}`);
    expect(new Set(slots).size).toBe(24);
    for (let day = 1; day <= 12; day += 1) expect(slots.filter((s) => s.startsWith(`${day}.`))).toHaveLength(2);
    expect(new Set(CHANGES.lessons.map((l) => `${l.source.day}.${l.source.order}`)).size).toBe(24);
    expect(CHANGES.modules.map((m) => m.toDay)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(CHANGES.removedDays).toEqual([2, 4, 6, 13, 16, 17]);
    expect(CHANGES.durationDays).toBe(12);
  });

  it("keeps both parts' videos and illustrations in every lesson", () => {
    for (const lesson of CHANGES.lessons) {
      const paragraphs = lesson.content.split("\n\n");
      expect(lesson.videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
      expect(lesson.resources.links).toHaveLength(1);
      expect(lesson.content).toContain(`▶ **Part 2 video:** [`);
      expect(lesson.content).toContain(lesson.resources.links[0].url);
      expect(lesson.images).toHaveLength(2);
      expect(paragraphs[lesson.images[0].afterParagraph]).toMatch(/^### Part 1: /);
      expect(paragraphs[lesson.images[1].afterParagraph]).toMatch(/^▶ \*\*Part 2 video:\*\*/);
    }
    const sources = CHANGES.lessons.flatMap((l) => l.images.map((i) => `${i.from.day}.${i.from.order}.${i.from.index}`));
    expect(new Set(sources).size).toBe(48);
  });

  it("gives every lesson two practical exercises and an eight-question check: 5 multiple choice, 1 true or false, 2 scenarios", () => {
    for (const lesson of CHANGES.lessons) {
      expect(lesson.content).toContain("### Exercise 1 (Part 1)");
      expect(lesson.content).toContain("### Exercise 2 (Part 2)");
      const check = lesson.content.split("## Knowledge check")[1].split("\n\n## ")[0];
      expect(check.match(/<details><summary>Show answer<\/summary>/g)).toHaveLength(8);
      expect(check.match(/\*\*\d\.\*\* True or false: /g)).toHaveLength(1);
      expect(check.match(/\*\*\d\.\*\*[^\n]+\n\n- A\. /g)).toHaveLength(7);
    }
  });

  it("adds exactly three learner reflections", () => {
    expect(all.match(/\*\*Learner reflection \d of 3\*\*/g)).toHaveLength(3);
  });

  it("no longer mentions the capstone, assignments, quizzes, tutors or submitting", () => {
    expect(all.replace("from this day's quizzes", "")).not.toMatch(/capstone|assignment|instructor|tutor|\bquiz|\*\*Submit/i);
    for (const module of CHANGES.modules) expect(module.description).not.toMatch(/capstone|assignment/i);
    expect(CHANGES.courseDescription.to).not.toMatch(/capstone/i);
    for (const match of all.matchAll(/\bLessons? (\d+)\.(\d+)/g)) {
      expect(Number(match[1])).toBeLessThanOrEqual(12);
      expect([1, 2]).toContain(Number(match[2]));
    }
  });

  it("has a 30-question multiple-choice final at 80%, none repeated in the checks, closing the last lesson", () => {
    expect(CHANGES.finalAssessment).toHaveLength(30);
    for (const q of CHANGES.finalAssessment) {
      expect(q.type).toBe("multiple_choice");
      expect(q.answers.filter((a) => a.isCorrect)).toHaveLength(1);
      expect(all).not.toContain(`** ${q.text}\n`);
    }
    expect(CHANGES.finalTopics.reduce((sum, t) => sum + t.questions, 0)).toBe(30);
    const last = CHANGES.lessons.find((l) => l.to.day === 12 && l.to.order === 2)!;
    expect(last.content.endsWith(CHANGES.closing.join("\n\n"))).toBe(true);
    expect(last.content).toContain("Pass mark: 24 out of 30 (80%)");
    expect(last.content).toContain("## Course feedback questionnaire");
  });

  it("has a five-question feedback questionnaire", () => {
    const questionnaire = FEEDBACK_QUESTIONNAIRES["data-analytics-business-intelligence"];
    expect(questionnaire.choiceQuestions).toHaveLength(3);
    expect(questionnaire.commentQuestion).toBeTruthy();
    expect(questionnaire.asksCapstoneConsent).toBe(false);
  });
});
