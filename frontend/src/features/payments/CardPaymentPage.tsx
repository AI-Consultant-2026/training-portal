import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPaymentQuote, payWithCard } from "../../api/payments.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Spinner } from "../../components/ui/Spinner";
import { PaymentQuote } from "../../types/api";
import { LOCATIONS } from "../auth/RegisterPage";
import { fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { fetchCourseBySlug } from "../courses/coursesSlice";

// Card payments always settle in GBP -- Paleon Training UK Limited receives card
// payments in GBP regardless of the student's own country/currency. Naira payments go
// through the separate bank-transfer page instead, so Nigeria isn't offered here.
const BILLING_COUNTRIES = LOCATIONS.filter((c) => c !== "Nigeria");

const CURRENT_YEAR = new Date().getFullYear();
const EXPIRY_YEARS = Array.from({ length: 15 }, (_, i) => CURRENT_YEAR + i);

function formatCardNumber(value: string): string {
  return value
    .replace(/[^\d]/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function CardPaymentPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedCourse: course } = useAppSelector((state) => state.courses);
  const { user } = useAppSelector((state) => state.auth);

  const [quote, setQuote] = useState<PaymentQuote | null>(null);
  const [quoteError, setQuoteError] = useState(false);

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("1");
  const [expYear, setExpYear] = useState(String(CURRENT_YEAR));
  const [cvv, setCvv] = useState("");
  const [billingCountry, setBillingCountry] = useState(
    user && BILLING_COUNTRIES.includes(user.location) ? user.location : BILLING_COUNTRIES[0],
  );
  const [billingAddressLine1, setBillingAddressLine1] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    if (slug) dispatch(fetchCourseBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!course) return;
    setQuoteError(false);
    fetchPaymentQuote(course.id, billingCountry)
      .then(setQuote)
      .catch(() => setQuoteError(true));
  }, [course, billingCountry]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!course) return;
    setSubmitting(true);
    setError(null);
    try {
      await payWithCard({
        courseId: course.id,
        cardholderName,
        cardNumber: cardNumber.replace(/\s+/g, ""),
        expMonth: Number(expMonth),
        expYear: Number(expYear),
        cvv,
        billingCountry,
        billingAddressLine1,
        billingCity,
        billingPostalCode,
      });
      setSucceeded(true);
      dispatch(fetchMyEnrollments());
    } catch (err) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message ?? "Could not process this payment. Please check your details and try again.";
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

  if (succeeded) {
    return (
      <div className="mx-auto mt-16 max-w-md text-center">
        <Alert variant="success" message="Payment successful! Your course is now unlocked." />
        <Button className="mt-4" onClick={() => navigate(`/courses/${course.slug}`)}>
          Go to course
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-md px-6 pb-16">
      <h1 className="text-2xl font-semibold text-gray-900">Pay by card</h1>
      <p className="mt-1 text-sm text-gray-500">{course.title}</p>

      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
        {quote ? (
          <>
            <p className="text-gray-600">
              Course price: <span className="font-medium text-gray-900">₦{quote.baseAmountNgn.toLocaleString()}</span>
            </p>
            <p className="mt-1 text-base font-semibold text-gray-900">
              You will be charged {quote.card.currency} {quote.card.amount.toFixed(2)}
            </p>
            {quote.estimatedLocal && quote.estimatedLocal.currency !== quote.card.currency && (
              <p className="mt-1 text-xs text-gray-500">
                &asymp; {quote.estimatedLocal.currency} {quote.estimatedLocal.amount.toFixed(2)} (estimated, for
                reference only &mdash; your card is always charged in {quote.card.currency})
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              All card payments are processed in {quote.card.currency} regardless of your billing country.
            </p>
          </>
        ) : quoteError ? (
          <Alert message="Couldn't load pricing for this course. Please try again." />
        ) : (
          <Spinner />
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {error && <Alert message={error} />}

        <Input
          id="cardholderName"
          label="Name on card"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          autoComplete="cc-name"
          required
        />
        <Input
          id="cardNumber"
          label="Card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          required
        />
        <div className="grid grid-cols-3 gap-3">
          <Select
            id="expMonth"
            label="Month"
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
            required
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, "0")}
              </option>
            ))}
          </Select>
          <Select id="expYear" label="Year" value={expYear} onChange={(e) => setExpYear(e.target.value)} required>
            {EXPIRY_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
          <Input
            id="cvv"
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
            inputMode="numeric"
            autoComplete="cc-csc"
            required
          />
        </div>

        <Select
          id="billingCountry"
          label="Billing country"
          value={billingCountry}
          onChange={(e) => setBillingCountry(e.target.value)}
          required
        >
          {BILLING_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Input
          id="billingAddressLine1"
          label="Billing address"
          value={billingAddressLine1}
          onChange={(e) => setBillingAddressLine1(e.target.value)}
          autoComplete="address-line1"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="billingCity"
            label="City"
            value={billingCity}
            onChange={(e) => setBillingCity(e.target.value)}
            autoComplete="address-level2"
            required
          />
          <Input
            id="billingPostalCode"
            label="Postal code"
            value={billingPostalCode}
            onChange={(e) => setBillingPostalCode(e.target.value)}
            autoComplete="postal-code"
            required
          />
        </div>

        <Button type="submit" isLoading={submitting} disabled={!quote}>
          {quote ? `Pay ${quote.card.currency} ${quote.card.amount.toFixed(2)}` : "Pay"}
        </Button>
      </form>
    </div>
  );
}
