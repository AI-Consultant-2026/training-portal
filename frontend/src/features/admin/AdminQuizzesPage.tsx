import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { fetchQuizzes, toggleQuizEnabled } from "./adminSlice";

export function AdminQuizzesPage() {
  const dispatch = useAppDispatch();
  const { quizzes, quizzesStatus, quizzesError } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  function handleToggle(quizId: string, isEnabled: boolean) {
    dispatch(toggleQuizEnabled({ quizId, isEnabled }));
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        &larr; Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Quizzes</h1>
      <p className="mt-1 text-sm text-gray-500">
        Disabling a quiz blocks students from starting it, regardless of lesson progress &mdash;
        useful for pulling a quiz that isn't ready without deleting it.
      </p>

      {quizzesError && <Alert message={quizzesError} />}

      {quizzesStatus === "loading" && quizzes.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : quizzes.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Week</th>
                <th className="px-4 py-2">Quiz</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q) => (
                <tr key={q.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 text-gray-900">{q.courseTitle}</td>
                  <td className="px-4 py-2 text-gray-600">{q.weekNumber}</td>
                  <td className="px-4 py-2 text-gray-600">{q.title}</td>
                  <td className="px-4 py-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={q.isEnabled}
                        onChange={(e) => handleToggle(q.id, e.target.checked)}
                      />
                      <span className={q.isEnabled ? "text-green-700" : "text-gray-500"}>
                        {q.isEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">No quizzes yet.</p>
      )}
    </div>
  );
}
