import ApiError from "../../common/utils/api.error.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, generateResetToken } from "../../common/utils/jwt.utils.js";
import User from "../user/user.schema.js";
import crypto from "crypto";
import { HydratedDocument } from "mongoose";

import { IUser } from "../user/user.schema.js";

const hasToken = (token:string) => {
  return  crypto.createHash("sha256").update(token).digest("hex")
}

type RegisterInput = {
    name: string;
    email: string;
    password: string;
    role?: "customer" | "provider" | "admin";
    address: string;
    location: {
        type: "Point";
        coordinates: [number, number]
    };
    avatar?: {
        url: string;
        public_id: string;
    };
}


// REGISTER SERVICE
const register = async(data:RegisterInput) => {
    
    const {name, email, password, role, address, location, avatar  } = data
    const existingUser = await User.findOne({email});
    
    if(existingUser){
        throw ApiError.conflict("Email already exists!");
    };

    const {rawToken, hashedToken} = generateResetToken();

    const user: HydratedDocument<IUser> = await User.create({
     
     name,
     email,
     password,
     address,
     location,
     verificationToken: hashedToken,
     ...(avatar && { avatar }),
     role: role ?? "customer",

    })

    // Send an email to user with rawToken

   

const userObj = user.toObject();
const {password: _password, verificationToken, ...safeUser} = userObj;

return safeUser
return userObj;
}