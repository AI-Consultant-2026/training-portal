import { useEffect, useState } from "react";
import * as referralsApi from "../../api/referrals.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Select } from "../../components/ui/Select";
import { Spinner } from "../../components/ui/Spinner";
import { AdminReferral, DataPlan, PayoutPreview, VtpassNetwork } from "../../types/api";

const NETWORKS: { value: VtpassNetwork; label: string }[] = [
  { value: "mtn", label: "MTN" },
  { value: "airtel", label: "Airtel" },
  { value: "glo", label: "Glo" },
  { value: "etisalat", label: "9mobile" },
];

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function apiMessage(err: unknown, fallback: string): string {
  return (
    (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ??
    fallback
  );
}

// Confirm-then-send for one referral reward through VTU.ng or VTpass. Airtime sent to a wrong number
// can't be recovered, so the number and network are shown large and must be ticked off
// before Send is enabled.
export function SendRewardDialog({
  referral,
  party,
  onClose,
  onDone,
}: {
  referral: AdminReferral;
  party: "referrer" | "referee";
  onClose: () => void;
  onDone: (updated: AdminReferral, notice: string) => void;
}) {
  const [preview, setPreview] = useState<PayoutPreview | null>(null);
  const [network, setNetwork] = useState<VtpassNetwork | "">("");
  const [plans, setPlans] = useState<DataPlan[] | null>(null);
  const [planCode, setPlanCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    referralsApi
      .fetchPayoutPreview(referral.id, party)
      .then((p) => {
        setPreview(p);
        setNetwork(p.suggestedNetwork ?? "");
      })
      .catch((err) => setError(apiMessage(err, "Could not prepare this payout")));
  }, [referral.id, party]);

  useEffect(() => {
    if (!preview || preview.kind !== "data" || !network) return;
    setPlans(null);
    setPlanCode("");
    referralsApi
      .fetchDataPlans(network, preview.amountNgn)
      .then((list) => {
        setPlans(list);
        setPlanCode(list[0]?.code ?? "");
      })
      .catch((err) => setError(apiMessage(err, "Could not load data plans")));
  }, [preview, network]);

  async function send() {
    if (!network) return;
    setSending(true);
    setError(null);
    try {
      const outcome = await referralsApi.sendReferralReward(referral.id, {
        party,
        network,
        variationCode: preview?.kind === "data" ? planCode : undefined,
      });
      if (outcome.status === "failed") {
        setError(outcome.message);
        setChecked(false);
        onDone(outcome.referral, "");
        return;
      }
      onDone(
        outcome.referral,
        outcome.status === "delivered"
          ? `Sent to ${preview?.name}. Reward marked paid.`
          : `Sent to ${preview?.name}, but ${preview?.provider ?? "the provider"} hasn't confirmed it yet. Use "Check status" on the row in a minute.`,
      );
      onClose();
    } catch (err) {
      setError(apiMessage(err, "Could not send this reward"));
    } finally {
      setSending(false);
    }
  }

  const who = party === "referrer" ? "ambassador" : "friend";
  const plan = plans?.find((p) => p.code === planCode);
  const ready = !!preview && !!network && checked && (preview.kind === "airtime" || !!plan);

  return (
    <Modal title={`Send ${preview?.kind ?? "reward"} to ${who}`} onClose={sending ? () => {} : onClose}>
      {error && <Alert message={error} />}
      {!preview && !error && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}
      {preview && (
        <div className="space-y-4">
          {preview.live ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
              <strong>Live:</strong> this spends real money from the {preview.provider} wallet.{" "}
              {preview.kind === "data" ? "Data" : "Airtime"} sent to a wrong number can&apos;t be got back.
            </p>
          ) : (
            <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
              <strong>Test mode ({preview.provider} sandbox):</strong> no real airtime is sent. Only 08011111111
              succeeds in the sandbox; other numbers come back as failed.
            </p>
          )}

          <div className="rounded-md border border-gray-200 p-4">
            <p className="text-sm text-gray-600">{preview.name}</p>
            <p className="mt-1 font-mono text-2xl font-semibold tracking-wide text-gray-900">{preview.phone}</p>
            <p className="mt-1 text-sm text-gray-600">
              Reward: {formatNgn(preview.amountNgn)} {preview.kind}
            </p>
          </div>

          <Select
            id="payout-network"
            label="Network"
            value={network}
            onChange={(e) => {
              setNetwork(e.target.value as VtpassNetwork);
              setChecked(false);
            }}
          >
            <option value="">Choose network…</option>
            {NETWORKS.map((n) => (
              <option key={n.value} value={n.value}>
                {n.label}
                {n.value === preview.suggestedNetwork ? " (guessed from number)" : ""}
              </option>
            ))}
          </Select>
          <p className="-mt-2 text-xs text-gray-500">
            The guess comes from the number&apos;s prefix. Ported numbers can be on a different network, so
            check if unsure.
          </p>

          {preview.kind === "data" && network && (
            <div>
              {plans === null ? (
                <Spinner />
              ) : plans.length === 0 ? (
                <p className="text-sm text-red-700">
                  No plan on this network costs {formatNgn(preview.amountNgn)} or less.
                </p>
              ) : (
                <Select
                  id="payout-plan"
                  label={`Data plan (up to ${formatNgn(preview.amountNgn)})`}
                  value={planCode}
                  onChange={(e) => setPlanCode(e.target.value)}
                >
                  {plans.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name} — {formatNgn(p.amountNgn)}
                    </option>
                  ))}
                </Select>
              )}
            </div>
          )}

          <label className="flex items-start gap-2 text-sm text-gray-800">
            <input
              type="checkbox"
              className="mt-0.5"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>
              I&apos;ve checked the number <strong className="font-mono">{preview.phone}</strong> and the
              network are right.
            </span>
          </label>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={sending}>
              Cancel
            </Button>
            <Button type="button" onClick={send} disabled={!ready} isLoading={sending}>
              Send {formatNgn(preview.kind === "data" && plan ? plan.amountNgn : preview.amountNgn)}{" "}
              {preview.kind}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
