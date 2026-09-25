import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LessonContent } from "./LessonContent";

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
});
