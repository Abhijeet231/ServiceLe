import React, { useEffect, useState } from "react";
import BookingDetailsCard from "@/components/customer/BookingDetailsCard";
import { getBookingDetails, cancelBooking, rescheduleBooking } from "@/services/booking.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rescheduleBookingSchema } from "@/validations/bookingSchema.js";

const BookingsC = () => {
  const [booking, setBooking] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const { bookingId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(rescheduleBookingSchema),
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getBookingDetails(bookingId);
        setBooking(res.data.data);
      } catch (error) {
        toast.error("Error While Fetching Booking Details");
        console.log("Error while fetching Booking details:", error);
      }
    };
    getData();
  }, []);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      setCancelling(true);
      const res = await cancelBooking(bookingId);
      setBooking(res.data.data);
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel booking");
      console.log("Error cancelling booking:", error);
    } finally {
      setCancelling(false);
    }
  };

  const handleReschedule = async (data) => {
    try {
      setRescheduling(true);
      const res = await rescheduleBooking(bookingId, data);
      setBooking(res.data.data);
      toast.success("Booking rescheduled successfully");
      setShowRescheduleModal(false);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reschedule booking");
      console.log("Error rescheduling booking:", error);
    } finally {
      setRescheduling(false);
    }
  };

  const canModify = ["requested", "confirmed"].includes(booking?.status);

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-8">

      <BookingDetailsCard
        address={booking?.address}
        city={booking?.city}
        price={booking?.price}
        status={booking?.status}
        beforeImages={booking?.beforeImages}
        afterImages={booking?.afterImages}
      />

      {/* ── Action Buttons ── */}
      {canModify && (
        <div className="max-w-xl mx-auto mt-4 flex gap-3">
          <button
            onClick={() => setShowRescheduleModal(true)}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-amber-300 text-amber-600
              bg-amber-50 hover:bg-amber-100 active:scale-[0.98] transition-all duration-200"
          >
            Reschedule
          </button>
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-red-200 text-red-500
              bg-red-50 hover:bg-red-100 active:scale-[0.98] transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      )}

      {/* ── Reschedule Modal ── */}
      {showRescheduleModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowRescheduleModal(false); }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 w-full max-w-sm overflow-hidden">

            {/* Amber accent */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-300" />

            <div className="p-6">
              <h3 className="text-base font-semibold text-stone-800 mb-1">Reschedule Booking</h3>
              <p className="text-xs text-stone-400 mb-5">Pick a new date and time for your service.</p>

              <form onSubmit={handleSubmit(handleReschedule)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-stone-700 block mb-1.5">
                    New Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    {...register("dateTime")}
                    className={`w-full bg-stone-50 border rounded-xl px-4 py-2.5 text-sm text-stone-700
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white
                      hover:border-stone-300 transition-all duration-200
                      ${errors.dateTime ? "border-red-300 bg-red-50/50" : "border-stone-200"}`}
                  />
                  {errors.dateTime && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.dateTime.message}</p>
                  )}
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => { setShowRescheduleModal(false); reset(); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-stone-200 text-stone-500
                      hover:border-stone-300 hover:text-stone-700 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || rescheduling}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-amber-400 text-stone-900
                      hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-amber-100
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {rescheduling ? "Saving..." : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingsC;