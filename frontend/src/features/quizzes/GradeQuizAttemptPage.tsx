import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { QuizGradedResponse } from "../../types/api";
import { fetchAttemptForGrading, gradeQuizAttempt } from "./quizzesSlice";

export function GradeQuizAttemptPage() {
  const { quizId, attemptId } = useParams<{ quizId: string; attemptId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { attemptToGrade: attempt, status, gradeStatus, error } = useAppSelector((state) => state.quizzes);
  const [pointsByResponse, setPointsByResponse] = useState<Record<string, string>>({});

  useEffect(() => {
    if (quizId && attemptId) {
      dispatch(fetchAttemptForGrading({ quizId, attemptId }));
    }
  }, [dispatch, quizId, attemptId]);

  useEffect(() => {
    if (attempt) {
      const initial: Record<string, string> = {};
      for (const r of attempt.responses) {
        if (r.isCorrect === null) initial[r.id] = "";
      }
      setPointsByResponse(initial);
    }
  }, [attempt]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!attemptId || !attempt) return;
    const responses = attempt.responses
      .filter((r) => r.isCorrect === null)
      .map((r) => ({ responseId: r.id, pointsEarned: Number(pointsByResponse[r.id] ?? 0) }));
    const result = await dispatch(gradeQuizAttempt({ attemptId, responses }));
    if (gradeQuizAttempt.fulfilled.match(result)) {
      navigate("/instructor/quiz-grading");
    }
  }

  if (status === "loading" || !attempt) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const pendingResponses = attempt.responses.filter((r) => r.isCorrect === null);

  function displayAnswer(r: QuizGradedResponse) {
    return r.answers.find((a) => a.id === r.studentAnswer)?.answerText ?? r.studentAnswer;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Grade quiz attempt</h1>
      <p className="mt-1 text-sm text-gray-500">
        Attempt {attempt.attemptNumber} · {attempt.status}
      </p>

      {error && <Alert message={error} />}

      {attempt.status !== "submitted" ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-600">This attempt is not awaiting review.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {attempt.responses.map((r) => (
            <div key={r.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-900">{r.questionText}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{displayAnswer(r)}</p>

              {r.isCorrect === null ? (
                <div className="mt-3">
                  <Input
                    id={`points-${r.id}`}
                    label={`Points (0–${r.points ?? 0})`}
                    type="number"
                    min={0}
                    max={r.points ?? undefined}
                    value={pointsByResponse[r.id] ?? ""}
                    onChange={(e) =>
                      setPointsByResponse((prev) => ({ ...prev, [r.id]: e.target.value }))
                    }
                    required
                  />
                  {r.explanation && (
                    <p className="mt-2 text-sm text-gray-500">Model answer: {r.explanation}</p>
                  )}
                </div>
              ) : (
                <p className={`mt-2 text-sm ${r.isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {r.isCorrect ? "Correct" : "Incorrect"} ({r.pointsEarned}/{r.points} pts, auto-graded)
                </p>
              )}
            </div>
          ))}

          <Button type="submit" isLoading={gradeStatus === "loading"} disabled={pendingResponses.length === 0}>
            Submit grade
          </Button>
        </form>
      )}
    </div>
  );
}
