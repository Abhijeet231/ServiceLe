import mongoose, {Schema} from "mongoose";

const serviceSchema = new Schema ({

    name: {
        type: String,
        required: [true, "Service Name is required!"],
        trim: true,        
    },
    description: {
        type: String,
        required: [true, "Service Description is required!"],
        trim: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: true,
        
    },
    basePrice: {
        type: Number,
        required: [true, "BasePrice is required!"]
    }

}, {timestamps: true});

// INDEXING
serviceSchema.index({ categoryId: 1 });
serviceSchema.index({ name: "text" });

// Model
const Service = mongoose.model("Service", serviceSchema);

export default Service;
