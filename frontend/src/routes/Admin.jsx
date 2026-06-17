import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Layout from "../components/Layout";
import AdminUsers from "../pages/users/AdminUsers";
import AdminStores from "../pages/stores/AdminStores";

const Admin = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="stores" element={<AdminStores />} />
      </Routes>
    </Layout>
  );
};

export default Admin;
