import { AdminQuiz, AdminStats, Candidate, CoursePayment, Lead } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await axiosClient.get<{ stats: AdminStats }>("/admin/stats");
  return res.data.stats;
}

export async function fetchCandidates(): Promise<Candidate[]> {
  const res = await axiosClient.get<{ candidates: Candidate[] }>("/admin/candidates");
  return res.data.candidates;
}

export interface AddCandidateInput {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  courseInterest?: string;
}

export async function addCandidate(input: AddCandidateInput): Promise<Candidate> {
  const res = await axiosClient.post<{ candidate: Candidate }>("/admin/candidates", input);
  return res.data.candidate;
}

export async function deleteCandidate(id: string): Promise<void> {
  await axiosClient.delete(`/admin/candidates/${id}`);
}

export interface DeleteInactiveCandidatesResult {
  deletedCount: number;
  skippedCount: number;
}

export async function deleteInactiveCandidates(): Promise<DeleteInactiveCandidatesResult> {
  const res = await axiosClient.delete<DeleteInactiveCandidatesResult>("/admin/candidates/inactive");
  return res.data;
}

export async function confirmPayment(enrollmentId: string, paymentConfirmed: boolean): Promise<void> {
  await axiosClient.patch(`/admin/enrollments/${enrollmentId}/payment`, { paymentConfirmed });
}

export async function addEnrollment(
  candidateId: string,
  courseId: string,
  paymentConfirmed?: boolean,
): Promise<Candidate> {
  const res = await axiosClient.post<{ candidate: Candidate }>(
    `/admin/candidates/${candidateId}/enrollments`,
    { courseId, paymentConfirmed },
  );
  return res.data.candidate;
}

export async function fetchLeads(): Promise<Lead[]> {
  const res = await axiosClient.get<{ leads: Lead[] }>("/admin/leads");
  return res.data.leads;
}

export async function fetchCoursePayments(
  courseId: string,
  status: "confirmed" | "pending",
): Promise<CoursePayment[]> {
  const res = await axiosClient.get<{ payments: CoursePayment[] }>(
    `/admin/courses/${courseId}/payments`,
    { params: { status } },
  );
  return res.data.payments;
}

export async function fetchQuizzes(): Promise<AdminQuiz[]> {
  const res = await axiosClient.get<{ quizzes: AdminQuiz[] }>("/admin/quizzes");
  return res.data.quizzes;
}

export async function setQuizEnabled(quizId: string, isEnabled: boolean): Promise<AdminQuiz> {
  const res = await axiosClient.patch<{ quiz: AdminQuiz }>(`/admin/quizzes/${quizId}`, { isEnabled });
  return res.data.quiz;
}
