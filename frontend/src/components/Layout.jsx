import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { setUser } from "../actions";
import { connect } from "react-redux";
const Layout = ({ user, setUser }) => {
  const [hasUser, setHasUser] = useState(false);
  useEffect(() => {
    let local_user = window.localStorage.getItem("data");
    if (local_user == null) {
      setHasUser(false);
    } else {
      setUser(local_user);
      setHasUser(true);
    }
  }, [user]);

  return (
    <div className="Layout">
      <Header hasUser={hasUser} />
      <Outlet />
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { setUser })(Layout);
