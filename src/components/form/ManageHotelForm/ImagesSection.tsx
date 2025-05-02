import { useFormContext } from "react-hook-form";

import { CreateHotelSchema } from "@/types.ts";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

const ImagesSection = () => {
  const { control } = useFormContext<CreateHotelSchema>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="rounded flex flex-col border border-gray-200">
        <FormField
          name="imageFiles"
          control={control}
          render={({ field }) => {
            return (
              <FormItem className="w-full px-3 py-5">
                <FormControl className="w-full text-gray-700 font-normal">
                  <div className="grid w-fit border-none max-w-sm items-center gap-1.5">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(evt) => {
                        const files = evt.target.files;
                        if (files) {
                          field.onChange(files);
                        }
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="rounded-none shadow-none border-transparent file:border-0 file:px-4 file:bg-gray-200"
                    />
                  </div>
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

export default ImagesSection;
