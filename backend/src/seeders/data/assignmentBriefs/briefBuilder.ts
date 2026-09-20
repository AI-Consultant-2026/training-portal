// Shared template for assignment and capstone briefs. Every brief renders the same
// sections in the same order so candidates always know where to find what is expected:
// scenario -> (materials) -> tasks -> deliverables -> assessment criteria -> worked
// example -> common mistakes -> originality note.
//
// The output is markdown (rendered by the frontend's BriefMarkdown) plus a structured
// rubric stored in assignments.grading_rubric / capstones.grading_rubric.

export interface Criterion {
  name: string;
  points: number;
  /** What earns full marks for this criterion. */
  description: string;
}

export interface BriefSpec {
  /** Scenario / context: why this task exists and what the candidate is doing. */
  overview: string;
  /** Extra material the candidate needs (sample messages, data, scenario detail). Markdown. */
  materials?: string;
  /** Numbered steps, in the order the candidate should do them. */
  tasks: string[];
  /** Exactly what to hand in: format, length, file type. */
  deliverables: string[];
  /** Must total 100 points. */
  criteria: Criterion[];
  /** A worked example at the standard expected, on a DIFFERENT scenario from the task. Markdown. */
  example: string;
  /** Common mistakes / how to approach it well. */
  tips: string[];
}

export interface BuiltBrief {
  description: string;
  rubric: { totalPoints: number; criteria: Criterion[] };
}

const ORIGINALITY_NOTE =
  "Every typed answer and attached file is automatically checked before it is accepted. " +
  "Answers that read as AI-generated are rejected and must be rewritten in your own words, " +
  "so use your own reasoning and your own examples, based on what you learned in the lessons.";

export function buildBrief(spec: BriefSpec): BuiltBrief {
  const total = spec.criteria.reduce((sum, c) => sum + c.points, 0);
  if (total !== 100) {
    throw new Error(`Brief criteria must total 100 points, got ${total}: ${spec.overview.slice(0, 60)}`);
  }

  const parts: string[] = [];
  parts.push(`## Overview\n\n${spec.overview.trim()}`);
  if (spec.materials) parts.push(`## Material you will work with\n\n${spec.materials.trim()}`);
  parts.push(`## What you must do\n\n${spec.tasks.map((t, i) => `${i + 1}. ${t.trim()}`).join("\n")}`);
  parts.push(`## What to submit\n\n${spec.deliverables.map((d) => `- ${d.trim()}`).join("\n")}`);
  parts.push(
    `## How you will be assessed (100 points)\n\n| Criterion | Points | What earns full marks |\n|---|---|---|\n` +
      spec.criteria.map((c) => `| ${c.name} | ${c.points} | ${c.description} |`).join("\n"),
  );
  parts.push(
    `## Worked example: the standard we expect\n\nThis example uses a *different* scenario from your task. Use it to see the level of detail, the structure and the reasoning expected, not to copy wording.\n\n${spec.example.trim()}`,
  );
  parts.push(`## Common mistakes to avoid\n\n${spec.tips.map((t) => `- ${t.trim()}`).join("\n")}`);
  parts.push(`## Your own words\n\n${ORIGINALITY_NOTE}`);

  return {
    description: parts.join("\n\n") + "\n",
    rubric: { totalPoints: 100, criteria: spec.criteria },
  };
}

/** Same as buildBrief, for capstones, with a slightly different example intro. */
export function buildCapstoneBrief(spec: BriefSpec): BuiltBrief {
  const built = buildBrief(spec);
  return {
    description: built.description.replace(
      "This example uses a *different* scenario from your task.",
      "This example uses a *different* scenario or option from your project.",
    ),
    rubric: built.rubric,
  };
}
