import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
 import OwnerDashboard from "../pages/dashboard/OwnerDashboard";
import Layout from "../components/Layout";

const Owner = () => {
  return (
     <Layout>
      <Routes>
        <Route index element={<OwnerDashboard />} />
        <Route path="dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Layout>
  );
};

export default Owner;
