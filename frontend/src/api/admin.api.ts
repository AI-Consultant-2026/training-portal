import {
  AdminCapstone,
  AdminStats,
  Candidate,
  CoursePayment,
  CourseProgressSummary,
  Lead,
  Partner,
  RefundStatus,
  ZoomAttendee,
  AmbassadorNotice,
  AmbassadorNoticeInput,
  SalesRep,
  SalesRepDetail,
  SalesRepInput,
  SalesRepPaymentInput,
} from "../types/api";
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

export async function fetchCourseProgress(): Promise<{ courses: CourseProgressSummary[]; stalledAfterDays: number }> {
  const res = await axiosClient.get<{ courses: CourseProgressSummary[]; stalledAfterDays: number }>(
    "/admin/course-progress",
  );
  return res.data;
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

// Instalments: tick the ₦20,000 deposit by hand (unlocks Days 1-2).
export async function setDepositPaid(enrollmentId: string, depositPaid: boolean): Promise<void> {
  await axiosClient.patch(`/admin/enrollments/${enrollmentId}/deposit`, { depositPaid });
}

// Records a cooling-off refund (the money is refunded in Paystack) and locks the course.
export async function recordRefund(
  enrollmentId: string,
  input: { note?: string; override?: boolean },
): Promise<{ refund: RefundStatus; referralVoided: boolean; referralWarning: string | null }> {
  const res = await axiosClient.post<{ refund: RefundStatus; referralVoided: boolean; referralWarning: string | null }>(
    `/admin/enrollments/${enrollmentId}/refund`,
    input,
  );
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

export async function fetchZoomAttendees(): Promise<ZoomAttendee[]> {
  const res = await axiosClient.get<{ attendees: ZoomAttendee[] }>("/admin/zoom-attendees");
  return res.data.attendees;
}

export async function fetchAdminNotices(): Promise<AmbassadorNotice[]> {
  const res = await axiosClient.get<{ notices: AmbassadorNotice[] }>("/admin/notices");
  return res.data.notices;
}

export async function createNotice(input: AmbassadorNoticeInput): Promise<AmbassadorNotice> {
  const res = await axiosClient.post<{ notice: AmbassadorNotice }>("/admin/notices", input);
  return res.data.notice;
}

export async function updateNotice(id: string, input: AmbassadorNoticeInput): Promise<AmbassadorNotice> {
  const res = await axiosClient.patch<{ notice: AmbassadorNotice }>(`/admin/notices/${id}`, input);
  return res.data.notice;
}

export async function deleteNotice(id: string): Promise<void> {
  await axiosClient.delete(`/admin/notices/${id}`);
}

export async function deleteZoomAttendee(id: string): Promise<void> {
  await axiosClient.delete(`/admin/zoom-attendees/${id}`);
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

// Opens the receipt a student uploaded with an older payment record in a new tab (the endpoint
// needs the admin's token, so it's fetched as a blob rather than linked directly).
export async function openPaymentReceipt(paymentId: string): Promise<void> {
  const tab = window.open("", "_blank");
  const res = await axiosClient.get(`/admin/payments/${paymentId}/receipt`, { responseType: "blob" });
  const url = window.URL.createObjectURL(res.data as Blob);
  if (tab) tab.location.href = url;
  else window.location.href = url;
}

// Commission sales reps (/admin/sales-reps).
export async function fetchSalesReps(): Promise<SalesRep[]> {
  const res = await axiosClient.get<{ reps: SalesRep[] }>("/admin/sales-reps");
  return res.data.reps;
}

export async function fetchSalesRep(id: string): Promise<SalesRepDetail> {
  const res = await axiosClient.get<{ rep: SalesRepDetail }>(`/admin/sales-reps/${id}`);
  return res.data.rep;
}

export async function createSalesRep(input: SalesRepInput): Promise<SalesRepDetail> {
  const res = await axiosClient.post<{ rep: SalesRepDetail }>("/admin/sales-reps", input);
  return res.data.rep;
}

export async function updateSalesRep(id: string, input: SalesRepInput): Promise<SalesRepDetail> {
  const res = await axiosClient.patch<{ rep: SalesRepDetail }>(`/admin/sales-reps/${id}`, input);
  return res.data.rep;
}

export async function recordSalesRepPayment(id: string, input: SalesRepPaymentInput): Promise<SalesRepDetail> {
  const res = await axiosClient.post<{ rep: SalesRepDetail }>(`/admin/sales-reps/${id}/payments`, input);
  return res.data.rep;
}

export async function deleteSalesRepPayment(id: string, paymentId: string): Promise<SalesRepDetail> {
  const res = await axiosClient.delete<{ rep: SalesRepDetail }>(`/admin/sales-reps/${id}/payments/${paymentId}`);
  return res.data.rep;
}
