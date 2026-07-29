import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import {
  clearSubmitStatus,
  fetchAssignment,
  fetchMySubmissionForAssignment,
  submitAssignment,
} from "./assignmentsSlice";

export function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentAssignment: assignment, mySubmission, status, submitStatus, error } = useAppSelector(
    (state) => state.assignments,
  );
  const [submissionText, setSubmissionText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchAssignment(id));
      dispatch(fetchMySubmissionForAssignment(id));
      dispatch(clearSubmitStatus());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (mySubmission?.submissionText) {
      setSubmissionText(mySubmission.submissionText);
    }
  }, [mySubmission]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) return;
    await dispatch(submitAssignment({ assignmentId: id, submissionText, file }));
  }

  if (status === "loading" || !assignment) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const isGraded = mySubmission?.status === "graded" || mySubmission?.status === "returned";
  const justSubmitted = submitStatus === "succeeded";

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{assignment.title}</h1>
      <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
        <span>{assignment.pointsTotal} points</span>
        {assignment.dueDate && (
          <>
            <span>&middot;</span>
            <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </>
        )}
        {assignment.fileRequired && (
          <>
            <span>&middot;</span>
            <span>File required</span>
          </>
        )}
      </div>
      {assignment.description && <p className="mt-4 text-gray-700">{assignment.description}</p>}

      {isGraded ? (
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5">
          <Alert variant="success" message="This assignment has been graded." />
          <div className="mt-4">
            <p className="font-medium text-gray-900">
              Score: {mySubmission!.score} / {assignment.pointsTotal}
            </p>
            {mySubmission!.feedback && (
              <p className="mt-2 text-sm text-gray-700">Feedback: {mySubmission!.feedback}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5">
          {justSubmitted && (
            <Alert
              variant="success"
              message={
                mySubmission?.isLate ? "Submitted successfully (marked late)." : "Submitted successfully."
              }
            />
          )}
          {!justSubmitted && mySubmission && (
            <Alert
              variant="info"
              message="You've already submitted this assignment. Submitting again will replace your previous submission."
            />
          )}
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            {error && <Alert message={error} />}
            <div className="flex flex-col gap-1">
              <label htmlFor="submissionText" className="text-sm font-medium text-gray-700">
                Your submission
              </label>
              <textarea
                id="submissionText"
                rows={6}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="file" className="text-sm font-medium text-gray-700">
                Attach a file{assignment.fileRequired ? " (required)" : " (optional)"}
              </label>
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="text-sm"
              />
              {mySubmission?.filePath && !file && (
                <p className="text-xs text-gray-500">
                  A file is already attached from your previous submission.
                </p>
              )}
            </div>
            <Button type="submit" isLoading={submitStatus === "loading"}>
              {mySubmission ? "Resubmit assignment" : "Submit assignment"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
