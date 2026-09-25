import { FormEvent, useEffect, useState } from "react";
import { fetchMyFeedback, saveMyFeedback } from "../../../api/feedback.api";
import { Alert } from "../../../components/ui/Alert";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Spinner } from "../../../components/ui/Spinner";

// Feedback after completing a course (2026-09-25): a rating, a comment, and two separate,
// unticked-by-default permissions -- quoting it on the website, and showing the capstone.
export function FeedbackDialog({
  enrollmentId,
  courseTitle,
  onClose,
}: {
  enrollmentId: string;
  courseTitle: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [consentQuote, setConsentQuote] = useState(false);
  const [consentCapstone, setConsentCapstone] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyFeedback(enrollmentId)
      .then((existing) => {
        if (existing) {
          setRating(existing.rating);
          setComment(existing.comment);
          setConsentQuote(existing.consentQuote);
          setConsentCapstone(existing.consentCapstone);
        }
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [enrollmentId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (rating < 1) {
      setError("Please choose a rating.");
      return;
    }
    if (comment.trim().length < 10) {
      setError("Please write a sentence or two about the course.");
      return;
    }
    setStatus("saving");
    try {
      await saveMyFeedback(enrollmentId, { rating, comment: comment.trim(), consentQuote, consentCapstone });
      setStatus("saved");
    } catch {
      setStatus("idle");
      setError("We couldn't save your feedback. Please try again.");
    }
  }

  return (
    <Modal title={`Your feedback on ${courseTitle}`} onClose={onClose}>
      {loading ? (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      ) : status === "saved" ? (
        <div className="flex flex-col gap-4">
          <Alert variant="success" message="Thank you! Your feedback has been saved." />
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">How would you rate the course?</legend>
            <div className="mt-2 flex gap-1" role="radiogroup">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} out of 5`}
                  onClick={() => setRating(n)}
                  className={`text-3xl leading-none ${n <= rating ? "text-amber-500" : "text-gray-300"} hover:text-amber-400`}
                >
                  &#9733;
                </button>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="feedback-comment" className="block text-sm font-medium text-gray-700">
              What did you get out of the course?
            </label>
            <textarea
              id="feedback-comment"
              rows={4}
              maxLength={1000}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. what you learned, what you built for your capstone, how you'll use it"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={consentQuote}
              onChange={(e) => setConsentQuote(e.target.checked)}
              className="mt-1"
            />
            <span>
              Paleon Training may quote my feedback on its website, with my first name, last initial and course
              name.
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={consentCapstone}
              onChange={(e) => setConsentCapstone(e.target.checked)}
              className="mt-1"
            />
            <span>Paleon Training may show my capstone project as an example of student work.</span>
          </label>
          <p className="text-xs text-gray-500">
            Both are optional. Nothing is published without these permissions, and you can change your mind by
            emailing hello@paleontraining.com.
          </p>
          {error && <Alert message={error} />}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={status === "saving"}>
              Send feedback
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
