import React from "react";
import BookingDetailsCard from "@/components/customer/BookingDetailsCard.jsx";
import { useLocation } from "react-router-dom";
import {
  uploadWorkImgs,
  updateBookingStatus,
} from "@/services/booking.service.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BookingsP = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  const [bookingDetails, setBookingDetails] = useState(null);
  const [status, setStatus] = useState("");

  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (booking) {
      setBookingDetails(booking);
      setStatus("");
    }
  }, [booking]);

  // Status options
  const statusOptions =
    bookingDetails?.status === "confirmed"
      ? ["in-progress"]
      : bookingDetails?.status === "in-progress"
        ? ["completed"]
        : [];

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // logs
  console.log("Booking ID:", bookingDetails?._id);
  console.log("Current booking status:", bookingDetails?.status);
  console.log("Selected status:", status);

  // Update booking status
  const handleUpdateStatus = async () => {
    if (!bookingDetails?._id) return;
    try {
      setLoading(true);

      const res = await updateBookingStatus(bookingDetails._id, {
        status,
      });

      setBookingDetails(res.data?.data);

      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.log("Failed to update Status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image selection
  const handleBeforeImages = (e) => {
    setBeforeImages([...e.target.files]);
  };

  const handleAfterImages = (e) => {
    setAfterImages([...e.target.files]);
  };

  console.log("Booking status:", bookingDetails?.status);

  // Upload images
  const handleUploadImages = async () => {
    if (beforeImages.length === 0 && afterImages.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    try {
      setUploading(true);

      const formData = new FormData();

      beforeImages.forEach((file) => {
        formData.append("beforeImages", file);
      });

      afterImages.forEach((file) => {
        formData.append("afterImages", file);
      });

      const res = await uploadWorkImgs(bookingDetails._id, formData);

      setBookingDetails(res.data?.data);

      toast.success("Images uploaded successfully");
      setBeforeImages([]);
      setAfterImages([]);
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!bookingDetails) {
    return <div className="p-6">Booking not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Booking Details */}
      <BookingDetailsCard
        address={bookingDetails?.address}
        city={bookingDetails?.city}
        price={bookingDetails?.price}
        status={bookingDetails?.status}
        beforeImages={bookingDetails?.beforeImages}
        afterImages={bookingDetails?.afterImages}
      />

      {/* STATUS UPDATE */}
      <p className="text-sm text-gray-600">
        Current Status:{" "}
        <span className="font-semibold">{bookingDetails?.status}</span>
      </p>
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold text-lg">Update Job Status</h2>

        <select
          value={status}
          onChange={handleStatusChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select new status</option>

          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          disabled={loading || !status || status === bookingDetails?.status}
          onClick={handleUpdateStatus}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>

      {bookingDetails?.status !== "in-progress" && (
        <p className="text-sm text-yellow-600">
          Start the job (set status to "in-progress") before uploading work
          images.
        </p>
      )}

      {/* IMAGE UPLOAD */}
      <div className="bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Amber top accent */}
        <div className="h-1 w-full bg-linear-to-r from-amber-300 via-amber-400 to-orange-300" />

        <div className="p-6 space-y-5">
          <h2 className="text-base font-semibold text-stone-800">
            Upload Work Images
          </h2>

          {/* ⚠️ Warning banner */}
          <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="text-amber-500 text-lg leading-none mt-0.5">
              ⚠️
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-700">
                Important — Read before uploading
              </p>
              <ul className="text-xs text-amber-600 space-y-1 list-disc list-inside">
                <li>
                  Upload <strong>Before Work</strong> images first, then submit.
                </li>
                <li>
                  Only after that, come back and upload{" "}
                  <strong>After Work</strong> images.
                </li>
                <li>
                  Do <strong>not</strong> select both before and after images at
                  the same time.
                </li>
                <li>
                  Violating this may result in your{" "}
                  <strong>provider profile being suspended</strong>.
                </li>
                <li>
                  While Job Status is in-progress -{" "}
                  <strong>
                    {" "}
                    First uplaod the work images according to rules then change
                    Job Status to Completed.
                  </strong>
                  .
                </li>
              </ul>
            </div>
          </div>

          {/* Before images */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Before Work Images
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleBeforeImages}
                className="block w-full text-sm text-stone-500
            file:mr-3 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-xs file:font-medium
            file:bg-amber-50 file:text-amber-600
            hover:file:bg-amber-100
            file:transition-colors file:duration-150
            border border-stone-200 rounded-xl px-3 py-2 bg-stone-50
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* After images */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              After Work Images
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAfterImages}
                className="block w-full text-sm text-stone-500
            file:mr-3 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-xs file:font-medium
            file:bg-emerald-50 file:text-emerald-600
            hover:file:bg-emerald-100
            file:transition-colors file:duration-150
            border border-stone-200 rounded-xl px-3 py-2 bg-stone-50
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-stone-100" />

          {/* Upload button */}
          <button
            disabled={
              uploading ||
              bookingDetails?.status !== "in-progress" ||
              bookingDetails?.status === "completed"
            }
            onClick={handleUploadImages}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium
    bg-amber-400 text-stone-900 hover:bg-amber-300 active:scale-[0.98]
    transition-all duration-200 shadow-sm shadow-amber-100
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {uploading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
                Upload Images
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingsP;
