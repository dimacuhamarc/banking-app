import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;