import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { getMyBookings } from "@/services/booking.service.js";
import { toast } from "react-toastify";
import { BookingCard } from "@/components/customer/BookingCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getMe } from "@/services/customer.service";

export default function DashboardC() {
  const [deleteHover, setDeleteHover] = useState(false);
  const [bookings, setBookings] = useState([]);

  const { user} = useAuth();
  const navigate = useNavigate();

  // Fetching bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setBookings(res.data.data);
        console.log("Customer Bookings:", res.data);
      } catch (error) {
        toast.error("Error While Fetching Bookings!");
        console.log("Error While Fetching Bookings for Customer:", error);
      }
    };
    fetchBookings();
  }, []);


  console.log("bookings:", bookings);
  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-stone-50 p-6 md:p-10"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-stone-400 uppercase mb-1">
          My Account
        </p>
        <h1
          style={{ fontFamily: "'DM Serif Display', serif" }}
          className="text-3xl text-stone-800"
        >
          Dashboard
        </h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── LEFT: Profile Card (40%) ── */}
        <div className="w-full lg:w-2/5">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            {/* Card top band */}
            <div className="h-24 bg-linear-to-br from-amber-50 to-orange-100 relative">
              <div className="absolute -bottom-8 left-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center shadow-md">
                  <span
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                    className="text-white text-xl"
                  >
                    {user.name?.at(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="pt-12 px-6 pb-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-stone-800 leading-tight">
                  {user.name}
                </h2>
                <span className="inline-block mt-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {user.role}
                </span>
              </div>

              {/* Info rows */}
              <div className="space-y-3 mb-8">
                <InfoRow
                  icon={
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  }
                  extraPath={<polyline points="22,6 12,13 2,6" />}
                  label="Email"
                  value={user.email}
                />
                <InfoRow
                  icon={
                    <>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </>
                  }
                  label="City"
                  value={user.city}
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => navigate("/customer/profile")}
                  className="w-full py-2.5 rounded-xl bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors duration-200"
                >
                  Edit Profile
                </button>
                <button
                  onMouseEnter={() => setDeleteHover(true)}
                  onMouseLeave={() => setDeleteHover(false)}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    deleteHover
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-stone-200 text-stone-500"
                  }`}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Main Dashboard (60%) ── */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          {/* CTA Card */}
          <div className="relative overflow-hidden bg-stone-800 rounded-2xl p-8 shadow-sm">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white opacity-5" />
            <div className="absolute -bottom-6 right-16 w-28 h-28 rounded-full bg-amber-400 opacity-10" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-400 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 fill-none stroke-stone-900 stroke-2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <p className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
                    New Opportunity
                  </p>
                </div>
                <h3
               
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                  className="text-2xl text-white mb-2"
                >
                  Become a Service Provider
                </h3>
                <p 
                
                className="text-stone-400 text-sm leading-relaxed max-w-xs">
                  Create a provider profile to start offering your services and
                  reach customers in your area.
                </p>
              </div>
              <div className="shrink-0">
                <button 
                 onClick={() => navigate("/customer/become-provider")}
                className="whitespace-nowrap px-5 py-3 rounded-xl bg-amber-400 text-stone-900 text-sm font-semibold hover:bg-amber-300 transition-colors duration-200 shadow-lg shadow-amber-900/20">
                  Create Provider Profile
                </button>
              </div>
            </div>
          </div>

          {/* Active Bookings Container */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="text-base font-semibold text-stone-800">
                  Your Active Bookings
                </h3>
              </div>
              <span className="text-xs text-stone-400 bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-full">
                {bookings.length === 0
                  ? " 0 active"
                  : `${bookings.length} active `}
              </span>
            </div>

            {bookings.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 stroke-stone-300 fill-none stroke-2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-stone-400">
                  No bookings yet
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  Your active bookings will appear here
                </p>
              </div>
            ) : (
              bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  service={booking.serviceId?.name}
                  status={booking.status}
                  city={booking.city}
                  address={booking.address}
                  onClick = {() => navigate(`/customer/bookings/${booking._id}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, extraPath, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-stone-400 fill-none stroke-2"
        >
          {icon}
          {extraPath}
        </svg>
      </div>
      <div>
        <p className="text-xs text-stone-400">{label}</p>
        <p className="text-sm font-medium text-stone-700">{value}</p>
      </div>
    </div>
  );
}
