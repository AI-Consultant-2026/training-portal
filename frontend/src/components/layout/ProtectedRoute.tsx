import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Spinner } from "../ui/Spinner";

export function ProtectedRoute() {
  const { user, bootstrapped } = useAppSelector((state) => state.auth);

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
