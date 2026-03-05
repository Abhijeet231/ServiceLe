import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
import ProviderProfile from "../models/providerProfile.model.js";

// ******************************************************** CUSTOMER BOOKING LOGIC ***************************************************************************//

/**
 * @desc    Create a new booking
 * @route   POST /api/v1/bookings
 * @access  Private (Customer only)
 */
export const createBooking = asyncHandler(async (req, res) => {
  if (req.user.role !== "customer") {
    throw new ApiError(403, "Only customers can create bookings");
  }

  const { serviceId, address, city, dateTime, customerNotes } = req.body;
  const customerId = req.user._id;

  // Finding and checking if service is there or not
  const service = await Service.findById(serviceId).populate("providerId");

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  const providerId = service.providerId._id;

  const price = service.basePrice;

  // Checking Duplicate Booking
  const existingBooking = await Booking.findOne({
    customerId,
    serviceId,
    status: { $ne: "cancelled" },
  });

  if (existingBooking) {
    throw new ApiError(400, "You already booked this service!!");
  }
  // Creatnng new  booking
  const booking = await Booking.create({
    customerId,
    providerId,
    serviceId,
    address,
    city,
    dateTime,
    customerNotes,
    price,
  });

  const createdBooking = await Booking.findById(booking._id)
    .populate("customerId", "name email")
    .populate("providerId")
    .populate("serviceId");

  return res
    .status(201)
    .json(new ApiResponse(201, createdBooking, "Booking created successfully"));
});

/**
 * @desc    Cancel an existing booking
 * @route   PATCH /api/v1/bookings/:bookingId/cancel
 * @access  Private (Customer only)
 */
export const cancelBooking = asyncHandler(async (req, res) => {
  if (req.user.role !== "customer") {
    throw new ApiError(403, "Only customers can cancel bookings");
  }

  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found!!!");
  }

  // ownership Checking
  if (booking.customerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to cancel this booking");
  }

  // Check status
  if (!["requested", "confirmed"].includes(booking.status)) {
    throw new ApiError(
      400,
      `Booking cannot be cancelled when status is '${booking.status}'`,
    );
  }

  booking.status = "cancelled";
  booking.cancelledBy = "customer";

  await booking.save();
  await booking.populate("serviceId providerId");

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking cancelled successfully"));
});

/**
 * @desc    Reschedule an existing booking
 * @route   PATCH /api/v1/bookings/:bookingId/reschedule
 * @access  Private (Customer only)
 */
export const rescheduleBooking = asyncHandler(async (req, res) => {
  if (req.user.role !== "customer") {
    throw new ApiError(403, "Only customers can reschedule bookings");
  }

  const { bookingId } = req.params;
  const { dateTime } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not Found!");
  }

  // OwnerShip Check
  if (booking.customerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to reschedule this booking");
  }

  // Checking status
  // Status check
  if (!["requested", "confirmed"].includes(booking.status)) {
    throw new ApiError(400, "Booking cannot be rescheduled at this stage");
  }

  const newDate = new Date(dateTime);

  // validation not to reschedule in past
  if (newDate <= new Date()) {
    throw new ApiError(400, "Date must be in the future");
  }

  // validation for not to reschedule in same date
  if (booking.dateTime.getTime() === newDate.getTime()) {
    throw new ApiError(400, "New date must be different");
  }

  //  double booking check
  const conflictBooking = await Booking.findOne({
    providerId: booking.providerId,
    dateTime: newDate,
    status: { $in: ["requested", "confirmed", "in-progress"] },
  });

  if (conflictBooking) {
    throw new ApiError(400, "Provider is not available at this time");
  }

  booking.dateTime = newDate;

  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking rescheduled successfully"));
});

// **************************************************************** SERVICE PROVIDER BOOKING LOGIC *******************************************************************//

/**
 * @desc    Accept a booking request
 * @route   PATCH /api/v1/bookings/:bookingId/accept
 * @access  Private (Service Provider only)
 */
export const acceptBookingRequest = asyncHandler(async (req, res) => {
  if (req.user.role !== "provider") {
    throw new ApiError(403, "You are not authorised to perform this action!!");
  }

  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not Found!");
  }

  // Finding provider profile for logged-in user
  const providerProfile = await ProviderProfile.findOne({
    userId: req.user._id,
  });

  if (!providerProfile) {
    throw new ApiError(404, "Provider profile not found");
  }
  // Ownership check
  if (booking.providerId.toString() !== providerProfile._id.toString()) {
    throw new ApiError(403, "You are not allowed to perform this action");
  }

  // Status check
  if (booking.status !== "requested") {
    throw new ApiError(
      400,
      `Booking cannot be accepted when status is '${booking.status}'`,
    );
  }

  booking.status = "confirmed";

  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking accepted successfully"));
});

/**
 * @desc    Reject a booking request
 * @route   PATCH /api/v1/bookings/:bookingId/reject
 * @access  Private (Service Provider only)
 */
export const rejectBookingRequest = asyncHandler(async (req, res) => {
  if (req.user.role !== "provider") {
    throw new ApiError(403, "You are not authorised to perform this action!!");
  }

  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not Found!");
  }

  // Finding provider profile for logged-in user
  const providerProfile = await ProviderProfile.findOne({
    userId: req.user._id,
  }).select("_id");

  if (!providerProfile) {
    throw new ApiError(404, "Provider profile not found");
  }
  // Ownership check
  if (booking.providerId.toString() !== providerProfile._id.toString()) {
    throw new ApiError(403, "You are not allowed to perform this action");
  }

  // Status check
  if (booking.status !== "requested") {
    throw new ApiError(
      400,
      `Booking cannot be rejected when status is '${booking.status}'`,
    );
  }

  booking.status = "cancelled";
  booking.cancelledBy = "provider";

  await booking.populate("customerId serviceId");

  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking Rejected Successfully"));
});

/**
 * @desc    Update booking status (e.g. in-progress, completed)
 * @route   PATCH /api/v1/bookings/:bookingId/status
 * @access  Private (Service Provider only)
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== "provider") {
    throw new ApiError(403, "You are not authorised to perform this action!");
  }

  const { bookingId } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["in-progress", "completed"];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status update");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.status === status) {
    throw new ApiError(400, `Booking is already '${status}'`);
  }

  // Find provider profile
  const providerProfile = await ProviderProfile.findOne({
    userId: req.user._id,
  }).select("_id");

  if (!providerProfile) {
    throw new ApiError(404, "Provider profile not found");
  }

  // checking owner
  if (booking.providerId.toString() !== providerProfile._id.toString()) {
    throw new ApiError(403, "You are not allowed to perform this action");
  }

  // Prevent changes on cancelled/completed bookings
  if (["cancelled", "completed"].includes(booking.status)) {
    throw new ApiError(
      400,
      `Cannot update booking when status is '${booking.status}'`,
    );
  }

  // Status transition validation
  if (status === "in-progress" && booking.status !== "confirmed") {
    throw new ApiError(
      400,
      "Booking must be confirmed before starting service",
    );
  }

  if (status === "completed" && booking.status !== "in-progress") {
    throw new ApiError(400, "Service must be in-progress before completing");
  }

  if (status === "in-progress") booking.startedAt = new Date();
  if (status === "completed") booking.completedAt = new Date();

  booking.status = status;

  await booking.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, booking, `Booking status updated to '${status}'`),
    );
});

/**
 * @desc    Upload before & after work images for a booking
 * @route   PATCH /api/v1/bookings/:bookingId/uploadWorkImgs
 * @access  Private (Service Provider only)
 */

// ******************************************************** GET BOOKINGS FOR CURRENT USER ***************************************************************************//

/**
 * @desc    Get bookings of the logged-in user
 * @route   GET /api/v1/bookings/my
 * @access  Private (Customer / Service Provider)
 */
