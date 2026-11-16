// Course feedback questionnaires (2026-11-16). A course listed here asks five questions in the
// "Share feedback" dialog instead of the usual rating and comment: an overall rating (stored as
// the feedback's rating), three multiple-choice questions (stored in course_feedback.answers by
// id) and an open question (stored as the comment). Other courses keep the rating and comment.
export interface FeedbackChoiceQuestion {
  id: string;
  text: string;
  options: string[];
}

export interface FeedbackQuestionnaire {
  ratingQuestion: string;
  choiceQuestions: FeedbackChoiceQuestion[];
  commentQuestion: string;
  // Courses without a project don't ask permission to show one.
  asksCapstoneConsent: boolean;
}

export const FEEDBACK_QUESTIONNAIRES: Record<string, FeedbackQuestionnaire> = {
  "cybersecure-workforce-essentials": {
    ratingQuestion: "Overall, how would you rate this course?",
    choiceQuestions: [
      {
        id: "relevance",
        text: "How relevant was the course to your day-to-day work?",
        options: ["Very relevant", "Mostly relevant", "Slightly relevant", "Not relevant"],
      },
      {
        id: "confidence",
        text: "How confident do you now feel about spotting and reporting a cyber threat at work?",
        options: ["Much more confident", "A little more confident", "About the same", "Less confident"],
      },
      {
        id: "ease",
        text: "How easy was the course to follow?",
        options: ["Very easy", "Easy", "Difficult", "Very difficult"],
      },
    ],
    commentQuestion: "What was most useful, and what one thing should we improve?",
    asksCapstoneConsent: false,
  },
  "ai-workflow-productivity": {
    ratingQuestion: "Overall, how would you rate this course?",
    choiceQuestions: [
      {
        id: "relevance",
        text: "How relevant was the course to your day-to-day work?",
        options: ["Very relevant", "Mostly relevant", "Slightly relevant", "Not relevant"],
      },
      {
        id: "confidence",
        text: "How confident do you now feel about using AI safely to improve your work?",
        options: ["Much more confident", "A little more confident", "About the same", "Less confident"],
      },
      {
        id: "ease",
        text: "How easy was the course to follow?",
        options: ["Very easy", "Easy", "Difficult", "Very difficult"],
      },
    ],
    commentQuestion: "What was most useful, and what one thing should we improve?",
    asksCapstoneConsent: true,
  },
};

export function questionnaireFor(courseSlug: string | null | undefined): FeedbackQuestionnaire | null {
  return (courseSlug && FEEDBACK_QUESTIONNAIRES[courseSlug]) || null;
}
