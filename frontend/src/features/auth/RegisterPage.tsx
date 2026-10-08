import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { validateReferralCode } from "../../api/referrals.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { registerUser } from "./authSlice";
import { track } from "../../lib/analytics";

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

// Archived from the public catalog (migration 20260920010000). They stay in
// COURSE_INTERESTS above because the admin candidate filter and partner pipeline still
// need to label existing records that chose them, and the backend enum still accepts
// them -- but new signups aren't offered them.
const ARCHIVED_COURSE_SLUGS = ["social-media-management-content", "renewable-energy-digital-systems"];
export const REGISTRATION_COURSE_INTERESTS = COURSE_INTERESTS.filter(
  (course) => !ARCHIVED_COURSE_SLUGS.includes(course.slug),
);

// Must match backend/src/validators/auth.validators.ts's REGISTRATION_STATUSES exactly --
// the register request is rejected if the value isn't in that list.
export const REGISTRATION_STATUSES = ["Graduate", "Current Student", "Non-Graduate"];

// Values are VTpass's network names (backend/src/constants/vtpass.ts), so the admin payout
// dialog can use the student's choice directly. 9mobile is still "etisalat" there (the VTU.ng
// client maps it to "9mobile").
export const MOBILE_NETWORKS = [
  { value: "mtn", label: "MTN" },
  { value: "airtel", label: "Airtel" },
  { value: "glo", label: "Glo" },
  { value: "etisalat", label: "9Mobile" },
];

// Same photos as the /zoom-attendees page (served by the backend from marketing/images).
const SECTORS = [
  {
    label: "Oil & Gas",
    image: "/images/zoom-attendees/oilgas.jpg",
    alt: "A young Nigerian engineer in orange coveralls and hard hat with a tablet at an oil and gas facility",
    text: "Operators need people who understand site safety, mapping and the security of their systems.",
    courses: "HSE Fundamentals · GIS & Drone Mapping · Cyber Security",
  },
  {
    label: "Telecoms",
    image: "/images/zoom-attendees/telecoms.jpg",
    alt: "A Nigerian telecoms technician on a mast above Lagos while a colleague checks a laptop",
    text: "Telcos plan sites with location data, defend their networks and grow customers online.",
    courses: "GIS & Drone Mapping · Cyber Security · Digital Marketing",
  },
  {
    label: "Banking",
    image: "/images/zoom-attendees/banking.jpg",
    alt: "Young Nigerian banking professionals reviewing a mobile banking dashboard in a Lagos office",
    text: "Nigerian banks and fintechs need people who can secure digital channels and market them well.",
    courses: "Cyber Security · Digital Marketing",
  },
];

export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState(REGISTRATION_STATUSES[0]);
  const [searchParams] = useSearchParams();
  // Pre-selected when arriving from a course's free preview (/register?course=<slug>).
  const [courseInterest, setCourseInterest] = useState(() => {
    const fromLink = searchParams.get("course") ?? "";
    return REGISTRATION_COURSE_INTERESTS.some((c) => c.slug === fromLink) ? fromLink : "";
  });
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
        phone: phone.trim(),
        mobileNetwork,
      }),
    );
    if (registerUser.fulfilled.match(result)) {
      track("sign_up", { method: "email", referred: Boolean(referralCode.trim()), course_interest: courseInterest });
      // Send the student straight to the course they said they're interested in,
      // instead of the generic dashboard.
      navigate(`/courses/${courseInterest}`);
    }
  }

  const fieldClass = "[&_input]:bg-white [&_select]:bg-white";

  return (
    <div className="bg-[#F7F4EC]">
      {/* Nigerian flag ribbon */}
      <div className="flex h-2" aria-hidden="true">
        <span className="flex-1 bg-[#008751]" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-[#008751]" />
      </div>

      <section className="relative bg-[#006B40] text-white lg:bg-[url('/images/zoom-attendees/nigerian-students-flag.jpg')] lg:bg-cover lg:bg-[center_18%]">
        {/* Phones and tablets: the students-and-flag photo as a clear band above the text */}
        <div
          className="h-56 border-b-[6px] border-white bg-[url('/images/zoom-attendees/nigerian-students-flag.jpg')] bg-cover bg-[center_20%] sm:h-72 lg:hidden"
          role="img"
          aria-label="Nigerian students and graduates on campus under the Nigerian flag"
        />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,55,32,.88) 0%, rgba(0,70,42,.62) 34%, rgba(0,70,42,.08) 58%, rgba(16,21,31,.1) 100%), linear-gradient(0deg, rgba(16,21,31,.45) 0%, rgba(16,21,31,0) 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12 lg:py-16">
          <div className="lg:[text-shadow:0_1px_12px_rgba(0,30,18,.55)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em]">
              <span className="flex h-3.5 w-6 overflow-hidden rounded-sm ring-1 ring-white/60" aria-hidden="true">
                <span className="flex-1 bg-[#008751]" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-[#008751]" />
              </span>
              Built for Nigerians
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Create your account. <span className="text-[#FFD9B8]">Build skills employers can verify.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[#E9F2EC]">
              Practical, job-ready digital skills for Nigerian graduates, final year students and corps members preparing
              for careers in Oil &amp; Gas, Banking and Telecoms. Learn online from anywhere in Nigeria.
            </p>
            <ul className="mt-5 grid gap-2.5">
              {[
                "Free first lesson in every course, no payment needed to sign up",
                "Self-paced courses of 8 to 18 days, with lifetime access",
                "A real capstone project and a certificate you can show employers",
                "Earn airtime or data for every friend who joins and pays",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15.5px] text-[#F2F7F3]">
                  <span
                    className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-white text-xs font-extrabold text-[#006B40] [text-shadow:none]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#F7F4EC] text-gray-900 shadow-2xl">
            <div className="flex items-center justify-between gap-3 bg-[#008751] px-6 py-4 text-white">
              <div>
                <h2 className="font-serif text-2xl font-bold leading-tight">Create your account</h2>
                <p className="text-sm text-white/90">Takes about 2 minutes</p>
              </div>
              <span className="flex h-5 w-8 overflow-hidden rounded-sm ring-1 ring-white/60" aria-hidden="true">
                <span className="flex-1 bg-[#008751]" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-[#008751]" />
              </span>
            </div>

            {referralCheck.state === "valid" && (
              <div className="border-b border-[#BFE3CF] bg-[#E6F4EC] px-6 py-3 text-sm text-[#006B40]">
                🎁 {referralCheck.name ? `${referralCheck.name} invited you. ` : "Referral code applied. "}
                You&apos;ll get a welcome reward in airtime when you pay for your first course.
              </div>
            )}

            <form onSubmit={handleSubmit} className={`flex flex-col gap-4 px-6 pb-6 pt-5 ${fieldClass}`}>
              {error && <Alert message={error} />}
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="firstName"
                  label="First name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  id="lastName"
                  label="Last name"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <Input
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="phone"
                  label="Phone number"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0803 123 4567"
                  required
                />
                <Select
                  id="mobileNetwork"
                  label="Mobile network"
                  value={mobileNetwork}
                  onChange={(e) => setMobileNetwork(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Choose network&hellip;
                  </option>
                  {MOBILE_NETWORKS.map((network) => (
                    <option key={network.value} value={network.value}>
                      {network.label}
                    </option>
                  ))}
                </Select>
              </div>
              <p className="-mt-2 text-xs text-gray-500">We use this to send any airtime or data rewards you earn.</p>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={10}
                    pattern="(?=.*[A-Za-z])(?=.*\d).+"
                    title="At least 10 characters, including letters and numbers"
                    className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-16 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-[#006B40] hover:underline"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <p className="-mt-2 text-xs text-gray-500">At least 10 characters, including letters and numbers.</p>
              <div className="grid gap-4 sm:grid-cols-2">
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
                  {REGISTRATION_STATUSES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
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
                {REGISTRATION_COURSE_INTERESTS.map((course) => (
                  <option key={course.slug} value={course.slug}>
                    {course.label}
                  </option>
                ))}
              </Select>
              <p className="-mt-2 text-xs text-gray-500">
                Not sure?{" "}
                <a href="/welcome#career-match" className="font-medium text-[#006B40] hover:underline">
                  Take the free 2-minute Career Match
                </a>
                .
              </p>
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
              <Button
                type="submit"
                isLoading={status === "loading"}
                className="!bg-[#E8863C] py-3 text-base font-extrabold !text-[#10151F] hover:!bg-[#C96A26] hover:!text-white"
              >
                Create my free account
              </Button>
              <p className="text-xs text-gray-500">
                Creating an account is free. You only pay (securely, through Paystack) when you choose to unlock a
                full course. By signing up you agree to our{" "}
                <a href="/terms" className="text-[#006B40] underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#006B40] underline">
                  Privacy Policy
                </a>{" "}
                (NDPA 2023).
              </p>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-[#006B40] hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#006B40]">Where Nigerian graduates are being hired</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900">Skills for oil &amp; gas, telecoms and banking</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {SECTORS.map((sector) => (
            <article key={sector.label} className="overflow-hidden rounded-xl border border-[#DED7C4] bg-white">
              <div
                className="relative aspect-[16/10] bg-cover bg-center"
                style={{ backgroundImage: `url(${sector.image})` }}
                role="img"
                aria-label={sector.alt}
              >
                <span className="absolute bottom-3 left-3 rounded-md bg-[#10151F] px-2.5 py-1 text-sm font-semibold text-white">
                  {sector.label}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[15px] text-gray-600">{sector.text}</p>
                <p className="mt-2 text-sm font-semibold text-[#006B40]">{sector.courses}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
