import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as emailCampaignsApi from "../../api/emailCampaigns.api";
import { renderWithProviders } from "../../test/test-utils";
import { EmailCampaign } from "../../types/api";
import { EmailClientPage } from "./EmailClientPage";

vi.mock("../../api/emailCampaigns.api");

function campaign(overrides: Partial<EmailCampaign>): EmailCampaign {
  return {
    id: "c1",
    createdBy: "admin-1",
    fromEmail: "hello@paleontraining.com",
    bodyTemplate: "<p>Hi</p>",
    ccEmails: null,
    status: "draft",
    originalFilename: "contacts.xlsx",
    totalRecipients: 3,
    validRecipients: 3,
    invalidRecipients: 0,
    duplicateRecipients: 0,
    sentCount: 0,
    failedCount: 0,
    createdAt: "2026-09-20T10:00:00.000Z",
    updatedAt: "2026-09-20T10:00:00.000Z",
    ...overrides,
  };
}

const DRAFT = campaign({ id: "draft-1", originalFilename: "oil-and-gas-leads.xlsx" });
const DONE = campaign({ id: "done-1", originalFilename: "banks.xlsx", status: "completed", sentCount: 3 });
const SENDING = campaign({ id: "sending-1", originalFilename: "telecoms.xlsx", status: "sending" });

describe("EmailClientPage — deleting campaigns", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(emailCampaignsApi.fetchCampaigns).mockResolvedValue([DRAFT, DONE, SENDING]);
  });

  it("deletes a campaign after confirmation and removes it from the history", async () => {
    vi.mocked(emailCampaignsApi.deleteCampaign).mockResolvedValue();
    const user = userEvent.setup();
    renderWithProviders(<EmailClientPage />);

    await user.click(await screen.findByRole("button", { name: "Delete campaign oil-and-gas-leads.xlsx" }));
    const dialog = screen.getByText("Delete campaign?").closest("div")!.parentElement!;
    expect(within(dialog).getByText(/can't be undone/)).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Delete campaign" }));

    expect(emailCampaignsApi.deleteCampaign).toHaveBeenCalledWith("draft-1");
    await waitFor(() => expect(screen.queryByText("oil-and-gas-leads.xlsx")).not.toBeInTheDocument());
    expect(screen.queryByText("Delete campaign?")).not.toBeInTheDocument();
    expect(screen.getByText("banks.xlsx")).toBeInTheDocument();
  });

  it("does nothing when the confirmation is cancelled", async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmailClientPage />);

    await user.click(await screen.findByRole("button", { name: "Delete campaign banks.xlsx" }));
    expect(screen.getByText(/delivery log/)).toBeInTheDocument(); // extra warning for sent campaigns
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(emailCampaignsApi.deleteCampaign).not.toHaveBeenCalled();
    expect(screen.getByText("banks.xlsx")).toBeInTheDocument();
  });

  it("disables Delete for a campaign that is still sending", async () => {
    renderWithProviders(<EmailClientPage />);
    expect(await screen.findByRole("button", { name: "Delete campaign telecoms.xlsx" })).toBeDisabled();
  });

  it("shows the server's message when deletion fails", async () => {
    vi.mocked(emailCampaignsApi.deleteCampaign).mockRejectedValue({
      response: { data: { error: { message: "This campaign is still sending. Wait until it finishes, then delete it." } } },
    });
    const user = userEvent.setup();
    renderWithProviders(<EmailClientPage />);

    await user.click(await screen.findByRole("button", { name: "Delete campaign oil-and-gas-leads.xlsx" }));
    await user.click(screen.getByRole("button", { name: "Delete campaign" }));

    expect(await screen.findByText(/still sending/)).toBeInTheDocument();
    // still listed, and the dialog stays open so the admin sees why
    expect(screen.getByRole("button", { name: "Delete campaign oil-and-gas-leads.xlsx" })).toBeInTheDocument();
    expect(screen.getByText("Delete campaign?")).toBeInTheDocument();
  });
});

describe("EmailClientPage — CC and attachments", () => {
  const recipient = {
    id: "r1",
    campaignId: "draft-1",
    rowNumber: 2,
    company: "NCDMB",
    email: "info@ncdmb.example.com",
    contactName: "Executive Secretary",
    subject: "Partnership proposal",
    status: "pending" as const,
    isSelected: true,
    validationErrors: [],
    errorMessage: null,
    sentAt: null,
    createdAt: "2026-10-18T10:00:00.000Z",
    updatedAt: "2026-10-18T10:00:00.000Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(emailCampaignsApi.fetchCampaigns).mockResolvedValue([DRAFT]);
    vi.mocked(emailCampaignsApi.fetchCampaign).mockResolvedValue({ ...DRAFT, recipients: [recipient], attachments: [] });
  });

  it("attaches and removes a file, and saves the CC list with the body", async () => {
    vi.mocked(emailCampaignsApi.addAttachment).mockResolvedValue({
      id: "a1",
      campaignId: "draft-1",
      filename: "02-ncdmb.pdf",
      contentType: "application/pdf",
      sizeBytes: 200_000,
      createdAt: "2026-10-18T10:00:00.000Z",
    });
    vi.mocked(emailCampaignsApi.removeAttachment).mockResolvedValue();
    vi.mocked(emailCampaignsApi.updateCampaign).mockResolvedValue({ ...DRAFT, ccEmails: "cc@example.com" });
    const user = userEvent.setup();
    renderWithProviders(<EmailClientPage />);

    await user.click(await screen.findByText("oil-and-gas-leads.xlsx"));
    await user.click(await screen.findByRole("button", { name: "Compose" }));

    const pdf = new File(["%PDF-1.4"], "02-ncdmb.pdf", { type: "application/pdf" });
    await user.upload(screen.getByLabelText("Attach a file"), pdf);
    expect(emailCampaignsApi.addAttachment).toHaveBeenCalledWith("draft-1", pdf);
    expect(await screen.findByText(/02-ncdmb\.pdf/)).toBeInTheDocument();

    await user.type(screen.getByLabelText("CC (optional)"), "cc@example.com");
    await user.click(screen.getByRole("button", { name: /Save & continue/ }));
    expect(emailCampaignsApi.updateCampaign).toHaveBeenCalledWith(
      "draft-1",
      expect.objectContaining({ ccEmails: "cc@example.com" }),
    );

    await user.click(screen.getByRole("button", { name: "Compose" }));
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(emailCampaignsApi.removeAttachment).toHaveBeenCalledWith("draft-1", "a1");
    await waitFor(() => expect(screen.queryByText(/02-ncdmb\.pdf/)).not.toBeInTheDocument());
  });
});
