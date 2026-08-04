export interface LessonImageSeed {
  url: string;
  caption: string;
  afterParagraph: number;
}

export interface LessonSeed {
  title: string;
  content: string;
  order: number;
  durationMinutes: number;
  images?: LessonImageSeed[];
}

export interface AnswerSeed {
  text: string;
  isCorrect: boolean;
}

export interface QuestionSeed {
  text: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  points: number;
  explanation: string | null;
  answers: AnswerSeed[];
}

export interface WeekSeed {
  weekNumber: number;
  moduleTitle: string;
  moduleDescription: string;
  lessons: LessonSeed[];
  assignmentTitle: string;
  assignmentDescription: string;
  fileRequired: boolean;
  quizQuestions: QuestionSeed[];
}
