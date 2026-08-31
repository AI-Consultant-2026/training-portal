import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as referralsApi from "../../api/referrals.api";
import { MyReferralSummary, ReferralLeaderboard, ReferralRewardType } from "../../types/api";

export interface ReferralsState {
  summary: MyReferralSummary | null;
  summaryStatus: "idle" | "loading" | "succeeded" | "failed";
  leaderboard: ReferralLeaderboard | null;
  leaderboardStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReferralsState = {
  summary: null,
  summaryStatus: "idle",
  leaderboard: null,
  leaderboardStatus: "idle",
  error: null,
};

function errorMessage(err: unknown, fallback: string): string {
  return (
    (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ??
    fallback
  );
}

export const fetchMyReferralSummary = createAsyncThunk("referrals/fetchSummary", async () => {
  return referralsApi.fetchMyReferralSummary();
});

export const fetchReferralLeaderboard = createAsyncThunk("referrals/fetchLeaderboard", async () => {
  return referralsApi.fetchLeaderboard();
});

export const updateRewardPreference = createAsyncThunk(
  "referrals/updateRewardPreference",
  async (rewardType: ReferralRewardType, { rejectWithValue }) => {
    try {
      return await referralsApi.setRewardPreference(rewardType);
    } catch (err) {
      return rejectWithValue(errorMessage(err, "Could not update your reward preference"));
    }
  },
);

const referralsSlice = createSlice({
  name: "referrals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyReferralSummary.pending, (state) => {
        state.summaryStatus = "loading";
        state.error = null;
      })
      .addCase(fetchMyReferralSummary.fulfilled, (state, action) => {
        state.summaryStatus = "succeeded";
        state.summary = action.payload;
      })
      .addCase(fetchMyReferralSummary.rejected, (state) => {
        state.summaryStatus = "failed";
        state.error = "Could not load your referral dashboard";
      })
      .addCase(fetchReferralLeaderboard.pending, (state) => {
        state.leaderboardStatus = "loading";
      })
      .addCase(fetchReferralLeaderboard.fulfilled, (state, action) => {
        state.leaderboardStatus = "succeeded";
        state.leaderboard = action.payload;
      })
      .addCase(fetchReferralLeaderboard.rejected, (state) => {
        state.leaderboardStatus = "failed";
      })
      .addCase(updateRewardPreference.fulfilled, (state, action) => {
        if (state.summary) state.summary.rewardType = action.payload;
      })
      .addCase(updateRewardPreference.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Could not update your reward preference";
      });
  },
});

export default referralsSlice.reducer;
