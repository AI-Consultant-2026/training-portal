import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  adminInviteStaff,
  apiErrorMessage,
  ClientInput,
  CorporateClient,
  CorporateCourseOption,
  createCorporateClient,
  deleteCorporateClient,
  fetchCorporateClient,
  fetchCorporateClients,
  parseEmailList,
  regenerateJoinCode,
  removeCorporateMember,
  setCorporateManager,
  updateCorporateClient,
} from "../../api/corporate.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { downloadCsv, SeatsTable, StaffTable, staffCsv } from "../corporate/StaffTables";

// /admin/corporate-clients -- companies that bought the corporate programmes: their seats
// per course, the staff sign-up link to send them, and their staff's progress.

const COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "ZA", name: "South Africa" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
];

interface FormState {
  name: string;
  country: string;
  contactName: string;
  contactEmail: string;
  emailDomain: string;
  notes: string;
  status: "active" | "suspended";
  seats: Record<string, { seats: string; expiresAt: string }>;
}

function emptyForm(courses: CorporateCourseOption[]): FormState {
  return {
    name: "",
    country: "NG",
    contactName: "",
    contactEmail: "",
    emailDomain: "",
    notes: "",
    status: "active",
    seats: Object.fromEntries(courses.map((c) => [c.id, { seats: "0", expiresAt: "" }])),
  };
}

function formFromClient(client: CorporateClient, courses: CorporateCourseOption[]): FormState {
  const form = emptyForm(courses);
  return {
    ...form,
    name: client.name,
    country: client.country,
    contactName: client.contactName ?? "",
    contactEmail: client.contactEmail ?? "",
    emailDomain: client.emailDomain ?? "",
    notes: client.notes ?? "",
    status: client.status,
    seats: {
      ...form.seats,
      ...Object.fromEntries(
        client.seats.map((s) => [s.courseId, { seats: String(s.seats), expiresAt: s.expiresAt ? s.expiresAt.slice(0, 10) : "" }]),
      ),
    },
  };
}

function toInput(form: FormState, existing: CorporateClient | null): ClientInput {
  const hadSeat = new Set(existing?.seats.map((s) => s.courseId) ?? []);
  return {
    name: form.name,
    country: form.country,
    contactName: form.contactName,
    contactEmail: form.contactEmail,
    emailDomain: form.emailDomain,
    notes: form.notes,
    status: form.status,
    seats: Object.entries(form.seats)
      .filter(([courseId, s]) => Number(s.seats) > 0 || hadSeat.has(courseId))
      .map(([courseId, s]) => ({
        courseId,
        seats: Number(s.seats) || 0,
        // End of that day, UTC.
        expiresAt: s.expiresAt ? new Date(`${s.expiresAt}T23:59:59Z`).toISOString() : null,
      })),
  };
}

export function AdminCorporateClientsPage() {
  const [clients, setClients] = useState<CorporateClient[]>([]);
  const [courses, setCourses] = useState<CorporateCourseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [editing, setEditing] = useState<CorporateClient | null>(null);
  const [selected, setSelected] = useState<CorporateClient | null>(null);
  const [inviteText, setInviteText] = useState("");
  const [saving, setSaving] = useState(false);

  async function reload() {
    const data = await fetchCorporateClients();
    setClients(data.clients);
    setCourses(data.courses);
    return data;
  }

  useEffect(() => {
    reload()
      .catch(() => setError("Couldn't load companies."))
      .finally(() => setLoading(false));
  }, []);

  async function openClient(id: string) {
    setError(null);
    setNotice(null);
    try {
      setSelected(await fetchCorporateClient(id));
      setForm(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Couldn't load that company.");
    }
  }

  function startCreate() {
    setEditing(null);
    setSelected(null);
    setForm(emptyForm(courses));
  }

  function startEdit(client: CorporateClient) {
    setEditing(client);
    setForm(formFromClient(client, courses));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const saved = editing
        ? await updateCorporateClient(editing.id, toInput(form, editing))
        : await createCorporateClient(toInput(form, null));
      await reload();
      setSelected(saved);
      setForm(null);
      setEditing(null);
      setNotice(editing ? "Saved." : "Company created. Send them the staff sign-up link below.");
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save the company."));
    } finally {
      setSaving(false);
    }
  }

  async function act(fn: () => Promise<CorporateClient | void>, done?: string) {
    setError(null);
    try {
      const result = await fn();
      if (result) setSelected(result);
      await reload();
      if (done) setNotice(done);
    } catch (err) {
      setError(apiErrorMessage(err, "That didn't work."));
    }
  }

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const emails = parseEmailList(inviteText);
    if (emails.length === 0) return setError("Paste at least one email address.");
    setError(null);
    try {
      const { sent } = await adminInviteStaff(selected.id, emails);
      setNotice(`Invitation sent to ${sent} ${sent === 1 ? "person" : "people"}.`);
      setInviteText("");
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't send the invitations."));
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        ← Admin dashboard
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">Corporate clients</h1>
        <Button onClick={startCreate}>Add a company</Button>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Set up each company that has paid for a corporate programme, with its number of seats per course. Staff create
        their own login with the company's sign-up link; each course they take uses one seat and is unlocked straight
        away. Tick <strong>Manager</strong> for the company's HR/training lead so they can see progress and invite staff
        at /company.
      </p>
      {courses.length === 0 && (
        <div className="mt-4">
          <Alert message="The corporate courses aren't in the database yet (run the migrations)." />
        </div>
      )}

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}
      {notice && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</div>
      )}

      {form && (
        <form onSubmit={handleSave} className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900">{editing ? `Edit ${editing.name}` : "Add a company"}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              Company name
              <input
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Country
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className={inputClass}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Contact name
              <input
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Contact email
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Work email domain (optional)
              <input
                value={form.emailDomain}
                onChange={(e) => setForm({ ...form, emailDomain: e.target.value })}
                placeholder="e.g. company.com"
                className={inputClass}
              />
              <span className="mt-1 block text-xs font-normal text-gray-500">
                If set, staff can only sign up with an email at this domain.
              </span>
            </label>
            {editing && (
              <label className="block text-sm font-medium text-gray-700">
                Access
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "suspended" })}
                  className={inputClass}
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended (sign-up link stops working)</option>
                </select>
              </label>
            )}
          </div>

          <h3 className="mt-6 text-sm font-semibold text-gray-900">Seats paid for</h3>
          <div className="mt-2 flex flex-col gap-3">
            {courses.map((c) => (
              <div key={c.id} className="grid grid-cols-1 items-end gap-3 rounded-md border border-gray-200 p-3 sm:grid-cols-3">
                <span className="text-sm font-medium text-gray-900">{c.title}</span>
                <label className="block text-xs font-medium text-gray-700">
                  Seats
                  <input
                    type="number"
                    min={0}
                    value={form.seats[c.id]?.seats ?? "0"}
                    onChange={(e) =>
                      setForm({ ...form, seats: { ...form.seats, [c.id]: { ...form.seats[c.id], seats: e.target.value } } })
                    }
                    className={inputClass}
                  />
                </label>
                <label className="block text-xs font-medium text-gray-700">
                  Sign-ups close (optional)
                  <input
                    type="date"
                    value={form.seats[c.id]?.expiresAt ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        seats: { ...form.seats, [c.id]: { ...form.seats[c.id], expiresAt: e.target.value } },
                      })
                    }
                    className={inputClass}
                  />
                </label>
              </div>
            ))}
          </div>

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Notes (admin only)
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="e.g. invoice number, payment date"
              className={inputClass}
            />
          </label>
          <div className="mt-4 flex gap-3">
            <Button type="submit" isLoading={saving}>
              {editing ? "Save changes" : "Create company"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setForm(null);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {selected && !form && (
        <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selected.name}</h2>
              <p className="text-sm text-gray-600">
                {COUNTRIES.find((c) => c.code === selected.country)?.name ?? selected.country}
                {selected.contactName ? ` · ${selected.contactName}` : ""}
                {selected.contactEmail ? ` · ${selected.contactEmail}` : ""}
                {selected.emailDomain ? ` · staff emails @${selected.emailDomain}` : ""}
              </p>
              {selected.status === "suspended" && <p className="mt-1 text-sm font-medium text-red-600">Suspended</p>}
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => startEdit(selected)}>
                Edit / seats
              </Button>
              <Button variant="secondary" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>

          <h3 className="mt-5 text-sm font-semibold text-gray-900">Staff sign-up link</h3>
          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="block flex-1 break-all rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800">
              {selected.joinUrl}
            </code>
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard?.writeText(selected.joinUrl).then(() => setNotice("Link copied."))}
            >
              Copy
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                if (window.confirm("Make a new link? The old link stops working straight away.")) {
                  act(() => regenerateJoinCode(selected.id), "New link created. The old one no longer works.");
                }
              }}
            >
              New link
            </Button>
          </div>

          <h3 className="mt-5 text-sm font-semibold text-gray-900">Seats</h3>
          <div className="mt-1">
            <SeatsTable seats={selected.seats} />
          </div>

          <form onSubmit={handleInvite} className="mt-5">
            <label className="block text-sm font-semibold text-gray-900" htmlFor="admin-invite">
              Email the sign-up link to staff
            </label>
            <textarea
              id="admin-invite"
              rows={2}
              value={inviteText}
              onChange={(e) => setInviteText(e.target.value)}
              placeholder="Paste work emails, separated by commas or new lines"
              className={inputClass}
            />
            <Button type="submit" className="mt-2">
              Send invitations
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900">Staff ({selected.members?.length ?? 0})</h3>
            {!!selected.members?.length && (
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:underline"
                onClick={() => downloadCsv(`${selected.name} staff progress.csv`, staffCsv(selected.members!))}
              >
                Download CSV
              </button>
            )}
          </div>
          <div className="mt-2">
            <StaffTable
              members={selected.members ?? []}
              actions={(m) => (
                <div className="flex flex-col items-start gap-1">
                  <label className="flex items-center gap-1 text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={m.isManager}
                      onChange={(e) => act(() => setCorporateManager(selected.id, m.userId, e.target.checked))}
                    />
                    Manager
                  </label>
                  <button
                    type="button"
                    className="text-xs text-red-600 hover:underline"
                    onClick={() => {
                      if (window.confirm(`Remove ${m.firstName} ${m.lastName}? Their seat becomes free.`)) {
                        act(() => removeCorporateMember(selected.id, m.userId), "Removed. Their seat is free.");
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            />
          </div>

          {(selected.members?.length ?? 0) === 0 && (
            <button
              type="button"
              className="mt-6 text-xs text-red-600 hover:underline"
              onClick={() => {
                if (window.confirm(`Delete ${selected.name}? This can't be undone.`)) {
                  act(async () => {
                    await deleteCorporateClient(selected.id);
                    setSelected(null);
                  }, "Company deleted.");
                }
              }}
            >
              Delete this company
            </button>
          )}
        </section>
      )}

      <section className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Seats (used / paid)</th>
              <th className="px-4 py-2">Staff</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No companies yet.
                </td>
              </tr>
            )}
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 align-top">
                <td className="px-4 py-2">
                  <div className="font-medium text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-500">
                    {COUNTRIES.find((x) => x.code === c.country)?.name ?? c.country}
                    {c.status === "suspended" && <span className="ml-1 text-red-600">· suspended</span>}
                  </div>
                </td>
                <td className="px-4 py-2 text-xs text-gray-700">
                  {c.seats.length === 0
                    ? "—"
                    : c.seats.map((s) => (
                        <div key={s.courseId}>
                          {s.courseTitle}: {s.used} / {s.seats}
                        </div>
                      ))}
                </td>
                <td className="px-4 py-2">{c.memberCount ?? 0}</td>
                <td className="px-4 py-2">
                  <button type="button" className="text-sm text-blue-600 hover:underline" onClick={() => openClient(c.id)}>
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
