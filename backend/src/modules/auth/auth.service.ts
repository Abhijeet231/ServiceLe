import ApiError from "../../common/utils/api.error.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, generateResetToken } from "../../common/utils/jwt.utils.js";
import User from "../user/user.schema.js";
import crypto from "crypto";
import { HydratedDocument } from "mongoose";

import { IUser } from "../user/user.schema.js";

const hashToken = (token: string) => {
    return crypto.createHash("sha256").update(token).digest("hex")
}

// Register Type
export type RegisterInput = {
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

// Login Type
type LoginInput = {
    email: string;
    password: string;
}


// REGISTER SERVICE
const register = async (data: RegisterInput) => {

    const { name, email, password, role, address, location, avatar } = data
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw ApiError.conflict("Email already exists!");
    };

    const { rawToken, hashedToken } = generateResetToken();

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
    const { password: _password, verificationToken, ...safeUser } = userObj;

    return safeUser

}


// LOGIN SERVICE
const login = async (data: LoginInput) => {
    const { email, password } = data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw ApiError.notfound("User Not found!")
    };

    // compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw ApiError.unauthorised("Invalid Email or Password!")
    };

    // Generating accessToken and refreshTokne
    const accessToken = generateAccessToken({ id: user._id.toString(), role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), role: user.role });

    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    const { password: _password, refreshToken: _refreshToken, ...safeUser } = userObj;

    return { user: safeUser, accessToken, refreshToken }

}

// LOGOUT SERVICE
const logout = async (userId: string) => {
    await User.findByIdAndUpdate(userId, {
        $set: { refreshToken: null }
    });
};

// REFRESH ACCESS TOKEN SERVICE
const refresh = async (token: string) => {
    if (!token) throw ApiError.unauthorised("Refresh Token Missing!");

    let decoded;
    try {
        decoded = verifyRefreshToken(token);
    } catch (error) {
        throw ApiError.unauthorised("Invalid or Expired refresh token")
    }

    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user) throw ApiError.unauthorised("User not found!");

    if (user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorised("Invalid refresh token")
    }

    const accessToken = generateAccessToken({ id: String(user._id), role: user.role })

    return { accessToken };

}

// VERIFY EMAIL
const verifyEmail = async(token: string){
    const trimmed = String(token).trim();
    if(!trimmed){
        throw ApiError.badRequest("Invalid or expired verification token")
    }

    const hashedToken = hashToken(trimmed);
    let user = await User.findOne({verificationToken: hashedToken}).select("+verificationToken")

    if(!user){
        user = await User.findOne({verificationToken: trimmed});
    }

    if(!user) throw ApiError.badRequest("Invalid or Expired token!")

        user.isVerified = true;
        user.verificationToken = undefined as any;
        await user.save();

        return user;
}


export { register, login, logout }