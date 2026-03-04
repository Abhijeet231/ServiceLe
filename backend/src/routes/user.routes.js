import {Router} from "express";



const router = Router();

//Register user
router.post("/register")

// Login user
router.post("/login")

// Get Current User
router.get("/users/me")

// Update User Profile
router.patch("/users/me")

// Delete User Profile
router.delete("/users/me")