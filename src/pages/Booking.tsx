import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";

import { Loader, TriangleAlert } from "lucide-react";

import { useCurrentUserSession } from "@/api/users.api.ts";
import { useCreatePaymentIntent, useGetHotel } from "@/api/hotel.api.ts";
import { useSearchStore } from "@/context/hotel.context.ts";

import BookingForm from "@/components/form/BookingForm/BookingForm.tsx";
import BookingDetailsSummary from "@/components/BookingDetailsSummary.tsx";
import { hotelParam, PaymentIntentResponseSchema } from "@/types.ts";

const Booking = () => {
  const { hotelId } = useParams();
  const id = hotelParam.parse(hotelId);
  const { search } = useSearchStore();
  const stripe = useSearchStore((state) => state.stripe);

  const [numberOfNights, setNumberOfNights] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState<
    PaymentIntentResponseSchema | undefined
  >(undefined);

  const { data: hotel, isLoading: isHotelLoading } = useGetHotel(id);
  const { data: user, isLoading: isUserLoading } = useCurrentUserSession();
  const { createUserPayment, isCreateIntentLoading } = useCreatePaymentIntent();

  useEffect(() => {
    async function createPaymentIntent() {
      if (numberOfNights > 0) {
        const result = await createUserPayment({ hotelId: id, numberOfNights });
        setPaymentIntent(result);
      }
    }

    createPaymentIntent();
  }, [createUserPayment, id, numberOfNights]);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (24 * 60 * 60 * 1000);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (isUserLoading || isHotelLoading || isCreateIntentLoading) {
    return (
      <div className="min-h-1/2 flex items-center justify-center">
        <Loader className="mr-2 animate-spin" /> Loading...
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

  if (!paymentIntent || !paymentIntent.success) {
    return (
      <div className="min-h-1/2 flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4">
        <TriangleAlert size={32} className="text-orange-400" />
        <p className="text-md md:text-lg text-gray-800 font-semibold">
          {paymentIntent?.message}
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
      <Elements
        stripe={stripe}
        options={{
          clientSecret: paymentIntent.data.clientSecret,
        }}
      >
        <BookingForm
          currentUser={user.data}
          paymentIntent={paymentIntent.data}
        />
      </Elements>
    </div>
  );
};

export default Booking;
