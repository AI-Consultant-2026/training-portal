import {
  Quiz,
  QuizAttemptDetail,
  QuizAttemptResult,
  QuizPendingReview,
  QuizStartResponse,
  QuizSubmitResponse,
} from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchModuleQuizzes(moduleId: string): Promise<Quiz[]> {
  const res = await axiosClient.get<{ quizzes: Quiz[] }>(`/modules/${moduleId}/quizzes`);
  return res.data.quizzes;
}

export async function fetchQuiz(quizId: string): Promise<Quiz> {
  const res = await axiosClient.get<{ quiz: Quiz }>(`/quizzes/${quizId}`);
  return res.data.quiz;
}

export async function startQuizAttempt(quizId: string): Promise<QuizStartResponse> {
  const res = await axiosClient.post<QuizStartResponse>(`/quizzes/${quizId}/start`);
  return res.data;
}

export interface SubmitQuizInput {
  quizId: string;
  attemptId: string;
  responses: { questionId: string; studentAnswer: string }[];
}

export async function submitQuizAttempt(input: SubmitQuizInput): Promise<QuizSubmitResponse> {
  const res = await axiosClient.post<QuizSubmitResponse>(`/quizzes/${input.quizId}/submit`, {
    attemptId: input.attemptId,
    responses: input.responses,
  });
  return res.data;
}

export async function fetchAttempt(quizId: string, attemptId: string): Promise<QuizAttemptDetail> {
  const res = await axiosClient.get<{ attempt: QuizAttemptDetail }>(
    `/quizzes/${quizId}/attempts/${attemptId}`,
  );
  return res.data.attempt;
}

export async function fetchMyAttempts(quizId: string) {
  const res = await axiosClient.get<{ attempts: QuizAttemptResult[]; bestScore: number | null }>(
    `/quizzes/${quizId}/attempts`,
  );
  return res.data;
}

export async function fetchPendingQuizReviews(): Promise<QuizPendingReview[]> {
  const res = await axiosClient.get<{ attempts: QuizPendingReview[] }>(
    "/instructor/ungraded-quiz-attempts",
  );
  return res.data.attempts;
}

export interface GradeQuizAttemptInput {
  attemptId: string;
  responses: { responseId: string; pointsEarned: number }[];
}

export async function gradeQuizAttempt(input: GradeQuizAttemptInput): Promise<QuizAttemptDetail> {
  const res = await axiosClient.patch<{ attempt: QuizAttemptDetail }>(
    `/quiz-attempts/${input.attemptId}/grade`,
    { responses: input.responses },
  );
  return res.data.attempt;
}
