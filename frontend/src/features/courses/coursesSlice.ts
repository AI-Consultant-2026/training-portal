import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as coursesApi from "../../api/courses.api";
import { Course } from "../../types/api";

export interface CoursesState {
  items: Course[];
  selectedCourse: Course | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  selectedCourse: null,
  status: "idle",
  error: null,
};

export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  return coursesApi.fetchCourses();
});

export const fetchCourseBySlug = createAsyncThunk("courses/fetchBySlug", async (slug: string) => {
  return coursesApi.fetchCourseBySlug(slug);
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load courses";
      })
      .addCase(fetchCourseBySlug.pending, (state) => {
        state.status = "loading";
        state.selectedCourse = null;
      })
      .addCase(fetchCourseBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseBySlug.rejected, (state) => {
        state.status = "failed";
        state.error = "Could not load course";
      });
  },
});

export default coursesSlice.reducer;
