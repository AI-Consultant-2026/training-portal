import { useEffect, useRef, useState } from "react";

export function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }
    return null;
  } catch {
    return null;
  }
}

let youtubeApiPromise: Promise<void> | null = null;

export function loadYouTubeIframeApi(): Promise<void> {
  if (window.YT?.Player) {
    return Promise.resolve();
  }
  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }
  youtubeApiPromise = new Promise<void>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    // Without this, a blocked/failed script load (a CSP misconfiguration, a network
    // blip) left the promise permanently unresolved -- the player never initialized
    // and the video area stayed a silent black box forever, with nothing shown and no
    // way to recover short of a full page reload.
    script.onerror = () => reject(new Error("Failed to load the YouTube IFrame API script"));
    document.head.appendChild(script);
  }).catch((err) => {
    // Reset the cache on failure (but not on success) so a later mount in the same
    // page session gets a fresh attempt instead of being stuck replaying the same
    // rejected promise for the rest of the visit.
    youtubeApiPromise = null;
    throw err;
  });
  return youtubeApiPromise;
}

// Shown whenever the API script itself fails to load, or when YouTube reports a playback
// error for this specific video (embedding disabled, Content ID restriction, transient
// rate-limiting, etc.) -- a real, video-specific failure that can happen even for a video
// that's genuinely embeddable, since a raw <iframe> with no error handling just renders
// YouTube's own error screen (e.g. "Error 153: Video player configuration error") inside
// an unmonitored frame instead of something we can catch and replace. A plain outbound
// link, not a re-hosted copy of the video, keeps things resilient without touching
// anyone else's copyrighted content.
export function VideoUnavailableCard({ videoUrl }: { videoUrl: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center"
      style={{ aspectRatio: "16 / 9" }}
    >
      <p className="text-sm text-gray-600">This video can&apos;t be played here.</p>
      <a
        href={videoUrl}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Watch on YouTube
      </a>
    </div>
  );
}

interface YouTubePlayerProps {
  videoId: string;
  videoUrl: string;
  title: string;
}

// A lighter-weight sibling to CheckpointVideoPlayer for embeds that don't need in-video
// checkpoints (e.g. a course's promotional intro video): same resilience pattern (real
// IFrame JS API + onError -> fallback card), without the checkpoint-quiz machinery that
// component layers on top for lessons.
export function YouTubePlayer({ videoId, videoUrl, title }: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    setUnavailable(false);
    let cancelled = false;

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
          },
        });
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  if (unavailable) {
    return <VideoUnavailableCard videoUrl={videoUrl} />;
  }

  return (
    <div
      // The YouTube IFrame API replaces this element's child with a fresh <iframe>
      // sized 640x390 by default, ignoring our h-full/w-full classes -- fine on
      // desktop where the container is close to 640px wide, but badly clipped on
      // mobile. Forcing the injected iframe to fill this wrapper via CSS keeps it
      // responsive regardless of what pixel size YouTube assigns it.
      className="relative overflow-hidden rounded-lg bg-black [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full"
      style={{ aspectRatio: "16 / 9" }}
      role="group"
      aria-label={title}
    >
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
