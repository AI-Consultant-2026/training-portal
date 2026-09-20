import { AI_BLOCK_THRESHOLD, analyseText } from "../../src/services/aiContentDetector.service";
import { AI_SAMPLES, HUMAN_SAMPLES } from "../fixtures/originalitySamples";

describe("AI content heuristic", () => {
  it("flags unmistakable chatbot output", () => {
    for (const key of ["phishingChatbot", "templatedList"]) {
      const r = analyseText(AI_SAMPLES[key]);
      expect(r.likelyAi).toBe(true);
      expect(r.score).toBeGreaterThanOrEqual(AI_BLOCK_THRESHOLD);
    }
  });

  it("flags polished essay-style generated prose from stacked tells", () => {
    const r = analyseText(AI_SAMPLES.polishedEssay);
    expect(r.likelyAi).toBe(true);
    expect(r.signals.length).toBeGreaterThanOrEqual(2);
  });

  it("does not flag genuine candidate answers across casual, formal, terse and non-native registers", () => {
    for (const [name, text] of Object.entries(HUMAN_SAMPLES)) {
      const r = analyseText(text);
      expect({ name, likelyAi: r.likelyAi }).toEqual({ name, likelyAi: false });
      expect(r.score).toBeLessThan(AI_BLOCK_THRESHOLD - 20);
    }
  });

  it("doesn't judge very short answers (only chatbot boilerplate counts)", () => {
    expect(analyseText("Email is phishing. SMS is phishing. Call is legit.").likelyAi).toBe(false);
    expect(analyseText("As an AI language model, I cannot verify this.").likelyAi).toBe(true);
  });

  it("does not treat ordinary business pleasantries in a drafted email as chatbot boilerplate", () => {
    const draft =
      "Subject: Suspicious payment request. Hi team, please do not act on the payment change request from yesterday. Let me know if you have any questions, and feel free to reach out to me directly.";
    expect(analyseText(draft).likelyAi).toBe(false);
  });

  it("is honest about its limits: plainly-worded generated text can score below the block line", () => {
    // Documented limitation of a free heuristic -- it catches typical chatbot phrasing and
    // formatting, not generated text that is plain, evenly paced and free of stock phrases.
    const r = analyseText(AI_SAMPLES.uniformProse);
    expect(r.score).toBeGreaterThan(0);
    expect(r.likelyAi).toBe(false);
  });
});
