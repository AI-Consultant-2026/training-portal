import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as quizzesApi from "../../api/quizzes.api";
import { QuizAttemptResult, QuizStartResponse, QuizSubmitResponse } from "../../types/api";

export interface QuizzesState {
  activeAttempt: QuizStartResponse | null;
  submitResult: QuizSubmitResponse | null;
  myAttempts: QuizAttemptResult[];
  bestScore: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  submitStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuizzesState = {
  activeAttempt: null,
  submitResult: null,
  myAttempts: [],
  bestScore: null,
  status: "idle",
  submitStatus: "idle",
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
      });
  },
});

export const { resetQuizAttempt } = quizzesSlice.actions;
export default quizzesSlice.reducer;
