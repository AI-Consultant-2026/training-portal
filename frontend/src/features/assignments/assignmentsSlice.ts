import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as assignmentsApi from "../../api/assignments.api";
import { Assignment, AssignmentSubmission } from "../../types/api";

export interface AssignmentsState {
  currentAssignment: Assignment | null;
  mySubmission: AssignmentSubmission | null;
  ungradedSubmissions: AssignmentSubmission[];
  submissionToGrade: AssignmentSubmission | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  submitStatus: "idle" | "loading" | "succeeded" | "failed";
  gradeStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AssignmentsState = {
  currentAssignment: null,
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

export const fetchAssignment = createAsyncThunk("assignments/fetchOne", async (assignmentId: string) => {
  return assignmentsApi.fetchAssignment(assignmentId);
});

export const submitAssignment = createAsyncThunk(
  "assignments/submit",
  async (input: assignmentsApi.SubmitAssignmentInput, { rejectWithValue }) => {
    try {
      return await assignmentsApi.submitAssignment(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchMySubmission = createAsyncThunk(
  "assignments/fetchMySubmission",
  async ({ assignmentId, submissionId }: { assignmentId: string; submissionId: string }) => {
    return assignmentsApi.fetchSubmission(assignmentId, submissionId);
  },
);

export const fetchMySubmissionForAssignment = createAsyncThunk(
  "assignments/fetchMySubmissionForAssignment",
  async (assignmentId: string) => {
    return assignmentsApi.fetchMySubmissionForAssignment(assignmentId);
  },
);

export const fetchUngradedSubmissions = createAsyncThunk("assignments/fetchUngraded", async () => {
  return assignmentsApi.listUngradedSubmissions();
});

export const gradeSubmission = createAsyncThunk(
  "assignments/grade",
  async (input: assignmentsApi.GradeSubmissionInput, { rejectWithValue }) => {
    try {
      return await assignmentsApi.gradeSubmission(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const fetchSubmissionForGrading = createAsyncThunk(
  "assignments/fetchForGrading",
  async (submissionId: string, { rejectWithValue }) => {
    try {
      return await assignmentsApi.fetchSubmissionForGrading(submissionId);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    clearSubmitStatus(state) {
      state.submitStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignment.pending, (state) => {
        state.status = "loading";
        state.currentAssignment = null;
        state.mySubmission = null;
      })
      .addCase(fetchAssignment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentAssignment = action.payload;
      })
      .addCase(fetchAssignment.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load assignment";
      })
      .addCase(submitAssignment.pending, (state) => {
        state.submitStatus = "loading";
        state.error = null;
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        state.submitStatus = "succeeded";
        state.mySubmission = action.payload;
      })
      .addCase(submitAssignment.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.error = (action.payload as string) ?? "Could not submit assignment";
      })
      .addCase(fetchMySubmission.fulfilled, (state, action) => {
        state.mySubmission = action.payload;
      })
      .addCase(fetchMySubmissionForAssignment.fulfilled, (state, action) => {
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

export const { clearSubmitStatus } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
