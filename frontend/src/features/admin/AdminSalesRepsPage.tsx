import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createSalesRep,
  deleteSalesRepPayment,
  fetchSalesRep,
  fetchSalesReps,
  recordSalesRepPayment,
  updateSalesRep,
} from "../../api/admin.api";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import {
  SalesRep,
  SalesRepDetail,
  SalesRepInput,
  SalesRepPaymentInput,
  SalesRepPaymentKind,
  SalesRepSaleState,
} from "../../types/api";

// Commission sales reps (2026-10-17). Rules match the Independent Sales Representative
// Agreement: 10% of each fully paid course once the 7-day refund window has passed, 12.5%
// from the 16th sale in a month, ₦30,000 bonus at 10 sales a month. Reps are paid by bank
// transfer; record each payment here so the balance owed stays right.

function today(): string {
  // Nigeria is UTC+1 all year.
  return new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 10);
}

const EMPTY: SalesRepInput = { name: "", email: "", phone: "", startedAt: today(), endedAt: "", notes: "" };

function ngn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatDate(iso: string): string {
  return new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toLocaleDateString("en-GB", { dateStyle: "medium" });
}

function formatMonth(month: string): string {
  return new Date(`${month}-15T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function apiError(err: unknown, fallback: string): string {
  return (
    (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? fallback
  );
}

function shareLink(code: string): string {
  return `${window.location.origin}/register?ref=${code}`;
}

const STATE_LABELS: Record<SalesRepSaleState, { label: string; className: string }> = {
  qualified: { label: "Qualified", className: "bg-green-100 text-green-800" },
  refund_window: { label: "In 7-day refund window", className: "bg-blue-100 text-blue-800" },
  deposit_only: { label: "Deposit paid, balance due", className: "bg-amber-100 text-amber-800" },
  not_paid: { label: "Not paid yet", className: "bg-gray-100 text-gray-700" },
  refunded: { label: "Refunded: no commission", className: "bg-red-100 text-red-800" },
  own_account: { label: "Rep's own account: no commission", className: "bg-red-100 text-red-800" },
  after_agreement: { label: "Qualified after agreement ended", className: "bg-gray-200 text-gray-700" },
};

const KIND_LABELS: Record<SalesRepPaymentKind, string> = {
  commission: "Commission and bonus",
  allowance: "Starter allowance",
  other: "Other (e.g. corporate deal)",
};

// Plain text the admin can paste into WhatsApp or an email with the weekly payment.
function statementText(rep: SalesRepDetail): string {
  const lines = [`Paleon Training: commission statement for ${rep.name} (${rep.code})`, `As of ${formatDate(today())}`, ""];
  const qualified = rep.sales.filter((s) => s.state === "qualified");
  if (qualified.length) {
    lines.push("Qualified sales:");
    for (const s of qualified) {
      lines.push(`- ${s.studentName}, ${s.courseTitle}: ${ngn(s.commissionNgn)} (${s.ratePercent}% of ${ngn(s.courseFeeNgn)})`);
    }
    lines.push("");
  }
  for (const m of rep.months.filter((month) => month.bonusNgn > 0)) {
    lines.push(`Bonus for ${formatMonth(m.month)} (${m.qualifiedSales} sales): ${ngn(m.bonusNgn)}`);
  }
  lines.push(`Total earned: ${ngn(rep.earnedNgn)}`, `Paid so far: ${ngn(rep.paidNgn)}`);
  lines.push(rep.balanceNgn >= 0 ? `Due now: ${ngn(rep.balanceNgn)}` : `To deduct from next payment: ${ngn(-rep.balanceNgn)}`);
  const waiting = rep.sales.filter((s) => s.state === "refund_window");
  if (waiting.length) {
    lines.push("", `Coming up (${waiting.length} in the 7-day refund window): about ${ngn(rep.upcomingNgn)}`);
  }
  return lines.join("\n");
}

export function AdminSalesRepsPage() {
  const [reps, setReps] = useState<SalesRep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<SalesRepInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openRep, setOpenRep] = useState<SalesRepDetail | null>(null);
  const [payment, setPayment] = useState<SalesRepPaymentInput>({ kind: "commission", amountNgn: 0, paidOn: today(), note: "" });

  useEffect(() => {
    fetchSalesReps()
      .then(setReps)
      .catch(() => setError("Couldn't load sales reps."))
      .finally(() => setLoading(false));
  }, []);

  function applyDetail(detail: SalesRepDetail) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sales: _s, months: _m, payments: _p, ...summary } = detail;
    setReps((rows) => (rows.some((r) => r.id === detail.id) ? rows.map((r) => (r.id === detail.id ? summary : r)) : [...rows, summary]));
    setOpenRep(detail);
    setPayment((p) => ({ ...p, amountNgn: Math.max(detail.balanceNgn, 0) }));
  }

  function resetForm() {
    setForm({ ...EMPTY, startedAt: today() });
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(rep: SalesRep) {
    setForm({
      name: rep.name,
      email: rep.email,
      phone: rep.phone ?? "",
      startedAt: rep.startedAt,
      endedAt: rep.endedAt ?? "",
      notes: rep.notes ?? "",
    });
    setEditingId(rep.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const saved = editingId ? await updateSalesRep(editingId, form) : await createSalesRep(form);
      applyDetail(saved);
      setNotice(editingId ? `Saved ${saved.name}.` : `Added ${saved.name}. Their code is ${saved.code}.`);
      resetForm();
    } catch (err) {
      setError(apiError(err, "Couldn't save the rep. Check the email and dates."));
    } finally {
      setSaving(false);
    }
  }

  async function open(rep: SalesRep) {
    if (openRep?.id === rep.id) {
      setOpenRep(null);
      return;
    }
    setError(null);
    try {
      applyDetail(await fetchSalesRep(rep.id));
    } catch {
      setError("Couldn't load that rep's sales.");
    }
  }

  async function handlePayment(e: FormEvent) {
    e.preventDefault();
    if (!openRep) return;
    setError(null);
    try {
      applyDetail(await recordSalesRepPayment(openRep.id, payment));
      setNotice(`Recorded ${ngn(payment.amountNgn)} paid to ${openRep.name}.`);
      setPayment((p) => ({ ...p, note: "" }));
    } catch (err) {
      setError(apiError(err, "Couldn't record the payment."));
    }
  }

  async function handleDeletePayment(paymentId: string) {
    if (!openRep || !window.confirm("Remove this payment record? Only do this if it was recorded by mistake.")) return;
    try {
      applyDetail(await deleteSalesRepPayment(openRep.id, paymentId));
    } catch {
      setError("Couldn't remove that payment.");
    }
  }

  async function copy(text: string, what: string) {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(`Copied ${what}.`);
    } catch {
      setError("Couldn't copy. Select the text and copy it by hand.");
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
  const buttonClass = "rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50";

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        ← Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Sales reps</h1>
      <p className="mt-1 max-w-3xl text-sm text-gray-600">
        Each rep has a REP code. Students who register with it are theirs for good, and get no ambassador welcome bonus.
        A sale qualifies when the student has paid the course in full and 7 days have passed since their first payment
        without a refund. Commission is 10% of the course fee, 12.5% from the 16th sale in a month, plus a ₦30,000 bonus
        in any month with 10 or more sales. Pay reps by bank transfer, then record the payment here.
      </p>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}
      {notice && <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">{notice}</p>}

      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add a sales rep
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit sales rep" : "Add a sales rep"}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              Full name
              <input required minLength={2} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Phone / WhatsApp
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Agreement start date
              <input required type="date" value={form.startedAt} onChange={(e) => setForm({ ...form, startedAt: e.target.value })} className={inputClass} />
            </label>
            {editingId && (
              <label className="block text-sm font-medium text-gray-700">
                Agreement end date (optional)
                <input type="date" value={form.endedAt} onChange={(e) => setForm({ ...form, endedAt: e.target.value })} className={inputClass} />
                <span className="mt-1 block text-xs font-normal text-gray-500">
                  The code stops working after this date. Sales by their students still count for 30 days.
                </span>
              </label>
            )}
          </div>
          <label className="mt-4 block text-sm font-medium text-gray-700">
            Notes (optional): bank details, trial result, agreement signed
            <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputClass} />
          </label>
          <div className="mt-5 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : editingId ? "Save changes" : "Add rep and create code"}
            </button>
            <button type="button" onClick={resetForm} className={buttonClass}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Reps ({reps.length})</h2>
      {reps.length === 0 ? (
        <p className="mt-2 text-sm text-gray-600">No sales reps yet.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-3 py-2">Rep</th>
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2 text-right">Students</th>
                <th className="px-3 py-2 text-right">Deposit only</th>
                <th className="px-3 py-2 text-right">In refund window</th>
                <th className="px-3 py-2 text-right">Qualified</th>
                <th className="px-3 py-2 text-right">Earned</th>
                <th className="px-3 py-2 text-right">Paid</th>
                <th className="px-3 py-2 text-right">Due now</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reps.map((rep) => (
                <tr key={rep.id} className={openRep?.id === rep.id ? "bg-blue-50" : undefined}>
                  <td className="px-3 py-2">
                    <div className="font-medium text-gray-900">{rep.name}</div>
                    <div className="text-xs text-gray-500">
                      {rep.active ? "Active" : `Ended ${formatDate(rep.endedAt!)}`} · since {formatDate(rep.startedAt)}
                    </div>
                    {rep.ambassadorReferrals > 0 && (
                      <div className="text-xs text-amber-700">
                        &#9888; Also has {rep.ambassadorReferrals} ambassador referral(s) under this email
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-mono font-semibold">{rep.code}</div>
                    <button type="button" onClick={() => copy(shareLink(rep.code), "the sign-up link")} className="text-xs text-blue-600 hover:underline">
                      Copy sign-up link
                    </button>
                  </td>
                  <td className="px-3 py-2 text-right">{rep.counts.students}</td>
                  <td className="px-3 py-2 text-right">{rep.counts.depositOnly}</td>
                  <td className="px-3 py-2 text-right">{rep.counts.inRefundWindow}</td>
                  <td className="px-3 py-2 text-right">{rep.counts.qualified}</td>
                  <td className="px-3 py-2 text-right">{ngn(rep.earnedNgn)}</td>
                  <td className="px-3 py-2 text-right">{ngn(rep.paidNgn)}</td>
                  <td className={`px-3 py-2 text-right font-semibold ${rep.balanceNgn < 0 ? "text-red-700" : "text-gray-900"}`}>
                    {ngn(rep.balanceNgn)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    <button type="button" onClick={() => open(rep)} className={buttonClass}>
                      {openRep?.id === rep.id ? "Close" : "Sales"}
                    </button>{" "}
                    <button type="button" onClick={() => startEdit(rep)} className={buttonClass}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openRep && (
        <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {openRep.name} <span className="font-mono text-sm text-gray-500">{openRep.code}</span>
              </h2>
              <p className="text-sm text-gray-600">
                {openRep.email}
                {openRep.phone && ` · ${openRep.phone}`}
              </p>
              {openRep.notes && <p className="mt-1 whitespace-pre-line text-xs text-gray-500">{openRep.notes}</p>}
            </div>
            <button type="button" onClick={() => copy(statementText(openRep), "the statement")} className={buttonClass}>
              Copy statement for WhatsApp
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <div className="rounded-md bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Due now</div>
              <div className={`text-lg font-semibold ${openRep.balanceNgn < 0 ? "text-red-700" : "text-gray-900"}`}>
                {ngn(openRep.balanceNgn)}
              </div>
              {openRep.balanceNgn < 0 && <div className="text-xs text-red-700">Refund after payment: deduct from the next payment</div>}
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Coming up (refund window)</div>
              <div className="text-lg font-semibold text-gray-900">{ngn(openRep.upcomingNgn)}</div>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Earned / paid</div>
              <div className="text-lg font-semibold text-gray-900">
                {ngn(openRep.earnedNgn)} / {ngn(openRep.paidNgn)}
              </div>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Allowance / other paid</div>
              <div className="text-lg font-semibold text-gray-900">
                {ngn(openRep.allowancePaidNgn)} / {ngn(openRep.otherPaidNgn)}
              </div>
            </div>
          </div>

          <h3 className="mt-6 font-semibold text-gray-900">Students and sales</h3>
          {openRep.sales.length === 0 ? (
            <p className="mt-1 text-sm text-gray-600">
              {openRep.counts.students > 0
                ? `${openRep.counts.students} student(s) registered with this code, none enrolled yet.`
                : "No students have registered with this code yet."}
            </p>
          ) : (
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="py-2 pr-3">Student</th>
                    <th className="py-2 pr-3">Course</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2 pr-3">Qualifies</th>
                    <th className="py-2 pr-3 text-right">Fee</th>
                    <th className="py-2 text-right">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {openRep.sales.map((sale) => (
                    <tr key={sale.enrollmentId}>
                      <td className="py-2 pr-3">
                        <div className="text-gray-900">{sale.studentName}</div>
                        <div className="text-xs text-gray-500">{sale.studentEmail}</div>
                      </td>
                      <td className="py-2 pr-3">{sale.courseTitle}</td>
                      <td className="py-2 pr-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATE_LABELS[sale.state].className}`}>
                          {STATE_LABELS[sale.state].label}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-gray-600">{sale.qualifiesAt ? formatDate(sale.qualifiesAt) : "—"}</td>
                      <td className="py-2 pr-3 text-right">{ngn(sale.courseFeeNgn)}</td>
                      <td className="py-2 text-right">
                        {sale.state === "qualified" ? `${ngn(sale.commissionNgn)} (${sale.ratePercent}%)` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {openRep.months.length > 0 && (
            <>
              <h3 className="mt-6 font-semibold text-gray-900">By month (Nigeria time)</h3>
              <table className="mt-2 text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="py-1 pr-6">Month</th>
                    <th className="py-1 pr-6 text-right">Qualified sales</th>
                    <th className="py-1 pr-6 text-right">Commission</th>
                    <th className="py-1 text-right">Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {openRep.months.map((m) => (
                    <tr key={m.month}>
                      <td className="py-1 pr-6">{formatMonth(m.month)}</td>
                      <td className="py-1 pr-6 text-right">{m.qualifiedSales}</td>
                      <td className="py-1 pr-6 text-right">{ngn(m.commissionNgn)}</td>
                      <td className="py-1 text-right">{m.bonusNgn ? ngn(m.bonusNgn) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <h3 className="mt-6 font-semibold text-gray-900">Payments</h3>
          <form onSubmit={handlePayment} className="mt-2 grid gap-3 rounded-md bg-gray-50 p-3 sm:grid-cols-5 sm:items-end">
            <label className="block text-xs font-medium text-gray-700">
              Type
              <select
                value={payment.kind}
                onChange={(e) => setPayment({ ...payment, kind: e.target.value as SalesRepPaymentKind })}
                className={inputClass}
              >
                {(Object.keys(KIND_LABELS) as SalesRepPaymentKind[]).map((kind) => (
                  <option key={kind} value={kind}>
                    {KIND_LABELS[kind]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium text-gray-700">
              Amount (₦)
              <input
                required
                type="number"
                min={1}
                value={payment.amountNgn || ""}
                onChange={(e) => setPayment({ ...payment, amountNgn: Number(e.target.value) })}
                className={inputClass}
              />
            </label>
            <label className="block text-xs font-medium text-gray-700">
              Paid on
              <input
                required
                type="date"
                value={payment.paidOn}
                onChange={(e) => setPayment({ ...payment, paidOn: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block text-xs font-medium text-gray-700">
              Note
              <input
                value={payment.note}
                onChange={(e) => setPayment({ ...payment, note: e.target.value })}
                placeholder="e.g. bank transfer ref"
                className={inputClass}
              />
            </label>
            <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Record payment
            </button>
          </form>
          {openRep.payments.length === 0 ? (
            <p className="mt-2 text-sm text-gray-600">No payments recorded yet.</p>
          ) : (
            <ul className="mt-2 divide-y divide-gray-100 text-sm">
              {openRep.payments.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2">
                  <span>
                    <span className="font-medium text-gray-900">{ngn(p.amountNgn)}</span> · {KIND_LABELS[p.kind]} ·{" "}
                    {formatDate(p.paidOn)}
                    {p.note && <span className="text-gray-500"> · {p.note}</span>}
                  </span>
                  <button type="button" onClick={() => handleDeletePayment(p.id)} className="text-xs text-red-700 hover:underline">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
