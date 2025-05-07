import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { configVars } from "@/config";
import { toast } from "sonner";
import {
  CreateHotelSchemaResponse,
  HotelResponse,
  HotelsResponse,
} from "@/types.ts";

const useAddMyHotel = () => {
  const addHotelAxiosRequest = async (hotel: FormData) => {
    const res = await axios.post<CreateHotelSchemaResponse>(
      `${configVars.VITE_API_BASE_URL}/api/my/hotel`,
      hotel,
      { withCredentials: true },
    );

    if (res.status !== 201 || !res.data.success)
      throw new Error(res.data.message);

    return res.data;
  };

  const { mutateAsync: addHotelRequest, isPending: isLoading } = useMutation({
    mutationFn: addHotelAxiosRequest,
    onSuccess: () => {
      toast.success("Hotel added successfully.");
    },
    onError: () => {
      toast.error("Failed to add Hotel");
    },
  });

  return { addHotelRequest, isLoading };
};

const useGetMyHotels = () => {
  const getHotelAxiosRequest = async (): Promise<HotelsResponse> => {
    const res = await axios.get<HotelsResponse>(
      `${configVars.VITE_API_BASE_URL}/api/my/hotel`,
      { withCredentials: true },
    );
    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  };

  const { data } = useQuery<HotelsResponse>({
    queryKey: ["fetch-hotels"],
    queryFn: getHotelAxiosRequest,
  });

  return data;
};

const useGetMyHotel = (hotelId: string) => {
  const getHotelAxiosRequest = async (
    hotelId: string,
  ): Promise<HotelResponse> => {
    const res = await axios.get<HotelResponse>(
      `${configVars.VITE_API_BASE_URL}/api/my/hotel/${hotelId}`,
      { withCredentials: true },
    );
    if (!res.data.success || res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  };

  const { data, isLoading } = useQuery<HotelResponse>({
    queryKey: ["fetch-hotels", hotelId],
    queryFn: () => getHotelAxiosRequest(hotelId),
  });

  return { data, isLoading };
};

const useUpdateHotel = () => {
  const queryClient = useQueryClient();
  const updateHotelAxiosRequest = async (hotel: FormData) => {
    const hotelId = hotel.get("hotelId");

    const res = await axios.put<CreateHotelSchemaResponse>(
      `${configVars.VITE_API_BASE_URL}/api/my/hotel/${hotelId}`,
      hotel,
      { withCredentials: true },
    );

    if (res.status !== 200 || !res.data.success)
      throw new Error(res.data.message);

    return res.data;
  };

  const { mutateAsync: updateHotelRequest, isPending: isLoading } = useMutation(
    {
      mutationFn: updateHotelAxiosRequest,
      onSuccess: async ({ data }) => {
        toast.success("Hotel updated successfully.");
        await queryClient.invalidateQueries({
          queryKey: ["fetch-hotels", data._id],
        });
      },
      onError: () => {
        toast.error("Failed to update Hotel");
      },
    },
  );

  return { updateHotelRequest, isLoading };
};

export { useAddMyHotel, useGetMyHotels, useGetMyHotel, useUpdateHotel };
