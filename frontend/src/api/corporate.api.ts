import { User } from "../types/api";
import { axiosClient } from "./axiosClient";

// Corporate staff portal (2026-11-10): see backend/src/services/corporate.service.ts.

export interface SeatSummary {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  seats: number;
  used: number;
  left: number;
  expiresAt: string | null;
  open: boolean;
}

export interface MemberCourse {
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  progressPercent: number;
  status: string;
  completedAt: string | null;
}

export interface CorporateMemberRow {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string | null;
  department: string | null;
  isManager: boolean;
  joinedAt: string;
  lastActiveAt: string | null;
  courses: MemberCourse[];
}

export interface CorporateClient {
  id: string;
  name: string;
  country: string;
  contactName: string | null;
  contactEmail: string | null;
  joinCode: string;
  joinUrl: string;
  emailDomain: string | null;
  status: "active" | "suspended";
  notes: string | null;
  createdAt: string;
  seats: SeatSummary[];
  memberCount?: number;
  members?: CorporateMemberRow[];
}

export interface CorporateCourseOption {
  id: string;
  title: string;
  slug: string;
}

export interface SeatInput {
  courseId: string;
  seats: number;
  expiresAt?: string | null;
}

export interface ClientInput {
  name: string;
  country?: string;
  contactName?: string | null;
  contactEmail?: string | null;
  emailDomain?: string | null;
  status?: "active" | "suspended";
  notes?: string | null;
  seats?: SeatInput[];
}

export interface JoinInfo {
  companyName: string;
  emailDomain: string | null;
  courses: { courseId: string; title: string; seatsLeft: number; open: boolean }[];
}

export interface MyCompany {
  name: string;
  status: string;
  isManager: boolean;
  joinCode: string;
  availableCourses: { courseId: string; title: string }[];
  joinUrl?: string;
  emailDomain?: string | null;
  seats?: SeatSummary[];
  members?: CorporateMemberRow[];
}

// --- Admin
export async function fetchCorporateClients() {
  const res = await axiosClient.get<{ clients: CorporateClient[]; courses: CorporateCourseOption[] }>(
    "/admin/corporate-clients",
  );
  return res.data;
}
export async function fetchCorporateClient(id: string) {
  return (await axiosClient.get<{ client: CorporateClient }>(`/admin/corporate-clients/${id}`)).data.client;
}
export async function createCorporateClient(input: ClientInput) {
  return (await axiosClient.post<{ client: CorporateClient }>("/admin/corporate-clients", input)).data.client;
}
export async function updateCorporateClient(id: string, input: Partial<ClientInput>) {
  return (await axiosClient.patch<{ client: CorporateClient }>(`/admin/corporate-clients/${id}`, input)).data.client;
}
export async function deleteCorporateClient(id: string) {
  await axiosClient.delete(`/admin/corporate-clients/${id}`);
}
export async function regenerateJoinCode(id: string) {
  return (await axiosClient.post<{ client: CorporateClient }>(`/admin/corporate-clients/${id}/join-code`)).data.client;
}
export async function setCorporateManager(id: string, userId: string, isManager: boolean) {
  return (
    await axiosClient.patch<{ client: CorporateClient }>(`/admin/corporate-clients/${id}/members/${userId}`, {
      isManager,
    })
  ).data.client;
}
export async function removeCorporateMember(id: string, userId: string) {
  return (await axiosClient.delete<{ client: CorporateClient }>(`/admin/corporate-clients/${id}/members/${userId}`))
    .data.client;
}
export async function adminInviteStaff(id: string, emails: string[]) {
  return (await axiosClient.post<{ sent: number }>(`/admin/corporate-clients/${id}/invites`, { emails })).data;
}

// --- Staff join link
export async function fetchJoinInfo(code: string) {
  return (await axiosClient.get<JoinInfo>(`/corporate/join/${code}`)).data;
}
export async function joinWithNewAccount(
  code: string,
  input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    jobTitle?: string;
    department?: string;
    courseIds: string[];
  },
) {
  return (await axiosClient.post<{ user: User; accessToken: string }>(`/corporate/join/${code}`, input)).data;
}
export async function joinWithExistingAccount(code: string, courseIds: string[]) {
  return (await axiosClient.post<{ enrolled: string[] }>(`/corporate/join/${code}/existing`, { courseIds })).data;
}

// --- /company
export async function fetchMyCompany() {
  return (await axiosClient.get<{ company: MyCompany | null }>("/corporate/me")).data.company;
}
export async function managerInviteStaff(emails: string[]) {
  return (await axiosClient.post<{ sent: number }>("/corporate/me/invites", { emails })).data;
}
export async function managerRemoveStaff(userId: string) {
  return (await axiosClient.delete<{ company: MyCompany | null }>(`/corporate/me/members/${userId}`)).data.company;
}

export function apiErrorMessage(err: unknown, fallback: string): string {
  const error = (
    err as {
      response?: { data?: { error?: { message?: string; details?: { fieldErrors?: Record<string, string[]> } } } };
    }
  )?.response?.data?.error;
  const firstFieldError = Object.values(error?.details?.fieldErrors ?? {})[0]?.[0];
  return firstFieldError ?? error?.message ?? fallback;
}

// Splits a pasted list (commas, semicolons, spaces or new lines) into addresses.
export function parseEmailList(text: string): string[] {
  return text
    .split(/[\s,;]+/)
    .map((e) => e.trim())
    .filter((e) => e.includes("@"));
}
