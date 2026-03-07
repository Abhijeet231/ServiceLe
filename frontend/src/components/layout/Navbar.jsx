import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
            <span className="text-amber-500">LE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <Link
            to="/about"
            className="hover:text-amber-500 transition-colors"
          >
            About
          </Link>

          <Link
            to="/services"
            className="hover:text-amber-500 transition-colors"
          >
            Services
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-gray-900 transition-colors"
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;