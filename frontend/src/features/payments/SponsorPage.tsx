import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchSponsorPage, startSponsorPayment, verifySponsorPayment } from "../../api/sponsor.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { track } from "../../lib/analytics";
import { SponsorPageInfo } from "../../types/api";
import { PaymentTrustStrip } from "./PaymentTrustStrip";

type Kind = "deposit" | "balance" | "full";

// Public "pay for a student" page (2026-10-12), opened from the link a student shares from
// their payment page. A parent, relative or employer pays by card on Paystack; the charge is
// made out to the student's account, so the course unlocks for them. No login needed.
export function SponsorPage() {
  const { token = "" } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const returnedReference = searchParams.get("reference");
  const [info, setInfo] = useState<SponsorPageInfo | null>(null);
  const [failed, setFailed] = useState(false);
  const [starting, setStarting] = useState<Kind | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Pay for a course | Paleon Training";
    let cancelled = false;
    // Back from Paystack: ask the server to check the charge first (backup for the
    // webhook), then load the page so it shows the new status.
    const check = returnedReference
      ? verifySponsorPayment(token, returnedReference).catch(() => null)
      : Promise.resolve(null);
    check
      .then(() => fetchSponsorPage(token))
      .then((data) => !cancelled && setInfo(data))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [token, returnedReference]);

  async function pay(kind: Kind) {
    setStarting(kind);
    setError(null);
    try {
      const { paymentLink } = await startSponsorPayment(token, kind);
      track("sponsor_payment_started", { course_slug: info?.courseSlug, plan: kind });
      window.location.assign(paymentLink);
    } catch (err) {
      setError(
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ??
          "Could not start this payment. Please try again.",
      );
      setStarting(null);
    }
  }

  if (failed) {
    return (
      <div className="mx-auto mt-16 max-w-md px-6">
        <Alert message="This payment link isn't valid. Please ask the student to send you a new one." />
      </div>
    );
  }
  if (!info) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const naira = (n: number) => `₦${n.toLocaleString()}`;
  const name = info.studentFirstName;
  const canPay = info.paymentsEnabled;

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Paleon Training</p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">
        Pay for {name}&rsquo;s {info.courseTitle} course
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {name} has asked you to help pay for this course. It&rsquo;s a self-paced online course with practical
        lessons, assignments, a capstone project and a certificate of completion.{" "}
        <a href={`/${info.courseSlug}-course`} className="text-blue-600 hover:underline">
          See what the course covers
        </a>
        .
      </p>

      {returnedReference && info.status !== "unpaid" && (
        <div className="mt-4">
          <Alert variant="success" message={`Thank you! Your payment is confirmed and ${name}'s course is unlocked.`} />
        </div>
      )}
      {returnedReference && info.status === "unpaid" && (
        <div className="mt-4">
          <Alert
            variant="success"
            message="Thank you! Your payment is being confirmed with Paystack. This usually takes a minute."
          />
        </div>
      )}

      {info.status === "paid" ? (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          This course is fully paid. Thank you for supporting {name}!
        </div>
      ) : !canPay ? (
        <div className="mt-6">
          <Alert message="Card payment isn't available right now. Please contact hello@paleontraining.com." />
        </div>
      ) : info.status === "deposit_paid" && info.balanceNgn !== null ? (
        <div className="mt-6 rounded-lg border-2 border-blue-600 bg-white p-4 text-sm">
          <p className="text-base font-semibold text-gray-900">Pay the balance: {naira(info.balanceNgn)}</p>
          <p className="mt-1 text-gray-600">
            The deposit is paid and Days 1&ndash;{info.unlockedDays} are open. The balance unlocks the rest of the
            course, the capstone project and the certificate.
          </p>
          <Button className="mt-3 w-full" onClick={() => pay("balance")} isLoading={starting === "balance"}>
            Pay {naira(info.balanceNgn)} with Paystack
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <div className="rounded-lg border-2 border-blue-600 bg-white p-4 text-sm">
            <p className="text-base font-semibold text-gray-900">Pay in full: {naira(info.priceNgn)}</p>
            <p className="mt-1 text-gray-600">Unlocks the whole course for {name} straight away.</p>
            <Button
              className="mt-3 w-full"
              onClick={() => pay("full")}
              isLoading={starting === "full"}
              disabled={starting !== null}
            >
              Pay {naira(info.priceNgn)} with Paystack
            </Button>
          </div>
          {info.depositNgn !== null && info.balanceNgn !== null && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
              <p className="text-base font-semibold text-gray-900">Or start with {naira(info.depositNgn)}</p>
              <p className="mt-1 text-gray-600">
                Unlocks Days 1&ndash;{info.unlockedDays} now. The balance of {naira(info.balanceNgn)} can be paid later,
                by you or by {name}. Same total price, no extra fees.
              </p>
              <Button
                variant="secondary"
                className="mt-3 w-full"
                onClick={() => pay("deposit")}
                isLoading={starting === "deposit"}
                disabled={starting !== null}
              >
                Pay {naira(info.depositNgn)} deposit with Paystack
              </Button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      {info.status !== "paid" && (
        <p className="mt-4 text-xs text-gray-500">
          Paystack will show {name}&rsquo;s account email on the checkout page. That&rsquo;s expected: it&rsquo;s how
          the payment is matched to {name}&rsquo;s course. You can pay with your own card.
        </p>
      )}

      <PaymentTrustStrip courseSlug={info.courseSlug} className="mt-6" />
    </div>
  );
}
