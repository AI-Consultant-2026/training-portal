import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as emailCampaignsApi from "../../api/emailCampaigns.api";
import { EmailCampaign, EmailPreview } from "../../types/api";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

function errorMessageFrom(err: unknown, fallback: string): string {
  const message = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data
    ?.error?.message;
  return message ?? fallback;
}

export interface EmailCampaignState {
  current: EmailCampaign | null;
  currentStatus: RequestStatus;
  currentError: string | null;
  uploadStatus: RequestStatus;
  uploadError: string | null;
  testEmailStatus: RequestStatus;
  testEmailError: string | null;
  sendStatus: RequestStatus;
  sendError: string | null;
  preview: EmailPreview | null;
  previewStatus: RequestStatus;
  history: EmailCampaign[];
  historyStatus: RequestStatus;
}

const initialState: EmailCampaignState = {
  current: null,
  currentStatus: "idle",
  currentError: null,
  uploadStatus: "idle",
  uploadError: null,
  testEmailStatus: "idle",
  testEmailError: null,
  sendStatus: "idle",
  sendError: null,
  preview: null,
  previewStatus: "idle",
  history: [],
  historyStatus: "idle",
};

export const uploadCampaignFile = createAsyncThunk(
  "emailCampaigns/upload",
  async (file: File, { rejectWithValue }) => {
    try {
      const summary = await emailCampaignsApi.uploadCampaign(file);
      const campaign = await emailCampaignsApi.fetchCampaign(summary.campaignId);
      return campaign;
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not import this spreadsheet"));
    }
  },
);

export const fetchCampaign = createAsyncThunk(
  "emailCampaigns/fetchOne",
  async (id: string, { rejectWithValue }) => {
    try {
      return await emailCampaignsApi.fetchCampaign(id);
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not load this campaign"));
    }
  },
);

export const updateCampaign = createAsyncThunk(
  "emailCampaigns/update",
  async (
    { id, input }: { id: string; input: emailCampaignsApi.UpdateCampaignInput },
    { rejectWithValue },
  ) => {
    try {
      return await emailCampaignsApi.updateCampaign(id, input);
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not save your changes"));
    }
  },
);

export const toggleRecipientSelected = createAsyncThunk(
  "emailCampaigns/toggleRecipient",
  async (
    { campaignId, recipientId, isSelected }: { campaignId: string; recipientId: string; isSelected: boolean },
    { rejectWithValue },
  ) => {
    try {
      const recipient = await emailCampaignsApi.setRecipientSelected(campaignId, recipientId, isSelected);
      return recipient;
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not update this recipient"));
    }
  },
);

export const removeRecipient = createAsyncThunk(
  "emailCampaigns/removeRecipient",
  async (
    { campaignId, recipientId }: { campaignId: string; recipientId: string },
    { rejectWithValue },
  ) => {
    try {
      await emailCampaignsApi.removeRecipient(campaignId, recipientId);
      return recipientId;
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not remove this recipient"));
    }
  },
);

export const previewRecipient = createAsyncThunk(
  "emailCampaigns/previewRecipient",
  async (
    { campaignId, recipientId }: { campaignId: string; recipientId: string },
    { rejectWithValue },
  ) => {
    try {
      return await emailCampaignsApi.previewRecipient(campaignId, recipientId);
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not build a preview for this recipient"));
    }
  },
);

export const sendTestEmail = createAsyncThunk(
  "emailCampaigns/sendTestEmail",
  async (
    { campaignId, testEmail, sampleRecipientId }: { campaignId: string; testEmail: string; sampleRecipientId?: string },
    { rejectWithValue },
  ) => {
    try {
      await emailCampaignsApi.sendTestEmail(campaignId, testEmail, sampleRecipientId);
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not send the test email"));
    }
  },
);

export const confirmSend = createAsyncThunk(
  "emailCampaigns/confirmSend",
  async (campaignId: string, { rejectWithValue }) => {
    try {
      await emailCampaignsApi.confirmSend(campaignId);
      return await emailCampaignsApi.fetchCampaign(campaignId);
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not start sending this campaign"));
    }
  },
);

export const deleteCampaign = createAsyncThunk(
  "emailCampaigns/delete",
  async (campaignId: string, { rejectWithValue }) => {
    try {
      await emailCampaignsApi.deleteCampaign(campaignId);
      return campaignId;
    } catch (err: unknown) {
      return rejectWithValue(errorMessageFrom(err, "Could not delete this campaign"));
    }
  },
);

export const fetchCampaignHistory = createAsyncThunk("emailCampaigns/fetchHistory", async () => {
  return emailCampaignsApi.fetchCampaigns();
});

const emailCampaignSlice = createSlice({
  name: "emailCampaigns",
  initialState,
  reducers: {
    clearCurrentCampaign(state) {
      state.current = null;
      state.currentStatus = "idle";
      state.currentError = null;
      state.preview = null;
    },
    clearPreview(state) {
      state.preview = null;
      state.previewStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCampaignFile.pending, (state) => {
        state.uploadStatus = "loading";
        state.uploadError = null;
      })
      .addCase(uploadCampaignFile.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.current = action.payload;
        state.currentStatus = "succeeded";
      })
      .addCase(uploadCampaignFile.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.uploadError = (action.payload as string) ?? "Could not import this spreadsheet";
      })
      .addCase(fetchCampaign.pending, (state) => {
        state.currentStatus = "loading";
      })
      .addCase(fetchCampaign.fulfilled, (state, action) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchCampaign.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.currentError = (action.payload as string) ?? "Could not load this campaign";
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        // Merge, don't replace: PATCH /admin/email-campaigns/:id returns the campaign
        // without its recipients association loaded, so a wholesale replace here would
        // wipe out the recipient list already in state (and everything derived from it
        // downstream -- Preview/Test/Send all read state.current.recipients).
        if (state.current) {
          Object.assign(state.current, action.payload);
        } else {
          state.current = action.payload;
        }
        state.currentError = null;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.currentError = (action.payload as string) ?? "Could not save your changes";
      })
      .addCase(toggleRecipientSelected.fulfilled, (state, action) => {
        if (!state.current?.recipients) return;
        const index = state.current.recipients.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.current.recipients[index] = action.payload;
      })
      .addCase(toggleRecipientSelected.rejected, (state, action) => {
        state.currentError = (action.payload as string) ?? "Could not update this recipient";
      })
      .addCase(removeRecipient.fulfilled, (state, action) => {
        if (!state.current?.recipients) return;
        state.current.recipients = state.current.recipients.filter((r) => r.id !== action.payload);
        state.current.totalRecipients -= 1;
      })
      .addCase(removeRecipient.rejected, (state, action) => {
        state.currentError = (action.payload as string) ?? "Could not remove this recipient";
      })
      .addCase(previewRecipient.pending, (state) => {
        state.previewStatus = "loading";
      })
      .addCase(previewRecipient.fulfilled, (state, action) => {
        state.previewStatus = "succeeded";
        state.preview = action.payload;
      })
      .addCase(previewRecipient.rejected, (state, action) => {
        state.previewStatus = "failed";
        state.currentError = (action.payload as string) ?? "Could not build a preview for this recipient";
      })
      .addCase(sendTestEmail.pending, (state) => {
        state.testEmailStatus = "loading";
        state.testEmailError = null;
      })
      .addCase(sendTestEmail.fulfilled, (state) => {
        state.testEmailStatus = "succeeded";
      })
      .addCase(sendTestEmail.rejected, (state, action) => {
        state.testEmailStatus = "failed";
        state.testEmailError = (action.payload as string) ?? "Could not send the test email";
      })
      .addCase(confirmSend.pending, (state) => {
        state.sendStatus = "loading";
        state.sendError = null;
      })
      .addCase(confirmSend.fulfilled, (state, action) => {
        state.sendStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(confirmSend.rejected, (state, action) => {
        state.sendStatus = "failed";
        state.sendError = (action.payload as string) ?? "Could not start sending this campaign";
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.history = state.history.filter((c) => c.id !== action.payload);
        if (state.current?.id === action.payload) {
          state.current = null;
          state.currentStatus = "idle";
          state.preview = null;
        }
      })
      .addCase(fetchCampaignHistory.pending, (state) => {
        state.historyStatus = "loading";
      })
      .addCase(fetchCampaignHistory.fulfilled, (state, action) => {
        state.historyStatus = "succeeded";
        state.history = action.payload;
      })
      .addCase(fetchCampaignHistory.rejected, (state) => {
        state.historyStatus = "failed";
      });
  },
});

export const { clearCurrentCampaign, clearPreview } = emailCampaignSlice.actions;
export default emailCampaignSlice.reducer;
