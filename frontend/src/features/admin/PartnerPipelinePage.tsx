import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Select } from "../../components/ui/Select";
import { Spinner } from "../../components/ui/Spinner";
import { COURSE_INTERESTS } from "../auth/RegisterPage";
import { Partner, PartnerCategory, PartnerStatus } from "../../types/api";
import { createPartner, deletePartner, fetchPartners, updatePartner } from "./adminSlice";

// Kept in sync with backend/src/config/index.ts's config.enrolment defaults -- these
// are the same values the lead-nurture emails use, not a separate source of truth.
const DEADLINE = "2026-10-01";
const REGISTRATION_URL = "https://paleontraining.com/welcome";

const CATEGORIES: PartnerCategory[] = [
  "Job Board",
  "NYSC / SAED",
  "University Career Centre",
  "Community Channel",
  "Corporate Employer",
];

const STATUSES: PartnerStatus[] = [
  "not-started",
  "drafted",
  "sent",
  "in-conversation",
  "partnered",
  "declined",
];

const STATUS_LABELS: Record<PartnerStatus, string> = {
  "not-started": "Not started",
  drafted: "Drafted",
  sent: "Sent",
  "in-conversation": "In conversation",
  partnered: "Partnered",
  declined: "Declined",
};

const STATUS_CLASSES: Record<PartnerStatus, string> = {
  "not-started": "bg-gray-100 text-gray-600",
  drafted: "bg-blue-100 text-blue-700",
  sent: "bg-amber-100 text-amber-700",
  "in-conversation": "bg-purple-100 text-purple-700",
  partnered: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

function fmtDate(d: string | null): string {
  if (!d) return "—";
  return new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function fmtDeadline(): string {
  return new Date(`${DEADLINE}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function extractEmail(contact: string | null): string | null {
  const m = (contact ?? "").match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return m ? m[0] : null;
}

function draftForPartner(partner: Partner, course: string): { subject: string; body: string } {
  const deadline = fmtDeadline();
  if (partner.category === "Job Board") {
    return {
      subject: `Free/low-cost digital skills training — ${course} — register by ${deadline}`,
      body:
        `Paleon Training is opening registration for ${course}, a practical, project-based course for Nigerian graduates and NYSC corps members. The course ends in a real capstone project — concrete proof of skill for job applications, not just a certificate.\n\n` +
        `Who it's for: recent graduates, final-year students, and NYSC corps members across Nigeria.\n` +
        `Format: online, project-based.\n` +
        `Registration closes: ${deadline}.\n` +
        `Register: ${REGISTRATION_URL}\n\n` +
        `Contact: hello@paleontraining.com`,
    };
  }
  if (partner.category === "NYSC / SAED" || partner.category === "University Career Centre") {
    const audience = partner.category === "NYSC / SAED" ? "corps members" : "students";
    return {
      subject: `Partnership proposal — practical digital-skills training for your ${audience}`,
      body:
        `Hi ${partner.contactName || "[Name]"},\n\n` +
        `I'm reaching out from Paleon Training, a training provider running practical, project-based digital-skills courses for Nigerian graduates — including ${course}. Each course ends in a real capstone project, giving ${audience} concrete proof of skill for job applications, not just a certificate.\n\n` +
        `I'd like to explore a partnership with ${partner.name} — for example, being listed as a recommended training provider, or a short session introducing the programme to your ${audience} ahead of our next intake, which closes ${deadline}.\n\n` +
        `Would you be open to a discussion about providing your ${audience} with digital skills that could enhance their employability and make them more competitive in the job market?\n\n` +
        `More about the programme: ${REGISTRATION_URL}\n\n` +
        `Best regards,\n\nKen Uwotu\nPaleon Training UK\nhello@paleontraining.com\nhttps://paleontraining.com`,
    };
  }
  if (partner.category === "Corporate Employer") {
    return {
      subject: `Sponsor your team's digital skills development — ${partner.name}`,
      body:
        `Dear ${partner.contactName || "[Name]"},\n\n` +
        `I'm reaching out from Paleon Training, a provider of practical, project-based digital-skills courses — including ${course} — designed for working professionals, not just job seekers.\n\n` +
        `I'd like to explore ${partner.name} nominating and sponsoring employees to participate in our training, to enhance their workplace capabilities, productivity, and career development. Each course ends in a real capstone project, giving your team a concrete, demonstrable skill rather than just a certificate.\n\n` +
        `Would you be open to a discussion about a sponsored cohort for your team?\n\n` +
        `More about the programme: ${REGISTRATION_URL}\n\n` +
        `Best regards,\n\nKen Uwotu\nPaleon Training UK\nhello@paleontraining.com\nhttps://paleontraining.com`,
    };
  }
  return {
    subject: `Paleon Training — ${course} registration is open`,
    body:
      `👋 Sharing in case useful — Paleon Training is running a practical digital-skills course (${course}) for Nigerian graduates and NYSC members, ending in a real project you can show employers. Registration closes ${deadline}. Details: ${REGISTRATION_URL}\n\n` +
      `(Please check this group's own self-promotion rules before posting.)`,
  };
}

interface PartnerFormState {
  name: string;
  category: PartnerCategory;
  sector: string;
  contactName: string;
  contact: string;
  cost: string;
  status: PartnerStatus;
  lastContacted: string;
  renewalDate: string;
  notes: string;
}

const EMPTY_FORM: PartnerFormState = {
  name: "",
  category: "Job Board",
  sector: "",
  contactName: "",
  contact: "",
  cost: "",
  status: "not-started",
  lastContacted: "",
  renewalDate: "",
  notes: "",
};

export function PartnerPipelinePage() {
  const dispatch = useAppDispatch();
  const { partners, partnersStatus, partnersError } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const [editing, setEditing] = useState<Partner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PartnerFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [draftPartner, setDraftPartner] = useState<Partner | null>(null);
  const [draftCourse, setDraftCourse] = useState(COURSE_INTERESTS[0].label);

  const stats = useMemo(() => {
    const counts: Record<PartnerStatus, number> = {
      "not-started": 0,
      drafted: 0,
      sent: 0,
      "in-conversation": 0,
      partnered: 0,
      declined: 0,
    };
    partners.forEach((p) => {
      counts[p.status] = (counts[p.status] ?? 0) + 1;
    });
    return counts;
  }, [partners]);

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [partners, categoryFilter, statusFilter, search]);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(partner: Partner) {
    setEditing(partner);
    setForm({
      name: partner.name,
      category: partner.category,
      sector: partner.sector ?? "",
      contactName: partner.contactName ?? "",
      contact: partner.contact ?? "",
      cost: partner.cost ?? "",
      status: partner.status,
      lastContacted: partner.lastContacted ?? "",
      renewalDate: partner.renewalDate ?? "",
      notes: partner.notes ?? "",
    });
    setShowForm(true);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const input = {
      name: form.name,
      category: form.category,
      sector: form.sector || null,
      // No longer collected in this form (replaced by Contact Name) -- preserve
      // whatever a partner already has (Job Board rows use a real website link)
      // rather than blanking it out on every save.
      url: editing?.url ?? null,
      contactName: form.contactName || null,
      contact: form.contact || null,
      cost: form.cost || null,
      status: form.status,
      lastContacted: form.lastContacted || null,
      renewalDate: form.renewalDate || null,
      notes: form.notes || null,
    };
    const result = editing
      ? await dispatch(updatePartner({ id: editing.id, input }))
      : await dispatch(createPartner(input));
    setSaving(false);
    if (createPartner.fulfilled.match(result) || updatePartner.fulfilled.match(result)) {
      setShowForm(false);
    }
  }

  async function handleDelete() {
    if (!editing) return;
    if (!window.confirm(`Delete ${editing.name}? This can't be undone.`)) return;
    await dispatch(deletePartner(editing.id));
    setShowForm(false);
  }

  function openDraft(partner: Partner) {
    setDraftPartner(partner);
    setDraftCourse(COURSE_INTERESTS[0].label);
  }

  async function markStatus(status: PartnerStatus) {
    if (!draftPartner) return;
    await dispatch(
      updatePartner({
        id: draftPartner.id,
        input: { status, lastContacted: new Date().toISOString().slice(0, 10) },
      }),
    );
    setDraftPartner(null);
  }

  const draft = draftPartner ? draftForPartner(draftPartner, draftCourse) : null;
  const draftEmail = draftPartner ? extractEmail(draftPartner.contact) : null;
  const mailtoHref =
    draft && draftEmail
      ? `mailto:${draftEmail}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
      : undefined;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        &larr; Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Partner Pipeline</h1>
      <p className="mt-1 text-sm text-gray-500">
        Every job board, NYSC/SAED channel, and university career centre worth registering or
        partnering with to reach Nigerian graduate leads &mdash; tracked from first contact to
        partnered.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STATUSES.map((s) => (
          <div key={s} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="text-xl font-semibold tabular-nums text-gray-900">{stats[s]}</div>
            <div className="text-xs text-gray-500">{STATUS_LABELS[s]}</div>
          </div>
        ))}
      </div>

      {partnersError && <Alert message={partnersError} />}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[200px] flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <Button onClick={openAdd}>+ Add partner</Button>
      </div>

      {partnersStatus === "loading" && partners.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : filtered.length > 0 ? (
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Last contacted</th>
                <th className="px-4 py-2">Renewal</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {p.url ? (
                      <a
                        href={p.url.startsWith("http") ? p.url : `https://${p.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 underline decoration-gray-300 hover:text-blue-600"
                      >
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                    {p.sector && <div className="text-xs text-gray-400">{p.sector}</div>}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{p.category}</td>
                  <td className="px-4 py-2 text-gray-600">{p.contact || "—"}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[p.status]}`}>
                      {STATUS_LABELS[p.status]}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{fmtDate(p.lastContacted)}</td>
                  <td className="px-4 py-2 text-gray-600">{fmtDate(p.renewalDate)}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => openDraft(p)}
                      className="mr-3 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      className="text-xs font-medium text-gray-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">No partners match this filter.</p>
      )}

      {showForm && (
        <Modal title={editing ? "Edit partner" : "Add partner"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <Input
              id="partner-name"
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                id="partner-category"
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as PartnerCategory })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
              <Input
                id="partner-sector"
                label="Sector (job boards & corporate employers)"
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
                placeholder="General, Oil & Gas, Telecom, Banking"
              />
            </div>
            <Input
              id="partner-contact-name"
              label="Contact Name"
              value={form.contactName}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              placeholder="e.g. the Vice-Chancellor or Career Centre contact's name"
            />
            <Input
              id="partner-contact"
              label="Contact (person, email, or phone)"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
            <Input
              id="partner-cost"
              label="Cost / terms"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                id="partner-status"
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as PartnerStatus })}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </Select>
              <Input
                id="partner-last-contacted"
                type="date"
                label="Last contacted"
                value={form.lastContacted}
                onChange={(e) => setForm({ ...form, lastContacted: e.target.value })}
              />
            </div>
            <Input
              id="partner-renewal"
              type="date"
              label="Renewal date (optional)"
              value={form.renewalDate}
              onChange={(e) => setForm({ ...form, renewalDate: e.target.value })}
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="partner-notes" className="text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="partner-notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              {editing ? (
                <Button type="button" variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={saving}>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {draftPartner && draft && (
        <Modal title={`Draft for ${draftPartner.name}`} onClose={() => setDraftPartner(null)}>
          <p className="text-sm text-gray-500">
            {draftPartner.category}
            {draftPartner.sector ? ` · ${draftPartner.sector}` : ""}
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <label htmlFor="draft-course" className="text-sm font-medium text-gray-700">
              Course to feature
            </label>
            <select
              id="draft-course"
              value={draftCourse}
              onChange={(e) => setDraftCourse(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {COURSE_INTERESTS.map((c) => (
                <option key={c.slug} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <pre className="mt-3 max-h-80 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-gray-800">
            {`Subject: ${draft.subject}\n\n${draft.body}`}
          </pre>
          <p className="mt-2 text-xs text-gray-500">
            {draftEmail
              ? `Opens your email client, addressed to ${draftEmail}.`
              : "Add a contact email on this partner (Edit) to enable one-click send."}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                navigator.clipboard?.writeText(`Subject: ${draft.subject}\n\n${draft.body}`).catch(() => {});
              }}
            >
              Copy to clipboard
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => markStatus("drafted")}>
                Mark as Drafted
              </Button>
              <Button type="button" variant="secondary" onClick={() => markStatus("sent")}>
                Mark as Sent
              </Button>
              <a
                href={mailtoHref}
                onClick={(e) => {
                  if (!mailtoHref) {
                    e.preventDefault();
                    return;
                  }
                  markStatus("sent");
                }}
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  mailtoHref
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }`}
              >
                Send email
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
