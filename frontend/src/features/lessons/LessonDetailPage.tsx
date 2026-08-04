import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { LessonImage } from "../../types/api";
import { CheckpointVideoPlayer, extractYouTubeId } from "./CheckpointVideoPlayer";
import { fetchCheckpoints, fetchLesson, fetchLessonCompletion, markLessonComplete } from "./lessonsSlice";

// Markdown/HTML-formatted lesson content. `rehypeRaw` allows literal HTML in
// content since lessons are only ever authored by instructors/admins via
// seeders and scripts, never from user input.
const MARKDOWN_COMPONENTS = {
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-6 text-lg font-semibold text-gray-900" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-5 text-base font-semibold text-gray-900" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => <p className="text-gray-700" {...props} />,
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc space-y-1 pl-5 text-gray-700" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal space-y-1 pl-5 text-gray-700" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="text-blue-600 hover:underline" target="_blank" rel="noreferrer" {...props} />
  ),
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <img className="w-full rounded-lg border border-gray-200" {...props} />
  ),
};

type ContentSegment = { kind: "markdown"; text: string } | { kind: "image"; image: LessonImage };

// Groups the plain-text/markdown content into chunks split at each image's
// `afterParagraph` boundary (paragraphs are blank-line-separated blocks),
// so each chunk still parses as valid, self-contained markdown.
function buildContentSegments(content: string, images: LessonImage[]): ContentSegment[] {
  const paragraphs = content.split("\n\n");
  const segments: ContentSegment[] = [];
  let buffer: string[] = [];

  paragraphs.forEach((paragraph, index) => {
    buffer.push(paragraph);
    images
      .filter((image) => image.afterParagraph === index)
      .forEach((image) => {
        segments.push({ kind: "markdown", text: buffer.join("\n\n") });
        buffer = [];
        segments.push({ kind: "image", image });
      });
  });

  if (buffer.length > 0) {
    segments.push({ kind: "markdown", text: buffer.join("\n\n") });
  }

  return segments;
}

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
  const segments = buildContentSegments(lesson.content, lesson.images ?? []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{lesson.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{lesson.durationMinutes} min</p>

      {error && <Alert message={error} />}

      <div className="mt-4 flex flex-col gap-4">
        {segments.map((segment, index) =>
          segment.kind === "markdown" ? (
            <ReactMarkdown
              key={index}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={MARKDOWN_COMPONENTS}
            >
              {segment.text}
            </ReactMarkdown>
          ) : (
            <figure key={index}>
              <img
                src={segment.image.url}
                alt={segment.image.caption}
                className="w-full rounded-lg border border-gray-200"
              />
              <figcaption className="mt-2 text-sm text-gray-500">{segment.image.caption}</figcaption>
            </figure>
          ),
        )}
      </div>

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
