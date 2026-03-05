import { ApiError } from "../utils/ApiError.js";

export const verifyRoles = (...roles) => {
    return (req, res, next) => {

        if(!roles.includes(req.user.role)){
            throw new ApiError(403, "You are not authorised to perform this action");
        }

        next();
    }
}