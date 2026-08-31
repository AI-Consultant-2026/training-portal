import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { StatTile } from "../../components/ui/StatTile";
import { AdminReferral, AdminReferralOverview } from "../../types/api";
import * as referralsApi from "../../api/referrals.api";

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

type RewardFilter = "all" | "pending" | "issued";
type StatusFilter = "all" | "pending" | "qualified" | "void";

export function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<AdminReferral[]>([]);
  const [overview, setOverview] = useState<AdminReferralOverview | null>(null);
  const [status, setStatus] = useState<"loading" | "succeeded" | "failed">("loading");
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [rewardFilter, setRewardFilter] = useState<RewardFilter>("all");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await referralsApi.fetchAdminReferrals({
        status: statusFilter === "all" ? undefined : statusFilter,
        rewardStatus: rewardFilter === "all" ? undefined : rewardFilter,
      });
      setReferrals(data.referrals);
      setOverview(data.overview);
      setStatus("succeeded");
    } catch {
      setStatus("failed");
    }
  }, [statusFilter, rewardFilter]);

  useEffect(() => {
    load();
  }, [load]);

  function replaceRow(updated: AdminReferral) {
    setReferrals((rows) => rows.map((r) => (r.id === updated.id ? updated : r)));
  }

  async function issue(id: string, party: "referrer" | "referee") {
    setBusyId(id);
    setError(null);
    try {
      replaceRow(await referralsApi.issueReferralReward(id, party));
      const data = await referralsApi.fetchAdminReferrals({
        status: statusFilter === "all" ? undefined : statusFilter,
        rewardStatus: rewardFilter === "all" ? undefined : rewardFilter,
      });
      setOverview(data.overview);
    } catch (err) {
      setError(
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not mark that reward as issued",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function voidRow(id: string) {
    const reason = window.prompt("Reason for voiding this referral (optional):") ?? undefined;
    setBusyId(id);
    setError(null);
    try {
      replaceRow(await referralsApi.voidReferral(id, reason));
    } catch (err) {
      setError(
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not void that referral",
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Referrals</h1>
        <Link to="/admin" className="text-sm font-medium text-blue-600 hover:underline">
          ← Admin dashboard
        </Link>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        A referral qualifies when the referred student&apos;s first course payment is confirmed. Pay
        rewards out manually (airtime, data, or course credit) then mark them issued here.
      </p>

      {overview && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Ambassadors" value={overview.totalReferrers} />
          <StatTile label="Pending (not paid)" value={overview.pendingReferrals} />
          <StatTile label="Qualified" value={overview.qualifiedReferrals} />
          <StatTile label="Rewards to pay out" value={formatNgn(overview.rewardsToPayNgn)} />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-gray-500">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-md border border-gray-300 bg-white px-2 py-1"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="qualified">Qualified</option>
            <option value="void">Void</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-gray-500">Reward</span>
          <select
            value={rewardFilter}
            onChange={(e) => setRewardFilter(e.target.value as RewardFilter)}
            className="rounded-md border border-gray-300 bg-white px-2 py-1"
          >
            <option value="all">All</option>
            <option value="pending">Awaiting payout</option>
            <option value="issued">Issued</option>
          </select>
        </label>
      </div>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      {status === "loading" ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : status === "failed" ? (
        <div className="mt-4">
          <Alert message="Could not load referrals." />
        </div>
      ) : referrals.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">No referrals match these filters.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Ambassador</th>
                <th className="px-4 py-2">Referred</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Rewards</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 align-top last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{r.referrer?.name ?? "—"}</div>
                    <div className="text-xs text-gray-500">{r.referrer?.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{r.referee?.name ?? "—"}</div>
                    <div className="text-xs text-gray-500">{r.referee?.email}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{r.code}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.status === "qualified"
                          ? "text-green-700"
                          : r.status === "void"
                            ? "text-gray-400"
                            : "text-amber-600"
                      }
                    >
                      {r.status}
                    </span>
                    {r.qualifiedAt && (
                      <div className="text-xs text-gray-400">
                        {new Date(r.qualifiedAt).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    <div>
                      Ambassador: {formatNgn(r.referrerReward.amountNgn)} {r.referrerReward.type} —{" "}
                      <span
                        className={
                          r.referrerReward.status === "issued" ? "text-green-700" : "text-amber-600"
                        }
                      >
                        {r.referrerReward.status === "issued" ? "issued" : "awaiting"}
                      </span>
                    </div>
                    <div>
                      Friend: {formatNgn(r.refereeReward.amountNgn)} {r.refereeReward.type} —{" "}
                      <span
                        className={
                          r.refereeReward.status === "issued" ? "text-green-700" : "text-amber-600"
                        }
                      >
                        {r.refereeReward.status === "issued" ? "issued" : "awaiting"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {r.status === "qualified" && (
                      <div className="flex flex-col items-end gap-1">
                        {r.referrerReward.status === "pending" && (
                          <button
                            type="button"
                            disabled={busyId === r.id}
                            onClick={() => issue(r.id, "referrer")}
                            className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-50"
                          >
                            Mark ambassador paid
                          </button>
                        )}
                        {r.refereeReward.status === "pending" && (
                          <button
                            type="button"
                            disabled={busyId === r.id}
                            onClick={() => issue(r.id, "referee")}
                            className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-50"
                          >
                            Mark friend paid
                          </button>
                        )}
                      </div>
                    )}
                    {r.status !== "void" &&
                      r.referrerReward.status === "pending" &&
                      r.refereeReward.status === "pending" && (
                        <button
                          type="button"
                          disabled={busyId === r.id}
                          onClick={() => voidRow(r.id)}
                          className="mt-1 text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                        >
                          Void
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminReferralsPage;
