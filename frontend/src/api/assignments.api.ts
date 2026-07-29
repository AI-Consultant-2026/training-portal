import { Assignment, AssignmentSubmission } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchModuleAssignments(moduleId: string): Promise<Assignment[]> {
  const res = await axiosClient.get<{ assignments: Assignment[] }>(`/modules/${moduleId}/assignments`);
  return res.data.assignments;
}

export async function fetchAssignment(assignmentId: string): Promise<Assignment> {
  const res = await axiosClient.get<{ assignment: Assignment }>(`/assignments/${assignmentId}`);
  return res.data.assignment;
}

export interface SubmitAssignmentInput {
  assignmentId: string;
  submissionText?: string;
  file?: File | null;
}

export async function submitAssignment(input: SubmitAssignmentInput): Promise<AssignmentSubmission> {
  const formData = new FormData();
  if (input.submissionText) {
    formData.append("submissionText", input.submissionText);
  }
  if (input.file) {
    formData.append("file", input.file);
  }

  const res = await axiosClient.post<{ submission: AssignmentSubmission }>(
    `/assignments/${input.assignmentId}/submit`,
    formData,
  );
  return res.data.submission;
}

export async function fetchSubmission(
  assignmentId: string,
  submissionId: string,
): Promise<AssignmentSubmission> {
  const res = await axiosClient.get<{ submission: AssignmentSubmission }>(
    `/assignments/${assignmentId}/submissions/${submissionId}`,
  );
  return res.data.submission;
}

export async function listUngradedSubmissions(): Promise<AssignmentSubmission[]> {
  const res = await axiosClient.get<{ submissions: AssignmentSubmission[] }>(
    "/instructor/ungraded-submissions",
  );
  return res.data.submissions;
}

export async function fetchSubmissionForGrading(submissionId: string): Promise<AssignmentSubmission> {
  // Ungraded submissions don't carry their assignmentId in the URL for this instructor-facing
  // lookup, so we search the ungraded queue instead of adding a new backend endpoint.
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

export async function gradeSubmission(input: GradeSubmissionInput): Promise<AssignmentSubmission> {
  const res = await axiosClient.patch<{ submission: AssignmentSubmission }>(
    `/assignment-submissions/${input.submissionId}/grade`,
    { score: input.score, feedback: input.feedback },
  );
  return res.data.submission;
}
