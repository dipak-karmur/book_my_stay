import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
