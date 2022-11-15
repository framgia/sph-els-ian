import { Outlet, Navigate } from "react-router-dom";
import { setUser } from "../actions";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
const ProtectedRoutes = ({ user }) => {
  const [hasUser, setHasUser] = useState(true);
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setHasUser(false);
    } else {
      setHasUser(true);
    }
  }, [user]);

  return hasUser ? <Outlet /> : <Navigate to="/login" />;
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, null)(ProtectedRoutes);
