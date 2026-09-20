// A heuristic check for text that reads as machine-generated. Deliberately built-in and
// free (no external detector API), so it is a *signal*, not proof: no detector, including
// paid ones, is fully reliable. The design therefore leans hard toward avoiding false
// positives -- it only flags on (a) unmistakable chatbot boilerplate, or (b) several
// independent stylistic tells stacking up on a text long enough to judge fairly.
//
// What it looks at, and why each signal is weighted the way it is:
//  - Chatbot boilerplate ("As an AI language model", "Certainly! Here is", "I hope this
//    helps"...): essentially never appears in a genuine assignment answer -> decisive.
//    Generic pleasantries that real business writing also uses ("let me know if you have
//    questions", "feel free to reach out") are deliberately NOT here: candidates draft
//    emails and memos as deliverables.
//  - Stock phrasing ("delve", "multifaceted", "it is important to note", "plays a crucial
//    role"...): common in generated prose, but individual phrases also appear in real
//    formal writing, so it only counts as density per 100 words, capped.
//  - Em-dash density: generated text overuses the em dash; most people typing into a
//    textarea almost never produce one.
//  - Markdown artefacts (**bold**, ## headings) pasted into a plain-text box.
//  - Uniform sentence length (low "burstiness"), a very even rhythm across many sentences.
//  - Templated lists: several items that all open with the same "**Label:**" shape.
//  - Stacked connectives (Furthermore/Moreover/Additionally...) opening many sentences.
//  - No first-person voice or contractions across a long text.

export interface AiDetectionResult {
  /** 0-100, higher = more likely machine-generated. */
  score: number;
  likelyAi: boolean;
  wordCount: number;
  /** Human-readable reasons, for logs and instructors -- never shown as proof to candidates. */
  signals: string[];
}

/** Score at or above which a submission is treated as AI-generated. */
export const AI_BLOCK_THRESHOLD = 60;
/** Below this many words there isn't enough text to judge fairly, so only boilerplate counts. */
export const MIN_WORDS_TO_JUDGE = 80;

const BOILERPLATE: RegExp[] = [
  /\bas an ai( language model)?\b/i,
  /\bas a (large )?language model\b/i,
  /\bi(?:'m| am) (?:sorry|unable), (?:but )?i (?:can(?:no|')t|am unable)/i,
  /\bi (?:cannot|can't) (?:provide|assist|help with) (?:that|this)\b/i,
  /\b(?:certainly|sure|absolutely)[!,.]? (?:here(?:'s| is| are)|below is)\b/i,
  /\bhere(?:'s| is| are) (?:a|an|the|your) (?:detailed|comprehensive) (?:breakdown|analysis|overview|guide|response|answer|explanation)\b/i,
  /\bi hope this (?:helps|clarifies|answers)\b/i,
  /\blet me know if you would like me to\b/i,
  /\bfeel free to (?:ask me|let me know if you'd like me)/i,
  /\bin this (?:response|answer),? i (?:will|have)\b/i,
  /\bas of my (?:last|knowledge)/i,
  /\bwould you like me to\b/i,
];

const STOCK_PHRASES: RegExp[] = [
  /\bdelv(?:e|es|ing)\b/gi,
  /\btapestry\b/gi,
  /\bmultifaceted\b/gi,
  /\bholistic(?:ally)?\b/gi,
  /\bseamless(?:ly)?\b/gi,
  /\bpivotal\b/gi,
  /\bparamount\b/gi,
  /\bmeticulous(?:ly)?\b/gi,
  /\bever[- ]evolving\b/gi,
  /\bdigital landscape\b/gi,
  /\bthreat landscape\b/gi,
  /\bin today'?s (?:digital|fast-paced|modern|interconnected|ever)/gi,
  /\bit is (?:important|crucial|essential|worth) (?:to note|noting|to understand|to remember)\b/gi,
  /\bit'?s (?:important|crucial|essential|worth) (?:to note|noting)\b/gi,
  /\bplays? a (?:crucial|vital|pivotal|key|significant) role\b/gi,
  /\bnavigat(?:e|ing) the complexit/gi,
  /\ba testament to\b/gi,
  /\bunderscor(?:e|es|ed|ing)\b/gi,
  /\bfoster(?:s|ed|ing)?\b/gi,
  /\bleverag(?:e|es|ed|ing)\b/gi,
  /\bcomprehensive (?:understanding|approach|overview|framework|strategy)\b/gi,
  /\brobust (?:security|framework|approach|measures|defen[cs]e)\b/gi,
  /\bcutting-edge\b/gi,
  /\bstreamlin(?:e|es|ed|ing)\b/gi,
  /\bempower(?:s|ed|ing)?\b/gi,
  /\bin (?:conclusion|summary),/gi,
  /\bto (?:summari[sz]e|conclude),/gi,
  /\bnot only\b[^.]{3,80}\bbut also\b/gi,
  /\bthe realm of\b/gi,
  /\bgame[- ]chang(?:er|ing)\b/gi,
  /\bbest practices? (?:include|are|such as)\b/gi,
];

const CONNECTIVE_OPENERS =
  /(?:^|[.!?]\s+)(?:furthermore|moreover|additionally|consequently|in addition|overall|notably|importantly|ultimately|therefore)\b/gi;

function words(text: string): string[] {
  return text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? [];
}

function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'(])/)
    .map((s) => s.trim())
    .filter((s) => words(s).length >= 3);
}

function coefficientOfVariation(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return 0;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance) / mean;
}

export function analyseText(raw: string): AiDetectionResult {
  const text = raw.replace(/\r\n/g, "\n").trim();
  const wordList = words(text);
  const wordCount = wordList.length;
  const signals: string[] = [];

  // Unmistakable chatbot boilerplate is decisive at any length.
  for (const pattern of BOILERPLATE) {
    const match = text.match(pattern);
    if (match) {
      signals.push(`chatbot boilerplate: "${match[0].trim()}"`);
      return { score: 100, likelyAi: true, wordCount, signals };
    }
  }

  if (wordCount < MIN_WORDS_TO_JUDGE) {
    return { score: 0, likelyAi: false, wordCount, signals: ["too short to judge"] };
  }

  const per100 = (count: number) => (count / wordCount) * 100;
  let score = 0;

  // Stock phrasing: density per 100 words, capped.
  let stockHits = 0;
  for (const pattern of STOCK_PHRASES) stockHits += (text.match(pattern) ?? []).length;
  if (stockHits > 0) {
    const points = Math.min(38, Math.round(per100(stockHits) * 14));
    if (points >= 8) {
      score += points;
      signals.push(`${stockHits} stock AI-style phrase(s) (${per100(stockHits).toFixed(1)} per 100 words)`);
    }
  }

  // Em dashes (and the double-hyphen stand-in): real typists rarely produce them.
  const dashes = (text.match(/—| -- /g) ?? []).length;
  if (dashes >= 2 && per100(dashes) >= 0.8) {
    score += Math.min(22, Math.round(per100(dashes) * 9));
    signals.push(`${dashes} em dash(es) (${per100(dashes).toFixed(1)} per 100 words)`);
  }

  // Markdown formatting pasted into a plain-text answer.
  const boldSpans = (text.match(/\*\*[^*\n]{2,80}\*\*/g) ?? []).length;
  const headings = (text.match(/^#{1,4}\s+\S/gm) ?? []).length;
  if (boldSpans >= 3 || headings >= 2) {
    score += 18;
    signals.push(`markdown formatting (${boldSpans} bold span(s), ${headings} heading(s))`);
  }

  // Templated lists: several items opening with the same "**Label:**" / "Label:" shape.
  const labelledItems = (text.match(/^\s*(?:[-*•]|\d+[.)])\s+\**[A-Z][A-Za-z /&-]{2,40}\**\s*:\s*\S/gm) ?? []).length;
  if (labelledItems >= 4) {
    score += 12;
    signals.push(`${labelledItems} templated "Label: explanation" list items`);
  }

  // Stacked connectives opening sentences.
  const sentenceList = sentences(text);
  const connectives = (text.match(CONNECTIVE_OPENERS) ?? []).length;
  if (sentenceList.length >= 6 && connectives / sentenceList.length >= 0.18) {
    score += 14;
    signals.push(`${connectives} sentences opened by stacked connectives (Furthermore/Moreover/...)`);
  }

  // Very even sentence rhythm across many sentences.
  if (sentenceList.length >= 8) {
    const lengths = sentenceList.map((s) => words(s).length);
    const cv = coefficientOfVariation(lengths);
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    if (cv < 0.3 && mean >= 14 && mean <= 30) {
      score += cv < 0.2 ? 28 : 16;
      signals.push(`unusually uniform sentence length (variation ${cv.toFixed(2)}, mean ${mean.toFixed(0)} words)`);
    }
  }

  // No personal voice at all across a long text.
  if (wordCount >= 150) {
    const personal = (text.match(/\b(?:I|I'm|I've|I'd|I'll|my|me|we|our|us)\b/g) ?? []).length;
    const contractions = (text.match(/\b(?:\w+n['’]t|\w+['’](?:re|ve|ll|d|m)|(?:it|that|he|she|there|what|let|here)['’]s)\b/gi) ?? []).length;
    if (personal === 0 && contractions === 0) {
      score += 8;
      signals.push("no first-person voice or contractions across a long answer");
    }
  }

  score = Math.min(100, score);
  return { score, likelyAi: score >= AI_BLOCK_THRESHOLD, wordCount, signals };
}
