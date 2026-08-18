import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { loginUser } from "./authSlice";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate(result.payload.user.role === "admin" ? "/admin" : "/dashboard");
    }
  }

  return (
    // bg-[#F7F4EC] matches --paper on the welcome page's courses section (#courses,
    // .section-paper), so this page and that one read as the same surface.
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="mx-auto max-w-sm pt-16">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <Alert message={error} />}
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
          <Button type="submit" isLoading={status === "loading"}>
            Log in
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <span className="cursor-not-allowed text-gray-400" aria-disabled="true">
            Sign up
          </span>
        </p>

        <div className="mt-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-lg font-semibold text-gray-900">New Intake Opening Soon 🎓🇳🇬</h2>
          <p className="mt-2 text-sm text-gray-700">
            Paleon Training is reopening its portal for new intakes on{" "}
            <strong>Monday, 14 September 2026</strong>!
          </p>
          <p className="mt-3 text-sm text-gray-700">
            If you&apos;re a Nigerian graduate looking to develop practical digital skills for career
            opportunities in the Oil &amp; Gas, Telecommunications, and Banking sectors, you&apos;ll
            have access to training in:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            <li>🔐 Cyber Security Fundamentals</li>
            <li>📱 Social Media Management &amp; Content</li>
            <li>📈 Digital Marketing</li>
            <li>🗺️ GIS &amp; Drone Mapping</li>
            <li>⚡ Renewable Energy Digital Systems</li>
          </ul>
          <p className="mt-3 text-sm text-gray-700">Want to preview a course before enrolling?</p>
          <p className="text-sm text-gray-700">Log in using our demo account:</p>
          <div className="mt-2 rounded-md bg-white p-3 text-sm text-gray-900">
            <p>
              Email: <span className="font-mono">demo@paleontraining.com</span>
            </p>
            <p>
              Password: <span className="font-mono">Demo1234</span>
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-700">
            Explore the platform, preview the courses and see what Paleon Training has to offer.
          </p>
          <p className="mt-3 text-sm font-medium text-gray-900">
            New intake opens Monday, 14 September 2026. 🚀
          </p>
          <p className="mt-1 text-sm text-gray-700">
            Start building the digital skills for your future.
          </p>
        </div>
      </div>
    </div>
  );
}
