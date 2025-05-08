import {
  hotelParam,
  PaymentIntentResponseSchema,
  User,
  userBookingFormState,
  UserBookingFormState,
} from "@/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchStore } from "@/context/hotel.context.ts";
import { useShallow } from "zustand/react/shallow";
import { useParams } from "react-router";
import { useCreateBooking } from "@/api/hotel.api.ts";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";

type BookingFormProps = {
  currentUser: User;
  paymentIntent: Extract<
    PaymentIntentResponseSchema,
    { success: true }
  >["data"];
};

const BookingForm = ({ currentUser, paymentIntent }: BookingFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { hotelId } = useParams();

  const id = hotelParam.parse(hotelId);

  const { createUserBooking, isCreatingBooking } = useCreateBooking();
  const { adultCount, childCount, checkIn, checkOut } = useSearchStore(
    useShallow((state) => ({
      adultCount: state.search.adultCount,
      childCount: state.search.childCount,
      checkIn: state.search.checkIn,
      checkOut: state.search.checkOut,
    })),
  );

  const form = useForm<UserBookingFormState>({
    resolver: zodResolver(userBookingFormState),
    defaultValues: {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      hotelId: id,
      adultCount,
      childCount,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      totalStayCost: paymentIntent.totalStayCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onBookingFormSubmit = async (data: UserBookingFormState) => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      await createUserBooking({
        ...data,
        paymentIntentId: result.paymentIntent.id,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onBookingFormSubmit)}
        className="grid grid-cols-1 gap-5 rounded-none border border-slate-300 p-5"
      >
        <h5 className="font-semibold">Confirm your details</h5>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="id-firstName"
                  className="text-slate-700 text-sm"
                >
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="id-firstName"
                    className="bg-gray-300"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="id-lastName"
                  className="text-slate-700 text-sm"
                >
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="id-lastName"
                    className="bg-gray-300"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="id-email" className="text-slate-700 text-sm">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="id-email"
                  className="bg-gray-300"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <h2 className="font-semibold text-sm md:text-base">
            Your price summary
          </h2>
          <div className="bg-blue-300 p-4 rounded-none">
            <p className="semi-bold text-sm md:text-base">
              Total Cost:{" "}
              {paymentIntent.totalStayCost.toLocaleString("en-US", {
                currency: "USD",
                style: "currency",
              })}
            </p>
            <p className="text-xs">Includes all taxes and fees</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm md:text-base">
            Payment details
          </h3>
          <CardElement
            id="payment-details"
            className="rounded-none p-2 text-sm"
          />
        </div>
        <div className="flex justify-end items-center">
          {isCreatingBooking ? (
            <Button className="bg-blue-600 text-sm rounded-none text-white p-2 hover:bg-blue-500">
              <Loader2 className="size-4 animate-spin mr-2" /> Booking Room
            </Button>
          ) : (
            <Button className="bg-blue-600 text-sm rounded-none text-white p-2 hover:bg-blue-500">
              Confirm Booking
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
