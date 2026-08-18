import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { verifyEmail } from "./authSlice";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth.emailVerification);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail({ token }));
    }
  }, [dispatch, token]);

  if (!token) {
    return (
      <div className="mx-auto mt-16 max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Verify email</h1>
        <Alert message="This verification link is missing or invalid." />
      </div>
    );
  }

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="mx-auto mt-16 max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Verify email</h1>
        <Alert message={error ?? "This verification link is invalid or has expired."} />
        <p className="mt-4 text-sm text-gray-600">
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>{" "}
          and request a new link from your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Verify email</h1>
      <Alert variant="success" message="Your email has been verified." />
      <p className="mt-4 text-sm text-gray-600">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Go to your dashboard
        </Link>
      </p>
    </div>
  );
}
