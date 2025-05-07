import { Link } from "react-router";

import { useGetMyHotels } from "@/api/my-hotels.api.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import {
  Banknote,
  Bed,
  Building2,
  Map,
  Star,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

const MyHotels = () => {
  const myHotels = useGetMyHotels();

  if (!myHotels) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4">
        <TriangleAlert size={32} className="text-orange-400" />
        <p className="text-md md:text-lg text-gray-800 font-semibold">
          No Hotels Found
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-3">My Hotels</h2>
        <Link
          to="/add-hotel"
          className="bg-blue-600 text-white px-2 py-1 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {myHotels.data.map((hotel) => (
          <Card key={hotel._id} className="shadow-xs rounded-none">
            <div>
              <CardHeader className="text-base md:text-lg text-slate-900 font-semibold">
                {hotel.name}
              </CardHeader>
              <CardDescription className="px-6 whitespace-pre-line text-xs md:text-sm">
                {hotel.description}
              </CardDescription>
            </div>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-none p-1 items-center text-sm flex">
                  <Map size={18} className="mr-2" /> {hotel.city},{" "}
                  {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-none p-1 items-center text-sm flex">
                  <Building2 size={18} className="mr-2" /> {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-none p-1 items-center text-sm flex">
                  <Banknote size={18} className="mr-2" />{" "}
                  {hotel.pricePerNight.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  <span className="ml-1 text-sm text-slate-500">/night</span>
                </div>
                <div className="border border-slate-300 rounded-none p-1 items-center text-sm flex">
                  <Bed size={18} className="mr-2" /> {hotel.adultCount}
                  <span className="m-1 text-sm text-slate-500">
                    {hotel.adultCount > 1 ? "adults" : "adult"},
                  </span>
                  {hotel.childCount}
                  <span className="ml-1 text-sm text-slate-500">
                    {hotel.childCount === 0
                      ? "children"
                      : hotel.childCount > 1
                        ? "children"
                        : "child"}
                  </span>
                </div>
                <div className="border border-slate-300 rounded-none p-1 items-center text-sm flex">
                  <Star size={18} className="mr-2" /> {hotel.starRating} Star
                  Rating
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                asChild
                className="bg-blue-600 text-white px-2 py-1 rounded-none hover:bg-blue-500"
              >
                <Link to={`/edit-hotel/${hotel._id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
