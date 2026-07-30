import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as adminApi from "../../api/admin.api";
import { AdminStats } from "../../types/api";

export interface AdminState {
  stats: AdminStats | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AdminState = {
  stats: null,
  status: "idle",
  error: null,
};

export const fetchAdminStats = createAsyncThunk("admin/fetchStats", async () => {
  return adminApi.fetchAdminStats();
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
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
      });
  },
});

export default adminSlice.reducer;
