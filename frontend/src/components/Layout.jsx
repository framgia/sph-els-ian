import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { setUser } from "../actions";
import { connect } from "react-redux";
const Layout = ({ user, setUser }) => {
  const [hasUser, setHasUser] = useState(false);
  useEffect(() => {
    let localUser = JSON.parse(window.localStorage.getItem("data"));
    if (localUser == null) {
      setHasUser(false);
    } else {
      setUser(localUser);
      setHasUser(true);
    }
  }, [user.id]);

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
