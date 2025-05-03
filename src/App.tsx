import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import { useUserSession } from "@/api/users.api.ts";

import Layout from "./layouts/Layout.tsx";
import Register from "@/pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import AddHotel from "@/pages/AddHotel.tsx";
import MyHotels from "@/pages/MyHotels.tsx";

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
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
          </>
        )}
        <Route path="/search" element={<>Search Page</>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
