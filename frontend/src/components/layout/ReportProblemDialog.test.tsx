import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as supportApi from "../../api/support.api";
import { ReportProblemDialog } from "./ReportProblemDialog";

vi.mock("../../api/support.api");

describe("ReportProblemDialog", () => {
  it("asks for a real description before sending", async () => {
    render(<ReportProblemDialog onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Send report" }));
    expect(await screen.findByText(/describe the problem in a sentence or two/)).toBeInTheDocument();
    expect(supportApi.reportProblem).not.toHaveBeenCalled();
  });

  it("sends the report and shows the reply-time promise", async () => {
    vi.mocked(supportApi.reportProblem).mockResolvedValue();
    render(<ReportProblemDialog onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText(/What were you trying to do/), {
      target: { value: "The Day 2 video shows a black screen." },
    });
    fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp/), { target: { value: "0802 735 1990" } });
    fireEvent.click(screen.getByRole("button", { name: "Send report" }));

    await waitFor(() =>
      expect(supportApi.reportProblem).toHaveBeenCalledWith({
        message: "The Day 2 video shows a black screen.",
        phone: "0802 735 1990",
        screenshot: null,
      }),
    );
    expect(await screen.findByText(/We reply within 1 working day/)).toBeInTheDocument();
  });

  it("falls back to the support email address when sending fails", async () => {
    vi.mocked(supportApi.reportProblem).mockRejectedValue(new Error("Network Error"));
    render(<ReportProblemDialog onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText(/What were you trying to do/), {
      target: { value: "Nothing loads after I log in." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send report" }));
    expect(await screen.findByText(/email support@paleontraining.com instead/)).toBeInTheDocument();
  });
});
