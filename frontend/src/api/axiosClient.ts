import axios from "axios";
import type { AppDispatch, RootState } from "../app/store";
import { clearSession, setAccessToken } from "../features/auth/authSlice";

interface StoreLike {
  getState: () => RootState;
  dispatch: AppDispatch;
}

let attachedStore: StoreLike | null = null;

/** Called once from app/store.ts after the store is created, to break the store<->axiosClient import cycle. */
export function attachStore(store: StoreLike) {
  attachedStore = store;
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((requestConfig) => {
  const token = attachedStore?.getState().auth.accessToken;
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );
    const accessToken = res.data.accessToken as string;
    attachedStore?.dispatch(setAccessToken(accessToken));
    return accessToken;
  } catch {
    attachedStore?.dispatch(clearSession());
    return null;
  }
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      refreshPromise = refreshPromise ?? refreshAccessToken();
      const newToken = await refreshPromise;
      refreshPromise = null;

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
