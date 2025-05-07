import { useState } from "react";

import type { FormEvent } from "react";

import DatePicker from "react-datepicker";

import { useSearchStore } from "@/context/hotel.context.ts";
import { Earth } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const { search, setSearch, updateSearch, resetSearch } = useSearchStore();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const maxDate = new Date();
  maxDate.setFullYear(new Date().getFullYear() + 1);

  const handleSearchSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    setSearch({
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    });

    navigate("/search");
  };

  const resetSearchForm = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);

    resetSearch();
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="-mt-8 p-3 bg-orange-500 rounded-none shadow-md grid grid-cols-2 lg:grid-cols-5 items-center gap-4"
    >
      <div className="flex items-center flex-1 bg-white px-2 py-1">
        <Earth size={25} className="mr-2 text-gray-500" />
        <Input
          placeholder="where are you going?"
          className="text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0"
          value={search.destination}
          onChange={(e) => updateSearch({ destination: e.target.value })}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2">
        <Label htmlFor="adultCount" className="text-gray-700">
          Adults:
          <Input
            id="adultCount"
            className="text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          ></Input>
        </Label>
        <Label htmlFor="childCount" className="text-gray-700">
          Children
          <Input
            id="childCount"
            className="text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          ></Input>
        </Label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check in date"
          className="min-w-full bg-white p-2 focus:outline-none text-sm text-gray-700 md:text-base"
          minDate={new Date()}
          maxDate={maxDate}
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check in date"
          className="min-w-full bg-white p-2 focus:outline-none text-sm text-gray-700 md:text-base"
          minDate={new Date()}
          maxDate={maxDate}
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="submit"
          className="w-2/3 cursor-pointer h-full bg-blue-600 text-white rounded-none p-2 font-semibold hover:bg-blue-500"
        >
          Search
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="w-1/3 cursor-pointer h-full text-white rounded-none p-2 font-semibold hover:bg-red-500"
          onClick={resetSearchForm}
        >
          Clear
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
