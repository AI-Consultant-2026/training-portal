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
};

function extractErrorMessage(err: unknown): string {
  const message = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
    ?.message;
  return message ?? "Something went wrong. Please try again.";
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
      });
  },
});

export const { setAccessToken, clearSession } = authSlice.actions;
export default authSlice.reducer;
