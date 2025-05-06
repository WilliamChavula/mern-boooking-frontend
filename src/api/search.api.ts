import { HotelsSearchResponse, SearchParamsSchema } from "@/types.ts";
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
    queryFn: () => searchHotelRequest(searchParams),
  });

  return { data, isFetching };
};
