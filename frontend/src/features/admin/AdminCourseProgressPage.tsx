import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourseProgress } from "../../api/admin.api";
import { Alert } from "../../components/ui/Alert";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Spinner } from "../../components/ui/Spinner";
import { StatTile } from "../../components/ui/StatTile";
import {
  CandidateCourseProgress,
  CourseProgressState,
  CourseProgressSummary,
} from "../../types/api";

const STATE_LABEL: Record<CourseProgressState, string> = {
  stalled: "Stalled",
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
  awaiting_payment: "Awaiting payment",
};

const STATE_BADGE: Record<CourseProgressState, string> = {
  stalled: "bg-amber-100 text-amber-800",
  not_started: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  awaiting_payment: "bg-red-50 text-red-700",
};

// Default ordering puts the people who need a nudge first: stalled, then paid but not
// started, then everyone still going, then finished, then unpaid.
const STATE_PRIORITY: Record<CourseProgressState, number> = {
  stalled: 0,
  not_started: 1,
  in_progress: 2,
  completed: 3,
  awaiting_payment: 4,
};

type StateFilter = "all" | CourseProgressState;
type SortKey = "attention" | "progress" | "recent" | "name";

function relativeDays(iso: string | null): string {
  if (!iso) return "Never";
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (24 * 60 * 60 * 1000),
  );
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fraction(done: number, total: number): string {
  return total === 0 ? "—" : `${done}/${total}`;
}

function sortCandidates(
  rows: CandidateCourseProgress[],
  key: SortKey,
): CandidateCourseProgress[] {
  const sorted = [...rows];
  const time = (iso: string | null) => (iso ? new Date(iso).getTime() : 0);
  if (key === "attention") {
    sorted.sort(
      (a, b) =>
        STATE_PRIORITY[a.state] - STATE_PRIORITY[b.state] ||
        time(a.lastProgressAt) - time(b.lastProgressAt) ||
        a.firstName.localeCompare(b.firstName),
    );
  } else if (key === "progress") {
    sorted.sort(
      (a, b) =>
        b.progressPercent - a.progressPercent ||
        a.firstName.localeCompare(b.firstName),
    );
  } else if (key === "recent") {
    sorted.sort((a, b) => time(b.lastProgressAt) - time(a.lastProgressAt));
  } else {
    sorted.sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
      ),
    );
  }
  return sorted;
}

function csvCell(value: string | number | null): string {
  const text = value === null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadCsv(course: CourseProgressSummary) {
  const header = [
    "Name",
    "Email",
    "State",
    "Paid",
    "Lessons done",
    "Lessons total",
    "Progress %",
    "Current week",
    "Next lesson",
    "Quizzes",
    "Assignments",
    "Capstone submitted",
    "Last progress",
    "Enrolled",
  ];
  const rows = sortCandidates(course.candidates, "attention").map((c) => [
    `${c.firstName} ${c.lastName}`.trim(),
    c.email,
    STATE_LABEL[c.state],
    c.paymentConfirmed ? "Yes" : "No",
    c.lessonsCompleted,
    c.lessonsTotal,
    c.progressPercent,
    c.currentWeek,
    c.nextLessonTitle,
    fraction(c.quizzesSubmitted, c.quizzesTotal),
    fraction(c.assignmentsSubmitted, c.assignmentsTotal),
    c.capstoneSubmitted === null ? "" : c.capstoneSubmitted ? "Yes" : "No",
    c.lastProgressAt ? c.lastProgressAt.slice(0, 10) : "",
    c.enrolledAt.slice(0, 10),
  ]);
  const csv = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
  const url = window.URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `course-progress-${course.slug}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export function AdminCourseProgressPage() {
  const [courses, setCourses] = useState<CourseProgressSummary[] | null>(null);
  const [stalledAfterDays, setStalledAfterDays] = useState(7);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stateFilter, setStateFilter] = useState<StateFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("attention");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCourseProgress()
      .then((data) => {
        // Courses with candidates first (most enrolled first), then empty published ones.
        const ordered = [...data.courses].sort(
          (a, b) => b.totals.enrolled - a.totals.enrolled,
        );
        setCourses(ordered);
        setStalledAfterDays(data.stalledAfterDays);
        setSelectedId(ordered[0]?.courseId ?? null);
      })
      .catch(() =>
        setError("Couldn't load course progress. Please refresh the page."),
      );
  }, []);

  const course = courses?.find((c) => c.courseId === selectedId) ?? null;

  const visible = useMemo(() => {
    if (!course) return [];
    const term = search.trim().toLowerCase();
    const filtered = course.candidates.filter(
      (c) =>
        (stateFilter === "all" || c.state === stateFilter) &&
        (!term ||
          `${c.firstName} ${c.lastName} ${c.email}`
            .toLowerCase()
            .includes(term)),
    );
    return sortCandidates(filtered, sortKey);
  }, [course, stateFilter, sortKey, search]);

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Alert message={error} />
      </div>
    );
  }
  if (!courses) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const awaitingPayment = course
    ? course.totals.enrolled - course.totals.paid
    : 0;
  const filterOptions: { value: StateFilter; label: string; count: number }[] =
    course
      ? [
          { value: "all", label: "All", count: course.totals.enrolled },
          { value: "stalled", label: "Stalled", count: course.totals.stalled },
          {
            value: "not_started",
            label: "Not started",
            count: course.totals.notStarted,
          },
          {
            value: "in_progress",
            label: "In progress",
            count: course.totals.inProgress,
          },
          {
            value: "completed",
            label: "Completed",
            count: course.totals.completed,
          },
          {
            value: "awaiting_payment",
            label: "Awaiting payment",
            count: awaitingPayment,
          },
        ]
      : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        ← Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">
        Course progress
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Where every candidate is in each course. <strong>Stalled</strong> means
        paid, started, and no lesson, quiz or submission for more than{" "}
        {stalledAfterDays} days. <strong>Not started</strong> means paid but
        nothing done yet.
      </p>

      {courses.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">No courses yet.</p>
      ) : (
        <>
          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Courses"
          >
            {courses.map((c) => {
              const selected = c.courseId === selectedId;
              return (
                <button
                  key={c.courseId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setSelectedId(c.courseId);
                    setStateFilter("all");
                  }}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    selected
                      ? "border-blue-500 bg-blue-50 font-medium text-blue-800 ring-1 ring-blue-500"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {c.title}
                  <span className="ml-1.5 text-xs text-gray-500">
                    {c.totals.enrolled}
                  </span>
                  {c.totals.stalled > 0 && (
                    <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 text-xs font-medium text-amber-800">
                      {c.totals.stalled} stalled
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {course && (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <StatTile
                  label="Enrolled"
                  value={course.totals.enrolled}
                  subtext={`${course.totals.paid} paid`}
                />
                <StatTile
                  label="Not started"
                  value={course.totals.notStarted}
                />
                <StatTile
                  label="In progress"
                  value={course.totals.inProgress}
                />
                <StatTile label="Stalled" value={course.totals.stalled} />
                <StatTile label="Completed" value={course.totals.completed} />
                <StatTile
                  label="Average progress"
                  value={
                    course.totals.averageProgressPercent === null
                      ? "—"
                      : `${course.totals.averageProgressPercent}%`
                  }
                  subtext="paid candidates"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setStateFilter(option.value)}
                      aria-pressed={stateFilter === option.value}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                        stateFilter === option.value
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {option.label} ({option.count})
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name or email"
                    aria-label="Search candidates"
                    className="w-48 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    aria-label="Sort candidates"
                    className="rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  >
                    <option value="attention">Needs attention first</option>
                    <option value="progress">Most progress first</option>
                    <option value="recent">Most recent activity</option>
                    <option value="name">Name (A–Z)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => downloadCsv(course)}
                    disabled={course.candidates.length === 0}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {course.candidates.length === 0 ? (
                <p className="mt-6 text-sm text-gray-500">
                  No candidates are enrolled in this course yet.
                </p>
              ) : visible.length === 0 ? (
                <p className="mt-6 text-sm text-gray-500">
                  No candidates match this filter.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
                  <table className="w-full min-w-[880px] text-left text-sm">
                    <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-4 py-2">Candidate</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="w-48 px-4 py-2">Lessons</th>
                        <th className="px-4 py-2">Up next</th>
                        <th className="px-4 py-2">Quizzes</th>
                        <th className="px-4 py-2">Assignments</th>
                        <th className="px-4 py-2">Capstone</th>
                        <th className="px-4 py-2">Last progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((c) => (
                        <tr
                          key={c.enrollmentId}
                          className="border-b border-gray-100 align-top last:border-0"
                        >
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">
                              {c.firstName} {c.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{c.email}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${STATE_BADGE[c.state]}`}
                            >
                              {STATE_LABEL[c.state]}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <ProgressBar percent={c.progressPercent} />
                            <p className="mt-1 text-xs text-gray-600">
                              {fraction(c.lessonsCompleted, c.lessonsTotal)} ·{" "}
                              {c.progressPercent}%
                            </p>
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {c.nextLessonTitle ? (
                              <>
                                {c.currentWeek !== null && (
                                  <p className="text-xs font-medium text-gray-500">
                                    Day {c.currentWeek}
                                  </p>
                                )}
                                <p className="text-sm">{c.nextLessonTitle}</p>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">
                                All lessons done
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {fraction(c.quizzesSubmitted, c.quizzesTotal)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {fraction(
                              c.assignmentsSubmitted,
                              c.assignmentsTotal,
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {c.capstoneSubmitted === null
                              ? "—"
                              : c.capstoneSubmitted
                                ? "Submitted"
                                : "Not yet"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                            {relativeDays(c.lastProgressAt)}
                            <p className="text-xs text-gray-500">
                              Seen{" "}
                              {c.lastActiveAt
                                ? relativeDays(c.lastActiveAt).replace(
                                    /^(Today|Yesterday)$/,
                                    (w) => w.toLowerCase(),
                                  )
                                : "never"}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
