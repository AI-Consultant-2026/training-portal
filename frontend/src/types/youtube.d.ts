// Minimal ambient types for the parts of the YouTube IFrame Player API this app
// actually uses. Not the full @types/youtube package -- this app avoids adding
// dependencies for small, self-contained needs like this one.
declare namespace YT {
  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  interface OnStateChangeEvent {
    data: PlayerState;
    target: Player;
  }

  interface PlayerOptions {
    videoId: string;
    playerVars?: Record<string, number | string>;
    events?: {
      onReady?: (event: { target: Player }) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }

  class Player {
    constructor(elementId: string | HTMLElement, options: PlayerOptions);
    playVideo(): void;
    pauseVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getCurrentTime(): number;
    destroy(): void;
  }
}

interface Window {
  YT?: typeof YT;
  onYouTubeIframeAPIReady?: () => void;
}
