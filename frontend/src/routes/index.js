import { HashRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../components/Layout";

const RouteList = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path=""
            element={<Homepage />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="register"
            element={<Register />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};
export default RouteList;
