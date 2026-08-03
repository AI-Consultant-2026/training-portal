import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authSlice";

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <Link to="/" className="text-lg font-semibold text-gray-900">
        Training Portal
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/courses" className="text-gray-600 hover:text-gray-900">
          Courses
        </Link>
        <a href="/bridge36.html" className="text-gray-600 hover:text-gray-900">
          Bridge36
        </a>
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            )}
            <span className="text-gray-500">{user.firstName}</span>
            <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Log in
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-gray-900">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
