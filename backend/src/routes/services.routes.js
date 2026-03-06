import {Router} from "express";
import { createServices, getServicesByCategory, searchServices, serviceDetails, deleteService } from "../controllers/service.controller.js";
const router = Router();
import verifyJWT from "../middleware/auth.middleware.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import validate from "../middleware/validation.middleware.js";
import { createServiceSchema } from "../validations/service.validation.js";


// Create Services
router.post("/categories/:categoryId/services",verifyJWT, verifyRoles("admin"),validate(createServiceSchema), createServices)

//Get all Services Listed By Categories
router.get("/categories/:categoryId/services", getServicesByCategory)


// Search Services 
router.get("/services/search", searchServices);

// Get Individual service details 
router.get("/services/:serviceId", serviceDetails)


// Delete Individual Service
router.delete("/services/:serviceId",verifyJWT, verifyRoles("admin"), deleteService);

export default router;