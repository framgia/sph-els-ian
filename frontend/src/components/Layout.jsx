import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import { setUser } from "../actions";
import { useDispatch } from "react-redux";
const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let local_user = window.localStorage.getItem("data");
    console.log(local_user);
    if (!local_user) {
    } else {
      dispatch(setUser(local_user));
    }
  }, []);
  return (
    <div className="Layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
