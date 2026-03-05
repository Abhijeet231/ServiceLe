import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ProviderProfile from "../models/providerProfile.model.js";

// get Pending Providers 
export const getPendingProviders = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "You are not authorised to perform this action.");
  }

  const providers = await ProviderProfile.find({
    status: "pending",
  })
    .populate("userId", "name email")
    .populate("categoryId", "name")
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, providers, "Pending Providers fetched successfully"),
    );
});

// Approve Providers 
export const approveProvider = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can approve providers");
  }
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

// Reject Providers 
export const rejectProvider = asyncHandler(async (req, res) => {

  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can reject providers");
  }

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
