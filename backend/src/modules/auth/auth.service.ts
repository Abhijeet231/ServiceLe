import ApiError from "../../common/utils/api.error.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, generateResetToken } from "../../common/utils/jwt.utils.js";
import User from "../user/user.schema.js";
import crypto from "crypto";
import { HydratedDocument } from "mongoose";

import { IUser } from "../user/user.schema.js";
import { sendResetPasswordEmail } from "../../common/config/email.js";

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
const verifyEmail = async (token: string) => {
    const trimmed = String(token).trim();
    if (!trimmed) {
        throw ApiError.badRequest("Invalid or expired verification token")
    }

    const hashedToken = hashToken(trimmed);
    let user = await User.findOne({ verificationToken: hashedToken }).select("+verificationToken")

    if (!user) {
        user = await User.findOne({ verificationToken: trimmed });
    }

    if (!user) throw ApiError.badRequest("Invalid or Expired token!")

    user.isVerified = true;
    user.verificationToken = undefined as any;
    await user.save();

    return user;
}

// FORGOT PASSWORD
const forgotPassword = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw ApiError.notfound("No account with this email found!");

    const { rawToken, hashedToken } = generateResetToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    try {
        await sendResetPasswordEmail(email, rawToken);
    } catch (error) {
        console.error("Failed to send reset email:", error)
    }

}

// RESET PASSWORD
const resetPassword = async (token: string, newPassword: string) => {

    const hashedToken = hashToken(token);

    // checking tokens
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: new Date() }
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) throw ApiError.badRequest("Invalid or Expired reset token");

    user.password = newPassword;
    user.resetPasswordToken = undefined as any;
    user.resetPasswordExpires = undefined as any;

    await user.save();

    return { message: "Password reset successful" }
}

// GET ME 
const getMe = async (userId: string) => {

    let user = await User.findById(userId)
        .select("-password -refreshToken -resetPasswordToken -verificationToken")
        .lean();
    if (!user) throw ApiError.notfound("User not found");

    return user

}

export { register, login, logout, refresh, getMe, resetPassword, verifyEmail, forgotPassword }