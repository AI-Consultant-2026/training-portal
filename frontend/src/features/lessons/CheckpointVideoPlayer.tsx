import { useEffect, useRef, useState } from "react";
import { checkCheckpointAnswer } from "../../api/lessons.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { loadYouTubeIframeApi, VideoUnavailableCard } from "../../components/ui/YouTubePlayer";
import { VideoCheckpoint } from "../../types/api";

export { extractYouTubeId } from "../../components/ui/YouTubePlayer";

interface CheckpointVideoPlayerProps {
  lessonId: string;
  videoId: string;
  videoUrl: string;
  checkpoints: VideoCheckpoint[];
}

interface Feedback {
  correct: boolean;
  correctAnswerId: string;
  explanation: string | null;
}

export function CheckpointVideoPlayer({ lessonId, videoId, videoUrl, checkpoints }: CheckpointVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const pollRef = useRef<number | null>(null);
  // Which checkpoints have already been answered correctly this page-view -- deliberately
  // not persisted (checkpoints are purely formative), so rewinding past a solved one won't
  // re-trigger it, but a reload starts fresh.
  const solvedRef = useRef<Set<string>>(new Set());

  const [activeCheckpoint, setActiveCheckpoint] = useState<VideoCheckpoint | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // Set when the API script itself fails to load, or YouTube's own player reports an
  // error for this specific video (e.g. embedding disabled or Content ID-restricted on
  // this domain) -- a real, video-specific failure oEmbed metadata alone can't catch,
  // since oEmbed can validly succeed for a video that still errors at actual playback
  // time. Either way, render our own clean "Watch on YouTube" card instead of leaving a
  // black box up or letting YouTube's own raw error UI show inside the iframe.
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    setUnavailable(false);
    const sortedCheckpoints = [...checkpoints].sort((a, b) => a.timestampSeconds - b.timestampSeconds);
    let cancelled = false;

    function stopPolling() {
      if (pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }

    function startPolling() {
      stopPolling();
      // YouTube's IFrame API has no native "timeupdate" event, so polling
      // getCurrentTime() is the standard way to detect crossing a timestamp.
      pollRef.current = window.setInterval(() => {
        const player = playerRef.current;
        if (!player) return;
        const currentTime = player.getCurrentTime();
        const next = sortedCheckpoints.find(
          (cp) => !solvedRef.current.has(cp.id) && currentTime >= cp.timestampSeconds,
        );
        if (next) {
          player.pauseVideo();
          setActiveCheckpoint(next);
          setSelectedAnswerId(null);
          setFeedback(null);
        }
      }, 300);
    }

    loadYouTubeIframeApi()
      .then(() => {
        if (cancelled || !containerRef.current || !window.YT) return;
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId,
          playerVars: { rel: 0 },
          events: {
            onError: () => {
              if (!cancelled) setUnavailable(true);
            },
            onStateChange: (event) => {
              if (event.data === window.YT!.PlayerState.PLAYING) {
                startPolling();
              } else {
                stopPolling();
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });

    return () => {
      cancelled = true;
      stopPolling();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // videoId is the only prop that should re-initialize the player; checkpoints is
    // read fresh inside the interval closure via sortedCheckpoints above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  async function handleSubmit() {
    if (!activeCheckpoint || !selectedAnswerId) return;
    setSubmitting(true);
    try {
      const result = await checkCheckpointAnswer(lessonId, activeCheckpoint.id, selectedAnswerId);
      setFeedback(result);
      if (result.correct) {
        solvedRef.current.add(activeCheckpoint.id);
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleContinue() {
    setActiveCheckpoint(null);
    setFeedback(null);
    setSelectedAnswerId(null);
    playerRef.current?.playVideo();
  }

  function handleTryAgain() {
    setFeedback(null);
    setSelectedAnswerId(null);
  }

  if (unavailable) {
    return (
      <div className="mt-6">
        <VideoUnavailableCard videoUrl={videoUrl} />
      </div>
    );
  }

  return (
    <div className="relative mt-6 overflow-hidden rounded-lg bg-black" style={{ aspectRatio: "16 / 9" }}>
      <div ref={containerRef} className="h-full w-full" />

      {activeCheckpoint && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-6">
          <div className="w-full max-w-md rounded-lg bg-white p-5">
            <p className="text-xs font-medium uppercase text-gray-400">Checkpoint</p>
            <p className="mt-1 font-medium text-gray-900">{activeCheckpoint.questionText}</p>

            {!feedback ? (
              <>
                <div className="mt-4 flex flex-col gap-2">
                  {activeCheckpoint.answers.map((answer) => (
                    <label
                      key={answer.id}
                      className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="checkpoint-answer"
                        checked={selectedAnswerId === answer.id}
                        onChange={() => setSelectedAnswerId(answer.id)}
                      />
                      {answer.answerText}
                    </label>
                  ))}
                </div>
                <Button className="mt-4" onClick={handleSubmit} disabled={!selectedAnswerId} isLoading={submitting}>
                  Submit
                </Button>
              </>
            ) : (
              <div className="mt-4">
                <Alert
                  variant={feedback.correct ? "success" : "error"}
                  message={feedback.correct ? "Correct!" : "Not quite — see the correct answer below."}
                />
                <div className="mt-3 flex flex-col gap-2">
                  {activeCheckpoint.answers.map((answer) => {
                    const isCorrectAnswer = answer.id === feedback.correctAnswerId;
                    const isWrongSelection = !feedback.correct && answer.id === selectedAnswerId;
                    return (
                      <div
                        key={answer.id}
                        className={`rounded-md border px-3 py-2 text-sm ${
                          isCorrectAnswer
                            ? "border-green-300 bg-green-50 text-green-800"
                            : isWrongSelection
                              ? "border-red-300 bg-red-50 text-red-800"
                              : "border-gray-200"
                        }`}
                      >
                        {answer.answerText}
                      </div>
                    );
                  })}
                </div>
                {feedback.explanation && <p className="mt-3 text-sm text-gray-600">{feedback.explanation}</p>}
                {feedback.correct ? (
                  <Button className="mt-4" onClick={handleContinue}>
                    Continue watching
                  </Button>
                ) : (
                  <Button className="mt-4" variant="secondary" onClick={handleTryAgain}>
                    Try again
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
