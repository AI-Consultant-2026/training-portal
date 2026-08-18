import { fireEvent, screen, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import * as authApi from "../../api/auth.api";
import { renderWithProviders } from "../../test/test-utils";
import { User } from "../../types/api";
import { LoginPage } from "./LoginPage";

vi.mock("../../api/auth.api");

const STUDENT: User = {
  id: "1",
  email: "student@example.com",
  firstName: "Stu",
  lastName: "Dent",
  role: "student",
  status: "active",
  profileData: {},
  location: "Nigeria",
  courseInterest: null,
  emailVerifiedAt: "2026-01-01T00:00:00.000Z",
};

function renderLoginPage() {
  return renderWithProviders(
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<div>Student dashboard</div>} />
      <Route path="/admin" element={<div>Admin dashboard</div>} />
      <Route path="/register" element={<div>Register page</div>} />
    </Routes>,
    { route: "/login" },
  );
}

describe("LoginPage", () => {
  it("has a working sign-up link to /register", () => {
    // Regression guard: this link was previously disabled site-wide pending the new
    // intake, then re-enabled -- this test is what should catch it if that regresses.
    renderLoginPage();
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute("href", "/register");
  });

  it("logs a student in and navigates to the dashboard", async () => {
    vi.mocked(authApi.login).mockResolvedValue({ user: STUDENT, accessToken: "token" });

    renderLoginPage();
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: STUDENT.email } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => expect(screen.getByText("Student dashboard")).toBeInTheDocument());
    expect(authApi.login).toHaveBeenCalledWith({ email: STUDENT.email, password: "password123" });
  });

  it("sends an admin to /admin instead of /dashboard", async () => {
    vi.mocked(authApi.login).mockResolvedValue({
      user: { ...STUDENT, id: "2", role: "admin" },
      accessToken: "token",
    });

    renderLoginPage();
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "admin@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => expect(screen.getByText("Admin dashboard")).toBeInTheDocument());
  });

  it("shows the server's error message on failed login instead of navigating", async () => {
    vi.mocked(authApi.login).mockRejectedValue({
      response: { data: { error: { message: "Invalid email or password" } } },
    });

    renderLoginPage();
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "bad" } });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => expect(screen.getByText("Invalid email or password")).toBeInTheDocument());
    expect(screen.queryByText("Student dashboard")).not.toBeInTheDocument();
  });
});
