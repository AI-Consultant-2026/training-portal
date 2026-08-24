import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { User } from "../../types/api";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";

// ProtectedRoute pings this on every render once a user is present -- stub it out so
// tests don't make a real network call and don't need to wait out the 60s interval.
vi.mock("../../api/users.api", () => ({ sendHeartbeat: vi.fn().mockResolvedValue(undefined) }));

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
  university: null,
  emailVerifiedAt: "2026-01-01T00:00:00.000Z",
};

function renderProtected(authState: { user: User | null; bootstrapped: boolean }) {
  return renderWithProviders(
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<div>Protected dashboard content</div>} />
      </Route>
      <Route path="/login" element={<div>Login page</div>} />
    </Routes>,
    {
      route: "/dashboard",
      preloadedState: {
        auth: {
          user: authState.user,
          accessToken: authState.user ? "token" : null,
          status: "idle",
          bootstrapped: authState.bootstrapped,
          error: null,
          passwordReset: { status: "idle", error: null },
          emailVerification: { status: "idle", error: null, resendStatus: "idle" },
        },
      },
    },
  );
}

describe("ProtectedRoute", () => {
  it("shows a spinner instead of the route while auth hasn't bootstrapped yet", () => {
    renderProtected({ user: null, bootstrapped: false });
    expect(screen.queryByText("Protected dashboard content")).not.toBeInTheDocument();
    expect(screen.queryByText("Login page")).not.toBeInTheDocument();
  });

  it("redirects a signed-out user to /login once bootstrapped", () => {
    renderProtected({ user: null, bootstrapped: true });
    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("renders the protected route for a signed-in user", () => {
    renderProtected({ user: STUDENT, bootstrapped: true });
    expect(screen.getByText("Protected dashboard content")).toBeInTheDocument();
  });
});

describe("RoleRoute", () => {
  function renderRoleGated(user: User | null, allowedRoles: User["role"][]) {
    return renderWithProviders(
      <Routes>
        <Route element={<RoleRoute allowedRoles={allowedRoles} />}>
          <Route path="/admin" element={<div>Admin-only content</div>} />
        </Route>
        <Route path="/dashboard" element={<div>Dashboard fallback</div>} />
      </Routes>,
      {
        route: "/admin",
        preloadedState: {
          auth: {
            user,
            accessToken: user ? "token" : null,
            status: "idle",
            bootstrapped: true,
            error: null,
            passwordReset: { status: "idle", error: null },
            emailVerification: { status: "idle", error: null, resendStatus: "idle" },
          },
        },
      },
    );
  }

  it("redirects to /dashboard when the user's role isn't allowed", () => {
    renderRoleGated(STUDENT, ["admin"]);
    expect(screen.getByText("Dashboard fallback")).toBeInTheDocument();
    expect(screen.queryByText("Admin-only content")).not.toBeInTheDocument();
  });

  it("renders the route when the user's role is allowed", () => {
    renderRoleGated({ ...STUDENT, role: "admin" }, ["admin"]);
    expect(screen.getByText("Admin-only content")).toBeInTheDocument();
  });
});
