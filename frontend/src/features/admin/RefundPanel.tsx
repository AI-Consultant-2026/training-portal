import { useState } from "react";
import { recordRefund } from "../../api/admin.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { RefundStatus } from "../../types/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// Cooling-off refunds on /admin/candidates (2026-10-12), matching terms section 5: shows
// whether a paid enrolment can still be refunded, and records a refund (which locks the
// course). The money itself is refunded from the Paystack dashboard.
export function RefundPanel({
  enrollmentId,
  studentName,
  courseTitle,
  refund,
  onRefunded,
}: {
  enrollmentId: string;
  studentName: string;
  courseTitle: string | null;
  refund: RefundStatus | undefined;
  onRefunded: () => void;
}) {
  const [open, setOpen] = useState(false);
  if (!refund || refund.state === "unpaid") {
    return refund?.refundedAt ? <RefundedLine refund={refund} /> : null;
  }
  if (refund.state === "refunded") return <RefundedLine refund={refund} />;

  const eligible = refund.state === "eligible";
  return (
    <div className="ml-5 mt-1 flex flex-wrap items-center gap-2 text-xs">
      {eligible ? (
        <span className="text-green-700">Refund-eligible until {formatDate(refund.eligibleUntil!)}</span>
      ) : (
        <span className="text-gray-500">Not refund-eligible: {refund.reason}</span>
      )}
      {refund.possiblePriorRefund && (
        <span className="text-amber-700" title="Another account with the same name has had a refund">
          &#9888; Same name as refunded account {refund.possiblePriorRefund}
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`font-medium hover:underline ${eligible ? "text-red-600" : "text-gray-500"}`}
      >
        {eligible ? "Refund" : "Refund anyway"}
      </button>
      {open && (
        <RefundDialog
          enrollmentId={enrollmentId}
          studentName={studentName}
          courseTitle={courseTitle}
          refund={refund}
          onClose={() => setOpen(false)}
          onRefunded={() => {
            setOpen(false);
            onRefunded();
          }}
        />
      )}
    </div>
  );
}

function RefundedLine({ refund }: { refund: RefundStatus }) {
  return (
    <p className="ml-5 mt-1 text-xs text-red-700">
      Refund recorded {refund.refundedAt ? formatDate(refund.refundedAt) : ""}
      {refund.refundNote ? <span className="text-gray-500"> &mdash; {refund.refundNote}</span> : null}
    </p>
  );
}

function RefundDialog({
  enrollmentId,
  studentName,
  courseTitle,
  refund,
  onClose,
  onRefunded,
}: {
  enrollmentId: string;
  studentName: string;
  courseTitle: string | null;
  refund: RefundStatus;
  onClose: () => void;
  onRefunded: () => void;
}) {
  const [note, setNote] = useState("");
  const [paidBack, setPaidBack] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const override = refund.state !== "eligible";

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const result = await recordRefund(enrollmentId, { note: note.trim() || undefined, override });
      if (result.referralWarning) {
        setWarning(result.referralWarning);
        setSaving(false);
        return;
      }
      onRefunded();
    } catch (err) {
      setError(
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ??
          "Could not record the refund.",
      );
      setSaving(false);
    }
  }

  if (warning) {
    return (
      <Modal title="Refund recorded" onClose={onRefunded}>
        <Alert message={warning} />
        <div className="mt-4 flex justify-end">
          <Button onClick={onRefunded}>Done</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={`Refund ${studentName}`} onClose={onClose}>
      <div className="space-y-3 text-sm text-gray-700">
        <p>
          <strong>{courseTitle ?? "This course"}</strong>
          {override ? (
            <span className="text-amber-700">
              {" "}
              &mdash; not eligible under the terms ({refund.reason}). Only refund at your discretion.
            </span>
          ) : (
            <span className="text-green-700"> &mdash; eligible until {formatDate(refund.eligibleUntil!)}.</span>
          )}
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Refund the money first in your <strong>Paystack dashboard</strong>: Transactions, open the student&rsquo;s
            payment, then Refund. Paystack sends it back to the card that paid.
          </li>
          <li>
            Then record it here. This <strong>locks the course</strong> (lessons, quizzes, assignments, capstone), no
            certificate or attendance record will be issued, an unpaid referral reward for it is cancelled, and this
            person can&rsquo;t get another refund.
          </li>
        </ol>
        <label className="block">
          <span className="text-xs font-medium text-gray-600">Note (optional), e.g. Paystack reference or reason</span>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={1000}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={paidBack} onChange={(e) => setPaidBack(e.target.checked)} />
          I&rsquo;ve refunded the money in Paystack (or will now)
        </label>
        {error && <Alert message={error} />}
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={submit} isLoading={saving} disabled={!paidBack}>
            Record refund and lock course
          </Button>
        </div>
      </div>
    </Modal>
  );
}
