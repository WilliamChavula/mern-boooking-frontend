import {
  HotelResponse,
  HotelsSearchResponse,
  SearchParamsSchema,
} from "@/types.ts";
import axios from "axios";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";

import { configVars } from "@/config";

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
