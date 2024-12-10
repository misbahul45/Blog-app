import { z } from "zod";

export class AUTHVALIDATION {
  static readonly RegisterValidation = z
    .object({
      name: z.string().min(3, { message: "Name must be at least 3 characters" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z.string({ message: "Confirm Password is required" }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // Attach the error specifically to the confirmPassword field
    });

  static readonly LoginValidation = z
    .object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    });
}
