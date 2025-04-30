import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email("Please enter a valid email address"),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({ message: "Confirm Password is required" })
      .min(8),
    firstName: z
      .string({ message: "First Name is required" })
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string({ message: "Last Name is required" })
      .min(2, "Last name must be at least 2 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Please enter a valid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

export type CreateUserResponseSchema = {
  success: true;
  message: string;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type ValidTokenResponseSchema = {
  success: true;
  message: string;
  data: {
    userId: string;
    email: string;
  } | null;
};

export type LoginResponseSchema = {
  success: boolean;
  message: string;
  data:
    | {
        token: string;
      }
    | undefined;
};

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
