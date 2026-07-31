import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as capstonesApi from "../../api/capstones.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { fetchSubmissionForGrading, gradeSubmission } from "./capstonesSlice";

export function GradeCapstoneSubmissionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { submissionToGrade: submission, status, gradeStatus, error } = useAppSelector(
    (state) => state.capstones,
  );
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchSubmissionForGrading(id));
    }
  }, [dispatch, id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) return;
    const result = await dispatch(
      gradeSubmission({ submissionId: id, score: Number(score), feedback: feedback || undefined }),
    );
    if (gradeSubmission.fulfilled.match(result)) {
      navigate("/instructor/capstone-grading");
    }
  }

  async function handleDownload() {
    if (!id || !submission?.filePath) return;
    setDownloadError(null);
    try {
      const fileName = submission.filePath.split("/").pop() ?? "submission";
      await capstonesApi.downloadSubmissionFile(id, fileName);
    } catch {
      setDownloadError("Could not download the file.");
    }
  }

  if (status === "loading" || !submission) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{submission.courseTitle}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Submitted {new Date(submission.submissionDate).toLocaleString()}
        {submission.isLate && <span className="ml-2 text-amber-600">(late)</span>}
      </p>

      {submission.submissionText && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm font-medium text-gray-700">Submission text</p>
          <p className="mt-1 whitespace-pre-wrap text-gray-900">{submission.submissionText}</p>
        </div>
      )}

      {submission.filePath && (
        <div className="mt-4">
          {downloadError && <Alert message={downloadError} />}
          <Button variant="secondary" onClick={handleDownload}>
            Download attached file
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5">
        {error && <Alert message={error} />}
        <Input
          id="score"
          label="Score"
          type="number"
          min={0}
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="feedback" className="text-sm font-medium text-gray-700">
            Feedback
          </label>
          <textarea
            id="feedback"
            rows={4}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <Button type="submit" isLoading={gradeStatus === "loading"}>
          Submit grade
        </Button>
      </form>
    </div>
  );
}
