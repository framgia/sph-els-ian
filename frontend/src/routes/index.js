import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../components/Layout";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Dashboard from "../pages/Dashboard";

const RouteList = () => {
  return (
    <BrowserRouter>
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
          <Route element={<ProtectedRoutes />}>
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
          </Route>
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouteList;
