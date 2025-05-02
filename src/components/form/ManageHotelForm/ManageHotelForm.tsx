import { Form } from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createHotelSchema, CreateHotelSchema } from "@/types.ts";
import DetailsSection from "@/components/form/ManageHotelForm/DetailsSection.tsx";
import HotelTypes from "@/components/form/ManageHotelForm/HotelTypes.tsx";

const ManageHotelForm = () => {
  const form = useForm<CreateHotelSchema>({
    resolver: zodResolver(createHotelSchema),
  });
  return (
    <Form {...form}>
      <form className="flex flex-col gap-5">
        <DetailsSection />
        <HotelTypes />
      </form>
    </Form>
  );
};

export default ManageHotelForm;
