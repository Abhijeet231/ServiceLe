import api from "@/services/api.js";

// Create Booking (customer)
export const createBooking = (credentials) => {
  return api.post("/api/v1/bookings", credentials);
};

// Cancel Booking (customer)
export const cancelBooking = (credentials, data) => {
  return api.patch(`/api/v1/bookings/${credentials}/cancel`, data);
};

// Reschedule Booking (customer)
export const rescheduleBooking = (credential, data) => {
  return api.patch(`/api/v1/bookings/${credential}/reschedule`, data);
};

// Accept a Booking (provider)
export const acceptBooking = (credentials) => {
  return api.patch(`/api/v1/bookings/${credentials}/accept`);
};

// Reject a booking (provider)
export const rejectBooking = (credentials) => {
  return api.patch(`/api/v1/bookings/${credentials}/reject`);
};

// Update Booking Status (provider only)
export const updateBookingStatus = (credentials, data) => {
  return api.patch(`/api/v1/bookings/${credentials}/status`, data);
};

// Upload Before/After Images (provider only)
export const uploadWorkImgs = (bookingId, data) => {
  return api.patch(`/api/v1/bookings/${bookingId}/uploadWorkImgs`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get Bookings for Current User
export const getMyBookings = () => {
  return api.get("/api/v1/bookings/my");
};

// Get Individual Booking
export const getBookingDetails = (credentials) => {
  return api.get(`/api/v1/bookings/${credentials}`);
};
