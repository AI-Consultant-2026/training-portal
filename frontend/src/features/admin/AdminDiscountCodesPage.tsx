import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDiscountCode, deleteDiscountCode, fetchDiscountCodes, updateDiscountCode } from "../../api/admin.api";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { DiscountCode } from "../../types/api";

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

// <input type="datetime-local"> works in the admin's own time zone with no offset.
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function apiError(err: unknown, fallback: string): string {
  return (
    (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? fallback
  );
}

function statusOf(code: DiscountCode): { label: string; className: string } {
  if (!code.active) return { label: "Off", className: "bg-gray-100 text-gray-700" };
  if (code.expiresAt && new Date(code.expiresAt) <= new Date()) {
    return { label: "Expired", className: "bg-amber-100 text-amber-800" };
  }
  return { label: "Live", className: "bg-green-100 text-green-800" };
}

// Discount codes (2026-11-18): a percentage off the course price for any candidate who
// pays in full. Deposits and balances are never discounted.
export function AdminDiscountCodesPage() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [percentOff, setPercentOff] = useState("15");
  const [description, setDescription] = useState("");
  const [expiresLocal, setExpiresLocal] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscountCodes()
      .then(setCodes)
      .catch(() => setError("Couldn't load discount codes."))
      .finally(() => setLoading(false));
  }, []);

  function resetForm() {
    setCode("");
    setPercentOff("15");
    setDescription("");
    setExpiresLocal("");
    setEditingId(null);
  }

  function startEdit(row: DiscountCode) {
    setCode(row.code);
    setPercentOff(String(row.percentOff));
    setDescription(row.description ?? "");
    setExpiresLocal(toLocalInput(row.expiresAt));
    setEditingId(row.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function replace(saved: DiscountCode) {
    setCodes((rows) => rows.map((r) => (r.id === saved.id ? saved : r)));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const existing = codes.find((c) => c.id === editingId);
    const input = {
      code,
      percentOff: Number(percentOff),
      description,
      active: existing?.active ?? true,
      expiresAt: expiresLocal ? new Date(expiresLocal).toISOString() : null,
    };
    try {
      if (editingId) {
        replace(await updateDiscountCode(editingId, input));
      } else {
        const saved = await createDiscountCode(input);
        setCodes((rows) => [saved, ...rows]);
      }
      resetForm();
    } catch (err) {
      setError(apiError(err, "Couldn't save the code."));
    } finally {
      setSaving(false);
    }
  }

  async function toggle(row: DiscountCode) {
    setError(null);
    try {
      replace(
        await updateDiscountCode(row.id, {
          code: row.code,
          percentOff: row.percentOff,
          description: row.description,
          active: !row.active,
          expiresAt: row.expiresAt,
        }),
      );
    } catch (err) {
      setError(apiError(err, "Couldn't update the code."));
    }
  }

  async function remove(row: DiscountCode) {
    setError(null);
    try {
      await deleteDiscountCode(row.id);
      setCodes((rows) => rows.filter((r) => r.id !== row.id));
      if (editingId === row.id) resetForm();
    } catch (err) {
      setError(apiError(err, "Couldn't delete the code."));
    }
  }

  async function copyCode(row: DiscountCode) {
    try {
      await navigator.clipboard.writeText(row.code);
      setCopied(row.id);
    } catch {
      setCopied(null);
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
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        &larr; Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Discount codes</h1>
      <p className="mt-1 text-sm text-gray-600">
        Any candidate can enter a live code on the course payment page. It takes the percentage off the price when
        they pay in full. It never changes the deposit or the balance. Payments made with a code are confirmed
        automatically at the discounted amount, and the admin payment notes show the code used. To apply a code for
        candidates, link them to <span className="font-mono">/courses/&lt;course&gt;/pay/card?code=CODE</span>.
      </p>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit code" : "Create a code"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            Code
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
              pattern="[A-Za-z0-9_\-]{3,40}"
              placeholder="FULLPAY15"
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Percent off the full price
            <input
              type="number"
              min={1}
              max={90}
              value={percentOff}
              onChange={(e) => setPercentOff(e.target.value)}
              required
              className={inputClass}
            />
          </label>
        </div>
        <label className="mt-4 block text-sm font-medium text-gray-700">
          Note (admins only, optional)
          <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
        </label>
        <label className="mt-4 block text-sm font-medium text-gray-700">
          Ends (optional, your time)
          <input
            type="datetime-local"
            value={expiresLocal}
            onChange={(e) => setExpiresLocal(e.target.value)}
            className={`${inputClass} block sm:w-64`}
          />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : editingId ? "Save changes" : "Create code"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Off</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ends</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {codes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No discount codes yet.
                </td>
              </tr>
            )}
            {codes.map((row) => {
              const status = statusOf(row);
              return (
                <tr key={row.id}>
                  <td className="px-4 py-3">
                    <p className="font-mono font-semibold text-gray-900">{row.code}</p>
                    {row.description && <p className="text-xs text-gray-500">{row.description}</p>}
                  </td>
                  <td className="px-4 py-3">{row.percentOff}%</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {row.expiresAt
                      ? new Date(row.expiresAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })
                      : "No end date"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => copyCode(row)} className="text-blue-600 hover:underline">
                        {copied === row.id ? "Copied" : "Copy code"}
                      </button>
                      <button type="button" onClick={() => startEdit(row)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button type="button" onClick={() => toggle(row)} className="text-blue-600 hover:underline">
                        {row.active ? "Turn off" : "Turn on"}
                      </button>
                      <button type="button" onClick={() => remove(row)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
