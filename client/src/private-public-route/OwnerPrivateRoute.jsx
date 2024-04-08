import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const OwnerPrivateRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default OwnerPrivateRoute;
