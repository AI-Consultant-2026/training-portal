import { ASSIGNMENT_BRIEFS, CAPSTONE_BRIEFS } from "../../src/seeders/data/assignmentBriefs";

const EXPECTED_WEEKS: Record<string, number> = {
  "cyber-security-fundamentals": 18,
  "digital-marketing": 8,
  "gis-and-drone-mapping": 8,
  "hse-fundamentals": 8,
};

const REQUIRED_SECTIONS = [
  "## Overview",
  "## What you must do",
  "## What to submit",
  "## How you will be assessed (100 points)",
  "## Worked example: the standard we expect",
  "## Common mistakes to avoid",
  "## Your own words",
];

describe("Assignment and capstone briefs", () => {
  it("cover every weekly assignment of the four live courses", () => {
    for (const [slug, weeks] of Object.entries(EXPECTED_WEEKS)) {
      const have = Object.keys(ASSIGNMENT_BRIEFS[slug]).map(Number).sort((a, b) => a - b);
      expect(have).toEqual(Array.from({ length: weeks }, (_, i) => i + 1));
    }
  });

  it("include a capstone brief for each live course", () => {
    expect(Object.keys(CAPSTONE_BRIEFS).sort()).toEqual(Object.keys(EXPECTED_WEEKS).sort());
  });

  it("give every brief the full set of sections, a 100-point rubric and a worked example", () => {
    const all = [
      ...Object.entries(ASSIGNMENT_BRIEFS).flatMap(([slug, weeks]) =>
        Object.entries(weeks).map(([week, b]) => ({ id: `${slug} week ${week}`, b })),
      ),
      ...Object.entries(CAPSTONE_BRIEFS).map(([slug, b]) => ({ id: `${slug} capstone`, b })),
    ];
    expect(all).toHaveLength(42 + 4);
    for (const { id, b } of all) {
      for (const section of REQUIRED_SECTIONS) {
        expect({ id, has: b.description.includes(section) }).toEqual({ id, has: true });
      }
      expect({ id, total: b.rubric.criteria.reduce((s, c) => s + c.points, 0) }).toEqual({ id, total: 100 });
      expect(b.rubric.criteria.length).toBeGreaterThanOrEqual(3);
      // Substantial enough to be a real brief, not a placeholder.
      expect({ id, words: b.description.split(/\s+/).length > 350 }).toEqual({ id, words: true });
    }
  });

  it("gives the phishing assignment realistic email, SMS and phone-call samples and a what-to-look-for guide", () => {
    const d = ASSIGNMENT_BRIEFS["cyber-security-fundamentals"][5].description;
    expect(d).toMatch(/### Message A: Email/);
    expect(d).toMatch(/### Message B: SMS/);
    expect(d).toMatch(/### Message C: Phone call transcript/);
    for (const cue of [
      "Sender details",
      "Links and attachments",
      "Requests for sensitive information",
      "Urgency and threats",
      "Impersonation and authority",
    ]) {
      expect(d).toContain(cue);
    }
    // Asks for a verdict, the specific tells, and the verification step for each message.
    expect(d).toMatch(/verdict/i);
    expect(d).toMatch(/verification step/i);
    // Includes a mix: at least one legitimate message, so "identify which are phishing" is a real task.
    expect(d).toMatch(/Legitimate/);
  });

  it("ends every 'What to submit' section with the AI-answers-not-accepted sentence", () => {
    const all = [
      ...Object.values(ASSIGNMENT_BRIEFS).flatMap((weeks) => Object.values(weeks)),
      ...Object.values(CAPSTONE_BRIEFS),
    ];
    expect(all).toHaveLength(46);
    for (const b of all) {
      const submitSection = b.description.split("## What to submit")[1].split("## How you will be assessed")[0];
      expect(submitSection).toContain("AI generated answers will not be accepted.");
    }
  });

  it("notes that answers are checked for AI-generated content", () => {
    for (const weeks of Object.values(ASSIGNMENT_BRIEFS)) {
      for (const b of Object.values(weeks)) {
        expect(b.description).toMatch(/automatically checked/);
      }
    }
  });
});
