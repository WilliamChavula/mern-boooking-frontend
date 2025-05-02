import { useFormContext } from "react-hook-form";

import { CreateHotelSchema } from "@/types.ts";
import { hotelFacilities } from "@/config/hotel-options.config.ts";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

const FacilitiesSection = () => {
  const { control } = useFormContext<CreateHotelSchema>();
  return (
    <div>
      <h2 className="text-2xl font-bold my-3">Facilities</h2>
      <FormField
        control={control}
        name="facilities"
        render={({ field }) => (
          <>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {hotelFacilities.map((facility, index) => (
                <FormItem
                  key={index}
                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                >
                  <FormControl>
                    <Checkbox
                      onCheckedChange={(checked) => {
                        const selected = checked
                          ? [...field.value, facility]
                          : field.value.filter((v) => v !== facility);
                        field.onChange(selected);
                      }}
                      checked={field.value.includes(facility)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-slate-700">{facility}</FormLabel>
                  </div>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </>
        )}
      />
    </div>
  );
};

export default FacilitiesSection;
