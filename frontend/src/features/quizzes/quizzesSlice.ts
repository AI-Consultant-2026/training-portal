import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as quizzesApi from "../../api/quizzes.api";
import {
  QuizAttemptDetail,
  QuizAttemptResult,
  QuizPendingReview,
  QuizStartResponse,
  QuizSubmitResponse,
} from "../../types/api";

export interface QuizzesState {
  activeAttempt: QuizStartResponse | null;
  submitResult: QuizSubmitResponse | null;
  myAttempts: QuizAttemptResult[];
  bestScore: number | null;
  pendingReviews: QuizPendingReview[];
  attemptToGrade: QuizAttemptDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  submitStatus: "idle" | "loading" | "succeeded" | "failed";
  gradeStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuizzesState = {
  activeAttempt: null,
  submitResult: null,
  myAttempts: [],
  bestScore: null,
  pendingReviews: [],
  attemptToGrade: null,
  status: "idle",
  submitStatus: "idle",
  gradeStatus: "idle",
  error: null,
};

function extractErrorMessage(err: unknown): string {
  const message = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
    ?.message;
  return message ?? "Something went wrong. Please try again.";
}

export const startQuizAttempt = createAsyncThunk(
  "quizzes/start",
  async (quizId: string, { rejectWithValue }) => {
    try {
      return await quizzesApi.startQuizAttempt(quizId);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const submitQuizAttempt = createAsyncThunk(
  "quizzes/submit",
  async (input: quizzesApi.SubmitQuizInput, { rejectWithValue }) => {
    try {
      return await quizzesApi.submitQuizAttempt(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchMyAttempts = createAsyncThunk("quizzes/fetchMyAttempts", async (quizId: string) => {
  return quizzesApi.fetchMyAttempts(quizId);
});

export const fetchPendingQuizReviews = createAsyncThunk("quizzes/fetchPendingReviews", async () => {
  return quizzesApi.fetchPendingQuizReviews();
});

export const fetchAttemptForGrading = createAsyncThunk(
  "quizzes/fetchAttemptForGrading",
  async ({ quizId, attemptId }: { quizId: string; attemptId: string }, { rejectWithValue }) => {
    try {
      return await quizzesApi.fetchAttempt(quizId, attemptId);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const gradeQuizAttempt = createAsyncThunk(
  "quizzes/gradeAttempt",
  async (input: quizzesApi.GradeQuizAttemptInput, { rejectWithValue }) => {
    try {
      return await quizzesApi.gradeQuizAttempt(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    resetQuizAttempt(state) {
      state.activeAttempt = null;
      state.submitResult = null;
      state.submitStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startQuizAttempt.pending, (state) => {
        state.status = "loading";
        state.submitResult = null;
        state.error = null;
      })
      .addCase(startQuizAttempt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeAttempt = action.payload;
      })
      .addCase(startQuizAttempt.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Could not start quiz";
      })
      .addCase(submitQuizAttempt.pending, (state) => {
        state.submitStatus = "loading";
        state.error = null;
      })
      .addCase(submitQuizAttempt.fulfilled, (state, action) => {
        state.submitStatus = "succeeded";
        state.submitResult = action.payload;
      })
      .addCase(submitQuizAttempt.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.error = (action.payload as string) ?? "Could not submit quiz";
      })
      .addCase(fetchMyAttempts.fulfilled, (state, action) => {
        state.myAttempts = action.payload.attempts;
        state.bestScore = action.payload.bestScore;
      })
      .addCase(fetchPendingQuizReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPendingQuizReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pendingReviews = action.payload;
      })
      .addCase(fetchPendingQuizReviews.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load pending reviews";
      })
      .addCase(fetchAttemptForGrading.pending, (state) => {
        state.status = "loading";
        state.attemptToGrade = null;
      })
      .addCase(fetchAttemptForGrading.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attemptToGrade = action.payload;
      })
      .addCase(fetchAttemptForGrading.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Could not load attempt";
      })
      .addCase(gradeQuizAttempt.pending, (state) => {
        state.gradeStatus = "loading";
        state.error = null;
      })
      .addCase(gradeQuizAttempt.fulfilled, (state, action) => {
        state.gradeStatus = "succeeded";
        state.attemptToGrade = action.payload;
        state.pendingReviews = state.pendingReviews.filter((r) => r.id !== action.payload.id);
      })
      .addCase(gradeQuizAttempt.rejected, (state, action) => {
        state.gradeStatus = "failed";
        state.error = (action.payload as string) ?? "Could not grade attempt";
      });
  },
});

export const { resetQuizAttempt } = quizzesSlice.actions;
export default quizzesSlice.reducer;
