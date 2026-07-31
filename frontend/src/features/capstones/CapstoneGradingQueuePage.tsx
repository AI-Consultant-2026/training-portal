import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { fetchUngradedSubmissions } from "./capstonesSlice";

export function CapstoneGradingQueuePage() {
  const dispatch = useAppDispatch();
  const { ungradedSubmissions, status, error } = useAppSelector((state) => state.capstones);

  useEffect(() => {
    dispatch(fetchUngradedSubmissions());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Capstone grading queue</h1>

      {status === "loading" && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {error && <Alert message={error} />}

      {status === "succeeded" && ungradedSubmissions.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-600">No capstone submissions waiting for grading.</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {ungradedSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
          >
            <div>
              <p className="font-medium text-gray-900">{submission.courseTitle}</p>
              <p className="text-sm text-gray-500">
                Submitted {new Date(submission.submissionDate).toLocaleString()}
                {submission.isLate && <span className="ml-2 text-amber-600">(late)</span>}
              </p>
            </div>
            <Link
              to={`/instructor/capstone-submissions/${submission.id}/grade`}
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
