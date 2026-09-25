import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { LessonNavItem } from "../../types/api";
import { fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { CheckpointVideoPlayer, extractYouTubeId } from "./CheckpointVideoPlayer";
import { LessonContent } from "./LessonContent";
import {
  fetchCheckpoints,
  fetchLesson,
  fetchLessonCompletion,
  fetchLessonNavigation,
  markLessonComplete,
} from "./lessonsSlice";

export function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    currentLesson: lesson,
    navigation,
    completed,
    checkpoints,
    status,
    markCompleteStatus,
    error,
  } = useAppSelector((state) => state.lessons);
  const { user } = useAppSelector((state) => state.auth);
  const { items: enrollments } = useAppSelector((state) => state.enrollments);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchLesson(id));
      dispatch(fetchLessonNavigation(id));
      dispatch(fetchCheckpoints(id));
      if (user?.role === "student") {
        dispatch(fetchLessonCompletion(id));
        dispatch(fetchMyEnrollments());
      }
    }
  }, [dispatch, id, user]);

  async function handleMarkComplete() {
    if (id) {
      dispatch(markLessonComplete(id));
    }
  }

  if (status === "failed") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Alert message={error ?? "Could not load lesson"} />
      </div>
    );
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

  // Reaching this page as a student at all means the current lesson is unlocked --
  // either the enrollment is paid, or this is the course's free preview lesson. Either way, "next" is only guaranteed unlocked if payment is
  // confirmed; otherwise clicking through would just hit the same 403 the backend
  // already enforces, so intercept it with the same upsell dialog as a locked lesson.
  const myEnrollment = navigation ? enrollments.find((e) => e.courseId === navigation.course.id) : undefined;
  const isNextLocked = user?.role === "student" && !myEnrollment?.paymentConfirmed;
  // An unpaid student here is on the free preview lesson: mark-complete needs a paid
  // enrollment, so show the way to unlock the rest of the course instead.
  const isFreePreview = isNextLocked;
  const payHref = navigation ? `/courses/${navigation.course.slug}/pay/bank-transfer` : "/courses";

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{lesson.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{lesson.durationMinutes} min</p>

      {error && <Alert message={error} />}

      <LessonContent content={lesson.content} images={lesson.images ?? []} />

      {youtubeVideoId ? (
        <CheckpointVideoPlayer
          lessonId={lesson.id}
          videoId={youtubeVideoId}
          videoUrl={lesson.videoUrl!}
          checkpoints={checkpoints}
        />
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

      {isFreePreview && (
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-gray-900">You&rsquo;re viewing the free preview lesson.</p>
          <p className="mt-1 text-sm text-gray-700">
            Pay for the course to unlock every lesson, the assignments, quizzes, capstone project and your certificate.
            Self-paced, with lifetime access.
          </p>
          <Link
            to={payHref}
            className="mt-3 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Unlock the full course
          </Link>
        </div>
      )}

      {user?.role === "student" && !isFreePreview && (
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

      {navigation && (navigation.previous || navigation.next) && (
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-gray-200 pt-6">
          <LessonNavLink
            item={navigation.previous}
            currentWeekNumber={navigation.module.weekNumber}
            direction="previous"
          />
          <LessonNavLink
            item={navigation.next}
            currentWeekNumber={navigation.module.weekNumber}
            direction="next"
            locked={isNextLocked}
            onLockedClick={() => setShowPaymentDialog(true)}
          />
        </div>
      )}

      {showPaymentDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
            <p className="text-sm text-gray-700">
              The next lesson unlocks once your course payment is confirmed. Pay for the course to
              continue with every lesson, assignment and your certificate.
            </p>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowPaymentDialog(false)}>
                Not now
              </Button>
              <Link
                to={payHref}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Unlock the full course
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Shows the adjacent lesson's title, plus a "Week N" label only when that lesson
// lives in a different week than the one currently being viewed -- crossing that
// boundary is the one case worth calling out; staying within the same week doesn't
// need repeating on every lesson.
function LessonNavLink({
  item,
  currentWeekNumber,
  direction,
  locked = false,
  onLockedClick,
}: {
  item: LessonNavItem | null;
  currentWeekNumber: number;
  direction: "previous" | "next";
  locked?: boolean;
  onLockedClick?: () => void;
}) {
  if (!item) {
    return <div />;
  }

  const isNewWeek = item.weekNumber !== currentWeekNumber;
  const alignment = direction === "previous" ? "text-left" : "text-right ml-auto";
  const className = `flex max-w-[45%] flex-col rounded-md border border-gray-200 px-4 py-3 hover:border-blue-300 hover:bg-blue-50 ${alignment}`;

  if (locked) {
    return (
      <button type="button" onClick={onLockedClick} className={className}>
        <span className="text-xs font-medium uppercase text-gray-400">
          {direction === "previous" ? "← Previous" : "Next →"}
          {isNewWeek && ` · Day ${item.weekNumber}`}
        </span>
        <span className="mt-1 truncate text-sm font-medium text-gray-900">{item.title}</span>
      </button>
    );
  }

  return (
    <Link to={`/lessons/${item.id}`} className={className}>
      <span className="text-xs font-medium uppercase text-gray-400">
        {direction === "previous" ? "← Previous" : "Next →"}
        {isNewWeek && ` · Day ${item.weekNumber}`}
      </span>
      <span className="mt-1 truncate text-sm font-medium text-gray-900">{item.title}</span>
    </Link>
  );
}
