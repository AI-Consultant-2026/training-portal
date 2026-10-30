import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axiosClient";
import { countryName, toWhatsAppLink } from "../../api/countries.api";

interface WaitlistSignup {
  id: string;
  country: string;
  whatsapp: string;
  createdAt: string;
}

// WhatsApp numbers left on a "launching soon" country homepage (/za, /ke, /gh), 2026-10-30.
export function AdminWaitlistSection() {
  const [signups, setSignups] = useState<WaitlistSignup[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosClient
      .get<{ signups: WaitlistSignup[] }>("/admin/waitlist")
      .then(({ data }) => setSignups(data.signups))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <h2 className="mt-8 text-lg font-semibold text-gray-900">Country waitlists</h2>
      {error ? (
        <p className="mt-3 text-sm text-red-700">Couldn't load the waitlists.</p>
      ) : signups === null ? (
        <p className="mt-3 text-sm text-gray-500">Loading…</p>
      ) : signups.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">No waitlist sign-ups yet.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">WhatsApp</th>
                <th className="px-4 py-2">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {signups.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-2">{countryName(s.country)}</td>
                  <td className="px-4 py-2">
                    <a className="text-indigo-700 underline" href={toWhatsAppLink(s.whatsapp, s.country)} target="_blank" rel="noopener noreferrer">
                      {s.whatsapp}
                    </a>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{new Date(s.createdAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
