import mongoose, {Schema} from "mongoose";

const serviceSchema = new Schema ({

    name: {
        type: String,
        required: [true, "Service Name is required!"],
        trim: true,  
            minlength: [2, "Service Name must be at least 2 characters long!"],
            maxlength: [200, "Service Name must be less than 100 characters long!"],      
    },
    description: {
        type: String,
        required: [true, "Service Description is required!"],
        trim: true,
        minlength: [10, "Service Description must be at least 10 characters long!"],
        maxlength: [2000, "Service Description must be less than 2000 characters long!"],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: true,
        
    },
    basePrice: {
        type: Number,
        required: [true, "BasePrice is required!"],
        min: [0, "BasePrice must be a positive number!"],
    }

}, {timestamps: true});

// INDEXING
serviceSchema.index({ categoryId: 1 });
serviceSchema.index({ name: "text" });

// Model
const Service = mongoose.model("Service", serviceSchema);

export default Service;
