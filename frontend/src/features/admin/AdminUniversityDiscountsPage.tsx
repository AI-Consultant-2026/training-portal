import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiErrorMessage, DiscountTier, fetchUniversityDiscounts, saveUniversityDiscounts } from "../../api/corporate.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";

// /admin/university-discounts (2026-11-15) -- the group discount universities get when
// they buy places for their students: a percentage off the course fee, by the number of
// places bought on each course. The /<country>/universities pages, the online checkout and
// representatives' "Buy more places" all read these tiers. A discount agreed with one
// university is set on that university in Corporate & university clients.

interface Row {
  minLearners: string;
  percent: string;
}

const toRows = (tiers: DiscountTier[]): Row[] =>
  tiers.map((t) => ({ minLearners: String(t.minLearners), percent: String(t.percent) }));

function rangeLabel(rows: Row[], i: number): string {
  const from = Number(rows[i].minLearners);
  const next = rows[i + 1] ? Number(rows[i + 1].minLearners) : null;
  if (!from) return "";
  return next && next > from ? `${from}–${next - 1} learners` : `${from}+ learners`;
}

export function AdminUniversityDiscountsPage() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [defaults, setDefaults] = useState<DiscountTier[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUniversityDiscounts()
      .then((data) => {
        setRows(toRows(data.tiers));
        setDefaults(data.defaults);
      })
      .catch(() => setError("Couldn't load the discounts."));
  }, []);

  function update(i: number, field: keyof Row, value: string) {
    setRows((prev) => prev && prev.map((r, j) => (j === i ? { ...r, [field]: value } : r)));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!rows) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const tiers = await saveUniversityDiscounts(
        rows.map((r) => ({ minLearners: Number(r.minLearners), percent: Number(r.percent) })),
      );
      setRows(toRows(tiers));
      setNotice("Saved. The university pages and checkout use these discounts from now on.");
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save the discounts."));
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-28 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        ← Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">University group discounts</h1>
      <p className="mt-1 text-sm text-gray-600">
        When a university buys places for its students, each course is discounted by the number of places bought on
        it. These tiers are used on the{" "}
        <a href="/ng/universities" className="text-blue-600 hover:underline">
          university pages
        </a>
        , at checkout and when a university representative buys more places. To give one university a different rate,
        set an <strong>agreed discount</strong> on it in{" "}
        <Link to="/admin/corporate-clients" className="text-blue-600 hover:underline">
          Corporate &amp; university clients
        </Link>
        .
      </p>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}
      {notice && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</div>
      )}

      {!rows ? (
        !error && (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        )
      ) : (
        <form onSubmit={handleSave} className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-500">
              <tr>
                <th className="py-2 pr-4">From (learners on one course)</th>
                <th className="py-2 pr-4">Discount %</th>
                <th className="py-2 pr-4">Applies to</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100 text-gray-500">
                <td className="py-2 pr-4">1</td>
                <td className="py-2 pr-4">0</td>
                <td className="py-2 pr-4">
                  {rows[0]?.minLearners ? `1–${Number(rows[0].minLearners) - 1} learners` : "Any number"} (course fee)
                </td>
                <td />
              </tr>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="py-2 pr-4">
                    <input
                      type="number"
                      min={2}
                      required
                      aria-label={`Tier ${i + 1}: fewest learners`}
                      value={r.minLearners}
                      onChange={(e) => update(i, "minLearners", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="py-2 pr-4">
                    <input
                      type="number"
                      min={0}
                      max={90}
                      required
                      aria-label={`Tier ${i + 1}: discount percent`}
                      value={r.percent}
                      onChange={(e) => update(i, "percent", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="py-2 pr-4 text-gray-700">{rangeLabel(rows, i)}</td>
                  <td className="py-2">
                    <button
                      type="button"
                      className="text-sm text-red-600 hover:underline"
                      onClick={() => setRows(rows.filter((_, j) => j !== i))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              disabled={rows.length >= 10}
              onClick={() => setRows([...rows, { minLearners: "", percent: "" }])}
            >
              Add a tier
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setRows(toRows(defaults));
                setNotice(null);
              }}
            >
              Reset to 10% / 20% / 30%
            </Button>
            <Button type="submit" isLoading={saving}>
              Save discounts
            </Button>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Tiers are sorted by number of learners when saved. Discounts must go up as groups get bigger (maximum 90%).
            Orders already placed keep the price they were quoted.
          </p>
        </form>
      )}
    </div>
  );
}
