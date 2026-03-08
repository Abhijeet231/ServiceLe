import { z } from "zod";

export const createProviderProfileSchema = z.object({
  categoryId: z
    .string()
    .min(1, "Category is required"),

  serviceIds: z
    .array(
      z.string().min(1, "Invalid service")
    )
    .min(1, "At least one service must be selected"),

  bio: z
    .string()
    .trim()
    .min(10, "Bio must be at least 10 characters long!")
    .max(2000, "Bio must be less than 2000 characters long!"),

  experienceYears: z
    .coerce
    .number()
    .min(0, "Experience must be a positive number!"),
});