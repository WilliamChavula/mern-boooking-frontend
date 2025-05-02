import { CreateHotelSchema } from "@/types.ts";
import { useFormContext } from "react-hook-form";
import { hotelTypes } from "@/config/hotel-options.config.ts";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { cn } from "@/lib/utils.ts";

const HotelTypesSection = () => {
  const { control, watch } = useFormContext<CreateHotelSchema>();
  const watched = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold my-3">Types</h2>
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {hotelTypes.map((type, index) => (
                    <FormItem
                      key={index}
                      className="flex items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} className="hidden" />
                      </FormControl>
                      <FormLabel
                        data-testid={`hotel-type-${index}`}
                        className={cn(
                          "w-full cursor-pointer text-xs md:text-sm rounded-full font-semibold px-2 py-1 md:px-4 md:py-2",
                          watched === type ? "bg-blue-300" : "bg-slate-300",
                        )}
                      >
                        {type}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default HotelTypesSection;
