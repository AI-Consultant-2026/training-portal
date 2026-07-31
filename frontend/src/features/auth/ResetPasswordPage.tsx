import { FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { confirmPasswordReset } from "./authSlice";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth.passwordReset);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    await dispatch(confirmPasswordReset({ token, password }));
  }

  if (!token) {
    return (
      <div className="mx-auto mt-16 max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Reset password</h1>
        <Alert message="This reset link is missing or invalid." />
        <p className="mt-4 text-sm text-gray-600">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Request a new link
          </Link>
        </p>
      </div>
    );
  }

  if (status === "succeeded") {
    return (
      <div className="mx-auto mt-16 max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Reset password</h1>
        <Alert variant="success" message="Your password has been updated." />
        <p className="mt-4 text-sm text-gray-600">
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Reset password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert message={error} />}
        <Input
          id="password"
          label="New password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Button type="submit" isLoading={status === "loading"}>
          Set new password
        </Button>
      </form>
    </div>
  );
}
