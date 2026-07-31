import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { requestPasswordReset } from "./authSlice";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth.passwordReset);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await dispatch(requestPasswordReset({ email }));
  }

  const submitted = status === "succeeded";

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Forgot password</h1>
      {submitted ? (
        <Alert variant="success" message="If that email exists, a reset link has been sent." />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" isLoading={status === "loading"}>
            Send reset link
          </Button>
        </form>
      )}
      <p className="mt-4 text-sm text-gray-600">
        <Link to="/login" className="text-blue-600 hover:underline">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
