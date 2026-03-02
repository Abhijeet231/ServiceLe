import mongoose, {Schema} from "mongoose";

const providerProfileSchema = new Schema ({
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
    }
    ],
    bio: {
        type: String,
        required: [true, "Bio is required!"],
        trim: true
    },
    experienceYears: {
        type: Number,
        required: [true, "Experience is required!"],
    },
    isApprovedByAdmin: {
        type: Boolean,
        default: false,
    },
    averageRating:{
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
    }
});

//INDEXING
providerProfileSchema.index({ categoryId: 1 });
providerProfileSchema.index({ userId: 1 });
providerProfileSchema.index({ isApprovedByAdmin: 1 });

//MODEL
const ProviderProfile = mongoose.model("ProviderProfile", providerProfileSchema);

export default ProviderProfile;