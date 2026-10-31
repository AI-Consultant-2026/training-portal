import { CheckoutInfo } from "../../types/api";
import { isFlutterwave } from "./checkout";

const WHATSAPP_URL = "https://wa.me/447508823495";

// Reassurance shown next to pay buttons (2026-10-12): who takes the card, the refund rule
// from the terms (section 5), who Paleon is, a person to ask, and what the certificate
// looks like. Only facts that are already public -- keep them in step with terms.html.
// A Flutterwave checkout (Ghana, Kenya, South Africa) names Flutterwave and the country's
// own WhatsApp line.
export function PaymentTrustStrip({
  courseSlug,
  checkout,
  className,
}: {
  courseSlug?: string;
  checkout?: CheckoutInfo;
  className?: string;
}) {
  const flutterwave = isFlutterwave(checkout);
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 ${className ?? ""}`}>
      <ul className="space-y-2">
        <li className="flex gap-2">
          <span aria-hidden="true">&#128274;</span>
          <span>
            {flutterwave ? (
              <>
                <strong className="text-gray-900">Secure payment by Flutterwave.</strong> Your card and mobile money
                details never touch Paleon&rsquo;s site.
              </>
            ) : (
              <>
                <strong className="text-gray-900">Secure card payment by Paystack.</strong> Your card details never
                touch Paleon&rsquo;s site.
              </>
            )}
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true">&#8617;&#65039;</span>
          <span>
            <strong className="text-gray-900">7-day refund.</strong> Cancel within 7 days of your payment being
            confirmed for a full refund, less a 5% administrative charge, as long as you haven&rsquo;t started Day 2.{" "}
            <a href="/terms#refunds" className="text-blue-600 hover:underline">
              See terms
            </a>
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true">&#127970;</span>
          <span>Paleon Training Limited, off NNPC Junior Staff Club 10, Warri.</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true">&#128172;</span>
          <span>
            Questions?{" "}
            <a href={checkout?.whatsappLink ?? WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Chat with us on WhatsApp
            </a>
            . We reply within 1 working day.
          </span>
        </li>
        {courseSlug && (
          <li className="flex gap-2">
            <span aria-hidden="true">&#127891;</span>
            <a
              href={`/images/certificates/sample-${courseSlug}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              See a sample certificate of completion
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
