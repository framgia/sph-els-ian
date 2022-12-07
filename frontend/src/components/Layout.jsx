import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { setUser } from "../actions";
import { connect } from "react-redux";
// const defaultUser = { user: false, isAdmin: false };
const Layout = ({ user, setUser }) => {
  const [hasUser, setHasUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem("data"));
    if (localUser == null) {
      setHasUser(false);
      setIsAdmin(false);
    } else {
      setUser(localUser);
      setHasUser(true);
      setIsAdmin(localUser.isAdmin);
    }
  }, [user.id]);

  return (
    <div className="Layout">
      <Header
        hasUser={hasUser}
        isAdmin={isAdmin}
      />
      <Outlet />
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { setUser })(Layout);
