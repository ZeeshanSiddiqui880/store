import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "../pages/dashboard/UserDashboard";
import Layout from "../components/Layout";
 import SubmitRating from "../pages/stores/SubmitRating";
 
const User = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="store/:storeId/rating" element={<SubmitRating />} />
      </Routes>
    </Layout>
  );
};

export default User;
