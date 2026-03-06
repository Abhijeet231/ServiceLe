import {ApiError} from "../utils/ApiError.js"

const validate = (schema) => {
    return (req,res,next) => {
        const parsed = schema.safeParse(req.body)

        if(!parsed.success) {
            const errorMessage = parsed.error?.errors?.[0]?.message || "Invalid data";
            throw new ApiError(400, errorMessage);
        };

        req.body = parsed.data; 
        next();
    };
};

export default validate;