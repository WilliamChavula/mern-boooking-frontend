import { Link } from "react-router";

import { useLogoutApiHandler, useUserSession } from "@/api/users.api.ts";

import { Button } from "@/components/ui/button.tsx";
import { SignInMobileNavMenu } from "./SignInMobileNavMenu";

const Header = () => {
  const { isLoggedIn } = useUserSession();
  const logOutUserHandler = useLogoutApiHandler();

  const onLogout = () => logOutUserHandler();

  return (
    <div className="bg-blue-800 py-6 w-full">
      <div className="container px-5 md:px-0 mx-auto flex justify-between">
        <span className="text-lg md:text-3xl text-white font-bold tracking-tight">
          <Link
            to="/"
            className="text-xl md:text-2xl lg:text-3xl tracking-tight"
          >
            bookingholidays.com
          </Link>
        </span>
        {isLoggedIn ? (
          <>
          <SignInMobileNavMenu />
          <div className="hidden lg:flex gap-5">
            <Button asChild variant="ghost" className="text-white">
              <Link to="/my-bookings">My Bookings</Link>
            </Button>
            <Button asChild variant="ghost" className="text-white">
              <Link to="/my-hotels">My Hotels</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="flex space-x-2 bg-white/80 rounded-none hover:bg-gray-100 text-slate-900 text-sm md:text-base cursor-pointer"
            >
              Sign out
            </Button>
          </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Button
              asChild
              variant="ghost"
              className="flex space-x-2 hover:bg-blue-800 hover:text-gray-200 hover:underline text-white text-sm md:text-base"
            >
              <Link
                to="/sign-in"
                className="flex items-center rounded-sm  text-blue-600 px-3 font-bold "
              >
                Sign in
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="hidden lg:flex space-x-2 bg-white/80 rounded-none hover:bg-gray-100 text-slate-900 text-sm md:text-base"
            >
              <Link
                to="/register"
                className="flex items-center text-blue-600 px-3 font-bold "
              >
                Sign up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
