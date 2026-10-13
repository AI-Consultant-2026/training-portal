import { useEffect, useState } from "react";
import { fetchNotices } from "../../api/referrals.api";
import { AmbassadorNotice } from "../../types/api";

const NEW_FOR_MS = 3 * 24 * 60 * 60 * 1000;

function formatPosted(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Notice bodies are plain text; turn bare http(s) links into clickable ones without
// rendering any HTML from the database.
function BodyText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return (
    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-800">
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-blue-700 underline">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </p>
  );
}

function NoticeItem({ notice }: { notice: AmbassadorNotice }) {
  const [copied, setCopied] = useState(false);
  const isNew = Date.now() - new Date(notice.createdAt).getTime() < NEW_FOR_MS;

  async function copyDetails() {
    const text = [notice.title, "", notice.body, notice.linkUrl ?? ""].join("\n").trim();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the text is on screen anyway.
    }
  }

  return (
    <li className="rounded-md border border-amber-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        {isNew && (
          <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
            New
          </span>
        )}
        <h3 className="font-semibold text-gray-900">{notice.title}</h3>
      </div>
      <p className="mt-0.5 text-xs text-gray-500">Posted {formatPosted(notice.createdAt)}</p>
      <BodyText text={notice.body} />
      <div className="mt-3 flex flex-wrap gap-2">
        {notice.linkUrl && (
          <a
            href={notice.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {notice.linkLabel || "Open link"}
          </a>
        )}
        <button
          type="button"
          onClick={copyDetails}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {copied ? "Copied" : "Copy details"}
        </button>
      </div>
    </li>
  );
}

// Messages from the Paleon team, shown first on /refer/me. Hidden when there's
// nothing current, so an empty board never pushes the share tools down.
export function NoticeBoard() {
  const [notices, setNotices] = useState<AmbassadorNotice[]>([]);

  useEffect(() => {
    fetchNotices()
      .then(setNotices)
      .catch(() => setNotices([]));
  }, []);

  if (notices.length === 0) return null;

  return (
    <section aria-labelledby="notice-board-heading" className="mt-6 rounded-lg border-2 border-amber-300 bg-amber-50 p-4 sm:p-5">
      <h2 id="notice-board-heading" className="flex items-center gap-2 text-lg font-semibold text-gray-900">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
        </svg>
        Notice board
      </h2>
      <p className="mt-0.5 text-sm text-gray-600">Messages for ambassadors from the Paleon team.</p>
      <ul className="mt-3 space-y-3">
        {notices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </ul>
    </section>
  );
}
