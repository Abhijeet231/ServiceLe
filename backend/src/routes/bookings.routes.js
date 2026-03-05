import {Router} from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { createBooking, cancelBooking, rescheduleBooking, acceptBookingRequest, rejectBookingRequest, updateBookingStatus, uploadImages, getMyBookings } from "../controllers/booking.controller.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router();

// Create new booking
router.post("/",verifyJWT, createBooking);

// Cancel booking
router.patch("/:bookingId/cancel", verifyJWT, cancelBooking);

// Reschdule booking
router.patch("/:bookingId/reschedule", verifyJWT, rescheduleBooking);

// Accept a booking (provider only)
router.patch("/:bookingId/accept",verifyJWT, acceptBookingRequest);

// Reject a booking (provider only)
router.patch("/:bookingId/reject", verifyJWT, rejectBookingRequest)

//Update Booking status (provider only)
router.patch("/:bookingId/status", verifyJWT, updateBookingStatus);

// Upload Before/After Images
router.patch(
  "/:bookingId/uploadWorkImgs",
  verifyJWT,
  upload.fields([
    { name: "beforeImages", maxCount: 3 },
    { name: "afterImages", maxCount: 3 }
  ]),
  uploadImages
);

// Get Bookings for Current User
router.get("/my", verifyJWT, getMyBookings);


export default router;
