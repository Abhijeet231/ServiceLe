import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { status, logout, user } = useAuth();

  // Decide dashboard route based on role
  const dashboardPath =
    user?.role === "provider"
      ? "/provider/dashboard"
      : user?.role === "admin"
      ? "/admin/dashboard"
      : "/customer/dashboard";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-amber-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">SL</span>
          </div>

          <span className="text-lg font-semibold tracking-tight">
            <span className="text-gray-900">Service</span>
            <span className="text-amber-500">Le</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <Link to="/about" className="hover:text-amber-500 transition-colors">
            About
          </Link>

          <Link to="/services" className="hover:text-amber-500 transition-colors">
            Services
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div>
          {status === "authenticated" ? (
            <div className="hidden md:flex items-center gap-4">

              <button
                onClick={logout}
                className="border px-4 py-1.5 rounded-md font-medium border-amber-500 text-amber-600 hover:bg-amber-600 hover:text-white transition-all"
              >
                Logout
              </button>

              <Link
                to={dashboardPath}
                className="bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-600 transition"
              >
                Dashboard
              </Link>

            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="border border-gray-300 px-4 py-1.5 rounded-md font-medium hover:border-amber-500 hover:text-amber-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-600 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4">

          <Link
            to="/about"
            className="block text-gray-700 hover:text-amber-500"
            onClick={() => setOpen(false)}
          >
            About
          </Link>

          <Link
            to="/services"
            className="block text-gray-700 hover:text-amber-500"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>

          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">

            {status === "authenticated" ? (
              <>
                <Link
                  to={dashboardPath}
                  className="bg-amber-500 text-white text-center py-2 rounded-md font-medium hover:bg-amber-600"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="border border-amber-500 text-amber-600 py-2 rounded-md font-medium hover:bg-amber-600 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-amber-500 text-white text-center py-2 rounded-md font-medium hover:bg-amber-600"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;