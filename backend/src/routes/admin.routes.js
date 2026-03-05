import {Router} from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { getPendingProviders, approveProvider, rejectProvider } from "../controllers/admin.controller.js";

const router = Router();

// Get All Pending Providers
router.get("/providers/pending", verifyJWT, getPendingProviders )

// Approve Provider
router.patch("providers/:providerId/approve", verifyJWT,approveProvider)

// Reject Provider
router.patch("/providers/:providerId", verifyJWT, rejectProvider)


export default router;