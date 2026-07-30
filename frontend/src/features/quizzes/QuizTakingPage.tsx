import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { fetchMyAttempts, resetQuizAttempt, startQuizAttempt, submitQuizAttempt } from "./quizzesSlice";

export function QuizTakingPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { activeAttempt, submitResult, status, submitStatus, error } = useAppSelector(
    (state) => state.quizzes,
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const hasAutoSubmitted = useRef(false);
  const hasStartedForId = useRef<string | null>(null);

  useEffect(() => {
    // Guards against React StrictMode's dev-mode double effect invocation firing this
    // twice for the same quiz id, which would otherwise dispatch two concurrent
    // "start attempt" requests (the backend now tolerates that race safely too, but
    // there's no reason to make the redundant network call in the first place).
    if (id && hasStartedForId.current !== id) {
      hasStartedForId.current = id;
      dispatch(resetQuizAttempt());
      dispatch(startQuizAttempt(id));
      setAnswers({});
      hasAutoSubmitted.current = false;
    }
  }, [dispatch, id]);

  const deadline = useMemo(() => {
    if (!activeAttempt?.quiz.timeLimitMinutes) return null;
    return new Date(activeAttempt.attempt.startTime).getTime() + activeAttempt.quiz.timeLimitMinutes * 60_000;
  }, [activeAttempt]);

  function handleSubmit() {
    if (!id || !activeAttempt) return;
    const responses = Object.entries(answers).map(([questionId, studentAnswer]) => ({
      questionId,
      studentAnswer,
    }));
    dispatch(
      submitQuizAttempt({ quizId: id, attemptId: activeAttempt.attempt.id, responses }),
    ).then(() => dispatch(fetchMyAttempts(id)));
  }

  useEffect(() => {
    if (!deadline || submitResult) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0 && !hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        handleSubmit();
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline, submitResult]);

  function handleRetake() {
    if (id) {
      dispatch(resetQuizAttempt());
      dispatch(startQuizAttempt(id));
      setAnswers({});
      hasAutoSubmitted.current = false;
    }
  }

  if (status === "loading" || !activeAttempt) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (submitResult) {
    const { attempt, responses, timedOut, passed } = submitResult;

    if (attempt.status === "submitted") {
      return (
        <div className="mx-auto max-w-3xl px-6 py-10">
          <h1 className="text-2xl font-semibold text-gray-900">{activeAttempt.quiz.title}</h1>
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-5">
            <Alert
              variant="info"
              message="Submitted — awaiting instructor review of the short-answer question(s). Your score will be available once grading is complete."
            />
            <div className="mt-6 flex items-center gap-4">
              <Button onClick={handleRetake}>Retake quiz</Button>
              <Link to={`/quizzes/${id}/attempts`} className="text-sm text-blue-600 hover:underline">
                View attempt history
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-900">{activeAttempt.quiz.title}</h1>
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-5">
          {timedOut && <Alert variant="info" message="This attempt was submitted after the time limit." />}
          <p className="mt-2 text-xl font-semibold text-gray-900">
            Score: {attempt.score}% — {passed ? "Passed" : "Not passed"}
          </p>
          <p className="text-sm text-gray-500">Passing score: {activeAttempt.quiz.passingScore}%</p>

          <ul className="mt-6 flex flex-col gap-4">
            {responses.map((r) => (
              <li key={r.questionId} className="rounded-md border border-gray-200 p-4">
                <p className="font-medium text-gray-900">{r.questionText}</p>
                <p className={`mt-1 text-sm ${r.isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {r.isCorrect ? "Correct" : "Incorrect"}
                </p>
                {r.explanation && <p className="mt-1 text-sm text-gray-600">{r.explanation}</p>}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <Button onClick={handleRetake}>Retake quiz</Button>
            <Link to={`/quizzes/${id}/attempts`} className="text-sm text-blue-600 hover:underline">
              View attempt history
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{activeAttempt.quiz.title}</h1>
        {secondsLeft !== null && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
          </span>
        )}
      </div>

      {error && <Alert message={error} />}

      <div className="mt-6 flex flex-col gap-6">
        {activeAttempt.questions.map((q, index) => (
          <div key={q.id} className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="font-medium text-gray-900">
              {index + 1}. {q.questionText}
            </p>
            {q.questionType === "short_answer" ? (
              <textarea
                className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                value={answers[q.id] ?? ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
              />
            ) : (
              <div className="mt-3 flex flex-col gap-2">
                {q.answers.map((a) => (
                  <label key={a.id} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name={q.id}
                      value={a.id}
                      checked={answers[q.id] === a.id}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: a.id }))}
                    />
                    {a.answerText}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          isLoading={submitStatus === "loading"}
          disabled={activeAttempt.questions.some((q) => !(answers[q.id] ?? "").trim())}
        >
          Submit quiz
        </Button>
      </div>
    </div>
  );
}
