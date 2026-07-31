import { Capstone, CapstoneSubmission } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchCapstoneForCourse(courseId: string): Promise<Capstone | null> {
  const res = await axiosClient.get<{ capstone: Capstone | null }>(`/courses/${courseId}/capstone`);
  return res.data.capstone;
}

export async function fetchCapstone(capstoneId: string): Promise<Capstone> {
  const res = await axiosClient.get<{ capstone: Capstone }>(`/capstones/${capstoneId}`);
  return res.data.capstone;
}

export async function fetchMySubmissionForCapstone(
  capstoneId: string,
): Promise<CapstoneSubmission | null> {
  const res = await axiosClient.get<{ submission: CapstoneSubmission | null }>(
    `/capstones/${capstoneId}/my-submission`,
  );
  return res.data.submission;
}

export interface SubmitCapstoneInput {
  capstoneId: string;
  submissionText?: string;
  file?: File | null;
}

export async function submitCapstone(input: SubmitCapstoneInput): Promise<CapstoneSubmission> {
  const formData = new FormData();
  if (input.submissionText) {
    formData.append("submissionText", input.submissionText);
  }
  if (input.file) {
    formData.append("file", input.file);
  }

  const res = await axiosClient.post<{ submission: CapstoneSubmission }>(
    `/capstones/${input.capstoneId}/submit`,
    formData,
  );
  return res.data.submission;
}

export async function fetchSubmission(
  capstoneId: string,
  submissionId: string,
): Promise<CapstoneSubmission> {
  const res = await axiosClient.get<{ submission: CapstoneSubmission }>(
    `/capstones/${capstoneId}/submissions/${submissionId}`,
  );
  return res.data.submission;
}

export async function listUngradedSubmissions(): Promise<CapstoneSubmission[]> {
  const res = await axiosClient.get<{ submissions: CapstoneSubmission[] }>(
    "/instructor/ungraded-capstone-submissions",
  );
  return res.data.submissions;
}

export async function fetchSubmissionForGrading(submissionId: string): Promise<CapstoneSubmission> {
  // Same shortcut as assignments.api.ts's fetchSubmissionForGrading: ungraded submissions
  // don't carry their capstoneId in the URL for this instructor-facing lookup, so we search
  // the ungraded queue instead of adding a new backend endpoint.
  const submissions = await listUngradedSubmissions();
  const found = submissions.find((s) => s.id === submissionId);
  if (!found) {
    throw new Error("Submission not found or already graded");
  }
  return found;
}

export interface GradeSubmissionInput {
  submissionId: string;
  score: number;
  feedback?: string;
}

export async function gradeSubmission(input: GradeSubmissionInput): Promise<CapstoneSubmission> {
  const res = await axiosClient.patch<{ submission: CapstoneSubmission }>(
    `/capstone-submissions/${input.submissionId}/grade`,
    { score: input.score, feedback: input.feedback },
  );
  return res.data.submission;
}

// The download endpoint requires the JWT bearer token, so a plain <a href> won't work -
// fetch it as a blob through the authenticated client and trigger the browser download ourselves.
export async function downloadSubmissionFile(submissionId: string, fileName: string): Promise<void> {
  const res = await axiosClient.get(`/capstone-submissions/${submissionId}/file`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(res.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
