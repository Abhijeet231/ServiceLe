import BaseDto from "../../../common/dto/base.dto.js";
import { z } from "zod";

class RegisterDto extends BaseDto {
  static schema = z.object({
    name: z.string().min(2, "Name is required"),

    email: z.email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    role: z.enum(["customer", "provider", "admin"]).optional(),

    address: z.string().min(1, "Address is required"),

    location: z.object({
      type: z.literal("Point"),

      coordinates: z.tuple([
        z.number().min(-180).max(180), // longitude
        z.number().min(-90).max(90),   // latitude
      ]),
    }),

    avatar: z.object({
      url: z.string().url("Invalid URL"),
      public_id: z.string().min(1),
    }).optional(),
  });
}

export default RegisterDto;