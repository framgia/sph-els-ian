import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  let data = window.localStorage.getItem("data");
  return data ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
