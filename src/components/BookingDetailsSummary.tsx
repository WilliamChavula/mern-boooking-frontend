import { TSearch } from "@/context/hotel.context.ts";
import { HotelData } from "@/types.ts";

type BookingDetailsSummaryProps = {
  search: TSearch;
  numberOfNights: number;
  hotel: HotelData;
};

const BookingDetailsSummary = ({
  search,
  numberOfNights,
  hotel,
}: BookingDetailsSummaryProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 rounded-none border border-slate-300 p-5 h-fit">
      <h2 className="font-semibold">Your booking details</h2>
      <div className="py-2 border-b text-sm">
        <p>Location:</p>
        <p className="font-semibold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</p>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <p>Check In:</p>
          <p>{search.checkIn.toDateString()}</p>
        </div>
        <div>
          <p>Check Out:</p>
          <p>{search.checkOut.toDateString()}</p>
        </div>
      </div>
      <div className="border-y py-2 text-sm">
        <p>Length of Stay</p>
        <p className="font-semibold">
          {numberOfNights} {numberOfNights > 1 ? " nights" : " night"}
        </p>
      </div>
      <div>
        <p>Guests</p>
        <p className="text-sm font-semibold">
          <span>
            {search.adultCount} {search.adultCount > 1 ? " adults " : " adult "}
          </span>
          {search.childCount > 0 && (
            <>
              <span>&amp; </span>
              <span>
                {search.childCount}{" "}
                {search.childCount > 1 ? " children " : " child "}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
