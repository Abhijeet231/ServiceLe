import BaseDto from "../../../common/dto/base.dto.js";
import { z } from "zod";

class LoginDto extends BaseDto {
    static schema = z.object({
        email: z.email("Invalid Email"),
        password: z.string().min(6, "password must be at least 6 characters")
    })
}

export default LoginDto;