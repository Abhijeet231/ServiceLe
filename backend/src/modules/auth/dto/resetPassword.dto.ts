import BaseDto from "../../../common/dto/base.dto.js";
import {z} from "zod";

class ResetPassword extends BaseDto {
    static schema = z.object({
        token: z.string(),
        newPassword: z.string().min(6, "password should be at least 6 characters long")
    })
}

export default ResetPassword;