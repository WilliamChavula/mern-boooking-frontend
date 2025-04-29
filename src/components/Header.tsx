import { Link } from "react-router";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6 w-full">
      <div className="container px-5 md:px-0 mx-auto flex justify-between">
        <span className="text-lg md:text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex text-sm md:text-lg items-center rounded-sm bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
