import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { CheckpointVideoPlayer, extractYouTubeId } from "./CheckpointVideoPlayer";
import { fetchCheckpoints, fetchLesson, fetchLessonCompletion, markLessonComplete } from "./lessonsSlice";

export function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentLesson: lesson, completed, checkpoints, status, markCompleteStatus, error } = useAppSelector(
    (state) => state.lessons,
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchLesson(id));
      dispatch(fetchCheckpoints(id));
      if (user?.role === "student") {
        dispatch(fetchLessonCompletion(id));
      }
    }
  }, [dispatch, id, user]);

  async function handleMarkComplete() {
    if (id) {
      dispatch(markLessonComplete(id));
    }
  }

  if (status === "loading" || !lesson) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const links = lesson.resources?.links ?? [];
  const youtubeVideoId = lesson.videoUrl ? extractYouTubeId(lesson.videoUrl) : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{lesson.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{lesson.durationMinutes} min</p>

      {error && <Alert message={error} />}

      <p className="mt-4 whitespace-pre-wrap text-gray-700">{lesson.content}</p>

      {youtubeVideoId ? (
        <CheckpointVideoPlayer lessonId={lesson.id} videoId={youtubeVideoId} checkpoints={checkpoints} />
      ) : (
        lesson.videoUrl && (
          <div className="mt-6">
            <a
              href={lesson.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Watch video
            </a>
          </div>
        )
      )}

      {links.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700">Resources</p>
          <ul className="mt-2 flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {user?.role === "student" && (
        <div className="mt-8">
          <Button
            onClick={handleMarkComplete}
            isLoading={markCompleteStatus === "loading"}
            disabled={completed === true}
          >
            {completed ? "Completed" : "Mark complete"}
          </Button>
        </div>
      )}
    </div>
  );
}
