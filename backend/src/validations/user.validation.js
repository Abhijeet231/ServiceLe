import { z } from "zod";

export const updateUserProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long!")
    .max(50, "Name must be less than 50 characters long!")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Please use a valid email address")
    .toLowerCase()
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters long!")
    .max(50, "City must be less than 50 characters long!")
    .optional(),
});