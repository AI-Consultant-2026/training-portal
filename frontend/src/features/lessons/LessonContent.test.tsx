import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LESSON_VIDEO_MARKER, LessonContent } from "./LessonContent";

describe("LessonContent", () => {
  it("shows lesson illustrations as plain images, not links", () => {
    render(
      <LessonContent
        content={"First paragraph.\n\nSecond paragraph."}
        images={[{ url: "/images/lessons/diagram.svg", caption: "The CIA triad", afterParagraph: 0 }]}
      />,
    );
    const img = screen.getByAltText("The CIA triad");
    expect(img.closest("a")).toBeNull();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("The CIA triad")).toBeInTheDocument();
  });

  it("puts the video where the lesson marks it, and keeps image positions", () => {
    const content = ["Intro.", "Before the video.", LESSON_VIDEO_MARKER, "After the video."].join("\n\n");
    const { container } = render(
      <LessonContent
        content={content}
        images={[{ url: "/images/lessons/d.svg", caption: "Diagram", afterParagraph: 3 }]}
        video={<div data-testid="player">player</div>}
      />,
    );
    const html = container.innerHTML;
    const order = ["Before the video.", 'data-testid="player"', "After the video.", "Diagram"].map((t) => html.indexOf(t));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("shows nothing for the marker when there is no video", () => {
    render(<LessonContent content={`Text.\n\n${LESSON_VIDEO_MARKER}`} images={[]} />);
    expect(screen.getByText("Text.")).toBeInTheDocument();
    expect(screen.queryByTestId("player")).not.toBeInTheDocument();
  });
});
