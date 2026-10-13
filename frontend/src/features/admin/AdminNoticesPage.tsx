import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createNotice, deleteNotice, fetchAdminNotices, updateNotice } from "../../api/admin.api";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { AmbassadorNotice, AmbassadorNoticeInput } from "../../types/api";

const EMPTY: AmbassadorNoticeInput = { title: "", body: "", linkUrl: "", linkLabel: "", expiresAt: null };

// <input type="datetime-local"> works in the admin's own time zone with no offset.
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

function apiError(err: unknown, fallback: string): string {
  return (
    (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? fallback
  );
}

export function AdminNoticesPage() {
  const [notices, setNotices] = useState<AmbassadorNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<AmbassadorNoticeInput>(EMPTY);
  const [expiresLocal, setExpiresLocal] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminNotices()
      .then(setNotices)
      .catch(() => setError("Couldn't load notices."))
      .finally(() => setLoading(false));
  }, []);

  function resetForm() {
    setForm(EMPTY);
    setExpiresLocal("");
    setEditingId(null);
  }

  function startEdit(notice: AmbassadorNotice) {
    setForm({
      title: notice.title,
      body: notice.body,
      linkUrl: notice.linkUrl ?? "",
      linkLabel: notice.linkLabel ?? "",
      expiresAt: notice.expiresAt,
    });
    setExpiresLocal(toLocalInput(notice.expiresAt));
    setEditingId(notice.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const input = { ...form, expiresAt: expiresLocal ? new Date(expiresLocal).toISOString() : null };
    try {
      if (editingId) {
        const saved = await updateNotice(editingId, input);
        setNotices((rows) => rows.map((r) => (r.id === saved.id ? saved : r)));
      } else {
        const saved = await createNotice(input);
        setNotices((rows) => [saved, ...rows]);
      }
      resetForm();
    } catch (err) {
      setError(apiError(err, "Couldn't save the notice. Check the link is a full https:// address."));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(notice: AmbassadorNotice) {
    if (!window.confirm(`Delete the notice "${notice.title}"? Ambassadors will stop seeing it.`)) return;
    try {
      await deleteNotice(notice.id);
      setNotices((rows) => rows.filter((r) => r.id !== notice.id));
      if (editingId === notice.id) resetForm();
    } catch {
      setError("Couldn't delete that notice.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const inputClass = "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        ← Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Ambassador notice board</h1>
      <p className="mt-1 text-sm text-gray-600">
        Messages shown at the top of{" "}
        <a href="/refer/me" className="text-blue-600 hover:underline">
          /refer/me
        </a>{" "}
        to every logged-in ambassador, newest first. A notice disappears for ambassadors after its &ldquo;Hide
        after&rdquo; time.
      </p>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit notice" : "Post a new notice"}</h2>
        <label className="mt-4 block text-sm font-medium text-gray-700">
          Title
          <input
            required
            minLength={3}
            maxLength={200}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            placeholder="e.g. Ambassadors Hour on Zoom: Saturday 2pm (Nigeria time)"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-gray-700">
          Message
          <textarea
            required
            rows={6}
            maxLength={5000}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className={inputClass}
            placeholder="Line breaks are kept. Links starting https:// become clickable."
          />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Button link (optional)
            <input
              type="url"
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
              className={inputClass}
              placeholder="https://us06web.zoom.us/j/…"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Button text
            <input
              maxLength={60}
              value={form.linkLabel}
              onChange={(e) => setForm({ ...form, linkLabel: e.target.value })}
              className={inputClass}
              placeholder="Join Zoom meeting"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm font-medium text-gray-700">
          Hide after (optional, your local time)
          <input
            type="datetime-local"
            value={expiresLocal}
            onChange={(e) => setExpiresLocal(e.target.value)}
            className={`${inputClass} block sm:w-64`}
          />
          <span className="mt-1 block text-xs font-normal text-gray-500">
            Leave empty to keep the notice up until you delete it.
          </span>
        </label>
        <div className="mt-5 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Post notice"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">All notices ({notices.length})</h2>
      {notices.length === 0 ? (
        <p className="mt-2 text-sm text-gray-600">No notices yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {notices.map((notice) => {
            const expired = notice.expiresAt !== null && new Date(notice.expiresAt).getTime() <= Date.now();
            return (
              <li key={notice.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          expired ? "bg-gray-200 text-gray-700" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {expired ? "Hidden (expired)" : "Showing"}
                      </span>
                      <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Posted {formatDateTime(notice.createdAt)}
                      {notice.expiresAt && ` · hides ${formatDateTime(notice.expiresAt)}`}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm text-gray-700">{notice.body}</p>
                    {notice.linkUrl && (
                      <p className="mt-2 break-all text-xs text-gray-500">
                        Button &ldquo;{notice.linkLabel || "Open link"}&rdquo; → {notice.linkUrl}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(notice)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(notice)}
                      className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
