import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { clearAuthData, getStoredUser } from "../utils/storage";

function Navbar({ cartCount }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      setUser(getStoredUser());
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    clearAuthData();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-slate-900">
          ArtConnect
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/explore" className="transition hover:text-slate-900">
            Collections
          </Link>
          <Link to="/artists" className="transition hover:text-slate-900">
            Creators
          </Link>
          <Link to="/about" className="hidden transition hover:text-slate-900 sm:block">
            About
          </Link>

          <Link to="/cart" className="relative text-slate-700 transition hover:text-slate-900">
            <FaShoppingCart className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700"
              >
                <FaUser /> {user.name.split(" ")[0]}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-300 p-2 text-slate-500 transition hover:border-slate-500 hover:text-slate-900"
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700"
            >
              <FaUser className="text-sm" /> Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
