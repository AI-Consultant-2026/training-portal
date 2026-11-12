import { QuestionSeed } from "./curriculumTypes";

// Shape of the three corporate courses (2026-11-12). Unlike the graduate courses' days,
// a corporate module has three lessons, one 10-question module assessment (pass 80%)
// and no daily assignment; the last module has the 25-question final assessment instead,
// and the course has one project/capstone and an unscored introductory assessment.
export interface CorporateLessonSeed {
  title: string;
  order: number;
  durationMinutes: number;
  content: string;
}

export interface CorporateModuleSeed {
  moduleNumber: number;
  title: string;
  description: string;
  lessons: CorporateLessonSeed[];
  // Empty for the final module, which carries the final assessment instead.
  assessment: QuestionSeed[];
}

export interface CorporateCourseSeed {
  slug: string;
  title: string;
  introAssessment: QuestionSeed[];
  finalAssessment: QuestionSeed[];
  capstone: { title: string; description: string };
  modules: CorporateModuleSeed[];
}
