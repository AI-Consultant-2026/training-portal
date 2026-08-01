import { CheckCheckpointAnswerResult, Lesson, MarkLessonCompleteResult, VideoCheckpoint } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchModuleLessons(moduleId: string): Promise<Lesson[]> {
  const res = await axiosClient.get<{ lessons: Lesson[] }>(`/modules/${moduleId}/lessons`);
  return res.data.lessons;
}

export async function fetchLesson(lessonId: string): Promise<Lesson> {
  const res = await axiosClient.get<{ lesson: Lesson }>(`/lessons/${lessonId}`);
  return res.data.lesson;
}

export async function fetchLessonCompletion(lessonId: string): Promise<boolean> {
  const res = await axiosClient.get<{ completed: boolean }>(`/lessons/${lessonId}/my-completion`);
  return res.data.completed;
}

export async function markLessonComplete(lessonId: string): Promise<MarkLessonCompleteResult> {
  const res = await axiosClient.post<MarkLessonCompleteResult>(`/lessons/${lessonId}/mark-complete`);
  return res.data;
}

export async function fetchLessonCheckpoints(lessonId: string): Promise<VideoCheckpoint[]> {
  const res = await axiosClient.get<{ checkpoints: VideoCheckpoint[] }>(`/lessons/${lessonId}/checkpoints`);
  return res.data.checkpoints;
}

export async function checkCheckpointAnswer(
  lessonId: string,
  checkpointId: string,
  answerId: string,
): Promise<CheckCheckpointAnswerResult> {
  const res = await axiosClient.post<CheckCheckpointAnswerResult>(
    `/lessons/${lessonId}/checkpoints/${checkpointId}/check`,
    { answerId },
  );
  return res.data;
}
