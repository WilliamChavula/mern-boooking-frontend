import { Loader, TriangleAlert } from "lucide-react";

import { useGetMyBookings } from "@/api/hotel.api.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

const MyBookings = () => {
  const { userBookings, isLoadingBookings } = useGetMyBookings();

  if (isLoadingBookings) {
    return (
      <div className="min-h-1/2 flex items-center justify-center">
        <Loader className="mr-2 animate-spin" /> Loading...
      </div>
    );
  }

  if (
    !userBookings ||
    !userBookings.success ||
    userBookings.data.length === 0
  ) {
    return (
      <div className="min-h-1/2 flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4">
        <TriangleAlert size={32} className="text-orange-400" />
        <p className="text-md md:text-lg text-gray-800 font-semibold">
          No Bookings Found
        </p>
      </div>
    );
  }
  return (
    <main className="space-y-4">
      <h1 className="text-base md:text-lg font-semibold">My Bookings</h1>
      {userBookings.data.map((hotelBooking) => (
        <Card
          key={hotelBooking._id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 p-6 gap-5 rounded-none"
        >
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotelBooking.imageUrls[0]}
              alt="booked-hotel-image"
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <CardHeader className="text-base md:text-lg font-semibold">
              <CardTitle>{hotelBooking.name}</CardTitle>
              <CardDescription className="text-xs font-normal">
                {hotelBooking.city}, {hotelBooking.country}
              </CardDescription>
            </CardHeader>
            {hotelBooking.bookings.map((booking) => (
              <CardContent key={booking._id} className="text-slate-800">
                <div>
                  <span className="font-semibold mr-2">Dates:</span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -{" "}
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Guests: </span>
                  <p className="text-sm inline">
                    <span>
                      {booking.adultCount}{" "}
                      {booking.adultCount > 1 ? " adults " : " adult "}
                    </span>
                    {booking.childCount === 0 && (
                      <span>{booking.childCount} children</span>
                    )}
                    {booking.childCount > 0 && (
                      <>
                        <span>&amp; </span>
                        <span>
                          {booking.childCount}{" "}
                          {booking.childCount > 1 ? " children " : " child "}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
            ))}
          </div>
        </Card>
      ))}
    </main>
  );
};

export default MyBookings;
