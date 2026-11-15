import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
// per course, the staff sign-up link to send them, and their staff's progress. Since
// 2026-11-15 also universities: student places on the graduate courses, their
// representatives (manager login) and any group discount agreed with them.

const COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "ZA", name: "South Africa" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
];

type ClientType = "company" | "university";

interface FormState {
  clientType: ClientType;
  representativeEmails: string;
  discountPercent: string;
  name: string;
  country: string;
  contactName: string;
  contactEmail: string;
  emailDomain: string;
  notes: string;
  status: "active" | "suspended";
  seats: Record<string, { seats: string; expiresAt: string }>;
}

function emptyForm(courses: CorporateCourseOption[], clientType: ClientType = "company"): FormState {
  return {
    clientType,
    representativeEmails: "",
    discountPercent: "",
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
  const form = emptyForm(courses, client.clientType ?? "company");
  return {
    ...form,
    representativeEmails: (client.representativeEmails ?? []).join("\n"),
    discountPercent: client.discountPercent === null || client.discountPercent === undefined ? "" : String(client.discountPercent),
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

function toInput(form: FormState, existing: CorporateClient | null, courseIds: Set<string>): ClientInput {
  const hadSeat = new Set(existing?.seats.map((s) => s.courseId) ?? []);
  const university = form.clientType === "university";
  return {
    ...(existing ? {} : { clientType: form.clientType }),
    ...(university
      ? {
          representativeEmails: parseEmailList(form.representativeEmails),
          discountPercent: form.discountPercent.trim() === "" ? null : Number(form.discountPercent),
        }
      : {}),
    name: form.name,
    country: form.country,
    contactName: form.contactName,
    contactEmail: form.contactEmail,
    emailDomain: form.emailDomain,
    notes: form.notes,
    status: form.status,
    seats: Object.entries(form.seats)
      .filter(([courseId]) => courseIds.has(courseId))
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
  const [universityCourses, setUniversityCourses] = useState<CorporateCourseOption[]>([]);
  const [typeFilter, setTypeFilter] = useState<"all" | ClientType>("all");
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
    setUniversityCourses(data.universityCourses ?? []);
    return data;
  }

  // /admin/corporate-clients?client=<id> opens that company (linked from /admin/corporate-orders).
  const [searchParams] = useSearchParams();
  const linkedClientId = searchParams.get("client");

  useEffect(() => {
    reload()
      .then(() => (linkedClientId ? openClient(linkedClientId) : undefined))
      .catch(() => setError("Couldn't load companies."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const allCourses = [...courses, ...universityCourses];
  const coursesFor = (type: ClientType) => (type === "university" ? universityCourses : courses);

  function startCreate(clientType: ClientType) {
    setEditing(null);
    setSelected(null);
    setForm(emptyForm(allCourses, clientType));
  }

  function startEdit(client: CorporateClient) {
    setEditing(client);
    setForm(formFromClient(client, allCourses));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const ids = new Set(coursesFor(form.clientType).map((c) => c.id));
      const saved = editing
        ? await updateCorporateClient(editing.id, toInput(form, editing, ids))
        : await createCorporateClient(toInput(form, null, ids));
      await reload();
      setSelected(saved);
      setForm(null);
      setEditing(null);
      setNotice(
        editing
          ? "Saved."
          : form.clientType === "university"
            ? "University created. Send the representative the student sign-up link below: signing up with a representative email gives them the manager login."
            : "Company created. Send them the staff sign-up link below.",
      );
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save."));
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
        <h1 className="text-2xl font-semibold text-gray-900">Corporate &amp; university clients</h1>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => startCreate("company")}>Add a company</Button>
          <Button variant="secondary" onClick={() => startCreate("university")}>
            Add a university
          </Button>
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Set up each company that has paid for a corporate programme, with its number of seats per course. Staff create
        their own login with the company's sign-up link; each course they take uses one seat and is unlocked straight
        away. Tick <strong>Manager</strong> for the company's HR/training lead so they can see progress and invite staff
        at /company.
      </p>
      <p className="mt-2 text-sm text-gray-600">
        <strong>Universities</strong> buy student places on the graduate courses (online at /ng, /za, /ke or
        /gh/universities, or set up here after an invoice). Anyone on the university's{" "}
        <strong>representatives</strong> list who signs up with its link gets the manager login at /university. The
        group discount tiers are set on{" "}
        <Link to="/admin/university-discounts" className="text-blue-600 hover:underline">
          University discounts
        </Link>
        ; an <strong>agreed discount</strong> here overrides them for that university when it is bigger.
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
          <h2 className="text-lg font-semibold text-gray-900">
            {editing ? `Edit ${editing.name}` : form.clientType === "university" ? "Add a university" : "Add a company"}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              {form.clientType === "university" ? "University, polytechnic or college" : "Company name"}
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
              {form.clientType === "university" ? "Student email domain (optional)" : "Work email domain (optional)"}
              <input
                value={form.emailDomain}
                onChange={(e) => setForm({ ...form, emailDomain: e.target.value })}
                placeholder={form.clientType === "university" ? "e.g. students.unilag.edu.ng" : "e.g. company.com"}
                className={inputClass}
              />
              <span className="mt-1 block text-xs font-normal text-gray-500">
                {form.clientType === "university"
                  ? "If set, students can only sign up with an email at this domain. Leave empty if students use personal emails."
                  : "If set, staff can only sign up with an email at this domain."}
              </span>
            </label>
            {form.clientType === "university" && (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Representatives' emails (manager login)
                  <textarea
                    rows={3}
                    value={form.representativeEmails}
                    onChange={(e) => setForm({ ...form, representativeEmails: e.target.value })}
                    placeholder="One per line, e.g. careers@university.edu"
                    className={inputClass}
                  />
                  <span className="mt-1 block text-xs font-normal text-gray-500">
                    Each one gets the manager login when they sign up with the university's link (or straight away if
                    they already have). The contact email always counts.
                  </span>
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Agreed group discount % (optional)
                  <input
                    type="number"
                    min={0}
                    max={90}
                    value={form.discountPercent}
                    onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
                    placeholder="Standard tiers"
                    className={inputClass}
                  />
                  <span className="mt-1 block text-xs font-normal text-gray-500">
                    Used when their representative buys more places at /university, if bigger than the standard tier.
                  </span>
                </label>
              </>
            )}
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

          <h3 className="mt-6 text-sm font-semibold text-gray-900">
            {form.clientType === "university" ? "Student places paid for" : "Seats paid for"}
          </h3>
          <div className="mt-2 flex flex-col gap-3">
            {coursesFor(form.clientType).map((c) => (
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
              {editing ? "Save changes" : form.clientType === "university" ? "Create university" : "Create company"}
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
              <h2 className="text-xl font-semibold text-gray-900">
                {selected.name}
                {selected.clientType === "university" && (
                  <span className="ml-2 rounded bg-purple-100 px-2 py-0.5 align-middle text-xs font-medium text-purple-800">
                    University
                  </span>
                )}
              </h2>
              <p className="text-sm text-gray-600">
                {COUNTRIES.find((c) => c.code === selected.country)?.name ?? selected.country}
                {selected.contactName ? ` · ${selected.contactName}` : ""}
                {selected.contactEmail ? ` · ${selected.contactEmail}` : ""}
                {selected.emailDomain ? ` · staff emails @${selected.emailDomain}` : ""}
              </p>
              {selected.status === "suspended" && <p className="mt-1 text-sm font-medium text-red-600">Suspended</p>}
              {selected.clientType === "university" && (
                <p className="mt-1 text-sm text-gray-600">
                  Representatives:{" "}
                  {selected.representativeEmails?.length ? selected.representativeEmails.join(", ") : selected.contactEmail ?? "none yet"}
                  {" · "}
                  Discount:{" "}
                  {selected.discountPercent !== null && selected.discountPercent !== undefined
                    ? `${selected.discountPercent}% agreed`
                    : "standard tiers"}
                </p>
              )}
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

          <h3 className="mt-5 text-sm font-semibold text-gray-900">
            {selected.clientType === "university" ? "Student sign-up link" : "Staff sign-up link"}
          </h3>
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
              Email the sign-up link to {selected.clientType === "university" ? "students" : "staff"}
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
            <h3 className="text-sm font-semibold text-gray-900">
              {selected.clientType === "university" ? "Students and representatives" : "Staff"} ({selected.members?.length ?? 0})
            </h3>
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
                    {selected.clientType === "university" ? "Representative" : "Manager"}
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

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {(["all", "company", "university"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTypeFilter(t)}
            className={`rounded-full border px-3 py-1 ${typeFilter === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300 text-gray-700"}`}
          >
            {t === "all" ? "All" : t === "company" ? "Companies" : "Universities"} (
            {t === "all" ? clients.length : clients.filter((c) => (c.clientType ?? "company") === t).length})
          </button>
        ))}
      </div>
      <section className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2">Organisation</th>
              <th className="px-4 py-2">Seats (used / paid)</th>
              <th className="px-4 py-2">Staff</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  None yet.
                </td>
              </tr>
            )}
            {clients.filter((c) => typeFilter === "all" || (c.clientType ?? "company") === typeFilter).map((c) => (
              <tr key={c.id} className="border-b border-gray-100 align-top">
                <td className="px-4 py-2">
                  <div className="font-medium text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-500">
                    {c.clientType === "university" ? "University · " : ""}
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
