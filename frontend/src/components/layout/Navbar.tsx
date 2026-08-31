import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authSlice";

const linkClassName = "text-gray-600 hover:text-gray-900";

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  async function handleLogout() {
    closeMenu();
    await dispatch(logoutUser());
    navigate("/login");
  }

  const links = user ? (
    <>
      <Link to="/courses" className={linkClassName} onClick={closeMenu}>
        Courses
      </Link>
      <Link to="/dashboard" className={linkClassName} onClick={closeMenu}>
        Dashboard
      </Link>
      {user.role === "student" && (
        <Link to="/refer" className={linkClassName} onClick={closeMenu}>
          Refer &amp; earn
        </Link>
      )}
      {user.role === "admin" && (
        <Link to="/admin" className={linkClassName} onClick={closeMenu}>
          Admin
        </Link>
      )}
      <span className="text-gray-500">{user.firstName}</span>
      <button onClick={handleLogout} className={linkClassName}>
        Log out
      </button>
    </>
  ) : (
    <>
      <a href="/welcome" className={linkClassName} onClick={closeMenu}>
        Home
      </a>
      <Link to="/login" className={linkClassName} onClick={closeMenu}>
        Log in
      </Link>
      <Link to="/register" className={linkClassName} onClick={closeMenu}>
        Sign up
      </Link>
    </>
  );

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-900" onClick={closeMenu}>
          Paleon Training
        </Link>
        <div className="hidden items-center gap-4 text-sm md:flex">{links}</div>
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4 text-sm md:hidden">{links}</div>
      )}
    </nav>
  );
}
