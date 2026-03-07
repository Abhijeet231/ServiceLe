import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SL</span>
              </div>

              <span className="text-xl font-semibold">
                <span className="text-gray-900">Service</span>
                <span className="text-amber-600">LE</span>
              </span>
            </div>

            <p className="text-gray-600">
              Find trusted local service providers for your everyday needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  to="/services"
                  className="hover:text-amber-600 transition-colors"
                >
                  Browse Services
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="hover:text-amber-600 transition-colors"
                >
                  Popular Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/become-provider"
                  className="hover:text-amber-600 transition-colors"
                >
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  to="/about"
                  className="hover:text-amber-600 transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-amber-600 transition-colors"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="hover:text-amber-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>

            <ul className="space-y-2 text-gray-600">
              <li>support@servicele.com</li>
              <li>+91 90000 00000</li>
              <li>Available Mon – Sat</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-10 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ServiceLE. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;