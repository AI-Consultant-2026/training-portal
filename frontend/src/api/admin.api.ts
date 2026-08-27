import { AdminCapstone, AdminStats, Candidate, CoursePayment, Lead, Partner } from "../types/api";
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

export async function sendCompletionEmail(enrollmentId: string): Promise<void> {
  await axiosClient.post(`/admin/enrollments/${enrollmentId}/send-completion-email`);
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

export async function deleteLead(id: string): Promise<void> {
  await axiosClient.delete(`/admin/leads/${id}`);
}

export async function fetchPartners(): Promise<Partner[]> {
  const res = await axiosClient.get<{ partners: Partner[] }>("/admin/partners");
  return res.data.partners;
}

export type CreatePartnerInput = Omit<Partner, "id" | "createdAt" | "updatedAt">;
export type UpdatePartnerInput = Partial<CreatePartnerInput>;

export async function createPartner(input: CreatePartnerInput): Promise<Partner> {
  const res = await axiosClient.post<{ partner: Partner }>("/admin/partners", input);
  return res.data.partner;
}

export async function updatePartner(id: string, input: UpdatePartnerInput): Promise<Partner> {
  const res = await axiosClient.patch<{ partner: Partner }>(`/admin/partners/${id}`, input);
  return res.data.partner;
}

export async function deletePartner(id: string): Promise<void> {
  await axiosClient.delete(`/admin/partners/${id}`);
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

export async function fetchCapstones(): Promise<AdminCapstone[]> {
  const res = await axiosClient.get<{ capstones: AdminCapstone[] }>("/admin/capstones");
  return res.data.capstones;
}

export async function setCapstoneEnabled(capstoneId: string, isEnabled: boolean): Promise<AdminCapstone> {
  const res = await axiosClient.patch<{ capstone: AdminCapstone }>(`/admin/capstones/${capstoneId}`, {
    isEnabled,
  });
  return res.data.capstone;
}
