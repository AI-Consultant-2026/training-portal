import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import * as assignmentsApi from "../../api/assignments.api";
import { renderWithProviders } from "../../test/test-utils";
import { Assignment } from "../../types/api";
import { AssignmentDetailPage } from "./AssignmentDetailPage";

vi.mock("../../api/assignments.api");

const ASSIGNMENT: Assignment = {
  id: "assignment-1",
  moduleId: "module-1",
  title: "Phishing Email Identification",
  description: "## What you must submit\n\n- Three verdicts\n\n| Criterion | Marks |\n|---|---|\n| Tells | 40 |",
  dueDate: null,
  fileRequired: false,
  gradingRubric: null,
  pointsTotal: 100,
};

function renderPage() {
  return renderWithProviders(
    <Routes>
      <Route path="/assignments/:id" element={<AssignmentDetailPage />} />
    </Routes>,
    { route: "/assignments/assignment-1" },
  );
}

function mockLoad() {
  vi.mocked(assignmentsApi.fetchAssignment).mockResolvedValue(ASSIGNMENT);
  vi.mocked(assignmentsApi.fetchMySubmissionForAssignment).mockResolvedValue(null);
}

describe("AssignmentDetailPage", () => {
  it("renders the brief as formatted markdown (headings, lists, tables)", async () => {
    mockLoad();
    renderPage();
    expect(await screen.findByRole("heading", { name: "What you must submit" })).toBeInTheDocument();
    expect(screen.getByText("Three verdicts")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Criterion" })).toBeInTheDocument();
  });

  it("never turns links in a brief (such as a sample phishing URL) into clickable anchors", async () => {
    vi.mocked(assignmentsApi.fetchAssignment).mockResolvedValue({
      ...ASSIGNMENT,
      description: "Sample message:\n\n> Verify now: http://bank-verify.example/login and mail <help@bank-verify.example>",
    });
    vi.mocked(assignmentsApi.fetchMySubmissionForAssignment).mockResolvedValue(null);
    renderPage();
    expect(await screen.findByText(/bank-verify\.example\/login/)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("shows the blocking 'AI-Generated Answer Detected' dialog when the server rejects the submission", async () => {
    mockLoad();
    vi.mocked(assignmentsApi.submitAssignment).mockRejectedValue({
      response: {
        status: 422,
        data: {
          error: {
            message: "AI-Generated Answer Detected — Submission Not Accepted",
            details: {
              code: "AI_GENERATED_CONTENT",
              source: "answer",
              instruction: "Please rewrite it in your own words and resubmit.",
            },
          },
        },
      },
    });
    renderPage();
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText("Your submission"), "some generated answer");
    await user.click(screen.getByRole("button", { name: "Submit assignment" }));

    const dialog = await screen.findByRole("alertdialog");
    expect(
      screen.getByRole("heading", { name: "AI-Generated Answer Detected — Submission Not Accepted" }),
    ).toBeInTheDocument();
    expect(dialog).toHaveTextContent("rewrite it in your own words");
    // Not shown as an ordinary inline error, and not treated as a saved submission.
    expect(screen.queryByText("Submitted successfully.")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Rewrite my answer" }));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
    // The candidate's text is kept so they can rewrite it.
    expect(screen.getByLabelText("Your submission")).toHaveValue("some generated answer");
  });

  it("still shows ordinary submit errors inline, with no dialog", async () => {
    mockLoad();
    vi.mocked(assignmentsApi.submitAssignment).mockRejectedValue({
      response: { status: 403, data: { error: { message: "This assignment unlocks once your payment has been confirmed" } } },
    });
    renderPage();
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText("Your submission"), "my answer");
    await user.click(screen.getByRole("button", { name: "Submit assignment" }));
    expect(await screen.findByText(/unlocks once your payment/)).toBeInTheDocument();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});
