import { z } from "zod";

// ObjectId validator
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// CREATE PROVIDER PROFILE
export const createProviderProfileSchema = z.object({
  categoryId: objectId,

  serviceIds: z
    .array(objectId)
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


// UPDATE PROVIDER PROFILE
export const updateProviderProfileSchema = z.object({
  categoryId: objectId.optional(),

  serviceIds: z
    .array(objectId)
    .min(1, "At least one service must be selected")
    .optional(),

  bio: z
    .string()
    .trim()
    .min(10, "Bio must be at least 10 characters long!")
    .max(2000, "Bio must be less than 2000 characters long!")
    .optional(),

  experienceYears: z
    .coerce
    .number()
    .min(0, "Experience must be a positive number!")
    .optional(),
});