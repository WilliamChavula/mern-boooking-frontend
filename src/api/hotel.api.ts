import {
  BookingResponseSchema,
  HotelResponse,
  HotelsSearchResponse,
  PaymentIntentResponseSchema,
  SearchParamsSchema,
  UserBookingFormState,
  UserBookingResponseSchema,
} from "@/types.ts";
import axios from "axios";
import qs from "qs";
import { useMutation, useQuery } from "@tanstack/react-query";

import { configVars } from "@/config";
import { toast } from "sonner";

export const useSearchHotel = (searchParams: SearchParamsSchema) => {
  const searchHotelRequest = async (
    searchParams: SearchParamsSchema,
  ): Promise<HotelsSearchResponse> => {
    const res = await axios.get<HotelsSearchResponse>(
      `${configVars.VITE_API_BASE_URL}/api/hotels/search`,
      {
        params: searchParams,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      },
    );

    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }

    return res.data;
  };

  const { data, isFetching } = useQuery<HotelsSearchResponse>({
    queryKey: ["search", searchParams],
    queryFn: async () => searchHotelRequest(searchParams),
  });

  return { data, isFetching };
};

export const useGetAllHotels = () => {
  const getAllHotels = async (): Promise<UserBookingResponseSchema> => {
    const res = await axios.get<UserBookingResponseSchema>(
      `${configVars.VITE_API_BASE_URL}/api/hotels`,
    );
    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }

    return res.data;
  };

  const { data: hotels, isLoading } = useQuery<UserBookingResponseSchema>({
    queryKey: ["fetch-hotels"],
    queryFn: getAllHotels,
  });

  return { hotels, isLoading };
};

export const useGetHotel = (hotelId: string) => {
  const getHotelByIdRequest = async (
    hotelId: string,
  ): Promise<HotelResponse> => {
    const res = await axios.get<HotelResponse>(
      `${configVars.VITE_API_BASE_URL}/api/hotels/${hotelId}`,
    );

    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  };

  const { data, isLoading } = useQuery<HotelResponse>({
    queryKey: ["fetch-hotel", hotelId],
    queryFn: () => getHotelByIdRequest(hotelId),
  });

  return { data, isLoading };
};

export const useCreatePaymentIntent = () => {
  const createPaymentIntent = async (data: {
    hotelId: string;
    numberOfNights: number;
  }): Promise<PaymentIntentResponseSchema> => {
    const res = await axios.post<PaymentIntentResponseSchema>(
      `${configVars.VITE_API_BASE_URL}/api/hotels/${data.hotelId}/bookings/payment-intent`,
      {
        numberOfNights: data.numberOfNights,
      },
      { withCredentials: true },
    );

    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  };

  const { mutateAsync: createUserPayment, isPending: isCreateIntentLoading } =
    useMutation({
      mutationFn: createPaymentIntent,
    });

  return { createUserPayment, isCreateIntentLoading };
};

export const useCreateBooking = () => {
  const createBooking = async (
    data: UserBookingFormState,
  ): Promise<BookingResponseSchema> => {
    const res = await axios.post<BookingResponseSchema>(
      `${configVars.VITE_API_BASE_URL}/api/hotels/${data.hotelId}/bookings`,
      data,
      { withCredentials: true },
    );

    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  };

  const { mutateAsync: createUserBooking, isPending: isCreatingBooking } =
    useMutation({
      mutationFn: createBooking,
      onSuccess: () => {
        toast.success("Hotel Room Booked.");
      },
      onError: () => {
        toast.error("Failed to Booking Room.");
      },
    });

  return { createUserBooking, isCreatingBooking };
};

export const useGetMyBookings = () => {
  const fetchUserBookings = async () => {
    const res = await axios.get<UserBookingResponseSchema>(
      `${configVars.VITE_API_BASE_URL}/api/my-bookings`,
      { withCredentials: true },
    );
    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  };

  const { data: userBookings, isFetching: isLoadingBookings } =
    useQuery<UserBookingResponseSchema>({
      queryKey: ["fetch-user-bookings"],
      queryFn: fetchUserBookings,
    });

  return { userBookings, isLoadingBookings };
};
