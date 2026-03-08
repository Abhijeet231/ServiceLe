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
  getBookingDetails,
} from "../controllers/booking.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import validate from "../middleware/validation.middleware.js";
import { createBookingSchemaZod, rescheduleBookingSchemaZod, updateBookingStatusSchemaZod } from "../validations/booking.validation.js";


const router = Router();

// Create new booking
router.post("/", verifyJWT, verifyRoles("customer"),validate(createBookingSchemaZod) ,createBooking);

// Cancel booking
router.patch("/:bookingId/cancel", verifyJWT, verifyRoles("customer"), cancelBooking);

// Reschdule booking
router.patch("/:bookingId/reschedule", verifyJWT, verifyRoles("customer"),validate(rescheduleBookingSchemaZod) ,rescheduleBooking);

// Accept a booking (provider only)
router.patch("/:bookingId/accept", verifyJWT, verifyRoles("provider"), acceptBookingRequest);

// Reject a booking (provider only)
router.patch("/:bookingId/reject", verifyJWT, verifyRoles("provider"),  rejectBookingRequest);

//Update Booking status (provider only)
router.patch("/:bookingId/status", verifyJWT, verifyRoles("provider"), validate(updateBookingStatusSchemaZod), updateBookingStatus);

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


// Get Booking details
router.get("/:bookingId", verifyJWT, getBookingDetails);

export default router;
