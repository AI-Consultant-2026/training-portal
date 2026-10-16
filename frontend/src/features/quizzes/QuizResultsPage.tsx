import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { fetchAttempt } from "../../api/quizzes.api";
import { QuizGradedResponse } from "../../types/api";
import { fetchMyAttempts } from "./quizzesSlice";

export function QuizResultsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { myAttempts, bestScore, status } = useAppSelector((state) => state.quizzes);
  const [openAttemptId, setOpenAttemptId] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, QuizGradedResponse[]>>({});

  async function toggleAttempt(attemptId: string) {
    if (openAttemptId === attemptId) {
      setOpenAttemptId(null);
      return;
    }
    setOpenAttemptId(attemptId);
    if (id && !details[attemptId]) {
      const detail = await fetchAttempt(id, attemptId);
      setDetails((prev) => ({ ...prev, [attemptId]: detail.responses }));
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchMyAttempts(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Attempt history</h1>
      {bestScore !== null && (
        <p className="mt-2 text-sm text-gray-600">
          Best score: <span className="font-semibold text-gray-900">{bestScore}%</span>
        </p>
      )}

      {myAttempts.length === 0 ? (
        <div className="mt-6">
          <Alert variant="info" message="No attempts yet." />
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {myAttempts.map((a) => (
            <li key={a.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Attempt {a.attemptNumber}</span>
                <span className="text-sm text-gray-500">{a.status}</span>
                <span className="font-medium text-gray-900">
                  {a.score !== null ? `${a.score}%` : "—"}
                </span>
              </div>
              {a.status === "graded" && (
                <button
                  type="button"
                  onClick={() => toggleAttempt(a.id)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  {openAttemptId === a.id ? "Hide answers" : "Show answers & feedback"}
                </button>
              )}
              {openAttemptId === a.id && (
                <ul className="mt-3 flex flex-col gap-3">
                  {(details[a.id] ?? []).map((r) => (
                    <li key={r.id} className="rounded-md border border-gray-100 p-3">
                      <p className="text-sm font-medium text-gray-900">{r.questionText}</p>
                      <p className={`mt-1 text-sm ${r.isCorrect ? "text-green-700" : "text-red-700"}`}>
                        {r.isCorrect ? "Correct" : "Not full marks"} ({r.pointsEarned ?? 0}/{r.points ?? 0} pts)
                      </p>
                      {r.feedback && (
                        <p className="mt-2 whitespace-pre-wrap rounded-md bg-amber-50 p-3 text-sm text-gray-800">
                          <span className="font-semibold">Tutor feedback:</span> {r.feedback}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      <Link to={`/quizzes/${id}`} className="mt-6 inline-block text-sm text-blue-600 hover:underline">
        Take quiz again
      </Link>
    </div>
  );
}
