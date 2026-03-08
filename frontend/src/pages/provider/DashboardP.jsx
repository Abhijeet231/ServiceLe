import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getproviderDetails } from "@/services/provider.service.js";
import { toggleStatus } from "@/services/provider.service.js";
import {
  getMyBookings,
  getBookingDetails,
  acceptBooking,
  rejectBooking,
} from "@/services/booking.service";
import {
  MapPin,
  Home,
  IndianRupee,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

const DashboardP = () => {
  const [provider, setProvider] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true); // ui feedback loading
  const [actionLoading, setActionLoading] = useState(false); // accepting/rejecting booking loading

  const { user } = useAuth();
  const navigate = useNavigate();

  // function to fetch provider profile
  const fetchProviderProfile = async () => {
    try {
      const res = await getproviderDetails();
      setProvider(res.data?.data);
      setIsAvailable(res.data?.data?.isAvailable);
    } catch (error) {
      toast.error("Failed to load provider profile");
      console.log(error);
    }
  };

  // function to fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data?.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.log(error);
    }
  };

  // function to toggle availability status
  const handleToggleStatus = async () => {
    try {
      const res = await toggleStatus();

      setIsAvailable(res.data?.data?.availabilityStatus);

      toast.success(
        `You are now ${res.data?.data?.availabilityStatus ? "Available" : "Unavailable"}`,
      );
    } catch (error) {
      toast.error("Failed to update status");
      console.log(error);
    }
  };

  // function to accept booking
  const handleAcceptBooking = async (bookingId) => {
    try {
      setActionLoading(true);

      await acceptBooking(bookingId);

      toast.success("Booking Accepted");

      fetchBookings(); // refresh list
    } catch (error) {
      toast.error("Failed to accept booking");
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  // function to reject booking
  const handleRejectBooking = async (bookingId) => {
    try {
      setActionLoading(true);

      await rejectBooking(bookingId);

      toast.success("Booking Rejected");

      fetchBookings();
    } catch (error) {
      toast.error("Failed to reject booking");
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  // Get booking detals
  const handleBookingClick = async (bookingId) => {
    try {
      const res = await getBookingDetails(bookingId);
      setSelectedBooking(res.data?.data);
    } catch (error) {
      toast.error("Failed to load booking details");
    }
  };

  // things when page load
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadDashboard = async () => {
      setLoading(true);

      await fetchProviderProfile();
      await fetchBookings();

      setLoading(false);
    };

    loadDashboard();
  }, [user]);

  if (loading) {
    return <div className="p-6">Loading Dashboard...</div>;
  }

  console.log("Booking:", bookings);
  console.log("Provider:", provider);

  return (
    <div className="flex gap-6 p-6">
      {/* LEFT SIDE - PROVIDER PROFILE */}
      <div className="w-[40%] bg-white shadow-sm border border-stone-100 rounded-2xl overflow-hidden">
        {/* Amber top accent */}
        <div className="h-1 w-full bg-linear-to-r from-amber-300 via-amber-400 to-orange-300" />

        <div className="p-6">
          <h2 className="text-base font-semibold text-stone-800 mb-6">
            Provider Profile
          </h2>

          {provider && (
            <>
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <span className="text-lg font-semibold text-amber-500">
                    {provider?.userId?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    {provider?.userId?.name}
                  </p>
                  <p className="text-xs text-stone-400">Service Provider</p>
                </div>
              </div>

              {/* Info rows */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                    <span className="text-xs text-stone-400">@</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    {provider?.userId?.email}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                    <span className="text-xs text-stone-400">📍</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    {provider?.userId?.city}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                    <span className="text-xs text-stone-400">💼</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    {provider?.experienceYears} years of experience
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-stone-100 mb-5" />

              {/* Buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleToggleStatus}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]
              ${
                isAvailable
                  ? "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  : "bg-amber-400 text-stone-900 hover:bg-amber-300 shadow-sm shadow-amber-100"
              }`}
                >
                  {isAvailable ? "Set Unavailable" : "Set Available"}
                </button>

                {/* <button className="w-full py-2.5 rounded-xl text-sm font-medium border border-stone-200 text-stone-600 bg-white hover:border-stone-300 hover:text-stone-800 transition-all duration-200 active:scale-[0.98]">
                  Edit Profile
                </button> */}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - BOOKINGS */}
      <div className="w-full lg:w-[60%] bg-white shadow-sm border border-stone-100 rounded-2xl overflow-hidden">
        {/* Amber top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-300" />

        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-stone-800">
              Active Bookings
            </h2>
            {bookings.length > 0 && (
              <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
                {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-sm font-medium text-stone-500">
                No bookings yet
              </p>
              <p className="text-xs text-stone-400 mt-1">
                New bookings will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {bookings.map((booking) => {
                const statusKey = booking?.status?.toLowerCase();
                return (
                  <div
                    key={booking._id}
                    className="border border-stone-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
                  >
                    {/* Info */}
                    <div className="flex flex-col gap-2 min-w-0">
                      {/* Status badge */}
                      <span
                        className={`self-start inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[statusKey] ?? "bg-stone-50 text-stone-500 border-stone-200"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[statusKey] ?? "bg-stone-400"}`}
                        />
                        {booking?.status}
                      </span>

                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-1.5 mt-1">
                        <InfoItem
                          icon={Briefcase}
                          value={booking?.serviceId?.name}
                        />
                        <InfoItem icon={MapPin} value={booking?.city} />
                        <InfoItem icon={Home} value={booking?.address} />
                        <InfoItem
                          icon={IndianRupee}
                          value={booking?.price ? `${booking.price} ₹` : null}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                      {/* Accept + Reject only when booking is requested */}
                      {booking?.status === "requested" && (
                        <>
                          <button
                            disabled={actionLoading}
                            onClick={() => handleAcceptBooking(booking._id)}
                            className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-medium
        bg-emerald-500 text-white hover:bg-emerald-400 active:scale-[0.97]
        transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Accept
                          </button>

                          <button
                            disabled={actionLoading}
                            onClick={() => handleRejectBooking(booking._id)}
                            className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-medium
        bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 active:scale-[0.97]
        transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {/* Job Done indicator */}
                      {booking?.status === "completed" && (
                        <button
                          disabled
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
      bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Job Done
                        </button>
                      )}

                      {/* View button always visible */}
                      <button
                        disabled={actionLoading}
                        onClick={() =>
                          navigate("/provider/bookings", { state: { booking } })
                        }
                        className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-medium
    bg-amber-400 text-stone-900 hover:bg-amber-300 active:scale-[0.97]
    transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-amber-100"
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardP;

// Styling stuff for the info items in booking cards

function InfoItem({ icon: Icon, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
      <span className="text-xs text-stone-600 break-words">{value}</span>
    </div>
  );
}

const STATUS_STYLES = {
  completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
  confirmed: "bg-blue-50 text-blue-600 border-blue-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  requested: "bg-orange-50 text-orange-600 border-orange-200",
  cancelled: "bg-red-50 text-red-500 border-red-200",
};

const STATUS_DOT = {
  completed: "bg-emerald-400",
  confirmed: "bg-blue-400",
  pending: "bg-amber-400",
  requested: "bg-orange-400",
  cancelled: "bg-red-400",
};
