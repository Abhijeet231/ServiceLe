import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";


// Get LoggedIn User
export const getLoggedInUser = asyncHandler(async (req, res) => {
 
  const user = await User.findById(req.user?._id).select("-password");
  if (!user) {
    throw new ApiError(400, "User Not Found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current User Fetched Successfully"));
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, city } = req.body;

  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new ApiError(400, "User Not found!");
  }

  if (name && name.trim()) user.name = name.trim();
  if (email && email.trim()) user.email = email.toLowerCase().trim();
  if (city && city.trim()) user.city = city.trim();

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Profile Updated successfully"));
});

