import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders an assignment/capstone brief (instructions, deliverables, assessment criteria,
// worked examples). Briefs are authored by staff via migrations, never from user input, but
// raw HTML is still left disabled: markdown alone covers everything a brief needs, including
// tables for the assessment criteria and blockquotes/code blocks for sample messages.
const COMPONENTS = {
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-8 border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-5 text-base font-semibold text-gray-900" {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-700" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => <p className="mt-3 text-gray-700" {...props} />,
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-3 list-decimal space-y-1 pl-5 text-gray-700" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-3 whitespace-pre-wrap rounded-r-md border-l-4 border-blue-300 bg-blue-50 px-4 py-3 text-sm text-gray-800"
      {...props}
    />
  ),
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800"
      {...props}
    />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-gray-100 px-1 py-0.5 text-[0.9em] text-gray-800" {...props} />
  ),
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="mt-3 overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-left text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-900" {...props} />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-gray-100 px-3 py-2 align-top text-gray-700" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="text-blue-600 hover:underline" target="_blank" rel="noreferrer" {...props} />
  ),
};

export function BriefMarkdown({ children }: { children: string }) {
  return (
    <div className="brief">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
