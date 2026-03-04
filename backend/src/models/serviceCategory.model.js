import mongoose, { Schema } from "mongoose";

const serviceCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long!"],
     
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
