import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Spinner } from "../../components/ui/Spinner";
import { StatTile } from "../../components/ui/StatTile";
import { fetchAdminStats } from "./adminSlice";

function formatNumberOrDash(value: number | null): string {
  return value === null ? "—" : String(value);
}

export function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, status, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

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
      <h1 className="text-2xl font-semibold text-gray-900">Admin dashboard</h1>

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
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
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
    </div>
  );
}
