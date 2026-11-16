import { FormEvent, useEffect, useState } from "react";
import {
  FeedbackQuestionnaire,
  fetchMyFeedback,
  saveMyFeedback,
} from "../../../api/feedback.api";
import { Alert } from "../../../components/ui/Alert";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Spinner } from "../../../components/ui/Spinner";

// Feedback after completing a course (2026-09-25): a rating, a comment, and two separate,
// unticked-by-default permissions -- quoting it on the website, and showing the capstone.
// A course with a questionnaire (2026-11-16) asks its five questions instead: a rating, three
// multiple-choice questions and an open question, and leaves out the capstone permission if
// the course has no project.
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
  const [questionnaire, setQuestionnaire] =
    useState<FeedbackQuestionnaire | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyFeedback(enrollmentId)
      .then(({ feedback: existing, questionnaire: asked }) => {
        setQuestionnaire(asked);
        if (existing) {
          setRating(existing.rating);
          setComment(existing.comment);
          setConsentQuote(existing.consentQuote);
          setConsentCapstone(existing.consentCapstone);
          setAnswers(existing.answers ?? {});
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
    const unanswered = questionnaire?.choiceQuestions.find(
      (q) => !answers[q.id],
    );
    if (unanswered) {
      setError(`Please answer: ${unanswered.text}`);
      return;
    }
    if (comment.trim().length < 10) {
      setError("Please write a sentence or two about the course.");
      return;
    }
    setStatus("saving");
    try {
      await saveMyFeedback(enrollmentId, {
        rating,
        comment: comment.trim(),
        consentQuote,
        consentCapstone:
          questionnaire && !questionnaire.asksCapstoneConsent
            ? false
            : consentCapstone,
        ...(questionnaire ? { answers } : {}),
      });
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
          <Alert
            variant="success"
            message="Thank you! Your feedback has been saved."
          />
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">
              {questionnaire
                ? `1. ${questionnaire.ratingQuestion}`
                : "How would you rate the course?"}
            </legend>
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
          {questionnaire?.choiceQuestions.map((question, index) => (
            <fieldset key={question.id}>
              <legend className="text-sm font-medium text-gray-700">
                {index + 2}. {question.text}
              </legend>
              <div className="mt-2 grid gap-1 sm:grid-cols-2">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name={`feedback-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: option,
                        }))
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div>
            <label
              htmlFor="feedback-comment"
              className="block text-sm font-medium text-gray-700"
            >
              {questionnaire
                ? `${questionnaire.choiceQuestions.length + 2}. ${questionnaire.commentQuestion}`
                : "What did you get out of the course?"}
            </label>
            <textarea
              id="feedback-comment"
              rows={4}
              maxLength={1000}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                questionnaire
                  ? "e.g. the lesson or habit you found most useful, and what we could do better"
                  : "e.g. what you learned, what you built for your capstone, how you'll use it"
              }
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
              Paleon Training may quote my feedback on its website, with my
              first name, last initial and course name.
            </span>
          </label>
          {(!questionnaire || questionnaire.asksCapstoneConsent) && (
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={consentCapstone}
                onChange={(e) => setConsentCapstone(e.target.checked)}
                className="mt-1"
              />
              <span>
                Paleon Training may show my capstone project as an example of
                student work.
              </span>
            </label>
          )}
          <p className="text-xs text-gray-500">
            {questionnaire && !questionnaire.asksCapstoneConsent
              ? "This is optional."
              : "Both are optional."}{" "}
            Nothing is published without these permissions, and you can change
            your mind by emailing hello@paleontraining.com.
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
