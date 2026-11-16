import { axiosClient } from "./axiosClient";

export interface CourseFeedback {
  id: string;
  rating: number;
  comment: string;
  consentQuote: boolean;
  consentCapstone: boolean;
  answers: Record<string, string> | null;
  approved: boolean;
}

// Some courses ask five questions instead of a rating and comment (2026-11-16).
export interface FeedbackQuestionnaire {
  ratingQuestion: string;
  choiceQuestions: { id: string; text: string; options: string[] }[];
  commentQuestion: string;
  asksCapstoneConsent: boolean;
}

export interface AdminFeedbackRow {
  id: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  rating: number;
  comment: string;
  consentQuote: boolean;
  consentCapstone: boolean;
  answers: { question: string; answer: string }[];
  approved: boolean;
  createdAt: string;
}

export async function fetchMyFeedback(enrollmentId: string): Promise<{
  feedback: CourseFeedback | null;
  questionnaire: FeedbackQuestionnaire | null;
}> {
  const res = await axiosClient.get<{
    feedback: CourseFeedback | null;
    questionnaire?: FeedbackQuestionnaire | null;
  }>(`/enrollments/${enrollmentId}/feedback`);
  return {
    feedback: res.data.feedback,
    questionnaire: res.data.questionnaire ?? null,
  };
}

export async function saveMyFeedback(
  enrollmentId: string,
  input: Pick<
    CourseFeedback,
    "rating" | "comment" | "consentQuote" | "consentCapstone"
  > & { answers?: Record<string, string> },
): Promise<CourseFeedback> {
  const res = await axiosClient.put<{ feedback: CourseFeedback }>(
    `/enrollments/${enrollmentId}/feedback`,
    input,
  );
  return res.data.feedback;
}

export async function fetchAdminFeedback(): Promise<AdminFeedbackRow[]> {
  const res = await axiosClient.get<{ feedback: AdminFeedbackRow[] }>(
    "/admin/feedback",
  );
  return res.data.feedback;
}

export async function setFeedbackApproved(
  id: string,
  approved: boolean,
): Promise<void> {
  await axiosClient.patch(`/admin/feedback/${id}`, { approved });
}
