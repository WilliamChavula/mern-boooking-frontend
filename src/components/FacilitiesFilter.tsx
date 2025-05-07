import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

import { hotelFacilities } from "@/config/hotel-options.config.ts";

type FacilitiesFilterProps = {
  selectedFilter: string[];
  onSelectedFacilityChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({
  selectedFilter,
  onSelectedFacilityChange,
}: FacilitiesFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="mb-2 font-semibold text-sm">Facilities</h4>
      {hotelFacilities.map((facility: string) => (
        <div
          className="flex justify-start items-center gap-4 mb-3"
          key={facility}
        >
          <Input
            id={`facility-${facility}`}
            type="checkbox"
            checked={selectedFilter.includes(facility)}
            value={facility}
            onChange={onSelectedFacilityChange}
            className="h-4 w-4 px-6 py-5"
          />
          <Label
            htmlFor={`facility-${facility}`}
            className="flex-1 text-sm font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {facility}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
