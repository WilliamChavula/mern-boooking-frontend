import { ChangeEvent } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

type StarRatingFilterProps = {
  selectedStars: string[];
  onSelectedStarsChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({
  selectedStars,
  onSelectedStarsChange,
}: StarRatingFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="mb-2 font-semibold text-sm">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star: string) => (
        <div className="flex justify-start items-center gap-2" key={star}>
          <Input
            id={`star-${star}`}
            type="checkbox"
            checked={selectedStars.includes(star)}
            value={star}
            onChange={onSelectedStarsChange}
            className="max-w-fit px-6 py-5"
          />
          <Label
            htmlFor={`star-${star}`}
            className=" flex-1 text-sm font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {star} Stars
          </Label>
        </div>
      ))}
    </div>
  );
};

export default StarRatingFilter;
