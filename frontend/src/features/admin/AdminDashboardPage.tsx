import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Spinner } from "../../components/ui/Spinner";
import { StatTile } from "../../components/ui/StatTile";
import { Lead } from "../../types/api";
import {
  closeCoursePayments,
  deleteLead,
  fetchAdminStats,
  fetchCoursePayments,
  fetchLeads,
} from "./adminSlice";

function formatNumberOrDash(value: number | null): string {
  return value === null ? "—" : String(value);
}

function toCsvField(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function leadsToCsv(leads: Lead[]): string {
  const header = ["Name", "Email", "Phone", "Course", "University", "Source", "Submitted"]
    .map(toCsvField)
    .join(",");
  const rows = leads.map((lead) =>
    [
      lead.name,
      lead.email,
      lead.phone ?? "",
      lead.course,
      lead.university ?? "",
      lead.source ?? "",
      new Date(lead.createdAt).toISOString(),
    ]
      .map(toCsvField)
      .join(","),
  );
  return [header, ...rows].join("\r\n");
}

// Nigerian numbers are usually written in local form (0801...); WhatsApp's click-to-chat
// links need the full international digits with no leading 0. Falls back to stripping
// symbols only for anything that doesn't look like that shape, rather than guessing.
function toWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const withCountryCode = digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
  return `https://wa.me/${withCountryCode}`;
}

// Client-side export: the admin dashboard already fetches every lead (GET /admin/leads
// has no pagination), so there's nothing to gain from a dedicated export endpoint --
// just turn what's already in state into a file download.
function triggerCsvDownload(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadLeadsCsv(leads: Lead[]) {
  triggerCsvDownload(leadsToCsv(leads), `leads-${new Date().toISOString().slice(0, 10)}.csv`);
}

export function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, status, error, leads, leadsStatus, coursePayments } = useAppSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchLeads());
  }, [dispatch]);

  function viewCoursePayments(courseId: string, courseTitle: string, paymentStatus: "confirmed" | "pending") {
    dispatch(fetchCoursePayments({ courseId, courseTitle, status: paymentStatus }));
  }

  function handleDeleteLead(id: string, name: string) {
    if (!window.confirm(`Delete the lead from ${name}? This cannot be undone.`)) return;
    dispatch(deleteLead(id));
  }

  if (status === "loading" || !stats) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Alert message={error} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Admin dashboard</h1>
        <div className="flex items-center gap-4">
          <Link to="/admin/capstones" className="text-sm font-medium text-blue-600 hover:underline">
            Manage capstone projects →
          </Link>
          <Link
            to="/admin/candidates"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Manage candidates →
          </Link>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Users</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total users" value={stats.users.total} />
        <StatTile label="Students" value={stats.users.byRole.student} />
        <StatTile label="Instructors" value={stats.users.byRole.instructor} />
        <StatTile label="Admins" value={stats.users.byRole.admin} />
      </div>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Courses</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total courses" value={stats.courses.total} />
        <StatTile label="Published" value={stats.courses.byStatus.published} />
        <StatTile label="Draft" value={stats.courses.byStatus.draft} />
        <StatTile label="Archived" value={stats.courses.byStatus.archived} />
      </div>
      {stats.courses.list.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Enrollments</th>
              </tr>
            </thead>
            <tbody>
              {stats.courses.list.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 text-gray-900">{c.title}</td>
                  <td className="px-4 py-2 text-gray-600">{c.status}</td>
                  <td className="px-4 py-2 text-gray-600">{c.enrollmentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Enrollments</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total enrollments" value={stats.enrollments.total} />
        <StatTile label="Active" value={stats.enrollments.byStatus.active} />
        <StatTile label="Completed" value={stats.enrollments.byStatus.completed} />
        <StatTile label="Dropped" value={stats.enrollments.byStatus.dropped} />
      </div>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">Average progress across all enrollments</p>
        <div className="mt-2">
          <ProgressBar percent={stats.enrollments.averageProgressPercent ?? 0} />
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {formatNumberOrDash(stats.enrollments.averageProgressPercent)}%
        </p>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Payments</h2>
      {stats.payments.length > 0 ? (
        <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Paid</th>
                <th className="px-4 py-2">Pending</th>
              </tr>
            </thead>
            <tbody>
              {stats.payments.map((p) => (
                <tr key={p.courseId} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 text-gray-900">{p.courseTitle}</td>
                  <td className="px-4 py-2">
                    {p.paymentConfirmed > 0 ? (
                      <button
                        type="button"
                        onClick={() => viewCoursePayments(p.courseId, p.courseTitle, "confirmed")}
                        className="text-green-700 underline-offset-2 hover:underline"
                      >
                        {p.paymentConfirmed}
                      </button>
                    ) : (
                      <span className="text-green-700">{p.paymentConfirmed}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {p.paymentPending > 0 ? (
                      <button
                        type="button"
                        onClick={() => viewCoursePayments(p.courseId, p.courseTitle, "pending")}
                        className="text-amber-600 underline-offset-2 hover:underline"
                      >
                        {p.paymentPending}
                      </button>
                    ) : (
                      <span className="text-amber-600">{p.paymentPending}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-3 text-sm text-gray-500">No enrollments yet.</p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Leads</h2>
        {leads.length > 0 && (
          <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => downloadLeadsCsv(leads)}>
            Download CSV
          </Button>
        )}
      </div>
      {leadsStatus === "loading" && leads.length === 0 ? (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      ) : leads.length > 0 ? (
        <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">University</th>
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 text-gray-900">{lead.name}</td>
                  <td className="px-4 py-2 text-gray-600">{lead.email}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {lead.phone ? (
                      <a
                        href={toWhatsAppLink(lead.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 hover:underline"
                        title="Open WhatsApp chat"
                      >
                        {lead.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{lead.course}</td>
                  <td className="px-4 py-2 text-gray-600">{lead.university ?? "—"}</td>
                  <td className="px-4 py-2 text-gray-600">{lead.source ?? "—"}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteLead(lead.id, lead.name)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-3 text-sm text-gray-500">No leads yet.</p>
      )}

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Assignment grading</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total submissions" value={stats.assignments.totalSubmissions} />
        <StatTile label="Graded" value={stats.assignments.graded} />
        <StatTile label="Average score" value={formatNumberOrDash(stats.assignments.averageScore)} />
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Pending grading</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.assignments.pendingGrading}</p>
          <Link to="/instructor/grading" className="mt-1 text-xs text-blue-600 hover:underline">
            View queue
          </Link>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Quiz grading</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total attempts" value={stats.quizzes.totalAttempts} />
        <StatTile label="Graded" value={stats.quizzes.graded} />
        <StatTile label="Average score" value={formatNumberOrDash(stats.quizzes.averageScore)} />
        <StatTile label="Pass rate" value={formatNumberOrDash(stats.quizzes.passRate)} subtext="of graded attempts" />
      </div>
      <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">Pending grading</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.quizzes.pendingGrading}</p>
        <Link to="/instructor/quiz-grading" className="mt-1 text-xs text-blue-600 hover:underline">
          View queue
        </Link>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Capstone grading</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total submissions" value={stats.capstones.totalSubmissions} />
        <StatTile label="Graded" value={stats.capstones.graded} />
        <StatTile label="Average score" value={formatNumberOrDash(stats.capstones.averageScore)} />
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Pending grading</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.capstones.pendingGrading}</p>
          <Link to="/instructor/capstone-grading" className="mt-1 text-xs text-blue-600 hover:underline">
            View queue
          </Link>
        </div>
      </div>

      {coursePayments && (
        <Modal
          title={`${coursePayments.courseTitle} — ${coursePayments.paymentStatus === "confirmed" ? "Paid" : "Pending"}`}
          onClose={() => dispatch(closeCoursePayments())}
        >
          {coursePayments.requestStatus === "loading" ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : coursePayments.requestStatus === "failed" ? (
            <Alert message="Could not load payments for this course." />
          ) : coursePayments.payments.length === 0 ? (
            <p className="text-sm text-gray-500">No students in this list.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Method</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {coursePayments.payments.map((row) => (
                    <tr key={row.enrollmentId} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 pr-4 text-gray-900">
                        {row.firstName} {row.lastName}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">{row.email}</td>
                      <td className="py-2 pr-4 text-gray-600">
                        {row.latestPayment ? row.latestPayment.method.replace("_", " ") : "—"}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">
                        {row.latestPayment
                          ? `${row.latestPayment.currency} ${Number(row.latestPayment.amount).toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="py-2 text-gray-600">
                        {new Date(
                          row.latestPayment?.createdAt ?? row.paymentConfirmedAt ?? row.enrolledAt,
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
