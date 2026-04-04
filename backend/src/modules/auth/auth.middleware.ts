import ApiError from "../../common/utils/api.error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "../user/user.schema.js";
import {NextFunction, Request, Response} from "express"

const authenticate = async(req:Request, res:Response, next: NextFunction) => {

    let token ;

    if(!token){
        throw ApiError.unauthorised("No token provided")
    }

    const accessToken: string = token;

    // Cheeckign Authorization Headers 
     if(req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
     }

     const decoded = verifyAccessToken(accessToken);
     const user = await User.findById(decoded.id);
     if(!user)throw ApiError.unauthorised("User not found!");

     req.user = {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
     }

     next()
};

type Role = "admin" | "customer" | "provider"
const authorize = (...roles:Role[]) => {
  return (req:Request, res:Response, next:NextFunction) => {

    if (!req.user || !roles.includes(req.user.role as Role)) {
      throw ApiError.forbidden(
        "You do not have permission to perform this action",
      );
    }
    next();
  };
};

export { authenticate, authorize };