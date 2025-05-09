import { SearchState } from "@/context/hotel.context.ts";
import { useSearchHotel } from "@/api/hotel.api.ts";
import { ChangeEvent, useState } from "react";
import { Loader, Star, TriangleAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import Pagination from "@/components/Pagination.tsx";
import StarRatingFilter from "@/components/StarRatingFilter.tsx";
import HotelTypesFilter from "@/components/HotelTypesFilter.tsx";
import FacilitiesFilter from "@/components/FacilitiesFilter.tsx";
import PriceFilter from "@/components/PriceFilter.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useDebouncedStoreValue } from "@/lib/utils.ts";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [hotelType, setHotelType] = useState<string[]>([]);
  const [facilities, setFacility] = useState<string[]>([]);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<
    number | undefined
  >();
  const [sortOption, setSortOption] = useState<string | undefined>(undefined);

  const debouncedParams = useDebouncedStoreValue(
    (state: SearchState) => state.search,
    300,
  );

  const { data: searchResults, isFetching } = useSearchHotel({
    ...debouncedParams,
    page: page.toString(),
    stars: selectedStars,
    types: hotelType,
    facilities: facilities,
    maxPrice: selectedMaxPrice?.toString(),
    sort: sortOption as "pricePerNightAsc" | "pricePerNightDesc" | "starRating",
  });

  const handleSelectedStarsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value: selectedRating } = evt.target;

    setSelectedStars((prevState) => {
      return evt.target.checked
        ? [...prevState, selectedRating]
        : prevState.filter((star) => star !== selectedRating);
    });
  };

  const handleSelectedHotelTypeChange = (
    evt: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: selectedHotelType } = evt.target;

    setHotelType((prevState) => {
      return evt.target.checked
        ? [...prevState, selectedHotelType]
        : prevState.filter((type) => type !== selectedHotelType);
    });
  };

  const handleSelectedFacilityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value: selectedFacility } = evt.target;

    setFacility((prevState) => {
      return evt.target.checked
        ? [...prevState, selectedFacility]
        : prevState.filter((f) => f !== selectedFacility);
    });
  };

  const clearFilters = () => {
    setSelectedStars([]);
    setHotelType([]);
    setFacility([]);
    setSelectedMaxPrice(undefined);
    setSortOption(undefined);
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="mr-2 animate-spin" /> Loading...
      </div>
    );
  }

  if (!searchResults || !searchResults.success) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4">
        <TriangleAlert size={32} className="text-orange-400" />
        <p className="text-md md:text-lg text-slate-800 font-semibold">
          No Hotels Found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
      <div className="rounded-none border border-slate-300 p-5 h-fit md:sticky top-10">
        <div className="space-y-5 flex flex-col">
          <h3 className="text-sm md:text-base font-semibold border-b border-slate-300 pb-2 flex items-center justify-between">
            Filter by:
            <Button
              variant="ghost"
              className="text-xs text-slate-500"
              onClick={clearFilters}
            >
              Clear
            </Button>
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onSelectedStarsChange={handleSelectedStarsChange}
          />
          <HotelTypesFilter
            onSelectedTypeChange={handleSelectedHotelTypeChange}
            selectedType={hotelType}
          />
          <FacilitiesFilter
            selectedFilter={facilities}
            onSelectedFacilityChange={handleSelectedFacilityChange}
          />
          <PriceFilter
            onSelectedPriceChange={(val?: number) => setSelectedMaxPrice(val)}
            selectedPrice={selectedMaxPrice}
          />

          <Button
            variant="ghost"
            className="text-xs text-slate-500 self-end max-w-fit"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p className="text-sm md:text-lg font-semibold">
            {searchResults?.success && searchResults.pagination.total} Hotels
            found
            <span>
              {debouncedParams.destination
                ? ` in ${debouncedParams.destination}`
                : ""}
            </span>
          </p>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="rounded-none">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starRating">Star Rating</SelectItem>
              <SelectItem value="pricePerNightAsc">
                Price per Night (low to high)
              </SelectItem>
              <SelectItem value="pricePerNightDesc">
                Price per Night (high to low)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {searchResults.data.map((hotel) => (
          <Card
            key={hotel._id}
            className="rounded-none shadow-none grid grid-cols-1 md:grid-cols-[2fr_3fr] p-8 gap-5 border border-slate-300"
          >
            <div className="w-full h-[300px]">
              <img
                src={hotel.imageUrls[0]}
                alt={`hotel-image`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center">
                  <span className="flex">
                    {Array.from({ length: hotel.starRating }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          className="fill-yellow-400 text-yellow-400 size-4"
                        />
                      ),
                    )}
                  </span>
                  <span className="ml-1 text-sm text-slate-700">
                    {hotel.type}
                  </span>
                </div>
                <Button
                  variant="link"
                  className="text-sm justify-start pl-0 md:text-base lg:text-xl font-semibold cursor-pointer"
                  asChild
                >
                  <Link to={`/detail/${hotel._id}`}>{hotel.name}</Link>
                </Button>
              </CardHeader>
              <CardContent className="flex-1 line-clamp-4 text-slate-700 text-sm">
                {hotel.description}
              </CardContent>
              <CardFooter className="grid grid-cols-2 items-end whitespace-nowrap">
                <div className="flex gap-1 items-center">
                  {hotel.facilities.slice(0, 3).map((facility, index) => (
                    <Badge
                      key={index}
                      className="bg-slate-300 text-slate-800 p-2 rounded-none text-xs whitespace-nowrap"
                    >
                      {facility}
                    </Badge>
                  ))}
                  <span className="text-sm text-slate-700">
                    {hotel.facilities.length > 3 &&
                      `+${hotel.facilities.length - 3} more`}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-sm text-slate-800">
                    {hotel.pricePerNight.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    /night
                  </span>
                  <Button
                    className="h-full rounded-none bg-blue-600 hover:bg-blue-500 font-semibold max-w-fit p-2"
                    asChild
                  >
                    <Link to={`/detail/${hotel._id}`}>View More</Link>
                  </Button>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
        <Pagination
          next={searchResults.pagination.nextPage}
          page={searchResults.pagination.currentPage}
          pages={searchResults.pagination.pages}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Search;
