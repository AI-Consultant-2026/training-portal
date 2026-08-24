import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { User } from "../../types/api";
import { EmailVerificationBanner } from "./EmailVerificationBanner";

const UNVERIFIED_STUDENT: User = {
  id: "1",
  email: "student@example.com",
  firstName: "Stu",
  lastName: "Dent",
  role: "student",
  status: "active",
  profileData: {},
  location: "Nigeria",
  courseInterest: null,
  university: null,
  emailVerifiedAt: null,
};

function renderBanner(route: string) {
  return renderWithProviders(<EmailVerificationBanner />, {
    route,
    preloadedState: {
      auth: {
        user: UNVERIFIED_STUDENT,
        accessToken: "token",
        status: "idle",
        bootstrapped: true,
        error: null,
        passwordReset: { status: "idle", error: null },
        emailVerification: { status: "idle", error: null, resendStatus: "idle" },
      },
    },
  });
}

describe("EmailVerificationBanner", () => {
  it("shows for an unverified student on an ordinary page", () => {
    renderBanner("/courses/cyber-security-fundamentals");
    expect(screen.getByText("Please verify your email to enroll in a course.")).toBeInTheDocument();
  });

  // Regression guard: a still-authenticated-but-unverified session (e.g. a signup that
  // never got redirected away from /login) shouldn't nag about verification above the
  // login form -- it reads as broken, not helpful, there.
  it("stays hidden on the login page", () => {
    renderBanner("/login");
    expect(screen.queryByText("Please verify your email to enroll in a course.")).not.toBeInTheDocument();
  });

  it("stays hidden on the register page", () => {
    renderBanner("/register");
    expect(screen.queryByText("Please verify your email to enroll in a course.")).not.toBeInTheDocument();
  });
});
