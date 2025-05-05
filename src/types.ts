import { z } from "zod";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

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
    imageFiles: z.instanceof(FileList).optional(),
    imageUrls: z.array(z.string()).optional(),
    facilities: z.string().array().nonempty({
      message: "Must select at least one facility",
    }),
  })
  .refine(
    (data) => data.imageUrls !== undefined || data.imageFiles!.length !== 0,
    {
      message: "Hotel must have at least 1 image",
      path: ["imageFiles"],
    },
  )
  .refine(
    (data) => data.imageUrls !== undefined || data.imageFiles!.length <= 6,
    {
      message: "Hotel cannot have more than 6 images",
      path: ["imageFiles"],
    },
  )
  .refine(
    (data) => {
      if (data.imageUrls) {
        if (data.imageFiles) {
          return data.imageFiles!.length + data.imageUrls?.length <= 6;
        }
        return data.imageUrls.length <= 6;
      }
      return true;
    },
    {
      message: "Hotel cannot have more than 6 images",
      path: ["imageFiles"],
    },
  );

export const createHotelSchemaSuccessResponse = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    _id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
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
    imageFiles: z.array(z.string()),
    facilities: z.string().array().nonempty({
      message: "Must select at least one facility",
    }),
  }),
});

export const createHotelSchemaFailedResponse = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z
    .object({
      message: z.string(),
      path: z.string().array(),
    })
    .array()
    .optional(),
});

export const hotelParam = z.string({ message: "Hotel param is required" });

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

export type HotelData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  pricePerNight: number;
  starRating: number;
  userId: string;
  imageUrls: string[];
  facilities: string[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type HotelsSuccessResponse = {
  success: true;
  message: string;
  data: HotelData[];
};

type HotelsErrorResponse = {
  success: false;
  message: string;
  data: [];
};

type HotelSuccessResponse = {
  success: true;
  message: string;
  data: HotelData;
};

type HotelErrorResponse = {
  success: false;
  message: string;
};

export type HotelsSearchResponse =
  | {
      success: true;
      message: string;
      pagination: { pages: number; currentPage: number; nextPage: number };
      data: HotelData[];
    }
  | {
      success: false;
      message: string;
      error?: { message: string; path: string[] }[];
    };

export type HotelsResponse = HotelsSuccessResponse | HotelsErrorResponse;
export type HotelResponse = HotelSuccessResponse | HotelErrorResponse;

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type CreateHotelSchema = z.infer<typeof createHotelSchema>;
export type CreateHotelSchemaResponse =
  | z.infer<typeof createHotelSchemaSuccessResponse>
  | z.infer<typeof createHotelSchemaFailedResponse>;

export type MutationAsyncFunctionType = UseMutateAsyncFunction<
  CreateHotelSchemaResponse,
  Error,
  FormData
>;
