import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { hotelTypes } from "@/config/hotel-options.config.ts";

type HotelTypesFilterProps = {
  selectedType: string[];
  onSelectedTypeChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({
  selectedType,
  onSelectedTypeChange,
}: HotelTypesFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="mb-2 font-semibold text-sm">Hotel Type</h4>
      {hotelTypes.map((hotelType: string) => (
        <div
          className="flex justify-start items-center gap-4 mb-3"
          key={hotelType}
        >
          <Input
            id={`hotelType-${hotelType}`}
            type="checkbox"
            checked={selectedType.includes(hotelType)}
            value={hotelType}
            onChange={onSelectedTypeChange}
            className="h-4 w-4 px-6 py-5"
          />
          <Label
            htmlFor={`hotelType-${hotelType}`}
            className="w-fit flex-1 text-sm font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {hotelType}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
