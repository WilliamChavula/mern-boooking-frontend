import { useFormContext } from "react-hook-form";
import { CreateHotelSchema } from "@/types.ts";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

const GuestsSection = () => {
  const { control } = useFormContext<CreateHotelSchema>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="bg-gray-300 px-4 py-5 flex flex-col md:flex-row gap-5 rounded-none">
        <FormField
          name="adultCount"
          control={control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-sm md:text-base text-gray-700">
                  Number of Adults
                </FormLabel>
                <FormControl className="border border-gray-900">
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    className="rounded-none py-3 bg-white"
                    defaultValue={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="childCount"
          control={control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className=" text-sm md:text-base text-gray-700">
                  Number of Children
                </FormLabel>
                <FormControl className="border border-gray-900">
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    className="rounded-none py-3 bg-white"
                    defaultValue={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
};

export default GuestsSection;
