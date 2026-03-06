import { z } from "zod";

// reusable ObjectId validator
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// future date validator
const futureDate = z
  .string()
  .datetime()
  .refine((date) => new Date(date) > new Date(), {
    message: "Service time must be in the future",
  });


// CREATE BOOKING
export const createBookingSchemaZod = z.object({
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


// RESCHEDULE BOOKING
export const rescheduleBookingSchemaZod = z.object({
  dateTime: futureDate,
});


// UPDATE BOOKING STATUS
export const updateBookingStatusSchemaZod = z.object({
  status: z.enum([
    "requested",
    "confirmed",
    "in-progress",
    "completed",
    "cancelled",
  ]),
});