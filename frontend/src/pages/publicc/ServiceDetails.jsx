import React from "react";
import { createBookingSchema } from "@/validations/bookingSchema.js";
import { createBooking } from "@/services/booking.service.js";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

// This is book service page for customer
const ServiceDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const service = location.state?.service;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      serviceId: service?._id,
    },
  });

  const onSubmit = async (data) => {
    try {
      await createBooking(data);

      toast.success("Booking created successfully!");

      navigate("/customer/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create booking");
      console.log("Error while booking a service:", error);
    }
  };

  if (!service) {
    return (
      <div className="p-10 text-center text-red-500">Service not found</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Service Info */}
      <div className="border rounded-lg p-4 mb-6 bg-gray-50">
        <h2 className="text-xl font-semibold">{service.name}</h2>
        <p className="text-gray-600 mt-1">{service.description}</p>
        <p className="mt-2 font-medium text-green-600">₹{service.basePrice}</p>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border p-6 rounded-lg"
      >
        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            {...register("address")}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter service address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            {...register("city")}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* Date Time */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Date & Time
          </label>
          <input
            type="datetime-local"
            {...register("dateTime")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Notes (Optional)
          </label>
          <textarea
            {...register("customerNotes")}
            className="w-full border rounded px-3 py-2"
            placeholder="Any special instructions"
          />
          {errors.customerNotes && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customerNotes.message}
            </p>
          )}
        </div>

        {/* Hidden serviceId */}
        <input type="hidden" value={service._id} {...register("serviceId")} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {isSubmitting ? "Booking..." : "Book Service"}
        </button>
      </form>
    </div>
  );
};

export default ServiceDetails;
