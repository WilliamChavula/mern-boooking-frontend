import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import Layout from "./layouts/Layout.tsx";
import Register from "@/pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import AddHotel from "@/pages/AddHotel.tsx";
import { useUserSession } from "@/api/users.api.ts";

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
          </>
        )}
        <Route path="/search" element={<>Search Page</>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
