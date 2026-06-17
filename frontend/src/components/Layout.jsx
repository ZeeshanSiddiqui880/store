import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  MdDashboard,
  MdPeople,
  MdStorefront,
  MdClose,
  MdLogout,
} from "react-icons/md";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const storedRole = localStorage.getItem("role");


  const adminNav = [
    {
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
      path: "/admin",
    },
    {
      label: "Users",
      icon: <MdPeople className="text-xl" />,
      path: "/admin/users",
    },
    {
      label: "Stores",
      icon: <MdStorefront className="text-xl" />,
      path: "/admin/stores",
    },
  ];
  const ownerNav = [
    {
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
      path: "/owner",
    },
  ];
  const userNAv = [
    {
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
      path: "/user",
    },
  ];
  const navItems =
    storedRole === "admin"
      ? adminNav
      : storedRole === "store_owner"
        ? ownerNav
        : userNAv;

  const role =
    storedRole === "admin"
      ? "Administrator"
      : storedRole === "store_owner"
        ? "Store Owner"
        : storedRole === "user"
          ? "User"
          : "";
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        role={role}
        navItems= {navItems}
      />

      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} role={role} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
