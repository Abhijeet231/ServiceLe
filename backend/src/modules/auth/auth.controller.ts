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

    }
}
