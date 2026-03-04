import {Router} from "express";
import { createServices, getServicesByCategory, searchServices, serviceDetails, deleteService } from "../controllers/service.controller.js";
const router = Router();

// Create Services
router.post("/categories/:categoryId/services", createServices)

//Get all Services Listed By Categories
router.get("/categories/:categoryId/services", getServicesByCategory)


// Search Services 
router.get("/services/search", searchServices);

// Get Individual service details 
router.get("/services/:serviceId", serviceDetails)


// Delete Individual Service
router.delete("/services/:serviceId", deleteService);

export default router;