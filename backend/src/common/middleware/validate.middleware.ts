import { ZodType, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const validate = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.safeParse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new Error(err.issues.map(e => e.message).join("; ")));
      }
      next(err);
    }
  };
};

export default validate;