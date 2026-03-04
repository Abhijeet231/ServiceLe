import {Router} from "express";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

// Get All Pending Providers
router.get("/api/v1/admin/providers/pending")

// Approve Provider
router.patch("/api/v1/admin/providers/:providerId/approve")

// Reject Provider
router.patch("/api/v1/admin/providers/:providerId")

// Get All Approved Providers
router.get("/api/v1/admin/providers/approved")

// Get Provider Details
router.get("/api/v1/admin/providers/:providerId")


export default router;