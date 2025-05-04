import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { CreateHotelSchema } from "@/types.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DetailsSection = () => {
  const { control } = useFormContext<CreateHotelSchema>();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <FormField
        name="name"
        control={control}
        render={({ field }) => {
          return (
            <FormItem className="w-full">
              <FormLabel className="text-gray-600 text-sm md:text-base">
                Name
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div className="flex flex-col md:flex-row gap-5">
        <FormField
          name="city"
          control={control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-gray-600 text-sm md:text-base">
                  City
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="country"
          control={control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-gray-600 text-sm md:text-base">
                  Country
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
      <FormField
        name="description"
        control={control}
        render={({ field }) => {
          return (
            <FormItem className="w-full">
              <FormLabel className="text-gray-600 text-sm md:text-base">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter hotel description..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        name="pricePerNight"
        control={control}
        render={({ field }) => {
          return (
            <FormItem className="max-w-1/2">
              <FormLabel className="text-gray-600 text-sm md:text-base">
                Price per Night
              </FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        name="starRating"
        control={control}
        render={({ field }) => {
          return (
            <FormItem className="max-w-1/2">
              <FormLabel className="text-gray-600 text-sm md:text-base">
                Rating
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger
                      data-testid="starRating-select-trigger"
                      className="w-full border p-2 text-gray-700 font-normal rounded-none"
                    >
                      <SelectValue placeholder="Select a rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <SelectItem
                        key={val}
                        value={val.toString()}
                        data-testid={`starRating-select-option-${val}`}
                      >
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default DetailsSection;
