import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  apiErrorMessage,
  fetchMyCompany,
  joinWithExistingAccount,
  managerInviteStaff,
  managerRemoveStaff,
  MyCompany,
  parseEmailList,
} from "../../api/corporate.api";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { downloadCsv, SeatsTable, StaffTable, staffCsv } from "./StaffTables";

// /company -- the company area of the portal. Every staff member sees their company and
// can add another course their company has seats on; training managers also see seats,
// everyone's progress, the staff sign-up link, and can invite or remove staff.
export function CompanyPage() {
  const [company, setCompany] = useState<MyCompany | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [inviteText, setInviteText] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  function load() {
    return fetchMyCompany()
      .then(setCompany)
      .catch(() => setError("Couldn't load your company's details."));
  }

  useEffect(() => {
    load();
  }, []);

  async function addCourse(courseId: string) {
    if (!company) return;
    setBusy(true);
    setError(null);
    try {
      const { enrolled } = await joinWithExistingAccount(company.joinCode, [courseId]);
      setNotice(`Added: ${enrolled.join(", ")}. It's on your dashboard now.`);
      await load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't add that course."));
    } finally {
      setBusy(false);
    }
  }

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    const emails = parseEmailList(inviteText);
    if (emails.length === 0) {
      setError("Paste at least one email address.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { sent } = await managerInviteStaff(emails);
      setNotice(`Invitation sent to ${sent} ${sent === 1 ? "person" : "people"}.`);
      setInviteText("");
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't send the invitations."));
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove(userId: string, name: string) {
    if (
      !window.confirm(
        `Remove ${name}? They lose access to the company's courses and their seat becomes free for someone else.`,
      )
    )
      return;
    setError(null);
    try {
      setCompany(await managerRemoveStaff(userId));
      setNotice(`${name} was removed and their seat is free.`);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't remove that person."));
    }
  }

  async function copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy the staff sign-up link:", url);
    }
  }

  if (company === undefined && !error) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-900">Company training</h1>
        {error && (
          <div className="mt-4">
            <Alert message={error} />
          </div>
        )}
        <p className="mt-3 text-sm text-gray-600">
          Your account isn't linked to a company. If your employer has bought training for staff, open the staff sign-up
          link they sent you while logged in. Companies interested in staff training can{" "}
          <a href="/" className="text-blue-600 hover:underline">
            see our corporate programmes
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Company training</p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">{company.name}</h1>
      {company.status !== "active" && (
        <div className="mt-4">
          <Alert message="Your company's access is paused. Please contact Paleon Training." />
        </div>
      )}
      {error && (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      )}
      {notice && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</div>
      )}

      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">My courses</h2>
        <p className="mt-1 text-sm text-gray-600">
          Your courses are on your{" "}
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            dashboard
          </Link>
          .
        </p>
        {company.availableCourses.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm text-gray-700">Your company also has seats on:</p>
            {company.availableCourses.map((c) => (
              <div key={c.courseId} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-gray-200 p-3">
                <span className="text-sm font-medium text-gray-900">{c.title}</span>
                <Button variant="secondary" onClick={() => addCourse(c.courseId)} isLoading={busy}>
                  Add this course
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {company.isManager && company.seats && company.members && (
        <>
          <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">Seats</h2>
            <div className="mt-3">
              <SeatsTable seats={company.seats} />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Need more seats or another programme? Email{" "}
              <a href="mailto:corporate@paleontraining.com" className="text-blue-600 hover:underline">
                corporate@paleontraining.com
              </a>
              .
            </p>
          </section>

          <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">Add staff</h2>
            <p className="mt-1 text-sm text-gray-600">
              Share your staff sign-up link (for example on your intranet or in an email), or send invitations below.
              Staff create their own login{company.emailDomain ? ` with their @${company.emailDomain} email` : ""}.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <code className="block flex-1 break-all rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800">
                {company.joinUrl}
              </code>
              <Button variant="secondary" onClick={() => copyLink(company.joinUrl!)}>
                {copied ? "Copied" : "Copy link"}
              </Button>
            </div>
            <form onSubmit={handleInvite} className="mt-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="invite-emails">
                Email invitations
              </label>
              <textarea
                id="invite-emails"
                rows={3}
                value={inviteText}
                onChange={(e) => setInviteText(e.target.value)}
                placeholder="Paste work emails, separated by commas or new lines"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <Button type="submit" className="mt-2" isLoading={busy}>
                Send invitations
              </Button>
            </form>
          </section>

          <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Staff progress ({company.members.length})</h2>
              {company.members.length > 0 && (
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:underline"
                  onClick={() => downloadCsv(`${company.name} staff progress.csv`, staffCsv(company.members!))}
                >
                  Download CSV
                </button>
              )}
            </div>
            <div className="mt-3">
              <StaffTable
                members={company.members}
                actions={(m) =>
                  m.isManager ? null : (
                    <button
                      type="button"
                      className="text-sm text-red-600 hover:underline"
                      onClick={() => handleRemove(m.userId, `${m.firstName} ${m.lastName}`)}
                    >
                      Remove
                    </button>
                  )
                }
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
