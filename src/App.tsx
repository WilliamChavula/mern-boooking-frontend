import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import Layout from "./layouts/Layout.tsx";
import Register from "@/pages/Register.tsx";

const App = () => {
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
        <Route path="/search" element={<>Search Page</>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
