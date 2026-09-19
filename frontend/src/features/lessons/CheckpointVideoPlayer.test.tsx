import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CheckpointVideoPlayer } from "./CheckpointVideoPlayer";

// Mimics what the real YouTube IFrame API does to the DOM: `new YT.Player(el)` replaces
// `el` itself with an <iframe> (it does not append inside it), then reports an error.
class FakePlayer {
  constructor(el: HTMLElement, opts: { events?: { onError?: () => void } }) {
    const iframe = document.createElement("iframe");
    el.replaceWith(iframe);
    setTimeout(() => opts.events?.onError?.(), 0);
  }
  destroy() {}
}

afterEach(() => {
  delete (window as unknown as { YT?: unknown }).YT;
});

describe("CheckpointVideoPlayer", () => {
  it("falls back to the unavailable card when YouTube errors, without crashing React", async () => {
    // Regression: the fallback and the player were both a <div> in the same spot, so React
    // tried to remove the child <div> YouTube had already swapped for an iframe, throwing
    // NotFoundError (Safari: "The object can not be found here") and blanking the page.
    vi.spyOn(console, "error").mockImplementation(() => {});
    (window as unknown as { YT: unknown }).YT = { Player: FakePlayer };

    render(
      <CheckpointVideoPlayer
        lessonId="l1"
        videoId="abc"
        videoUrl="https://www.youtube.com/watch?v=abc"
        checkpoints={[]}
      />,
    );

    await waitFor(() => expect(screen.getByText(/can't be played here/i)).toBeInTheDocument());
  });
});
