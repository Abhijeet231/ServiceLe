import mongoose, { Schema } from "mongoose";

const providerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "ServiceCategory",
    required: true,
  },
  serviceIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  ],
  bio: {
    type: String,
    required: [true, "Bio is required!"],
    trim: true,
    minlength: [10, "Bio must be at least 10 characters long!"],
    maxlength: [2000, "Bio must be less than 2000 characters long!"],
  },
  experienceYears: {
    type: Number,
    required: [true, "Experience is required!"],
    min: [0, "Experience must be a positive number!"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  totalJobsCompleted: {
    type: Number,
    default: 0,
  },
  availabilityStatus: {
    type: Boolean,
    default: true,
  },
});

//INDEXING
providerProfileSchema.index({ categoryId: 1 });
providerProfileSchema.index({ userId: 1 });
providerProfileSchema.index({ isApprovedByAdmin: 1 });

//MODEL
const ProviderProfile = mongoose.model(
  "ProviderProfile",
  providerProfileSchema,
);

export default ProviderProfile;
