import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createBooking,
  cancelBooking,
  rescheduleBooking,
  acceptBookingRequest,
  rejectBookingRequest,
  updateBookingStatus,
  uploadImages,
  getMyBookings,
} from "../controllers/booking.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyRoles } from "../middleware/verifyRoles.js";

const router = Router();

// Create new booking
router.post("/", verifyJWT, verifyRoles("customer"), createBooking);

// Cancel booking
router.patch("/:bookingId/cancel", verifyJWT, verifyRoles("customer"), cancelBooking);

// Reschdule booking
router.patch("/:bookingId/reschedule", verifyJWT, verifyRoles("customer"), rescheduleBooking);

// Accept a booking (provider only)
router.patch("/:bookingId/accept", verifyJWT, verifyRoles("provider"), acceptBookingRequest);

// Reject a booking (provider only)
router.patch("/:bookingId/reject", verifyJWT, verifyRoles("provider"), rejectBookingRequest);

//Update Booking status (provider only)
router.patch("/:bookingId/status", verifyJWT, verifyRoles("provider"), updateBookingStatus);

// Upload Before/After Images
router.patch(
  "/:bookingId/uploadWorkImgs",
  verifyJWT,
  verifyRoles("provider"),
  upload.fields([
    { name: "beforeImages", maxCount: 3 },
    { name: "afterImages", maxCount: 3 },
  ]),
  uploadImages,
);

// Get Bookings for Current User
router.get("/my", verifyJWT, getMyBookings);

export default router;
