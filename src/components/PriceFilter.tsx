import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

type PriceFilterProps = {
  selectedPrice?: number;
  onSelectedPriceChange: (selectedPrice?: number) => void;
};

const PriceFilter = ({
  selectedPrice,
  onSelectedPriceChange,
}: PriceFilterProps) => {
  return (
    <div>
      <h4 className="mb-2 font-semibold text-sm">Max Price</h4>
      <Select
        value={selectedPrice?.toString()}
        onValueChange={(val) => onSelectedPriceChange(parseInt(val))}
      >
        <SelectTrigger className="w-full rounded-none">
          <SelectValue placeholder="Select max price" />
        </SelectTrigger>
        <SelectContent>
          {[250, 500, 1000, 1500, 2000].map((price, index) => (
            <SelectItem key={index} value={price.toString()}>
              {price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PriceFilter;
