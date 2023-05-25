import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// import cookie from "cookie-parser";

const PrivateRoute = ({ children }) => {
  const { data } = useSelector((store) => store.auth);
  const { pathname } = useLocation();
  console.log("prtv",pathname)
  if (data.token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }
};

export default PrivateRoute;
