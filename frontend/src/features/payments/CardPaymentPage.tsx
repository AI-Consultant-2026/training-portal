import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaymentQuote, startCardPayment } from "../../api/payments.api";
import { PAYMENT_CONFIRMATION_PROMISE } from "./paymentCopy";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { PaymentQuote } from "../../types/api";
import { fetchCourseBySlug } from "../courses/coursesSlice";
import { track } from "../../lib/analytics";

// Card payments are taken in Naira on the course's Paystack Payment Page: this page only
// shows the price and sends the student there, so card details are never entered on
// Paleon's own site. Paystack doesn't report back to the portal, so the payment is then
// confirmed by the team (like a bank transfer), matched by the email the student pays with.
export function CardPaymentPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedCourse: course } = useAppSelector((state) => state.courses);
  const { user } = useAppSelector((state) => state.auth);

  const [quote, setQuote] = useState<PaymentQuote | null>(null);
  const [quoteError, setQuoteError] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) dispatch(fetchCourseBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!course) return;
    setQuoteError(false);
    fetchPaymentQuote(course.id)
      .then(setQuote)
      .catch(() => setQuoteError(true));
  }, [course]);

  async function handlePay() {
    if (!course) return;
    setStarting(true);
    setError(null);
    try {
      const { paymentLink } = await startCardPayment(course.id);
      track("card_payment_started", { currency: "NGN", value: quote?.card.amount, course_slug: course.slug });
      window.location.assign(paymentLink);
    } catch (err) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not start this payment. Please try again.";
      setError(message);
      setStarting(false);
    }
  }

  if (!course) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  // No Paystack link for this course yet: point to bank transfer instead of a button that
  // would only be rejected.
  if (quote && !quote.card.enabled) {
    return (
      <div className="mx-auto mt-16 max-w-md px-6 text-center" role="status">
        <h1 className="text-2xl font-semibold text-gray-900">Card payment isn&rsquo;t available yet</h1>
        <p className="mt-3 text-gray-600">
          Please pay for {course.title} by bank transfer instead. If you need help, contact us at{" "}
          <span className="font-medium text-gray-800">hello@paleontraining.com</span>.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button onClick={() => navigate(`/courses/${course.slug}/pay/bank-transfer`)}>Pay by bank transfer</Button>
          <Button variant="secondary" onClick={() => navigate(`/courses/${course.slug}`)}>
            Back to course
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-md px-6 pb-16">
      <h1 className="text-2xl font-semibold text-gray-900">Pay by card</h1>
      <p className="mt-1 text-sm text-gray-500">{course.title}</p>

      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
        {quote ? (
          <p className="text-base font-semibold text-gray-900">
            Course price: &#8358;{quote.card.amount.toLocaleString()}
          </p>
        ) : quoteError ? (
          <Alert message="Couldn't load pricing for this course. Please try again." />
        ) : (
          <Spinner />
        )}
      </div>

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
          We&rsquo;ll confirm the payment and unlock your lessons {PAYMENT_CONFIRMATION_PROMISE} (Monday to Friday,
          Nigerian time). Meanwhile, the course&rsquo;s first lesson is already open.
        </li>
      </ol>

      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button onClick={handlePay} isLoading={starting} disabled={!quote}>
          {quote ? `Pay ₦${quote.card.amount.toLocaleString()} with Paystack` : "Pay with Paystack"}
        </Button>
        <button
          type="button"
          onClick={() => navigate(`/courses/${course.slug}/pay/bank-transfer`)}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          Prefer to pay by bank transfer?
        </button>
      </div>
    </div>
  );
}
