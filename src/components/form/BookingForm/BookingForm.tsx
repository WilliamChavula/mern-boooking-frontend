import { User, userBookingFormState, UserBookingFormState } from "@/types.ts";
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

type BookingFormProps = {
  currentUser: User;
};

const BookingForm = ({ currentUser }: BookingFormProps) => {
  const form = useForm<UserBookingFormState>({
    resolver: zodResolver(userBookingFormState),
    defaultValues: {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 gap-5 rounded-none border border-slate-300 p-5">
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
      </form>
    </Form>
  );
};

export default BookingForm;
