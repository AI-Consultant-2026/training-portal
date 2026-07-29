import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { fetchMyAttempts } from "./quizzesSlice";

export function QuizResultsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { myAttempts, bestScore, status } = useAppSelector((state) => state.quizzes);

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
            <li
              key={a.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
            >
              <span className="text-sm text-gray-700">Attempt {a.attemptNumber}</span>
              <span className="text-sm text-gray-500">{a.status}</span>
              <span className="font-medium text-gray-900">
                {a.score !== null ? `${a.score}%` : "—"}
              </span>
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
