import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";



/**
 * @desc   Get LoggedIn User
 * @route   GET /api/v1/users/me
 * @access  Private (verify by auth middleware)
 */
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
/**
 * @desc   Update User Profile
 * @route   PATCH /api/v1/users/me
 * @access  Private (verify by auth middleware)
 */
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

// Delete user Profile 
export const deleteUserProfile = asyncHandler(async(req,res) => {

//   Implement this at the end !! Delete everything related to user, except reviews and booking history, make review anonymous (reddit style) when user is deleted ... and same for booking history. 

// first fetch user from req.user , 
// check user exists in DB > now use if else . 
// if user.role == " customer" then - find all related Bookings and if booking status is - requested/pending/
//  then change status to cancelled.

// if status - progress, then show errror!! 

// find all reviews by user > and populate the customerId field and make the name to anonymous user or user not exists but still other users can see teh review . then delete the customer ID . 

// Now if role == provider , then do the same - find all bookings realted to him, if booking status is - requested then change status to cancelled, 

// but if status is - progress/ or provider accepts that then show error  - that first need to completed assigned task. thene delete. 

})