import { HashRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";

import Header from "../components/Header";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";

const Directory = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
      <Footer />
    </HashRouter>
  );
};
export default Directory;
