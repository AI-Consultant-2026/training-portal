import { useEffect, useState } from "react";
import { AdminFeedbackRow, fetchAdminFeedback, setFeedbackApproved } from "../../api/feedback.api";

// Learner feedback (2026-09-25). Approving publishes a quote on the homepage and the
// course page (first name + last initial), and is only possible when the student
// agreed to be quoted. Editing by the student resets approval.
export function AdminFeedbackSection() {
  const [rows, setRows] = useState<AdminFeedbackRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminFeedback()
      .then(setRows)
      .catch(() => setError("Could not load feedback."));
  }, []);

  async function toggle(row: AdminFeedbackRow) {
    try {
      await setFeedbackApproved(row.id, !row.approved);
      setRows((current) => current?.map((r) => (r.id === row.id ? { ...r, approved: !row.approved } : r)) ?? null);
    } catch {
      setError("Could not update that feedback.");
    }
  }

  return (
    <>
      <h2 className="mt-8 text-lg font-semibold text-gray-900">Learner feedback</h2>
      <p className="mt-1 text-sm text-gray-500">
        Approved quotes appear on the homepage and the course page as &ldquo;First name L.&rdquo;
      </p>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {rows === null ? (
        !error && <p className="mt-2 text-sm text-gray-500">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">
          No feedback yet. Students are asked for it on their dashboard once they complete a course.
        </p>
      ) : (
        <div className="mt-2 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Feedback</th>
                <th className="px-4 py-2">May quote</th>
                <th className="px-4 py-2">May show capstone</th>
                <th className="px-4 py-2">On website</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 align-top">
                  <td className="px-4 py-2">
                    <div className="font-medium text-gray-900">{row.studentName}</div>
                    <div className="text-xs text-gray-500">{row.studentEmail}</div>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{row.courseTitle}</td>
                  <td className="px-4 py-2 text-amber-600">{"★".repeat(row.rating)}</td>
                  <td className="max-w-md px-4 py-2 text-gray-700">{row.comment}</td>
                  <td className="px-4 py-2 text-gray-600">{row.consentQuote ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-gray-600">{row.consentCapstone ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    {row.consentQuote ? (
                      <button
                        type="button"
                        onClick={() => toggle(row)}
                        className={`rounded-md px-3 py-1 text-xs font-medium ${row.approved ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      >
                        {row.approved ? "Published — unpublish" : "Approve & publish"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">Not permitted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
