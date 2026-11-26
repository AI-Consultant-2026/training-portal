import { useCallback, useEffect, useState } from "react";
import { fetchHumanCheck } from "../api/humanCheck.api";

/**
 * Human check for public forms (2026-11-26): a small sum ("What is seven + 4?") from
 * GET /api/human-check, checked on the server. Each answer is accepted once, so call
 * `reload()` after any failed submit.
 */
export function useHumanCheck() {
  const [question, setQuestion] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);

  const reload = useCallback(() => {
    setQuestion(null);
    setToken("");
    setAnswer("");
    setLoadFailed(false);
    fetchHumanCheck()
      .then((q) => {
        setQuestion(q.question);
        setToken(q.token);
      })
      .catch(() => setLoadFailed(true));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    question,
    answer,
    setAnswer,
    loadFailed,
    reload,
    fields: () => ({ humanToken: token, humanAnswer: answer.trim() }),
  };
}

export type HumanCheckState = ReturnType<typeof useHumanCheck>;

export function HumanCheckField({ hc, id = "humanAnswer" }: { hc: HumanCheckState; id?: string }) {
  const questionText = hc.loadFailed ? "couldn’t load. Tap “New question”." : (hc.question ?? "loading…");
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        Quick human check: <span className="whitespace-nowrap font-bold">{questionText}</span>
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          name="humanAnswer"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={20}
          required
          value={hc.answer}
          onChange={(e) => hc.setAnswer(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={hc.reload}
          className="shrink-0 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          New question
        </button>
      </div>
    </div>
  );
}
