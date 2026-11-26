import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { HumanCheckField, useHumanCheck } from "../../components/HumanCheck";
import { requestPasswordReset } from "./authSlice";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth.passwordReset);
  const hc = useHumanCheck();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(requestPasswordReset({ email, ...hc.fields() }));
    if (requestPasswordReset.rejected.match(result)) hc.reload();
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
          <HumanCheckField hc={hc} />
          {status === "failed" && error && <Alert variant="error" message={error} />}
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
