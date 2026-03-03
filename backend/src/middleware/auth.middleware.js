import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async(req, res, next) => {
    // Get Token from Cookie or Header
    const token = req.cookies?.accessToken;

    if(!token){
        throw new ApiError(401, "Unauthorised request- No Token Provided!")
    };

    //Verifying Token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        throw new ApiError(401, "Invalid or Expired token!")
    }

    // Finding User
    const user = await User.findById(decodedToken._id);
    if(!user) {
        throw new ApiError(401, "Unauthorised Request - User not found!")
    }

    user.password = undefined;

    //Attaching user ot request body
    req.user = user;
    next();

});

export default verifyJWT;