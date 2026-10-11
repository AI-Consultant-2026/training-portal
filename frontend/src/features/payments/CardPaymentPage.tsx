import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaymentQuote, startCardPayment, startInstalmentPayment } from "../../api/payments.api";
import { PAYMENT_CONFIRMATION_PROMISE } from "./paymentCopy";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { PaymentQuote } from "../../types/api";
import { fetchCourseBySlug } from "../courses/coursesSlice";
import { fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { track } from "../../lib/analytics";

// Card payments are taken in Naira on Paystack, so card details are never entered on
// Paleon's own site. Paying in full goes to the course's Paystack Payment Page; paying in
// instalments (2026-10-11) opens Paystack checkout for a deposit that unlocks the first
// days, then later for the balance. The webhook confirms payments, matched by the email
// the student pays with (or, for instalments, the enrolment id the charge carries).
export function CardPaymentPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedCourse: course } = useAppSelector((state) => state.courses);
  const { user } = useAppSelector((state) => state.auth);
  const { items: enrollments } = useAppSelector((state) => state.enrollments);
  const myEnrollment = course ? enrollments.find((e) => e.courseId === course.id) : undefined;
  const depositPaid = !!myEnrollment?.depositPaidAt && !myEnrollment?.paymentConfirmed;

  const [quote, setQuote] = useState<PaymentQuote | null>(null);
  const [quoteError, setQuoteError] = useState(false);
  const [starting, setStartingKind] = useState<"full" | "deposit" | "balance" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) dispatch(fetchCourseBySlug(slug));
    dispatch(fetchMyEnrollments());
  }, [dispatch, slug]);

  useEffect(() => {
    if (!course) return;
    setQuoteError(false);
    fetchPaymentQuote(course.id)
      .then(setQuote)
      .catch(() => setQuoteError(true));
  }, [course]);

  async function handlePay(kind: "full" | "deposit" | "balance") {
    if (!course) return;
    setStartingKind(kind);
    setError(null);
    try {
      const { paymentLink } =
        kind === "full" ? await startCardPayment(course.id) : await startInstalmentPayment(course.id, kind);
      const value =
        kind === "full"
          ? quote?.card.amount
          : kind === "deposit"
            ? quote?.instalment?.depositNgn
            : quote?.instalment?.balanceNgn;
      track("card_payment_started", { currency: "NGN", value, course_slug: course.slug, plan: kind });
      window.location.assign(paymentLink);
    } catch (err) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not start this payment. Please try again.";
      setError(message);
      setStartingKind(null);
    }
  }

  if (!course) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  // No Paystack link for this course (e.g. an archived course): nothing to pay here, so
  // point to support instead of a button that would only be rejected.
  if (quote && !quote.card.enabled) {
    return (
      <div className="mx-auto mt-16 max-w-md px-6 text-center" role="status">
        <h1 className="text-2xl font-semibold text-gray-900">Payment isn&rsquo;t available for this course yet</h1>
        <p className="mt-3 text-gray-600">
          If you&rsquo;d like to take {course.title}, contact us at{" "}
          <span className="font-medium text-gray-800">hello@paleontraining.com</span> and we&rsquo;ll help you get
          started.
        </p>
        <Button className="mt-6" onClick={() => navigate(`/courses/${course.slug}`)}>
          Back to course
        </Button>
      </div>
    );
  }

  const naira = (n: number) => `\u20A6${n.toLocaleString()}`;
  const instalment = quote?.instalment?.enabled ? quote.instalment : null;

  return (
    <div className="mx-auto mt-10 max-w-md px-6 pb-16">
      <h1 className="text-2xl font-semibold text-gray-900">{depositPaid ? "Pay your balance" : "Pay by card"}</h1>
      <p className="mt-1 text-sm text-gray-500">{course.title}</p>

      {!quote ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
          {quoteError ? <Alert message="Couldn't load pricing for this course. Please try again." /> : <Spinner />}
        </div>
      ) : depositPaid && instalment ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
          <p className="text-base font-semibold text-gray-900">Balance: {naira(instalment.balanceNgn)}</p>
          <p className="mt-1 text-gray-600">
            Your {naira(instalment.depositNgn)} deposit is paid and Days 1&ndash;{instalment.unlockedDays} are open.
            Paying the balance unlocks every remaining day, the capstone project and your certificate.
          </p>
          <Button
            className="mt-4 w-full"
            onClick={() => handlePay("balance")}
            isLoading={starting === "balance"}
            disabled={starting !== null}
          >
            Pay {naira(instalment.balanceNgn)} with Paystack
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
            <p className="text-base font-semibold text-gray-900">Pay in full: {naira(quote.card.amount)}</p>
            <p className="mt-1 text-gray-600">Unlocks the whole course straight away.</p>
            <Button
              className="mt-3 w-full"
              onClick={() => handlePay("full")}
              isLoading={starting === "full"}
              disabled={starting !== null}
            >
              Pay {naira(quote.card.amount)} with Paystack
            </Button>
          </div>
          {instalment && (
            <div className="rounded-lg border-2 border-blue-600 bg-white p-4 text-sm">
              <p className="text-base font-semibold text-gray-900">
                Start with {naira(instalment.depositNgn)}
              </p>
              <p className="mt-1 text-gray-600">
                Pay {naira(instalment.depositNgn)} today to unlock Days 1&ndash;{instalment.unlockedDays}. Pay the
                balance of {naira(instalment.balanceNgn)} whenever you&rsquo;re ready to carry on. It unlocks the rest
                of the course, the capstone project and your certificate. Same total price, no extra fees.
              </p>
              <Button
                className="mt-3 w-full"
                onClick={() => handlePay("deposit")}
                isLoading={starting === "deposit"}
                disabled={starting !== null}
              >
                Pay {naira(instalment.depositNgn)} deposit with Paystack
              </Button>
            </div>
          )}
        </div>
      )}

      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-gray-700">
        <li>
          You&rsquo;ll pay on <strong>Paystack</strong>&rsquo;s secure page, in Naira. Your card details go to
          Paystack only, never to Paleon Training.
        </li>
        <li>
          Pay with the email on your Paleon account
          {user?.email ? (
            <>
              : <strong className="break-all">{user.email}</strong>
            </>
          ) : null}{" "}
          so we can match your payment to you.
        </li>
        <li>
          {instalment
            ? "Deposit and balance payments unlock automatically within a few minutes. "
            : ""}
          A full payment is confirmed {PAYMENT_CONFIRMATION_PROMISE} at the latest (Monday to Friday, Nigerian time).
          Meanwhile, the course&rsquo;s first lesson is already open.
        </li>
      </ol>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}
    </div>
  );
}
