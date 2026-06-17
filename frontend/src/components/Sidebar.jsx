import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdStorefront,
  MdClose,
  MdLogout,
} from "react-icons/md";

function Sidebar({ sidebarOpen, setSidebarOpen, role, navItems }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 shadow-lg z-30 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <MdStorefront className="text-white text-lg" />
          </div>
          <span className="text-lg font-bold text-gray-800">StoreRate</span>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="bg-blue-50 rounded-xl px-3 py-2.5">
            <p className="text-xs text-blue-500 font-medium">Logged in as</p>
            <p className="text-sm font-semibold text-blue-700">{role}</p>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={() => navigate("/change-password")}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600  hover:bg-blue-600 hover:text-white w-full transition-all duration-200 cursor-pointer"
          >
            Change Password
          </button>
        </div>

        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-all duration-200 cursor-pointer"
          >
            <MdLogout className="text-xl" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
