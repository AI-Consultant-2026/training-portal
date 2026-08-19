import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "../../api/auth.api";
import { User } from "../../types/api";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  bootstrapped: boolean;
  error: string | null;
  passwordReset: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  emailVerification: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    resendStatus: "idle" | "loading" | "succeeded" | "failed";
  };
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  bootstrapped: false,
  error: null,
  passwordReset: {
    status: "idle",
    error: null,
  },
  emailVerification: {
    status: "idle",
    error: null,
    resendStatus: "idle",
  },
};

function extractErrorMessage(err: unknown): string {
  const error = (
    err as {
      response?: {
        data?: { error?: { message?: string; details?: { fieldErrors?: Record<string, string[]> } } };
      };
    }
  )?.response?.data?.error;
  // Zod validation failures come back as a generic "Validation failed" message plus a
  // details.fieldErrors map (see backend/src/middleware/errorHandler.ts) -- surface the
  // first actual field message (e.g. the password policy) instead of the generic one.
  const firstFieldError = Object.values(error?.details?.fieldErrors ?? {})[0]?.[0];
  return firstFieldError ?? error?.message ?? "Something went wrong. Please try again.";
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (input: authApi.RegisterInput, { rejectWithValue }) => {
    try {
      return await authApi.register(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (input: authApi.LoginInput, { rejectWithValue }) => {
    try {
      return await authApi.login(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const bootstrapAuth = createAsyncThunk("auth/bootstrap", async (_: void, { rejectWithValue }) => {
  try {
    return await authApi.refresh();
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (input: authApi.PasswordResetRequestInput, { rejectWithValue }) => {
    try {
      await authApi.requestPasswordReset(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const confirmPasswordReset = createAsyncThunk(
  "auth/confirmPasswordReset",
  async (input: authApi.PasswordResetConfirmInput, { rejectWithValue }) => {
    try {
      await authApi.confirmPasswordReset(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (input: authApi.VerifyEmailInput, { rejectWithValue }) => {
    try {
      await authApi.verifyEmail(input);
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (_: void, { rejectWithValue }) => {
    try {
      await authApi.resendVerification();
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    clearSession(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Login failed";
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.bootstrapped = true;
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.bootstrapped = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.passwordReset.status = "loading";
        state.passwordReset.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.passwordReset.status = "succeeded";
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.passwordReset.status = "failed";
        state.passwordReset.error = (action.payload as string) ?? "Something went wrong";
      })
      .addCase(confirmPasswordReset.pending, (state) => {
        state.passwordReset.status = "loading";
        state.passwordReset.error = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state) => {
        state.passwordReset.status = "succeeded";
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.passwordReset.status = "failed";
        state.passwordReset.error = (action.payload as string) ?? "Something went wrong";
      })
      .addCase(verifyEmail.pending, (state) => {
        state.emailVerification.status = "loading";
        state.emailVerification.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.emailVerification.status = "succeeded";
        // Best-effort UI sync for the common case (verifying in the same session/tab
        // that's logged in as this user) -- the server remains the source of truth
        // regardless, e.g. after a fresh login or in a different browser.
        if (state.user) {
          state.user.emailVerifiedAt = new Date().toISOString();
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.emailVerification.status = "failed";
        state.emailVerification.error = (action.payload as string) ?? "Something went wrong";
      })
      .addCase(resendVerification.pending, (state) => {
        state.emailVerification.resendStatus = "loading";
      })
      .addCase(resendVerification.fulfilled, (state) => {
        state.emailVerification.resendStatus = "succeeded";
      })
      .addCase(resendVerification.rejected, (state) => {
        state.emailVerification.resendStatus = "failed";
      });
  },
});

export const { setAccessToken, clearSession } = authSlice.actions;
export default authSlice.reducer;
