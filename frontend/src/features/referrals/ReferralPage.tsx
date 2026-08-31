import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { StatTile } from "../../components/ui/StatTile";
import { MyReferralSummary, ReferralLeaderboard, ReferralRewardType } from "../../types/api";
import {
  fetchMyReferralSummary,
  fetchReferralLeaderboard,
  updateRewardPreference,
} from "./referralsSlice";

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

const REWARD_OPTIONS: { value: ReferralRewardType; label: string; hint: string }[] = [
  { value: "airtime", label: "Airtime", hint: "Topped up to your registered phone number" },
  { value: "data", label: "Data", hint: "A data bundle on your network" },
  { value: "discount", label: "Course credit", hint: "Money off your next Paleon course" },
];

const STATUS_LABEL: Record<string, string> = {
  pending: "Joined — not paid yet",
  qualified: "Paid — reward earned",
  void: "Not eligible",
};

export function ReferralPage() {
  const dispatch = useAppDispatch();
  const { summary, summaryStatus, leaderboard, leaderboardStatus, error } = useAppSelector(
    (state) => state.referrals,
  );
  const currentUserId = useAppSelector((state) => state.auth.user?.id ?? null);

  useEffect(() => {
    dispatch(fetchMyReferralSummary());
    dispatch(fetchReferralLeaderboard());
  }, [dispatch]);

  if (summaryStatus === "loading" || !summary) {
    if (error) {
      return (
        <div className="mx-auto max-w-4xl px-6 py-10">
          <Alert message={error} />
        </div>
      );
    }
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Refer &amp; earn</h1>
      <p className="mt-1 text-sm text-gray-600">
        Invite friends who want to build employable digital skills. When they join and pay for a course,
        you both get rewarded.
      </p>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      <ShareCard summary={summary} />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Friends invited" value={summary.counts.invited} />
        <StatTile label="Signed up" value={summary.counts.joined} />
        <StatTile label="Paid (rewarded)" value={summary.counts.qualified} />
        <StatTile
          label="You've earned"
          value={formatNgn(summary.earnings.totalNgn)}
          subtext={
            summary.earnings.pendingNgn > 0
              ? `${formatNgn(summary.earnings.pendingNgn)} awaiting payout`
              : undefined
          }
        />
      </div>

      <HowItWorks summary={summary} />

      <RewardPreference current={summary.rewardType} />

      <MyReferralsTable summary={summary} />

      <LeaderboardSection
        leaderboard={leaderboard}
        status={leaderboardStatus}
        currentUserId={currentUserId}
        myRank={summary.leaderboardRank}
      />

      <p className="mt-8 text-xs leading-relaxed text-gray-500">
        Rewards are issued by the Paleon team after your friend&apos;s course payment is confirmed —
        allow a few working days for airtime or data. Course credit is applied to your account.
        Self-referrals and duplicate accounts don&apos;t qualify. Paleon Training helps you build skills
        and employability; it doesn&apos;t guarantee a job. We may adjust or end this programme at any
        time.
      </p>
    </div>
  );
}

function ShareCard({ summary }: { summary: MyReferralSummary }) {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  const shareMessage = `I'm developing job-ready digital skills for careers in Oil & Gas, Banking and Telecommunications with Paleon Training. Use my code ${summary.code} when you sign up to receive your discount: ${summary.shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;

  async function copy(value: string, which: "code" | "link") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
      <p className="text-sm font-medium text-blue-900">
        Earn {formatNgn(summary.rewardPerReferralNgn)} for every friend who joins and pays.
      </p>
      <p className="text-sm text-blue-800">
        They get {formatNgn(summary.welcomeBonusNgn)} off their first course for using your code.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <span className="text-xs font-medium uppercase tracking-wide text-blue-700">Your code</span>
          <div className="mt-1 flex items-center gap-2">
            <code className="rounded-md border border-blue-300 bg-white px-3 py-2 text-lg font-semibold tracking-wider text-blue-900">
              {summary.code}
            </code>
            <button
              type="button"
              onClick={() => copy(summary.code, "code")}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {copied === "code" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Share on WhatsApp
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
        >
          Share on X
        </a>
        <button
          type="button"
          onClick={() => copy(summary.shareUrl, "link")}
          className="rounded-md border border-blue-300 bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          {copied === "link" ? "Link copied!" : "Copy invite link"}
        </button>
      </div>
    </div>
  );
}

function HowItWorks({ summary }: { summary: MyReferralSummary }) {
  const steps = [
    {
      title: "Share your code",
      body: "Send your code or invite link to friends, classmates or your NYSC set.",
    },
    {
      title: "They sign up & pay",
      body: `They enter ${summary.code} when registering and pay for any course — and get ${formatNgn(
        summary.welcomeBonusNgn,
      )} off.`,
    },
    {
      title: "You both get rewarded",
      body: `You earn ${formatNgn(
        summary.rewardPerReferralNgn,
      )} as airtime, data or course credit — your choice.`,
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">How it works</h2>
      <ol className="mt-3 grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-lg border border-gray-200 bg-white p-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {i + 1}
            </span>
            <p className="mt-2 font-medium text-gray-900">{step.title}</p>
            <p className="mt-1 text-sm text-gray-600">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RewardPreference({ current }: { current: ReferralRewardType }) {
  const dispatch = useAppDispatch();

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">How you want to be paid</h2>
      <p className="mt-1 text-sm text-gray-600">
        Applies to rewards you haven&apos;t been paid yet. You can change this any time.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {REWARD_OPTIONS.map((option) => {
          const selected = option.value === current;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => !selected && dispatch(updateRewardPreference(option.value))}
              aria-pressed={selected}
              className={`rounded-lg border p-4 text-left transition-colors ${
                selected
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <p className="font-medium text-gray-900">{option.label}</p>
              <p className="mt-1 text-xs text-gray-600">{option.hint}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MyReferralsTable({ summary }: { summary: MyReferralSummary }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">Your referrals</h2>
      {summary.referrals.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          No referrals yet — share your code to get started.
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Friend</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Reward</th>
                <th className="px-4 py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {summary.referrals.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 text-gray-900">{r.refereeName}</td>
                  <td className="px-4 py-2 text-gray-600">{STATUS_LABEL[r.status] ?? r.status}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {r.status !== "qualified"
                      ? "—"
                      : r.rewardStatus === "issued"
                        ? "Paid"
                        : "Awaiting payout"}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(r.joinedAt).toLocaleDateString()}
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

function LeaderboardSection({
  leaderboard,
  status,
  currentUserId,
  myRank,
}: {
  leaderboard: ReferralLeaderboard | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  currentUserId: string | null;
  myRank: number | null;
}) {
  const [period, setPeriod] = useState<"thisMonth" | "allTime">("thisMonth");

  const entries = leaderboard?.[period] ?? [];

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900">Top ambassadors</h2>
        <div className="inline-flex rounded-md border border-gray-300 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setPeriod("thisMonth")}
            className={`rounded px-3 py-1 font-medium ${
              period === "thisMonth" ? "bg-blue-600 text-white" : "text-gray-600"
            }`}
          >
            This month
          </button>
          <button
            type="button"
            onClick={() => setPeriod("allTime")}
            className={`rounded px-3 py-1 font-medium ${
              period === "allTime" ? "bg-blue-600 text-white" : "text-gray-600"
            }`}
          >
            All time
          </button>
        </div>
      </div>

      {myRank && (
        <p className="mt-2 text-sm text-blue-700">
          You&apos;re ranked #{myRank} all time. Keep sharing to climb.
        </p>
      )}

      {status === "loading" ? (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      ) : entries.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          No qualified referrals {period === "thisMonth" ? "this month" : "yet"} — be the first.
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Ambassador</th>
                <th className="px-4 py-2">University</th>
                <th className="px-4 py-2">Paid referrals</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const isMe = entry.userId === currentUserId;
                return (
                  <tr
                    key={entry.userId}
                    className={`border-b border-gray-100 last:border-0 ${isMe ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-4 py-2 text-gray-600">{entry.rank}</td>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {entry.name}
                      {isMe && <span className="ml-1 text-xs font-normal text-blue-700">(you)</span>}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{entry.university ?? "—"}</td>
                    <td className="px-4 py-2 text-gray-900">{entry.qualifiedReferrals}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-sm text-gray-600">
        Looking for your courses?{" "}
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Go to your dashboard
        </Link>
        .
      </p>
    </div>
  );
}

export default ReferralPage;
