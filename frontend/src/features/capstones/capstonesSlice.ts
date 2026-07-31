import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as capstonesApi from "../../api/capstones.api";
import { Capstone, CapstoneSubmission } from "../../types/api";

export interface CapstonesState {
  currentCapstone: Capstone | null;
  mySubmission: CapstoneSubmission | null;
  ungradedSubmissions: CapstoneSubmission[];
  submissionToGrade: CapstoneSubmission | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  submitStatus: "idle" | "loading" | "succeeded" | "failed";
  gradeStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CapstonesState = {
  currentCapstone: null,
  mySubmission: null,
  ungradedSubmissions: [],
  submissionToGrade: null,
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

export const fetchCapstone = createAsyncThunk("capstones/fetchOne", async (capstoneId: string) => {
  return capstonesApi.fetchCapstone(capstoneId);
});

export const submitCapstone = createAsyncThunk(
  "capstones/submit",
  async (input: capstonesApi.SubmitCapstoneInput, { rejectWithValue }) => {
    try {
      return await capstonesApi.submitCapstone(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchMySubmissionForCapstone = createAsyncThunk(
  "capstones/fetchMySubmissionForCapstone",
  async (capstoneId: string) => {
    return capstonesApi.fetchMySubmissionForCapstone(capstoneId);
  },
);

export const fetchUngradedSubmissions = createAsyncThunk("capstones/fetchUngraded", async () => {
  return capstonesApi.listUngradedSubmissions();
});

export const gradeSubmission = createAsyncThunk(
  "capstones/grade",
  async (input: capstonesApi.GradeSubmissionInput, { rejectWithValue }) => {
    try {
      return await capstonesApi.gradeSubmission(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchSubmissionForGrading = createAsyncThunk(
  "capstones/fetchForGrading",
  async (submissionId: string, { rejectWithValue }) => {
    try {
      return await capstonesApi.fetchSubmissionForGrading(submissionId);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const capstonesSlice = createSlice({
  name: "capstones",
  initialState,
  reducers: {
    clearSubmitStatus(state) {
      state.submitStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCapstone.pending, (state) => {
        state.status = "loading";
        state.currentCapstone = null;
        state.mySubmission = null;
      })
      .addCase(fetchCapstone.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCapstone = action.payload;
      })
      .addCase(fetchCapstone.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load capstone";
      })
      .addCase(submitCapstone.pending, (state) => {
        state.submitStatus = "loading";
        state.error = null;
      })
      .addCase(submitCapstone.fulfilled, (state, action) => {
        state.submitStatus = "succeeded";
        state.mySubmission = action.payload;
      })
      .addCase(submitCapstone.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.error = (action.payload as string) ?? "Could not submit capstone";
      })
      .addCase(fetchMySubmissionForCapstone.fulfilled, (state, action) => {
        state.mySubmission = action.payload;
      })
      .addCase(fetchUngradedSubmissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUngradedSubmissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ungradedSubmissions = action.payload;
      })
      .addCase(fetchUngradedSubmissions.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load ungraded submissions";
      })
      .addCase(gradeSubmission.pending, (state) => {
        state.gradeStatus = "loading";
        state.error = null;
      })
      .addCase(gradeSubmission.fulfilled, (state, action) => {
        state.gradeStatus = "succeeded";
        state.ungradedSubmissions = state.ungradedSubmissions.filter(
          (s) => s.id !== action.payload.id,
        );
      })
      .addCase(gradeSubmission.rejected, (state, action) => {
        state.gradeStatus = "failed";
        state.error = (action.payload as string) ?? "Could not grade submission";
      })
      .addCase(fetchSubmissionForGrading.pending, (state) => {
        state.status = "loading";
        state.submissionToGrade = null;
      })
      .addCase(fetchSubmissionForGrading.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissionToGrade = action.payload;
      })
      .addCase(fetchSubmissionForGrading.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Could not load submission";
      });
  },
});

export const { clearSubmitStatus } = capstonesSlice.actions;
export default capstonesSlice.reducer;
