import crypto from "crypto"
import jwt, { SignOptions } from "jsonwebtoken"
import { env } from "../config/env.js"


// Defining Payload type
export interface AuthPayload {
    id : string;
    role: string;

}

// Generate Reset Token
const generateResetToken = (): {
    rawToken: string;
    hashedToken: string;
} => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    return { rawToken, hashedToken };
}

// Generate AccessToken
const generateAccessToken = (payload: AuthPayload): string => {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRY,
    } as SignOptions)
}

// Verify AccessToken
const verifyAccessToken = (token: string): AuthPayload => {

    return jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthPayload;

}


// Generate RefreshToken
const generateRefreshToken = (payload: AuthPayload): string => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRY,
    } as SignOptions)
}

// Verify RefreshToken
const verifyRefreshToken = (token: string): AuthPayload => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as AuthPayload
};


export { generateResetToken, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken }