import {Router} from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";
import { registerUserSchema, loginUserSchema } from "../validations/auth.validation.js";


const router = Router();

// Register User
router.post('/register',validate(registerUserSchema), registerUser);


// Login User
router.post("/login", validate(loginUserSchema) , loginUser);

// Logout User
router.post("/logout",verifyJWT, logoutUser);


export default router;