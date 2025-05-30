import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";

import { useUserSession } from "@/api/users.api.ts";
import { useSearchStore } from "@/context/hotel.context.ts";
import { configVars } from "./config";

import Layout from "./layouts/Layout.tsx";
import Register from "@/pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import AddHotel from "@/pages/AddHotel.tsx";
import MyHotels from "@/pages/MyHotels.tsx";
import EditHotel from "@/pages/EditHotel.tsx";
import Search from "@/pages/Search.tsx";
import HotelDetails from "@/pages/HotelDetails.tsx";
import Booking from "@/pages/Booking.tsx";
import { useEffect } from "react";
import MyBookings from "@/pages/MyBookings.tsx";
import Home from "@/pages/Home.tsx";

const App = () => {
  const { setStripe } = useSearchStore();
  const { isLoggedIn } = useUserSession();

  useEffect(() => {
    const stripe = loadStripe(configVars.VITE_STRIPE_KEY);
    setStripe(stripe);
  }, [setStripe]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />{" "}
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
          </>
        )}
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <HotelDetails />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
