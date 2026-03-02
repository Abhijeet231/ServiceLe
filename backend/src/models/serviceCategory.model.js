import mongoose, { Schema } from "mongoose";

const serviceCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
  },
  { timestamps: true },
);

//INDEXING
serviceCategorySchema.index({ name: "text" });

//MODEL
const ServiceCategory = mongoose.model(
  "ServiceCategory",
  serviceCategorySchema,
);

export default ServiceCategory;
