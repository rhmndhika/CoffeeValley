import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoutes = ({ redirectPath = "/", children }) => {
    const accessToken = Cookies.get('token');
  const isAuthenticated = accessToken;
  return isAuthenticated ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoutes;