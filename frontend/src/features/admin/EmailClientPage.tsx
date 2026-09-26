import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { RichTextEditor } from "../../components/ui/RichTextEditor";
import { Select } from "../../components/ui/Select";
import { Spinner } from "../../components/ui/Spinner";
import { CAMPAIGN_FROM_ADDRESSES, CampaignFromAddress, EmailCampaignRecipient, RecipientStatus } from "../../types/api";
import {
  clearCurrentCampaign,
  confirmSend,
  deleteCampaign,
  fetchCampaign,
  fetchCampaignHistory,
  previewRecipient,
  removeRecipient,
  sendTestEmail,
  toggleRecipientSelected,
  updateCampaign,
  uploadCampaignFile,
} from "./emailCampaignSlice";

const STEP_LABELS = ["Upload", "Review", "Compose", "Preview", "Test", "Send", "Results"] as const;
type Step = (typeof STEP_LABELS)[number];

const STATUS_LABELS: Record<RecipientStatus, string> = {
  pending: "Ready to send",
  queued: "Queued",
  sending: "Sending",
  sent: "Sent",
  failed: "Failed",
  skipped: "Skipped",
  invalid: "Invalid",
  duplicate: "Duplicate",
  unsubscribed: "Unsubscribed",
};

const STATUS_CLASSES: Record<RecipientStatus, string> = {
  pending: "bg-gray-100 text-gray-700",
  queued: "bg-blue-100 text-blue-700",
  sending: "bg-blue-100 text-blue-700",
  sent: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  skipped: "bg-gray-100 text-gray-500",
  invalid: "bg-red-100 text-red-700",
  duplicate: "bg-amber-100 text-amber-700",
  unsubscribed: "bg-gray-200 text-gray-600",
};

function StatusBadge({ status }: { status: RecipientStatus }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

type SortKey = "company" | "contactName" | "email" | "subject" | "status";

function useRecipientTable(recipients: EmailCampaignRecipient[]) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("company");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const rows = term
      ? recipients.filter(
          (r) =>
            r.company.toLowerCase().includes(term) ||
            r.contactName.toLowerCase().includes(term) ||
            r.email.toLowerCase().includes(term) ||
            r.subject.toLowerCase().includes(term),
        )
      : recipients;
    const sorted = [...rows].sort((a, b) => {
      const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [recipients, search, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return { search, setSearch, filtered, sortKey, sortDir, toggleSort };
}

export function EmailClientPage() {
  const dispatch = useAppDispatch();
  const {
    current,
    currentStatus,
    currentError,
    uploadStatus,
    uploadError,
    testEmailStatus,
    testEmailError,
    sendStatus,
    sendError,
    preview,
    previewStatus,
    history,
    historyStatus,
  } = useAppSelector((state) => state.emailCampaigns);

  const [step, setStep] = useState<Step>("Upload");
  const [bodyDraft, setBodyDraft] = useState("");
  const [fromEmailDraft, setFromEmailDraft] = useState<CampaignFromAddress | "">("");
  const [previewRecipientId, setPreviewRecipientId] = useState<string | null>(null);
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [testSampleId, setTestSampleId] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [saveComposeMessage, setSaveComposeMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const recipients = useMemo(() => current?.recipients ?? [], [current]);
  const validRecipients = useMemo(
    () => recipients.filter((r) => r.status === "pending" || r.status === "duplicate"),
    [recipients],
  );
  const table = useRecipientTable(recipients);

  useEffect(() => {
    dispatch(fetchCampaignHistory());
  }, [dispatch]);

  // Keep the draft compose fields in sync whenever a different campaign loads.
  useEffect(() => {
    if (!current) return;
    setBodyDraft(current.bodyTemplate ?? "");
    setFromEmailDraft(current.fromEmail ?? "");
    if (current.status === "completed") setStep("Results");
    else if (current.status === "sending") setStep("Send");
    // Only re-run when a *different* campaign loads (by id) -- current is otherwise
    // updated on every progress poll tick, which must not clobber in-progress compose
    // edits (bodyDraft/fromEmailDraft) or force the user back to an earlier step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  // Progress polling while a send is in flight -- also what makes progress survive a
  // page refresh: reloading the page re-fetches the campaign and, if still "sending",
  // this effect resumes polling exactly where it left off. The actual send itself keeps
  // running server-side regardless of whether anything is polling it.
  useEffect(() => {
    if (current?.status === "sending") {
      pollRef.current = setInterval(() => {
        dispatch(fetchCampaign(current.id));
      }, 2000);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }
    return undefined;
  }, [current?.status, current?.id, dispatch]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch(uploadCampaignFile(file)).then((action) => {
      if (uploadCampaignFile.fulfilled.match(action)) {
        setStep("Review");
      }
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleNewCampaign() {
    dispatch(clearCurrentCampaign());
    setStep("Upload");
    setBodyDraft("");
    setFromEmailDraft("");
  }

  function handleOpenCampaign(id: string) {
    dispatch(fetchCampaign(id)).then((action) => {
      if (fetchCampaign.fulfilled.match(action)) {
        const loaded = action.payload;
        if (loaded.status === "completed") setStep("Results");
        else if (loaded.status === "sending") setStep("Send");
        else setStep("Review");
      }
    });
  }

  function handleToggle(recipientId: string, isSelected: boolean) {
    if (!current) return;
    dispatch(toggleRecipientSelected({ campaignId: current.id, recipientId, isSelected }));
  }

  function handleRemove(recipientId: string) {
    if (!current) return;
    if (!window.confirm("Remove this contact from the campaign?")) return;
    dispatch(removeRecipient({ campaignId: current.id, recipientId }));
  }

  function handleSelectAllValid() {
    if (!current) return;
    validRecipients
      .filter((r) => !r.isSelected)
      .forEach((r) => dispatch(toggleRecipientSelected({ campaignId: current.id, recipientId: r.id, isSelected: true })));
  }

  function handleSaveCompose() {
    if (!current) return;
    if (!fromEmailDraft) {
      setSaveComposeMessage("Choose a From address first.");
      return;
    }
    if (!bodyDraft.trim()) {
      setSaveComposeMessage("Write the email body first.");
      return;
    }
    dispatch(
      updateCampaign({
        id: current.id,
        input: { fromEmail: fromEmailDraft, bodyTemplate: bodyDraft },
      }),
    ).then((action) => {
      if (updateCampaign.fulfilled.match(action)) {
        setSaveComposeMessage("Saved.");
        setStep("Preview");
      }
    });
  }

  function handlePreview(recipientId: string) {
    if (!current) return;
    setPreviewRecipientId(recipientId);
    dispatch(previewRecipient({ campaignId: current.id, recipientId }));
  }

  function handleSendTest() {
    if (!current || !testEmailAddress) return;
    dispatch(
      sendTestEmail({
        campaignId: current.id,
        testEmail: testEmailAddress,
        sampleRecipientId: testSampleId || undefined,
      }),
    );
  }

  function handleConfirmSend() {
    if (!current) return;
    dispatch(confirmSend(current.id)).then((action) => {
      if (confirmSend.fulfilled.match(action)) {
        setShowConfirmModal(false);
        setStep("Send");
      }
    });
  }

  const hasSelectedRecipients = recipients.some((r) => r.isSelected && (r.status === "pending" || r.status === "duplicate"));
  const canReachReview = !!current && recipients.length > 0;
  // Requires an actual selected, valid recipient -- not just canReachReview (any rows
  // imported, valid or not) -- to match the Review step's own "Next" button, which
  // already blocks on selectedCount === 0. Without this, the step tabs let you bypass
  // that button entirely and land on an empty, unexplained Preview/Test/Send with
  // nothing to show (e.g. a spreadsheet with every row invalid for a missing Subject
  // column still "has recipients" in the loose sense, just none of them usable).
  // Only enforced while still a draft: once a campaign has been sent (or is sending),
  // its recipients have already moved on from "pending"/"duplicate" to "sent"/"failed"/
  // etc, so hasSelectedRecipients would otherwise go false and wrongly lock a completed
  // or in-progress campaign's own tabs after the fact.
  const canReachCompose = canReachReview && (current?.status !== "draft" || hasSelectedRecipients);
  const canReachPreview = canReachCompose && !!current?.fromEmail && !!current?.bodyTemplate;
  const canReachTest = canReachPreview;
  const canReachSend = canReachTest;

  function stepEnabled(s: Step): boolean {
    switch (s) {
      case "Upload":
        return true;
      case "Review":
        return canReachReview;
      case "Compose":
        return canReachCompose;
      case "Preview":
        return canReachPreview;
      case "Test":
        return canReachTest;
      case "Send":
        return canReachSend;
      case "Results":
        return current?.status === "completed" || current?.status === "sending";
      default:
        return false;
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin" className="text-sm text-blue-600 hover:underline">
            ← Admin dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">Email client</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload a contact spreadsheet, compose one message, and send personalised emails.
          </p>
        </div>
        {current && (
          <Button variant="secondary" onClick={handleNewCampaign}>
            New campaign
          </Button>
        )}
      </div>

      {!current && (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UploadStep
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              uploadStatus={uploadStatus}
              uploadError={uploadError}
            />
          </div>
          <div>
            <CampaignHistory
              history={history}
              historyStatus={historyStatus}
              onOpen={handleOpenCampaign}
              onDelete={(id) => dispatch(deleteCampaign(id)).unwrap()}
            />
          </div>
        </div>
      )}

      {current && (
        <>
          <nav className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
            {STEP_LABELS.map((s) => (
              <button
                key={s}
                type="button"
                disabled={!stepEnabled(s)}
                onClick={() => setStep(s)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  step === s
                    ? "bg-blue-600 text-white"
                    : stepEnabled(s)
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "cursor-not-allowed bg-gray-50 text-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>

          {currentError && (
            <div className="mt-4">
              <Alert message={currentError} />
            </div>
          )}

          <div className="mt-6">
            {currentStatus === "loading" && !current ? (
              <div className="flex justify-center py-16">
                <Spinner />
              </div>
            ) : (
              <>
                {step === "Upload" && (
                  <UploadStep
                    onFileChange={handleFileChange}
                    fileInputRef={fileInputRef}
                    uploadStatus={uploadStatus}
                    uploadError={uploadError}
                  />
                )}

                {step === "Review" && (
                  <ReviewStep
                    campaign={current}
                    recipients={recipients}
                    table={table}
                    onToggle={handleToggle}
                    onRemove={handleRemove}
                    onSelectAllValid={handleSelectAllValid}
                    onNext={() => setStep("Compose")}
                  />
                )}

                {step === "Compose" && (
                  <ComposeStep
                    fromEmail={fromEmailDraft}
                    setFromEmail={setFromEmailDraft}
                    bodyDraft={bodyDraft}
                    setBodyDraft={setBodyDraft}
                    message={saveComposeMessage}
                    onSave={handleSaveCompose}
                  />
                )}

                {step === "Preview" && (
                  <PreviewStep
                    recipients={validRecipients.filter((r) => r.isSelected)}
                    selectedId={previewRecipientId}
                    onSelect={handlePreview}
                    preview={preview}
                    previewStatus={previewStatus}
                    onNext={() => setStep("Test")}
                  />
                )}

                {step === "Test" && (
                  <TestStep
                    recipients={validRecipients}
                    testEmailAddress={testEmailAddress}
                    setTestEmailAddress={setTestEmailAddress}
                    testSampleId={testSampleId}
                    setTestSampleId={setTestSampleId}
                    onSend={handleSendTest}
                    testEmailStatus={testEmailStatus}
                    testEmailError={testEmailError}
                    onNext={() => setStep("Send")}
                  />
                )}

                {step === "Send" && (
                  <SendStep
                    campaign={current}
                    selectedCount={recipients.filter((r) => r.isSelected && (r.status === "pending" || r.status === "duplicate")).length}
                    onOpenConfirm={() => setShowConfirmModal(true)}
                    sendStatus={sendStatus}
                    sendError={sendError}
                    onViewResults={() => setStep("Results")}
                  />
                )}

                {step === "Results" && <ResultsStep campaign={current} recipients={recipients} />}
              </>
            )}
          </div>
        </>
      )}

      {showConfirmModal && current && (
        <ConfirmSendModal
          campaign={current}
          selectedCount={recipients.filter((r) => r.isSelected && (r.status === "pending" || r.status === "duplicate")).length}
          invalidCount={current.invalidRecipients}
          duplicateCount={current.duplicateRecipients}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmSend}
          sending={sendStatus === "loading"}
        />
      )}
    </div>
  );
}

// --- Step 1: Upload -------------------------------------------------------

function UploadStep({
  onFileChange,
  fileInputRef,
  uploadStatus,
  uploadError,
}: {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  uploadStatus: string;
  uploadError: string | null;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 1 — Upload a contact spreadsheet</h2>
      <p className="mt-1 text-sm text-gray-500">
        The .xlsx file must have these exact columns: <strong>Company</strong>, <strong>Email</strong>,{" "}
        <strong>Subject</strong>, <strong>Contact Name</strong>. Fully empty rows are ignored.
      </p>
      <div className="mt-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx"
          onChange={onFileChange}
          disabled={uploadStatus === "loading"}
          className="block text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
        />
      </div>
      {uploadStatus === "loading" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <Spinner /> Importing...
        </div>
      )}
      {uploadError && (
        <div className="mt-4">
          <Alert message={uploadError} />
        </div>
      )}
    </div>
  );
}

// --- Campaign history -------------------------------------------------------

function CampaignHistory({
  history,
  historyStatus,
  onOpen,
  onDelete,
}: {
  history: import("../../types/api").EmailCampaign[];
  historyStatus: string;
  onOpen: (id: string) => void;
  onDelete: (id: string) => Promise<unknown>;
}) {
  const [pendingDelete, setPendingDelete] = useState<import("../../types/api").EmailCampaign | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function closeDeleteModal() {
    if (deleting) return;
    setPendingDelete(null);
    setDeleteError(null);
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await onDelete(pendingDelete.id);
      setPendingDelete(null);
    } catch (err) {
      setDeleteError(typeof err === "string" ? err : "Could not delete this campaign.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-900">Campaign history</h2>
      {historyStatus === "loading" && (
        <div className="mt-3 flex justify-center">
          <Spinner />
        </div>
      )}
      {historyStatus !== "loading" && history.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">No campaigns yet.</p>
      )}
      <ul className="mt-2 divide-y divide-gray-100">
        {history.map((c) => (
          <li key={c.id} className="flex items-start gap-2 py-2">
            <button
              type="button"
              onClick={() => onOpen(c.id)}
              className="min-w-0 flex-1 text-left text-sm text-gray-700 hover:text-blue-600"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-medium">{c.originalFilename}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    c.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : c.status === "sending"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-gray-500">
                {c.fromEmail ?? "no sender yet"} · {c.sentCount} sent · {c.failedCount} failed ·{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPendingDelete(c)}
              disabled={c.status === "sending"}
              title={c.status === "sending" ? "Can't delete while the campaign is sending" : "Delete this campaign"}
              aria-label={`Delete campaign ${c.originalFilename}`}
              className="shrink-0 rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {pendingDelete && (
        <Modal title="Delete campaign?" onClose={closeDeleteModal}>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{pendingDelete.originalFilename}</span> and its recipient list will be
            permanently deleted.
            {pendingDelete.status === "completed" &&
              " Its delivery log (who was sent to, and any failures) will be deleted too. Emails already sent are not affected."}{" "}
            This can't be undone.
          </p>
          {deleteError && (
            <div className="mt-3">
              <Alert message={deleteError} />
            </div>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={closeDeleteModal} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete} isLoading={deleting}>
              Delete campaign
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// --- Step 2: Review --------------------------------------------------------

function ReviewStep({
  campaign,
  recipients,
  table,
  onToggle,
  onRemove,
  onSelectAllValid,
  onNext,
}: {
  campaign: import("../../types/api").EmailCampaign;
  recipients: EmailCampaignRecipient[];
  table: ReturnType<typeof useRecipientTable>;
  onToggle: (recipientId: string, isSelected: boolean) => void;
  onRemove: (recipientId: string) => void;
  onSelectAllValid: () => void;
  onNext: () => void;
}) {
  const [showInvalidOnly, setShowInvalidOnly] = useState(false);
  const rows = showInvalidOnly
    ? table.filtered.filter((r) => r.status === "invalid" || r.status === "duplicate" || r.status === "unsubscribed")
    : table.filtered;
  const selectedCount = recipients.filter((r) => r.isSelected).length;

  const sortHeader = (key: SortKey, label: string) => (
    <button
      type="button"
      onClick={() => table.toggleSort(key)}
      className="flex items-center gap-1 text-left font-medium"
    >
      {label}
      {table.sortKey === key && <span>{table.sortDir === "asc" ? "▲" : "▼"}</span>}
    </button>
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 2 — Review contacts</h2>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Imported</p>
          <p className="text-lg font-semibold text-gray-900">{campaign.totalRecipients}</p>
        </div>
        <div className="rounded-md bg-green-50 p-3">
          <p className="text-xs text-green-700">Valid</p>
          <p className="text-lg font-semibold text-green-800">{campaign.validRecipients}</p>
        </div>
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-xs text-red-700">Invalid</p>
          <p className="text-lg font-semibold text-red-800">{campaign.invalidRecipients}</p>
        </div>
        <div className="rounded-md bg-amber-50 p-3">
          <p className="text-xs text-amber-700">Duplicates</p>
          <p className="text-lg font-semibold text-amber-800">{campaign.duplicateRecipients}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search contacts..."
            value={table.search}
            onChange={(e) => table.setSearch(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label className="flex items-center gap-1.5 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showInvalidOnly}
              onChange={(e) => setShowInvalidOnly(e.target.checked)}
            />
            Show invalid/duplicate/unsubscribed only
          </label>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{selectedCount} selected</span>
          <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={onSelectAllValid}>
            Select all valid
          </Button>
        </div>
      </div>

      <div className="mt-4 max-h-[28rem] overflow-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2" />
              <th className="px-3 py-2">{sortHeader("company", "Company")}</th>
              <th className="px-3 py-2">{sortHeader("contactName", "Contact Name")}</th>
              <th className="px-3 py-2">{sortHeader("email", "Email")}</th>
              <th className="px-3 py-2">{sortHeader("subject", "Subject")}</th>
              <th className="px-3 py-2">{sortHeader("status", "Status")}</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={r.isSelected}
                    disabled={r.status === "invalid" || r.status === "unsubscribed"}
                    onChange={(e) => onToggle(r.id, e.target.checked)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900">{r.company || "—"}</td>
                <td className="px-3 py-2 text-gray-600">{r.contactName || "—"}</td>
                <td className="px-3 py-2 text-gray-600">{r.email || "—"}</td>
                <td className="px-3 py-2 text-gray-600">{r.subject || "—"}</td>
                <td className="px-3 py-2">
                  <StatusBadge status={r.status} />
                  {r.validationErrors.length > 0 && (
                    <div className="mt-1 text-xs text-red-600">{r.validationErrors.join(" ")}</div>
                  )}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => onRemove(r.id)}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {selectedCount === 0 && (
          <p className="text-sm text-red-600">
            Select at least one valid contact to continue — every row is currently invalid or unselected.
          </p>
        )}
        <Button onClick={onNext} disabled={selectedCount === 0}>
          Next: Compose email →
        </Button>
      </div>
    </div>
  );
}

// --- Step 3/4: Select sender + Compose -------------------------------------

function ComposeStep({
  fromEmail,
  setFromEmail,
  bodyDraft,
  setBodyDraft,
  message,
  onSave,
}: {
  fromEmail: CampaignFromAddress | "";
  setFromEmail: (v: CampaignFromAddress | "") => void;
  bodyDraft: string;
  setBodyDraft: (v: string) => void;
  message: string | null;
  onSave: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 3 — Select sender &amp; compose</h2>

      <div className="mt-4 max-w-xs">
        <Select
          label="From address"
          id="from-email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value as CampaignFromAddress)}
        >
          <option value="">Choose a sender...</option>
          {CAMPAIGN_FROM_ADDRESSES.map((addr) => (
            <option key={addr} value={addr}>
              {addr}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <span className="text-sm font-medium text-gray-700">Email body</span>
        <p className="mt-0.5 text-xs text-gray-500">
          Paste or type your message and format it with the toolbar. A blank line in pasted text starts a new
          paragraph; bold, italics, lists and links pasted from Word or Google Docs are kept.
        </p>
        <RichTextEditor
          value={bodyDraft}
          onChange={setBodyDraft}
          placeholder="Dear {{Contact Name}}, …"
        />
        <div className="mt-2 rounded-md bg-gray-50 p-3 text-xs text-gray-500">
          <p className="font-medium text-gray-600">Available variables</p>
          <p className="mt-1">
            <code className="rounded bg-gray-200 px-1">{"{{Contact Name}}"}</code> — the contact's name from the
            spreadsheet
          </p>
          <p>
            <code className="rounded bg-gray-200 px-1">{"{{Company}}"}</code> — the company/organisation name from
            the spreadsheet
          </p>
          <p className="mt-1">The Subject for each email comes from the spreadsheet's Subject column and may also use these variables.</p>
        </div>
      </div>

      {message && (
        <div className="mt-3">
          <Alert message={message} variant={message === "Saved." ? "success" : "error"} />
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={onSave}>Save &amp; continue →</Button>
      </div>
    </div>
  );
}

// --- Step 5: Preview ---------------------------------------------------

// Shows the exact HTML the recipient will get (already sanitised server-side) in a
// sandboxed iframe: no scripts can run, and the email's inline styles can't leak into
// the admin page. Height follows the content once it has loaded.
function EmailHtmlPreview({ html }: { html: string }) {
  const [height, setHeight] = useState(240);
  return (
    <iframe
      title="Email preview"
      sandbox="allow-same-origin"
      srcDoc={`<!doctype html><html><body style="margin:0;padding:16px;background:#fff">${html}</body></html>`}
      onLoad={(e) => {
        const doc = e.currentTarget.contentDocument;
        if (doc) setHeight(Math.max(120, doc.documentElement.scrollHeight + 4));
      }}
      style={{ height }}
      className="mt-3 w-full rounded-md border border-gray-200 bg-white"
    />
  );
}

function PreviewStep({
  recipients,
  selectedId,
  onSelect,
  preview,
  previewStatus,
  onNext,
}: {
  recipients: EmailCampaignRecipient[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  preview: import("../../types/api").EmailPreview | null;
  previewStatus: string;
  onNext: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 5 — Preview</h2>
      <p className="mt-1 text-sm text-gray-500">
        Pick a recipient to see exactly what their personalised email will look like.
      </p>

      {recipients.length === 0 ? (
        <div className="mt-4">
          <Alert message="No recipients are selected to preview. Go back to Review and select at least one valid contact — an empty list here usually means every row in the spreadsheet failed validation (check the Review step for why)." />
        </div>
      ) : (
        <div className="mt-4 max-w-sm">
          <Select
            label="Recipient"
            id="preview-recipient"
            value={selectedId ?? ""}
            onChange={(e) => onSelect(e.target.value)}
          >
            <option value="">Choose a recipient...</option>
            {recipients.map((r) => (
              <option key={r.id} value={r.id}>
                {r.contactName} — {r.company}
              </option>
            ))}
          </Select>
        </div>
      )}

      <div className="mt-4">
        {previewStatus === "loading" && (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}
        {preview && previewStatus === "succeeded" && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">From:</span> {preview.from}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">To:</span> {preview.to}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Subject:</span> {preview.subject}
            </p>
            <EmailHtmlPreview html={preview.html} />
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onNext}>Next: Test email →</Button>
      </div>
    </div>
  );
}

// --- Step 6: Test -------------------------------------------------------

function TestStep({
  recipients,
  testEmailAddress,
  setTestEmailAddress,
  testSampleId,
  setTestSampleId,
  onSend,
  testEmailStatus,
  testEmailError,
  onNext,
}: {
  recipients: EmailCampaignRecipient[];
  testEmailAddress: string;
  setTestEmailAddress: (v: string) => void;
  testSampleId: string;
  setTestSampleId: (v: string) => void;
  onSend: () => void;
  testEmailStatus: string;
  testEmailError: string | null;
  onNext: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 6 — Send a test email</h2>
      <p className="mt-1 text-sm text-gray-500">
        Send yourself (or anyone) one personalised test email before sending the full campaign. This never sends to
        the recipient list.
      </p>

      <div className="mt-4 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Test email address"
          id="test-email"
          type="email"
          value={testEmailAddress}
          onChange={(e) => setTestEmailAddress(e.target.value)}
          placeholder="you@example.com"
        />
        <Select
          label="Sample contact (for personalisation)"
          id="test-sample"
          value={testSampleId}
          onChange={(e) => setTestSampleId(e.target.value)}
        >
          <option value="">First ready contact</option>
          {recipients.map((r) => (
            <option key={r.id} value={r.id}>
              {r.contactName} — {r.company}
            </option>
          ))}
        </Select>
      </div>
      {recipients.length === 0 && (
        <p className="mt-2 text-xs text-amber-600">
          No selected contacts to personalise from — the test will use a placeholder example instead.
        </p>
      )}

      {testEmailStatus === "succeeded" && (
        <div className="mt-4">
          <Alert
            variant="success"
            message="Test email sent. Check the inbox for that address (and MailHog at http://localhost:8025 in local dev)."
          />
        </div>
      )}
      {testEmailError && (
        <div className="mt-4">
          <Alert message={testEmailError} />
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="secondary" onClick={onSend} isLoading={testEmailStatus === "loading"} disabled={!testEmailAddress}>
          Send test email
        </Button>
        <Button onClick={onNext}>Next: Send campaign →</Button>
      </div>
    </div>
  );
}

// --- Step 7: Send -------------------------------------------------------

function SendStep({
  campaign,
  selectedCount,
  onOpenConfirm,
  sendStatus,
  sendError,
  onViewResults,
}: {
  campaign: import("../../types/api").EmailCampaign;
  selectedCount: number;
  onOpenConfirm: () => void;
  sendStatus: string;
  sendError: string | null;
  onViewResults: () => void;
}) {
  const isSending = campaign.status === "sending";
  const attempted = campaign.sentCount + campaign.failedCount;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Step 7 — Send</h2>

      {!isSending && campaign.status === "draft" && (
        <>
          <p className="mt-2 text-sm text-gray-600">
            {selectedCount} recipient{selectedCount === 1 ? "" : "s"} selected to send from{" "}
            <strong>{campaign.fromEmail}</strong>.
          </p>
          {sendError && (
            <div className="mt-3">
              <Alert message={sendError} />
            </div>
          )}
          <div className="mt-6">
            <Button onClick={onOpenConfirm} isLoading={sendStatus === "loading"} disabled={selectedCount === 0}>
              Confirm &amp; Send
            </Button>
          </div>
        </>
      )}

      {isSending && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Sending emails... {attempted} / {selectedCount || campaign.validRecipients + campaign.duplicateRecipients} sent
          </p>
          <div className="mt-2">
            <ProgressBar
              percent={
                selectedCount > 0 ? (attempted / selectedCount) * 100 : attempted > 0 ? 100 : 0
              }
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            This keeps running even if you refresh the page or navigate away — come back to this campaign from
            Campaign history to check on it.
          </p>
        </div>
      )}

      {campaign.status === "completed" && (
        <div className="mt-4">
          <Alert variant="success" message="This campaign has finished sending." />
          <div className="mt-4">
            <Button onClick={onViewResults}>View results →</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmSendModal({
  campaign,
  selectedCount,
  invalidCount,
  duplicateCount,
  onCancel,
  onConfirm,
  sending,
}: {
  campaign: import("../../types/api").EmailCampaign;
  selectedCount: number;
  invalidCount: number;
  duplicateCount: number;
  onCancel: () => void;
  onConfirm: () => void;
  sending: boolean;
}) {
  const exampleRecipient = campaign.recipients?.find((r) => r.isSelected);
  return (
    <Modal title="Confirm campaign send" onClose={onCancel}>
      <p className="text-sm text-gray-700">
        You are about to send <strong>{selectedCount}</strong> email{selectedCount === 1 ? "" : "s"} from{" "}
        <strong>{campaign.fromEmail}</strong>.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-gray-500">Valid recipients</dt>
          <dd className="font-medium text-gray-900">{campaign.validRecipients}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Invalid records (excluded)</dt>
          <dd className="font-medium text-gray-900">{invalidCount}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Duplicate records</dt>
          <dd className="font-medium text-gray-900">{duplicateCount}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Example subject</dt>
          <dd className="font-medium text-gray-900">{exampleRecipient?.subject ?? "—"}</dd>
        </div>
      </dl>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel} disabled={sending}>
          Cancel
        </Button>
        <Button onClick={onConfirm} isLoading={sending}>
          Confirm &amp; Send
        </Button>
      </div>
    </Modal>
  );
}

// --- Step 8: Results -------------------------------------------------------

function ResultsStep({
  campaign,
  recipients,
}: {
  campaign: import("../../types/api").EmailCampaign;
  recipients: EmailCampaignRecipient[];
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Campaign complete</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs text-gray-500">From</p>
          <p className="text-sm font-semibold text-gray-900">{campaign.fromEmail}</p>
        </div>
        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Recipients</p>
          <p className="text-lg font-semibold text-gray-900">{campaign.sentCount + campaign.failedCount}</p>
        </div>
        <div className="rounded-md bg-green-50 p-3">
          <p className="text-xs text-green-700">Successfully sent</p>
          <p className="text-lg font-semibold text-green-800">{campaign.sentCount}</p>
        </div>
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-xs text-red-700">Failed</p>
          <p className="text-lg font-semibold text-red-800">{campaign.failedCount}</p>
        </div>
      </div>

      <div className="mt-6 max-h-[28rem] overflow-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2 text-gray-900">{r.company}</td>
                <td className="px-3 py-2 text-gray-600">{r.contactName}</td>
                <td className="px-3 py-2 text-gray-600">{r.email}</td>
                <td className="px-3 py-2">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-3 py-2 text-xs text-red-600">{r.errorMessage ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
