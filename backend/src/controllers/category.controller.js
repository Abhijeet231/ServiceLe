import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ServiceCategory from "../models/serviceCategory.model.js";
import Service from "../models/service.model.js";


/**
 * @desc    Create Category
 * @route   POST /api/v1/categories
 * @access  Private (admin only)
 */
export const createCategory = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can create Categories!");
  }

  const { name } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Category name is required");
  }

  const existedCategory = await ServiceCategory.findOne({
    name: name.trim().toLowerCase(),
  });

  if (existedCategory) {
    throw new ApiError(400, "Category already exists!");
  }

  const category = await ServiceCategory.create({
    name: name.trim().toLowerCase(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully."));
});

/**
 * @desc    Get all Categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await ServiceCategory.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allCategories,
        "All categories retrieved successfully!",
      ),
    );
});


/**
 * @desc    Get Single Category
 * @route   GET /api/v1/categories/:categoryId
 * @access  Public
 */
export const getIndividualCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new ApiError(400, "Category Id is required!");
  }

  const category = await ServiceCategory.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "category not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category retrived successfully."));
});

// Delete Individual Category
/**
 * @desc    Delete Individual Category
 * @route   DELETE /api/v1/categories/:categoryId
 * @access  Private (admin only)
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Only Admin can perform this action!");
  }

  const { categoryId } = req.params;

  if (!categoryId) {
    throw new ApiError(400, "Category Id is required!");
  }

  const category = await ServiceCategory.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // find all services under this category
  const serviceCount  =  await Service.countDocuments({ categoryId });

 // Only delte category if no services exists under this category
  if(serviceCount > 0) {
    throw new ApiError(400, "Cannot delete category. Services still exist under this category. Please delete the services first.");
  }

  // delete category
  await ServiceCategory.findByIdAndDelete(categoryId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Category deleted successfully",
      ),
    );
});
