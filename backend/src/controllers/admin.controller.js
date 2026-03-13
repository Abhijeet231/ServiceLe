import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ProviderProfile from "../models/providerProfile.model.js";

/**
 * @desc    Get Pending Providers
 * @route   GET /api/v1/admin/providers/pending
 * @access  Private (admin only)
 */
export const getPendingProviders = asyncHandler(async (req, res) => {

  const providers = await ProviderProfile.find({
    status: "pending",
  })
    .populate("userId", "name email")
    .populate("categoryId", "name")
    .populate("serviceIds", "name")
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, providers, "Pending Providers fetched successfully"),
    );
});

/**
 * @desc    Approve Providers
 * @route   PATCH /api/v1/admin/providers/:providerId/approve
 * @access  Private (admin only)
 */
export const approveProvider = asyncHandler(async (req, res) => {
  
  const { providerId } = req.params;

  const provider = await ProviderProfile.findById(providerId);

  if (!provider) {
    throw new ApiError(404, "Provider profile not found");
  }

  if (provider.status === "approved") {
    throw new ApiError(400, "Provider is already approved");
  }

  provider.status = "approved";

  await provider.save();

  return res
    .status(200)
    .json(new ApiResponse(200, provider, "Provider approved successfully"));
});

/**
 * @desc   Reject Providers
 * @route   PATCH /api/v1/admin/providers/:providerId
 * @access  Private (admin only)
 */
export const rejectProvider = asyncHandler(async (req, res) => {
  
  const { providerId } = req.params;

  const provider = await ProviderProfile.findById(providerId);

  if (!provider) {
    throw new ApiError(404, "Provider profile not found");
  }

  if (provider.status === "rejected") {
    throw new ApiError(400, "Provider is already rejected");
  }

  provider.status = "rejected";

  await provider.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Provider rejected successfully"));
});
