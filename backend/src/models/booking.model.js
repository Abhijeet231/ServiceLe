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
      ref: "Provider",
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
      required: [true, "Service date & time is required!"],
    },
    customerNotes: {
      type: String,
      trim: true,
      required: [true, "Notes is required!"],
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
      enum: ["customer", "provider"],
    },
    providerWorkNotes: {
      type: String,
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
