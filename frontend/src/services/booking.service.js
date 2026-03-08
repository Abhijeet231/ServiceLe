import api from "@/services/api.js";

// Create Booking (customer)
export const createBooking = (credentials) => {
    return api.post("/api/v1/bookings", credentials)
};

// Cancel Booking (customer)
export const cancelBooking = (credentials)  => {
    return api.patch("/api/v1/bookings/:bookingId/cancel", credentials)
}

// Reschedule Booking (customer)
export const rescheduleBooking = (credentials) => {
    return api.patch("/api/v1/bookings/:bookingId/reschedule", credentials)
};

// Accept a Booking (provider)
export const acceptBooking = (credentials) => {
    return api.patch("/api/v1/bookings/:bookingId/accept", credentials)
};

// Reject a booking (provider)
export const rejectBooking = (credentials) => {
    return api.patch("/api/v1/bookings/:bookingId/reject", credentials)
};

// Update Booking Status (provider only)
export const updateBookingStatus = (credentials) => {
    return api.patch("/api/v1/bookings/:bookingId/status", credentials)
};

// Upload Before/After Imgaes (provider only)
export const uploadWorkImgs = (credentials) => {
    return api.patch("/api/v1/bookings/:bookingId/uploadWorkImgs", credentials)
};

// Get Bookings for Current User
export const getMyBookings = () => {
    return api.get("/api/v1/bookings/my");
}