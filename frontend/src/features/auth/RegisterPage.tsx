import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { registerUser } from "./authSlice";

export const LOCATIONS = [
  "Nigeria",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "China",
  "India",
  "France",
  "Japan",
  "Brazil",
  "Russia",
  "Other Country",
];

// value = the real course slug, so a selection can both be saved as-is and used
// directly to redirect to /courses/<slug> after a successful signup.
export const COURSE_INTERESTS = [
  { slug: "cyber-security-fundamentals", label: "Cyber Security Fundamentals" },
  { slug: "social-media-management-content", label: "Social Media Management & Content" },
  { slug: "digital-marketing", label: "Digital Marketing" },
  { slug: "gis-and-drone-mapping", label: "GIS and Drone Mapping" },
  { slug: "renewable-energy-digital-systems", label: "Renewable Energy Digital Systems" },
];

export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Nigeria");
  const [courseInterest, setCourseInterest] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(
      registerUser({ email, password, firstName, lastName, location, courseInterest }),
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
          {LOCATIONS.map((option) => (
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
