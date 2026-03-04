import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ServiceCategory from "../models/serviceCategory.model.js";

// Create Category ( /categories )
const createCategory = asyncHandler(async (req, res) => {
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
        name: name.trim().toLowerCase()
    });


return res.status(201)
.json(new ApiResponse(201, category, "Category created successfully."))

});

// Get all Categories ( /categories)
const getAllCategories = asyncHandler(async(req,res) => {
    const allCategories = await ServiceCategory.find().sort({ createdAt: -1 });

    return res.status(200)
    .json(new ApiResponse(200, allCategories, "All categories retrieved successfully!"))
})