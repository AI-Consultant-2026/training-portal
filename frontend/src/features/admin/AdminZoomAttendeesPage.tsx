import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteZoomAttendee, fetchZoomAttendees } from "../../api/admin.api";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { StatTile } from "../../components/ui/StatTile";
import { ZoomAttendee } from "../../types/api";

const STATUSES = ["Graduate", "Non-graduate", "Final year student", "NYSC member"];

// "2026-10-10" -> "10/10/2026", the format the public form shows.
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

function csvCell(value: string | null): string {
  const text = value ?? "";
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadCsv(attendees: ZoomAttendee[], session: string) {
  const header = ["Name", "Email", "Date attended", "Status", "WhatsApp", "Wants updates", "Signed in at"];
  const rows = attendees.map((a) => [
    a.name,
    a.email,
    formatDate(a.dateAttended),
    a.status,
    a.phone,
    a.wantsUpdates ? "Yes" : "No",
    new Date(a.createdAt).toLocaleString("en-GB"),
  ]);
  const csv = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
  const url = window.URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `zoom-attendees-${session === "all" ? "all" : session}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export function AdminZoomAttendeesPage() {
  const [attendees, setAttendees] = useState<ZoomAttendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchZoomAttendees()
      .then((rows) => {
        setAttendees(rows);
        if (rows.length > 0) setSession(rows[0].dateAttended);
      })
      .catch(() => setError("Couldn't load Zoom attendees."))
      .finally(() => setLoading(false));
  }, []);

  const sessions = useMemo(
    () => Array.from(new Set(attendees.map((a) => a.dateAttended))).sort().reverse(),
    [attendees],
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return attendees.filter(
      (a) =>
        (session === "all" || a.dateAttended === session) &&
        (!q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)),
    );
  }, [attendees, session, search]);

  const countFor = (status: string | null) => visible.filter((a) => a.status === status).length;

  async function handleDelete(attendee: ZoomAttendee) {
    if (!window.confirm(`Remove ${attendee.name} (${formatDate(attendee.dateAttended)}) from the register?`)) return;
    try {
      await deleteZoomAttendee(attendee.id);
      setAttendees((rows) => rows.filter((r) => r.id !== attendee.id));
    } catch {
      setError("Couldn't delete that attendee.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        ← Admin dashboard
      </Link>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Zoom attendees</h1>
          <p className="mt-1 text-sm text-gray-600">
            Sign-ins from the public{" "}
            <a href="/zoom-attendees" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              /zoom-attendees
            </a>{" "}
            page. A second sign-in with the same email for the same date updates the first.
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadCsv(visible, session)}
          disabled={visible.length === 0}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Download CSV
        </button>
      </div>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          aria-label="Session date"
        >
          <option value="all">All sessions</option>
          {sessions.map((d) => (
            <option key={d} value={d}>
              {formatDate(d)}
            </option>
          ))}
        </select>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile label="Attendees" value={visible.length} />
        {STATUSES.map((s) => (
          <StatTile key={s} label={s} value={countFor(s)} />
        ))}
        <StatTile label="Not stated" value={countFor(null)} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Date attended</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">WhatsApp</th>
              <th className="px-4 py-3">Updates</th>
              <th className="px-4 py-3">Signed in</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No attendees yet.
                </td>
              </tr>
            ) : (
              visible.map((a) => (
                <tr key={a.id}>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{a.name}</td>
                  <td className="px-4 py-3 text-gray-700">{a.email}</td>
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(a.dateAttended)}</td>
                  <td className="whitespace-nowrap px-4 py-3">{a.status ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3">{a.phone ?? "—"}</td>
                  <td className="px-4 py-3">{a.wantsUpdates ? "Yes" : "No"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                    {new Date(a.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(a)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
