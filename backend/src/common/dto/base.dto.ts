import type mongoose from "mongoose";
import { z } from "zod";

class BaseDto {
    static schema = z.object({});

    static validate(data: unknown) {
        const result = this.schema.safeParse(data);

        if (!result.success) {
            return { errors: result.error, value: null }
            console.log("ZOD ERROR INSTANCE:", result.error)
        }

        return { errors: null, value: result.data }

    }
};

export default BaseDto;