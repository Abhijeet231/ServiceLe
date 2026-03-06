import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Service Name must be at least 2 characters long!")
    .max(200, "Service Name must be less than 200 characters long!"),

  description: z
    .string()
    .trim()
    .min(10, "Service Description must be at least 10 characters long!")
    .max(2000, "Service Description must be less than 2000 characters long!"),

  basePrice: z
    .number({
      required_error: "BasePrice is required!",
    })
    .min(0, "BasePrice must be a positive number!"),
});