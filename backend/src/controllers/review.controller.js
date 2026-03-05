import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";


/**
 * @desc    Create a new review
 * @route   POST /api/v1/reviews
 * @access  Private (Customer only)
 */
export const createReview = asyncHandler(async (req, res) => {

    const { bookingId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);

    if(!booking){
        throw new ApiError(404, "Booking not found");
    }

    if(booking.customerId.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You can only review your own booking");
    }

    if(booking.status !== "completed"){
        throw new ApiError(400, "Review allowed only after service completion");
    }

    const existingReview = await Review.findOne({ bookingId });

    if(existingReview){
        throw new ApiError(400, "Review already submitted for this booking");
    }

    const review = await Review.create({
        bookingId,
        customerId: req.user._id,
        providerId: booking.providerId,
        rating,
        comment
    });

    return res.status(201).json(
        new ApiResponse(201, review, "Review submitted successfully")
    );
});


/**
 * @desc    Get Reviews for Individual Provider
 * @route   GET /api/v1/providers/:providerId/reviews
 * @access  Private (Provider only)
 */
export const getProviderReviews = asyncHandler(async (req,res)=>{

    const { providerId } = req.params;

    const reviews = await Review.find({ providerId })
        .populate("customerId","name avatar")
        .populate({
            path:"bookingId",
            populate:{
                path:"serviceId",
                select:"name"
            }
        })
        .sort({createdAt:-1});

    return res.status(200).json(
        new ApiResponse(200,reviews,"Provider reviews fetched")
    );

});


/**
 * @desc    Get Reviews made by Individual Customer
 * @route   POST /api/v1/reviews/me
 * @access  Private (Customer only)
 */
export const getMyReviews = asyncHandler(async(req,res)=>{

    const reviews = await Review.find({customerId:req.user._id})
        .populate("providerId","name")
        .populate("bookingId");

    return res.status(200).json(
        new ApiResponse(200,reviews,"Your reviews fetched")
    );

});

/**
 * @desc    Delete Review
 * @route   POST /api/v1/reviews/:reviewId
 * @access  Private (Customer only)
 */
export const deleteReview = asyncHandler(async(req,res)=>{

    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if(!review){
        throw new ApiError(404,"Review not found");
    }

    // Owner Chcking
    if(
        review.customerId.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ){
        throw new ApiError(403,"Not authorised to delete this review");
    }

    await review.deleteOne();

    return res.status(200).json(
        new ApiResponse(200,null,"Review deleted successfully")
    );

});