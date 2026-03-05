import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import genAccessToken from "../utils/genAccessToken.js";
import cookieOptions from "../utils/cookieOptions.js";


/**
 * @desc    Register User
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
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


/**
 * @desc    Login User
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
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

// Logout User
/**
 * @desc    Logout User
 * @route   POST /api/v1/auth/logout
 * @access  Private (use Auth middleware)
 */
export const logoutUser = asyncHandler(async(req,res) => {
  
   return res
   .status(200)
   .clearCookie("accessToken", cookieOptions)
   .json(new ApiResponse(200, null, "Logged Out Successfully!"))

})
