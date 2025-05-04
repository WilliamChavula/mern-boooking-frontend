import { useFormContext } from "react-hook-form";

import { CreateHotelSchema } from "@/types.ts";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash2 } from "lucide-react";
import React from "react";

const ImagesSection = () => {
  const { control, setValue, watch } = useFormContext<CreateHotelSchema>();
  const imageUrls = watch("imageUrls");

  const handleImageDelete = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string,
  ) => {
    evt.preventDefault();

    setValue(
      "imageUrls",
      imageUrls?.filter((url) => url !== imageUrl),
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="rounded flex flex-col border border-gray-200">
        {imageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="group relative">
                <img
                  src={url}
                  alt={`hotel-image-${index}`}
                  className="min-h-full object-cover"
                />
                <Button
                  size="icon"
                  className="cursor-pointer absolute inset-0 w-full h-full flex items-center justify-center bg-black/85 opacity-0 group-hover:opacity-80"
                  onClick={(event) => handleImageDelete(event, url)}
                >
                  <Trash2 className="size-8 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
