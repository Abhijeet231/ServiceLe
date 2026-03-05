import Service from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";

export const validateServicesForCategory = async (categoryId, serviceIds) => {

  if (!serviceIds || serviceIds.length === 0) {
    throw new ApiError(400, "At least one service must be selected");
  }

  const invalidService = await Service.findOne({
    _id: { $in: serviceIds },
    categoryId: { $ne: categoryId }
  });

  if (invalidService) {
    throw new ApiError(
      400,
      "One or more services do not belong to the selected category"
    );
  }

};