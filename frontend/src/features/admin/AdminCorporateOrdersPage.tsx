import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiErrorMessage } from "../../api/corporate.api";
import {
  cancelCorporateOrder,
  CorporateOrder,
  CorporateOrderStatus,
  fetchCorporateOrders,
  markCorporateOrderPaid,
} from "../../api/corporateOrders.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { downloadCsv } from "../corporate/StaffTables";

// /admin/corporate-orders (2026-11-12) -- every "Buy learner places" order from the
// corporate pages: paid on Flutterwave (company set up automatically), checkouts opened
// but not paid, and invoice requests (200+ learners, or the buyer asked). An invoice that
// has been paid by bank transfer is marked paid here, which sets the company up and
// emails the buyer their staff link, exactly as an online payment does.

const STATUS_LABELS: Record<CorporateOrderStatus, string> = {
  paid: "Paid",
  invoice_requested: "Invoice requested",
  pending: "Awaiting payment",
  failed: "Failed",
  cancelled: "Cancelled",
};

const STATUS_CLASSES: Record<CorporateOrderStatus, string> = {
  paid: "bg-green-50 text-green-700 ring-green-200",
  invoice_requested: "bg-amber-50 text-amber-800 ring-amber-200",
  pending: "bg-gray-100 text-gray-700 ring-gray-200",
  failed: "bg-red-50 text-red-700 ring-red-200",
  cancelled: "bg-gray-50 text-gray-500 ring-gray-200",
};

const REGION_NAMES: Record<string, string> = { NG: "Nigeria", GH: "Ghana", KE: "Kenya", ZA: "South Africa" };

type Filter = "all" | CorporateOrderStatus;
const FILTERS: Filter[] = ["all", "paid", "invoice_requested", "pending", "cancelled"];

function formatDate(value: string | null): string {
  return value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
}

function where(o: CorporateOrder): string {
  return o.region === "INTL" ? `${o.buyerCountry ?? "Other"} (GBP)` : (REGION_NAMES[o.region] ?? o.region);
}

function ordersCsv(orders: CorporateOrder[]): string {
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const rows: (string | number)[][] = [
    ["Date", "Status", "Organisation", "Contact", "Email", "Phone", "Country", "Programme", "Learners", "Currency", "Price per learner", "Discount %", "Total", "Paid on", "Order ref", "Flutterwave transaction"],
  ];
  for (const o of orders) {
    rows.push([
      formatDate(o.createdAt),
      STATUS_LABELS[o.status],
      o.organisation,
      o.contactName,
      o.contactEmail,
      o.phone ?? "",
      where(o),
      o.programmeName,
      o.seats,
      o.currency,
      o.unitPrice,
      o.discountPercent,
      o.total,
      formatDate(o.paidAt),
      o.txRef,
      o.flutterwaveTransactionId ?? "",
    ]);
  }
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}

function StatTile({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
      {hint ? <p className="mt-0.5 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

// Revenue per currency: the orders are in five currencies, so they're never added together.
function revenueByCurrency(orders: CorporateOrder[]): string {
  const sums = new Map<string, { label: string; total: number; region: string }>();
  for (const o of orders.filter((x) => x.status === "paid")) {
    const s = sums.get(o.currency) ?? { label: "", total: 0, region: o.region };
    s.total += o.total;
    sums.set(o.currency, s);
  }
  if (sums.size === 0) return "None yet";
  const symbol: Record<string, string> = { NGN: "₦", GHS: "GH₵", KES: "KSh ", ZAR: "R", GBP: "£" };
  return [...sums.entries()].map(([cur, s]) => `${symbol[cur] ?? `${cur} `}${s.total.toLocaleString("en-GB")}`).join(" · ");
}

export function AdminCorporateOrdersPage() {
  const [orders, setOrders] = useState<CorporateOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  // Two-step confirm on the row's own buttons (no browser pop-ups).
  const [confirming, setConfirming] = useState<{ id: string; action: "paid" | "cancel" } | null>(null);
  const [working, setWorking] = useState<string | null>(null);

  useEffect(() => {
    fetchCorporateOrders()
      .then(setOrders)
      .catch(() => setError("Couldn't load corporate orders."))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (filter === "all" || o.status === filter) &&
        (!q || [o.organisation, o.contactName, o.contactEmail, o.txRef].some((v) => v.toLowerCase().includes(q))),
    );
  }, [orders, filter, search]);

  const count = (s: CorporateOrderStatus) => orders.filter((o) => o.status === s).length;
  const paidLearners = orders.filter((o) => o.status === "paid").reduce((n, o) => n + o.seats, 0);

  async function run(order: CorporateOrder, action: "paid" | "cancel") {
    if (!confirming || confirming.id !== order.id || confirming.action !== action) {
      setConfirming({ id: order.id, action });
      return;
    }
    setConfirming(null);
    setWorking(order.id);
    setError(null);
    setNotice(null);
    try {
      setOrders(action === "paid" ? await markCorporateOrderPaid(order.id) : await cancelCorporateOrder(order.id));
      setNotice(
        action === "paid"
          ? `${order.organisation} is set up. Their staff sign-up link has been emailed to ${order.contactEmail}.`
          : `Order for ${order.organisation} cancelled.`,
      );
    } catch (err) {
      setError(apiErrorMessage(err, "That didn't work."));
    } finally {
      setWorking(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/admin" className="text-sm text-blue-600 hover:underline">
            ← Admin dashboard
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">Corporate orders</h1>
          <p className="mt-1 text-sm text-gray-600">
            &ldquo;Buy learner places&rdquo; orders from the corporate pages. Paid orders set the company up automatically; invoice
            requests are set up here once the invoice is paid.
          </p>
        </div>
        <Button
          variant="secondary"
          className="whitespace-nowrap"
          onClick={() => downloadCsv("corporate-orders.csv", ordersCsv(visible))}
          disabled={visible.length === 0}
        >
          Download CSV
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Paid orders" value={count("paid")} hint={`${paidLearners} learner places`} />
        <StatTile label="Revenue (paid)" value={revenueByCurrency(orders)} />
        <StatTile label="Invoice requests" value={count("invoice_requested")} hint="Send invoice, then mark paid" />
        <StatTile label="Awaiting payment" value={count("pending")} hint="Checkout opened, not paid yet" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${
                filter === f ? "bg-blue-600 text-white ring-blue-600" : "bg-white text-gray-700 ring-gray-300 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? `All (${orders.length})` : `${STATUS_LABELS[f]} (${count(f)})`}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search organisation, contact or ref"
          aria-label="Search orders"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:w-72"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {error && <Alert message={error} />}
        {notice && <Alert message={notice} variant="success" />}
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Organisation</th>
              <th className="px-4 py-3">Programme</th>
              <th className="px-4 py-3">Learners</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Company</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  {orders.length === 0 ? "No corporate orders yet." : "No orders match."}
                </td>
              </tr>
            ) : (
              visible.map((o) => {
                const open = o.status === "invoice_requested" || o.status === "pending";
                const confirmPaid = confirming?.id === o.id && confirming.action === "paid";
                const confirmCancel = confirming?.id === o.id && confirming.action === "cancel";
                return (
                  <tr key={o.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      {formatDate(o.createdAt)}
                      <div className="text-xs text-gray-400">{o.txRef}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{o.organisation}</div>
                      <div className="text-gray-600">{o.contactName}</div>
                      <a href={`mailto:${o.contactEmail}`} className="text-blue-600 hover:underline">
                        {o.contactEmail}
                      </a>
                      {o.phone ? <div className="text-gray-500">{o.phone}</div> : null}
                      <div className="text-xs text-gray-500">{where(o)}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{o.programmeName}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">{o.seats}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="font-semibold text-gray-900">{o.totalLabel}</div>
                      <div className="text-xs text-gray-500">
                        {o.unitPriceLabel} each{o.discountPercent ? `, ${o.discountPercent}% off` : ""}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_CLASSES[o.status]}`}>
                        {STATUS_LABELS[o.status]}
                      </span>
                      {o.paidAt ? <div className="mt-1 text-xs text-gray-500">Paid {formatDate(o.paidAt)}</div> : null}
                      {o.flutterwaveTransactionId ? <div className="text-xs text-gray-400">FW {o.flutterwaveTransactionId}</div> : null}
                    </td>
                    <td className="px-4 py-3">
                      {o.client ? (
                        <Link to={`/admin/corporate-clients?client=${o.client.id}`} className="text-blue-600 hover:underline">
                          Open company →
                        </Link>
                      ) : open ? (
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => run(o, "paid")}
                            isLoading={working === o.id}
                            className="whitespace-nowrap px-3 py-1.5 text-xs"
                          >
                            {confirmPaid ? "Confirm: payment received" : "Mark paid & set up"}
                          </Button>
                          <Button variant={confirmCancel ? "danger" : "secondary"} onClick={() => run(o, "cancel")} className="whitespace-nowrap px-3 py-1.5 text-xs">
                            {confirmCancel ? "Confirm cancel" : "Cancel order"}
                          </Button>
                          {confirmPaid ? (
                            <p className="max-w-[14rem] text-xs text-gray-500">
                              Creates the company with {o.seats} places and emails {o.contactEmail} the staff link.
                            </p>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
