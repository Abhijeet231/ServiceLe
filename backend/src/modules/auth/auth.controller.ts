import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api.response.js";
import cookieOptions from "../../common/utils/cookie.utils.js";
import { Request, Response } from "express";
import "multer"



// Request extended for file handling
export interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// REGISTER CONTROLLER
export const register = async (req: MulterRequest, res: Response) => {
    try {
        const { name, email, password, role, address, location } = req.body;

        let avatar;
        if (req.file) {
            // handle cloudinary upload setup

            avatar = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        const user = await authService.register({
            name,
            email,
            password,
            role,
            address,
            location, // ????? later chek for parsing it if coming as string
            ...(avatar && { avatar })
        });

        ApiResponse.created(res, "Registration Success", user)
    } catch (error) {
        console.error("Registration Error:", error);
        ApiResponse.internalServerError(res, "Registration failed");
    }
}

// LOGIN CONTROLLER
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await authService.login({ email, password });

        res.cookie("refreshToken", refreshToken, cookieOptions);
        ApiResponse.ok(res, "Login Success", { user, accessToken })

    } catch (error) {
        console.error("Login Error:", error);
        ApiResponse.internalServerError(res, "Login failed");
    }
}

// LOGOUT CONTROLLER
export const logout = async (req: Request, res: Response) => {

    if (!req.user) {
        return ApiResponse.internalServerError(res, "User not found")
    }

    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return ApiResponse.ok(res, "Logout Success");
        }
        await authService.logout(req.body!.id);
        res.clearCookie("refreshToken", cookieOptions);

        ApiResponse.ok(res, "Logout Success");

    } catch (error) {
        console.error("Logout Error:", error);
        ApiResponse.internalServerError(res, "Logout failed");
    }
}

// REFRESH ACCESS TOKEN CONTROLLER
export const refreshAccessToken = async (req: Request, res: Response) => {

    const token =
        req.cookies.refreshToken ||
        req.body.refreshToken ||
        (req.headers["x-refresh-token"] as string | undefined);

         if(!token || typeof token !== "string") {
           return ApiResponse.unauthorised(res, "Refresh token missing");
    }

    const { accessToken } = await authService.refresh(token);



    ApiResponse.ok(res, "AccessToken Generated", { accessToken })

}

// GET ME 
export const getMe = async (req: Request, res: Response) => {
   if(!req.user){
    throw new Error("No User Id provided")
   }

   const userId = req.user.id;

   const user = await authService.getMe(userId);

   return ApiResponse.ok(res, "Current User fetched", user)

}
