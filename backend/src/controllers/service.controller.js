import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Service from "../models/service.model.js";
import ServiceCategory from "../models/serviceCategory.model.js";
import Booking from "../models/booking.model.js";

// Create Service
const createServices = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can create services!");
  }

  const { categoryId } = req.params;
  const { name, description, basePrice } = req.body;

  //checkign if category exists
  const category = await ServiceCategory.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found!");
  }

  const existedService = await Service.findOne({
    name: name.trim().toLowerCase(),
    categoryId,
  });

  if (existedService) {
    throw new ApiError(400, "Service already exists in the category!");
  }

  const service = await Service.create({
    name: name.trim().toLowerCase(),
    description: description.trim().toLowerCase(),
    basePrice,
    categoryId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, service, "Service Created Successfully."));
});

// Get All Service Listed By Caategory /api/v1/categories/:categoryId/services
const getServicesByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await ServiceCategory.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found!");
  }

  const services = await Service.find({ categoryId }).lean();

  return res
    .status(200)
    .json(new ApiResponse(200, services, "Fetched All Services Successfully!"));
});

// Search Service  /api/v1/services/search?q=clean
const searchServices = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    throw new ApiError(400, "Search query is required");
  }

  const services = await Service.find({
    $text: { $search: q },
  })
    .limit(10)
    .sort({ createdAt: -1 })
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, services, "Search results fetched successfully"),
    );
});

// Service Details /api/v1/services/:serviceId
const serviceDetails = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  const service = await Service.findById(serviceId).lean();
  if (!service) {
    throw new ApiError(404, "Service Not Found!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, service, "Fetched Service Details Successfully."),
    );
});

// Delete Service /api/v1/services/:serviceId
const deleteService = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "You are not authorised to delete Service!!");
  }

  const { serviceId } = req.params;
  const service = await Service.findById(serviceId);

    if (!service) {
    throw new ApiError(404, "Service not found");
  }


  // Seaching active Bookings
  const activeBookings = await Booking.countDocuments({
    serviceId,
    status: { $in: ["requested", "confirmed", "in-progress"] },
  });

  if (activeBookings > 0) {
    throw new ApiError(
      400,
      "Service cannot be deleted because active bookings exist.",
    );
  }

  await Service.findByIdAndDelete(serviceId);
  
  return res
  .status(200)
  .json(new ApiResponse(200, {}, "Service Deleted Successfully"))

  
});
