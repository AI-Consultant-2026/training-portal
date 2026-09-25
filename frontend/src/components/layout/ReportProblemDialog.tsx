import { FormEvent, useState } from "react";
import { reportProblem } from "../../api/support.api";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;

function errorMessage(err: unknown): string {
  const data = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data;
  const message = data?.error?.message;
  return message && message !== "Validation failed"
    ? message
    : "We couldn't send your report. Please email support@paleontraining.com instead.";
}

// In-portal "Report a problem" form (2026-09-25). Replaces asking students to email
// their name, account email, phone type and browser by hand: the server fills those in
// from the logged-in account and the request, and this page's URL is sent too.
export function ReportProblemDialog({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (message.trim().length < 10) {
      setError("Please describe the problem in a sentence or two.");
      return;
    }
    if (screenshot && screenshot.size > MAX_SCREENSHOT_BYTES) {
      setError("That screenshot is too large (5 MB maximum).");
      return;
    }
    setStatus("sending");
    try {
      await reportProblem({
        message: message.trim(),
        phone: phone.trim() || undefined,
        screenshot,
      });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(errorMessage(err));
    }
  }

  return (
    <Modal title="Report a problem" onClose={onClose}>
      {status === "sent" ? (
        <div className="flex flex-col gap-4">
          <Alert
            variant="success"
            message="Thanks — your report has been sent. We reply within 1 working day (Monday to Friday, Nigerian time), by email."
          />
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <p className="text-sm text-gray-600">
            Tell us what went wrong. We&rsquo;ll automatically include your name, email, this page, and your phone and
            browser type, so you don&rsquo;t need to. We reply within 1 working day.
          </p>
          <div>
            <label htmlFor="report-message" className="block text-sm font-medium text-gray-700">
              What were you trying to do, and what happened?
            </label>
            <textarea
              id="report-message"
              rows={4}
              maxLength={3000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. I clicked Play on the Day 2 video and the screen stayed black."
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="report-screenshot" className="block text-sm font-medium text-gray-700">
              Screenshot <span className="font-normal text-gray-500">(optional, but it really helps)</span>
            </label>
            <input
              id="report-screenshot"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium"
            />
            <p className="mt-1 text-xs text-gray-500">
              iPhone: side button + volume up. Android: power + volume down. Then choose the image here.
            </p>
          </div>
          <div>
            <label htmlFor="report-phone" className="block text-sm font-medium text-gray-700">
              Phone / WhatsApp <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <input
              id="report-phone"
              type="tel"
              autoComplete="tel"
              maxLength={20}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {error && <Alert message={error} />}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={status === "sending"}>
              Send report
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
