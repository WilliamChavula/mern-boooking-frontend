import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Loader, TriangleAlert } from "lucide-react";

import { useCurrentUserSession } from "@/api/users.api.ts";
import { useGetHotel } from "@/api/hotel.api.ts";
import { useSearchStore } from "@/context/hotel.context.ts";

import BookingForm from "@/components/form/BookingForm/BookingForm.tsx";
import BookingDetailsSummary from "@/components/BookingDetailsSummary.tsx";
import { hotelParam } from "@/types.ts";

const Booking = () => {
  const [numberOfNights, setNumberOfNights] = useState(0);
  const { hotelId } = useParams();

  const id = hotelParam.parse(hotelId);
  const { data: hotel, isLoading: isHotelLoading } = useGetHotel(id);
  const { search } = useSearchStore();

  const { data: user, isLoading: isUserLoading } = useCurrentUserSession();

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (24 * 60 * 60 * 1000);

      console.log("nights", nights);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (isUserLoading || isHotelLoading) {
    return (
      <div className="min-h-1/2 flex items-center justify-center">
        <Loader className="mr-2" /> Loading...
      </div>
    );
  }

  if (!hotel || !hotel.success) {
    return (
      <div className="min-h-1/2 flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4">
        <TriangleAlert size={32} className="text-orange-400" />
        <p className="text-md md:text-lg text-gray-800 font-semibold">
          No Hotel Found
        </p>
      </div>
    );
  }

  if (!user || !user.success) {
    return (
      <div className="min-h-1/2 flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4">
        <TriangleAlert size={32} className="text-orange-400" />
        <p className="text-md md:text-lg text-gray-800 font-semibold">
          No User Found
        </p>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingDetailsSummary
        search={search}
        hotel={hotel.data}
        numberOfNights={numberOfNights}
      />
      <BookingForm currentUser={user.data} />
    </div>
  );
};

export default Booking;
