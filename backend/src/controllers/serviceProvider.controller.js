import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ProviderProfile from "../models/providerProfile.model.js";
import { validateServicesForCategory } from "../utils/validateServiceForCategory.js";

/**
 * @desc    Create Provider Profile
 * @route   POST /api/v1/providers/profile
 * @access  Private (Provider)
 */
export const createProviderProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { categoryId, serviceIds, bio, experienceYears } = req.body;

  const existingProfile = await ProviderProfile.findOne({ userId });

  if (existingProfile) {
    throw new ApiError(400, "Provider profile already exists");
  }

  const provider = await ProviderProfile.create({
    userId,
    categoryId,
    serviceIds,
    bio,
    experienceYears,
  });

  // change user role to provider
  await User.findByIdAndUpdate(userId, { role: "provider" });


  return res
    .status(201)
    .json(
      new ApiResponse(201, provider, "Provider profile created successfully."),
    );
});



/**
 * @desc    Update Provider Profile
 * @route   PACH /api/v1/providers/profile
 * @access  Private (Provider)
 */
export const updateProviderProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { categoryId, serviceIds, bio, experienceYears } = req.body;

  const provider = await ProviderProfile.findOne({ userId });
  if (!provider) {
    throw new ApiError(404, "Provider profile not found");
  }

  // Approved providers can't update!!! Updation should happen before getting approval..or if status === "rejected" ..

  if (provider.status === "approved") {
    throw new ApiError(403, "Approved providers cannot modify profile");
  }

  const newCategory = categoryId || provider.categoryId;
  const newServices = serviceIds || provider.serviceIds;

  // validate services - category mismatch
  await validateServicesForCategory(newCategory, newServices);

  if (categoryId) provider.categoryId = categoryId;
  if (serviceIds) provider.serviceIds = serviceIds;
  if (bio) provider.bio = bio;
  if (experienceYears) provider.experienceYears = experienceYears;

  await provider.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, provider, "Provider profile updated successfully"),
    );
});



/**
 * @desc    Get all approved Providers profile
 * @route   POST /api/v1/providers
 * @access  Public 
 **/
export const getAllProvidersProfile = asyncHandler(async (req, res) => {
  const providers = await ProviderProfile.find({
    status: "approved",
    availabilityStatus: true,
  })
    .select(
      "userId categoryId serviceIds averageRating totalReviews totalJobsCompleted availabilityStatus",
    )
    .populate("userId", "name email city")
    .populate("categoryId", "name")
    .populate("serviceIds", "name")
    .sort({ averageRating: -1, totalReviews: -1 })
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        providers,
        "Approved providers fetched successfully",
      ),
    );
});



/**
 * @desc    Get Single Provider Profile
 * @route   POST /api/v1/providers/:providerId
 * @access  publiC
 */
export const getProviderProfileDetails = asyncHandler(async (req, res) => {
  const { providerId } = req.params;

  const provider = await ProviderProfile.findById(providerId)
    .populate("userId", "name email city")
    .populate("categoryId", "name")
    .populate("serviceIds", "name description basePrice")
    .lean();

  if (!provider) {
    throw new ApiError(404, "Provider not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, provider, "Provider Details Fetched Successfully!"),
    );
});




/**
 * @desc    Toggle Availability status
 * @route   POST /api/v1/providers/availability
 * @access  Private (provider only)
 */
export const toggleAvailabilityStatus = asyncHandler(async (req, res) => {

  const provider = await ProviderProfile.findOne({ userId: req.user._id });
  if (!provider) {
    throw new ApiError(400, "Service Provider Profile Not Found!");
  }

  // toggle status
  provider.availabilityStatus = !provider.availabilityStatus;

  await provider.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        provider,
        `Provider availability is now ${provider.availabilityStatus ? "ON" : "OFF"}`,
      ),
    );
});

