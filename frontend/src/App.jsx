import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
 import LoginPage from "./pages/authentication/Login.jsx";
import Signup from "./pages/authentication/Signup.jsx";
import RoleProtectedRoute from "./utils/RoleProtectedRoutes.jsx";
import Admin from "./routes/Admin.jsx";
import User from "./routes/User.jsx";
import Owner from "./routes/Owner.jsx";
import ChangePassword from "./pages/authentication/ChangePassword.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </RoleProtectedRoute>
            }
          />

          {/* owner Routes */}
          <Route
            path="/owner/*"
            element={
              <RoleProtectedRoute allowedRoles={["store_owner"]}>
                <Owner />
              </RoleProtectedRoute>
            }
          />

          {/* user Routes */}
          <Route
            path="/user/*"
            element={
              <RoleProtectedRoute allowedRoles={["user"]}>
                <User />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
