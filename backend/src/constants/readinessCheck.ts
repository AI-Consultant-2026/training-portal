// The free "AI & Cyber Readiness Check" for employers (2026-11-08) at /ai-cyber-readiness-check:
// ten questions, five on cybersecurity and five on AI use, each scored 0, 1 or 2. The page
// renders these questions, readiness-check.js scores them in the browser, and the server
// scores them again (never trusting the browser) before saving the lead and emailing the
// scorecard.

export type ReadinessArea = "cyber" | "ai";

export interface ReadinessQuestion {
  id: string;
  area: ReadinessArea;
  q: string;
  /** Worst to best: scored 0, 1 and 2. */
  options: [string, string, string];
}

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    id: "phishing",
    area: "cyber",
    q: "Have your staff had cybersecurity awareness training (phishing, scams, impersonation) in the last 12 months?",
    options: ["No", "Some staff, once", "All staff, with regular refreshers"],
  },
  {
    id: "payments",
    area: "cyber",
    q: "When a supplier or colleague asks to change bank details or make an urgent payment, how is it checked?",
    options: ["No set process", "Informally, it depends who handles it", "A written rule: always confirm by phone on a known number"],
  },
  {
    id: "mfa",
    area: "cyber",
    q: "Is multi-factor authentication (a code or app as well as a password) switched on for email and key systems?",
    options: ["No", "For some accounts", "For all staff accounts"],
  },
  {
    id: "reporting",
    area: "cyber",
    q: "Do staff know exactly how to report a suspicious email, message or call?",
    options: ["No", "Some do", "Yes, everyone knows the process and uses it"],
  },
  {
    id: "data",
    area: "cyber",
    q: "Have staff been trained to handle personal and customer data in line with your country's data protection law?",
    options: ["No", "Partly, or only some teams", "Yes, all staff who handle personal data"],
  },
  {
    id: "policy",
    area: "ai",
    q: "Does your organisation have a written policy on how staff may use AI tools such as ChatGPT, Claude or Gemini?",
    options: ["No", "Informal guidance only", "Yes, a written policy staff have read"],
  },
  {
    id: "tools",
    area: "ai",
    q: "Do staff know which AI tools are approved for work?",
    options: ["Staff use whatever they like", "Some guidance exists", "Yes, there is an approved list"],
  },
  {
    id: "confidential",
    area: "ai",
    q: "Are there clear rules on what company, customer and staff information must never be put into a public AI tool?",
    options: ["No rules", "Informal understanding", "Clear written rules"],
  },
  {
    id: "skills",
    area: "ai",
    q: "Have employees been trained to use AI tools productively in their own work?",
    options: ["No", "A few people have taught themselves", "Yes, structured training for teams"],
  },
  {
    id: "review",
    area: "ai",
    q: "Is AI-generated work (reports, emails, analysis) checked by a person before it is used or sent?",
    options: ["No", "Sometimes", "Always, and it is a defined step"],
  },
];

export type ReadinessBand = "early" | "developing" | "strong";

export const READINESS_BANDS: Record<ReadinessBand, { label: string; summary: string }> = {
  early: {
    label: "Early stage",
    summary:
      "Important basics are missing, which leaves your organisation exposed to common attacks and to unmanaged AI use. The good news: the first steps are practical and quick to put in place.",
  },
  developing: {
    label: "Developing",
    summary:
      "Some good practice is in place, but it is uneven across teams. Closing the gaps below will make your people a much stronger line of defence and help them use AI safely.",
  },
  strong: {
    label: "Strong foundation",
    summary:
      "Your organisation has solid foundations. The next step is keeping them current and building deeper skills in the people who lead secure AI adoption.",
  },
};

export interface ReadinessResult {
  /** 0-100 overall, and for each area. */
  score: number;
  cyber: number;
  ai: number;
  band: ReadinessBand;
  /** Questions answered 0 or 1, worst first: the gaps to close. */
  gaps: string[];
  /** Which programme(s) to suggest, in order. */
  recommended: ("cybersecure-workforce" | "ai-workflow" | "ai-cyber-accelerator")[];
}

export function bandFor(score: number): ReadinessBand {
  return score <= 40 ? "early" : score <= 70 ? "developing" : "strong";
}

// `answers` holds one 0, 1 or 2 per question, in READINESS_QUESTIONS order.
export function scoreReadiness(answers: number[]): ReadinessResult {
  const pct = (area: ReadinessArea | null) => {
    const idx = READINESS_QUESTIONS.map((q, i) => (area === null || q.area === area ? i : -1)).filter((i) => i >= 0);
    const total = idx.reduce((sum, i) => sum + answers[i], 0);
    return Math.round((total / (idx.length * 2)) * 100);
  };
  const score = pct(null);
  const cyber = pct("cyber");
  const ai = pct("ai");
  const gaps = READINESS_QUESTIONS.map((q, i) => ({ q: q.q, a: answers[i] }))
    .filter((g) => g.a < 2)
    .sort((x, y) => x.a - y.a)
    .map((g) => g.q);
  const recommended: ReadinessResult["recommended"] = [];
  if (cyber <= ai) {
    recommended.push("cybersecure-workforce", "ai-workflow");
  } else {
    recommended.push("ai-workflow", "cybersecure-workforce");
  }
  if (cyber > 70 && ai > 70) recommended.unshift("ai-cyber-accelerator");
  return { score, cyber, ai, band: bandFor(score), gaps, recommended };
}
