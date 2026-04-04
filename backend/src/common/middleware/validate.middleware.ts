import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/api.error.js";

const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = schema.parse(req.body); 

      req.body = value; 
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map(err => err.message).join("; ");
        throw ApiError.badRequest(message);
      }

      next(error);
    }
  };
};

export default validate;