import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaymentQuote, submitBankTransfer } from "../../api/payments.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { PaymentQuote } from "../../types/api";
import { fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { fetchCourseBySlug } from "../courses/coursesSlice";

export function BankTransferPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedCourse: course } = useAppSelector((state) => state.courses);

  const [quote, setQuote] = useState<PaymentQuote | null>(null);
  const [quoteError, setQuoteError] = useState(false);
  const [transferReference, setTransferReference] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!course) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitBankTransfer({ courseId: course.id, transferReference, notes: notes || undefined });
      setSubmitted(true);
      dispatch(fetchMyEnrollments());
    } catch (err) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not submit this payment. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!course) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto mt-16 max-w-md text-center">
        <Alert
          variant="success"
          message="Thanks -- we've recorded your transfer. Our team will confirm it and unlock the course within 24 hours."
        />
        <Button className="mt-4" onClick={() => navigate(`/courses/${course.slug}`)}>
          Back to course
        </Button>
      </div>
    );
  }

  // Bank transfers are paused (BANK_TRANSFER_ENABLED is off on the server): show a plain
  // notice instead of account details or a form that would only be rejected.
  if (quote && !quote.bankTransfer.enabled) {
    return (
      <div className="mx-auto mt-16 max-w-md px-6 text-center" role="status">
        <h1 className="text-2xl font-semibold text-gray-900">Bank transfer is temporarily unavailable</h1>
        <p className="mt-3 text-gray-600">
          We aren&rsquo;t accepting bank transfer payments at the moment. Please check back soon, or contact us at{" "}
          <span className="font-medium text-gray-800">hello@paleontraining.com</span> and we&rsquo;ll help you get
          started.
        </p>
        <Button className="mt-6" onClick={() => navigate(`/courses/${course.slug}`)}>
          Back to course
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-md px-6 pb-16">
      <h1 className="text-2xl font-semibold text-gray-900">Pay by bank transfer</h1>
      <p className="mt-1 text-sm text-gray-500">{course.title}</p>

      {/* Temporary notice while Paleon Training's Nigerian business bank account is being set up. */}
      <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900" role="note">
        <p className="font-semibold">Temporary payment arrangement</p>
        <p className="mt-2">
          We are currently finalising Paleon Training&rsquo;s Nigerian business bank account. Until this process is
          complete, you may temporarily make your training payment to the authorised account details displayed below.
        </p>
        <p className="mt-2">
          Please use your name + course name as the payment reference and send your transfer confirmation to{" "}
          <a href="mailto:enrolment@paleontraining.com" className="font-medium underline">
            enrolment@paleontraining.com
          </a>{" "}
          after payment.
        </p>
        <p className="mt-2">
          This is a temporary arrangement, and the account details will be replaced with Paleon Training&rsquo;s
          business account once it is operational.
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
        {quote ? (
          <>
            <p className="text-base font-semibold text-gray-900">
              Amount to transfer: ₦{quote.bankTransfer.amount.toLocaleString()}
            </p>
            <dl className="mt-3 flex flex-col gap-1.5 text-gray-700">
              <div className="flex justify-between">
                <dt className="text-gray-500">Bank name</dt>
                <dd className="font-medium">{quote.bankTransfer.bankDetails.bankName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Account name</dt>
                <dd className="font-medium">{quote.bankTransfer.bankDetails.accountName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Account number</dt>
                <dd className="font-medium">{quote.bankTransfer.bankDetails.accountNumber}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-gray-400">
              Make the transfer using the details above, then submit your transaction reference below. Your course
              unlocks once our team confirms the transfer.
            </p>
          </>
        ) : quoteError ? (
          <Alert message="Couldn't load payment details for this course. Please try again." />
        ) : (
          <Spinner />
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {error && <Alert message={error} />}
        <Input
          id="transferReference"
          label="Transaction reference / receipt number"
          value={transferReference}
          onChange={(e) => setTransferReference(e.target.value)}
          required
        />
        <Input
          id="notes"
          label="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button type="submit" isLoading={submitting} disabled={!quote}>
          I've made this transfer
        </Button>
      </form>
    </div>
  );
}
