import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { ModuleTaskStatus } from "../../types/api";

// Pop-up for the day gate: the next lesson of a day stays locked until that day's quiz
// and assignment are submitted (lesson.service.ts's getLessonTaskGate). Lists each task
// with a link to whatever is still outstanding. Shared by the course page and the lesson
// page.
export function DayTasksDialog({
  gate,
  dayNumber,
  onClose,
  closeLabel = "Not now",
}: {
  gate: Pick<ModuleTaskStatus, "quizzes" | "assignments">;
  dayNumber?: number;
  onClose: () => void;
  closeLabel?: string;
}) {
  const dayLabel = dayNumber !== undefined ? `Day ${dayNumber}` : "this day";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="day-tasks-title"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        <p id="day-tasks-title" className="text-base font-semibold text-gray-900">
          Complete the quiz and assignment first
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Please complete {dayLabel}&rsquo;s quiz and assignment to proceed to the next lesson.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {gate.quizzes.map((q) => (
            <TaskRow key={q.id} kind="Quiz" title={q.title} completed={q.completed} to={`/quizzes/${q.id}`} />
          ))}
          {gate.assignments.map((a) => (
            <TaskRow
              key={a.id}
              kind="Assignment"
              title={a.title}
              completed={a.completed}
              to={`/assignments/${a.id}`}
            />
          ))}
        </ul>
        <div className="mt-5 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            {closeLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TaskRow({ kind, title, completed, to }: { kind: string; title: string; completed: boolean; to: string }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-gray-200 px-3 py-2">
      <span className="min-w-0 text-sm text-gray-900">
        <span className="font-medium">{kind}:</span> {title}
      </span>
      {completed ? (
        <span className="shrink-0 text-sm font-medium text-green-700">&#10003; Done</span>
      ) : (
        <Link
          to={to}
          className="shrink-0 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          {kind === "Quiz" ? "Take quiz" : "Submit"}
        </Link>
      )}
    </li>
  );
}
