import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { StatTile } from "../../components/ui/StatTile";
import { AdminPayout, AdminReferral, AdminReferralOverview, PayoutConfig } from "../../types/api";
import * as referralsApi from "../../api/referrals.api";
import { SendRewardDialog } from "./SendRewardDialog";

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

type RewardFilter = "all" | "pending" | "issued";
type StatusFilter = "all" | "pending" | "qualified" | "void";
type Party = "referrer" | "referee";

const NETWORK_LABEL: Record<string, string> = { mtn: "MTN", airtel: "Airtel", glo: "Glo", etisalat: "9mobile" };

export function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<AdminReferral[]>([]);
  const [overview, setOverview] = useState<AdminReferralOverview | null>(null);
  const [status, setStatus] = useState<"loading" | "succeeded" | "failed">("loading");
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [rewardFilter, setRewardFilter] = useState<RewardFilter>("all");
  const [payoutConfig, setPayoutConfig] = useState<PayoutConfig | null>(null);
  const [sending, setSending] = useState<{ referral: AdminReferral; party: Party } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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

  const loadPayoutConfig = useCallback(() => {
    referralsApi
      .fetchPayoutConfig()
      .then(setPayoutConfig)
      .catch(() => setPayoutConfig(null));
  }, []);

  useEffect(() => {
    loadPayoutConfig();
  }, [loadPayoutConfig]);

  async function refreshOverview() {
    const data = await referralsApi.fetchAdminReferrals({
      status: statusFilter === "all" ? undefined : statusFilter,
      rewardStatus: rewardFilter === "all" ? undefined : rewardFilter,
    });
    setOverview(data.overview);
  }

  function afterPayout(updated: AdminReferral, message: string) {
    replaceRow(updated);
    if (message) setNotice(message);
    refreshOverview().catch(() => {});
    loadPayoutConfig();
  }

  async function checkStatus(referralId: string, payout: AdminPayout) {
    setBusyId(referralId);
    setError(null);
    setNotice(null);
    try {
      const outcome = await referralsApi.refreshReferralPayout(payout.id);
      afterPayout(
        outcome.referral,
        outcome.status === "delivered"
          ? "VTpass confirmed delivery. Reward marked paid."
          : outcome.status === "failed"
            ? `VTpass says it failed: ${outcome.message}. You can send it again.`
            : "Still processing at VTpass. Try again in a few minutes.",
      );
    } catch (err) {
      setError(
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not check that payout",
      );
    } finally {
      setBusyId(null);
    }
  }

  // VTpass can only send airtime/data, only once nothing is already in flight for that reward.
  function canSend(r: AdminReferral, party: Party): boolean {
    const reward = party === "referrer" ? r.referrerReward : r.refereeReward;
    return (
      !!payoutConfig?.enabled &&
      r.status === "qualified" &&
      reward.status === "pending" &&
      (reward.type === "airtime" || reward.type === "data") &&
      !!r[party]?.phone &&
      r.payouts[party]?.status !== "processing"
    );
  }

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
        A referral qualifies when the referred student&apos;s first course payment is confirmed.{" "}
        {payoutConfig?.enabled
          ? "Send airtime and data through VTpass from here; pay course credit by hand, then mark it paid."
          : "Pay rewards out manually (airtime, data, or course credit) then mark them issued here."}
      </p>
      {payoutConfig?.enabled && (
        <p
          className={`mt-3 inline-block rounded-md px-3 py-1.5 text-xs ${
            payoutConfig.live ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"
          }`}
        >
          VTpass: <strong>{payoutConfig.live ? "Live" : "Test mode (sandbox)"}</strong>
          {payoutConfig.balanceNgn !== null && <> · wallet balance {formatNgn(payoutConfig.balanceNgn)}</>}
          {payoutConfig.balanceProblem && <> · balance unavailable: {payoutConfig.balanceProblem}</>}
        </p>
      )}
      {notice && (
        <p className="mt-3 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-900">{notice}</p>
      )}

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
                    {r.referrer && <PhoneLine phone={r.referrer.phone} />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{r.referee?.name ?? "—"}</div>
                    <div className="text-xs text-gray-500">{r.referee?.email}</div>
                    {r.referee && <PhoneLine phone={r.referee.phone} />}
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
                      {r.payouts.referrer && (
                        <PayoutLine
                          payout={r.payouts.referrer}
                          busy={busyId === r.id}
                          onCheck={() => checkStatus(r.id, r.payouts.referrer!)}
                        />
                      )}
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
                      {r.payouts.referee && (
                        <PayoutLine
                          payout={r.payouts.referee}
                          busy={busyId === r.id}
                          onCheck={() => checkStatus(r.id, r.payouts.referee!)}
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {r.status === "qualified" && (
                      <div className="flex flex-col items-end gap-1">
                        {canSend(r, "referrer") && (
                          <button
                            type="button"
                            disabled={busyId === r.id}
                            onClick={() => {
                              setNotice(null);
                              setSending({ referral: r, party: "referrer" });
                            }}
                            className="text-xs font-semibold text-green-700 hover:underline disabled:opacity-50"
                          >
                            Send {r.referrerReward.type} to ambassador
                          </button>
                        )}
                        {r.referrerReward.status === "pending" && r.payouts.referrer?.status !== "processing" && (
                          <button
                            type="button"
                            disabled={busyId === r.id}
                            onClick={() => issue(r.id, "referrer")}
                            className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-50"
                          >
                            Mark ambassador paid
                          </button>
                        )}
                        {canSend(r, "referee") && (
                          <button
                            type="button"
                            disabled={busyId === r.id}
                            onClick={() => {
                              setNotice(null);
                              setSending({ referral: r, party: "referee" });
                            }}
                            className="text-xs font-semibold text-green-700 hover:underline disabled:opacity-50"
                          >
                            Send {r.refereeReward.type} to friend
                          </button>
                        )}
                        {r.refereeReward.status === "pending" && r.payouts.referee?.status !== "processing" && (
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
                      r.refereeReward.status === "pending" &&
                      r.payouts.referrer?.status !== "processing" &&
                      r.payouts.referee?.status !== "processing" && (
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
      {sending && (
        <SendRewardDialog
          referral={sending.referral}
          party={sending.party}
          onClose={() => setSending(null)}
          onDone={afterPayout}
        />
      )}
    </div>
  );
}

export default AdminReferralsPage;

function PayoutLine({ payout, busy, onCheck }: { payout: AdminPayout; busy: boolean; onCheck: () => void }) {
  const what = `${payout.planName ?? `${formatNgn(payout.amountNgn)} ${payout.kind}`} → ${payout.phone} (${NETWORK_LABEL[payout.network] ?? payout.network})${payout.live ? "" : " [test]"}`;
  if (payout.status === "delivered") {
    return (
      <div className="text-green-700">
        VTpass delivered {what}
        {payout.providerTransactionId && <span className="text-gray-400"> · ref {payout.providerTransactionId}</span>}
      </div>
    );
  }
  if (payout.status === "failed") {
    return (
      <div className="text-red-700">
        VTpass failed: {payout.message ?? "unknown error"} ({what})
      </div>
    );
  }
  return (
    <div className="text-amber-700">
      VTpass processing {what} ·{" "}
      <button type="button" onClick={onCheck} disabled={busy} className="font-medium underline disabled:opacity-50">
        Check status
      </button>
    </div>
  );
}

// Airtime/data rewards go to the number the student saved on /refer. Registration doesn't
// collect a phone, so a missing one means emailing them for it before paying out.
function PhoneLine({ phone }: { phone: string | null }) {
  if (!phone) return <div className="text-xs text-amber-600">No phone saved</div>;
  return (
    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-xs text-blue-700 hover:underline">
      {phone}
    </a>
  );
}
