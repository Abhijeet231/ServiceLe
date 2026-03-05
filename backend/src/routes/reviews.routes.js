import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { createReview, getProviderReviews, getMyReviews, deleteReview } from "../controllers/review.controller.js";


const router = Router();

// Create Review
router.post("/api/v1/reviews", verifyJWT, createReview);


// Get Reviews for Individual Provider
router.get("/api/v1/providers/:providerId/reviews", verifyJWT, getProviderReviews);


// Get Reviews for Individual Customer
router.get("/api/v1/reviews/me", verifyJWT, getMyReviews);


// Delete Review (customer / admin)
router.delete("/api/v1/reviews/:reviewId", deleteReview);




export default router;


