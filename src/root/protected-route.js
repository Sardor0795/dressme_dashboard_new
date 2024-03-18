import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const access_token = localStorage.getItem("DressmeUserToken") ? localStorage.getItem("DressmeUserToken") : null;

  if (!access_token) {
    return <Navigate to="/login-seller" replace />;
  }
  return children;
};
