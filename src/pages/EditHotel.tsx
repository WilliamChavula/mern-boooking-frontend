import { useParams } from "react-router";

import { useGetMyHotel, useMyUpdateHotel } from "@/api/my-hotels.api.ts";

import ManageHotelForm from "@/components/form/ManageHotelForm/ManageHotelForm.tsx";

import { hotelParam } from "@/types.ts";

import { TriangleAlert } from "lucide-react";

const EditHotel = () => {
  const { hotelId } = useParams();

  const id = hotelParam.parse(hotelId);

  const { isLoading: isGetLoading, data } = useGetMyHotel(id);

  const { updateHotelRequest, isLoading: isUpdateLoading } = useMyUpdateHotel();

  if (!data || !data.success) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4">
        <TriangleAlert size={32} className="text-orange-400" />
        <p className="text-md md:text-lg text-gray-800 font-semibold">
          No Hotel Found
        </p>
      </div>
    );
  }
  return (
    <ManageHotelForm
      hotel={data.data}
      isLoading={isGetLoading || isUpdateLoading}
      onSave={updateHotelRequest}
    />
  );
};

export default EditHotel;
