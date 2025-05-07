import ManageHotelForm from "@/components/form/ManageHotelForm/ManageHotelForm.tsx";

import { useAddMyHotel } from "@/api/my-hotels.api.ts";

const AddHotel = () => {
  const { addHotelRequest, isLoading } = useAddMyHotel();

  return <ManageHotelForm onSave={addHotelRequest} isLoading={isLoading} />;
};

export default AddHotel;
