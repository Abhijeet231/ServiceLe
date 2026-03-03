import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import genAccessToken from "../utils/genAccessToken.js";
import cookieOptions from "../utils/cookieOptions.js";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  console.log("Incoming Body:", req.body);

  const { name, email, password, city } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(400, "User Already Exists!");
  }

  // Creating new user
  const user = new User({
    name,
    email: email.toLowerCase(),
    password,
    city,
  });

  await user.save();

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while Registering new User!");
  }

  // Creating AccesToken
  const accessToken = genAccessToken(createdUser._id, createdUser.role);

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new ApiError(400, "User Not Found!");
  }

  //Checking Password
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const accessToken = genAccessToken(user._id, user.role);

  user.password = undefined;

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, user, "User LoggedIn Successfully"));
});

// Get LoggedIn User
export const getLoggedInUser = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorised request!");
  }

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

     const user = await User.findById(req.user._id);
     if(!user){
        throw new ApiError(400, "User Not found!")
     }


     if(name && name.trim()) user.name = name;
     if(email && email.trim() && email.toLowerCase()) user.email = email;
     if(city && city.trim()) user.city = city;


     return res
     .status(200)
     .json(new ApiResponse(200, user, "User Profile Updated successfully"))

});
