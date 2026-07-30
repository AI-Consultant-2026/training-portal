import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { fetchPendingQuizReviews } from "./quizzesSlice";

export function QuizGradingQueuePage() {
  const dispatch = useAppDispatch();
  const { pendingReviews, status, error } = useAppSelector((state) => state.quizzes);

  useEffect(() => {
    dispatch(fetchPendingQuizReviews());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Quiz grading queue</h1>

      {status === "loading" && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {error && <Alert message={error} />}

      {status === "succeeded" && pendingReviews.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-600">No quiz attempts waiting for review.</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {pendingReviews.map((review) => (
          <div
            key={review.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
          >
            <div>
              <p className="font-medium text-gray-900">{review.quizTitle ?? "Quiz"}</p>
              <p className="text-sm text-gray-500">
                Attempt {review.attemptNumber}
                {review.endTime && <> · submitted {new Date(review.endTime).toLocaleString()}</>}
              </p>
            </div>
            <Link
              to={`/instructor/quizzes/${review.quizId}/attempts/${review.id}/grade`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Grade
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
