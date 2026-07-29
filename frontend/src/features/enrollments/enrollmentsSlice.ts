import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as enrollmentsApi from "../../api/enrollments.api";
import { Enrollment } from "../../types/api";

export interface EnrollmentsState {
  items: Enrollment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EnrollmentsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchMyEnrollments = createAsyncThunk("enrollments/fetchMine", async () => {
  return enrollmentsApi.fetchMyEnrollments();
});

export const enrollInCourse = createAsyncThunk(
  "enrollments/enroll",
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await enrollmentsApi.enrollInCourse(courseId);
    } catch (err) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not enroll in this course";
      return rejectWithValue(message);
    }
  },
);

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEnrollments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMyEnrollments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMyEnrollments.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load your enrollments";
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Could not enroll in this course";
      });
  },
});

export default enrollmentsSlice.reducer;
