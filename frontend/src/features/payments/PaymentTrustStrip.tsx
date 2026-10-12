const WHATSAPP_URL = "https://wa.me/2347077149989";

// Reassurance shown next to pay buttons (2026-10-12): who takes the card, the refund rule
// from the terms (section 5), who Paleon is, a person to ask, and what the certificate
// looks like. Only facts that are already public -- keep them in step with terms.html.
export function PaymentTrustStrip({ courseSlug, className }: { courseSlug?: string; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 ${className ?? ""}`}>
      <ul className="space-y-2">
        <li className="flex gap-2">
          <span aria-hidden="true">&#128274;</span>
          <span>
            <strong className="text-gray-900">Secure card payment by Paystack.</strong> Your card details never touch
            Paleon&rsquo;s site.
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden="true">&#8617;&#65039;</span>
          <span>
            <strong className="text-gray-900">7-day refund.</strong> Cancel within 7 days of your payment being
            confirmed for a full refund, as long as you haven&rsquo;t started Day 2.{" "}
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
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
