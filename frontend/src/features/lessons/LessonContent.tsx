import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { LessonImage } from "../../types/api";

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
  // Tables (2026-11-12): headings left-aligned (browsers centre <th> by default) and
  // padding in every cell so neighbouring columns don't run together. The wrapper
  // scrolls sideways on narrow phones instead of squashing the columns.
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-left text-sm text-gray-700" {...props} />
    </div>
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-left align-bottom font-semibold text-gray-900"
      {...props}
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-gray-100 px-4 py-2.5 align-top" {...props} />
  ),
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <img className="w-full rounded-lg border border-gray-200" {...props} />
  ),
  // Code samples (the AI & ML course's Python lessons). Inline code gets a light chip;
  // the [&_code] overrides undo that chip inside a fenced block.
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm leading-relaxed text-gray-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-gray-100"
      {...props}
    />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-gray-100 px-1 py-0.5 text-[0.9em] text-gray-800" {...props} />
  ),
};

// Where a lesson's video goes (2026-11-12). Loading a corporate lesson video replaces
// its "Video coming soon" note with this paragraph, so the player appears exactly where
// the note was. An HTML comment renders as nothing if a lesson has the marker but no
// video, and it keeps the paragraph count the same, so image positions don't move.
export const LESSON_VIDEO_MARKER = "<!-- lesson-video -->";

export function hasVideoMarker(content: string): boolean {
  return content.split("\n\n").some((paragraph) => paragraph.trim() === LESSON_VIDEO_MARKER);
}

type ContentSegment =
  | { kind: "markdown"; text: string }
  | { kind: "image"; image: LessonImage }
  | { kind: "video" };

// Groups the plain-text/markdown content into chunks split at each image's
// `afterParagraph` boundary (paragraphs are blank-line-separated blocks),
// so each chunk still parses as valid, self-contained markdown.
function buildContentSegments(content: string, images: LessonImage[], withVideo: boolean): ContentSegment[] {
  const paragraphs = content.split("\n\n");
  const segments: ContentSegment[] = [];
  let buffer: string[] = [];

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim() === LESSON_VIDEO_MARKER) {
      if (withVideo) {
        if (buffer.length > 0) segments.push({ kind: "markdown", text: buffer.join("\n\n") });
        buffer = [];
        segments.push({ kind: "video" });
      }
    } else {
      buffer.push(paragraph);
    }
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

// The lesson body -- markdown text with the lesson's illustrations placed between
// paragraphs. Shared by the in-portal lesson page and the public free-preview page.
export function LessonContent({
  content,
  images,
  video,
}: {
  content: string;
  images: LessonImage[];
  // The lesson's video player, shown at the LESSON_VIDEO_MARKER paragraph.
  video?: React.ReactNode;
}) {
  const segments = buildContentSegments(content, images, video !== undefined && video !== null && video !== false);
  return (
    <div className="mt-4 flex flex-col gap-4">
      {segments.map((segment, index) =>
        segment.kind === "video" ? (
          <div key={index}>{video}</div>
        ) : segment.kind === "markdown" ? (
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
            {/* Illustrations are deliberately not links (2026-09-25, owner request). */}
            <img src={segment.image.url} alt={segment.image.caption} className="w-full rounded-lg border border-gray-200" />
            <figcaption className="mt-2 text-sm text-gray-500">{segment.image.caption}</figcaption>
          </figure>
        ),
      )}
    </div>
  );
}
