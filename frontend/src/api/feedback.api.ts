import { axiosClient } from "./axiosClient";

export interface CourseFeedback {
  id: string;
  rating: number;
  comment: string;
  consentQuote: boolean;
  consentCapstone: boolean;
  approved: boolean;
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
  approved: boolean;
  createdAt: string;
}

export async function fetchMyFeedback(enrollmentId: string): Promise<CourseFeedback | null> {
  const res = await axiosClient.get<{ feedback: CourseFeedback | null }>(`/enrollments/${enrollmentId}/feedback`);
  return res.data.feedback;
}

export async function saveMyFeedback(
  enrollmentId: string,
  input: Pick<CourseFeedback, "rating" | "comment" | "consentQuote" | "consentCapstone">,
): Promise<CourseFeedback> {
  const res = await axiosClient.put<{ feedback: CourseFeedback }>(`/enrollments/${enrollmentId}/feedback`, input);
  return res.data.feedback;
}

export async function fetchAdminFeedback(): Promise<AdminFeedbackRow[]> {
  const res = await axiosClient.get<{ feedback: AdminFeedbackRow[] }>("/admin/feedback");
  return res.data.feedback;
}

export async function setFeedbackApproved(id: string, approved: boolean): Promise<void> {
  await axiosClient.patch(`/admin/feedback/${id}`, { approved });
}
