import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role")?.toLowerCase();
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;
  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === "user") {
      return <Navigate to="/user" replace />;
    }
    if (role === "store_owner") {
      return <Navigate to="/owner" replace />;
    }
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;