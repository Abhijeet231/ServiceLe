import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CustomerId is required!"],
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "ProviderProfile",
      required: [true, "ProviderId is required!"],
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "ServiceId is required!"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address Required"],
      maxlength: 200,
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City is required!"],
      maxlength: 50,
    },
    dateTime: {
      type: Date,
      required: [true, "Service date & time is required!"], //Note: time must be fututre- handle in zod validation. then dletetit
    },
    customerNotes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: [true, "price is required!"],
    },
    status: {
      type: String,
      enum: ["requested", "confirmed", "in-progress", "completed", "cancelled"],
      required: [true, "Status is required!"],
      default: "requested",
    },
    cancelledBy: {
      type: String,
      enum: ["customer", "provider", null],
      default: null,
    },
    providerWorkNotes: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    beforeImages: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    afterImages: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    startedAt: {
      type: Date
    },
    completedAt: {
      type: Date
    }
  },
  { timestamps: true },
);

//Indexing
bookingSchema.index({ customerId: 1 });
bookingSchema.index({ providerId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ providerId: 1, status: 1 });

// Model
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
