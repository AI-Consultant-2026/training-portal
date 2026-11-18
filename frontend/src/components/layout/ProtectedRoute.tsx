import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { sendHeartbeat } from "../../api/users.api";
import { useAppSelector } from "../../app/hooks";
import { Spinner } from "../ui/Spinner";

const HEARTBEAT_INTERVAL_MS = 60_000;

export function ProtectedRoute() {
  const { user, bootstrapped } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!user) return;
    // Best-effort: a missed heartbeat just means this tick doesn't count toward
    // "online" on the admin dashboard, nothing the user needs to see.
    const ping = () => sendHeartbeat().catch(() => {});
    ping();
    const interval = setInterval(ping, HEARTBEAT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [user]);

  if (!bootstrapped) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    // Come back here after logging in (2026-11-18), keeping the query string, so a link
    // like /courses/<slug>/pay/card?code=FULLPAY15 still applies its code.
    const next = location.pathname + location.search;
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />;
  }

  return <Outlet />;
}
