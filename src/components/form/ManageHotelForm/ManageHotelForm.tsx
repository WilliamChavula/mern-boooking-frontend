import { Form } from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createHotelSchema,
  CreateHotelSchema,
  HotelData,
  MutationAsyncFunctionType,
} from "@/types.ts";

import DetailsSection from "@/components/form/ManageHotelForm/DetailsSection.tsx";
import HotelTypesSection from "@/components/form/ManageHotelForm/HotelTypesSection.tsx";
import FacilitiesSection from "@/components/form/ManageHotelForm/FacilitiesSection.tsx";
import GuestsSection from "@/components/form/ManageHotelForm/GuestsSection.tsx";
import ImagesSection from "@/components/form/ManageHotelForm/ImagesSection.tsx";

import { Button } from "@/components/ui/button.tsx";
import { Loader } from "lucide-react";
import { useEffect } from "react";

interface ManageHotelFormProps {
  hotel?: HotelData;
  onSave: MutationAsyncFunctionType;
  isLoading: boolean;
}

const ManageHotelForm = ({
  onSave,
  isLoading,
  hotel,
}: ManageHotelFormProps) => {
  const form = useForm<CreateHotelSchema>({
    resolver: zodResolver(createHotelSchema),
    defaultValues: {
      facilities: hotel?.facilities || [],
      starRating: hotel?.starRating,
      adultCount: 1,
      childCount: 0,
      name: "",
      city: "",
      country: "",
      description: "",
      imageUrls: hotel?.imageUrls,
    },
  });

  const onHotelFormSubmit = async (jsonData: CreateHotelSchema) => {
    const formData = new FormData();

    if (hotel) formData.append("hotelId", hotel._id);

    formData.append("name", jsonData.name);
    formData.append("city", jsonData.city);
    formData.append("country", jsonData.country);
    formData.append("description", jsonData.description);
    formData.append("type", jsonData.type);
    formData.append("adultCount", jsonData.adultCount.toString());
    formData.append("childCount", jsonData.childCount.toString());
    formData.append("pricePerNight", jsonData.pricePerNight.toString());
    formData.append("starRating", jsonData.starRating.toString());

    if (jsonData.imageFiles) {
      Array.from(jsonData.imageFiles).forEach((imageFile) => {
        formData.append("imageFiles", imageFile);
      });
    }

    jsonData.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (jsonData.imageUrls) {
      jsonData.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    await onSave(formData);
  };

  useEffect(() => {
    form.reset(hotel);
  }, [form, hotel]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onHotelFormSubmit)}
      >
        <DetailsSection />
        <HotelTypesSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <Button
            disabled={isLoading}
            type="submit"
            className="cursor-pointer bg-blue-600 hover:bg-blue-500 rounded-none text-white p-2 font-bold txxt-sm md:text-xl disabled:bg-slate-400"
          >
            {isLoading && <Loader className="mr-2" />}
            Save
          </Button>
        </span>
      </form>
    </Form>
  );
};

export default ManageHotelForm;
