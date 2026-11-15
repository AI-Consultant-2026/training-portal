import { FormEvent, useState } from "react";
import { apiErrorMessage, buyMoreUniversityPlaces, universityPercent, UniversityBuyInfo } from "../../api/corporate.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";

// "Buy more places" for a university representative on /university (2026-11-15). The
// server prices the order again (group discount per course, or the university's agreed
// discount if bigger); this only previews it. Payment opens Flutterwave, or an invoice
// is requested; once paid the places are added and students keep the same link.
export function BuyMorePlaces({ buy }: { buy: UniversityBuyInfo }) {
  const [seats, setSeats] = useState<Record<string, string>>({});
  const [invoice, setInvoice] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const money = (n: number) => `${buy.currency.symbol}${buy.currency.spaced ? " " : ""}${n.toLocaleString("en-GB")}`;
  const lines = buy.courses
    .map((c) => {
      const n = Math.floor(Number(seats[c.slug] ?? 0));
      if (!(n > 0)) return null;
      const off = universityPercent(n, buy.tiers, buy.agreedPercent);
      const unit = Math.round(c.listPrice * (1 - off / 100));
      return { slug: c.slug, title: c.title, seats: n, off, unit, total: unit * n };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);
  const total = lines.reduce((s, l) => s + l.total, 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (lines.length === 0) {
      setError("Enter the number of places for at least one course.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await buyMoreUniversityPlaces({
        items: lines.map((l) => ({ courseSlug: l.slug, seats: l.seats })),
        payByInvoice: invoice,
      });
      if (result.kind === "checkout") {
        window.location.href = result.paymentLink;
        return;
      }
      setDone("Thank you. We will email you an invoice within one working day; the places are added as soon as it is paid.");
      setSeats({});
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't start the order. Please try again."));
    } finally {
      setBusy(false);
    }
  }

  const tierText = buy.tiers.map((t) => `${t.percent}% off from ${t.minLearners} places`).join(", ");

  return (
    <form onSubmit={handleSubmit} className="mt-5 border-t border-gray-100 pt-4">
      <h3 className="text-base font-semibold text-gray-900">Buy more places</h3>
      <p className="mt-1 text-sm text-gray-600">
        Group discount on each course: {tierText || "none"}.
        {buy.agreedPercent ? ` Your university's agreed rate: at least ${buy.agreedPercent}% off.` : ""} Students keep
        using the same sign-up link.
      </p>
      {error && (
        <div className="mt-3">
          <Alert message={error} />
        </div>
      )}
      {done && <div className="mt-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{done}</div>}
      <div className="mt-3 flex flex-col gap-2">
        {buy.courses.map((c) => (
          <label key={c.slug} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-gray-200 p-3 text-sm">
            <span>
              <span className="font-medium text-gray-900">{c.title}</span>{" "}
              <span className="text-gray-500">({money(c.listPrice)} each before discount)</span>
            </span>
            <input
              type="number"
              min={0}
              max={20000}
              inputMode="numeric"
              aria-label={`Places on ${c.title}`}
              value={seats[c.slug] ?? ""}
              placeholder="0"
              onChange={(e) => setSeats({ ...seats, [c.slug]: e.target.value })}
              className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </label>
        ))}
      </div>
      {lines.length > 0 && (
        <div className="mt-3 rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-gray-800">
          {lines.map((l) => (
            <div key={l.slug}>
              {l.title}: {l.seats} × {money(l.unit)}
              {l.off ? ` (${l.off}% off)` : ""} = {money(l.total)}
            </div>
          ))}
          <div className="mt-1 font-semibold">Total: {money(total)}</div>
        </div>
      )}
      <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={invoice} onChange={(e) => setInvoice(e.target.checked)} />
        Send us an invoice instead (pay by bank transfer)
      </label>
      <Button type="submit" className="mt-3" isLoading={busy} disabled={lines.length === 0}>
        {invoice ? "Request an invoice" : "Continue to secure payment"}
      </Button>
    </form>
  );
}
