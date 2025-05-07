import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

import { bookingInfoFormState, BookingInfoFormState } from "@/types.ts";
import { useSearchStore } from "@/context/hotel.context.ts";
import { useUserSession } from "@/api/users.api.ts";
import { Button } from "@/components/ui/button.tsx";
import { useLocation, useNavigate } from "react-router";

type GuestInfoFormProps = {
  hotelId: string;
  pricePerNight: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: GuestInfoFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useUserSession();
  const { updateSearch } = useSearchStore();
  const contextCheckIn = useSearchStore((state) => state.search.checkIn);
  const contextCheckOut = useSearchStore((state) => state.search.checkOut);
  const contextAdultCount = useSearchStore((state) => state.search.adultCount);
  const contextChildCount = useSearchStore((state) => state.search.childCount);

  const form = useForm<BookingInfoFormState>({
    resolver: zodResolver(bookingInfoFormState),
    defaultValues: {
      checkIn: contextCheckIn,
      checkOut: contextCheckOut,
      adultCount: contextAdultCount,
      childCount: contextChildCount,
    },
  });

  const onSignInClick = (booking: BookingInfoFormState) => {
    updateSearch(booking);
    navigate("/sign-in", { state: { from: location } });
  };

  const onBookingSubmit = (booking: BookingInfoFormState) => {
    updateSearch(booking);
    navigate(`/hotel/${hotelId}/booking`);
  };

  const checkIn = form.watch("checkIn");
  const checkOut = form.watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  return (
    <div className="flex flex-col p-4 bg-blue-400 gap-4">
      <h3 className="font-semibold text-base md:text-lg">
        {pricePerNight.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
        <span className="text-sm text-slate-700">/night</span>
      </h3>
      <Form {...form}>
        <form
          onSubmit={
            isLoggedIn
              ? form.handleSubmit(onBookingSubmit)
              : form.handleSubmit(onSignInClick)
          }
        >
          <div className="grid grid-cols-1 items-center gap-4">
            <FormField
              name="checkIn"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      selectsStart
                      selected={field.value}
                      startDate={checkIn}
                      endDate={checkOut}
                      placeholderText="Check in date"
                      className="min-w-full bg-white p-2 focus:outline-none text-sm text-slate-700 md:text-base"
                      minDate={minDate}
                      maxDate={maxDate}
                      wrapperClassName="min-w-full"
                      onChange={(date) => field.onChange(date as Date)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="checkOut"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      selectsStart
                      selected={field.value}
                      startDate={checkIn}
                      endDate={checkOut}
                      placeholderText="Check out date"
                      className="min-w-full bg-white p-2 focus:outline-none text-sm text-slate-700 md:text-base"
                      minDate={minDate}
                      maxDate={maxDate}
                      wrapperClassName="min-w-full"
                      onChange={(date) => field.onChange(date as Date)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex bg-white px-2 py-1 gap-2">
              <FormField
                control={form.control}
                name="adultCount"
                render={({ field: { onChange, ...attrs } }) => (
                  <FormItem>
                    <div className="flex gap-1 items-center">
                      <FormLabel htmlFor="adultCount" className="text-gray-700">
                        Adults:
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="adultCount"
                          className="text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0"
                          type="number"
                          min={1}
                          max={20}
                          onChange={(evt) => {
                            const val = parseInt(evt.target.value);
                            onChange(val);
                          }}
                          {...attrs}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childCount"
                render={({ field: { onChange, ...attrs } }) => (
                  <FormItem>
                    <div className="flex gap-1 items-center">
                      <FormLabel htmlFor="childCount" className="text-gray-700">
                        Children:
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="childCount"
                          className="text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0"
                          type="number"
                          min={0}
                          max={20}
                          onChange={(evt) => {
                            const val = parseInt(evt.target.value);
                            onChange(val);
                          }}
                          {...attrs}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isLoggedIn ? (
              <Button className="cursor-pointer rounded-none bg-blue-600 hover:bg-blue-600 text-white text-sm shadow-md hover:shadow-none">
                Book Now
              </Button>
            ) : (
              <Button className="cursor-pointer rounded-none bg-blue-600 hover:bg-blue-600 text-white text-sm shadow-md hover:shadow-none">
                Sign In to Book
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GuestInfoForm;
