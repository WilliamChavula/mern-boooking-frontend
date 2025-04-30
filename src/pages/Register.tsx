import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterApiHandler } from "@/api/users.api.ts";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";

import { registerSchema, type RegisterSchema } from "@/types.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";

const Register = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const createNewUserHandler = useRegisterApiHandler();

  const onSubmit = async (data: RegisterSchema) => {
    await createNewUserHandler(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="text-xl md:text-3xl font-bold">Create an account</h2>
        <div className="flex gap-5 flex-col md:flex-row justify-between items-center">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-gray-600 text-sm md:text-base">
                    First Name
                  </FormLabel>
                  <FormControl className="flex-1">
                    <Input placeholder="e.g. John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-gray-600 text-sm md:text-base">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-gray-600 text-tiny md:text-base">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g. jdoe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-gray-600 text-sm md:text-base">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-gray-600 text-sm md:text-base">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <span className="text-slate-600 text-xs md:text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-800 hover:underline">
            Click here to sign in.
          </Link>{" "}
        </span>
        <Button
          type="submit"
          className="bg-blue-600 text-sm md:text-base text-white font-bold py-2 px-5 max-w-1/4 min-w-fit rounded-none hover:bg-blue-500"
        >
          Create an Account
        </Button>
      </form>
    </Form>
  );
};

export default Register;
