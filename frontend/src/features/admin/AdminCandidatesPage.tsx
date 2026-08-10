import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COURSE_INTERESTS, LOCATIONS } from "../auth/RegisterPage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Spinner } from "../../components/ui/Spinner";
import { addCandidate, confirmPayment, deleteCandidate, fetchCandidates } from "./adminSlice";

function formatLastActive(lastActiveAt: string | null): string {
  if (!lastActiveAt) return "Never";
  const minutes = Math.round((Date.now() - new Date(lastActiveAt).getTime()) / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function AdminCandidatesPage() {
  const dispatch = useAppDispatch();
  const { candidates, candidatesStatus, candidatesError } = useAppSelector((state) => state.admin);
  const [showAddForm, setShowAddForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Nigeria");
  const [courseInterest, setCourseInterest] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  async function handleAddCandidate(e: FormEvent) {
    e.preventDefault();
    setAdding(true);
    const result = await dispatch(
      addCandidate({ firstName, lastName, email, location, courseInterest: courseInterest || undefined }),
    );
    setAdding(false);
    if (addCandidate.fulfilled.match(result)) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setCourseInterest("");
      setShowAddForm(false);
    }
  }

  function handleDeactivate(id: string, name: string) {
    if (!window.confirm(`Deactivate ${name}? They will no longer be able to log in.`)) return;
    dispatch(deleteCandidate(id));
  }

  function handleTogglePayment(enrollmentId: string, paymentConfirmed: boolean) {
    dispatch(confirmPayment({ enrollmentId, paymentConfirmed }));
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        ← Admin dashboard
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
        <Button variant="secondary" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? "Cancel" : "Add candidate"}
        </Button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddCandidate}
          className="mt-4 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end"
        >
          <Input
            id="candidateFirstName"
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            id="candidateLastName"
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            id="candidateEmail"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Select
            id="candidateLocation"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {LOCATIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            id="candidateCourse"
            label="Course interest"
            value={courseInterest}
            onChange={(e) => setCourseInterest(e.target.value)}
          >
            <option value="">None</option>
            {COURSE_INTERESTS.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.label}
              </option>
            ))}
          </Select>
          <Button type="submit" isLoading={adding}>
            Add & send invite
          </Button>
        </form>
      )}
      {candidatesError && (
        <div className="mt-4">
          <Alert message={candidatesError} />
        </div>
      )}

      {candidatesStatus === "loading" && candidates.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Candidate</th>
                <th className="px-4 py-2">Online</th>
                <th className="px-4 py-2">Enrollment / payment</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 align-top last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="text-gray-500">{c.email}</p>
                    <p className="text-xs text-gray-400">{c.location}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${c.online ? "bg-green-500" : "bg-gray-300"}`}
                      title={c.online ? "Online now" : "Offline"}
                    />
                    <span className="ml-2 text-xs text-gray-500">{formatLastActive(c.lastActiveAt)}</span>
                  </td>
                  <td className="px-4 py-3">
                    {c.enrollments.length === 0 ? (
                      <span className="text-gray-400">Not enrolled</span>
                    ) : (
                      <ul className="flex flex-col gap-1.5">
                        {c.enrollments.map((e) => (
                          <li key={e.id}>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-1.5">
                                <input
                                  type="checkbox"
                                  checked={e.paymentConfirmed}
                                  onChange={(ev) => handleTogglePayment(e.id, ev.target.checked)}
                                />
                                <span className="text-gray-700">{e.courseTitle ?? "Unknown course"}</span>
                              </label>
                              <span
                                className={`text-xs ${e.paymentConfirmed ? "text-green-700" : "text-amber-600"}`}
                              >
                                {e.paymentConfirmed ? "Paid" : "Payment pending"}
                              </span>
                            </div>
                            {!e.paymentConfirmed && e.latestPayment?.method === "bank_transfer" && (
                              <p className="ml-5 text-xs text-gray-500">
                                Bank transfer claimed: {e.latestPayment.currency}{" "}
                                {e.latestPayment.amount.toLocaleString()}, ref{" "}
                                <span className="font-mono">{e.latestPayment.gatewayReference}</span> &mdash; verify
                                against your bank account before confirming.
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.status}</td>
                  <td className="px-4 py-3 text-right">
                    {c.status === "active" && (
                      <button
                        type="button"
                        onClick={() => handleDeactivate(c.id, `${c.firstName} ${c.lastName}`)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {candidates.length === 0 && candidatesStatus === "succeeded" && (
            <p className="px-4 py-6 text-center text-sm text-gray-500">No candidates yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
