import { z } from "zod";

/* ================= REGISTER ================= */

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),

  email: z
    .string()
    .email("Enter a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  city: z
    .string()
    .min(2, "City name is too short")
    .max(50, "City name is too long")
    .trim(),
});



/* ================= LOGIN ================= */

export const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});