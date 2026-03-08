import { z } from "zod";

// reusable ObjectId validator
const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid service id");

// future date validator
const futureDate = z
  .string()
  .refine((date) => new Date(date) > new Date(), {
    message: "Service time must be in the future",
  });

export const createBookingSchema = z.object({
  serviceId: objectId,

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(200, "Address must be less than 200 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),

  dateTime: futureDate,

  customerNotes: z
    .string()
    .trim()
    .max(1000, "Notes must be less than 1000 characters")
    .optional(),
});