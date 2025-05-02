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

export const createHotelSchema = z
  .object({
    name: z
      .string({ message: "Name cannot be blank." })
      .min(3, "Name cannot be less than 3 characters.")
      .max(300, "Name cannot be more than 300 characters"),
    city: z
      .string({ message: "City cannot be blank." })
      .min(3, "City cannot be less than 3 characters.")
      .max(300, "City cannot be more than 300 characters"),
    country: z
      .string({ message: "Country cannot be blank." })
      .min(3, "Country cannot be less than 3 characters.")
      .max(300, "Country cannot be more than 300 characters"),
    description: z
      .string({ message: "Description cannot be blank." })
      .min(3, "Description cannot be less than 3 characters.")
      .max(300, "Description cannot be more than 300 characters"),
    type: z.string({
      message: "Select an option",
    }),
    adultCount: z.coerce
      .number({
        message: "Enter number of adults",
      })
      .min(1, "Adult count cannot be less than 1"),
    childCount: z.coerce
      .number({
        message: "Enter number of children",
      })
      .min(0),
    pricePerNight: z.coerce
      .number({
        message: "Enter price of stay per night",
      })
      .min(1),
    starRating: z.coerce
      .number({
        message: "Enter hotel rating",
      })
      .min(1, "Rating cannot be less than 1")
      .max(5, "Rating cannot be more than 5"),
    userId: z.string().optional(),
    imageFiles: z.instanceof(FileList, {
      message: "Must upload at least one image file",
    }),
    facilities: z.string().array().nonempty({
      message: "Must select at least one facility",
    }),
  })
  .refine((data) => data.imageFiles.length !== 0, {
    message: "Hotel must have at least 1 image",
    path: ["imageFiles"],
  })
  .refine((data) => data.imageFiles.length <= 6, {
    message: "Hotel cannot have more than 6 images",
    path: ["imageFiles"],
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
export type CreateHotelSchema = z.infer<typeof createHotelSchema>;
