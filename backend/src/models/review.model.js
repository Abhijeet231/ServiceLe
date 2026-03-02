import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema ({
    bookingId:{
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: [true, "BookingId is required!"]
    },
    customerId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "CustomerId is required!"]
    },
    providerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "ProviderId is required!"],
    },
    rating: {
       type: Number,
       required: [true, "Rating is required!"],
       min: 1,
       max: 5,
       
    },
    comment: {
        type: String,
        trim: true
    },
    
},{timestamps:true})

// Indexing
reviewSchema.index({providerId: 1});
reviewSchema.index({customerId: 1});
reviewSchema.index({bookingId:1}, {unique: true});


// Model
const Review = mongoose.model("Review", reviewSchema);

export default Review;