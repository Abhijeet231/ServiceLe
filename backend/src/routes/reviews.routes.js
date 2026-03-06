import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createReview,
  getProviderReviews,
  getMyReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import validate from "../middleware/validation.middleware.js";
import { createReviewSchema } from "../validations/review.validation.js";

const router = Router();

// Create Review
router.post("/reviews", verifyJWT, verifyRoles("customer"), validate(createReviewSchema), createReview);

// Get Reviews for Individual Provider
router.get(
  "/providers/:providerId/reviews",
  verifyJWT,
  getProviderReviews,
);

// Get All Reviews made by Individual Customer
router.get("/reviews/me", verifyJWT, getMyReviews);

// Delete Review (customer / admin)
router.delete(
  "/reviews/:reviewId",
  verifyRoles("customer", "admin"),
  deleteReview,
);

export default router;
