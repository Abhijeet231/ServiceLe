import { z } from "zod";

export const createServiceCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long!"),
});