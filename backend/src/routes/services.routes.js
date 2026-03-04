import {Router} from "express";



const router = Router();

// Create Services
router.post("/api/v1/categories/:categoryId/services")

//Get all Services Listed By Categories
router.get("/api/v1/categories/:categoryId/services")


// Search Services 
router.get("/api/v1/services/search?q=clean");

// Get Individual service details 
router.get("/api/v1/services/:serviceId")


// Delete Individual Service
router.delete("/api/v1/services/:serviceId")