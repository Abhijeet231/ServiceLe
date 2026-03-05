import {Router} from "express";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

// Create Provider Profile
router.post("/api/v1/providers/profile");


// Update Provider Profile
router.patch("/api/v1/providers/profile");


// Get All Approved Available Providers Profile
router.get("/api/v1/providers");


// Get Single Provider Profile
router.get("/api/v1/providers/:providerId");


// Toggle Availability Status
router.patch("/api/v1/providers/availability")


