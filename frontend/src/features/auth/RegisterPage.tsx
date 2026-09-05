import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { validateReferralCode } from "../../api/referrals.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { registerUser } from "./authSlice";

export const LOCATIONS = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Nigeria",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// value = the real course slug, so a selection can both be saved as-is and used
// directly to redirect to /courses/<slug> after a successful signup.
export const COURSE_INTERESTS = [
  { slug: "cyber-security-fundamentals", label: "Cyber Security Fundamentals" },
  { slug: "social-media-management-content", label: "Social Media Management & Content" },
  { slug: "digital-marketing", label: "Digital Marketing" },
  { slug: "gis-and-drone-mapping", label: "GIS and Drone Mapping" },
  { slug: "renewable-energy-digital-systems", label: "Renewable Energy Digital Systems" },
  { slug: "hse-fundamentals", label: "HSE Fundamentals" },
];

// Must match backend/src/validators/auth.validators.ts's REGISTRATION_STATUSES exactly --
// the register request is rejected if the value isn't in that list.
export const REGISTRATION_STATUSES = ["Graduate", "Current Student", "Non-Graduate"];

export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState(searchParams.get("ref")?.trim().toUpperCase() ?? "");
  const [referralCheck, setReferralCheck] = useState<
    { state: "idle" | "checking" } | { state: "valid"; name: string | null } | { state: "invalid" }
  >({ state: "idle" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const code = referralCode.trim();
    if (!code) {
      setReferralCheck({ state: "idle" });
      return;
    }
    let cancelled = false;
    setReferralCheck({ state: "checking" });
    const timer = window.setTimeout(async () => {
      try {
        const result = await validateReferralCode(code);
        if (cancelled) return;
        setReferralCheck(
          result.valid ? { state: "valid", name: result.referrerName } : { state: "invalid" },
        );
      } catch {
        if (!cancelled) setReferralCheck({ state: "idle" });
      }
    }, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [referralCode]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      registerUser({
        email,
        password,
        firstName,
        lastName,
        location,
        university,
        courseInterest,
        referralCode: referralCode.trim() || undefined,
      }),
    );
    if (registerUser.fulfilled.match(result)) {
      // Send the student straight to the course they said they're interested in,
      // instead of the generic dashboard.
      navigate(`/courses/${courseInterest}`);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Create your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert message={error} />}
        <Input
          id="firstName"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          id="lastName"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
          minLength={10}
          pattern="(?=.*[A-Za-z])(?=.*\d).+"
          title="At least 10 characters, including letters and numbers"
        />
        <p className="-mt-2 text-xs text-gray-500">At least 10 characters, including letters and numbers.</p>
        <Select
          id="location"
          label="Select your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="" disabled>
            Select State
          </option>
          {LOCATIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Select
          id="university"
          label="Status"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          required
        >
          <option value="" disabled>
            Status
          </option>
          {REGISTRATION_STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Select
          id="courseInterest"
          label="Which course are you interested in?"
          value={courseInterest}
          onChange={(e) => setCourseInterest(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a course&hellip;
          </option>
          {COURSE_INTERESTS.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.label}
            </option>
          ))}
        </Select>
        <Input
          id="referralCode"
          label="Referral code (optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          placeholder="e.g. PLNAB7KMQ"
          autoCapitalize="characters"
        />
        {referralCheck.state === "checking" && (
          <p className="-mt-2 text-xs text-gray-500">Checking code&hellip;</p>
        )}
        {referralCheck.state === "valid" && (
          <p className="-mt-2 text-xs text-green-600">
            {referralCheck.name ? `Invited by ${referralCheck.name}. ` : "Code applied. "}
            You&apos;ll get a welcome bonus when you pay for your first course.
          </p>
        )}
        {referralCheck.state === "invalid" && (
          <p className="-mt-2 text-xs text-amber-600">
            We don&apos;t recognise that code — you can still sign up without it.
          </p>
        )}
        <Button type="submit" isLoading={status === "loading"}>
          Sign up
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
