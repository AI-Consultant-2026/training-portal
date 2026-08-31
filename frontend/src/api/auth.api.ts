import { User } from "../types/api";
import { axiosClient } from "./axiosClient";

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  courseInterest: string;
  university: string;
  referralCode?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PasswordResetRequestInput {
  email: string;
}

export interface PasswordResetConfirmInput {
  token: string;
  password: string;
}

export interface VerifyEmailInput {
  token: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const res = await axiosClient.post<AuthResponse>("/auth/register", input);
  return res.data;
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  const res = await axiosClient.post<AuthResponse>("/auth/login", input);
  return res.data;
}

export async function refresh(): Promise<AuthResponse> {
  const res = await axiosClient.post<AuthResponse>("/auth/refresh");
  return res.data;
}

export async function logout(): Promise<void> {
  await axiosClient.post("/auth/logout");
}

export async function requestPasswordReset(input: PasswordResetRequestInput): Promise<void> {
  await axiosClient.post("/auth/password-reset", input);
}

export async function confirmPasswordReset(input: PasswordResetConfirmInput): Promise<void> {
  await axiosClient.post("/auth/password-reset/confirm", input);
}

export async function verifyEmail(input: VerifyEmailInput): Promise<void> {
  await axiosClient.post("/auth/verify-email", input);
}

export async function resendVerification(): Promise<void> {
  await axiosClient.post("/auth/resend-verification");
}
