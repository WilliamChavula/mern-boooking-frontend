import { Form } from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createHotelSchema, CreateHotelSchema } from "@/types.ts";
import DetailsSection from "@/components/form/ManageHotelForm/DetailsSection.tsx";

const ManageHotelForm = () => {
  const form = useForm<CreateHotelSchema>({
    resolver: zodResolver(createHotelSchema),
  });
  return (
    <Form {...form}>
      <form>
        <DetailsSection />
      </form>
    </Form>
  );
};

export default ManageHotelForm;
