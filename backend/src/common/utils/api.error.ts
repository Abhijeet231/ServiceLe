
class ApiError extends Error {

    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;

        // Fixing prototype chain 
        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string = "Bad Request!"): ApiError {
        return new ApiError(400, message)
    }

    static unauthorised(message: string = "Unauthorised!"): ApiError {
        return new ApiError(401, message)
    }

    static conflict(message: string = "User already exists!"): ApiError {
        return new ApiError(409, message)
    }

    static notfound(message: string = "User not found!"): ApiError {
        return new ApiError(404, message)
    }

    static internalServerError(message: string = "Internal Server Error!"): ApiError {
        return new ApiError(500, message)

    }

    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }
}

export default ApiError;