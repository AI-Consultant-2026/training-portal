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

// The lesson body -- markdown text with the lesson's illustrations placed between
// paragraphs. Shared by the in-portal lesson page and the public free-preview page.
export function LessonContent({ content, images }: { content: string; images: LessonImage[] }) {
  const segments = buildContentSegments(content, images);
  return (
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
            {/* Illustrations are deliberately not links (2026-09-25, owner request). */}
            <img src={segment.image.url} alt={segment.image.caption} className="w-full rounded-lg border border-gray-200" />
            <figcaption className="mt-2 text-sm text-gray-500">{segment.image.caption}</figcaption>
          </figure>
        ),
      )}
    </div>
  );
}
