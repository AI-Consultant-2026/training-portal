import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as adminApi from "../../api/admin.api";
import { AdminQuiz, AdminStats, Candidate, CoursePayment, Lead } from "../../types/api";

export interface CoursePaymentsDrillDown {
  courseId: string;
  courseTitle: string;
  paymentStatus: "confirmed" | "pending";
  requestStatus: "loading" | "succeeded" | "failed";
  payments: CoursePayment[];
}

export interface AdminState {
  stats: AdminStats | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  candidates: Candidate[];
  candidatesStatus: "idle" | "loading" | "succeeded" | "failed";
  candidatesError: string | null;
  leads: Lead[];
  leadsStatus: "idle" | "loading" | "succeeded" | "failed";
  coursePayments: CoursePaymentsDrillDown | null;
  quizzes: AdminQuiz[];
  quizzesStatus: "idle" | "loading" | "succeeded" | "failed";
  quizzesError: string | null;
}

const initialState: AdminState = {
  stats: null,
  status: "idle",
  error: null,
  candidates: [],
  candidatesStatus: "idle",
  candidatesError: null,
  leads: [],
  leadsStatus: "idle",
  coursePayments: null,
  quizzes: [],
  quizzesStatus: "idle",
  quizzesError: null,
};

export const fetchAdminStats = createAsyncThunk("admin/fetchStats", async () => {
  return adminApi.fetchAdminStats();
});

export const fetchCandidates = createAsyncThunk("admin/fetchCandidates", async () => {
  return adminApi.fetchCandidates();
});

export const addCandidate = createAsyncThunk(
  "admin/addCandidate",
  async (input: adminApi.AddCandidateInput, { rejectWithValue }) => {
    try {
      return await adminApi.addCandidate(input);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not add candidate";
      return rejectWithValue(message);
    }
  },
);

export const deleteCandidate = createAsyncThunk("admin/deleteCandidate", async (id: string) => {
  await adminApi.deleteCandidate(id);
  return id;
});

export const deleteInactiveCandidates = createAsyncThunk("admin/deleteInactiveCandidates", async () => {
  return adminApi.deleteInactiveCandidates();
});

export const confirmPayment = createAsyncThunk(
  "admin/confirmPayment",
  async ({ enrollmentId, paymentConfirmed }: { enrollmentId: string; paymentConfirmed: boolean }) => {
    await adminApi.confirmPayment(enrollmentId, paymentConfirmed);
    return { enrollmentId, paymentConfirmed };
  },
);

export const fetchLeads = createAsyncThunk("admin/fetchLeads", async () => {
  return adminApi.fetchLeads();
});

export const addEnrollment = createAsyncThunk(
  "admin/addEnrollment",
  async (
    { candidateId, courseId, paymentConfirmed }: { candidateId: string; courseId: string; paymentConfirmed?: boolean },
    { rejectWithValue },
  ) => {
    try {
      return await adminApi.addEnrollment(candidateId, courseId, paymentConfirmed);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not add course";
      return rejectWithValue(message);
    }
  },
);

export const fetchCoursePayments = createAsyncThunk(
  "admin/fetchCoursePayments",
  async ({
    courseId,
    courseTitle,
    status,
  }: {
    courseId: string;
    courseTitle: string;
    status: "confirmed" | "pending";
  }) => {
    const payments = await adminApi.fetchCoursePayments(courseId, status);
    return { courseId, courseTitle, status, payments };
  },
);

export const fetchQuizzes = createAsyncThunk("admin/fetchQuizzes", async () => {
  return adminApi.fetchQuizzes();
});

export const toggleQuizEnabled = createAsyncThunk(
  "admin/toggleQuizEnabled",
  async (
    { quizId, isEnabled }: { quizId: string; isEnabled: boolean },
    { rejectWithValue },
  ) => {
    try {
      return await adminApi.setQuizEnabled(quizId, isEnabled);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not update this quiz";
      return rejectWithValue(message);
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    closeCoursePayments(state) {
      state.coursePayments = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load admin stats";
      })
      .addCase(fetchCandidates.pending, (state) => {
        state.candidatesStatus = "loading";
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.candidatesStatus = "succeeded";
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state) => {
        state.candidatesStatus = "failed";
        state.candidatesError = "Could not load candidates";
      })
      .addCase(addCandidate.fulfilled, (state, action) => {
        state.candidates.unshift(action.payload);
      })
      .addCase(addCandidate.rejected, (state, action) => {
        state.candidatesError = (action.payload as string) ?? "Could not add candidate";
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        const candidate = state.candidates.find((c) => c.id === action.payload);
        if (candidate) candidate.status = "inactive";
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        for (const candidate of state.candidates) {
          const enrollment = candidate.enrollments.find((e) => e.id === action.payload.enrollmentId);
          if (enrollment) {
            enrollment.paymentConfirmed = action.payload.paymentConfirmed;
          }
        }
      })
      .addCase(fetchLeads.pending, (state) => {
        state.leadsStatus = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leadsStatus = "succeeded";
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state) => {
        state.leadsStatus = "failed";
      })
      .addCase(addEnrollment.fulfilled, (state, action) => {
        const index = state.candidates.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.candidates[index] = action.payload;
      })
      .addCase(addEnrollment.rejected, (state, action) => {
        state.candidatesError = (action.payload as string) ?? "Could not add course";
      })
      .addCase(fetchCoursePayments.pending, (state, action) => {
        // Set eagerly (before the request resolves) so the modal opens with a spinner
        // right on click, using the courseId/status from the request the reducer is
        // reacting to -- not whatever (if anything) was already in state.
        state.coursePayments = {
          courseId: action.meta.arg.courseId,
          courseTitle: action.meta.arg.courseTitle,
          paymentStatus: action.meta.arg.status,
          requestStatus: "loading",
          payments: [],
        };
      })
      .addCase(fetchCoursePayments.fulfilled, (state, action) => {
        if (state.coursePayments?.courseId !== action.payload.courseId) return;
        state.coursePayments.requestStatus = "succeeded";
        state.coursePayments.payments = action.payload.payments;
      })
      .addCase(fetchCoursePayments.rejected, (state, action) => {
        if (state.coursePayments?.courseId !== action.meta.arg.courseId) return;
        state.coursePayments.requestStatus = "failed";
      })
      .addCase(fetchQuizzes.pending, (state) => {
        state.quizzesStatus = "loading";
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.quizzesStatus = "succeeded";
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state) => {
        state.quizzesStatus = "failed";
        state.quizzesError = "Could not load quizzes";
      })
      .addCase(toggleQuizEnabled.fulfilled, (state, action) => {
        const quiz = state.quizzes.find((q) => q.id === action.payload.id);
        if (quiz) quiz.isEnabled = action.payload.isEnabled;
      })
      .addCase(toggleQuizEnabled.rejected, (state, action) => {
        state.quizzesError = (action.payload as string) ?? "Could not update this quiz";
      });
  },
});

export const { closeCoursePayments } = adminSlice.actions;
export default adminSlice.reducer;
