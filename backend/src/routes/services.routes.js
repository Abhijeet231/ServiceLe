import {Router} from "express";



const router = Router();

// Create Services
router.post("/api/v1/categories/:categoryId/services")

//Get all Services
router.get("/api/v1/categories/:categoryId/services")

// Get Individual service
router.get("/api/v1/services/:serviceId")


// Delete Individual Service
router.delete("/api/v1/services/:serviceId")