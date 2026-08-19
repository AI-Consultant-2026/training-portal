import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resendVerification } from "../../features/auth/authSlice";

export function EmailVerificationBanner() {
  const dispatch = useAppDispatch();
  const { user, emailVerification } = useAppSelector((state) => state.auth);

  // Only students are ever blocked by this (see enrollments.controller.ts) -- admins add
  // enrollments through a separate path that bypasses the check entirely, and instructors
  // don't enroll at all, so the banner would be actively misleading for either role.
  if (!user || user.emailVerifiedAt || user.role !== "student") {
    return null;
  }

  const { resendStatus } = emailVerification;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
      {resendStatus === "succeeded" ? (
        <span>New verification link sent &mdash; check your inbox.</span>
      ) : (
        <>
          <span>Please verify your email to enroll in a course.</span>
          <button
            type="button"
            onClick={() => dispatch(resendVerification())}
            disabled={resendStatus === "loading"}
            className="font-medium underline hover:no-underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            {resendStatus === "loading" ? "Sending…" : "Resend email"}
          </button>
        </>
      )}
    </div>
  );
}
