import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as lessonsApi from "../../api/lessons.api";
import {
  Lesson,
  LessonNavigation,
  MODULE_TASKS_INCOMPLETE_CODE,
  ModuleTaskStatus,
  VideoCheckpoint,
} from "../../types/api";

export interface LessonsState {
  currentLesson: Lesson | null;
  navigation: LessonNavigation | null;
  completed: boolean | null;
  checkpoints: VideoCheckpoint[];
  status: "idle" | "loading" | "succeeded" | "failed";
  markCompleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  // Set when the lesson itself is held back by the day gate (quiz/assignment outstanding).
  taskGate: ModuleTaskStatus | null;
}

const initialState: LessonsState = {
  currentLesson: null,
  navigation: null,
  completed: null,
  checkpoints: [],
  status: "idle",
  markCompleteStatus: "idle",
  error: null,
  taskGate: null,
};

function extractErrorMessage(err: unknown): string {
  const message = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
    ?.message;
  return message ?? "Something went wrong. Please try again.";
}

function extractTaskGate(err: unknown): ModuleTaskStatus | null {
  const details = (err as { response?: { data?: { error?: { details?: unknown } } } })?.response?.data?.error
    ?.details as (ModuleTaskStatus & { code?: string }) | undefined;
  return details?.code === MODULE_TASKS_INCOMPLETE_CODE ? details : null;
}

export const fetchLesson = createAsyncThunk(
  "lessons/fetchOne",
  async (lessonId: string, { rejectWithValue }) => {
    try {
      return await lessonsApi.fetchLesson(lessonId);
    } catch (err) {
      return rejectWithValue({ message: extractErrorMessage(err), taskGate: extractTaskGate(err) });
    }
  },
);

export const fetchLessonNavigation = createAsyncThunk(
  "lessons/fetchNavigation",
  async (lessonId: string) => {
    return lessonsApi.fetchLessonNavigation(lessonId);
  },
);

export const fetchLessonCompletion = createAsyncThunk(
  "lessons/fetchCompletion",
  async (lessonId: string) => {
    return lessonsApi.fetchLessonCompletion(lessonId);
  },
);

export const fetchCheckpoints = createAsyncThunk(
  "lessons/fetchCheckpoints",
  async (lessonId: string) => {
    return lessonsApi.fetchLessonCheckpoints(lessonId);
  },
);

export const markLessonComplete = createAsyncThunk(
  "lessons/markComplete",
  async (lessonId: string, { rejectWithValue }) => {
    try {
      return await lessonsApi.markLessonComplete(lessonId);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLesson.pending, (state) => {
        state.status = "loading";
        state.currentLesson = null;
        state.navigation = null;
        state.completed = null;
        state.checkpoints = [];
        state.taskGate = null;
      })
      .addCase(fetchLesson.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentLesson = action.payload;
      })
      .addCase(fetchLesson.rejected, (state, action) => {
        state.status = "failed";
        const payload = action.payload as { message: string; taskGate: ModuleTaskStatus | null } | undefined;
        state.error = payload?.message ?? "Could not load lesson";
        state.taskGate = payload?.taskGate ?? null;
      })
      .addCase(fetchLessonNavigation.fulfilled, (state, action) => {
        state.navigation = action.payload;
      })
      .addCase(fetchLessonCompletion.fulfilled, (state, action) => {
        state.completed = action.payload;
      })
      .addCase(fetchCheckpoints.fulfilled, (state, action) => {
        state.checkpoints = action.payload;
      })
      .addCase(markLessonComplete.pending, (state) => {
        state.markCompleteStatus = "loading";
        state.error = null;
      })
      .addCase(markLessonComplete.fulfilled, (state) => {
        state.markCompleteStatus = "succeeded";
        state.completed = true;
      })
      .addCase(markLessonComplete.rejected, (state, action) => {
        state.markCompleteStatus = "failed";
        state.error = (action.payload as string) ?? "Could not mark lesson complete";
      });
  },
});

export default lessonsSlice.reducer;
