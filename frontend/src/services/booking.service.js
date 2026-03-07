import api from "@/services/api.js";

// Create Booking (customer)
export const createBooking = (credentials) => {
    return api.post("", credentials)
};

// Cancel Booking (customer)
export const cancelBooking = (credentials)  => {
    return api.patch("", credentials)
}

// Reschedule Booking (customer)
export const rescheduleBooking = (credentials) => {
    return api.patch("", credentials)
};

// Accept a Booking (provider)
export const acceptBooking = (credentials) => {
    return api.patch("", credentials)
};

// Reject a booking (provider)
export const rejectBooking = (credentials) => {
    return api.patch("", credentials)
};

// Update Booking Status (provider only)
export const updateBookingStatus = (credentials) => {
    return api.patch("", credentials)
};

// Upload Before/After Imgaes (provider only)
export const uploadWorkImgs = (credentials) => {
    return api.patch("", credentials)
};

// Get Bookings for Current User
export const getMyBookings = (credentials) => {
    return api.get("", credentials);
}