import {Router} from "express";
import { getLoggedInUser, updateUserProfile } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";
import { updateUserProfileSchema } from "../validations/user.validation.js";


const router = Router();


// Get Current User
router.get("/",verifyJWT, getLoggedInUser )

// Update User Profile
router.patch("/",verifyJWT, updateUserProfile)




export default router;