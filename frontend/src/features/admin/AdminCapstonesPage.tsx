import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { fetchCapstones, toggleCapstoneEnabled } from "./adminSlice";

export function AdminCapstonesPage() {
  const dispatch = useAppDispatch();
  const { capstones, capstonesStatus, capstonesError } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchCapstones());
  }, [dispatch]);

  function handleToggle(capstoneId: string, isEnabled: boolean) {
    dispatch(toggleCapstoneEnabled({ capstoneId, isEnabled }));
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link to="/admin" className="text-sm text-blue-600 hover:underline">
        &larr; Admin dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Capstone projects</h1>
      <p className="mt-1 text-sm text-gray-500">
        Disabling a capstone blocks students from submitting it &mdash; useful for pulling a
        capstone that isn't ready without deleting it.
      </p>

      {capstonesError && <Alert message={capstonesError} />}

      {capstonesStatus === "loading" && capstones.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : capstones.length > 0 ? (
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Capstone</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {capstones.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 text-gray-900">{c.courseTitle}</td>
                  <td className="px-4 py-2 text-gray-600">{c.title}</td>
                  <td className="px-4 py-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={c.isEnabled}
                        onChange={(e) => handleToggle(c.id, e.target.checked)}
                      />
                      <span className={c.isEnabled ? "text-green-700" : "text-gray-500"}>
                        {c.isEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">No capstone projects yet.</p>
      )}
    </div>
  );
}
