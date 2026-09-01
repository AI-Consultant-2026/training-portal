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

// Nigerian universities (federal, state and private), sorted alphabetically. Must match
// backend/src/validators/auth.validators.ts's UNIVERSITIES exactly -- the register
// request is rejected if the value isn't in that list.
export const UNIVERSITIES = [
  "Abdulkadir Kure University",
  "Abia State University",
  "Abiola Ajimobi Technical University",
  "Abubakar Tafawa Balewa University",
  "Achievers University",
  "Adamawa State University",
  "Adekunle Ajasin University",
  "Adeleke University",
  "Adeyemi Federal University of Education",
  "Admiralty University Ibusa",
  "Afe Babalola University",
  "African Aviation and Aerospace University",
  "African University of Science and Technology",
  "Ahmadu Bello University",
  "Ahman Pategi University",
  "Air Force Institute of Technology",
  "Ajayi Crowther University",
  "Akwa Ibom State University",
  "Al-Ansar University Maiduguri",
  "Al-Hikmah University",
  "Al-Qalam University",
  "Alex Ekwueme Federal University Ndufu Alike Ikwo",
  "Aliko Dangote University of Science and Technology",
  "Alvan Ikoku Federal University of Education",
  "Ambrose Alli University",
  "American University of Nigeria",
  "Anchor University",
  "Arthur Jarvis University",
  "Ave Maria University",
  "Babcock University",
  "Bauchi State University",
  "Bayelsa Medical University",
  "Bayero University",
  "Baze University",
  "Bells University of Technology",
  "Benson Idahosa University",
  "Benue State University",
  "Bingham University",
  "Borno State University",
  "Bowen University",
  "Caleb University",
  "Caritas University",
  "CETEP City University",
  "Chrisland University",
  "Christopher University",
  "Chukwuemeka Odumegwu Ojukwu University",
  "Clifford University",
  "Coal City University",
  "Covenant University",
  "Crawford University",
  "Crescent University",
  "Delta State University of Science and Technology",
  "Delta State University, Abraka",
  "Dennis Osadebay University",
  "Dominican University Ibadan",
  "Ebonyi State University",
  "Edo State University, Uzairue",
  "Edwin Clark University",
  "Ekiti State University",
  "Elizade University",
  "Emmanuel Ayande University of Education",
  "Enugu State University of Science and Technology",
  "Evangel University, Akaeze",
  "Federal University Birnin Kebbi",
  "Federal University Dutse",
  "Federal University Dutsin-Ma",
  "Federal University Gashua",
  "Federal University Gusau",
  "Federal University Kashere",
  "Federal University Lafia",
  "Federal University Lokoja",
  "Federal University of Agriculture Abeokuta",
  "Federal University of Agriculture Mubi",
  "Federal University of Agriculture Zuru",
  "Federal University of Applied Sciences Kachia",
  "Federal University of Education Pankshi",
  "Federal University of Education Zaria",
  "Federal University of Health Sciences Azare",
  "Federal University of Petroleum Resources Effurun",
  "Federal University of Technology Akure",
  "Federal University of Technology Ikot Abasi",
  "Federal University of Technology Minna",
  "Federal University of Technology Owerri",
  "Federal University of Transportation Daura",
  "Federal University Otuoke",
  "Federal University Oye-Ekiti",
  "Federal University Wukari",
  "Fountain University",
  "Godfrey Okoye University",
  "Gombe State University",
  "Gombe State University of Science and Technology",
  "Greenfield University",
  "Gregory University",
  "Hallmark University",
  "Hezekiah University",
  "Ibrahim Badamasi Babangida University",
  "Igbinedion University",
  "Ignatius Ajuru University of Education",
  "Imo State University",
  "James Hope University, Lagos",
  "Joseph Ayo Babalola University",
  "Joseph Sarwuan Tarka University",
  "Kaduna State University",
  "Kebbi State University of Science and Technology",
  "Khadija University",
  "Kings University",
  "Kingsley Ozumba Mbadiwe University",
  "Koladaisi University",
  "Kwara State University",
  "Kwararafa University",
  "Ladoke Akintola University of Technology",
  "Lagos State University",
  "Lagos State University of Education",
  "Lagos State University of Science and Technology",
  "Landmark University",
  "Lead City University",
  "Legacy University Okija",
  "Madonna University",
  "McPherson University",
  "Mewar University",
  "Michael and Cecilia Ibru University",
  "Michael Okpara University of Agriculture Umudike",
  "Modibbo Adama University Yola",
  "Mountain Top University",
  "Mudiame University",
  "Nasarawa State University",
  "National Open University of Nigeria",
  "Niger Delta University",
  "Nigeria Police Academy Wudil",
  "Nigerian Army University Biu",
  "Nigerian Defence Academy",
  "Nigerian Maritime University",
  "Nigerian University of Technology and Management",
  "Nile University of Nigeria",
  "Nnamdi Azikiwe University",
  "Nok University Kachia",
  "Novena University",
  "Obafemi Awolowo University",
  "Obong University",
  "Oduduwa University",
  "Olabisi Onabanjo University",
  "Olusegun Agagu University of Science and Technology",
  "Osun State University",
  "PAMO University of Medical Sciences",
  "Pan-Atlantic University",
  "Paul University",
  "Peaceland University",
  "Plateau State University",
  "Precious Cornerstone University",
  "Prince Abubakar Audu University",
  "Redeemer's University Nigeria",
  "Renaissance University",
  "Rhema University",
  "Ritman University",
  "Rivers State University",
  "Salem University",
  "Sam Maris University",
  "Samuel Adegboyega University",
  "Skyline University",
  "Sokoto State University",
  "Sule Lamido University",
  "Summit University",
  "Tai Solarin Federal University of Education",
  "Taraba State University",
  "Umaru Musa Yar'adua University",
  "University of Abuja",
  "University of Benin",
  "University of Calabar",
  "University of Cross River State",
  "University of Delta",
  "University of Ibadan",
  "University of Ilorin",
  "University of Jos",
  "University of Lagos",
  "University of Maiduguri",
  "University of Mkar",
  "University of Nigeria Nsukka",
  "University of Port Harcourt",
  "University of Uyo",
  "Usmanu Danfodiyo University",
  "Veritas University",
  "Wesley University",
  "Western Delta University",
  "Westland University",
  "Yobe State University",
  "Yusuf Maitama Sule Federal University of Education Kano",
  "Yusuf Maitama Sule University Kano",
  "Zamfara State University",
];

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
          label="Select University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          required
        >
          <option value="" disabled>
            Select University
          </option>
          {UNIVERSITIES.map((option) => (
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
