import { z } from "zod";

// ObjectId validator
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const createReviewSchema = z.object({
  bookingId: objectId,

  rating: z
    .number({
      required_error: "Rating is required!",
    })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),

  comment: z
    .string()
    .trim()
    .max(1000, "Comment must be less than 1000 characters")
    .optional(),
});