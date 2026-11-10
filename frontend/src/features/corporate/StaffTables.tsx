import { CorporateMemberRow, SeatSummary } from "../../api/corporate.api";

// Shared by /company (managers) and /admin/corporate-clients.

function formatDate(iso: string | null): string {
  return iso ? new Date(iso).toLocaleDateString("en-GB", { dateStyle: "medium" }) : "—";
}

export function SeatsTable({ seats }: { seats: SeatSummary[] }) {
  if (seats.length === 0) return <p className="text-sm text-gray-600">No seats yet.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
          <tr>
            <th className="py-2 pr-4">Course</th>
            <th className="py-2 pr-4">Seats</th>
            <th className="py-2 pr-4">In use</th>
            <th className="py-2 pr-4">Left</th>
            <th className="py-2 pr-4">Sign-ups close</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((s) => (
            <tr key={s.courseId} className="border-b border-gray-100">
              <td className="py-2 pr-4 font-medium text-gray-900">{s.courseTitle}</td>
              <td className="py-2 pr-4">{s.seats}</td>
              <td className="py-2 pr-4">{s.used}</td>
              <td className="py-2 pr-4">{s.left}</td>
              <td className="py-2 pr-4">
                {s.expiresAt ? formatDate(s.expiresAt) : "No end date"}
                {!s.open && <span className="ml-1 text-red-600">(closed)</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProgressCell({ m }: { m: CorporateMemberRow }) {
  if (m.courses.length === 0) return <span className="text-gray-400">No course yet</span>;
  return (
    <div className="flex flex-col gap-1">
      {m.courses.map((c) => (
        <div key={c.enrollmentId} className="flex items-center gap-2">
          <div className="h-2 w-20 overflow-hidden rounded bg-gray-200" aria-hidden>
            <div
              className={`h-2 ${c.status === "completed" ? "bg-green-600" : "bg-blue-600"}`}
              style={{ width: `${Math.min(100, c.progressPercent)}%` }}
            />
          </div>
          <span className="text-xs text-gray-700">
            {c.status === "completed" ? "Completed" : `${c.progressPercent}%`} · {c.courseTitle}
          </span>
        </div>
      ))}
    </div>
  );
}

export function StaffTable({
  members,
  actions,
}: {
  members: CorporateMemberRow[];
  actions?: (m: CorporateMemberRow) => React.ReactNode;
}) {
  if (members.length === 0) {
    return <p className="text-sm text-gray-600">No staff have created their login yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
          <tr>
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Progress</th>
            <th className="py-2 pr-4">Joined</th>
            <th className="py-2 pr-4">Last active</th>
            {actions && <th className="py-2 pr-4" />}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.userId} className="border-b border-gray-100 align-top">
              <td className="py-2 pr-4">
                <div className="font-medium text-gray-900">
                  {m.firstName} {m.lastName}
                  {m.isManager && (
                    <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                      Manager
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{m.email}</div>
                {(m.jobTitle || m.department) && (
                  <div className="text-xs text-gray-500">{[m.jobTitle, m.department].filter(Boolean).join(" · ")}</div>
                )}
              </td>
              <td className="py-2 pr-4">
                <ProgressCell m={m} />
              </td>
              <td className="whitespace-nowrap py-2 pr-4">{formatDate(m.joinedAt)}</td>
              <td className="whitespace-nowrap py-2 pr-4">{formatDate(m.lastActiveAt)}</td>
              {actions && <td className="whitespace-nowrap py-2 pr-4">{actions(m)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function staffCsv(members: CorporateMemberRow[]): string {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = [["First name", "Last name", "Email", "Job title", "Department", "Course", "Progress %", "Status", "Joined", "Last active"]];
  for (const m of members) {
    const base = [m.firstName, m.lastName, m.email, m.jobTitle ?? "", m.department ?? ""];
    const tail = [formatDate(m.joinedAt), formatDate(m.lastActiveAt)];
    if (m.courses.length === 0) rows.push([...base, "", "", "", ...tail]);
    for (const c of m.courses) rows.push([...base, c.courseTitle, String(c.progressPercent), c.status, ...tail]);
  }
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
