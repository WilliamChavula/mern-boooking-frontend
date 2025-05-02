import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { configVars } from "@/config";
import { toast } from "sonner";
import { CreateHotelSchemaResponse } from "@/types.ts";

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

export default useAddMyHotel;
