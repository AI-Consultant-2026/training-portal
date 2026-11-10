import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  apiErrorMessage,
  fetchJoinInfo,
  JoinInfo,
  joinWithExistingAccount,
  joinWithNewAccount,
} from "../../api/corporate.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { sessionStarted } from "../auth/authSlice";

// /company/join/:code -- the staff sign-up link a company shares with its employees.
// Staff create their own login (or use the account they're logged in with) and choose
// the course(s) their company paid for; each course uses one of the company's seats.
export function CompanyJoinPage() {
  const { code = "" } = useParams<{ code: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState<JoinInfo | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", jobTitle: "", department: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchJoinInfo(code)
      .then((data) => {
        setInfo(data);
        // Every course with a seat left is ticked to start with.
        setSelected(new Set(data.courses.filter((c) => c.open).map((c) => c.courseId)));
      })
      .catch((err) => setLoadError(apiErrorMessage(err, "This staff sign-up link isn't working.")));
  }, [code]);

  function toggle(courseId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) next.delete(courseId);
      else next.add(courseId);
      return next;
    });
  }

  async function handleNew(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const result = await joinWithNewAccount(code, { ...form, courseIds: [...selected] });
      dispatch(sessionStarted(result));
      navigate("/dashboard");
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't create your login. Please try again."));
    } finally {
      setSaving(false);
    }
  }

  async function handleExisting() {
    setSaving(true);
    setError(null);
    try {
      await joinWithExistingAccount(code, [...selected]);
      navigate("/dashboard");
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't add the course to your account. Please try again."));
    } finally {
      setSaving(false);
    }
  }

  if (loadError) {
    return (
      <div className="mx-auto mt-16 max-w-md px-6">
        <h1 className="text-2xl font-semibold text-gray-900">Staff sign-up</h1>
        <div className="mt-4">
          <Alert message={loadError} />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Already set up your login?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const openCourses = info.courses.filter((c) => c.open);
  const coursePicker = (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-medium text-gray-700">Your course{info.courses.length > 1 ? "s" : ""}</legend>
      {info.courses.map((c) => (
        <label
          key={c.courseId}
          className={`flex items-start gap-3 rounded-md border p-3 text-sm ${c.open ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50 text-gray-400"}`}
        >
          <input
            type="checkbox"
            className="mt-0.5"
            disabled={!c.open}
            checked={selected.has(c.courseId)}
            onChange={() => toggle(c.courseId)}
          />
          <span>
            <span className="font-medium text-gray-900">{c.title}</span>
            {!c.open && <span className="block text-xs">No seats left. Ask your manager.</span>}
          </span>
        </label>
      ))}
    </fieldset>
  );

  return (
    <div className="mx-auto mt-12 max-w-md px-6 pb-16">
      <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Staff training</p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">{info.companyName}</h1>
      <p className="mt-2 text-sm text-gray-600">
        {info.companyName} has paid for your place. Create your login below to start straight away. You can come back
        and continue any time.
      </p>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      {openCourses.length === 0 ? (
        <div className="mt-6">
          <Alert message="All of your company's seats are taken at the moment. Please ask your manager to add more." />
        </div>
      ) : user ? (
        <div className="mt-6 flex flex-col gap-4">
          <p className="text-sm text-gray-700">
            You're logged in as <strong>{user.email}</strong>.
          </p>
          {coursePicker}
          <Button onClick={handleExisting} isLoading={saving} disabled={selected.size === 0}>
            Add to my account
          </Button>
          <p className="text-xs text-gray-500">
            Not you? Log out and open this link again to create your own login.
          </p>
        </div>
      ) : (
        <form onSubmit={handleNew} className="mt-6 flex flex-col gap-4">
          {coursePicker}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="firstName"
              label="First name"
              required
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <Input
              id="lastName"
              label="Last name"
              required
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <Input
            id="email"
            type="email"
            label={info.emailDomain ? `Work email (@${info.emailDomain})` : "Work email"}
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            id="password"
            type="password"
            label="Choose a password"
            required
            minLength={10}
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <p className="-mt-2 text-xs text-gray-500">At least 10 characters, with letters and numbers.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="jobTitle"
              label="Job title (optional)"
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            />
            <Input
              id="department"
              label="Department (optional)"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </div>
          <Button type="submit" isLoading={saving} disabled={selected.size === 0}>
            Create my login
          </Button>
          <p className="text-sm text-gray-600">
            Already have a Paleon Training login?{" "}
            <Link to={`/login?next=${encodeURIComponent(`/company/join/${code}`)}`} className="text-blue-600 hover:underline">
              Log in first
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
