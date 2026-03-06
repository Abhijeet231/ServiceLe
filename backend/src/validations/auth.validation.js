import { z } from "zod";

import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long!")
    .max(50, "Name must be less than 50 characters long!")
    .trim(),

  email: z
    .string()
    .email("Please use a valid email address")
    .trim()
    .toLowerCase(),

  password: z.string().min(6, "Password must be at least 6 characters long!"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters long!")
    .max(50, "City must be less than 50 characters long!")
    .trim(),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .email("Please use a valid email address")
    .trim()
    .toLowerCase(),

  password: z.string().min(6, "Password must be at least 6 characters long!"),
});
