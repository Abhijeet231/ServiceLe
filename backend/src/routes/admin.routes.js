import {Router} from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { getPendingProviders, approveProvider, rejectProvider } from "../controllers/admin.controller.js";
import { verifyRoles } from "../middleware/verifyRoles.js";

const router = Router();

// Get All Pending Providers
router.get("/providers/pending", verifyJWT, verifyRoles("admin"), getPendingProviders )

// Approve Provider
router.patch("providers/:providerId/approve", verifyJWT,verifyRoles("admin"), approveProvider)

// Reject Provider
router.patch("/providers/:providerId", verifyJWT, verifyRoles("admin"), rejectProvider)


export default router;