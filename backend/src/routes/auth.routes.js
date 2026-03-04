import {Router} from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

// Register User
router.post('/register', registerUser);


// Login User
router.post("/login", loginUser);

// Logout User
router.post("/logout",verifyJWT, logoutUser);


export default router;