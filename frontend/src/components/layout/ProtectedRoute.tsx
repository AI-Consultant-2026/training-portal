import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { sendHeartbeat } from "../../api/users.api";
import { useAppSelector } from "../../app/hooks";
import { Spinner } from "../ui/Spinner";

const HEARTBEAT_INTERVAL_MS = 60_000;

export function ProtectedRoute() {
  const { user, bootstrapped } = useAppSelector((state) => state.auth);

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
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
