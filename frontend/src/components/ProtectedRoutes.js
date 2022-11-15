import { Outlet, Navigate } from "react-router-dom";
import { setUser } from "../actions";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from "../utils";
const ProtectedRoutes = ({ user }) => {
  const [hasUser, setHasUser] = useState(true);
  useEffect(() => {
    if (isEmpty(user)) {
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
