import {Router} from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { createProviderProfile, updateProviderProfile, getAllProvidersProfile, getProviderProfileDetails, toggleAvailabilityStatus } from "../controllers/serviceProvider.controller.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import validate from "../middleware/validation.middleware.js";
import { createProviderProfileSchema, updateProviderProfileSchema } from "../validations/provider.validation.js";

const router = Router();

// Create Provider Profile
router.post("/profile", verifyJWT, validate(createProviderProfileSchema), createProviderProfile);


// Update Provider Profile
router.patch("/profile", verifyJWT,validate(updateProviderProfileSchema), updateProviderProfile);


// Get All Approved Available Providers Profile
router.get("/", getAllProvidersProfile);


// Get Single Provider Profile
router.get("/:providerId", getProviderProfileDetails);


// Toggle Availability Status
router.patch("/availability", verifyJWT, verifyRoles("provider"), toggleAvailabilityStatus);

export default router;


