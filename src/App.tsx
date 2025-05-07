import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import { useUserSession } from "@/api/users.api.ts";

import Layout from "./layouts/Layout.tsx";
import Register from "@/pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import AddHotel from "@/pages/AddHotel.tsx";
import MyHotels from "@/pages/MyHotels.tsx";
import EditHotel from "@/pages/EditHotel.tsx";
import Search from "@/pages/Search.tsx";
import HotelDetails from "@/pages/HotelDetails.tsx";
import Booking from "@/pages/Booking.tsx";

const App = () => {
  const { isLoggedIn } = useUserSession();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>home page</p>
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
